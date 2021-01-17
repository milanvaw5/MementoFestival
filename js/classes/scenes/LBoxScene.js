//let letters;
//let numberOfWords = 0;
let j = 0;
let word;
let words= [];
let backgroundimage;
let spawnWordInterval;

export default class LetterBoxScene extends Phaser.Scene {

  constructor(config){
    super(config);
  }

  init(){
    //reset some variables
    console.log('INITLIALIZING');
  }

  preload(){
    console.log(`PRELOAD`);
    //1. Preloading images

    this.load.image('backgroundimage', 'assets/bimg.jpg');
    this.load.spritesheet('word', 'assets/enemy.png', { frameWidth: 65, frameHeight: 51 });

  }

  create(){
    console.log(`CREATE`);
    //this.physics.world.checkCollision.up = false;

    words = this.physics.add.group({
      key: 'block',
      frameQuantity: 6,
      bounceY: 0.5,
      dragY: 30,
      velocityY: 300,
      collideWorldBounds: true,
      setXY: { x: 400, y: 0, stepY: -200 }
  });

    backgroundimage = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'backgroundimage');

    this.spawnWords();
      spawnWordInterval = this.time.addEvent({
      delay: 10000,
      callback: this.spawnWords,
      callbackScope: this,
      args: [],
      loop: true
    });

  }

  update(){
    this.physics.collide(words, [words]);
  }

  spawnWords() {
      word = this.physics.add.sprite(Phaser.Math.Between(0, this.cameras.main.width / 2), 0, 'word');
      word.body.setGravityY(300);
      word.body.mass = 20;
      word.body.acceleration.set(0, 0.8);
      word.setCollideWorldBounds(true);
      word.body.setBounce(0, 0.6);
      words.add(word);
      word.setVelocityY(100);
      console.log('SPAWN WORD');
      //j++;
  }

}
