import LBoxScene from './scenes/LBoxScene.js';
export default class Game extends Phaser.Game{

  constructor(){
    let config = {
      type: Phaser.AUTO,
      width:1700,
      height:1200,
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 0 },
        },
      },
    }
    super(config);
    this.scene.add(`lboxscene`,LBoxScene,true);
    this.physics.scene.setBoundsCollision(true, true, true, true);
    console.log('CONNECTING TO SCENE');
  }
}
