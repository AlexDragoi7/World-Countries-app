const http = require('http')
const express = require('express')
const userRoute = require("./routes/userRoute")
const continentRoute = require("./routes/continentRoute");
const countryRoute = require("./routes/countryRoute")
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const mongo = require('./mongo')
const cors = require('cors');
const cookieParser = require('cookie-parser');


const PORT = 3500;
const app = express();

const server = http.createServer(app);

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



