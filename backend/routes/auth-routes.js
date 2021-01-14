const express = require("express");
const router = express.Router();
const User = require("../models/user-model");
const HttpError = require("../models/http-error");
const { registerValidation } = require("../validation/validation");

router.post("/register", async (req, res, next) => {
  //VALIDATE DATA BEFORE
  const validation = registerValidation(req.body);
  if (validation.error) {
    const error = new HttpError(validation.error.details[0].message, 400);
    return next(error);
  }

  //CHECK IF THE USER ALREADY EXISTS
  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists) return res.status(400).send("Email already exists");

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
