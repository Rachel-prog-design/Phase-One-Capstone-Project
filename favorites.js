// favorites.js

// Get favorites from localStorage
export function getFavorites() {
  return JSON.parse(localStorage.getItem("favorites")) || [];
}

// Save favorites to localStorage
function saveFavorites(favorites) {
  localStorage.setItem("favorites", JSON.stringify(favorites));
}

// Add book to favorites
export function addFavorite(book) {
  const favorites = getFavorites();
  favorites.push(book);
  saveFavorites(favorites);
}

// Remove book from favorites
export function removeFavorite(title) {
  let favorites = getFavorites();
  favorites = favorites.filter(book => book.title !== title);
  saveFavorites(favorites);
}