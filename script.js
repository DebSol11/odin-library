const body = document.querySelector("body");
const table = document.querySelector("table");

const myLibrary = [
  {
    title: "The Bible",
    author: "GOD",
    pages: "a lot",
    read: "not read yet",
  },
  {
    title: "The Koran",
    author: "GOD",
    pages: "a lot",
    read: "not read yet",
  },
  {
    title: "The Tanach",
    author: "GOD",
    pages: "a lot",
    read: "not read yet",
  },
  {
    title: "Pastafari",
    author: "Fliegendes Spaghettimonster",
    pages: "a lot",
    read: "not read yet",
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
console.log(addBookToLibrary("lol", "lolus", "77", "not read yet"));
console.log(addBookToLibrary("test", "test2", "122", "read"));

function displayBooks() {
  for (let i = 0; i < myLibrary.length; i++) {
    let content = document.createElement("tr");
    content.innerHTML = `<td>${myLibrary[i].title}</td>
            <td>${myLibrary[i].author}</td>
            <td>${myLibrary[i].pages}</td>
            <td>${myLibrary[i].read}</td>`;
    table.appendChild(content);
  }
}

function addButton() {
    const newBookButton = document.createElement("button");
    newBookButton.textContent = "New Book";
    body.appendChild(newBookButton);
}

displayBooks();
addButton();
