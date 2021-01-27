let letter;
let woordje;
//let backgroundimage;
let spawnWordInterval;
let timer;

let readWord = 'abcde';
let split = [];

let letters = [];

let widthDivScreen = document.querySelector('.bottomblock').style.width;

let spacebetween = 20;

/*
let auteurInput = ['Verloren','hinkel ik','over de sproeten op mijn vingers',
'Afgeslagen','langzaam ademend','langs mijn armen dwalend','Mijn rug','terug – gezucht –',
'geen bescherming op de vlucht','Veilig','aan mijn zij','de afgrond daar als lijn',
'Onontdekt','en zorgeloos','dolend door mijn eigen hoofd'];*/

let auteurInput = ['verloren','hinkelik','overdesproeten','opmijnvingers'];

let leftWristPos = {x:1, y:1};
let rightWristPos = {x:1, y:1};
let leftEyePos = {x:1, y:1};
let rightEyePos = {x:1, y:1};
let leftShoulderPos = {x:1, y:1};
let rightShoulderPos = {x:1, y:1};
let leftElbowPos = {x:1, y:1};
let rightElbowPos = {x:1, y:1};
let leftKneePos = {x:1, y:1};
let rightKneePos = {x:1, y:1};
let leftHipPos = {x:1, y:1};
let rightHipPos = {x:1, y:1};
let leftAnklePos = {x:1, y:1};
let rightAnklePos = {x:1, y:1};

const $msgForm = document.getElementById('wordForm');
const $msgInput = document.getElementById('enteredWord');
//const $messages = document.getElementById('messages');

let socket; // will be assigned a value later
export default class AdminScene extends Phaser.Scene {

  constructor(config){
    super(config);
  }

  preload(){
    console.log(`PRELOAD`);
    //Preloading sprites

    //this.load.image('backgroundimage', 'assets/bimg.jpg');
    //this.load.image('d', 'assets/ball.png');
    this.load.image('test', 'assets/test.png');
    this.load.spritesheet('a', 'assets/img/alphabet/a.png', { frameWidth: 40, frameHeight: 73 });
    this.load.spritesheet('b', 'assets/img/alphabet/b.png', { frameWidth: 40, frameHeight: 73 });
    this.load.spritesheet('c', 'assets/img/alphabet/c.png', { frameWidth: 40, frameHeight: 73 });
    this.load.spritesheet('d', 'assets/img/alphabet/d.png', { frameWidth: 40, frameHeight: 73 });
    this.load.spritesheet('e', 'assets/img/alphabet/e.png', { frameWidth: 40, frameHeight: 73 });
    this.load.spritesheet('f', 'assets/img/alphabet/f.png', { frameWidth: 40, frameHeight: 73 });
    this.load.spritesheet('g', 'assets/img/alphabet/g.png', { frameWidth: 40, frameHeight: 73 });
    this.load.spritesheet('h', 'assets/img/alphabet/h.png', { frameWidth: 40, frameHeight: 73 });
    this.load.spritesheet('i', 'assets/img/alphabet/i.png', { frameWidth: 40, frameHeight: 73 });
    this.load.spritesheet('j', 'assets/img/alphabet/j.png', { frameWidth: 40, frameHeight: 73 });
    this.load.spritesheet('k', 'assets/img/alphabet/k.png', { frameWidth: 40, frameHeight: 73 });
    this.load.spritesheet('l', 'assets/img/alphabet/l.png', { frameWidth: 40, frameHeight: 73 });
    this.load.spritesheet('m', 'assets/img/alphabet/m.png', { frameWidth: 40, frameHeight: 73 });
    this.load.spritesheet('n', 'assets/img/alphabet/n.png', { frameWidth: 40, frameHeight: 73 });
    this.load.spritesheet('o', 'assets/img/alphabet/o.png', { frameWidth: 40, frameHeight: 73 });
    this.load.spritesheet('p', 'assets/img/alphabet/p.png', { frameWidth: 40, frameHeight: 73 });
    this.load.spritesheet('q', 'assets/img/alphabet/q.png', { frameWidth: 40, frameHeight: 73 });
    this.load.spritesheet('r', 'assets/img/alphabet/r.png', { frameWidth: 40, frameHeight: 73 });
    this.load.spritesheet('s', 'assets/img/alphabet/s.png', { frameWidth: 40, frameHeight: 73 });
    this.load.spritesheet('t', 'assets/img/alphabet/t.png', { frameWidth: 40, frameHeight: 73 });
    this.load.spritesheet('u', 'assets/img/alphabet/u.png', { frameWidth: 40, frameHeight: 73 });
    this.load.spritesheet('v', 'assets/img/alphabet/v.png', { frameWidth: 40, frameHeight: 73 });
    this.load.spritesheet('w', 'assets/img/alphabet/w.png', { frameWidth: 40, frameHeight: 73 });
    this.load.spritesheet('x', 'assets/img/alphabet/x.png', { frameWidth: 40, frameHeight: 73 });
    this.load.spritesheet('y', 'assets/img/alphabet/y.png', { frameWidth: 40, frameHeight: 73 });
    this.load.spritesheet('z', 'assets/img/alphabet/z.png', { frameWidth: 40, frameHeight: 73 });

  }

