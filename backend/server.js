const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const booksRoutes = require("./routes/books-routes");
const HttpError = require("./models/http-error");

const server = express();

server.use(bodyParser.json());

//public folder
server.use(express.static("./uploads"));

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

//connecting to DB
mongoose
  .connect(
    "mongodb+srv://Drunkfrog:zkmd1988@cluster0.o50hs.mongodb.net/lrc?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    server.listen(5000);
  })
  .catch((error) => {
    console.log(error);
  });
