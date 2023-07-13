const express = require('express');
const userController = require('../controllers/userController')
const {createUser, getAllUsers, loginUser, resetPassword, addCountryToFavorites, removeCountryFromFavorites} = userController;
var userAuth = require("../middleware/userAuth")


const router = express.Router();

router.post("/signup",userAuth.saveUser, createUser);
router.get("/", getAllUsers)
router.patch("/resetpassword", resetPassword)
router.post("/favoritecountries", userAuth.isAuthenticated, addCountryToFavorites)
router.post("/deletefavoritecountries", userAuth.isAuthenticated,removeCountryFromFavorites)

router.post("/login", loginUser)


module.exports = router;