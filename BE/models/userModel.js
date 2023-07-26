var mongoose = require ('mongoose');


var userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    password: String,
    phone_number: String,
    favoriteCountries: [{type: mongoose.Schema.Types.ObjectId, ref: "Country", required: false, unique: true}]
})

module.exports = userSchema