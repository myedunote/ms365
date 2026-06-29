#!/bin/bash
set -e

CDP_PORT="${CHROME_CDP_PORT:-9222}"
CHROME_PROFILE="/chrome-profile"
AUTO_REFRESH="${AUTO_REFRESH:-true}"

# Create Chrome profile directory
mkdir -p "$CHROME_PROFILE"

# Detect Chromium binary (name varies by distro)
if command -v chromium &> /dev/null; then
    CHROME_BIN="chromium"
elif command -v chromium-browser &> /dev/null; then
    CHROME_BIN="chromium-browser"
elif command -v google-chrome-stable &> /dev/null; then
    CHROME_BIN="google-chrome-stable"
elif command -v google-chrome &> /dev/null; then
    CHROME_BIN="google-chrome"
else
    echo "WARNING: No Chrome/Chromium binary found. Starting server without auto-refresh."
    CHROME_BIN=""
fi

# Start Chrome headless + CDP (only if binary found and AUTO_REFRESH is true)
if [ -n "$CHROME_BIN" ] && [ "$AUTO_REFRESH" = "true" ]; then
    echo "Starting $CHROME_BIN headless on CDP port $CDP_PORT ..."
    "$CHROME_BIN" \
        --headless=new \
        --no-sandbox \
        --disable-gpu \
        --remote-debugging-port="$CDP_PORT" \
        --user-data-dir="$CHROME_PROFILE" \
        --no-first-run \
        --disable-dev-shm-usage \
        --disable-software-rasterizer \
        "https://m365.cloud.microsoft/chat" &

    # Wait for Chrome to start
    echo "Waiting for Chrome CDP on port $CDP_PORT ..."
    for i in $(seq 1 30); do
        if curl -s "http://localhost:$CDP_PORT/json" > /dev/null 2>&1; then
            echo "Chrome CDP ready."
            break
        fi
        sleep 1
    done
else
    echo "Chrome headless not started. Token auto-refresh disabled."
fi

# Build serve command arguments
SERVE_ARGS="--host 0.0.0.0 --port 8000"

if [ -n "$CHROME_BIN" ] && [ "$AUTO_REFRESH" = "true" ]; then
    SERVE_ARGS="$SERVE_ARGS --cdp-port $CDP_PORT --refresh-before-seconds ${REFRESH_BEFORE_SECONDS:-300}"
else
    SERVE_ARGS="$SERVE_ARGS --no-auto-refresh --no-launch-edge --no-capture-on-start"
fi

# If no token is set, log a hint
if [ -z "$M365_ACCESS_TOKEN" ]; then
    echo "WARNING: M365_ACCESS_TOKEN is not set."
    echo "Please get a token via the Tampermonkey script (get_token.js) and set it in .env"
fi

echo "Starting copilot-openai-proxy serve $SERVE_ARGS"
exec uv run copilot-openai-proxy serve $SERVE_ARGS
