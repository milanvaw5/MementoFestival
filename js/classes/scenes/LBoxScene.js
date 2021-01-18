//let letters;
//let numberOfWords = 0;
//let j = 0;

let letter;
let letters= [];
let backgroundimage;
let spawnWordInterval;

let readWord = 'abc';
let split = [];

let word = [];

const lettersprites = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];

let i;
let j;
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
    this.load.spritesheet('a', 'assets/enemy.png', { frameWidth: 65, frameHeight: 51 });
    this.load.spritesheet('b', 'assets/boss.png', { frameWidth: 380, frameHeight: 166 });
    this.load.spritesheet('c', 'assets/explosion.png', { frameWidth: 192, frameHeight: 192 });
  }

  create(){
    console.log(`CREATE`);
    //this.physics.world.checkCollision.up = false;

    letters = this.physics.add.group({
      key: 'block',
      allowRotation: true,
      frameQuantity: 6,
      bounceY: 0.5,
      dragY: 30,
      velocityY: 300,
      collideWorldBounds: true,
      setXY: { x: 400, y: 0, stepY: -200 }
  });

    //word = this.physics.add.group();

    backgroundimage = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'backgroundimage');

    this.spawnWord();

    spawnWordInterval = this.time.addEvent({
      delay: 10000,
      callback: this.spawnWord,
      callbackScope: this,
      args: [],
      loop: true
    });

  }

  update(){
    this.physics.collide(letters, [letters]);
  }

  spawnWord() {

    let fallPosition = Phaser.Math.Between(20, this.cameras.main.width / 2);

    this.splitWord();

    console.log('SPAWN WORD');

    for (letter = 0; letter < split.length; letter++)
    {

      let spacebetween = 0;

      if( (split.length*100) > this.cameras.main.width) {
        spacebetween = spacebetween + (split.length*50);
      }
      else {
        spacebetween = spacebetween + (split.length*100);
      }
        //console.log(split[j]+'.png');
        console.log('spawnWord: ' + split[letter]);

      split[letter] = this.physics.add.sprite(fallPosition, 0, split[letter]);
      split[letter].body.setGravityY(300);
      split[letter].body.mass = 20;
      split[letter].body.acceleration.set(0, 0.8);
      split[letter].setCollideWorldBounds(true);
      split[letter].body.setBounce(0, 0.6);
      letters.add(split[letter]);
      split[letter].setVelocityY(100);

        fallPosition = fallPosition + spacebetween;

    }

  }

  splitWord() {



  //event.preventDefault();
  //readWord = document.querySelect("enteredWord").value;

//  readWord = form["enteredWord"].value;
  if (readWord == '') {
    //alert('Oeps, je hebt niets ingevuld... (Oops, you didn`t fill anything in)');
    readWord = 'abc';
    //return false;
  }

  split = readWord.split('');
  console.log('splitWord: ' + split);
/*
        for (j = 0; j < split.length; j++)
        {
            //console.log(split[j]+'.png');
            word.push(split[j]+'.png');
        }

        console.log(word);
*/
  };

}
