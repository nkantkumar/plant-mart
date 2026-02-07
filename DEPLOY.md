# Deploy Far to Google Cloud Platform (GCP)

This guide covers deploying the **backend** (FastAPI + SQLite) and **frontend** (Next.js) to **Google Cloud Run**. You can use either **deploy from source** (gcloud builds from your code) or **Docker** (explicit Dockerfile).

---

## Prerequisites

1. **Google Cloud account** — [Create one](https://console.cloud.google.com/freetrial) (includes free credits).
2. **gcloud CLI** — [Install](https://cloud.google.com/sdk/docs/install) and log in:
   ```bash
   gcloud auth login
   gcloud config set project YOUR_PROJECT_ID
   ```
3. **Enable APIs** (one-time per project):
   ```bash
   gcloud services enable run.googleapis.com cloudbuild.googleapis.com artifactregistry.googleapis.com
   ```
4. **Grant Cloud Build permission to deploy** (replace `YOUR_PROJECT_ID` and `PROJECT_NUMBER`):
   ```bash
   gcloud projects add-iam-policy-binding YOUR_PROJECT_ID \
     --member="serviceAccount:PROJECT_NUMBER-compute@developer.gserviceaccount.com" \
     --role="roles/run.builder"
   ```
   Get `PROJECT_NUMBER`: [Console](https://console.cloud.google.com/) → Project settings, or `gcloud projects describe YOUR_PROJECT_ID --format='value(projectNumber)'`.

---

## 1. Deploy the backend (FastAPI)

From the **project root**:

```bash
cd backend
```

**Option A — Deploy from source** (gcloud builds a container for you):

```bash
gcloud run deploy far-api \
  --source . \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars "CORS_ORIGINS=https://YOUR_FRONTEND_URL"
```

When prompted: service name `far-api`, region (e.g. `us-central1`), allow unauthenticated **y**.  
If you don’t have a frontend URL yet, you can set `CORS_ORIGINS=*` temporarily (or omit and add later).

**Option B — Build and deploy with Docker**:

```bash
gcloud run deploy far-api \
  --source . \
  --region us-central1 \
  --allow-unauthenticated
```

(gcloud will use the `Dockerfile` in `backend/` when present.)

After deploy, note the **service URL**, e.g. `https://far-api-xxxxx-uc.a.run.app`. You’ll use this as the API base for the frontend.

**SQLite on Cloud Run:** The container filesystem is **ephemeral**. Data is lost on new revisions or when the instance scales to zero. For a demo or low-traffic site this is acceptable; run `seed_db.py` locally and bake the DB into the image, or run a one-off job that seeds the DB after deploy. For production, use **Cloud SQL** (PostgreSQL/MySQL) and switch the backend to use it.

---

## 2. Deploy the frontend (Next.js)

Set the backend URL to your deployed API (from step 1). Then deploy the frontend.

From the **project root**:

```bash
cd frontend
```

**Option A — Deploy from source** (buildpack detects Next.js):

```bash
export API_URL="https://far-api-xxxxx-uc.a.run.app"   # your backend URL
gcloud run deploy far-web \
  --source . \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars "NEXT_PUBLIC_API_URL=$API_URL"
```

**Option B — Docker build with API URL** (recommended so the frontend always points to your API):

```bash
export API_URL="https://far-api-xxxxx-uc.a.run.app"
gcloud run deploy far-web \
  --source . \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars "NEXT_PUBLIC_API_URL=$API_URL"
```

If you use a **custom Dockerfile** (e.g. multi-stage with `ARG NEXT_PUBLIC_API_URL`), build the image with that build-arg and push to Artifact Registry, then deploy that image to Cloud Run. When using `gcloud run deploy --source .`, the buildpack may not pass build args; using the repo’s `frontend/Dockerfile` and building with Cloud Build ensures `NEXT_PUBLIC_API_URL` is set at build time.

**Build with Cloud Build and Dockerfile** (so `NEXT_PUBLIC_API_URL` is baked in):

```bash
cd frontend
export API_URL="https://far-api-xxxxx-uc.a.run.app"
gcloud builds submit --tag gcr.io/YOUR_PROJECT_ID/far-web \
  --build-arg NEXT_PUBLIC_API_URL=$API_URL

gcloud run deploy far-web \
  --image gcr.io/YOUR_PROJECT_ID/far-web \
  --region us-central1 \
  --allow-unauthenticated \
  --platform managed
```

Replace `YOUR_PROJECT_ID` with your GCP project ID.

After deploy, note the **frontend URL**, e.g. `https://far-web-xxxxx-uc.a.run.app`.

---

## 3. Point backend CORS to the frontend

So the browser can call the API from your frontend URL:

```bash
gcloud run services update far-api \
  --region us-central1 \
  --set-env-vars "CORS_ORIGINS=https://far-web-xxxxx-uc.a.run.app"
```

Use your actual frontend Cloud Run URL. For multiple origins use a comma-separated list (no spaces).

---

## 4. Optional: Custom domain and HTTPS

- In **Cloud Run** → select the service → **Manage custom domains** to attach a domain.
- Both Cloud Run URLs are already served over HTTPS.

---

## Summary

| Step | What |
|------|------|
| 1 | Enable APIs, grant Cloud Build `roles/run.builder` |
| 2 | Deploy backend: `cd backend` → `gcloud run deploy far-api --source . --region us-central1 --allow-unauthenticated` |
| 3 | Deploy frontend with `NEXT_PUBLIC_API_URL=<backend URL>` (and optionally Docker build with build-arg) |
| 4 | Set backend `CORS_ORIGINS` to the frontend URL |

**Useful links**

- [Cloud Run quickstart (FastAPI)](https://cloud.google.com/run/docs/quickstarts/build-and-deploy/deploy-python-fastapi-service)
- [Cloud Run quickstart (Next.js)](https://cloud.google.com/run/docs/quickstarts/frameworks/deploy-nextjs-service)
- [Cloud Run pricing](https://cloud.google.com/run/pricing)
