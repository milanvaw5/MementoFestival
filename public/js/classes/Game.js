import VisitorScene from './scenes/VisitorScene.js';
import AdminScene from './scenes/AdminScene.js';
export default class Game extends Phaser.Game {

  constructor(){

    let config;
    const path = window.location.pathname;
    if (path === "/admin.html") {
       config = {
        type: Phaser.AUTO,
        scale: {
          mode: Phaser.Scale.FIT,
          parent: 'bottomblock',
          width: 1000,
          height: 1000
      },
        physics: {
          default: 'matter',
          matter: {
            gravity: { y: 1 },
            setBounds: {
              bottom: true,
              left: true,
              right: true
            }
          },

        },
        transparent: true,
        input: {
          keyboard: {
              target: window
          },
          mouse: {
              target: null,
              capture: true,
              preventDefaultWheel: false // IMPORTANT: let's you scroll website when cursor is on phaser canvas !
          },
          activePointers: 1,
          /*touch: {
              target: null,
              capture: true,
          },*/
          smoothFactor: 0,
          gamepad: false,
          windowEvents: true,
      },
      debug: true,
      }

    }
    else {
       config = {
        type: Phaser.AUTO,
        scale: {
          mode: Phaser.Scale.FIT,
          parent: 'bottomblock',
          width: 1000,
          height: 1000
      },
       // type: Phaser.AUTO,

        physics: {
          default: 'matter',
          matter: {
            gravity: { y: 1 },
            setBounds: {
              bottom: true,
              left: true,
              right: true
            }
          },

        },
        transparent: true,
        input: {
          keyboard: {
              target: window
          },
          mouse: {
              target: null,
              capture: true,
              preventDefaultWheel: false // IMPORTANT: let's you scroll website when cursor is on phaser canvas !
          },
          activePointers: 1,
          touch: {
              target: null,
              capture: true,
          },
          smoothFactor: 0,
          gamepad: false,
          windowEvents: true,
      },
      }
    }

    super(config);



    if(path === "/admin.html") {

      console.log(path)
      this.scene.add(`adminscene`, AdminScene ,true);
    }
    else {
      this.scene.add(`visitorscene`, VisitorScene ,true);
    }

    console.log('CONNECTING TO SCENE');
  }
}
