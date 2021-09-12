let library = [];

function Book(title, author, pages, readStatus) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;
}

Book.prototype.info = function() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.readStatus ? 'read' : 'not read yet'}`
}

function addBookToLibrary(book) {
    console.log(book)
    library.push(book)
}

function getBooks() {
    let container = document.querySelector('.container');
    for (let book of library) {
        let bookCard = document.createElement('div');
        bookCard.classList.add('book-card')
        let title = document.createElement('div')
        title.classList.add('title')
        title.textContent = book.title
        let author = document.createElement('div')
        author.classList.add('author')
        author.textContent = book.author
        let pages = document.createElement('div')
        pages.classList.add('pages')
        pages.textContent = book.pages
        let readStatus = document.createElement('div')
        readStatus.classList.add('read-status')
        readStatus.textContent = book.readStatus
        bookCard.replaceChildren(title, author, pages, readStatus)
        container.appendChild(bookCard)
    }
}



theHobbit = new Book('The Hobbit', 'J.R Tolkein', 295, false)
addBookToLibrary(theHobbit);

harryPotter = new Book('Harry Potter and the Deathly Hallows', 'J.K Rowling', 389, true)
addBookToLibrary(harryPotter);

getBooks();