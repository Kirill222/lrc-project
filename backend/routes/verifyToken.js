const jwt = require("jsonwebtoken");
const HttpError = require("../models/http-error");

const auth = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) return res.status(401).send("Access Denied");

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    error = new HttpError("Invalid token", 400);
    return next(error);
  }
};

module.exports = auth;
