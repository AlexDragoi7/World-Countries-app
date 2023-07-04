const mongoose = require('mongoose');
        const continentSchema = new mongoose.Schema({
            continent_name: {
                type: String,
                reference: true
            },
            image: {type: String},
        })


    module.exports = continentSchema