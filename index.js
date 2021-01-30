const express = require('express');
const app = express();
const server = require('http').Server(app);
const port = process.env.PORT || 80;

const io = require('socket.io')(server);

io.on('connection', socket => {
  console.log('Socket connected', socket.id);

  socket.on('message', message => {
    console.log(message);
    io.sockets.emit(`message`, message);
  });

  socket.on('points', jointPositions => {
    console.log(jointPositions);
    io.sockets.emit(`points`, jointPositions);
  });

});

app.use(express.static('public'));

server.listen(port, () => {
 console.log(`App listening on port ${port}!`);
});