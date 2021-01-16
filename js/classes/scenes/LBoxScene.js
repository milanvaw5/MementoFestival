//let words;
//let letters;
//let numberOfWords = 0;
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

    backgroundimage = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'backgroundimage');

    this.spawnWords();
      spawnWordInterval = this.time.addEvent({
      delay: 10000,
      callback: this.spawnWords,
      callbackScope: this,
      args: [],
      loop: true
    });

    this.word = this.physics.add.sprite(100, 450, 'word');

    this.word.setCollideWorldBounds(true);
    this.word.body.setBounce(20, 20);
    //this.word.setDepth(1);

    this.words = this.physics.add.group();

  }

  update(){

  }

  spawnWords() {
    const word = this.physics.add.sprite(1700, Phaser.Math.Between(0, 1200), 'word');
    //this.words.add(word); //geeft error this.words undefined
    word.setVelocityY(Phaser.Math.Between(0, 1000));
    console.log('SPAWN WORD');
  }
}
