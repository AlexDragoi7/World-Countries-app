var express = require('express');
var userController = require('../controllers/userController')
var {createUser, getAllUsers, loginUser, resetPassword, addCountryToFavorites, removeCountryFromFavorites, getAuthenticatedUser} = userController;
var userAuth = require("../middleware/userAuth")


var router = express.Router();

router.post("/signup",userAuth.saveUser, createUser);
router.get("/", getAllUsers)
router.get("/user", userAuth.isAuthenticated, getAuthenticatedUser)
router.patch("/resetpassword", resetPassword)
router.post("/favoritecountries", userAuth.isAuthenticated, addCountryToFavorites)
router.post("/deletefavoritecountries", userAuth.isAuthenticated,removeCountryFromFavorites)

router.post("/login", loginUser)


module.exports = router;