var http = require('http')
var express = require('express')
var userRoute = require("./routes/userRoute")
var continentRoute = require("./routes/continentRoute");
var countryRoute = require("./routes/countryRoute")
var dotenv = require('dotenv').config();
var mongoose = require('mongoose');
var mongo = require('./mongo')
var cors = require('cors');
var cookieParser = require('cookie-parser');


var PORT = 3500;
var app = express();

var server = http.createServer(app);

app.use(express.json());

app.use(cookieParser());
app.use(cors({origin: true, credentials: true, exposedHeaders: ["set-cookie"]}))


app.use("/users", userRoute);
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



