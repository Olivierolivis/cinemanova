import { Router } from "express";
import {
  getMovieDetails,
  getMovieTrailer,
  getMoviesByGenre,
  getGenres,
  getPopularMovies,
  getTopRatedMovies,
  getTrendingMovies,
} from "../controllers/moviesController.js";

const router = Router();

router.get("/trending", getTrendingMovies);
router.get("/popular", getPopularMovies);
router.get("/top-rated", getTopRatedMovies);
router.get("/genres", getGenres);
router.get("/discover", getMoviesByGenre);
router.get("/:id/trailer", getMovieTrailer);
router.get("/:id", getMovieDetails);

export default router;
