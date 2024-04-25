const multer = require("multer");
const path = require("path");
/* cb -> callback */
module.exports = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    console.log("file", file);
    let ext = path.extname(file.originalname);

    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png" && ext !== ".gif") {
      cb(new Error("Extencion no soportada"), false);
    } else {
      cb(null, true);
    }
  },
});
