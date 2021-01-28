import BookItem from "./BookItem";
import "./BookList.css";
import { useState, useEffect } from "react";
import axios from "axios";

const BookList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/books")
      .then((res) => {
        console.log(res.data);
        setBooks(res.data.books);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  return (
    <div className="book-list">
      <BookItem />
      <BookItem />
      <BookItem />
      <BookItem />

      {books.map((book) => {
        <BookItem key={book.id} book={book} />;
      })}
    </div>
  );
};

export default BookList;
