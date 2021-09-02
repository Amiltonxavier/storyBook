const express = require("express");
const router = express.Router();
const { createUser,  requireSignin, listUser, deleteUser, signin } = require("../controller/user")

router.post("/create-user", createUser)
router.get("/list-user-info/:id", requireSignin, listUser)
router.delete("/delete-user-account/:id", requireSignin, deleteUser);
router.post("/auth-user", signin)

module.exports = router;