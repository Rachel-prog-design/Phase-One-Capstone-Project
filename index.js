document.addEventListener("DOMContentLoaded", () => {

  const searchInput = document.getElementById("search-input");
  const searchBtn = document.getElementById("search-btn");
  const grid = document.querySelector(".grid");

  searchBtn.addEventListener("click", async (e) => {
    e.preventDefault();

    const query = searchInput.value.trim();

    if (!query) {
      alert("Please enter a book name");
      return;
    }

    // Show loading message
    grid.innerHTML = `
      <p class="text-center text-gray-600 col-span-full">
        Searching books...
      </p>
    `;

    try {

      const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);

      const data = await response.json();

      grid.innerHTML = "";

      if (!data.items) {
        grid.innerHTML = `
          <p class="text-center text-gray-600 col-span-full">
            No books found.
          </p>
        `;
        return;
      }

      data.items.forEach(book => {

        const title = book.volumeInfo.title || "No Title";
        const author = book.volumeInfo.authors?.[0] || "Unknown Author";
        const img = book.volumeInfo.imageLinks?.thumbnail || "";

        const bookDiv = document.createElement("div");
        bookDiv.className = "book-card bg-white shadow rounded p-4";

        bookDiv.innerHTML = `
          <div class="h-64 overflow-hidden rounded mb-2">
            <img src="${img}" alt="${title}" class="w-full h-full object-cover">
          </div>
          <h4 class="font-bold">${title}</h4>
          <p class="text-sm text-gray-600">${author}</p>
         <button 
           class="add-fav mt-2 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            data-title="${title}"
            data-author="${author}"
            data-img="${img}">
            Add to Favorites
          </button>
        `;

        grid.appendChild(bookDiv);

      });

    } catch (error) {

      grid.innerHTML = `
        <p class="text-center text-red-600 col-span-full">
          Please check your internet connection.
        </p>
      `;

      console.error(error);
    }

  });

  // ADD TO FAVORITES
  document.addEventListener("click", (e) => {

    if(e.target.classList.contains("add-fav")){

      const title = e.target.dataset.title;
      const author = e.target.dataset.author;
      const img = e.target.dataset.img;

      const book = {title, author, img};

      let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

      favorites.push(book);

      localStorage.setItem("favorites", JSON.stringify(favorites));

      alert("Book added to favorites!");

    }

  });

});