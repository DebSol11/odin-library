// Selectors
const body = document.querySelector("body");
const tableBody = document.querySelector("tbody");
const submitBtn = document.querySelector("#submitBtn");
const newBookButton = document.querySelector(".newBookButton");
const form = document.querySelector("form");
const contentWrap = document.querySelector(".content-wrap");
const title = document.getElementById("title");
const titleError = document.querySelector("#title + span.error");
const author = document.getElementById("author");
const authorError = document.querySelector("#author + span.error");
const pages = document.getElementById("pages");
const pagesError = document.querySelector("#pages + span.error");
let removeButtonsNodeList;

// Global Scope Array of Objects
const myLibrary = [
  {
    title: "The Bible",
    author: "David, Lukas, Moses, et al.",
    pages: "a lot",
    "read-status": "not read",
  },
  {
    title: "Pastafari",
    author: "Fliegendes Spaghettimonster",
    pages: "a lot",
    "read-status": "read",
  },
];

// Turn class into factory function, darling!

class Book {
  constructor({ title, author, pages, read }) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
  toggleRead() {
    this.read = !this.read;
  }
}

function toggleRead(index) {
  myLibrary[index].toggleRead();
  displayBooks();
}

function addBookToLibrary(title, author, pages, read) {
  let book = new Book(title, author, pages, read);
  // Universally Unique Identifier = uuid
  // Keep for sorting LATER
  // book.id = self.crypto.randomUUID();
  myLibrary.push(book);
  return myLibrary;
}

function displayBooks() {
  for (let i = 0; i < myLibrary.length; i++) {
    let content = document.createElement("tr");
    content.classList.add(`bookEntity${i}`);
    content.setAttribute("data-id", `${myLibrary[i].id}`);
    if (myLibrary[i]["read-status"] == "not read") {
      content.innerHTML = `<td>${myLibrary[i].title}</td>
            <td>${myLibrary[i].author}</td>
            <td>${myLibrary[i].pages}</td>
            <td class="checkbox-table-cell">
            <input type="checkbox" class="read-status" id="read${i}" name="read-status">
            </td>
            <td class="buttons"><button type="button" id="removeButton${i}" class="remove-button">Remove</button></td>`;
    } else {
      content.innerHTML = `<td>${myLibrary[i].title}</td>
            <td>${myLibrary[i].author}</td>
            <td>${myLibrary[i].pages}</td>
            <td class="checkbox-table-cell">
            <input type="checkbox" class="read-status" id="read${i}" name="read-status" checked>
            </td>
            <td class="buttons"><button type="button" id="removeButton${i}" class="remove-button">Remove</button></td>`;
    }
    tableBody.appendChild(content);
  }
  removeButtonsNodeList = document.querySelectorAll(".remove-button");
  listenForRemoveBtnClick();
  readStatusNodeList = document.querySelectorAll(".read-status");
  listenForCheckboxChange();
}

displayBooks();

function listenForRemoveBtnClick() {
  for (let i = 0; i < removeButtonsNodeList.length; i++) {
    removeButtonsNodeList[i].addEventListener("click", () => {
      removeBook(i);
    });
  }
}

function listenForCheckboxChange() {
  for (let i = 0; i < readStatusNodeList.length; i++) {
    readStatusNodeList[i].addEventListener("change", function (event) {
      if (event.target.checked) {
        myLibrary[i]["read-status"] = "read";
      } else {
        myLibrary[i]["read-status"] = "not read";
      }
    });
  }
}

function removeBook(index) {
  myLibrary.splice(index, 1);
  clearTable();
  displayBooks();
}

function toggleFormDisplay() {
  const form = document.getElementById("formToggle");
  if (form.style.display === "none" || form.style.display === "") {
    form.style.display = "inline";
  } else {
    form.style.display = "none";
  }
}

newBookButton.addEventListener("click", () => {
  toggleFormDisplay();
});

submitBtn.addEventListener("click", (event) => {
  // custom validity check
  if (!title.validity.valid ||
    !author.validity.valid ||
    !pages.validity.valid) {
    showError();
  } else {
    clearTable();
    addInput();
    displayBooks();
    toggleFormDisplay();
  }
  // prevent form submission
  event.preventDefault();
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

/***** Custom form validation *****/

title.addEventListener("input", (event) => {
  if (title.validity.valid) {
    titleError.textContent = ""; // Remove the message content
    titleError.className = "error"; // Removes the 'active' class
  } else {
    // If there is still an error, show the correct error
    showError();
  }
});

author.addEventListener("input", (event) => {
  if (author.validity.valid) {
    authorError.textContent = ""; // Remove the message content
    authorError.className = "error"; // Removes the 'active' class
  } else {
    // If there is still an error, show the correct error
    showError();
  }
});

pages.addEventListener("input", (event) => {
  if (pages.validity.valid) {
    pagesError.textContent = ""; // Remove the message content
    pagesError.className = "error"; // Removes the 'active' class
  } else {
    // If there is still an error, show the correct error
    showError();
  }
});

function showError() {
  if (title.validity.valueMissing) {
    // If empty
    titleError.textContent = "Please enter a title.";
  }
  // Add the `active` class
  titleError.className = "error active";
  if (author.validity.valueMissing) {
    // If empty
    authorError.textContent = "Who wrote that piece of art? Enter that sucker immediately.";
  }
  // Add the `active` class
  authorError.className = "error active";
  if (pages.validity.valueMissing) {
    // If empty
    pagesError.textContent = "How many pages does the book have, darling? Please enter this number.";
  }
  // Add the `active` class
  pagesError.className = "error active";
}
