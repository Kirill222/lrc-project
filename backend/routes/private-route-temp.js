const express = require("express");

const router = express.Router();

const verify = require("./verifyToken");

router.get("/", verify, (req, res, next) => {
  res.json({ posts: { title: "my first post", description: "random data" } });
});

module.exports = router;