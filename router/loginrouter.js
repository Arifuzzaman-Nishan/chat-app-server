const express = require("express");
const loginRouter  = express.Router();
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const People = require('../Schemas/People');
const jwt = require('jsonwebtoken');

loginRouter.post("/",async (req,res) => {

    // console.log(req.body);

    const {name,password} = req.body;

    const user = await People.find({name:name});

    if(user && user.length > 0){

        const isValidPassword = await bcrypt.compare(password,user[0].password);

        // console.log(isValidPassword);
        
        if(isValidPassword){
            const token = jwt.sign({
                username: user[0].name,
                userId: user[0]._id
            },process.env.JWT_SECRET);

            // console.log(token);

            res.status(200).json({
                "access_token":token,
                "message":"login successfull"
            });

        }else{
            res.status(401).json({
                "message":"Authentication failed!"
            })
        }

    }else{
        res.status(401).json({
            "message":"Authentication failed!"
        })
    }
})

module.exports = loginRouter;