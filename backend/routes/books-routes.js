const express = require("express");
const bookControllers = require("../controllers/books-controller");
const { check } = require("express-validator");

const router = express.Router();

//POST - create a book
router.post(
  "/books",
  [
    check("title").not().isEmpty().isLength({ min: 3 }),
    check("author").not().isEmpty(),
    check("isbn").not().isEmpty(),
    check("edition").not().isEmpty(),
    //check("cover").not().isEmpty(),
  ],
  bookControllers.createBook
);
//GET - get all the books
router.get("/books", bookControllers.getBooks);
//PATCH - update a book
router.patch("/books/:bookId", bookControllers.updateBook);
//DELETE - delete a book
router.delete("/books/:bookId", bookControllers.deleteBook);

module.exports = router;
