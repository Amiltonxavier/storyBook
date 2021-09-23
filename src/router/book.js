import Express from "express";
import { registerBook , deleteBook, searchByName, listById, listallfiles, updatebook} from "../controller/book";
import { upload } from "../controller/multer";
//import multer from "multer";
import { requireSignin } from "../controller/auth";

const router = Express.Router();



router.post("/createbook", requireSignin, upload.single('filename'), registerBook);
router.post("/searchByName", requireSignin, searchByName);
router.get("/searchById/:id", requireSignin, listById);
router.get("/read", requireSignin, listallfiles)
router.delete("/delete-book/:id", requireSignin, deleteBook);
router.put("/updata-book/:id", requireSignin, upload.single('filename'), updatebook);



export default  router;