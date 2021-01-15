import MenuScene from './scenes/MenuScene.js';
import GameScene from './scenes/GameScene.js';
import NextScene from './scenes/NextScene.js';
import GameoverScene from './scenes/GameoverScene.js';
import VictoryScene from './scenes/VictoryScene.js';



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
    //start first Scene and add other to game
    this.scene.add(`menuscene`,MenuScene,true);
    this.scene.add(`gamescene`,GameScene,false);
    this.scene.add(`nextscene`,NextScene,false);
    this.scene.add(`gameoverscene`,GameoverScene,false);
    this.scene.add(`victoryscene`,VictoryScene,false);
 
  }
}
