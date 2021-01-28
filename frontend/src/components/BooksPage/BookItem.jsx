import "./BookItem.css";

const BookItem = ({ book }) => {
  return (
    <div className="book-card">
      <h1>{book}</h1>
      <p>{book}</p>
    </div>
  );
};

export default BookItem;
