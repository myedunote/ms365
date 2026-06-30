from __future__ import annotations

import asyncio
import threading
import time
import uuid
from collections import OrderedDict
from dataclasses import dataclass, field


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

    def reserve_turn(self) -> CopilotTurn:
        turn = CopilotTurn(
            conversation_id=self.conversation_id,
            client_session_id=self.client_session_id,
            is_start_of_session=self.turn_count == 0,
        )
        self.turn_count += 1
        self.last_accessed = time.time()
        return turn


class PersistentSessionStore:
    def __init__(self, max_sessions: int = _MAX_SESSIONS):
        self._sessions: OrderedDict[str, PersistentSession] = OrderedDict()
        self._lock = threading.RLock()
        self._max_sessions = max_sessions

    def get(self, key: str) -> PersistentSession:
        with self._lock:
            session = self._sessions.get(key)
            if session is None:
                session = PersistentSession()
                self._sessions[key] = session
                # Evict oldest session if over limit
                while len(self._sessions) > self._max_sessions:
                    self._sessions.popitem(last=False)
            else:
                # Move to end (most recently used)
                self._sessions.move_to_end(key)
                session.last_accessed = time.time()
            return session
