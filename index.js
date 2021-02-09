const express = require('express');
const app = express();
const server = require('http').Server(app);
const port = process.env.PORT || 80;

const io = require('socket.io')(server);


let words = [];
let feelings = [];
let highfives = 0;
let hearts = 0;
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

  socket.on('hartje', () => {
    hearts++;
    io.sockets.emit(`heartAll`, hearts);
    
  });

  socket.on('hand', () => {
    
    io.sockets.emit(`handAll`, socket.id);
    
  });

  socket.on('handShake', id => {
    highfives++;
    io.sockets.to(id).emit(`handShaken`, highfives);
    io.sockets.to(admin).emit(`handShaken`, highfives);
    
  });

  socket.on('feeling', selectedFeeling => {
    feelings.push(selectedFeeling);
    console.log(selectedFeeling);
    io.sockets.emit(`selectedFeeling`, selectedFeeling);
  });

  socket.on('requestWords', () => {
    socket.emit('getWords', words);
  });

  socket.on('requestFeelings', () => {
    socket.emit('getFeelings', feelings);
  });

  socket.on('requestHearts', () => {
    socket.emit('getHeartCount', hearts);
  });
  socket.on('requestHighfives', () => {
    socket.emit('getHighfiveCount', highfives);
  });

  

  socket.on('points', jointPositions => {
    //console.log(jointPositions);
    io.sockets.emit(`points`, jointPositions);
  });

  socket.on('disconnect', function () {
    if(socket.id === admin){
      admin = "";
      words = [];
      feelings = [];
      clearInterval(livePing);
      io.sockets.emit(`notLive`);
    }
    
});

});

app.use(express.static('public'));

server.listen(port, () => {
 console.log(`App listening on port ${port}!`);



});