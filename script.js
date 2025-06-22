const myLibrary = [];

function Book(title, author, year, read) {
  this.title = title;
  this.author = author;
  this.year = year;
  this.read = read ? "Read" : "Not Read";
  this.id = crypto.randomUUID();
}

function addBookToLibrary(title, author, year, read = false) {
  myLibrary.push(new Book(title, author, year, read));
}

// Creates a table on the page by iterating over the myLibrary array
function listBooks() {
  const main = document.querySelector(".table-container");

  while (main.firstChild) {
    main.removeChild(main.firstChild);
  }

  const table = document.createElement("table");
  const caption = document.createElement("caption");
  const thead = document.createElement("thead");
  const tbody = document.createElement("tbody");

  caption.textContent = "List of Books";
  table.appendChild(caption);
  table.appendChild(thead);
  table.appendChild(tbody);

  if (myLibrary.length < 1) {
    main.textContent = "It looks like the library is empty";
    return;
  }

  let keys = Object.keys(myLibrary[0]);
  keys.pop();
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
    removeButton.classList.add("remove");
    removeButton.id = book.id;

    removeButton.addEventListener("click", () => {
      let buttonId = removeButton.id;
      const book = myLibrary.find((book) => book.id === buttonId);
      const index = myLibrary.indexOf(book);
      removeButton.parentNode.remove();
      myLibrary.splice(index, 1);
      listBooks();
    });

    td.appendChild(removeButton);
    tr.appendChild(td);
    tbody.appendChild(tr);
  });

  let removeBookButtons = document.querySelectorAll(".remove");
  removeBookButtons.forEach((button) => (button.onclick = () => {}));

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

addBookToLibrary("Book 1", "Author 1", 1991, true);
addBookToLibrary("Book 2", "Author 2", 1992, true);
addBookToLibrary("Book 3", "Author 3", 1993);
addBookToLibrary("Book 4", "Author 4", 1994);
addBookToLibrary("Book 5", "Author 5", 1995);

listBooks();

// Buttons related code
const openModal = document.querySelector("[data-open-modal]");
const closeModal = document.querySelector("[data-close-modal]");
const modal = document.querySelector("[data-model]");
const form = document.querySelector("form");

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

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let title = document.querySelector("input[name=title]").value;
  let author = document.querySelector("input[name=author]").value;
  let year = document.querySelector("input[name=date]").value;
  let read = document.querySelector("input[type=checkbox]").checked;

  author = author.length < 1 ? "unknown" : author;
  year = year.length < 1 ? "unknown" : year;

  addBookToLibrary(title, author, year, read);
  listBooks();
  modal.close();
  form.reset();
});
