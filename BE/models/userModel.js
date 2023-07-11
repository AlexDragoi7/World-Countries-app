const mongoose = require ('mongoose');


const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    password: String,
    phone_number: String,
    favoriteCountries: {type: mongoose.Schema.Types.ObjectId, ref: "Country", required: false}
})

module.exports = userSchema