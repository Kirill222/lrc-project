const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const booksRoutes = require("./routes/books-routes");
const authRoutes = require("./routes/auth-routes");
const HttpError = require("./models/http-error");

const server = express();

server.use(bodyParser.json());

//public folder
server.use(express.static("./uploads"));
//ROUTES
server.use("/api", authRoutes);
server.use("/api", booksRoutes);

//Error handling middleware for wrong routes:
server.use((req, res, next) => {
  const error = new HttpError("Could not find this route", 404);
  return next(error);
});

//FINAL ERROR HANDLING FOR ALL TYPES OF ERRORS
server.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occured" });
});

//initiate DOTENV - before connecting to DB because we will use it inside
dotenv.config();
//connecting to DB
mongoose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    server.listen(5000);
  })
  .catch((error) => {
    console.log(error);
  });
