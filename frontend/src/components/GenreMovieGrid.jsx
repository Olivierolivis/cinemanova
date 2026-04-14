import MovieCard from "./MovieCard";
import LoadingSkeleton from "./LoadingSkeleton";

function GenreMovieGrid({
  title,
  movies,
  isLoading,
  page = 1,
  totalPages = 1,
  onPreviousPage,
  onNextPage,
}) {
  return (
    <section className="space-y-4 px-6 md:px-12">
      <div className="flex flex-col gap-4 rounded-[2rem] border border-emerald-100 bg-white/80 p-5 shadow-lg backdrop-blur md:flex-row md:items-center md:justify-between dark:border-white/10 dark:bg-white/5 dark:shadow-none">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{title}</h2>
          <p className="text-sm text-emerald-700/80 dark:text-emerald-200/70">
            Browse this genre in vertical pages.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-medium uppercase tracking-[0.25em] text-emerald-700/80 dark:text-emerald-200/70">
            Page {page} of {totalPages}
          </span>
          <button
            type="button"
            onClick={onPreviousPage}
            disabled={page <= 1}
            className="rounded-full border border-emerald-100 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-emerald-400 hover:text-emerald-600 disabled:cursor-not-allowed disabled:opacity-50 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:text-emerald-200"
          >
            Previous
          </button>
          <button
            type="button"
            onClick={onNextPage}
            disabled={page >= totalPages}
            className="rounded-full border border-emerald-300 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-700 transition hover:border-emerald-400 hover:bg-emerald-500/20 disabled:cursor-not-allowed disabled:opacity-50 dark:border-emerald-400/30 dark:bg-emerald-500/15 dark:text-emerald-100 dark:hover:border-emerald-300 dark:hover:bg-emerald-500/25"
          >
            Next
          </button>
        </div>
      </div>

      {isLoading ? (
        <LoadingSkeleton />
      ) : (
        <div className="grid gap-5 px-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </section>
  );
}

export default GenreMovieGrid;
