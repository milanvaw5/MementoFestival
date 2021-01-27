import Game from './classes/Game.js';

let myGame;

{
  const init = () => {
    console.log("GAME STARTED");
    myGame = new Game();
    const express = require('express');
    const app = express();
    const server = require('http').Server(app);
    const port = process.env.PORT || 800;

    const io = require('socket.io')(server);

    io.on('connection', socket => {
      console.log('Socket connected', socket.id);

      socket.on('message', message => {
        console.log(message);
        io.sockets.emit(`message`, message);
      });

    });

    app.use(express.static('public'));

    server.listen(port, () => {
     console.log(`App listening on port ${port}!`);
});

  };

  init();
}
