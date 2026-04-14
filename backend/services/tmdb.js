import axios from "axios";

const tmdbClient = axios.create({
  baseURL: process.env.TMDB_BASE_URL || "https://api.themoviedb.org/3",
  timeout: 10000,
});

tmdbClient.interceptors.request.use((config) => {
  const apiKey = process.env.TMDB_API_KEY;

  if (!apiKey) {
    const error = new Error("TMDB_API_KEY is missing. Add it to backend/.env.");
    error.status = 500;
    throw error;
  }

  config.params = {
    ...(config.params || {}),
    api_key: apiKey,
  };

  return config;
});

export default tmdbClient;
