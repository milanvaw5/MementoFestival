let letter;
let woordje;
//let backgroundimage;
let spawnWordInterval;
let lowercase;
let readWord = 'abcde';
let split = [];
let letters = [];
let hartjes = [];
let widthDivScreen = document.querySelector(`.bottomblock`).style.width;
let spacebetween = 60;
let isLive = false;
let $liveTitle = document.querySelector(`.live__footage__indication`);
let $liveSub = document.querySelector(`.live__footage__subindication`);
let $liveDot = document.querySelector(`.bol`);
const $btnSchud = document.querySelector(`.schud`);
const $btnHartje = document.querySelector(`.hartje`);


let jointPositionsGebruikers = {
  leftWristPos: {x:1, y:1},
  rightWristPos: {x:1, y:1},
  leftEyePos: {x:1, y:1},
  rightEyePos: {x:1, y:1},
  leftShoulderPos: {x:1, y:1},
  rightShoulderPos: {x:1, y:1},
  leftElbowPos: {x:1, y:1},
  rightElbowPos: {x:1, y:1},
  leftKneePos: {x:1, y:1},
  rightKneePos: {x:1, y:1},
  leftHipPos: {x:1, y:1},
  rightHipPos: {x:1, y:1},
  leftAnklePos: {x:1, y:1},
  rightAnklePos: {x:1, y:1}
}
let jointPositionsGebruikersTarget = {
  leftWristPosTarget: {x:1, y:1},
  rightWristPosTarget: {x:1, y:1},
  leftEyePosTarget: {x:1, y:1},
  rightEyePosTarget: {x:1, y:1},
  leftShoulderPosTarget: {x:1, y:1},
  rightShoulderPosTarget: {x:1, y:1},
  leftElbowPosTarget: {x:1, y:1},
  rightElbowPosTarget: {x:1, y:1},
  leftKneePosTarget: {x:1, y:1},
  rightKneePosTarget: {x:1, y:1},
  leftHipPosTarget: {x:1, y:1},
  rightHipPosTarget: {x:1, y:1},
  leftAnklePosTarget: {x:1, y:1},
  rightAnklePosTarget: {x:1, y:1}
}

/*
let auteurInput = ['Verloren','hinkel ik','over de sproeten op mijn vingers',
'Afgeslagen','langzaam ademend','langs mijn armen dwalend','Mijn rug','terug – gezucht –',
'geen bescherming op de vlucht','Veilig','aan mijn zij','de afgrond daar als lijn',
'Onontdekt','en zorgeloos','dolend door mijn eigen hoofd'];*/

let auteurInput = ['verloren','hinkelik','overdesproeten','opmijnvingers'];


const $wordForm = document.querySelector(`.wordForm`);
const $feelingsForm = document.querySelector(`.feelingsForm`);
const $challengeForm = document.querySelector(`.challengeForm`);
const $msgInput = document.getElementById('enteredWord');
const $feelingOptions = document.querySelectorAll(`.feelingOption`);


let socket; // will be assigned a value later
export default class VisitorScene extends Phaser.Scene {

  constructor(config){
    super(config);
  }

