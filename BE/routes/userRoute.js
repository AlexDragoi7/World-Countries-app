const express = require('express');
const userController = require('../controllers/userController')
const {createUser, getAllUsers} = userController;


const router = express.Router();

router.post("/",createUser);
router.get("/", getAllUsers)

module.exports = router;