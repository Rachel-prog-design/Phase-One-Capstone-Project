import { addFavorite, getFavorites, removeFavorite } from "./favorites.js";

// Select all "Add to Favorites" buttons
const buttons = document.querySelectorAll(".add-to-favorites");

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const card = button.closest(".book-card");

    const book = {
      title: card.querySelector(".book-title").textContent,
      author: card.querySelector(".book-author").textContent
    };

    addFavorite(book);
    alert("Book added to favorites!");
  });
});

// If on favorites page, display books
const favoritesContainer = document.querySelector("#favorites-container");

if (favoritesContainer) {
  const favorites = getFavorites();

  if (favorites.length === 0) {
    favoritesContainer.innerHTML = "<p>No favorite books yet.</p>";
  } else {
    favorites.forEach(book => {
      const div = document.createElement("div");
      div.className = "bg-white shadow rounded p-4";

      div.innerHTML = `
        <h4 class="font-bold">${book.title}</h4>
        <p class="text-sm text-gray-600">${book.author}</p>
        <button class="remove-btn bg-red-500 text-white px-3 py-1 rounded mt-2">
          Remove
        </button>
      `;

      div.querySelector(".remove-btn").addEventListener("click", () => {
        removeFavorite(book.title);
        location.reload();
      });

      favoritesContainer.appendChild(div);
    });
  }
}