const myLibrary = [];

// Selector
let newBookButton = document.querySelector('#new')
let newBookContainer = document.querySelector('#newBook')
let addNewBook = document.getElementById('addBook')
let library = document.getElementById('library');

// Object
function Book(title, author, pages, read, remove){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.remove = remove;
}

// Function
function displayMenu(){
    newBookButton.addEventListener('click', () => {
    newBookContainer.classList.toggle("hidden");
    })
}
function displayLibrary(){
    library.innerHTML = "";
    myLibrary.forEach((book, index) => 
    {
        if(book.remove === false)
        {
            let bookDiv = document.createElement("div");
            library.appendChild(bookDiv);
            bookDiv.innerHTML = "Title : " + book.title + "<br>Author : " + book.author + "<br>Pages : " + book.pages + "<br> Read ? " + book.read + "<br>";
            let removeButton = document.createElement('button');
            removeButton.textContent = "Remove";
            removeButton.classList.add('remove-button');
            removeButton.dataset.index = index;
            bookDiv.appendChild(removeButton);
        }
    })

    removeFromLibrary();
}

const getBookFromInput = () => {
    let title = document.getElementById('title').value;
    let author = document.getElementById('author').value;
    let pages = document.getElementById('pages').value;
    let read = document.getElementById('read').checked;
    let remove = false;
    return new Book(title, author, pages, read, remove);
}

function addBookToLibrary(){
    displayMenu();

    addNewBook.addEventListener('click', (event) => 
    {
        event.preventDefault();
        let newBook = getBookFromInput()

        let isAlreadyInLibrary = myLibrary.some((book) => book.title === newBook.title);
        
        if(isAlreadyInLibrary)
                alert("This book is already in your library");
        else
        {
            myLibrary.push(newBook);
            displayLibrary();
        }
    })
}

function removeFromLibrary(){

    let removeButtons = document.querySelectorAll(".remove-button");

    removeButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            let index = event.target.dataset.index;
            myLibrary[index].remove = true;
            myLibrary.splice(index, 1);
            displayLibrary();
        })
    })
    
}

addBookToLibrary();