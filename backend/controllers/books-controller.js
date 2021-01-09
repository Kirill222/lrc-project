const mongoose = require("mongoose");
const Book = require("../models/book-model");
const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");

//POST - create a book
const createBook = async (req, res, next) => {
  //validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new HttpError(
      "Invalid input passed, please, check your data",
      422
    );
    return next(error);
  }

  const { title, author, isbn, edition, cover } = req.body;

  const createdBook = new Book({
    title,
    author,
    isbn,
    edition,
    cover:
      "https://cnet4.cbsistatic.com/img/aZRMn1itx4hHpDql5mNX_NTno0M=/940x0/2018/05/01/9acc5e96-f803-4735-9f88-68308fd898cb/fire-and-blood-game-of-thrones-book-cover.jpg",
  });

  try {
    await createdBook.save();
  } catch (error) {
    error = new HttpError("The book cannot be saved, try again later", 500);
    return next(error);
  }

  res.status(201);
  res.json({ book: createdBook.toObject({ getters: true }) });
};
//GET - get all the books
const getBooks = async (req, res, next) => {
  let books;
  try {
    books = await Book.find();
  } catch (error) {
    error = new HttpError(
      "Books cannot be accessed, somethihg went wrong",
      404
    );
    return next(error);
  }

  res.json({ books: books.map((book) => book.toObject({ getters: true })) });
};
//PATCH - update a book
const updateBook = async (req, res, next) => {
  const bookId = req.params.bookId;
  const { title, author, isbn, edition, cover } = req.body;
  //find the book that needs to be updated
  let updatedBook;
  try {
    updatedBook = await Book.findById(bookId);
  } catch (error) {
    error = new HttpError(
      "There is no such a book in database to be updated",
      500
    );
    return next(error);
  }

  updatedBook.title = title;
  updatedBook.author = author;
  updatedBook.isbn = isbn;
  updatedBook.edition = edition;
  //updatedBook.cover = cover;

  //save the changes
  try {
    await updatedBook.save();
  } catch (error) {
    console.log(error);
  }
  res.status(200).json({ book: updatedBook.toObject({ getters: true }) });
};
//DELETE - delete a book
const deleteBook = async (req, res, next) => {
  const bookId = req.params.bookId;

  let bookToDelete;
  try {
    bookToDelete = await Book.findById(bookId);
  } catch (error) {
    error = new HttpError("The book to delete was not found", 500);
    return next(error);
  }

  try {
    await bookToDelete.remove();
  } catch (error) {
    console.log(error);
  }

  res.status(200).json({ message: "Book Deleted" });
};

exports.createBook = createBook;
exports.getBooks = getBooks;
exports.updateBook = updateBook;
exports.deleteBook = deleteBook;
