let library = [];

function Book(title, author, pages, readStatus) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = (readStatus == 1) ? true : false;
    this.id = uuidv4();
}

function addBook(book) {
    library.push(book)
    addBookToDom(book)
    localStorage.setItem('library', JSON.stringify(library))
}

function readBook(e) {
    const cards = document.querySelector('.cards'); 
    const id = e.srcElement.parentElement.parentElement.id
    const index = library.findIndex(book => book.id === id);
    const bookCard = e.srcElement.parentElement.parentElement
    const btn = e.srcElement

    const book = library.splice(index, 1)[0];
    cards.removeChild(bookCard)

    book.readStatus = !book.readStatus
    bookCard.classList.toggle('not-read')
    if (book.readStatus) {
        btn.textContent = 'Unread'
        library.unshift(book);
        cards.insertBefore(bookCard, cards.firstChild)
    }
    else {
        btn.textContent = 'Read'
        library.push(book)
        cards.appendChild(bookCard)
    }
    localStorage.setItem('library', JSON.stringify(library))
}

function deleteBook(e) {
    const cards = document.querySelector('.cards'); 
    const id = e.srcElement.parentElement.parentElement.id
    const index = library.findIndex(book => book.id === id);
    const bookCard = e.srcElement.parentElement.parentElement

    library.splice(index, 1)[0];
    cards.removeChild(bookCard)
    localStorage.setItem('library', JSON.stringify(library))
 }

 function addBookToDom(book) {
    const cards = document.querySelector('.cards');
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
    if (!book.readStatus) {
        bookCard.classList.add('not-read')
        readBookBtn.textContent = 'Read'
    }
    readBookBtn.addEventListener('click', readBook)
    let deleteBookBtn = document.createElement('button')
    deleteBookBtn.classList.add('delete-book-btn')
    deleteBookBtn.textContent = 'Delete book'
    deleteBookBtn.addEventListener('click', deleteBook)
    cardButtons.replaceChildren(readBookBtn, deleteBookBtn)
    bookCard.replaceChildren(title, author, pages, cardButtons)
    cards.appendChild(bookCard)
 }

function addBooks(libraryToLoad) {
    const cards = document.querySelector('.cards');
    cards.replaceChildren();
    libraryToLoad = JSON.parse(localStorage.getItem('library'));
    if (libraryToLoad != null) {
        libraryToLoad.forEach((book) => addBookToDom(book));
    }
}

function setUpForm() {
    document.querySelector('.new-book-form').addEventListener('submit', (e) => {
        e.preventDefault();
        let newBookForm = document.querySelector('.new-book-form')
        let newBook = new Book(newBookForm.title.value, newBookForm.author.value, newBookForm.pages.value, newBookForm.read.value);
        addBook(newBook)
    })
}

function setUp() {
    addBooks();
    setUpForm();
}

setUp()

// ---------------------- UUID FUNCTION -------------------------------------------
// https://stackoverflow.com/a/2117523
function uuidv4() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  }

// ---------------------- LOCAL STORAGE -------------------------------------------
Storage.prototype.setObject = function(key, value) {
    this.setItem(key, JSON.stringify(value));
}