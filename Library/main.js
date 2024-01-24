const library = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

const formdiv = document.querySelector('.forms');
const button = document.querySelector('.openbutton');
const submitbutton = document.querySelector("button[type='submit']");
const form_container = document.querySelector('.form_container');

button.addEventListener('click', () => {
    formdiv.style.cssText = "display:block";
    button.style.cssText = "display:none";
});

const input = document.querySelector("input");

const title = document.querySelector("#title");
const author = document.querySelector("#author");
const pages = document.querySelector("#pages");
const read = document.querySelector("#read");

function addBooktoLibrary() {
    if (read.checked) {
        const abook = new Book(title.value, author.value, pages.value, "read");
        library.push(abook);
    } else {
        const abook = new Book(title.value, author.value, pages.value, "not read");
        library.push(abook);
    }
}

form_container.addEventListener("submit", (e) => {
    e.preventDefault();
    addBooktoLibrary();
    console.log(library);
    title.value = '';
    author.value = '';
    pages.value = '';

    formdiv.style.cssText = "display:none";
    button.style.cssText = "display:block";
    displaybook();
});

const body = document.querySelector('.body');
const readButton = document.createElement('button');
readButton.innerText = "Read";
const deleteButton = document.createElement('button');
deleteButton.innerText = "Delete";

function displaybook() {
    body.innerHTML = "";

    library.forEach(book => {
        const card = document.createElement('div');
        card.className = 'book-card'; 

        const titleElement = document.createElement('h2');
        titleElement.innerText = book.title;
        card.appendChild(titleElement);

        const authorElement = document.createElement('p');
        authorElement.innerText = `Author: ${book.author}`;
        card.appendChild(authorElement);

        const pagesElement = document.createElement('p');
        pagesElement.innerText = `Pages: ${book.pages}`;
        card.appendChild(pagesElement);

        const readElement = document.createElement('p');
        readElement.innerText = `Read: ${book.read}`;
        card.appendChild(readElement);

        const readButtonClone = readButton.cloneNode(true);
        readButtonClone.addEventListener('click', () => toggleReadStatus(book));
        card.appendChild(readButtonClone);

        const deleteButtonClone = deleteButton.cloneNode(true);
        deleteButtonClone.addEventListener('click', () => removeBook(book, card)); 
        card.appendChild(deleteButtonClone);

        body.appendChild(card);
    });
}

function toggleReadStatus(book) {
    book.read = book.read === 'read' ? 'not read' : 'read';
    displaybook();
}

function removeBook(book, card) {
    const index = library.indexOf(book);
    if (index !== -1) {
        library.splice(index, 1);
        body.removeChild(card);
    }
}

