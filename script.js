const body = document.querySelector("body");
const table = document.querySelector("table");
const submitBtn = document.querySelector("#submitBtn");

const myLibrary = [
  {
    title: "The Bible",
    author: "?",
    pages: "a lot",
    read: "false",
    notReadYet: "true",
  },
  {
    title: "The Koran",
    author: "?",
    pages: "a lot",
    read: "false",
    notReadYet: "true",
  },
  {
    title: "The Tanach",
    author: "?",
    pages: "a lot",
    read: "false",
    notReadYet: "true",
  },
  {
    title: "Pastafari",
    author: "Fliegendes Spaghettimonster",
    pages: "a lot",
    read: "false",
    notReadYet: "true",
  },
];

function Book(title, author, pages, read) {
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
  }
  this.title = title;
  this.author = author;
  this.pages = pages;
  // if (read == false || read == true) {
  this.read = read;
  // } else {
  //   throw Error("You must chose here between true and false");
  // }
  this.notReadYet = !read;
  this.info = function () {
    return `${title} by ${author}, ${pages} pages, ${read}`;
  };
}

function addBookToLibrary(title, author, pages, read) {
  let book = new Book(title, author, pages, read);
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
    content.innerHTML = `<td>${myLibrary[i].title}</td>
            <td>${myLibrary[i].author}</td>
            <td>${myLibrary[i].pages}</td>
            <td>${myLibrary[i].read}</td>
            <td>${myLibrary[i].notReadYet}</td>`;
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

// function displayForm() {
//   newBookButton.addEventListener("click", () => {
//     const form = document.createElement("form");
//     // form.innerHTML = `<form action="example.com/path" method="post">
//     //   <label for="title">Title:</label>
//     //   <input type="text" id="title" name="title" placeholder="The Bible" />
//     //   <label for="author">Author:</label>
//     //   <input type="text" id="author" name="author" placeholder="Who knows?" />
//     //   <label for="pages">Pages:</label>
//     //   <input type="number" id="pages" name="pages" placeholder="50" />
//     //   <label for="read">read?</label>
//     //   <input type="radio" id="read" name="read_status" value="read" />
//     //   <label for="not read yet">not read yet?</label>
//     //   <input
//     //     type="radio"
//     //     id="not read yet"
//     //     name="read_status"
//     //     value="not read yet"
//     //   />
//     //   <button type="submit" onclick="storeInput()" id="submitBtn">Submit</button>
//     // </form>`;
//     body.appendChild(form);
//   });
// }

// displayForm();

const form = document.querySelector("form");

submitBtn.addEventListener("click", (event) => {
  event.preventDefault();
});

function storeInput() {
  // Initialize an empty object
  let inputObject = {};

  // Get the input elements
  const title = document.getElementById("title");
  const author = document.getElementById("author");
  const pages = document.getElementById("pages");
  const readStatus = document.querySelector('input[name="rate_status"]:checked').value;
  // const read = document.getElementById("read");
  // const notReadYet = document.getElementById("not-read-yet");

  // Get the values of the input elements
  const value1 = title.value;
  const value2 = author.value;
  const value3 = pages.value;
  const value4 = readStatus.value;
  // const value5 = notReadYet.value;

  // Add the values to the object
  inputObject = {
    title: value1,
    author: value2,
    pages: value3,
    readStatus: value4,
    // read: value4,
    // notReadYet: value5,
  };

  // Print the array to the console
  console.log(inputObject);
}

// function createNewBook() {
//   form.addEventListener("submit", (event) => {
//     event.preventDefault();

//     let bookFormInputs = {
//       name: form.elements.title.value,
//       author: form.elements.author.value,
//       pages: form.elements.pages.value,
//       read: form.elements.read.value,
//     }
//     console.log(bookFormInputs);
//     return bookFormInputs;
//   });
// }

// createNewBook();
