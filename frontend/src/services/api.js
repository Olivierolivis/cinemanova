import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api",
  timeout: 10000,
});

export const movieApi = {
  getTrending: async (page = 1) => {
    const { data } = await api.get("/movies/trending", {
      params: { page },
    });
    return data;
  },
  getPopular: async (page = 1) => {
    const { data } = await api.get("/movies/popular", {
      params: { page },
    });
    return data;
  },
  getTopRated: async (page = 1) => {
    const { data } = await api.get("/movies/top-rated", {
      params: { page },
    });
    return data;
  },
  getGenres: async () => {
    const { data } = await api.get("/movies/genres");
    return data;
  },
  getMoviesByGenre: async (genreId, page = 1) => {
    const { data } = await api.get("/movies/discover", {
      params: { genreId, page },
    });
    return data;
  },
  getMovieDetails: async (id) => {
    const { data } = await api.get(`/movies/${id}`);
    return data;
  },
  getTrailer: async (id) => {
    const { data } = await api.get(`/movies/${id}/trailer`);
    return data;
  },
  searchMovies: async (query) => {
    const { data } = await api.get("/search", {
      params: { q: query },
    });
    return data;
  },
};

export default api;
