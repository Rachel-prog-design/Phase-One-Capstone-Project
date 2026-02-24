// fetchBooks.js

const BASE_URL = "https://openlibrary.org/search.json";

export async function fetchBooks(query = "programming") {
  try {
    const response = await fetch(`${BASE_URL}?q=${query}`);

    if (!response.ok) {
      throw new Error("Failed to fetch books");
    }

    const data = await response.json();
    return data.docs.slice(0, 12); // limit to 12 books

  } catch (error) {
    console.error("Error fetching books:", error);
    return [];
  }
}