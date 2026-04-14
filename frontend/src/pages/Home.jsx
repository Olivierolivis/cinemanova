import { useEffect, useState } from "react";
import GenreBrowser from "../components/GenreBrowser";
import GenreMovieGrid from "../components/GenreMovieGrid";
import MovieCard from "../components/MovieCard";
import Hero from "../components/Hero";
import LoadingSkeleton from "../components/LoadingSkeleton";
import MovieRow from "../components/MovieRow";
import { useFavorites } from "../context/FavoritesContext";
import { movieApi } from "../services/api";

const createSectionState = () => ({
  movies: [],
  page: 0,
  totalPages: 1,
  isLoadingMore: false,
});

const sectionConfig = {
  trending: movieApi.getTrending,
  popular: movieApi.getPopular,
  topRated: movieApi.getTopRated,
};

function Home() {
  const [sections, setSections] = useState({
    trending: createSectionState(),
    popular: createSectionState(),
    topRated: createSectionState(),
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [genres, setGenres] = useState([]);
  const [genreQuery, setGenreQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [genreSection, setGenreSection] = useState(createSectionState());
  const { favorites } = useFavorites();

  const mergeSectionPage = (key, data, append = false) => {
    setSections((current) => {
      const existingMovies = append ? current[key].movies : [];
      const mergedMovies = [...existingMovies, ...(data.results || [])];
      const uniqueMovies = mergedMovies.filter(
        (movie, index, allMovies) =>
          index === allMovies.findIndex((item) => item.id === movie.id),
      );

      return {
        ...current,
        [key]: {
          movies: uniqueMovies,
          page: data.page || 1,
          totalPages: data.total_pages || 1,
          isLoadingMore: false,
        },
      };
    });
  };

  useEffect(() => {
    const loadMovies = async () => {
      try {
        setIsLoading(true);
        setError("");

        const [trending, popular, topRated] = await Promise.all([
          movieApi.getTrending(1),
          movieApi.getPopular(1),
          movieApi.getTopRated(1),
        ]);
        const genreData = await movieApi.getGenres();

        setSections({
          trending: {
            movies: trending.results || [],
            page: trending.page || 1,
            totalPages: trending.total_pages || 1,
            isLoadingMore: false,
          },
          popular: {
            movies: popular.results || [],
            page: popular.page || 1,
            totalPages: popular.total_pages || 1,
            isLoadingMore: false,
          },
          topRated: {
            movies: topRated.results || [],
            page: topRated.page || 1,
            totalPages: topRated.total_pages || 1,
            isLoadingMore: false,
          },
        });
        setGenres(genreData.genres || []);
      } catch (loadError) {
        setError(
          loadError.response?.data?.message ||
            "We couldn't load movies right now. Please check your API key and try again.",
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadMovies();
  }, []);

  const loadGenreMovies = async (genre, page = 1) => {
    if (!genre?.id) {
      return;
    }

    setGenreSection((current) => ({
      ...current,
      isLoadingMore: true,
      ...(page === 1 ? createSectionState() : {}),
    }));

    try {
      const data = await movieApi.getMoviesByGenre(genre.id, page);

      setGenreSection({
        movies: data.results || [],
        page: data.page || 1,
        totalPages: data.total_pages || 1,
        isLoadingMore: false,
      });
    } catch (_error) {
      setGenreSection((current) => ({
        ...current,
        isLoadingMore: false,
      }));
    }
  };

  const loadMoreMovies = async (sectionKey) => {
    const section = sections[sectionKey];

    if (section.isLoadingMore || section.page >= section.totalPages) {
      return;
    }

    setSections((current) => ({
      ...current,
      [sectionKey]: {
        ...current[sectionKey],
        isLoadingMore: true,
      },
    }));

    try {
      const data = await sectionConfig[sectionKey](section.page + 1);
      mergeSectionPage(sectionKey, data, true);
    } catch (_error) {
      setSections((current) => ({
        ...current,
        [sectionKey]: {
          ...current[sectionKey],
          isLoadingMore: false,
        },
      }));
    }
  };

  const heroMovie = sections.trending.movies[0] || sections.popular.movies[0];

  return (
    <main className="pb-16">
      {isLoading ? <LoadingSkeleton variant="hero" /> : <Hero movie={heroMovie} />}

      {error ? (
        <div className="mx-6 mt-10 rounded-3xl border border-red-500/20 bg-red-500/10 p-6 text-red-100 md:mx-12">
          <h2 className="text-xl font-semibold">Unable to load CinemaNova</h2>
          <p className="mt-2 text-sm text-red-100/80">{error}</p>
        </div>
      ) : (
        <div className="mt-10 space-y-10">
          <GenreBrowser
            genres={genres}
            selectedGenreId={selectedGenre?.id || null}
            genreQuery={genreQuery}
            onGenreQueryChange={setGenreQuery}
            onSelectGenre={(genre) => {
              setSelectedGenre(genre);
              loadGenreMovies(genre, 1);
            }}
            onClearGenre={() => {
              setSelectedGenre(null);
              setGenreSection(createSectionState());
              setGenreQuery("");
            }}
          />

          {selectedGenre ? (
            <div id="genres">
              <GenreMovieGrid
                title={`${selectedGenre.name} Picks`}
                movies={genreSection.movies}
                isLoading={
                  genreSection.isLoadingMore ||
                  (genreSection.page === 0 && genreSection.movies.length === 0)
                }
                page={genreSection.page}
                totalPages={genreSection.totalPages}
                onPreviousPage={() =>
                  loadGenreMovies(
                    selectedGenre,
                    Math.max(1, genreSection.page - 1),
                  )
                }
                onNextPage={() =>
                  loadGenreMovies(
                    selectedGenre,
                    Math.min(genreSection.totalPages, genreSection.page + 1),
                  )
                }
              />
            </div>
          ) : null}

          {favorites.length > 0 && (
            <section className="space-y-4">
              <div className="px-6 md:px-12">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Your Favorites</h2>
                <p className="text-sm text-emerald-700/80 dark:text-emerald-200/70">
                  Quick access to the movies you saved locally.
                </p>
              </div>
              <div className="overflow-x-auto px-6 pb-3 md:px-12">
                <div className="grid grid-flow-col auto-cols-[42%] gap-4 md:auto-cols-[24%] lg:auto-cols-[18%] xl:auto-cols-[15%]">
                  {favorites.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                  ))}
                </div>
              </div>
            </section>
          )}

          <div id="trending">
            <MovieRow
              title="Trending Now"
              movies={sections.trending.movies}
              isLoading={isLoading}
              page={sections.trending.page}
              totalPages={sections.trending.totalPages}
              isLoadingMore={sections.trending.isLoadingMore}
              onLoadMore={() => loadMoreMovies("trending")}
            />
          </div>
          <div id="popular">
            <MovieRow
              title="Popular on CinemaNova"
              movies={sections.popular.movies}
              isLoading={isLoading}
              page={sections.popular.page}
              totalPages={sections.popular.totalPages}
              isLoadingMore={sections.popular.isLoadingMore}
              onLoadMore={() => loadMoreMovies("popular")}
            />
          </div>
          <div id="top-rated">
            <MovieRow
              title="Top Rated"
              movies={sections.topRated.movies}
              isLoading={isLoading}
              page={sections.topRated.page}
              totalPages={sections.topRated.totalPages}
              isLoadingMore={sections.topRated.isLoadingMore}
              onLoadMore={() => loadMoreMovies("topRated")}
            />
          </div>
        </div>
      )}
    </main>
  );
}

export default Home;
