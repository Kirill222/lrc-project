import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/NavBar/NavBar";
import BookList from "./components/BooksPage/BookList";

const App = () => {
  return (
    <>
      <NavBar />
      <BookList />
    </>
  );
};

export default App;
