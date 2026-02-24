import { addFavorite, getFavorites, removeFavorite } from "./favorites.js";
import { fetchBooks } from "./fetchBooks.js";
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

const booksContainer = document.querySelector("#books-container");

async function displayBooks(query) {
  booksContainer.innerHTML = "<p class='text-center'>Loading...</p>";

  const books = await fetchBooks(query);

  if (books.length === 0) {
    booksContainer.innerHTML = "<p class='text-center text-red-500'>No results found.</p>";
    return;
  }

  booksContainer.innerHTML = "";

  books.forEach(book => {
    const bookCard = document.createElement("div");
    bookCard.className = "book-card bg-white shadow rounded p-4";

    const coverId = book.cover_i
      ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
      : "https://via.placeholder.com/150";

    bookCard.innerHTML = `
      <div class="h-64 overflow-hidden rounded">
        <img src="${coverId}" class="w-full h-full object-cover" />
      </div>
      <h4 class="book-title font-bold mt-2">${book.title}</h4>
      <p class="book-author text-sm text-gray-600">
        Author: ${book.author_name ? book.author_name[0] : "Unknown"}
      </p>
      <button class="add-to-favorites bg-blue-600 text-white px-3 py-1 rounded mt-2">
        Add to Favorites
      </button>
    `;

    booksContainer.appendChild(bookCard);
  });
}

if (booksContainer) {
  displayBooks("programming");
}