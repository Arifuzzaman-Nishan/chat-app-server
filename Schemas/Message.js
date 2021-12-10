const mongoose = require("mongoose");

const messageSchema = mongoose.Schema(
  {
    author: {
      type: String,
      required: true,
    },
    receiver: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    room: {
        type: String,
        // required: true,
    },
    time: {
        type: String,
    }
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;