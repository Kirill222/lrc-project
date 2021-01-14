const multer = require("multer");

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};

const fileUpload = multer({
  limits: 500000, //in bytes
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/covers/"); //first argument in cb - always an ERROR
    },
    filename: (req, file, cb) => {
      const extension = MIME_TYPE_MAP[file.mimetype]; // file extension that we want to use
      cb(null, Date.now() + "." + extension);
    },
  }),
  fileFilter: (req, file, cb) => {
    const isValid = !!MIME_TYPE_MAP[file.mimetype]; //double exclamation converts UNDEFINED to FALSE
    let error = isValid ? null : new Error("Invalid mime type");
    cb(error, isValid);
  },
});

module.exports = fileUpload;
