const mongoose = require ('mongoose');
const dotenv = require('dotenv').config();

const connectValidation = mongoose.connection.once('open', () => {
    console.log("MongoDB connection ready")
})

const errorValidation = mongoose.connection.on('error', () => {
    console.error("Error")
})

const mongoConnection = mongoose.connect(`mongodb+srv://project2:${process.env.DB_PASSWORD}@project2.5tagvkk.mongodb.net/?retryWrites=true&w=majority`)

module.exports = {connectValidation, errorValidation, mongoConnection}