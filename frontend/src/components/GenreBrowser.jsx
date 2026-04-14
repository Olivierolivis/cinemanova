function GenreBrowser({
  genres,
  selectedGenreId,
  genreQuery,
  onGenreQueryChange,
  onSelectGenre,
  onClearGenre,
}) {
  const normalizedQuery = genreQuery.trim().toLowerCase();
  const filteredGenres = genres.filter((genre) =>
    genre.name.toLowerCase().includes(normalizedQuery),
  );

  return (
    <section className="space-y-4 px-6 md:px-12">
      <div className="flex flex-col gap-4 rounded-[2rem] border border-emerald-100 bg-white/80 p-5 shadow-lg backdrop-blur md:flex-row md:items-center md:justify-between dark:border-white/10 dark:bg-white/5 dark:shadow-none">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Browse by Genre</h2>
          <p className="text-sm text-emerald-700/80 dark:text-emerald-200/70">
            Filter the library by genre for faster discovery.
          </p>
        </div>

        <div className="flex flex-col gap-3 md:min-w-[320px]">
          <input
            type="text"
            value={genreQuery}
            onChange={(event) => onGenreQueryChange(event.target.value)}
            placeholder="Search genres..."
            className="rounded-full border border-emerald-100 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-emerald-400 dark:border-white/10 dark:bg-black/30 dark:text-white dark:placeholder:text-gray-400"
          />
          {selectedGenreId ? (
            <button
              type="button"
              onClick={onClearGenre}
              className="w-fit rounded-full border border-emerald-300 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-500/20 dark:border-emerald-400/30 dark:bg-emerald-500/15 dark:text-emerald-100 dark:hover:bg-emerald-500/25"
            >
              Clear Genre Filter
            </button>
          ) : null}
        </div>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-2">
        {filteredGenres.map((genre) => {
          const selected = selectedGenreId === genre.id;

          return (
            <button
              key={genre.id}
              type="button"
              onClick={() => onSelectGenre(genre)}
              className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm font-semibold transition ${
                selected
                  ? "border-emerald-300 bg-emerald-500 text-white shadow-glow"
                  : "border-white/10 bg-black/30 text-gray-200 hover:border-emerald-400 hover:text-emerald-200"
              }`}
            >
              {genre.name}
            </button>
          );
        })}
      </div>
    </section>
  );
}

export default GenreBrowser;
