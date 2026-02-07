#!/bin/sh
# Seed DB if empty (e.g. for Cloud Run), then start the API.
python seed_db.py 2>/dev/null || true
exec uvicorn main:app --host 0.0.0.0 --port "${PORT:-8080}"
