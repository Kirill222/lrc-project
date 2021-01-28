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
        setBooks(res.data.books);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [null]);

  console.log(books);

  return (
    <div className="book-list">
      {books.map((book) => {
        return <BookItem key={book.id} book={book} />;
      })}
    </div>
  );
};

export default BookList;
