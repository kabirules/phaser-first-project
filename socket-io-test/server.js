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
        players = players.filter(element => element != socket.id)
        console.log('A user disconnected: ' + socket.id);
        console.log('players connected: ' + players.length)
    });

    socket.on('scoreUpdated', function (isPlayerA, score) {
        if (isPlayerA) {
            console.log('Player A score has been updated. Now we have to update the score of the Player A in the Player B screen')
        } else {
            console.log('Player B score has been updated. Now we have to update the score of the Player B in the Player A screen')
        }
        //emitting the score updating of the other player
        io.emit('updateScore', isPlayerA, score)
    })
});

http.listen(3000, function () {
    console.log('Server started!');
});
