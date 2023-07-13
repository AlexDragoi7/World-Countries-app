const express = require('express');
const userController = require('../controllers/userController')
const {createUser, getAllUsers, loginUser, resetPassword} = userController;
var userAuth = require("../middleware/userAuth")


const router = express.Router();

router.post("/signup",userAuth.saveUser, createUser);
router.get("/", getAllUsers)
router.patch("/resetpassword", resetPassword)

router.post("/login", loginUser)


module.exports = router;