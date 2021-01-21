let letter;
//let backgroundimage;
let spawnWordInterval;

let readWord = 'abcde';
let split = [];

let letters = [];

let auteurInput = ['Verloren','hinkel ik','over de sproeten op mijn vingers',
'Afgeslagen','langzaam ademend','langs mijn armen dwalend','Mijn rug','terug – gezucht –',
'geen bescherming op de vlucht','Veilig','aan mijn zij','de afgrond daar als lijn',
'Onontdekt','en zorgeloos','dolend door mijn eigen hoofd'];

const lettersprites = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
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
    //Preloading sprites

    //this.load.image('backgroundimage', 'assets/bimg.jpg');
    this.load.image('d', 'assets/ball.png');
    this.load.spritesheet('a', 'assets/enemy.png', { frameWidth: 35, frameHeight: 35 });
    this.load.spritesheet('b', 'assets/dude.png', { frameWidth: 35, frameHeight: 35 });
    this.load.spritesheet('c', 'assets/explosion.png', { frameWidth: 35, frameHeight: 35 });
    this.load.spritesheet('e', 'assets/idle2.png', { frameWidth: 35, frameHeight: 35 });
  }

  create(){
    console.log(`CREATE`);

    //backgroundimage = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'backgroundimage');

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

    if (letters.length === 20) {

    }
  }

  spawnWord() {

    let widthDivScreen = document.querySelector('.bottomblock');
    console.log(widthDivScreen.width);

    let fallPosition = Phaser.Math.Between(20, widthDivScreen.offsetWidth / 2);

    this.splitWord();

    console.log('SPAWN WORD');

    for (letter = 0; letter < split.length; letter++)
    {

      let spacebetween = 0;

      if( (split.length*5) > widthDivScreen.offsetWidth) {
        spacebetween = spacebetween + (split.length*2);
      }
      else {
        spacebetween = spacebetween + (split.length*5);
      }
        console.log('spawnWord: ' + split[letter]);

        split[letter] = this.matter.add.sprite(fallPosition, 0, split[letter]);
        fallPosition = fallPosition + spacebetween;

    }

  };

  readInWord() {
    readWord = document.querySelector('.enteredWord').value;

    if(readWord != '')
    {
      console.log(readWord);
      this.splitWord(readWord);
      return false; // Then it won't PostBack.

    }
    else {
      console.log('Er werd niets ingevult');
      return true;
    }
  };

  splitWord (){

  if (readWord === '') {
    //alert('Oeps, je hebt niets ingevuld... (Oops, you didn`t fill anything in)');
    readWord = 'abcde';
    //return false;
  }

  split = readWord.split('');
  console.log('splitWord: ' + split);

  letters.push(split);

  };

}
