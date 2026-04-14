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
