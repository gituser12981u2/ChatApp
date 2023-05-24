// app.js
require('dotenv').config();
var express = require('express');
var http = require('http');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
const { connectToDatabase } = require('./database');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

var app = express();
var server = http.createServer(app);

var chatController = require('./controllers/chatController');

// Setup CORS options
var corsOptions = {
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true
};

chatController(server, corsOptions);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../chat-app-frontend/build')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../chat-app-frontend/build', 'index.html'));
    });
}

// const indexRoutes = require('./routes/indexRoutes');
// const userRoutes = require('./routes/userRoutes');
// const chatController = require('./controllers/chatController');


app.use(logger('dev'));
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Removing route handling for now
// app.use('/', indexRouter);
// app.use('/users', usersRouter);

const PORT = process.env.PORT || 3001;

connectToDatabase().then(() => {
    server.listen(PORT, function () {
        console.log(`listening on *:${PORT}`);
    });
});

module.exports = app;
