const express = require('express');
const continentController = require('../controllers/continentController');
const {createContinent, getAllContinents} = continentController;


const router = express.Router();

router.post('/', createContinent);
router.get("/", getAllContinents);

module.exports = router;