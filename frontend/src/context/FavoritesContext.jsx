import { createContext, useContext, useEffect, useMemo, useState } from "react";

const FavoritesContext = createContext(null);

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    if (typeof window === "undefined") {
      return [];
    }

    const stored = localStorage.getItem("cinemanova-favorites");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("cinemanova-favorites", JSON.stringify(favorites));
  }, [favorites]);

  const value = useMemo(
    () => ({
      favorites,
      isFavorite: (movieId) => favorites.some((movie) => movie.id === movieId),
      toggleFavorite: (movie) => {
        setFavorites((current) => {
          const exists = current.some((item) => item.id === movie.id);
          return exists
            ? current.filter((item) => item.id !== movie.id)
            : [...current, movie];
        });
      },
    }),
    [favorites],
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export const useFavorites = () => {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }

  return context;
};
