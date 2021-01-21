import LBoxScene from './scenes/LBoxScene.js';
export default class Game extends Phaser.Game {

  constructor(){
    let config = {
      type: Phaser.AUTO,
      width:1700,
      height:1200,
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
