const websiteMain = document.querySelector(".main");
const formDialog = document.querySelector(".dialog-form");
const addNewBookButton = document.querySelector(".add-book-button");
const submitNewBookButton = document.querySelector("#submit-button");
const cancelFormButton = document.querySelector("#cancel-button");
const myLibrary = [];
const myLibraryDisplay = [];

addNewBookButton.addEventListener("click", () => {
    formDialog.querySelector("form").reset();
    formDialog.showModal();
});

submitNewBookButton.addEventListener("click", () => {
    const newBookTitle = formDialog.querySelector("#book-title");
    const newBookAuthor = formDialog.querySelector("#author");
    const newBookPages = formDialog.querySelector("#pages");
    const newBookIsRead = formDialog.querySelector("#is-read");
    addBookToLibrary(newBookAuthor.value,newBookTitle.value,newBookPages.value,newBookIsRead.checked);
    formDialog.close();
});

cancelFormButton.addEventListener("click", () => {
    formDialog.close();
});

class Book {
    constructor(author,title,pages,isRead) {
        this.author = author;
        this.title = title;
        this.pages = pages;
        this.isRead = isRead;
        this.uniqueId = crypto.randomUUID();
    }
}

function addBookToLibrary(author,title,pages,isRead) {
    const newBook = new Book(author,title,pages,isRead);
    myLibrary.push(newBook);
    updateCardsOnWebsite();
}

addBookToLibrary("Orson Scott Card", "Ender's Game", 1000, true);
addBookToLibrary("J.R.R. Tolkien", "The Hobbit", 10020, false);
addBookToLibrary("J.K. Rowling", "Harry Potter", 10400, true);

function updateCardsOnWebsite() {
    myLibrary.forEach((item,index) => {
        if(myLibraryDisplay.includes(item)) {
            return;
        }
        const newCard = document.createElement("div");
        newCard.classList.add("card");

        for(let prop in item) {
            const newDiv = document.createElement("div");
            if(prop === "isRead") {
                const newCheck = document.createElement("input");
                newCheck.type = "checkbox";
                newCheck.checked = item[prop];
                newCheck.addEventListener("change", () => {
                    let checkId = newCheck.parentElement.parentElement.querySelector(".uniqueId").textContent;
                    let checkIndex = myLibrary.findIndex(item => item.uniqueId === checkId);
                    myLibrary[checkIndex].isRead = newCheck.checked;
                    console.log(myLibrary[checkIndex].isRead)
                    console.log(checkId);
                });
                newDiv.textContent = "Read? ";
                newDiv.appendChild(newCheck);
            } else {
                newDiv.classList.add(prop);
                newDiv.textContent = item[prop];
            }

            if(prop === "uniqueId") {
                newDiv.style.display = "none";
            }
            newCard.appendChild(newDiv);
        }
        const newRemoveButton = document.createElement("button");
        newRemoveButton.classList.add("remove-button");
        newRemoveButton.textContent = "Remove";
        newRemoveButton.addEventListener("click", () => {
            let delId = newRemoveButton.parentElement.querySelector(".uniqueId").textContent;
            const delIndex = myLibrary.findIndex(item => item.uniqueId === delId);
            myLibrary.splice(delIndex, 1);            
            newRemoveButton.parentElement.remove();
        });

        newCard.appendChild(newRemoveButton);
        websiteMain.appendChild(newCard);
        myLibraryDisplay.push(item);
    });
}