  create(){
    console.log(`CREATE`);


    this.makeConnection();
    //backgroundimage = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'backgroundimage');

    this.leftWristAvatar = this.matter.add.image(leftWristPos.x, leftWristPos.y, 'test', 0, {mass: 1000, inverseMass: 1000, ignoreGravity: false, density: 1});
    this.rightWristAvatar = this.matter.add.image(rightWristPos.x, rightWristPos.y, 'test', 0, {mass: 1000, inverseMass: 1000, ignoreGravity: false, density: 1});
    this.leftEyeAvatar = this.matter.add.image(leftEyePos.x, leftEyePos.y, 'test', 0, {mass: 1000, inverseMass: 1000, ignoreGravity: false, density: 1});
    this.rightEyeAvatar = this.matter.add.image(rightEyePos.x, rightEyePos.y, 'test', 0, {mass: 1000, inverseMass: 1000, ignoreGravity: false, density: 1});
    this.leftShoulderAvatar = this.matter.add.image(leftShoulderPos.x, leftShoulderPos.y, 'test', 0, {mass: 1000, inverseMass: 1000, ignoreGravity: false, density: 1});
    this.rightShoulderAvatar = this.matter.add.image(rightShoulderPos.x, rightShoulderPos.y, 'test', 0, {mass: 1000, inverseMass: 1000, ignoreGravity: false, density: 1});
    this.leftElbowAvatar = this.matter.add.image(leftElbowPos.x, leftElbowPos.y, 'test', 0, {mass: 1000, inverseMass: 1000, ignoreGravity: false, density: 1});
    this.rightElbowAvatar = this.matter.add.image(rightElbowPos.x, rightElbowPos.y, 'test', 0, {mass: 1000, inverseMass: 1000, ignoreGravity: false, density: 1});
    this.leftHipAvatar = this.matter.add.image(leftHipPos.x, leftHipPos.y, 'test', 0, {mass: 1000, inverseMass: 1000, ignoreGravity: false, density: 1});
    this.rightHipAvatar = this.matter.add.image(rightHipPos.x, rightHipPos.y, 'test', 0, {mass: 1000, inverseMass: 1000, ignoreGravity: false, density: 1});
    this.leftKneeAvatar = this.matter.add.image(leftKneePos.x, leftKneePos.y, 'test', 0, {mass: 1000, inverseMass: 1000, ignoreGravity: false, density: 1});
    this.rightKneeAvatar = this.matter.add.image(rightKneePos.x, rightKneePos.y, 'test', 0, {mass: 1000, inverseMass: 1000, ignoreGravity: false, density: 1});
    this.leftAnkleAvatar = this.matter.add.image(leftAnklePos.x, leftAnklePos.y, 'test', 0, {mass: 1000, inverseMass: 1000, ignoreGravity: false, density: 1});
    this.rightAnkleAvatar = this.matter.add.image(rightAnklePos.x, rightAnklePos.y, 'test', 0, {mass: 1000, inverseMass: 1000, ignoreGravity: false, density: 1});


    this.spawnLetters();

    //timer = setTimeout(this.readInAuteurInput(), 50000);

    //document.getElementById('sumbitwordbutton').addEventListener('click', this.readInWord);

    /*spawnWordInterval = this.time.addEvent({
      delay: 10000,
      callback: this.spawnWord,
      callbackScope: this,
      args: [],
      loop: true
    });*/
  }

