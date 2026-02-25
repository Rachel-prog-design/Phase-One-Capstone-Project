document.addEventListener("DOMContentLoaded", () => {

  const searchInput = document.getElementById("search-input");
  const searchBtn = document.getElementById("search-btn");
  const bookCards = document.querySelectorAll(".book-card");

  // Search button click
  searchBtn.addEventListener("click", function () {

    const searchValue = searchInput.value.toLowerCase().trim();

    bookCards.forEach(card => {

      const title = card.querySelector("h4").textContent.toLowerCase();

      if (title.includes(searchValue)) {
        card.style.display = "block";   // show matching book
      } else {
        card.style.display = "none";    // hide non-matching book
      }

    });

  });

});

