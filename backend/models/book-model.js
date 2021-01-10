const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  isbn: { type: String, required: true },
  edition: { type: String, required: true },
  cover: { type: String },
});

module.exports = mongoose.model("Book", bookSchema);
