// favorites.js

// Wait until the page is fully loaded
document.addEventListener("DOMContentLoaded", function () {

  // Select all "Add to Favorites" buttons
  const favButtons = document.querySelectorAll(".book-card button");

  favButtons.forEach(button => {
    button.addEventListener("click", function () {

      const card = button.closest(".book-card");

      const title = card.querySelector("h4").textContent.trim();
      const author = card.querySelector("p").textContent.replace("Author:", "").trim();
      const image = card.querySelector("img").getAttribute("src");

      const book = { title, author, image };

      // Get existing favorites from localStorage
      let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

      // Prevent duplicates
      const exists = favorites.some(item => item.title === book.title);

      if (!exists) {
        favorites.push(book);
        localStorage.setItem("favorites", JSON.stringify(favorites));
        alert(`${title} added to favorites!`);
      } else {
        alert(`${title} is already in favorites.`);
      }

    });
  });

});