const mongoose = require('mongoose');
const schema = require("../models/userModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


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

async function loginUser (req, res) {
    try{

        var {email, password} = req.body

        var user = await User.findOne({
            email: email
        })

        await user.save()

        if (user){
            var isSame = await bcrypt.compare(password, user.password)
            if (isSame){
                let token = jwt.sign({id: user.id}, process.env.SECRETKEY, {expiresIn: "2d"})
            

            res.cookie("token", token,{
                maxAge: 2 * 24 * 60 * 60,
                httpOnly: true, 
            })
            console.log("user", JSON.stringify(user, null, 2))
            console.log(token)

            return res.status(201).send({
                id: user.id,
                first_name: user.first_name,
                email: user.email,
                accessToken: token,
            })
        }else{
            return res.status(401).send("Authentication failed")
        }
         
        }else{
            return res.status(401).send("Authentication failed")
        }

    }catch(err){
        console.error(err)
    }
}


async function resetPassword (req, res, next){
    try{

        var {new_password, email} = req.body

        var data = new User({
            password: await bcrypt.hash(new_password, 10)
        })

        var updatedPass = await User.updateOne({
            email: email
        }, {
            password: data.password
        })

        if(updatedPass[0] != 0){
            return res.status(200).json({
                message: "Password has been successfully updated"
            })
        }else{
            return res.status(401).send(Error)
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



module.exports = {createUser, getAllUsers, loginUser, resetPassword};

