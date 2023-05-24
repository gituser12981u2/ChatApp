// database.js
const mongoose = require('mongoose');

const connectToDatabase = async () => {
    try {
        //await mongoose.connect(`mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.mongodb.net/Chat?retryWrites=true&w=majority`, {
        await mongoose.connect(process.env.DB_CONNECTION_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Could not connect to MongoDB', err);
    }
};

module.exports = { connectToDatabase }