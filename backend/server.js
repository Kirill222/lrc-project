const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const booksRoutes = require("./routes/books-routes");

const server = express();

server.use(bodyParser.json());

server.use("/api", booksRoutes);

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
