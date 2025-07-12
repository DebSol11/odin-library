// Selectors
const body = document.querySelector("body");
const tableBody = document.querySelector("tbody");
const submitBtn = document.querySelector("#submitBtn");
const newBookButton = document.querySelector(".newBookButton");
const form = document.querySelector("form");
const contentWrap = document.querySelector(".content-wrap");

// Global Scope Array of Objects
const myLibrary = [
  {
    title: "The Bible",
    author: "David, Lukas, Moses, et al.",
    pages: "a lot",
    id: self.crypto.randomUUID(),
    read: false,
    notRead: true, //Issues to solve
  },
  {
    title: "Pastafari",
    author: "Fliegendes Spaghettimonster",
    pages: "a lot",
    id: self.crypto.randomUUID(),
    read: false,
    notRead: "true",
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
console.log(addBookToLibrary("Testtitel 1", "Testauthor 1", "77"));
console.log(addBookToLibrary("Testtitel 2", "Testauthor 2", "122"));


function displayBooks() {
  for (let i = 0; i < myLibrary.length; i++) {
    let content = document.createElement("tr");
    content.classList.add(`bookEntity${i}`);
    content.setAttribute("data-id", `${myLibrary[i].id}`);
    content.innerHTML = `<td>${myLibrary[i].title}</td>
            <td>${myLibrary[i].author}</td>
            <td>${myLibrary[i].pages}</td>
            <td>
            <label for="read">
            <input type="radio" id="read" name="read-status${i}">
            </label>
            </td>
            <td>
            <label for="notRead">
            <input type="radio" id="notRead" name="read-status${i}" checked>
            </label>
            </td>
            <td><button type="button" id="removeButton${i}" class ="remove-button">Remove</button></td>`;
    tableBody.appendChild(content);
  }
}


displayBooks();

const removeButtonsNodeList = document.querySelectorAll(".remove-button");

function displayForm() {
  const form = document.getElementById("formToggle");
  if (form.style.display === "none" || form.style.display === "") {
    form.style.display = "block";
  } else {
    form.style.display = "none";
  }
}


newBookButton.addEventListener("click", () => {
  displayForm();
});


submitBtn.addEventListener("click", (event) => {
  event.preventDefault();
  clearTable();
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
  myLibrary.push(inputObject);
}

function clearTable() {
  const rowCount = tableBody.rows.length; // Get the number of rows
  // Loop through rows in reverse and delete each one
  for (let i = rowCount - 1; i >= 0; i--) {
    // The deleteRow method removes rows based on their index.
    // The loop starts from the last row and goes backwards. When we loop in forward, the position (index) of the remaining rows would change after each deletion. So to prevent this issue, we loop in reverse.
    tableBody.deleteRow(i);
  }
}

function addClickListenerForRemoveButton () {
  for (let i = 0; i < removeButtonsNodeList.length; i++) {
    removeButtonsNodeList[i].addEventListener("click", (event) => {
      console.log("Clicked on: #id-" + event.target.id)
    });
  }
}

addClickListenerForRemoveButton();

