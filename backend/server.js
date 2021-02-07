const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const booksRoutes = require("./routes/books-routes");
const authRoutes = require("./routes/auth-routes");
const HttpError = require("./models/http-error");
const testRouteToDelete = require("./routes/private-route-temp");

const server = express();

server.use(bodyParser.json());

//handeling CORS errors:
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (res.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

//public folder
//this folder also contains favicon
server.use(express.static(__dirname + "/uploads"));
//ROUTES
server.use("/api/testroutetodelete", testRouteToDelete);
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
