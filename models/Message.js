const Joi = require("@hapi/joi");
const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");

const messageSchema = new mongoose.Schema({
  roomName: { type: String, required: true, lowercase: true, unique: true },
  roomUsers: [{ type: String, required: true, lowercase: true }],
  bucket: [
    {
      contentType: { type: String, enum: ["tip", "message"] },
      message: {
        user: { type: String, lowercase: true },
        text: { type: String },
        timeSent: { type: String }
      }
    }
  ]
});

messageSchema.plugin(uniqueValidator);

const Message = mongoose.model("Message", messageSchema);

const validateMessage = Joi.object({
  roomName: Joi.string()
    .max(40)
    .required(),
  bucket: [
    {
      time: Joi.date(),
      sender: Joi.string()
        .max(40)
        .required(),
      receiver: Joi.string()
        .max(40)
        .required(),
      senderName: Joi.string()
        .max(40)
        .required(),
      receiverName: Joi.string()
        .max(40)
        .required(),
      message: Joi.string()
        .max(400)
        .required()
    }
  ]
});

exports.messageSchema = messageSchema;
exports.Message = Message;
exports.validateMessage = validateMessage;
