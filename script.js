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

// Creates a table on the page by iterating over the myLibrary array
function listBooks() {
  const main = document.querySelector(".table-container");
  const table = document.createElement("table");
  const caption = document.createElement("caption");
  const thead = document.createElement("thead");
  const tbody = document.createElement("tbody");
  let keys = Object.keys(myLibrary[0]);
  keys.pop();

  caption.textContent = "List of Books";
  table.appendChild(caption);
  table.appendChild(thead);
  table.appendChild(tbody);

  addTableHeader(thead, keys);

  myLibrary.forEach((book) => {
    const tr = document.createElement("tr");

    keys.forEach((key) => {
      const td = document.createElement("td");
      td.textContent = book[key];
      tr.appendChild(td);
    });

    const td = document.createElement("td");
    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    td.appendChild(removeButton);
    td.id = book.id;
    td.classList.add("remove");
    tr.appendChild(td);
    tbody.appendChild(tr);
  });

  main.appendChild(table);
}

// Defines the table header based on the keys of the Book object
function addTableHeader(thead, keys) {
  const tr = document.createElement("tr");

  keys.forEach((key) => {
    const th = document.createElement("th");
    th.textContent = capitalize(key);
    th.setAttribute("scope", "col");
    tr.appendChild(th);
  });

  thead.appendChild(tr);
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

// Button related code
const openModal = document.querySelector("[data-open-modal]");
const closeModal = document.querySelector("[data-close-modal]");
const modal = document.querySelector("[data-model]");
const addBookButton = document.querySelector(".add-book");
let removeBookButtons = document.querySelectorAll(".remove");

openModal.addEventListener("click", () => {
  modal.showModal();
});

closeModal.addEventListener("click", () => {
  modal.close();
});

// Allows closing the modal by clicking outside of it
modal.addEventListener("click", (e) => {
  const dialogDimensions = modal.getBoundingClientRect();
  if (
    e.clientX < dialogDimensions.left ||
    e.clientX > dialogDimensions.right ||
    e.clientY < dialogDimensions.top ||
    e.clientY > dialogDimensions.bottom
  ) {
    modal.close();
  }
});

addBookButton.addEventListener("click", () => {
  modal.close();
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
