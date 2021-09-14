let library = [];
const defaultLibraryJSON = `[{"title":"Harry Potter and the Philosopher's Stone","author":"J.K Rowling","pages":"223","readStatus":true,"id":"43b4f41d-2f08-44eb-ade2-e7f2d667863f"},{"title":"Harry Potter and the Chamber of Secrets","author":"J.K Rowling","pages":"251","readStatus":false,"id":"73ff0332-587b-4495-b289-26b9b6a95ebd"},{"title":"Harry Potter and the Prisoner of Azkaban","author":"J.K Rowling","pages":"317","readStatus":true,"id":"5259ed26-e436-4aea-aa3f-7975866f8e03"},{"title":"Harry Potter and the Goblet of Fire","author":"J.K Rowling","pages":"636","readStatus":false,"id":"13e98e12-358d-40b7-9754-cfe2f3576902"},{"title":"Harry Potter and the Order of the Phoenix","author":"J.K Rowling","pages":"766","readStatus":true,"id":"a9cf4f2f-6ac4-4762-94db-3b52e802fcc2"},{"title":"Harry Potter and the Half-Blood Prince","author":"J.K Rowling","pages":"607","readStatus":true,"id":"74e5c847-3d72-4fd8-ac13-1b32575cd325"},{"title":"Harry Potter and the Deathly Hallows","author":"J.K Rowling","pages":"607","readStatus":false,"id":"a025906a-2552-4376-b0d5-8c3505bd2d61"},{"title":"Possum Magic","author":"Mem Fox","pages":"17","readStatus":true,"id":"37f36191-f60d-45cd-8563-85492d479b30"}]`

class Book {
    constructor(title, author, pages, readStatus) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.readStatus = (readStatus == 1) ? true : false;
        this.id = uuidv4();
    }
}

const addBook = function addBook(book) {
    // push the book to our library array, and reset local storage
    library.push(book)
    localStorage.setItem('library', JSON.stringify(library))
    // add the book to the dom
    addBookToDom(book)
}

const readBook = function readBook(e) {
    const cards = document.querySelector('.cards'); 
    const bookCard = e.srcElement.parentElement.parentElement
    const btn = e.srcElement
    const id = e.srcElement.parentElement.parentElement.id
    const index = library.findIndex(book => book.id === id);
    const book = library[index];
    
    // remove the child from the DOM, as it will need to go back at the start or end.
    cards.removeChild(bookCard)

    // add the book to the start of the DOM if its been read, or the back if unread
    book.readStatus = !book.readStatus
    bookCard.classList.toggle('not-read')
    if (book.readStatus) {
        btn.textContent = 'Unread'
        cards.insertBefore(bookCard, cards.firstChild)
    }
    else {
        btn.textContent = 'Read'
        cards.appendChild(bookCard)
    }
    localStorage.setItem('library', JSON.stringify(library))
}

const deleteBook = function deleteBook(e) {
    const cards = document.querySelector('.cards'); 
    const id = e.srcElement.parentElement.parentElement.id;
    const index = library.findIndex(book => book.id === id);
    const bookCard = e.srcElement.parentElement.parentElement;

    // remove the book from the library array and reset local storage, then remove it from the DOM
    library.splice(index, 1)[0];
    localStorage.setItem('library', JSON.stringify(library));
    cards.removeChild(bookCard);
 }

 const addBookToDom = function addBookToDom(book) {
    const cards = document.querySelector('.cards');

    // setup the card for each book with its information
    let bookCard = document.createElement('div');
    bookCard.classList.add('book-card')
    bookCard.setAttribute("id", book.id);

    let title = document.createElement('div')
    title.classList.add('title', 'card-element')
    title.innerHTML = 'Title: '.bold() + book.title;

    let author = document.createElement('div')
    author.classList.add('author', 'card-element')
    author.innerHTML = 'Author: '.bold() + book.author

    let pages = document.createElement('div')
    pages.classList.add('pages', 'card-element')
    pages.textContent = book.pages + ' pages'

    let cardButtons = document.createElement('div')
    cardButtons.classList.add('card-element')
    let readBookBtn = document.createElement('button')
    readBookBtn.classList.add('read-book-btn')
    readBookBtn.textContent = 'Unread'
    readBookBtn.addEventListener('click', readBook)
    let deleteBookBtn = document.createElement('button')
    deleteBookBtn.classList.add('delete-book-btn')
    deleteBookBtn.textContent = 'Delete book'
    deleteBookBtn.addEventListener('click', deleteBook)
    cardButtons.replaceChildren(readBookBtn, deleteBookBtn)

    bookCard.replaceChildren(title, author, pages, cardButtons)
    if (book.readStatus) {
        cards.insertBefore(bookCard, cards.firstChild)
    }
    else {
        bookCard.classList.add('not-read')
        readBookBtn.textContent = 'Read'
        cards.appendChild(bookCard)
    }
 }


const addBooks = function addBooks(libraryToLoad) {
    // clear the cards DOM
    const cards = document.querySelector('.cards');
    cards.replaceChildren();
    // add all books in the passes libraryToLoad array
    if (libraryToLoad != null) {
        libraryToLoad.forEach((book) => addBook(book));
    }
    else {
        const defaultLibrary = JSON.parse(defaultLibraryJSON);
        defaultLibrary.forEach((book) => addBook(book))
    }
}

const setUpForm = function setUpForm() {
    // set up the form for required action on submit
    document.querySelector('.new-book-form').addEventListener('submit', (e) => {
        e.preventDefault();
        let {title, author, pages, read} = document.querySelector('.new-book-form')
        let newBook = new Book(title.value, author.value, pages.value, read.value);
        addBook(newBook);
        e.srcElement.reset();
    })
}

const setUp = function setUp() {
    addBooks(JSON.parse(localStorage.getItem('library')));
    setUpForm();
};
setUp();



// ---------------------- UUID FUNCTION -------------------------------------------
// https://stackoverflow.com/a/2117523
function uuidv4() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  }
