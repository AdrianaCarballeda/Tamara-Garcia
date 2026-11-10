
async function loadBooks() {
  const container = document.getElementById("books-container");

  if (!container) return;

  try {
    const response = await fetch("../data/libros.json");

    if (!response.ok) {
      throw new Error("Error loading books");
    }

    const books = await response.json();

    container.innerHTML = "";

    books.forEach((book) => {
      const card = document.createElement("div");
      card.className = "book-card";

      const cover = document.createElement("img");
      cover.src = "../" + book.cover;
      cover.alt = `Cover of ${book.title}`;

      const title = document.createElement("h3");
      title.textContent = book.title;

      const author = document.createElement("p");
      author.textContent = `Autor: ${book.author}`;

      const description = document.createElement("p");
      description.textContent = book.description || "Libro digital gratis";

      const readLink = document.createElement("a");
      readLink.href = "../" + book.pdf;
      readLink.target = "_blank";
      readLink.rel = "noopener";
      readLink.textContent = "Leer Online";

      const downloadLink = document.createElement("a");
      downloadLink.href = "../" + book.pdf;
      downloadLink.setAttribute("download", "");
      downloadLink.textContent = "Descargar PDF";

      card.append(
        cover,
        title,
        author,
        description,
        readLink,
        document.createTextNode("  "),
        downloadLink
      );

      container.appendChild(card);
    });

  } catch (error) {
    console.error("Error:", error);
    container.textContent = "No se pudieron cargar los libros.";
  }
}

loadBooks();
