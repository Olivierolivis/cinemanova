const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

export const getImageUrl = (path, size = "w780") =>
  path ? `${IMAGE_BASE_URL}/${size}${path}` : "/fallback-poster.svg";

export const formatRating = (rating) =>
  rating ? `${rating.toFixed(1)} / 10` : "No rating";
