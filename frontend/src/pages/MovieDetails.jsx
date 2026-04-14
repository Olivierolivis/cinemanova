import { useEffect, useState } from "react";
import { FaHeart, FaPlay, FaStar } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import LoadingSkeleton from "../components/LoadingSkeleton";
import { useFavorites } from "../context/FavoritesContext";
import { movieApi } from "../services/api";
import { formatRating, getImageUrl } from "../utils/image";

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const { isFavorite, toggleFavorite } = useFavorites();

  useEffect(() => {
    const loadMovie = async () => {
      try {
        setIsLoading(true);
        setError("");

        const [details, trailerData] = await Promise.all([
          movieApi.getMovieDetails(id),
          movieApi.getTrailer(id),
        ]);

        setMovie(details);
        setTrailer(trailerData);
      } catch (loadError) {
        setError(
          loadError.response?.data?.message ||
            "We couldn't load this movie right now.",
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadMovie();
  }, [id]);

  if (isLoading) {
    return (
      <main className="pb-16">
        <LoadingSkeleton variant="hero" />
      </main>
    );
  }

  if (error || !movie) {
    return (
      <main className="flex min-h-screen items-center justify-center px-6 pt-28">
        <div className="max-w-lg rounded-3xl border border-red-500/20 bg-red-500/10 p-6 text-red-100">
          <h1 className="text-2xl font-bold">Movie unavailable</h1>
          <p className="mt-3 text-sm text-red-100/80">{error}</p>
          <Link
            to="/"
            className="mt-5 inline-flex rounded-full bg-emerald-500 px-5 py-2.5 font-semibold text-white"
          >
            Back to home
          </Link>
        </div>
      </main>
    );
  }

  const favorite = isFavorite(movie.id);

  return (
    <main className="pb-16">
      <section className="relative min-h-[85vh] overflow-hidden">
        <img
          src={getImageUrl(movie.backdrop_path || movie.poster_path, "original")}
          alt={movie.title}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent" />

        <div className="relative z-10 mx-auto flex min-h-[85vh] max-w-7xl flex-col justify-end gap-8 px-6 pb-12 pt-28 md:px-12 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <span className="rounded-full border border-emerald-300/20 bg-emerald-500/20 px-4 py-1 text-sm font-semibold text-emerald-100">
              Netflix-style preview
            </span>
            <h1 className="mt-5 font-display text-4xl font-black text-white md:text-6xl">
              {movie.title}
            </h1>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-gray-200">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5">
                <FaStar className="text-amber-300" />
                {formatRating(movie.vote_average)}
              </span>
              <span>{movie.release_date}</span>
              <span>{movie.runtime} min</span>
              {movie.genres?.slice(0, 3).map((genre) => (
                <span key={genre.id}>{genre.name}</span>
              ))}
            </div>
            <p className="mt-6 max-w-2xl text-base leading-8 text-gray-200">
              {movie.overview}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              {trailer?.embedUrl && (
                <a
                  href="#trailer"
                  className="inline-flex items-center gap-3 rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-glow transition hover:bg-emerald-400"
                >
                  <FaPlay />
                  Watch Trailer
                </a>
              )}
              <button
                type="button"
                onClick={() => toggleFavorite(movie)}
                className={`inline-flex items-center gap-3 rounded-full px-6 py-3 text-sm font-semibold transition ${
                  favorite
                    ? "bg-rose-500 text-white"
                    : "border border-white/20 bg-black/30 text-white hover:border-emerald-400"
                }`}
              >
                <FaHeart />
                {favorite ? "Saved to Favorites" : "Save to Favorites"}
              </button>
            </div>
          </div>

          <div className="w-full max-w-sm overflow-hidden rounded-3xl border border-white/10 bg-black/35 shadow-2xl backdrop-blur">
            <img
              src={getImageUrl(movie.poster_path)}
              alt={movie.title}
              className="aspect-[2/3] w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto mt-10 grid max-w-7xl gap-10 px-6 md:px-12 lg:grid-cols-[1.25fr_0.75fr]">
        <div
          id="trailer"
          className="overflow-hidden rounded-3xl border border-white/10 bg-black/40 shadow-xl"
        >
          {trailer?.embedUrl ? (
            <iframe
              className="aspect-video w-full"
              src={trailer.embedUrl}
              title={`${movie.title} trailer`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="flex aspect-video items-center justify-center p-8 text-center text-gray-300">
              Trailer unavailable for this title on TMDb.
            </div>
          )}
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-2xl font-bold text-white">Why watch this?</h2>
          <div className="mt-6 space-y-4 text-sm leading-7 text-gray-300">
            <p>
              CinemaNova pulls live data from TMDb and keeps the UI focused on
              high-contrast visuals, quick discovery, and a cinematic watch-page
              feel.
            </p>
            <p>
              Cast, trailers, ratings, and artwork are fetched on demand so the
              experience stays lightweight without needing a database.
            </p>
            <p>
              Favorites are saved locally in your browser, which keeps the setup
              simple and makes the app easy to deploy.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default MovieDetails;
