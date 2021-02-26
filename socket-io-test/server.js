const server = require('express')();
const http = require('http').createServer(server);
const io = require('socket.io')(http, {cors: {
    origin: "http://localhost:8000",
    methods: ["GET", "POST"]
  }});
let players = [];

io.on('connection', function (socket) {
    console.log('A user connected: ' + socket.id);

    players.push(socket.id);
    console.log('players connected: ' + players.length)

    if (players.length === 1) {
        io.emit('isPlayerA');
        console.log('isPlayerA emitted')
    };    

    socket.on('disconnect', function () {
        players = players.filter(element => element == socket.id)
        console.log('players connected: ' + players.length)
        console.log('A user disconnected: ' + socket.id);
    });

    socket.on('scoreUpdated', function (isPlayerA) {
        console.log('update the score of the player A? -> ' + isPlayerA)
        io.emit('updateScore')
    })
});
http.listen(3000, function () {
    console.log('Server started!');
});
