let letter;
//let backgroundimage;
let spawnWordInterval;

let readWord = 'abc';
let split = [];

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
    //1. Preloading images

    //this.load.image('backgroundimage', 'assets/bimg.jpg');
    this.load.image('ball', 'assets/ball.png');
    this.load.spritesheet('a', 'assets/enemy.png', { frameWidth: 65, frameHeight: 51 });
    this.load.spritesheet('b', 'assets/boss.png', { frameWidth: 380, frameHeight: 166 });
    this.load.spritesheet('c', 'assets/explosion.png', { frameWidth: 192, frameHeight: 192 });
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

      split[letter] = this.matter.add.sprite(fallPosition, 0, split[letter]);
      //letters.add(split[letter]);

        fallPosition = fallPosition + spacebetween;

    }

  }

  handleSubmitForm = e => {

    const $form = e.currentTarget;
    e.preventDefault();
    readWord = document.querySelector('.enteredWord').value;
    console.log(readWord);
    this.splitWord(readWord);
  }

  splitWord (){

  if (readWord === '') {
    //alert('Oeps, je hebt niets ingevuld... (Oops, you didn`t fill anything in)');
    readWord = 'abc';
    //return false;
  }

  split = readWord.split('');
  console.log('splitWord: ' + split);

  }

}
