var mongoose = require('mongoose');
var schema = require("../models/userModel");
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');


var User = mongoose.model('User', schema);


async function createUser (req, res) {
    try{
        var {first_name, last_name, email, password, phone_number} = req.body;

        var user = new User({
            first_name, last_name, email, password: await bcrypt.hash(password, 10), phone_number
        })
    
        await user.save();
    
        if(user){
            let token = jwt.sign({id: user.id}, process.env.SECRETKEY, {expiresIn: "2d"})
    
            res.cookie("token", token, {maxAge: 60 * 10000, httpOnly: true})
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
                maxAge: 60 * 10000,
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

async function addCountryToFavorites (req, res) {
    try{

         var {newFavoriteCountry} = req.body

         var data = await new User({
            favoriteCountries: newFavoriteCountry
         })

         var {token} = req.cookies
         if(!token){
            return ("Error")
         }
         var verify = await jwt.verify(token, process.env.SECRETKEY)

         var user = await User.findById(verify.id).populate('favoriteCountries', {
            country_id: 1
         })

         var countryHasBeenAlreadyAdded = user.favoriteCountries.find((country) => country.id === newFavoriteCountry) 

         if (countryHasBeenAlreadyAdded){
            return res.status(404).send("Error")
         }else{

         var addFavCountry = await User.updateMany({
            _id: verify.id
         }, {
            $push: {
                favoriteCountries: data.favoriteCountries
            }
         })

        //  console.log(addFavCountry)

         if(addFavCountry.matchedCount != 0){
             return res.status(201).json({
                country_id: data.id,
                favoriteCountries: `Added ${newFavoriteCountry} to favorites`,
            })
         }else{
            return res.status(404).send("User not found")
         }
        }
    }catch(err){
        console.error(err)
    }
}

async function removeCountryFromFavorites(req, res){
    try{

        var {deletedCountry} = req.body

        var data = await new User({
            favoriteCountries: deletedCountry
        })

        var {token} = req.cookies

        var verify = jwt.verify(token, process.env.SECRETKEY)


        var removeFavCountry = await User.updateMany({
            _id: verify.id
        }, {
            $pullAll: {
                favoriteCountries: data.favoriteCountries
            }
        })

        if (removeFavCountry){
            return res.status(201).json({
                country_id: data.id,
                favoriteCountries: `Country ${deletedCountry} has been removed from favorites`
            })
        }else{
            return res.status(401).send(Error)
        }
    }catch(err){
        console.error(err)
    }
}

async function getAuthenticatedUser(req, res) {
    try{

        var {token} = req.cookies
        if(!token){
            return next("Please login to access the data!")
        }

        var verify = await jwt.verify(token, process.env.SECRETKEY)

        var user = await User.findById(verify.id).populate('favoriteCountries', {
            country_name: 1,
            flag: 1,
            region: 1
        })
        if(user){
            res.status(200).json(user)
        }else{
            res.status(404).send("Error")
        }

    }catch(err){
        console.error(err)
    }

}


async function getAllUsers (req, res) {
    try{
        
        var allUsers = await User.find().populate('favoriteCountries', {
            country_name: 1
        });
        allUsers ? res.status(200).json(allUsers) : res.status(404).send("Error");

    }catch(err){
        console.error(err)
    }
}



module.exports = {createUser, getAllUsers, loginUser, resetPassword, addCountryToFavorites, removeCountryFromFavorites, getAuthenticatedUser};

