"use strict";

const mongoose = require("mongoose"),
  Message = mongoose.model("Messages");

const io = require("../../app");

const returnResponse = (err, modelInstance) => {
  err && res.send(err);
  res.json(modelInstance);
};

exports.listAllMessages = (req, res) => {
  Message.find({}, null, { sort: { created_date: -1 } }, (err, message) => {
    err && res.send(err);
    res.json(message);
  });
};

exports.createMessage = (req, res) => {
  const newMessage = new Message(req.body);
  newMessage.save((err, message) => {
    if (err) res.send(err);
    res.json(message);
    io.emit("message", req.body);
  });
};

exports.getMessage = (req, res) => {
  Message.findById(req.params.messageId, (err, message) => {
    if (err) res.send(err);
    res.json(message);
  });
};

exports.updateMessage = (req, res) => {
  Message.findOneAndUpdate(
    { _id: req.params.message },
    req.body,
    { new: true },
    (err, message) => {
      if (err) res.send(err);
      res.json(message);
    }
  );
};

exports.deleteMessage = (req, res) => {
  Message.remove(
    {
      _id: req.params.messageId
    },
    (err, message) => {
      if (err) res.send(err);
      res.json({ message: "Message successfully deleted" });
    }
  );
};