  update(){
    //bij een bepaald aantal letters op het scherm - zullen er een hoeveelheid verdwijnen,
    //random gekozen om zo nieuwe woorden en mysterie te creëren
    if (letters.length === 20) {
      for (let numberOfRemoveletters = 10; numberOfRemoveletters>0; numberOfRemoveletters--){
        for(let removeletters = letters.length-1; removeletters >= 0; removeletters--){
          array.splice(Math.floor(Math.random()*removeletters.length), 1);
        }
      }
      console.log(letters);
    }

    this.leftWristAvatar.x = leftWristPos.x;
    this.leftWristAvatar.y = leftWristPos.y + 200;
    this.leftEyeAvatar.x = leftEyePos.x;
    this.leftEyeAvatar.y = leftEyePos.y + 200;
    this.leftShoulderAvatar.x = leftShoulderPos.x;
    this.leftShoulderAvatar.y = leftShoulderPos.y + 200;
    this.leftElbowAvatar.x = leftElbowPos.x;
    this.leftElbowAvatar.y = leftElbowPos.y + 200;
    this.leftHipAvatar.x = leftHipPos.x;
    this.leftHipAvatar.y = leftHipPos.y + 200;
    this.leftKneeAvatar.x = leftKneePos.x;
    this.leftKneeAvatar.y = leftKneePos.y + 200;
    this.leftAnkleAvatar.x = leftAnklePos.x;
    this.leftAnkleAvatar.y = leftAnklePos.y + 200;

    this.rightWristAvatar.x = rightWristPos.x;
    this.rightWristAvatar.y = rightWristPos.y + 200;
    this.rightEyeAvatar.x = rightEyePos.x;
    this.rightEyeAvatar.y = rightEyePos.y + 200;
    this.rightShoulderAvatar.x = rightShoulderPos.x;
    this.rightShoulderAvatar.y = rightShoulderPos.y + 200;
    this.rightElbowAvatar.x = rightElbowPos.x;
    this.rightElbowAvatar.y = rightElbowPos.y + 200;
    this.rightHipAvatar.x = rightHipPos.x;
    this.rightHipAvatar.y = rightHipPos.y + 200;
    this.rightKneeAvatar.x = rightKneePos.x;
    this.rightKneeAvatar.y = rightKneePos.y + 200;
    this.rightAnkleAvatar.x = rightAnklePos.x;
    this.rightAnkleAvatar.y = rightAnklePos.y + 200;

  };


  //woord word gespawned op scherm
  spawnWord() {

    let fallPosition = Phaser.Math.Between(20, widthDivScreen / 4);
    this.splitWord();

    for (letter = 0; letter < split.length; letter++)
    {
      console.log('spawnWord: ' + split[letter]);
      split[letter] = this.matter.add.sprite(fallPosition, 0, split[letter], 0, {restitution: .5});
      fallPosition = fallPosition + spacebetween;
      letters.push(split[letter]);
      console.log(letters);
    }

  };

    //de timer is nul dus word een auteurinput gedropt en daarna de timer gereset
    readInAuteurInput() {
      console.log('auteurinput');
      readWord = auteurInput[Math.floor(Math.random() * auteurInput.length)];
      if (readWord!= '') {
        console.log(readWord);
        this.splitWord(readWord);
        this.spawnWord();
        //timer = setInterval(this.readInAuteurInput(), 50000); //timer resetten
        return false;
      }
      else {
        console.log('error auteurinput');
      }
    };

    splitWord (){
      split = readWord.split('');
      console.log('splitWord: ' + split);
      letters.push(split);
    };

    makeConnection() {
      socket = io.connect('/');
      socket.on('connect', () => {
        console.log(`Connected: ${socket.id}`);
      });
      socket.on('message', message => {
        console.log(`Received message: ${message}`);
        woordje = message;
        console.log(woordje);
        this.readInWord(woordje);
      });
      socket.on('messages', messages => {
        letters = letters.push(woordje);
        console.log(letters);
        messages = letters;
      });
      $msgForm.addEventListener('submit', e => this.handleSubmitMessage(e));
    };

    handleSubmitMessage = e => {
    e.preventDefault();
    socket.emit('message', $msgInput.value);
    socket.emit('messages', messages);
    $msgInput.value = '';
    }


  spawnLetters() {

    let fallPosition = Phaser.Math.Between(20, widthDivScreen / 2);

    for (let startOffLetters = 0; startOffLetters < letters.length; startOffLetters++)
    {
      console.log('spawnLetters: ' + letters[startOffLetters]);
      letters[startOffLetters] = this.matter.add.sprite(fallPosition, 0, letters[startOffLetters], 0, {restitution: .5});
      fallPosition = fallPosition + spacebetween;
    }
    console.log('start letters are dropped');
  };

       //indien een woord werd ingegeven word het woord ingelezen gesplits en erna gespawend
   readInWord (){
    readWord = woordje;
    if (readWord!= '') {
      console.log(readWord);
      this.splitWord(readWord);
      this.spawnWord();
      console.log(letters);
      //timer = setInterval(this.readInAuteurInput(), 50000); //timer resetten
    }
    else {
      console.log('niks ingegeven')
      e.preventDefault();
    }
  };
}
