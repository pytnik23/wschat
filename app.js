const express = require('express');
const socket = require('socket.io');

const path = require('path');

const port = process.env.PORT || 3000;

// App setup
const app = express();
const server = app.listen(port, () => console.log(`Server is running on port ${port}`));

// Static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules/socket.io-client/dist')));

// Socket setup
const io = socket(server);
io.on('connection', (socket) => {
    console.log('made socket connection', socket.id);

    // Handle chat event
    socket.on('chat', function(data){
        io.sockets.emit('chat', data);
    });

    // Handle typing event
    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data);
    });
});
