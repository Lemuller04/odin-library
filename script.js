const myLibrary = [];

function Book(title, author, year) {
  this.title = title;
  this.author = author;
  this.year = year;
  this.id = crypto.randomUUID();
}

function addBookToLibrary(title, author, year) {
  myLibrary.push(new Book(title, author, year));
}

function listBooks() {
  const main = document.querySelector(".table-container");
  const table = document.createElement("table");
  let keys = Object.keys(myLibrary[0]);
  keys.pop();

  addTableHeader(table, keys);

  myLibrary.forEach((book) => {
    const tr = document.createElement("tr");

    keys.forEach((key) => {
      const td = document.createElement("td");
      td.textContent = book[key];
      tr.appendChild(td);
    });

    const td = document.createElement("td");
    td.textContent = "Remove";
    td.id = book.id;
    td.classList.add("remove");
    tr.appendChild(td);
    table.appendChild(tr);
  });

  main.appendChild(table);
}

function addTableHeader(table, keys) {
  const tr = document.createElement("tr");

  keys.forEach((key) => {
    const th = document.createElement("th");
    th.textContent = capitalize(key);
    tr.appendChild(th);
  });

  table.appendChild(tr);
}

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

addBookToLibrary("Book 1", "Author 1", 1991);
addBookToLibrary("Book 2", "Author 2", 1992);
addBookToLibrary("Book 3", "Author 3", 1993);
addBookToLibrary("Book 4", "Author 4", 1994);
addBookToLibrary("Book 5", "Author 5", 1995);

listBooks();

const addBookButton = document.querySelector(".add-book");
let removeBookButtons = document.querySelectorAll(".remove");

addBookButton.addEventListener("click", () => {
  alert("hi");
});

removeBookButtons.forEach(
  (button) =>
    (button.onclick = () => {
      let buttonId = button.id;
      const book = myLibrary.find((book) => book.id === buttonId);
      const index = myLibrary.indexOf(book);
      button.parentNode.remove();
      myLibrary.splice(index, 1);
    }),
);
