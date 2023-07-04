const mongoose = require("mongoose")
const schema = require("../models/countryModel")



const Country = mongoose.model("Country", schema);


const createCountry = async (req, res) => {
    try{

        const {continentMapping, country_name, region, population, capital, flag, majorCities, religion, language} = req.body;

        const country1 = new Country({
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

const getAllCountries = async (req, res) => {
    try{
        const allCountries = await Country.find().populate('continentMapping', {
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

const getCountryByName = async (req, res) => {
    try{

        const country = await Country.findOne({country_name: req.query.country_name});

        if(country){
            res.status(200).json(country)
        }else{
            res.status(404).send("Country unavailable!");
        }

    }catch(err){
        console.error(err)
    }
}


const getCountriesByContinent = async (req, res) => {
    try{

        const country1 = await Country.find({continentMapping: req.params.id});

        if(country1){
            res.status(200).json(country1);
        }else{
            res.status(404).send("Incorrect data")
        }

    }catch(err){
        console.error(err)
    }
}

const getCountryByRegion = async (req, res) => {
    try{

        const country = await Country.find({region: req.query.region})

        country ? res.status(200).json(country) : res.status(404).send("Error");

    }catch(err){
        console.error(err)
    }
}

module.exports = {createCountry, getAllCountries, getCountryByName, getCountriesByContinent, getCountryByRegion};