  preload(){
    console.log(`PRELOAD visitor`);
    //Preloading sprites

    //this.load.image('backgroundimage', 'assets/bimg.jpg');
    //this.load.image('d', 'assets/ball.png');
    this.load.image('test', 'assets/test.png');
    this.load.image('a', 'assets/img/alphabet/a.png');
    this.load.image('b', 'assets/img/alphabet/b.png');
    this.load.image('c', 'assets/img/alphabet/c.png');
    this.load.image('d', 'assets/img/alphabet/d.png');
    this.load.image('e', 'assets/img/alphabet/e.png');
    this.load.image('f', 'assets/img/alphabet/f.png');
    this.load.image('g', 'assets/img/alphabet/g.png');
    this.load.image('h', 'assets/img/alphabet/h.png');
    this.load.image('i', 'assets/img/alphabet/i.png');
    this.load.image('j', 'assets/img/alphabet/j.png');
    this.load.image('k', 'assets/img/alphabet/k.png');
    this.load.image('l', 'assets/img/alphabet/l.png');
    this.load.image('m', 'assets/img/alphabet/m.png');
    this.load.image('n', 'assets/img/alphabet/n.png');
    this.load.image('o', 'assets/img/alphabet/o.png');
    this.load.image('p', 'assets/img/alphabet/p.png');
    this.load.image('q', 'assets/img/alphabet/q.png');
    this.load.image('r', 'assets/img/alphabet/r.png');
    this.load.image('s', 'assets/img/alphabet/s.png');
    this.load.image('t', 'assets/img/alphabet/t.png');
    this.load.image('u', 'assets/img/alphabet/u.png');
    this.load.image('v', 'assets/img/alphabet/v.png');
    this.load.image('w', 'assets/img/alphabet/w.png');
    this.load.image('x', 'assets/img/alphabet/x.png');
    this.load.image('y', 'assets/img/alphabet/y.png');
    this.load.image('z', 'assets/img/alphabet/z.png');
    this.load.image('somber', 'assets/img/emotics/sadco.png');
    this.load.image('happy', 'assets/img/emotics/happyco.png');
    this.load.image('quirky', 'assets/img/emotics/quirkyco.png');
    this.load.image('tired', 'assets/img/emotics/tiredco.png');

  }

  create(){
    console.log(`CREATE`);

    this.cameras.main.setBackgroundColor('rgba(0, 0, 0, 0)');
    this.makeConnection();

    //this.initMap();
    //backgroundimage = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'backgroundimage');

    this.leftWristAvatar = this.matter.add.image(jointPositionsGebruikers.leftWristPos.x, jointPositionsGebruikers.leftWristPos.y, 'test', 0, {mass: 1000, inverseMass: 1000, ignoreGravity: false, density: 1});
    this.rightWristAvatar = this.matter.add.image(jointPositionsGebruikers.rightWristPos.x, jointPositionsGebruikers.rightWristPos.y, 'test', 0, {mass: 1000, inverseMass: 1000, ignoreGravity: false, density: 1});
    this.leftEyeAvatar = this.matter.add.image(jointPositionsGebruikers.leftEyePos.x, jointPositionsGebruikers.leftEyePos.y, 'test', 0, {mass: 1000, inverseMass: 1000, ignoreGravity: false, density: 1});
    this.rightEyeAvatar = this.matter.add.image(jointPositionsGebruikers.rightEyePos.x, jointPositionsGebruikers.rightEyePos.y, 'test', 0, {mass: 1000, inverseMass: 1000, ignoreGravity: false, density: 1});
    this.leftShoulderAvatar = this.matter.add.image(jointPositionsGebruikers.leftShoulderPos.x, jointPositionsGebruikers.leftShoulderPos.y, 'test', 0, {mass: 1000, inverseMass: 1000, ignoreGravity: false, density: 1});
    this.rightShoulderAvatar = this.matter.add.image(jointPositionsGebruikers.rightShoulderPos.x, jointPositionsGebruikers.rightShoulderPos.y, 'test', 0, {mass: 1000, inverseMass: 1000, ignoreGravity: false, density: 1});
    this.leftElbowAvatar = this.matter.add.image(jointPositionsGebruikers.leftElbowPos.x, jointPositionsGebruikers.leftElbowPos.y, 'test', 0, {mass: 1000, inverseMass: 1000, ignoreGravity: false, density: 1});
    this.rightElbowAvatar = this.matter.add.image(jointPositionsGebruikers.rightElbowPos.x, jointPositionsGebruikers.rightElbowPos.y, 'test', 0, {mass: 1000, inverseMass: 1000, ignoreGravity: false, density: 1});
    this.leftHipAvatar = this.matter.add.image(jointPositionsGebruikers.leftHipPos.x, jointPositionsGebruikers.leftHipPos.y, 'test', 0, {mass: 1000, inverseMass: 1000, ignoreGravity: false, density: 1});
    this.rightHipAvatar = this.matter.add.image(jointPositionsGebruikers.rightHipPos.x, jointPositionsGebruikers.rightHipPos.y, 'test', 0, {mass: 1000, inverseMass: 1000, ignoreGravity: false, density: 1});
    this.leftKneeAvatar = this.matter.add.image(jointPositionsGebruikers.leftKneePos.x, jointPositionsGebruikers.leftKneePos.y, 'test', 0, {mass: 1000, inverseMass: 1000, ignoreGravity: false, density: 1});
    this.rightKneeAvatar = this.matter.add.image(jointPositionsGebruikers.rightKneePos.x, jointPositionsGebruikers.rightKneePos.y, 'test', 0, {mass: 1000, inverseMass: 1000, ignoreGravity: false, density: 1});
    this.leftAnkleAvatar = this.matter.add.image(jointPositionsGebruikers.leftAnklePos.x, jointPositionsGebruikers.leftAnklePos.y, 'test', 0, {mass: 1000, inverseMass: 1000, ignoreGravity: false, density: 1});
    this.rightAnkleAvatar = this.matter.add.image(jointPositionsGebruikers.rightAnklePos.x, jointPositionsGebruikers.rightAnklePos.y, 'test', 0, {mass: 1000, inverseMass: 1000, ignoreGravity: false, density: 1});

    this.pointer = this.input.activePointer;
    this.input.mouse.onMouseWheel.preventDefault = false



    this.input.on('wheel', function(pointer, dx, dy, dz, event){ 
      console.log(event)
    });


    this.group1 = this.matter.world.nextGroup();
    this.group2 = this.matter.world.nextGroup(true);


    this.spawnLetters();
this.scale.on('resize', this.resize, this);
    //timer = setTimeout(this.readInAuteurInput(), 50000);
  }

