function GenreBrowser({
  genres,
  selectedGenreId,
  genreQuery,
  currentPage,
  totalPages,
  onGenreQueryChange,
  onSelectGenre,
  onClearGenre,
  onNextPage,
  onPreviousPage,
}) {
  return (
    <section className="space-y-4 px-6 md:px-12">
      <div className="flex flex-col gap-4 rounded-[2rem] border border-white/10 bg-white/5 p-5 backdrop-blur md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Browse by Genre</h2>
          <p className="text-sm text-emerald-200/70">
            Filter the library by genre for faster discovery.
          </p>
        </div>

        <div className="flex flex-col gap-3 md:min-w-[320px]">
          <input
            type="text"
            value={genreQuery}
            onChange={(event) => onGenreQueryChange(event.target.value)}
            placeholder="Search genres..."
            className="rounded-full border border-white/10 bg-black/30 px-4 py-2.5 text-sm text-white placeholder:text-gray-400 outline-none transition focus:border-emerald-400"
          />
          {selectedGenreId ? (
            <button
              type="button"
              onClick={onClearGenre}
              className="w-fit rounded-full border border-emerald-400/30 bg-emerald-500/15 px-4 py-2 text-sm font-semibold text-emerald-100 transition hover:bg-emerald-500/25"
            >
              Clear Genre Filter
            </button>
          ) : null}
        </div>
      </div>

      <div className="rounded-[2rem] border border-white/10 bg-black/20 p-4 md:p-5">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {genres.map((genre) => {
            const selected = selectedGenreId === genre.id;

            return (
              <button
                key={genre.id}
                type="button"
                onClick={() => onSelectGenre(genre)}
                className={`min-h-14 rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition ${
                  selected
                    ? "border-emerald-300 bg-emerald-500 text-white shadow-glow"
                    : "border-white/10 bg-black/30 text-gray-200 hover:border-emerald-400 hover:bg-emerald-500/10 hover:text-emerald-200"
                }`}
              >
                {genre.name}
              </button>
            );
          })}
        </div>

        <div className="mt-5 flex flex-col gap-3 border-t border-white/10 pt-4 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-emerald-200/70">
            Genre page {currentPage} of {totalPages}
          </p>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onPreviousPage}
              disabled={currentPage <= 1}
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:border-emerald-400 hover:text-emerald-200 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Previous
            </button>
            <button
              type="button"
              onClick={onNextPage}
              disabled={currentPage >= totalPages}
              className="rounded-full border border-emerald-400/30 bg-emerald-500/15 px-4 py-2 text-sm font-semibold text-emerald-100 transition hover:border-emerald-300 hover:bg-emerald-500/25 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Next Page
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default GenreBrowser;
