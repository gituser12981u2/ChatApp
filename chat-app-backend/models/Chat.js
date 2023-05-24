// ./models/Chat.js
const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    sender: {
        type: String, // assumes user id is string
        required: true
    },
    content: {
        type: String,
        required: true
    },
    timestampe: {
        type: Date,
        default: Date.now
    }
});

const ChatSchema = new mongoose.Schema({
    participants: {
        type: [String], // assumes user id is string
        required: true
    },
    message: [MessageSchema]
});

module.exports = mongoose.model('Chat', ChatSchema);