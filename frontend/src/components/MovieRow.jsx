import MovieCard from "./MovieCard";
import LoadingSkeleton from "./LoadingSkeleton";

function MovieRow({
  title,
  movies,
  isLoading,
  page = 1,
  totalPages = 1,
  isLoadingMore = false,
  onLoadMore,
}) {
  return (
    <section className="space-y-4">
      {title ? (
        <div className="flex items-center justify-between px-6 md:px-12">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{title}</h2>
            <p className="text-sm text-emerald-700/80 dark:text-emerald-200/70">
              Fresh picks from the TMDb spotlight.
            </p>
          </div>
          {onLoadMore ? (
            <div className="flex items-center gap-3">
              <span className="text-xs font-medium uppercase tracking-[0.25em] text-emerald-700/80 dark:text-emerald-200/70">
                Page {page} of {totalPages}
              </span>
              <button
                type="button"
                onClick={onLoadMore}
                disabled={isLoadingMore || page >= totalPages}
                className="rounded-full border border-emerald-300 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-700 transition hover:border-emerald-400 hover:bg-emerald-500/20 disabled:cursor-not-allowed disabled:opacity-50 dark:border-emerald-400/30 dark:bg-emerald-500/15 dark:text-emerald-100 dark:hover:border-emerald-300 dark:hover:bg-emerald-500/25"
              >
                {isLoadingMore ? "Loading..." : page >= totalPages ? "All Loaded" : "Load More"}
              </button>
            </div>
          ) : null}
        </div>
      ) : null}

      {isLoading ? (
        <LoadingSkeleton />
      ) : (
        <div className="overflow-x-auto px-6 pb-3 md:px-12">
          <div className="grid grid-flow-col auto-cols-[42%] gap-4 md:auto-cols-[24%] lg:auto-cols-[18%] xl:auto-cols-[15%]">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

export default MovieRow;
