#!/bin/bash
set -e

NAME="1vs9-dev-uwu"
DIR="$(cd "$(dirname "$0")" && pwd)"

echo "=== Stopping old container ==="
docker stop "$NAME" 2>/dev/null || true
docker rm "$NAME" 2>/dev/null || true

echo "=== Building image ==="
docker build -t "$NAME" "$DIR"

echo "=== Starting container ==="
docker run -d \
    --name "$NAME" \
    --network host \
    --restart unless-stopped \
    "$NAME"

echo "=== Cleaning dangling images ==="
docker image prune -f

echo "=== Done! ==="
docker ps --filter "name=$NAME" --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