  resize(){

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


    jointPositionsGebruikers.leftWristPos.x += ( jointPositionsGebruikersTarget.leftWristPosTarget.x - jointPositionsGebruikers.leftWristPos.x ) / 10;
    jointPositionsGebruikers.leftWristPos.y += ( jointPositionsGebruikersTarget.leftWristPosTarget.y - jointPositionsGebruikers.leftWristPos.y ) / 10;
    this.leftWristAvatar.x = jointPositionsGebruikers.leftWristPos.x;
    this.leftWristAvatar.y = jointPositionsGebruikers.leftWristPos.y;


    jointPositionsGebruikers.leftEyePos.x += ( jointPositionsGebruikersTarget.leftEyePosTarget.x - jointPositionsGebruikers.leftEyePos.x ) / 10;
    jointPositionsGebruikers.leftEyePos.y += ( jointPositionsGebruikersTarget.leftEyePosTarget.y - jointPositionsGebruikers.leftEyePos.y ) / 10;
    this.leftEyeAvatar.x = jointPositionsGebruikers.leftEyePos.x;
    this.leftEyeAvatar.y = jointPositionsGebruikers.leftEyePos.y;


    jointPositionsGebruikers.leftShoulderPos.x += ( jointPositionsGebruikersTarget.leftShoulderPosTarget.x - jointPositionsGebruikers.leftShoulderPos.x ) / 10;
    jointPositionsGebruikers.leftShoulderPos.y += ( jointPositionsGebruikersTarget.leftShoulderPosTarget.y - jointPositionsGebruikers.leftShoulderPos.y ) / 10;
    this.leftShoulderAvatar.x = jointPositionsGebruikers.leftShoulderPos.x;
    this.leftShoulderAvatar.y = jointPositionsGebruikers.leftShoulderPos.y;

    jointPositionsGebruikers.leftElbowPos.x += ( jointPositionsGebruikersTarget.leftElbowPosTarget.x - jointPositionsGebruikers.leftElbowPos.x ) / 10;
    jointPositionsGebruikers.leftElbowPos.y += ( jointPositionsGebruikersTarget.leftElbowPosTarget.y - jointPositionsGebruikers.leftElbowPos.y ) / 10;
    this.leftElbowAvatar.x = jointPositionsGebruikers.leftElbowPos.x;
    this.leftElbowAvatar.y = jointPositionsGebruikers.leftElbowPos.y;

    jointPositionsGebruikers.leftHipPos.x += ( jointPositionsGebruikersTarget.leftHipPosTarget.x - jointPositionsGebruikers.leftHipPos.x ) / 10;
    jointPositionsGebruikers.leftHipPos.y += ( jointPositionsGebruikersTarget.leftHipPosTarget.y - jointPositionsGebruikers.leftHipPos.y ) / 10;
    this.leftHipAvatar.x = jointPositionsGebruikers.leftHipPos.x;
    this.leftHipAvatar.y = jointPositionsGebruikers.leftHipPos.y;

    jointPositionsGebruikers.leftKneePos.x += ( jointPositionsGebruikersTarget.leftKneePosTarget.x - jointPositionsGebruikers.leftKneePos.x ) / 10;
    jointPositionsGebruikers.leftKneePos.y += ( jointPositionsGebruikersTarget.leftKneePosTarget.y - jointPositionsGebruikers.leftKneePos.y ) / 10;
    this.leftKneeAvatar.x = jointPositionsGebruikers.leftKneePos.x;
    this.leftKneeAvatar.y = jointPositionsGebruikers.leftKneePos.y;

    jointPositionsGebruikers.leftAnklePos.x += ( jointPositionsGebruikersTarget.leftAnklePosTarget.x - jointPositionsGebruikers.leftAnklePos.x ) / 10;
    jointPositionsGebruikers.leftAnklePos.y += ( jointPositionsGebruikersTarget.leftAnklePosTarget.y - jointPositionsGebruikers.leftAnklePos.y ) / 10;
    this.leftAnkleAvatar.x = jointPositionsGebruikers.leftAnklePos.x;
    this.leftAnkleAvatar.y = jointPositionsGebruikers.leftAnklePos.y;



    jointPositionsGebruikers.rightWristPos.x += ( jointPositionsGebruikersTarget.rightWristPosTarget.x - jointPositionsGebruikers.rightWristPos.x ) / 10;
    jointPositionsGebruikers.rightWristPos.y += ( jointPositionsGebruikersTarget.rightWristPosTarget.y - jointPositionsGebruikers.rightWristPos.y ) / 10;
    this.rightWristAvatar.x = jointPositionsGebruikers.rightWristPos.x;
    this.rightWristAvatar.y = jointPositionsGebruikers.rightWristPos.y;

    jointPositionsGebruikers.rightEyePos.x += ( jointPositionsGebruikersTarget.rightEyePosTarget.x - jointPositionsGebruikers.rightEyePos.x ) / 10;
    jointPositionsGebruikers.rightEyePos.y += ( jointPositionsGebruikersTarget.rightEyePosTarget.y - jointPositionsGebruikers.rightEyePos.y ) / 10;
    this.rightEyeAvatar.x = jointPositionsGebruikers.rightEyePos.x;
    this.rightEyeAvatar.y = jointPositionsGebruikers.rightEyePos.y;

    jointPositionsGebruikers.rightShoulderPos.x += ( jointPositionsGebruikersTarget.rightShoulderPosTarget.x - jointPositionsGebruikers.rightShoulderPos.x ) / 10;
    jointPositionsGebruikers.rightShoulderPos.y += ( jointPositionsGebruikersTarget.rightShoulderPosTarget.y - jointPositionsGebruikers.rightShoulderPos.y ) / 10;
    this.rightShoulderAvatar.x = jointPositionsGebruikers.rightShoulderPos.x;
    this.rightShoulderAvatar.y = jointPositionsGebruikers.rightShoulderPos.y;

    jointPositionsGebruikers.rightElbowPos.x += ( jointPositionsGebruikersTarget.rightElbowPosTarget.x - jointPositionsGebruikers.rightElbowPos.x ) / 10;
    jointPositionsGebruikers.rightElbowPos.y += ( jointPositionsGebruikersTarget.rightElbowPosTarget.y - jointPositionsGebruikers.rightElbowPos.y ) / 10;
    this.rightElbowAvatar.x = jointPositionsGebruikers.rightElbowPos.x;
    this.rightElbowAvatar.y = jointPositionsGebruikers.rightElbowPos.y;

    jointPositionsGebruikers.rightHipPos.x += ( jointPositionsGebruikersTarget.rightHipPosTarget.x - jointPositionsGebruikers.rightHipPos.x ) / 10;
    jointPositionsGebruikers.rightHipPos.y += ( jointPositionsGebruikersTarget.rightHipPosTarget.y - jointPositionsGebruikers.rightHipPos.y ) / 10;
    this.rightHipAvatar.x = jointPositionsGebruikers.rightHipPos.x;
    this.rightHipAvatar.y = jointPositionsGebruikers.rightHipPos.y;

    jointPositionsGebruikers.rightKneePos.x += ( jointPositionsGebruikersTarget.rightKneePosTarget.x - jointPositionsGebruikers.rightKneePos.x ) / 10;
    jointPositionsGebruikers.rightKneePos.y += ( jointPositionsGebruikersTarget.rightKneePosTarget.y - jointPositionsGebruikers.rightKneePos.y ) / 10;
    this.rightKneeAvatar.x = jointPositionsGebruikers.rightKneePos.x;
    this.rightKneeAvatar.y = jointPositionsGebruikers.rightKneePos.y;

    jointPositionsGebruikers.rightAnklePos.x += ( jointPositionsGebruikersTarget.rightAnklePosTarget.x - jointPositionsGebruikers.rightAnklePos.x ) / 10;
    jointPositionsGebruikers.rightAnklePos.y += ( jointPositionsGebruikersTarget.rightAnklePosTarget.y - jointPositionsGebruikers.rightAnklePos.y ) / 10;
    this.rightAnkleAvatar.x = jointPositionsGebruikers.rightAnklePos.x;
    this.rightAnkleAvatar.y = jointPositionsGebruikers.rightAnklePos.y;


    if(isLive){
      if($liveTitle.textContent === 'live'){

      }else{
        $liveTitle.textContent = 'live';
        $liveSub.textContent = 'op het festival';
        $liveDot.style.display = 'block';
      }
   
    }else{
      $liveTitle.textContent = 'offline';
      $liveSub.textContent = 'tot later';
      $liveDot.style.display = 'none';
    }
  };


