import "./BookItem.css";

const BookItem = ({ book }) => {
  return (
    <div className="book-card">
      <h1>{book.title}</h1>
      <p>{book.author}</p>
    </div>
  );
};

export default BookItem;
