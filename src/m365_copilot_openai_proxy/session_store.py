from __future__ import annotations

import asyncio
import json
import threading
import time
import uuid
from collections import OrderedDict
from dataclasses import dataclass, field
from pathlib import Path
from typing import Any, Callable


@dataclass(frozen=True)
class CopilotTurn:
    conversation_id: str
    client_session_id: str
    is_start_of_session: bool


_MAX_SESSIONS = 1000


@dataclass
class PersistentSession:
    conversation_id: str = field(default_factory=lambda: str(uuid.uuid4()))
    client_session_id: str = field(default_factory=lambda: str(uuid.uuid4()))
    turn_count: int = 0
    lock: asyncio.Lock = field(default_factory=asyncio.Lock)
    last_accessed: float = field(default_factory=time.time)
    # Called after turn_count changes so the store can persist to disk.
    _on_change: Callable[[], None] | None = field(default=None, repr=False, compare=False)

    def reserve_turn(self) -> CopilotTurn:
        turn = CopilotTurn(
            conversation_id=self.conversation_id,
            client_session_id=self.client_session_id,
            is_start_of_session=self.turn_count == 0,
        )
        self.turn_count += 1
        self.last_accessed = time.time()
        if self._on_change is not None:
            self._on_change()
        return turn


class PersistentSessionStore:
    def __init__(self, max_sessions: int = _MAX_SESSIONS, persist_path: str | Path | None = None):
        self._sessions: OrderedDict[str, PersistentSession] = OrderedDict()
        self._lock = threading.RLock()
        self._max_sessions = max_sessions
        self._persist_path = Path(persist_path) if persist_path else None
        if self._persist_path is not None:
            self._load()

    def _load(self) -> None:
        """Restore sessions from disk so conversations survive container restarts."""
        try:
            data = json.loads(self._persist_path.read_text(encoding="utf-8"))
        except (FileNotFoundError, json.JSONDecodeError, OSError):
            return
        if not isinstance(data, dict):
            return
        for key, s in data.items():
            if not isinstance(s, dict):
                continue
            try:
                session = PersistentSession(
                    conversation_id=s["conversation_id"],
                    client_session_id=s["client_session_id"],
                    turn_count=int(s.get("turn_count", 0)),
                    last_accessed=float(s.get("last_accessed", time.time())),
                )
            except (KeyError, TypeError, ValueError):
                continue
            session._on_change = self._save
            self._sessions[key] = session

    def _save(self) -> None:
        """Atomically write the session map to disk (best-effort)."""
        if self._persist_path is None:
            return
        with self._lock:
            data = {
                key: {
                    "conversation_id": s.conversation_id,
                    "client_session_id": s.client_session_id,
                    "turn_count": s.turn_count,
                    "last_accessed": s.last_accessed,
                }
                for key, s in self._sessions.items()
            }
        try:
            self._persist_path.parent.mkdir(parents=True, exist_ok=True)
            tmp = self._persist_path.with_suffix(".tmp")
            tmp.write_text(json.dumps(data), encoding="utf-8")
            tmp.replace(self._persist_path)
        except OSError:
            pass  # Persistence is best-effort; never break a request over a disk error

    def get(self, key: str) -> PersistentSession:
        with self._lock:
            session = self._sessions.get(key)
            if session is None:
                session = PersistentSession()
                session._on_change = self._save
                self._sessions[key] = session
                # Evict oldest session if over limit
                while len(self._sessions) > self._max_sessions:
                    self._sessions.popitem(last=False)
                self._save()
            else:
                # Move to end (most recently used)
                self._sessions.move_to_end(key)
                session.last_accessed = time.time()
            return session

    def reset(self, key: str) -> PersistentSession:
        """Discard any existing session under key and start a fresh one.

        Used when the auto-detected conversation key collides (e.g. two different
        conversations that happen to share the same first user message): a new
        conversation's first turn must NOT reuse the previous M365 thread, or the
        model receives stale context and hallucinates. A fresh session gets a new
        conversation_id / client_session_id and turn_count=0.
        """
        with self._lock:
            session = PersistentSession()
            session._on_change = self._save
            self._sessions[key] = session
            self._sessions.move_to_end(key)
            while len(self._sessions) > self._max_sessions:
                self._sessions.popitem(last=False)
            self._save()
            return session
