const mongoose = require("mongoose");
const schema = require("../models/continentModel");

const Continent = mongoose.model('Continent', schema)


const createContinent = async (req, res) => {
    try{
        const {continent_name, image} = req.body
        const continent1 = new Continent({
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

const getAllContinents = async (req, res) => {
    try{
        const allContinents = await Continent.find();

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