  //woord word gespawned op scherm
  spawnWord() {

    let fallPosition = Phaser.Math.Between(60, widthDivScreen / 4);
    this.splitWord();

    for (letter = 0; letter < split.length; letter++)
    {


      console.log('spawnWord: ' + split[letter]);
      const l = this.matter.add.sprite(fallPosition, 0,  split[letter], 0, {restitution: .5});

      l.setInteractive({useHandCursor: true}).on('pointerdown', () => this.onClick(l));
     
      l.setCollisionGroup(this.group1)
     // l.setCollidesWith(0)
 
      fallPosition = fallPosition + spacebetween;

      letters.push(l);
      //console.log(letters);
    }

  };

  onClick(l){
    console.log(l.texture.key);

  }

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
      lowercase = readWord.toLowerCase();
      lowercase = lowercase.replace(/\s/g, '');
      split = lowercase.split('');
      console.log('splitWord: ' + split);
    //  letters.push(split);
    };



    makeConnection() {
      socket = io.connect('/');
      socket.on('connect', () => {
        console.log(`Connected: ${socket.id}`);
        socket.emit('requestWords');
      });
      socket.on('getWords', words => {
        words.forEach(word => {
          woordje = word;
          this.readInWord();
        })
      });
      socket.on('message', message => {
        console.log(`Received message: ${message}`);
        woordje = message;
        this.readInWord();

      });
      socket.on('live', () => {

        isLive = true;

      });
      socket.on('notLive', () => {

        isLive = false;

      });
      socket.on('shakeAll', () => {
  
        letters.forEach(letter => {
          letter.setVelocity(20, 30)
        })

      });
      socket.on('selectedFeeling', selectedFeeling => {
        console.log(selectedFeeling)
        let fallPosition = Phaser.Math.Between(20, this.cameras.main.width);
        switch(selectedFeeling){
          case "somber": this.feeling = this.matter.add.sprite(fallPosition, 0, 'somber', 0, {restitution: .5});break;
          case "giechelig": this.feeling = this.matter.add.sprite(fallPosition, 0, 'quirky', 0, {restitution: .5});break;
          case "gelukzalig": this.feeling = this.matter.add.sprite(fallPosition, 0, 'happy', 0, {restitution: .5});break;
          case "afgemat": this.feeling = this.matter.add.sprite(fallPosition, 0, 'tired', 0, {restitution: .5});break;

        }

      });
      socket.on('points', jointPositions => {

        jointPositionsGebruikersTarget.leftEyePosTarget.x = this.cameras.main.width * jointPositions.leftEyePos.x;
        jointPositionsGebruikersTarget.leftEyePosTarget.y = this.cameras.main.height * jointPositions.leftEyePos.y;

        jointPositionsGebruikersTarget.rightEyePosTarget.x =  this.cameras.main.width * jointPositions.rightEyePos.x;
        jointPositionsGebruikersTarget.rightEyePosTarget.y = this.cameras.main.height * jointPositions.rightEyePos.y;

        jointPositionsGebruikersTarget.leftWristPosTarget.x = this.cameras.main.width * jointPositions.leftWristPos.x;
        jointPositionsGebruikersTarget.leftWristPosTarget.y = this.cameras.main.height * jointPositions.leftWristPos.y;

        jointPositionsGebruikersTarget.rightWristPosTarget.x =  this.cameras.main.width * jointPositions.rightWristPos.x;
        jointPositionsGebruikersTarget.rightWristPosTarget.y = this.cameras.main.height * jointPositions.rightWristPos.y;


        jointPositionsGebruikersTarget.leftShoulderPosTarget.x = this.cameras.main.width * jointPositions.leftShoulderPos.x;
        jointPositionsGebruikersTarget.leftShoulderPosTarget.y = this.cameras.main.height * jointPositions.leftShoulderPos.y;

        jointPositionsGebruikersTarget.rightShoulderPosTarget.x =  this.cameras.main.width * jointPositions.rightShoulderPos.x;
        jointPositionsGebruikersTarget.rightShoulderPosTarget.y = this.cameras.main.height * jointPositions.rightShoulderPos.y;


        jointPositionsGebruikersTarget.leftElbowPosTarget.x = this.cameras.main.width * jointPositions.leftElbowPos.x;
        jointPositionsGebruikersTarget.leftElbowPosTarget.y = this.cameras.main.height * jointPositions.leftElbowPos.y;

        jointPositionsGebruikersTarget.rightElbowPosTarget.x =  this.cameras.main.width * jointPositions.rightElbowPos.x;
        jointPositionsGebruikersTarget.rightElbowPosTarget.y = this.cameras.main.height * jointPositions.rightElbowPos.y;


        jointPositionsGebruikersTarget.leftHipPosTarget.x = this.cameras.main.width * jointPositions.leftHipPos.x;
        jointPositionsGebruikersTarget.leftHipPosTarget.y = this.cameras.main.height * jointPositions.leftHipPos.y;

        jointPositionsGebruikersTarget.rightHipPosTarget.x =  this.cameras.main.width * jointPositions.rightHipPos.x;
        jointPositionsGebruikersTarget.rightHipPosTarget.y = this.cameras.main.height * jointPositions.rightHipPos.y;


        jointPositionsGebruikersTarget.leftKneePosTarget.x = this.cameras.main.width * jointPositions.leftKneePos.x;
        jointPositionsGebruikersTarget.leftKneePosTarget.y = this.cameras.main.height * jointPositions.leftKneePos.y;

        jointPositionsGebruikersTarget.rightKneePosTarget.x =  this.cameras.main.width * jointPositions.rightKneePos.x;
        jointPositionsGebruikersTarget.rightKneePosTarget.y = this.cameras.main.height * jointPositions.rightKneePos.y;


        jointPositionsGebruikersTarget.leftAnklePosTarget.x = this.cameras.main.width * jointPositions.leftAnklePos.x;
        jointPositionsGebruikersTarget.leftAnklePosTarget.y = this.cameras.main.height * jointPositions.leftAnklePos.y;

        jointPositionsGebruikersTarget.rightAnklePosTarget.x =  this.cameras.main.width * jointPositions.rightAnklePos.x;
        jointPositionsGebruikersTarget.rightAnklePosTarget.y = this.cameras.main.height * jointPositions.rightAnklePos.y;
      });

      if($wordForm){
        $wordForm.addEventListener('submit', e => this.handleSubmitMessage(e));
      }
      if($feelingsForm){
        $feelingsForm.addEventListener('submit', e => this.handleSubmitFeeling(e));
      }
      if($btnSchud){
        $btnSchud.addEventListener('click', e => this.handleClickSchud(e));
      }
      if($btnHartje){
        $btnHartje.addEventListener('click', e => this.handleClickHartje(e));
      }

    };

    handleSubmitMessage = e => {
       e.preventDefault();
       socket.emit('message', $msgInput.value);
       //socket.emit('messages', messages);
       //socket.emit('points', points);
       $msgInput.value = '';
    }
    handleSubmitFeeling = e => {
      e.preventDefault();
      console.log("clickede")
      let selectedFeeling;
      $feelingOptions.forEach(option => {
        if(option.checked){
          selectedFeeling = option.value;
        }
      });
      socket.emit('feeling', selectedFeeling);
   }

   handleClickSchud = e => {
    socket.emit('schud');
    console.log('schud')
    console.log(letters)
   
   
   }

   handleClickHartje = e => {
    socket.emit('hartje');
    console.log('hartje')
    const hartje = this.matter.add.sprite(200, this.cameras.main.height, 'tired', 0, {restitution: .5, ignoreGravity: true});
    hartje.setCollisionGroup(this.group2)
    hartje.setCollidesWith(0)
    hartje.setVelocityY(-20);
    hartjes.push(hartje);
    console.log(this.group1)
    console.log(this.group2)
   
   }


  spawnLetters() {

    let fallPosition = Phaser.Math.Between(20, widthDivScreen / 2);

    for (let startOffLetters = 0; startOffLetters < letters.length; startOffLetters++)
    {
      console.log('spawnLetters: ' + letters[startOffLetters]);
      letters[startOffLetters] = this.matter.add.sprite(fallPosition, 0, letters[startOffLetters], 0, {restitution: .5});



      fallPosition = fallPosition + spacebetween;
      console.log(fallPosition);
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
      console.log('niks ingegeven');

    }
  };
/*
   // Initialize and add the map
   initMap() {
    // The location of Uluru
    const uluru = { lat: 50.829, lng: 3.271 };
    // The map, centered at Uluru
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 4,
      center: uluru,
    });
    // The marker, positioned at Uluru
    const marker = new google.maps.Marker({
      position: uluru,
      map: map,
    });
  }
*/

}
