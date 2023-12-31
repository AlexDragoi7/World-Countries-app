var mongoose = require('mongoose');


var countrySchema = new mongoose.Schema({
    country_name: String,
    region: String,
    population: String,
    capital: String,
    flag: String,
    religion: String,
    language: String,
    majorCities: [{
        city_name: String,
        population: String,
        location: String,
        main_attractions: Array,
    }],
    continentMapping: {type: mongoose.Schema.Types.ObjectId, ref: 'Continent', required: true},
    
})

module.exports = countrySchema