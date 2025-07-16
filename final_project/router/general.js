const express = require("express");
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req, res) => {
  //Write your code here
  return res.status(300).json({ message: "Yet to be implemented" });
});

// Get the book list available in the shop
public_users.get("/", function (req, res) {
  //Write your code here

  const libros = JSON.stringify(books);

  return res.status(300).json({ message: "Books found" + libros });
});

// Get book details based on ISBN
public_users.get("/isbn/:isbn", function (req, res) {
  //Write your code here

  const id = req.params.isbn;

  if (id) {
    const libroEncontrado = JSON.stringify(books[id]);

    return res.status(300).json({ message: "Book found" + libroEncontrado });
  }else{
    return res.status(400).json({message: "Error, book not found"})
  }
});

// Get book details based on author
public_users.get("/author/:author", function (req, res) {
  //Write your code here

  const author = req.params.author;
  const arregloAutores = [];

  if(author){
    for(const isbn in books){
      if(books[isbn].author === author){
        arregloAutores.push(books[isbn]);
      }
    }

    return res.status(300).json({ message: `Lista de Libros basada en ${author}`+ JSON.stringify(arregloAutores) });
  }else{
    return res.status(400).json({message:" Error, author no valido"})
  }
  
});

// Get all books based on title
public_users.get("/title/:title", function (req, res) {
  //Write your code here
  return res.status(300).json({ message: "Yet to be implemented" });
});

//  Get book review
public_users.get("/review/:isbn", function (req, res) {
  //Write your code here
  return res.status(300).json({ message: "Yet to be implemented" });
});

module.exports.general = public_users;
