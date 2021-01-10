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

// //for image upload we use MULTER. For that we have: MULTER, STORAGE, UPLOAD
// const multer = require("multer");
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     callback(null, "./uploads/");
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + file.filename);
//   },
// });
// const upload = multer({ storage: storage });

// const storage = multer.diskStorage({
//   destination: (req, file, callback) => {
//     callback(null, "./uploads/");
//   },
//   filename: (req, file, callback) => {
//     callback(null, file.filename);
//   },
// });

// const fileFilter = (req, file, callback) => {
//   if (file.mimetype === "image/jpg" || file.mimetype === "image/png") {
//     callback(null, true); // will store the file
//   } else {
//     callback(null, false); // will not store the file
//   }
// };

// const upload = multer({
//   storage: storage,
//   limits: {
//     fileSize: 1024 * 1024 * 5,
//   },
//   fileFilter: fileFilter,
// }); //here we say - Hey! Store all the files in this place
