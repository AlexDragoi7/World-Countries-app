const express = require('express');
const countryController = require('../controllers/countryController');
const {createCountry, getAllCountries, getCountryByName, getCountriesByContinent, getCountryByRegion} = countryController;

const router = express.Router();

router.post("/", createCountry);
router.get("/", getAllCountries);
router.get("/countryname", getCountryByName);
router.get("/countryregion", getCountryByRegion);
router.get("/:id", getCountriesByContinent);


module.exports = router;