"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  context: {
    type: String,
    required: "Kindly enter the message",
    //default: ["defaultContext"]
  },
  created_date: {
    type: Date,
    default: Date.now
  },
  user: {
    name: {
      type: String
    },
    type: [
      {
        type: String,
        enum: ["enterprise", "citizen"]
      }
    ],
    default: ["citizen"]
  }
});

module.exports = mongoose.model("Messages", MessageSchema);
