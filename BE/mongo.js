var mongoose = require ('mongoose');
var dotenv = require('dotenv').config();

var connectValidation = mongoose.connection.once('open', () => {
    console.log("MongoDB connection ready")
})

var errorValidation = mongoose.connection.on('error', () => {
    console.error("Error")
})

var mongoConnection = mongoose.connect(`mongodb+srv://project2:${process.env.DB_PASSWORD}@project2.5tagvkk.mongodb.net/?retryWrites=true&w=majority`)

module.exports = {connectValidation, errorValidation, mongoConnection}