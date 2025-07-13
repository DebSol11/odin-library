// Selectors
const body = document.querySelector("body");
const tableBody = document.querySelector("tbody");
const submitBtn = document.querySelector("#submitBtn");
const newBookButton = document.querySelector(".newBookButton");
const form = document.querySelector("form");
const contentWrap = document.querySelector(".content-wrap");
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

function Book(title, author, pages, read) {
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
  }
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.toggleRead = function () {
  this.read = !this.read;
};

function toggleRead(index) {
  myLibrary[index].toggleRead();
  displayBooks();
}

function addBookToLibrary(title, author, pages, read) {
  let book = new Book(title, author, pages, read);
  // Universally Unique Identifier = uuid
  // book.id = self.crypto.randomUUID();
  myLibrary.push(book);
  return myLibrary;
}

console.log(myLibrary);

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
  console.log(myLibrary);
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
        console.log(event);
        console.log("Checkbox is checked..");
        myLibrary[i]["read-status"] = "read";
        console.log(myLibrary);
      } else {
        console.log("Checkbox is not checked ");
        myLibrary[i]["read-status"] = "not read";
        console.log(myLibrary);
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
    form.style.display = "flex";
    form.style.justifyContent = "center";
  } else {
    form.style.display = "none";
  }
}

newBookButton.addEventListener("click", () => {
  toggleFormDisplay();
});

submitBtn.addEventListener("click", (event) => {
  event.preventDefault();
  clearTable();
  addInput();
  displayBooks();
  toggleFormDisplay();
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
