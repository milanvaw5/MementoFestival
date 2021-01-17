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
      delay: 1000,
      callback: this.spawnWords,
      callbackScope: this,
      args: [],
      loop: true
    });

  }

  update(){
    /*for (var i = 0; i <= j; i++)
    {
      if ( i != j) {
        this.physics.collide([j], [i]);
        console.log('botst ' + [j] +'met '+[i] +'?');
      }
      else {
        console.log('eigen blokje');
      }
    }*/
    this.physics.collide(words, 1);
    this.physics.collide(words, 2);
    this.physics.collide(words, 3);
    this.physics.collide(words, 4);
    this.physics.collide(words, 5);
    this.physics.collide(words, 6);
    this.physics.collide(words, 7);
    this.physics.collide(words, 8);
    this.physics.collide(words, 9);
    this.physics.collide(words, 10);
    //game.physics.arcade.collide(sprite, sprite2);
  }

  spawnWords() {
      word = this.physics.add.sprite(Phaser.Math.Between(0, this.cameras.main.width / 2), 0, j);
      word.body.setGravityY(300);
      word.body.mass = 20;
      word.body.acceleration.set(0, 0.8);
      word.setCollideWorldBounds(true);
      word.body.setBounce(0, 0.7);
      words.add(j);
      word.setVelocityY(100);
      console.log('SPAWN WORD '+[j]);
      j++;
  }

}
