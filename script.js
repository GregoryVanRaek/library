const myLibrary = [];

// Selector
let newBookButton = document.querySelector('#new')
let newBookContainer = document.querySelector('#newBook')
let addNewBook = document.getElementById('addBook')
let library = document.getElementById('library');
let overlay = document.querySelector('#overlay');

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
        newBookContainer.classList.toggle("main");
        newBookContainer.classList.toggle('slide-in');
        overlay.classList.toggle("show");
        if (!newBookContainer.classList.contains("hidden")) {
            overlay.addEventListener('click', closeMenu);
        } else {
            overlay.removeEventListener('click', closeMenu);
        }
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
            let title = document.createElement('p');
            let author = document.createElement('p');
            let pages = document.createElement('p');
            let read = document.createElement('input');
            read.textContent = "Read : ";
            read.type = 'checkbox';
            read.checked = book.read;
            title.textContent = book.title;
            author.textContent = "by " + book.author;
            pages.textContent = book.pages + " pages";
            bookDiv.appendChild(title);
            bookDiv.appendChild(author);
            bookDiv.appendChild(pages);

            let readDiv = document.createElement('div');
            let readLabel = document.createElement('label');
            readLabel.textContent = 'Read : ';
            readDiv.appendChild(readLabel);
            readDiv.appendChild(read);
            bookDiv.appendChild(readDiv);
            
            let buttonDiv = document.createElement('div');
            buttonDiv.classList.add("buttonDiv");
            let removeButton = document.createElement('button');
            let editButton = document.createElement('button');
            buttonDiv.appendChild(editButton);
            buttonDiv.appendChild(removeButton);
            editButton.textContent = "Edit";
            editButton.classList.add("edit-button");
            editButton.dataset.index = index;
            removeButton.textContent = "Remove";
            removeButton.classList.add('remove-button');
            removeButton.dataset.index = index;
            bookDiv.appendChild(buttonDiv);
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

    if(title.length < 1 || author.length < 0 || pages <= 0)
    {
        alert("invalid data");
        closeMenu();
    }
    else
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
            closeMenu();
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

function editBook(){

    let editButton = document.querySelectorAll('.edit-button');

    editButton.forEach(button => {
        button.addEventListener('click', (event) => {
            let index = event.target.dataset.index;
            let bookToEdit = myLibrary[index];
            document.getElementById('title').value = bookToEdit.title;
            document.getElementById('author').value = bookToEdit.author;
            document.getElementById('pages').value = bookToEdit.pages;
            document.getElementById('read').checked = bookToEdit.read;

            addNewBook.addEventListener('click', () => {
                let editedBook = getBookFromInput();
                myLibrary[index] = editedBook;
            })
        })
    })
}

function closeMenu() {
    newBookContainer.classList.toggle("hidden");
    newBookContainer.classList.toggle("main");
    newBookContainer.classList.toggle('slide-in');
    overlay.classList.toggle("show");
    document.getElementById('title').value = "";
    document.getElementById('author').value = "";
    document.getElementById('pages').value = "";
}

addBookToLibrary();