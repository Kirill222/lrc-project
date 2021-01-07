const express = require("express");
const bookControllers = require("../controllers/books-controller");

const router = express.Router();

//POST - create a book
router.post("/books", bookControllers.createBook);
//GET - get all the books
router.get("/books", bookControllers.getBooks);
//PATCH - update a book
router.patch("/books/:bookId", bookControllers.updateBook);
//DELETE - delete a book
router.delete("/books/:bookId", bookControllers.deleteBook);

module.exports = router;
