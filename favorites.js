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
// DOM Elements
const booksList = document.querySelector("#books-list");

// Load favorites from localStorage
function getFavorites() {
  const favorites = localStorage.getItem("favorites");
  return favorites ? JSON.parse(favorites) : [];
}

// Save favorites to localStorage
function saveFavorites(favorites) {
  localStorage.setItem("favorites", JSON.stringify(favorites));
}

// Display favorites on the page
function displayFavorites(favorites) {
  booksList.innerHTML = "";

  if (favorites.length === 0) {
    booksList.innerHTML = `
      <p class="text-center text-red-500 col-span-full">No favorite books yet.</p>
    `;
    return;
  }

  favorites.forEach((book, index) => {
    const bookCard = document.createElement("div");
    bookCard.className = "bg-white shadow rounded p-4";

    bookCard.innerHTML = `
      <div class="h-64 overflow-hidden rounded mb-4">
        <img src="${book.cover || 'https://via.placeholder.com/150'}" alt="${book.title}" class="w-full h-full object-cover" />
      </div>
      <h4 class="font-bold">${book.title}</h4>
      <p class="text-sm text-gray-600">by: ${book.author}</p>
      <button class="remove-favorite bg-red-600 text-white px-3 py-1 rounded mt-2 hover:bg-red-700" data-index="${index}">
        Remove from Favorites
      </button>
    `;

    booksList.appendChild(bookCard);
  });

  // Add event listeners for Remove buttons
  document.querySelectorAll(".remove-favorite").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const idx = e.target.dataset.index;
      favorites.splice(idx, 1);
      saveFavorites(favorites);
      displayFavorites(favorites);
    });
  });
}

// Initial display
let favorites = getFavorites();
displayFavorites(favorites);


// Search Functionality

// Create a search input above the books list dynamically
const searchContainer = document.createElement("div");
searchContainer.className = "flex justify-center mb-6 gap-2";

searchContainer.innerHTML = `
  <input type="text" id="favorites-search" placeholder="Search favorite books..." class="border p-2 rounded w-64" />
  <button id="favorites-search-btn" class="bg-blue-600 text-white px-4 py-2 rounded">Search</button>
`;

booksList.parentNode.insertBefore(searchContainer, booksList);

// Search button event
const searchInput = document.querySelector("#favorites-search");
const searchBtn = document.querySelector("#favorites-search-btn");

searchBtn.addEventListener("click", () => {
  const query = searchInput.value.toLowerCase().trim();

  const filtered = favorites.filter(book => 
    book.title.toLowerCase().includes(query) ||
    book.author.toLowerCase().includes(query)
  );

  displayFavorites(filtered);
});
localStorage.setItem("favorites", JSON.stringify([
  { title: "Book 1", author: "Author A", cover: "1.webp" },
  { title: "Book 2", author: "Author B", cover: "2.jfif" }
]));