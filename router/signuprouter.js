const express = require("express");
const signupRouter  = express.Router();
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const People = require('../Schemas/People');

signupRouter.post("/", async (req,res) => {

    const {name,email,password} = req.body;
    console.log(req.body);

    const hashedPassword = await bcrypt.hash(password,10);

    const doc = new People({
        name: name,
        email: email,
        password: hashedPassword
    });

    try {
        await doc.save();
        res.status(200).send("signup was successfull!");
    } catch (err) {
        console.log(err.message);
        res.status(500).send("signup failed!");
    }

})

signupRouter.get('/getAllUser/:username',async(req,res) => {
    try {
        console.log(req.params.username);
        const username = req.params.username;
        const user = await People.find({ name: { $ne: username } });
        res.send(user);
    } catch (err) {
        console.log(err.message);
        res.send(err.message);
    }
})

module.exports = signupRouter;