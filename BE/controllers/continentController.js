var mongoose = require("mongoose");
var schema = require("../models/continentModel");

var Continent = mongoose.model('Continent', schema)


async function createContinent (req, res) {
    try{
        var {continent_name, image} = req.body
        var continent1 = new Continent({
            continent_name,
            image
        })
    
            await continent1.save();
    
            if(continent1){
                res.status(200).json(continent1)
            }else{
                res.status(404).send("Error")
            }
    }catch(err){
        console.error(err)
    }      
}

async function getAllContinents (req, res)  {
    try{
        var allContinents = await Continent.find();

        if(allContinents){
            res.status(200).json(allContinents)
        }else{
            res.status(404).send("Error")
        }
    }catch(err){
        console.error(err)
    }
}

module.exports = {createContinent, getAllContinents};
