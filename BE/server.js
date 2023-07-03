const http = require('http')
const express = require('express')
const continentRoute = require("./routes/continentRoute");
const countryRoute = require("./routes/countryRoute")
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const mongo = require('./mongo')


const PORT = 3500;
const app = express();

const server = http.createServer(app);

app.use(express.json());


app.use("/continents", continentRoute);
app.use("/countries", countryRoute);

mongo.connectValidation;
mongo.errorValidation

async function serverRun(){
    await mongo.mongoConnection;

    server.listen(PORT, () => {
        console.log(`Listening to ${PORT}...`)
    })
}

serverRun();



