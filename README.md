# CinemaNova

CinemaNova is a full-stack movie website with a Netflix-inspired UI, a green cinematic theme, and a small Express backend that proxies the TMDb API.

## Stack

- Frontend: React + Vite + Tailwind CSS
- Backend: Node.js + Express
- API client: Axios
- Icons: `react-icons`

## Setup

1. Install dependencies:

```bash
npm install
npm run install:all
```

2. Create `backend/.env` from `backend/.env.example` and add your TMDb key:

```env
PORT=5000
TMDB_API_KEY=your_key_here
TMDB_BASE_URL=https://api.themoviedb.org/3
```

3. Run the full app:

```bash
npm run dev
```

## Deploy (GitHub -> Netlify)

This app is full-stack:
- `frontend` (React/Vite) can be hosted on Netlify.
- `backend` (Express) should be hosted on a Node host like Render or Railway.

### 1) Push project to GitHub

```bash
git add .
git commit -m "Prepare deployment"
git push origin main
```

### 2) Deploy backend first (Render/Railway)

Use these backend environment variables:

```env
PORT=5000
TMDB_API_KEY=your_tmdb_api_key_here
TMDB_BASE_URL=https://api.themoviedb.org/3
CLIENT_URL=https://your-netlify-site.netlify.app
```

After deploy, copy your backend URL, for example:

`https://cinemanova-api.onrender.com`

### 3) Deploy frontend on Netlify from GitHub

- In Netlify: `Add new site` -> `Import an existing project` -> choose your GitHub repo.
- Netlify will read `netlify.toml` from the repo root.

This repo already includes:
- build base: `frontend`
- build command: `npm run build`
- publish directory: `dist`
- SPA redirect to `index.html`

Set this Netlify environment variable:

`VITE_API_BASE_URL=https://cinemanova-api.onrender.com/api`

Then click `Deploy site`.

### 4) Update backend CORS after Netlify URL is final

Set backend `CLIENT_URL` to your final Netlify domain:

`https://your-site-name.netlify.app`

Redeploy backend so CORS allows frontend requests.
