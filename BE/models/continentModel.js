var mongoose = require('mongoose');
        var continentSchema = new mongoose.Schema({
            continent_name: {
                type: String,
                reference: true
            },
            image: {type: String},
        })


    module.exports = continentSchema