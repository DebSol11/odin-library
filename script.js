// Selectors
const body = document.querySelector("body");
const table = document.querySelector("table");
const submitBtn = document.querySelector("#submitBtn");
const bookRows = document.querySelectorAll(".bookEntity")

// Global Scope Array of Objects
const myLibrary = [
  {
    title: "The Bible",
    author: "?",
    pages: "a lot",
  },
  {
    title: "Pastafari",
    author: "Fliegendes Spaghettimonster",
    pages: "a lot",
  },
];

function Book(title, author, pages) {
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
  }
  this.title = title;
  this.author = author;
  this.pages = pages;
}

function addBookToLibrary(title, author, pages) {
  let book = new Book(title, author, pages);
  // Universally Unique Identifier = uuid
  book.id = self.crypto.randomUUID();
  myLibrary.push(book);
  return myLibrary;
}

console.log(myLibrary);
console.log(addBookToLibrary("lol", "lolus", "77", "true"));
console.log(addBookToLibrary("test", "test2", "122", "false"));

function displayBooks() {
  for (let i = 0; i < myLibrary.length; i++) {
    let content = document.createElement("tr");
    content.classList.add("bookEntity");
    content.innerHTML = `<td>${myLibrary[i].title}</td>
            <td>${myLibrary[i].author}</td>
            <td>${myLibrary[i].pages}</td>`;
    table.appendChild(content);
  }
}

function addButton() {
  const newBookButton = document.createElement("button");
  newBookButton.textContent = "New Book";
  newBookButton.classList.add("newBookButton");
  body.appendChild(newBookButton);
}

displayBooks();
addButton();

const newBookButton = document.querySelector(".newBookButton");

const form = document.querySelector("form");

submitBtn.addEventListener("click", (event) => {
  event.preventDefault();
  addInput();
  displayBooks();
});

function addInput() {
  // Initialize an empty object
  let inputObject = {};
  // Get the input elements
  const title = document.getElementById("title");
  const author = document.getElementById("author");
  const pages = document.getElementById("pages");
  // Add the values to the object
  inputObject = {
    title: title.value,
    author: author.value,
    pages: pages.value,
  };
  //Add the object to the array
  myLibrary.push(inputObject)
}

function clearBrowserWindow() {

}
