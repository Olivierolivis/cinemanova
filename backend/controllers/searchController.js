import tmdbClient from "../services/tmdb.js";

export const searchMovies = async (req, res, next) => {
  const query = req.query.q?.trim();

  if (!query) {
    return res.json({ results: [] });
  }

  try {
    const { data } = await tmdbClient.get("/search/movie", {
      params: {
        query,
        include_adult: false,
      },
    });

    res.json(data);
  } catch (error) {
    next(error);
  }
};
