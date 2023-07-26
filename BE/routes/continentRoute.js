var express = require('express');
var continentController = require('../controllers/continentController');
var {createContinent, getAllContinents} = continentController;


var router = express.Router();

router.post('/', createContinent);
router.get("/", getAllContinents);

module.exports = router;