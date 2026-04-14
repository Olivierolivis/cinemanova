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
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent" />

      <div className="relative z-10 flex h-full max-w-3xl flex-col justify-end gap-5 px-6 pb-16 pt-28 md:px-12">
        <span className="w-fit rounded-full border border-emerald-300/20 bg-emerald-500/20 px-4 py-1 text-sm font-semibold uppercase tracking-[0.3em] text-emerald-200">
          Featured Tonight
        </span>
        <h1 className="max-w-2xl font-display text-4xl font-bold leading-tight text-white md:text-6xl">
          {movie.title}
        </h1>
        <p className="max-w-2xl text-sm leading-7 text-gray-200 md:text-base">
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
          <div className="inline-flex items-center rounded-full border border-white/15 bg-black/30 px-5 py-3 text-sm text-gray-200 backdrop-blur">
            {movie.release_date?.slice(0, 4) || "New release"} •{" "}
            {Math.round(movie.vote_average * 10)}% Match
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
