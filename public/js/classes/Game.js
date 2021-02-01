import VisitorScene from './scenes/VisitorScene.js';
import AdminScene from './scenes/AdminScene.js';
export default class Game extends Phaser.Game {

  constructor(){
    let config = {
      scale: {
        mode: Phaser.Scale.FIT,
        parent: 'bottomblock',
        width: 800,
        height: 600
    },
     // type: Phaser.AUTO,
    //  parent: 'bottomblock',
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
    }
    super(config);
 
    const path = window.location.pathname;
 
    if(path === "/index.html" || path === "/"){

      console.log(path)
      this.scene.add(`adminscene`, AdminScene ,true);
    }else{
      this.scene.add(`visitorscene`, VisitorScene ,true);
    }
   
    console.log('CONNECTING TO SCENE');
  }
}
