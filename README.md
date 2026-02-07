# Far. — Gardening Business Website

A full-stack e-commerce site for **Far**, selling gardening equipment, flowers, and pots.

- **Frontend:** Next.js 14 (App Router), TypeScript, Tailwind CSS — green theme
- **Backend:** FastAPI, SQLite

## Quick start

### 1. Backend (FastAPI + SQLite)

```bash
cd backend
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate
pip install -r requirements.txt
python seed_db.py          # optional: add sample products
uvicorn main:app --reload
```

API: http://localhost:8000 — Docs: http://localhost:8000/docs

### 2. Frontend (Next.js)

```bash
cd frontend
npm install
npm run dev
```

Site: http://localhost:3000

Optional: create `frontend/.env.local` with `NEXT_PUBLIC_API_URL=http://localhost:8000` if the API runs on another host/port.

## Project layout

- `backend/` — FastAPI app, SQLite DB, product CRUD and categories
- `frontend/` — Next.js app, green-themed UI, product listing and detail pages

## API

- `GET /api/products` — list products (optional `?category=gardening_equipment|flowers|pots`)
- `GET /api/products/{id}` — product by ID
- `POST /api/products` — create product (body: name, description, category, price, image_url, stock)
- `GET /api/categories` — list category options

Database file: `backend/far_garden.db` (created on first run).

## Deploy to GCP (Cloud Run)

See **[DEPLOY.md](./DEPLOY.md)** for step-by-step instructions to deploy the backend and frontend to Google Cloud Run.
