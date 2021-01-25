import LBoxScene from './scenes/LBoxScene.js';
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
    this.scene.add(`lboxscene`,LBoxScene,true);
    console.log('CONNECTING TO SCENE');
  }
}
