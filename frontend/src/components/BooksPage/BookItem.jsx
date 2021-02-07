import "./BookItem.css";

const BookItem = ({ book }) => {
  return (
    <div className="card">
      <img
        src={"http://localhost:5000/" + book.cover}
        className="card-img-top"
        alt="book-cover"
      />
      <div className="card-body">
        <h5 className="card-title">{book.title}</h5>
        <p className="card-text">
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </p>
        <a href="#" className="btn btn-primary">
          More...
        </a>
      </div>
    </div>
  );
};

export default BookItem;
