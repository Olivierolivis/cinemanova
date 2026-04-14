import tmdbClient from "../services/tmdb.js";

const movieFields = {
  append_to_response: "videos,credits",
};

const getPage = (req) => {
  const page = Number.parseInt(req.query.page, 10);
  return Number.isNaN(page) || page < 1 ? 1 : page;
};

const getGenreId = (req) => {
  const genreId = Number.parseInt(req.query.genreId, 10);
  return Number.isNaN(genreId) || genreId < 1 ? null : genreId;
};

export const getTrendingMovies = async (req, res, next) => {
  try {
    const { data } = await tmdbClient.get("/trending/movie/week", {
      params: { page: getPage(req) },
    });
    res.json(data);
  } catch (error) {
    next(error);
  }
};

export const getPopularMovies = async (req, res, next) => {
  try {
    const { data } = await tmdbClient.get("/movie/popular", {
      params: { page: getPage(req) },
    });
    res.json(data);
  } catch (error) {
    next(error);
  }
};

export const getTopRatedMovies = async (req, res, next) => {
  try {
    const { data } = await tmdbClient.get("/movie/top_rated", {
      params: { page: getPage(req) },
    });
    res.json(data);
  } catch (error) {
    next(error);
  }
};

export const getGenres = async (_req, res, next) => {
  try {
    const { data } = await tmdbClient.get("/genre/movie/list");
    res.json(data);
  } catch (error) {
    next(error);
  }
};

export const getMoviesByGenre = async (req, res, next) => {
  const genreId = getGenreId(req);

  if (!genreId) {
    return res.status(400).json({ message: "A valid genreId query is required." });
  }

  try {
    const { data } = await tmdbClient.get("/discover/movie", {
      params: {
        page: getPage(req),
        with_genres: genreId,
        sort_by: "popularity.desc",
      },
    });
    res.json(data);
  } catch (error) {
    next(error);
  }
};

export const getMovieDetails = async (req, res, next) => {
  try {
    const { data } = await tmdbClient.get(`/movie/${req.params.id}`, {
      params: movieFields,
    });
    res.json(data);
  } catch (error) {
    next(error);
  }
};

export const getMovieTrailer = async (req, res, next) => {
  try {
    const { data } = await tmdbClient.get(`/movie/${req.params.id}/videos`);
    const trailer =
      data.results?.find(
        (video) => video.site === "YouTube" && video.type === "Trailer",
      ) || data.results?.find((video) => video.site === "YouTube");

    res.json({
      id: req.params.id,
      trailer,
      embedUrl: trailer?.key
        ? `https://www.youtube.com/embed/${trailer.key}`
        : null,
    });
  } catch (error) {
    next(error);
  }
};
