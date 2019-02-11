"use strict";
module.exports = app => {
  const message = require("../controllers/messageController");

  // message Routes
  app
    .route("/api/messages")
    .get(message.listAllMessages)
    .post(message.createMessage);

  app
    .route("/api/messages/:messageId")
    .get(message.getMessage)
    .put(message.updateMessage)
    .delete(message.deleteMessage);
};
