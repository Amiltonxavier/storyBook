import Express from "express";
import { createUser, listUser, deleteUser } from "../controller/user";
import { signin, requireSignin } from "../controller/auth";
import validateUser  from "../validator/user";
import { ValidateMessenngerError } from "../validator/errors";
const router = Express.Router();
//Express.Router

//User Router
router.post("/create-user", validateUser, ValidateMessenngerError, createUser)
router.get("/list-user-info/:id", requireSignin, listUser)
router.delete("/delete-user-account/:id", requireSignin, deleteUser);
router.post("/auth-user", signin)

export default  router;