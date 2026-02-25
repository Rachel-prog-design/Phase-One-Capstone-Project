document.addEventListener("DOMContentLoaded", () => {

  // ===== ADD TO FAVORITES BUTTONS ON INDEX.HTML =====
  const favoriteButtons = document.querySelectorAll(".book-card button");

  favoriteButtons.forEach(button => {
    const card = button.closest(".book-card");
    const title = card.querySelector("h4").textContent.trim();

    // If book is already in favorites, mark as saved
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (favorites.some(book => book.title === title)) {
      button.textContent = "✅ Saved";
      button.disabled = true;
    }

    button.addEventListener("click", () => {
      const author = card.querySelector("p").textContent.replace("Author: ", "").trim();
      const imgSrc = card.querySelector("img").src;

      let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
      if (!favorites.some(book => book.title === title)) {
        favorites.push({ title, author, imgSrc });
        localStorage.setItem("favorites", JSON.stringify(favorites));
      }

      // Change button to saved
      button.textContent = "✅ Saved";
      button.disabled = true;
    });
  });

  // ===== DISPLAY FAVORITES ON favorites.html =====
  const favoritesContainer = document.getElementById("favorites-container");
  if (favoritesContainer) {
    // Show loading first
    favoritesContainer.innerHTML = "<p class='text-center text-gray-600'>Loading favorites...</p>";

    // Wait 3 seconds before displaying favorites
    setTimeout(() => {
      renderFavorites();
    }, 3000); // 3000ms = 3 seconds
  }

  function renderFavorites() {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    favoritesContainer.innerHTML = "";

    if (favorites.length === 0) {
      favoritesContainer.innerHTML = "<p class='text-center text-gray-600'>No favorite books yet.</p>";
      return;
    }

    favorites.forEach((book, index) => {
      const bookDiv = document.createElement("div");
      bookDiv.classList.add("book-card", "bg-white", "shadow", "rounded", "p-4");

      bookDiv.innerHTML = `
        <div class="h-64 overflow-hidden rounded mb-2">
          <img src="${book.imgSrc}" alt="${book.title}" class="w-full h-full object-cover">
        </div>
        <h4 class="font-bold">${book.title}</h4>
        <p class="text-sm text-gray-600">${book.author}</p>
        <button class="mt-2 w-full bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-500 transition remove-btn" data-index="${index}">
          Remove from Favorites
        </button>
      `;

      favoritesContainer.appendChild(bookDiv);
    });

    // Remove functionality
    const removeButtons = favoritesContainer.querySelectorAll(".remove-btn");
    removeButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        const index = parseInt(btn.getAttribute("data-index"));
        removeFavorite(index);
      });
    });
  }

  function removeFavorite(index) {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    favorites.splice(index, 1);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    renderFavorites(); // refresh the list
  }

});