import { FaPlay } from "react-icons/fa";
import { Link } from "react-router-dom";
import { getImageUrl } from "../utils/image";

function Hero({ movie }) {
  if (!movie) {
    return null;
  }

  return (
    <section className="relative h-[78vh] overflow-hidden rounded-b-[2rem] border-b border-emerald-500/10">
      <img
        src={getImageUrl(movie.backdrop_path || movie.poster_path, "original")}
        alt={movie.title}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/65 to-white/10 dark:from-black dark:via-black/80 dark:to-black/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-emerald-50 via-transparent to-transparent dark:from-gray-950 dark:via-transparent dark:to-transparent" />

      <div className="relative z-10 flex h-full max-w-3xl flex-col justify-end gap-5 px-6 pb-16 pt-28 md:px-12">
        <span className="w-fit rounded-full border border-emerald-300/40 bg-emerald-500/15 px-4 py-1 text-sm font-semibold uppercase tracking-[0.3em] text-emerald-800 dark:border-emerald-300/20 dark:bg-emerald-500/20 dark:text-emerald-200">
          Featured Tonight
        </span>
        <h1 className="max-w-2xl font-display text-4xl font-bold leading-tight text-slate-900 dark:text-white md:text-6xl">
          {movie.title}
        </h1>
        <p className="max-w-2xl text-sm leading-7 text-slate-700 dark:text-gray-200 md:text-base">
          {movie.overview}
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            to={`/movie/${movie.id}`}
            className="inline-flex items-center gap-3 rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-glow transition hover:bg-emerald-400"
          >
            <FaPlay />
            Play Now
          </Link>
          <div className="inline-flex items-center rounded-full border border-emerald-200 bg-white/70 px-5 py-3 text-sm text-slate-700 shadow-sm backdrop-blur dark:border-white/15 dark:bg-black/30 dark:text-gray-200 dark:shadow-none">
            {movie.release_date?.slice(0, 4) || "New release"} •{" "}
            {Math.round(movie.vote_average * 10)}% Match
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
