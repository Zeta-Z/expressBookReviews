const express = require("express");
const jwt = require("jsonwebtoken");
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username) => {
  //returns boolean
  //write code to check is the username is valid

  let validusers = users.filter((user) => {
    return user.username === username;
  });

  console.log(validusers.length);

  return validusers.length === 0;
};

const authenticatedUser = (username, password) => {
  //returns boolean
  //write code to check if username and password match the one we have in records.

  let authenticateUser = users.filter((user) => {
    return user.username === username && user.password === password;
  });

  return authenticateUser.length > 0;
};

//only registered users can login
regd_users.post("/login", (req, res) => {
  //Write your code here

  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    if (authenticatedUser(username, password)) {
      let accessToken = jwt.sign(
        {
          data: password,
        },
        "access",
        { expiresIn: 60 * 60 }
      );

      req.session.authorization = {
        accessToken,
        username,
      };
      return res.status(200).send("User successfully logged in");
    } else {
      return res
        .status(400)
        .json({ message: "Error, wrong Username or Password" });
    }
  } else {
    return res
      .status(400)
      .json({ message: "Error! Invalid username or password!" });
  }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here

  const isbn = req.params.isbn;
  const review = req.body.review;
  const username = req.session.authorization?.username;

  if (!username) {
    return res.status(401).sin({ message: "User not logged in!" });
  }

  if (!books[isbn]) {
    return res.status(404).sin({ message: "Book not found!" });
  }

  if (!review) {
    return res.status(400).sin({ message: "No review provided!" });
  }

  if (!books[isbn].reviews) {
    books[isbn].reviews = {};
  }

  books[isbn].reviews[username] = review;

  return res.status(200).json({
    message: "Review successfully posted/updated",
    reviews: books[isbn].reviews,
  });
});

// Add a book review
regd_users.delete("/auth/review/:isbn", (req, res) => {

  const isbn = req.params.isbn;
  const username = req.session.authorization?.username;

  if (!username) {
    return res.status(401).json({ message: "User not logged in!" });
  }

  if (!books[isbn]) {
    return res.status(404).json({ message: "Book not found!" });
  }

  if (!books[isbn].reviews || !books[isbn].reviews[username]) {
    return res.status(404).json({ message: "No review by this user for this book!" });
  }

  // Eliminar la reseña del usuario
  delete books[isbn].reviews[username];

  return res.status(200).json({ message: "Review deleted successfully" });
  //Write your code here
});
module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
