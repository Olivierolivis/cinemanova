import { FaHeart, FaInfoCircle, FaPlay } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";
import { formatRating, getImageUrl } from "../utils/image";

function MovieCard({ movie }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(movie.id);

  return (
    <div className="group relative min-w-0">
      <div className="relative aspect-[2/3] overflow-hidden rounded-2xl border border-white/10 bg-gray-900 shadow-lg transition duration-300 group-hover:-translate-y-2 group-hover:shadow-glow">
        <img
          src={getImageUrl(movie.poster_path)}
          alt={movie.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
          loading="lazy"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />

        <div className="absolute inset-x-0 bottom-0 flex translate-y-6 flex-col gap-3 p-4 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <div className="flex items-center justify-between">
            <span className="rounded-full border border-emerald-400/30 bg-emerald-500/20 px-2.5 py-1 text-xs font-semibold text-emerald-200">
              {formatRating(movie.vote_average)}
            </span>
            <button
              type="button"
              onClick={() => toggleFavorite(movie)}
              className={`rounded-full p-2 transition ${
                favorite
                  ? "bg-rose-500 text-white"
                  : "bg-white/15 text-white hover:bg-emerald-500"
              }`}
              aria-label={
                favorite ? "Remove from favorites" : "Add to favorites"
              }
            >
              <FaHeart size={14} />
            </button>
          </div>

          <div className="flex gap-2">
            <Link
              to={`/movie/${movie.id}`}
              className="flex items-center gap-2 rounded-full bg-emerald-500 px-3 py-2 text-sm font-semibold text-white transition hover:bg-emerald-400"
            >
              <FaPlay size={12} />
              Play
            </Link>
            <Link
              to={`/movie/${movie.id}`}
              className="flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-3 py-2 text-sm font-semibold text-white transition hover:border-emerald-400 hover:text-emerald-200"
            >
              <FaInfoCircle size={12} />
              Details
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-3 px-1">
        <h3 className="line-clamp-1 text-sm font-semibold text-white">
          {movie.title}
        </h3>
        <p className="mt-1 text-xs text-gray-400">
          {movie.release_date?.slice(0, 4) || "Coming soon"}
        </p>
      </div>
    </div>
  );
}

export default MovieCard;
