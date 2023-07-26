var mongoose = require("mongoose")
var schema = require("../models/countryModel")



var Country = mongoose.model("Country", schema);


async function createCountry (req, res){
    try{

        var {continentMapping, country_name, region, population, capital, flag, majorCities, religion, language} = req.body;

        var country1 = new Country({
            continentMapping, country_name, region, population, capital, flag, majorCities, religion, language
        })

        await country1.save();

        if(country1){
            res.status(200).json(country1)
        }else{
            res.status(404).send("Country cannot be created!")
        }
    }catch(err){
        console.error(err)
    }
}

async function getAllCountries (req, res) {
    try{
        var allCountries = await Country.find().populate('continentMapping', {
            continent_name: 1
        });

        if(allCountries){
            res.status(200).json(allCountries)
        }else{
            res.status(404).send("Error")
        }
    }catch(err){
        console.error(err);
    }
}

async function getCountryByName (req, res) {
    try{

        var country = await Country.findOne({country_name: req.query.country_name});

        if(country){
            res.status(200).json(country)
        }else{
            res.status(404).send("Country unavailable!");
        }

    }catch(err){
        console.error(err)
    }
}


async function getCountriesByContinent (req, res) {
    try{

        var country1 = await Country.find({continentMapping: req.params.id});

        if(country1){
            res.status(200).json(country1);
        }else{
            res.status(404).send("Incorrect data")
        }

    }catch(err){
        console.error(err)
    }
}

async function getCountryByRegion (req, res)  {
    try{

        var country = await Country.find({region: req.query.region})

        country ? res.status(200).json(country) : res.status(404).send("Error");

    }catch(err){
        console.error(err)
    }
}

module.exports = {createCountry, getAllCountries, getCountryByName, getCountriesByContinent, getCountryByRegion};