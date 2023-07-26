var express = require('express');
var countryController = require('../controllers/countryController');
var {createCountry, getAllCountries, getCountryByName, getCountriesByContinent, getCountryByRegion} = countryController;

var router = express.Router();

router.post("/", createCountry);
router.get("/", getAllCountries);
router.get("/countryname", getCountryByName);
router.get("/countryregion", getCountryByRegion);
router.get("/:id", getCountriesByContinent);


module.exports = router;