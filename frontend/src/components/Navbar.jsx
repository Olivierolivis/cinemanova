import { useEffect, useState } from "react";
import {
  FaBars,
  FaHeart,
  FaMoon,
  FaSearch,
  FaSun,
  FaTimes,
} from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";
import { useTheme } from "../context/ThemeContext";
import { movieApi } from "../services/api";
import { getImageUrl } from "../utils/image";

function Navbar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { favorites } = useFavorites();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (!query.trim()) {
        setResults([]);
        setIsSearching(false);
        return;
      }

      try {
        setIsSearching(true);
        const data = await movieApi.searchMovies(query);
        setResults(data.results?.slice(0, 6) || []);
      } catch (_error) {
        setResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 350);

    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    setMenuOpen(false);
    setQuery("");
    setResults([]);
  }, [location.pathname]);

  const SearchDropdown = () => (
    <div className="absolute mt-3 w-full overflow-hidden rounded-2xl border border-emerald-100 bg-white/95 shadow-2xl dark:border-white/10 dark:bg-gray-950/95">
      {isSearching ? (
        <div className="px-4 py-3 text-sm text-slate-500 dark:text-gray-300">Searching...</div>
      ) : results.length ? (
        results.map((movie) => (
          <button
            key={movie.id}
            type="button"
            onClick={() => navigate(`/movie/${movie.id}`)}
            className="flex w-full items-center gap-3 border-b border-emerald-50 px-4 py-3 text-left transition hover:bg-emerald-500/10 dark:border-white/5"
          >
            <img
              src={getImageUrl(movie.poster_path, "w185")}
              alt={movie.title}
              className="h-14 w-10 rounded-lg object-cover"
            />
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">{movie.title}</p>
              <p className="text-xs text-slate-500 dark:text-gray-400">
                {movie.release_date?.slice(0, 4) || "Upcoming"}
              </p>
            </div>
          </button>
        ))
      ) : (
        <div className="px-4 py-3 text-sm text-slate-500 dark:text-gray-300">No movies found.</div>
      )}
    </div>
  );

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-3 mt-3 rounded-2xl border border-emerald-100 bg-white/80 px-4 py-3 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-black/55 dark:shadow-2xl md:mx-6 md:px-6">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              className="rounded-full border border-emerald-100 bg-white/70 p-2 text-slate-700 dark:border-white/10 dark:bg-transparent dark:text-white md:hidden"
              aria-label="Toggle navigation"
            >
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>

            <Link
              to="/"
              className="font-display text-2xl font-black tracking-wide text-slate-900 dark:text-white"
            >
              Cinema<span className="text-emerald-400">Nova</span>
            </Link>
          </div>

          <nav
            className={`${
              menuOpen ? "flex" : "hidden"
            } absolute left-4 right-4 top-[calc(100%+0.75rem)] flex-col gap-3 rounded-2xl border border-emerald-100 bg-white/95 p-4 dark:border-white/10 dark:bg-black/90 md:static md:flex md:flex-row md:items-center md:border-0 md:bg-transparent md:p-0`}
          >
            <Link to="/" className="text-sm font-medium text-slate-700 hover:text-emerald-600 dark:text-gray-200 dark:hover:text-emerald-300">
              Home
            </Link>
            <a href="/#trending" className="text-sm font-medium text-slate-700 hover:text-emerald-600 dark:text-gray-200 dark:hover:text-emerald-300">
              Trending
            </a>
            <a href="/#genres" className="text-sm font-medium text-slate-700 hover:text-emerald-600 dark:text-gray-200 dark:hover:text-emerald-300">
              Genres
            </a>
            <a href="/#popular" className="text-sm font-medium text-slate-700 hover:text-emerald-600 dark:text-gray-200 dark:hover:text-emerald-300">
              Popular
            </a>
            <a href="/#top-rated" className="text-sm font-medium text-slate-700 hover:text-emerald-600 dark:text-gray-200 dark:hover:text-emerald-300">
              Top Rated
            </a>
          </nav>

          <div className="flex items-center gap-2 md:gap-3">
            <div className="relative hidden md:block">
              <FaSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-emerald-300" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search movies..."
                className="w-72 rounded-full border border-emerald-100 bg-white/90 py-2 pl-11 pr-4 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-emerald-400 dark:border-white/10 dark:bg-white/10 dark:text-white dark:placeholder:text-gray-400"
              />
              {(query || isSearching) && <SearchDropdown />}
            </div>

            <div className="hidden items-center gap-2 rounded-full border border-emerald-100 bg-white/85 px-3 py-2 text-sm text-slate-700 dark:border-white/10 dark:bg-white/10 dark:text-white md:flex">
              <FaHeart className="text-emerald-300" />
              {favorites.length}
            </div>

            <button
              type="button"
              onClick={toggleTheme}
              className="rounded-full border border-emerald-100 bg-white/85 p-2.5 text-slate-700 transition hover:border-emerald-400 hover:text-emerald-600 dark:border-white/10 dark:bg-white/10 dark:text-white dark:hover:text-emerald-200"
              aria-label="Toggle theme"
            >
              {isDark ? <FaSun /> : <FaMoon />}
            </button>
          </div>
        </div>

        <div className="relative mt-3 md:hidden">
          <FaSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-emerald-300" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search movies..."
            className="w-full rounded-full border border-emerald-100 bg-white/90 py-2.5 pl-11 pr-4 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-emerald-400 dark:border-white/10 dark:bg-white/10 dark:text-white dark:placeholder:text-gray-400"
          />
          {(query || isSearching) && <SearchDropdown />}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
