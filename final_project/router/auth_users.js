const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username) => {
    return users.some(user => user.username === username);
};

const authenticatedUser = (username, password) => {
    return users.some(user => user.username === username && user.password === password);
};

regd_users.post("/login", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (!isValid(username)) {
        return res.status(401).json({ message: "User not registered" });
    }

    if (!authenticatedUser(username, password)) {
        return res.status(401).json({ message: "Invalid username or password" });
    }

    const accessToken = jwt.sign(
        { username: username },
        "access-secret-key",
        { expiresIn: "1h" }
    );

    return res.status(200).json({
        message: "Login successful",
        accessToken: accessToken
    });
});

regd_users.put("/auth/review/:isbn", (req, res) => {
    return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
