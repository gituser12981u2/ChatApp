// constrolers/chatController.js
const socketio = require('socket.io');
const Chat = require('../models/Chat');

const chatController = (server, corsOptions) => {
    const io = socketio(server, { cors: corsOptions });

    io.on('connection', function (socket) {
        console.log('a user connected');

        socket.on('disconnect', function () {
            console.log('a user disconnected');
        });

        socket.on('chat message', async function (data) {
            console.log('message: ', data);

            // create a new chat doc
            const chat = new Chat({
                participants: ['userId1', 'userId2'], // replace with actual user ids
                message: [{
                    sender: 'userId1', // replace with actual sender id
                    content: data.message,
                }]
            });

            // save the chat doc
            try {
                const savedChat = await chat.save();
                console.log('savedChat:', savedChat);
            } catch (err) {
                console.error('error saving chat: ', err);
            }

            io.emit('chat message', { id: socket.id, msg: data.message });
        });
    });
};

module.exports = chatController;