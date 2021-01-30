import VisitorScene from './scenes/VisitorScene.js';
import AdminScene from './scenes/AdminScene.js';
export default class Game extends Phaser.Game {

  constructor(){
    let config = {
      width: 1200,
      height: 1200,
      type: Phaser.AUTO,
      parent: 'bottomblock',
      physics: {
        default: 'matter',
        matter: {
          gravity: { y: 2 },
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
    if(path === "/index.html"){
      this.scene.add(`adminscene`, AdminScene ,true);
    }else{
      this.scene.add(`visitorscene`, VisitorScene ,true)
    }
   
    console.log('CONNECTING TO SCENE');
  }
}
