const mongoose = require('mongoose');
const schema = require("../models/userModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const User = mongoose.model('User', schema);


const createUser = async (req, res) => {
    try{
        const {first_name, last_name, email, password, phone_number} = req.body;

        const user = new User({
            first_name, last_name, email, password: await bcrypt.hash(password, 10), phone_number
        })
    
        await user.save();
    
        if(user){
            let token = jwt.sign({id: user.id}, process.env.SECRETKEY, {expiresIn: "2d"})
    
            res.cookie("token", token, {maxAge: 2 * 24 * 60 * 60, httpOnly: true})
            console.log('user', JSON.stringify(user, null, 2));
            console.log(token)
            return res.status(201).json(user);
        }else{
            return res.status(409).send("Details are not correct");
        }
    }catch(err){
        console.error(err)
    }
}

const getAllUsers = async (req, res) => {
    try{
        
        const allUsers = await User.find();
        allUsers ? res.status(200).json(allUsers) : res.status(404).send("Error");

    }catch(err){
        console.error(err)
    }
}



module.exports = {createUser, getAllUsers};

