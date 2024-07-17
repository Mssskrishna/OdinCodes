const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    title: { type: String, required: true },
    text: { type: String, requiredm: true },
    timeStamp: { type: Date, default: Date.now },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }

});

const Message = mongoose.model('Message', MessageSchema);
module.exports = Message;