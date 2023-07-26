var mongoose = require('mongoose')
var schema = require("../models/userModel")
var jwt = require('jsonwebtoken')
var express = require('express')

var User = mongoose.model('User', schema)


async function saveUser (req, res, next){
    try{

        var username = await User.findOne({
            first_name: req.body.first_name,
            last_name: req.body.last_name
        })

        if(username){
            return res.json(409).send("Username already taken!")
        }

        var emailCheck = await User.findOne({
            email: req.body.email
        })

        if(emailCheck){
            return res.json(409).send("Email authentication failed!")
        }
        
        next();

    }catch(err){
        console.error(err)
    }
}

async function isAuthenticated (req, res, next) {
    try{

        var {token} = req.cookies
        if (!token){
            return next("Please login to access the data!")
        }

        var verify = await jwt.verify(token, process.env.SECRETKEY)
        req.user = await User.findById(verify.id)
        next()

    }catch(err){
        console.error(err)
    }
}


module.exports = {saveUser, isAuthenticated}