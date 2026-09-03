const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }

    if (users.some(user => user.username === username)) {
        return res.status(409).json({ message: "User already exists. Please login" });
    }

    users.push({ username: username, password: password });

    return res.status(200).json({ message: "User successfully registered. Now you can login" });
});


// Get the book list available in the shop
async function getBookList() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(books);
        }, 4000);
    });
}

public_users.get('/', async (req, res, next) => {
    try {
        const data = await getBookList();
        res.json(data);
    } catch (err) {
        next(err);
    }
});


// Get book details based on ISBN
async function getBookDetails(isbn) {
    return new Promise((resolve, reject) => {
        const book = books[isbn];

        if (book) {
            setTimeout(() => {
                resolve(book);
            }, 4000);
        } else {
            reject(new Error("Book not found"));
        }
    });
}

public_users.get('/isbn/:isbn', async (req, res) => {
    const isbn = req.params.isbn;

    try {
        const book = await getBookDetails(isbn);
        res.json(book);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
});


// Get book details based on author
async function getBookDetailsBasedOnAuthor(author) {
    return new Promise((resolve, reject) => {
        const keys = Object.keys(books);

        const result = keys
            .filter(key => books[key].author.toLowerCase() === author.toLowerCase())
            .map(key => books[key]);

        if (result.length > 0) {
            setTimeout(() => {
                resolve(result);
            }, 4000);
        } else {
            reject(new Error("Book not found"));
        }
    });
}

public_users.get('/author/:author', async (req, res) => {
    const author = req.params.author;

    try {
        const result = await getBookDetailsBasedOnAuthor(author);
        res.json(result);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
});


// Get all books based on title
async function getBooksDetailsBasedOnTitle(title) {
    return new Promise((resolve, reject) => {
        const values = Object.values(books);

        const result = values.filter(book =>
            book.title.toLowerCase().includes(title.toLowerCase())
        );

        if (result.length > 0) {
            setTimeout(() => {
                resolve(result);
            }, 4000);
        } else {
            reject(new Error("Book not found"));
        }
    });
}

public_users.get('/title/:title', async (req, res) => {
    const title = req.params.title;

    try {
        const result = await getBooksDetailsBasedOnTitle(title);
        res.json(result);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
});


// Get book review
public_users.get('/review/:isbn', function (req, res) {
    const isbn = req.params.isbn;

    if (books[isbn]) {
        return res.status(200).json(books[isbn].reviews);
    }

    return res.status(404).json({ message: "Book not found" });
});


module.exports.general = public_users;
