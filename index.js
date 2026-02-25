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

document.addEventListener("DOMContentLoaded", () => {

  const searchInput = document.getElementById("search-input");
  const searchBtn = document.getElementById("search-btn");
  const allBookCards = Array.from(document.querySelectorAll(".book-card"));
  const allGrids = document.querySelectorAll(".grid");

  searchBtn.addEventListener("click", (e) => {

    e.preventDefault(); // stop form refresh

    const query = searchInput.value.trim().toLowerCase();

    // Show loading message
    allGrids.forEach(grid => {
      grid.innerHTML = `
        <p class="text-center text-gray-600 col-span-full">
          Searching books...
        </p>
      `;
    });

    // Wait 3 seconds
    setTimeout(() => {

      const matchedBooks = allBookCards.filter(card => {
        const title = card.querySelector("h4")?.textContent.toLowerCase();
        const author = card.querySelector("p")?.textContent.toLowerCase();
        return title.includes(query) || author.includes(query);
      });

      // Clear all grids
      allGrids.forEach(grid => grid.innerHTML = "");

      if (matchedBooks.length === 0) {
        if (allGrids.length > 0) {
          allGrids[0].innerHTML = `
            <p class="text-center text-gray-600 col-span-full">
              No books found.
            </p>
          `;
        }
        return;
      }

      // Show matched books
      matchedBooks.forEach(card => {
        allGrids[0].appendChild(card);
      });

    }, 3000);

  });

});
