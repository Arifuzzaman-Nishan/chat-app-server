const express = require('express');
const messageRouter = express.Router();
const Message = require("../Schemas/Message");

messageRouter.post('/',async (req,res) => {
    console.log(req.body);
    const doc = new Message(req.body);
    try {
        await doc.save();
        res.send("successfully inserted");
    } catch (err) {
        console.log(err.message);
    }
})

messageRouter.get('/getMessage',async (req,res) => {
    const author = req.query.author;
    const receiver = req.query.receiver;

    try {
        const message = await Message.find({$or:[{author:author,receiver:receiver},{author:receiver,receiver:author}]});
        console.log(message);
        res.send(message);
    } catch (err) {
        console.log(err.message);
    }
})


module.exports = messageRouter; 