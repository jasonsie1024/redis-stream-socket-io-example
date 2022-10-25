const {redis} = require('./redis');
const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const { v4: uuidv4 } = require('uuid');

const server_id = uuidv4();
const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

const processMessage = (message) => {
    console.log("Id: %s. Data: %O", message[0], message[1]);
    io.emit('location', message[1]);
};

async function listenForMessage(lastId = "$") {
    const results = await redis.xreadgroup("GROUP", "rts", server_id, 'COUNT', 1, 'BLOCK', 0, 'STREAMS', 'locations', '>');
    const [key, messages] = results[0];
    
    messages.forEach(processMessage);

    await listenForMessage(messages[messages.length - 1][0]);
}

listenForMessage();

server.listen(3000, () => {
    console.log('listening on *:3000');
});