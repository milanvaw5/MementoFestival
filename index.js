const express = require('express');
const app = express();
const server = require('http').Server(app);
const port = process.env.PORT || 80;

const io = require('socket.io')(server);


let words = [];
let admin;
let livePing;
io.on('connection', socket => {
  console.log('Socket connected', socket.id);

  socket.on('admin', () => {
    admin = socket.id;
    console.log(`admin: ${socket.id}`);
    livePing = setInterval(() => {
      io.sockets.emit('live');
    }, 100);
  });
  
  socket.on('message', message => {
    console.log(message);

    words.push(message);
    console.log(words);
    io.sockets.emit(`message`, message);
    
  });

  socket.on('schud', () => {

    io.sockets.emit(`shakeAll`);
    
  });

  socket.on('feeling', selectedFeeling => {
    console.log(selectedFeeling);
    io.sockets.emit(`selectedFeeling`, selectedFeeling);
  });

  socket.on('requestWords', () => {
    console.log(words);
    socket.emit('getWords', words);
  })

  

  socket.on('points', jointPositions => {
    //console.log(jointPositions);
    io.sockets.emit(`points`, jointPositions);
  });

  socket.on('disconnect', function () {
    if(socket.id === admin){
      admin = "";
      words = [];
      clearInterval(livePing);
      io.sockets.emit(`notLive`);
    }
    
});

});

app.use(express.static('public'));

server.listen(port, () => {
 console.log(`App listening on port ${port}!`);



});