const express = require('express');
const app = express();
const server = require('http').Server(app);
const port = process.env.PORT || 80;

const io = require('socket.io')(server);

let timer = 0;
let wordCounter = 0;
let idleWords = ['verloren','hinkel', 'ik', 'over', 'de', 'sproeten','op', 'mijn', 'vingers'];
let words = [];
let feelings = [];
let highfives = 0;
let hearts = 0;
let admin;
let livePing;
let idleMode;

io.on('connection', socket => {
  console.log('Socket connected', socket.id);

  socket.on('admin', () => {
    admin = socket.id;
    words = [];
    feelings = [];
    io.sockets.emit(`synchronize`);
    console.log(`admin: ${socket.id}`);
    io.sockets.emit(`message`, "welkom");
    words.push("welkom");
    setTimeout(function(){
      io.sockets.emit(`message`, "in");
      words.push("in");
    }, 500);
    setTimeout(function(){
      io.sockets.emit(`message`, "de");
      words.push("de");
    }, 1000);
    setTimeout(function(){
      io.sockets.emit(`message`, "letterdoos");
      words.push("letterdoos");
    }, 1500);

    livePing = setInterval(() => {
      io.sockets.emit('live');
    }, 100);

    idleMode = setInterval(() => {
      timer++;

      if(timer >= 30){
        io.sockets.emit(`message`, idleWords[wordCounter]);
        words.push(idleWords[0]);
        if(words.length > 10){
          words.shift();
        }
        wordCounter++
        if(wordCounter >= idleWords.length){
          wordCounter = 0;
        }
      }
    }, 2000);


  });

  socket.on('message', message => {
    timer = 0;
    console.log(message);

    words.push(message);
    if(words.length > 30){
      words.shift();
    }
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

  socket.on('clearLetter', letter => {
    socket.emit('clearLetterAll', letter);
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
      timer = 0;
      clearInterval(livePing);
      clearInterval(idleMode);
      io.sockets.emit(`notLive`);
    }

});

});

app.use(express.static('public'));

server.listen(port, () => {
 console.log(`App listening on port ${port}!`);



});
