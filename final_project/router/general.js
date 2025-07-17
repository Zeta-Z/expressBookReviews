const express = require("express");
let books = require("./booksdb.js");
//const { use } = require("react");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req, res) => {
  //Write your code here

  const username = req.body.username;
  const password = req.body.password;


  if(username && password){
    if(isValid(username)){
      users.push({"username": username, "password":password});
      return res.status(200).json({ message: "User successfully registered. Now you can login" });
    }else{
      return res.status(400).json({ message: "User already registered!" });
    }
  }
  return res.status(400).json({ message: "Unable to create a new user!" });

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

  const title = req.params.title;
  const arregloLibros = [];

  if(title){

    for(const isbn in books){
      if(books[isbn].title === title){
        arregloLibros.push(books[isbn]);
      }
    }
    console.log(title);

    return res.status(200).json({message: "Book found!" + JSON.stringify(arregloLibros)})

  }else{
    return res.status(400).json({message:"Invalid title"});
  }


});

//  Get book review
public_users.get("/review/:isbn", function (req, res) {
  //Write your code here

  const isbn = parseInt(req.params.isbn);
  let  libroReseña = [];

  if(isbn){
    
    libroReseña = books[isbn].reviews;

    return res.status(200).json({ message: "This is the book!" + JSON.stringify(libroReseña) });

  }else{
    return res.status(400).json({
      message:"Error, invalid ISBN"
    })
  }

  
});

module.exports.general = public_users;
