const express = require("express");
const { registerBook , deleteBook, searchByName, listById, listallfiles, updatebook} = require("../controller/book");
const path = require("path");
const multer = require("multer");
const { requireSignin } = require("../controller/user");

const router = express.Router();

const multerFilter = (req, file, cb) => {
    if (file.mimetype.split("/")[1] === "pdf") {
      cb(null, true);
    } else {
      cb(new Error("Not a PDF File!!"), false);
    }
};
  
const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.resolve(__dirname, "..", "tmp", "uploads"));
    },
    filename: (req, file, cb) => {
      const ext = file.mimetype.split("/")[1];
      cb(null, `admin-${file.fieldname}-${Date.now()}.${ext}`);
    },
});
  
const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
  });

router.post("/createbook", requireSignin, upload.single('filename'), registerBook);
router.post("/searchByName", requireSignin, searchByName);
router.get("/searchById/:id", requireSignin, listById);
router.get("/read", requireSignin, listallfiles)
router.delete("/delete-book/:id", requireSignin, deleteBook);
router.put("/updata-book/:id", requireSignin, upload.single('filename'), updatebook);



module.exports = router;