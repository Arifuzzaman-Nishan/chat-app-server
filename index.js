const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const http = require("http");
const cors = require("cors");

const app = express();
const { Server } = require("socket.io");
app.use(cors());

const server = http.createServer(app);

// socket.io setup for connection
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});


// internal imports...
const loginRouter = require('./router/loginrouter');
const signupRouter = require('./router/signuprouter');
const messageRouter = require('./router/messagerouter');

dotenv.config();

// request parser
app.use(express.json());
app.use(cors());

// database connection
mongoose
    .connect('mongodb://localhost:27017/chat')
    .then(() => console.log('successfully database connected'))
    .catch((err) => console.log(err.message))

    io.on("connection", (socket) => {
        console.log(`User Connected: ${socket.id}`);
      
        socket.on("join_room", (data) => {
          socket.join(data);
          console.log(`User with ID: ${socket.id} joined room: ${data}`);
        });
      
        socket.on("send_message", (data) => {
          socket.to(data.room).emit("receive_message", data);
        });
      
        socket.on("disconnect", () => {
          console.log("User Disconnected", socket.id);
        });
      });


// routing setup
app.use('/login',loginRouter);
app.use('/signup',signupRouter);
app.use('/message',messageRouter);



server.listen(5000,() => {
    console.log('listening port from 5000');
})