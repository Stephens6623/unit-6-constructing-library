import Library from "./library.js";


const collection = new Library("mongodb://localhost:27017", "library", "books");



  await collection.test(); // Optional, just shows connection

  const booksCursor = await collection.allBooks();

    // Iterate through the cursor and print each book's details
  const books = await booksCursor.toArray();
  books.forEach(book => {
    console.log(`Title: ${book.title}, Author: ${book.author}, Copies: ${book.copies}`);
  });


// Example of finding a specific book by ID
const bookID = "6866e2660e807f6bf532702c";
const findOneBook = await collection.findOneBook(bookID);
if (findOneBook) {
  console.log(`Found book: Title: ${findOneBook.title}, Author: ${findOneBook.author}, Copies: ${findOneBook.copies}`);
}else {
  console.log(`Book with ID ${bookID} not found.`);
}


// Example of finding many books with a specific query
const query = { author: "Stephen King" };
const findManyBooks = await collection.findManyBooks(query);

await findManyBooks.forEach(book => {
  console.log(`Found book: Title: ${book.title}, Author: ${book.author}, Copies: ${book.copies}`);
});

// Example of adding a new book to the collection
 const newBook = {
     title: "The Shining",
     author: "Stephen King",
     copies: 1
 };

 await collection.addBook(newBook);
 const allBooksCursor = await collection.allBooks();
 const allBooks = await allBooksCursor.toArray();

 console.log("All books in the collection:");
 allBooks.forEach(book => {
  console.log(`Title: ${book.title}, Author: ${book.author}, Copies: ${book.copies}`);
});

// example of changing a book's name, author, and copies
const bookIdToChange = "6866f58d5f02a2b1d254a718";

const newInfo = {
    title: "Goodnight Moon",
    author: "Margaret Wise Brown",
    copies: 2
};
await collection.changeBook(bookIdToChange, newInfo);
const updatedBook = await collection.findOneBook(bookIdToChange);
if (updatedBook) {
  console.log(`Updated book: Title: ${updatedBook.title}, Author: ${updatedBook.author}, Copies: ${updatedBook.copies}`);
}

// removing a book from collection
const bookRemoveId = "686b05eb355ca8a1901ebcd3";
await collection.removeBook(bookRemoveId);


 



 