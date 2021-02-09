let letter;
//let backgroundimage;
let spawnWordInterval;
let lowercase;
let fpsFactor = 5;
let readWord;
let split = [];
let words = [];
let letters = [];
let feelings = [];
let hartjes = [];
let highfiveCount = 0;
let heartCount = 0;
let widthDivScreen ;
if(document.querySelector('.adminWordGame')){
  widthDivScreen = document.querySelector('.adminWordGame').style.width;
}
let spacebetween = 200;
let socket; // will be assigned a value later
let percentageX;
let percentageY;
let handShakeId;
/*
let auteurInput = ['Verloren','hinkel ik','over de sproeten op mijn vingers',
'Afgeslagen','langzaam ademend','langs mijn armen dwalend','Mijn rug','terug – gezucht –',
'geen bescherming op de vlucht','Veilig','aan mijn zij','de afgrond daar als lijn',
'Onontdekt','en zorgeloos','dolend door mijn eigen hoofd'];*/

let auteurInput = ['verloren','hinkelik','overdesproeten','opmijnvingers'];

let jointPositionsWebcamPercentage = {
  nosePos: {x:1, y:1},
  leftEyePos: {x:1, y:1},
  leftWristPos: {x:1, y:1},
  rightWristPos: {x:1, y:1},
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

let jointPositionsTenserflow = {
  nosePos: {x:1, y:1},
  leftEyePos: {x:1, y:1},
  leftWristPos: {x:1, y:1},
  rightWristPos: {x:1, y:1},
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

let jointPositions = {
  nosePos: {x:1, y:1},
  leftEyePos: {x:1, y:1},
  leftWristPos: {x:1, y:1},
  rightWristPos: {x:1, y:1},
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

let jointPositionsTarget = {
  nosePosTarget: {x:1, y:1},
  leftEyePosTarget: {x:1, y:1},
  leftWristPosTarget: {x:1, y:1},
  rightWristPosTarget: {x:1, y:1},
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
const videoWidth = 1280;
const videoHeight = 760;

{


  // We create an object with the parameters that we want for the model.
  let poseNetModel;

const poseNetState = {
  algorithm: 'single-pose',
  input: {
    architecture: 'MobileNetV1',
    outputStride: 16,
    inputResolution: 513,
    multiplier: 0.75,
    quantBytes: 2
  },
  singlePoseDetection: {
    minPoseConfidence: 0.1,
    minPartConfidence: 0.5,
  },
  output: {
    showVideo: true,
    showPoints: true,
  },
};


const detectPoseInRealTime = (video) => {
  const canvas = document.getElementById('output');

  const flipPoseHorizontal = true;



  async function poseDetectionFrame() {
    let poses = [];
    let minPoseConfidence;
    let minPartConfidence;

    switch (poseNetState.algorithm) {
      case 'single-pose':
        const pose = await poseNetModel.estimatePoses(video, {
          flipHorizontal: flipPoseHorizontal,
          decodingMethod: 'single-person'
        });
        poses = poses.concat(pose);
        minPoseConfidence = +poseNetState.singlePoseDetection.minPoseConfidence;
        minPartConfidence = +poseNetState.singlePoseDetection.minPartConfidence;
        break;
    }



    poses.forEach(({score, keypoints}) => {
      if (score >= minPoseConfidence) {
        if (poseNetState.output.showPoints) {
          drawKeypoints(keypoints, minPartConfidence);
        }
      }
    });
    requestAnimationFrame(poseDetectionFrame);
  }

  poseDetectionFrame();
}
// wordt ook met browserrefresh gedaan 60fps
function drawKeypoints(keypoints, minConfidence, scale = 1) {

  let nose = keypoints.find(point => point.part === 'nose');
  let leftEye = keypoints.find(point => point.part === 'leftEye');
  let leftWrist = keypoints.find(point => point.part === 'leftWrist');
  let rightWrist = keypoints.find(point => point.part === 'rightWrist');
  let leftShoulder = keypoints.find(point => point.part === 'leftShoulder');
  let rightShoulder = keypoints.find(point => point.part === 'rightShoulder');
  let leftElbow = keypoints.find(point => point.part === 'leftElbow');
  let rightElbow = keypoints.find(point => point.part === 'rightElbow');
  let leftHip = keypoints.find(point => point.part === 'leftHip');
  let rightHip = keypoints.find(point => point.part === 'rightHip');
  let leftKnee = keypoints.find(point => point.part === 'leftKnee');
  let rightKnee = keypoints.find(point => point.part === 'rightKnee');
  let leftAnkle = keypoints.find(point => point.part === 'leftAnkle');
  let rightAnkle = keypoints.find(point => point.part === 'rightAnkle');




  if (nose.score > minConfidence) {
    jointPositionsTenserflow.nosePos = nose.position;
}

  if (leftWrist.score > minConfidence) {
      jointPositionsTenserflow.leftWristPos = leftWrist.position;
  }

  if (rightWrist.score > minConfidence) {
      jointPositionsTenserflow.rightWristPos = rightWrist.position;
  }
/*
  if (rightEye.score > minConfidence) {
    jointPositionsTenserflow.rightEyePos = rightEye.position;
  }
*/
  if (leftEye.score > minConfidence) {
     jointPositionsTenserflow.leftEyePos = leftEye.position;
  }

  if (leftShoulder.score > minConfidence) {
    jointPositionsTenserflow.leftShoulderPos = leftShoulder.position;
  }

  if (rightShoulder.score > minConfidence) {
    jointPositionsTenserflow.rightShoulderPos = rightShoulder.position;
  }

  if (leftElbow.score > minConfidence) {
    jointPositionsTenserflow.leftElbowPos = leftElbow.position;
  }

  if (rightElbow.score > minConfidence) {
    jointPositionsTenserflow.rightElbowPos = rightElbow.position;
  }

  if (leftHip.score > minConfidence) {
    jointPositionsTenserflow.leftHipPos = leftHip.position;
  }

  if (rightHip.score > minConfidence) {
    jointPositionsTenserflow.rightHipPos = rightHip.position;
  }
  if (leftKnee.score > minConfidence) {
    jointPositionsTenserflow.leftKneePos = leftKnee.position;
  }

  if (rightKnee.score > minConfidence) {
    jointPositionsTenserflow.rightKneePos = rightKnee.position;
  }

  if (leftAnkle.score > minConfidence) {
    jointPositionsTenserflow.leftAnklePos = leftAnkle.position;
  }

  if (rightAnkle.score > minConfidence) {
    jointPositionsTenserflow.rightAnklePos = rightAnkle.position;
  }
}


const setupCamera = async () => {
  const video = document.getElementById('video');
  video.width = videoWidth;
  video.height = videoHeight;

  const stream = await navigator.mediaDevices.getUserMedia({
    'audio': false,
    'video': {
      width: videoWidth,
      height: videoHeight,
    },
  });
  video.srcObject = stream;

  return new Promise((resolve) => {
    video.onloadedmetadata = () => resolve(video);
  });
}

const startVideo = async () => {
 let video;
  try {
    video = await setupCamera();
    video.play();

  } catch (e) {
    throw e;
  }
  detectPoseInRealTime(video);
}

const init = async () => {
   poseNetModel = await posenet.load({
      architecture: poseNetState.input.architecture,
      outputStride: poseNetState.input.outputStride,
      inputResolution: poseNetState.input.inputResolution,
      multiplier: poseNetState.input.multiplier,
      quantBytes: poseNetState.input.quantBytes
  });

    startVideo();


  }
  if(window.location.pathname === "/index.html" || window.location.pathname === "/"){
    init();
  }

}


export default class AdminScene extends Phaser.Scene {

  constructor(config){
    super(config);
  }

  preload(){
    console.log(`PRELOAD admin`);

    this.load.image('test', 'assets/test.png');

    this.load.image('head', 'assets/img/avatar/avatarGreen/x1/headGreen.png');
    this.load.image('footLeft', 'assets/img/avatar/avatarGreen/x1/footLeftGreen.png');
    this.load.image('footRight', 'assets/img/avatar/avatarGreen/x1/footRightGreen.png');
    this.load.image('handLeft', 'assets/img/avatar/avatarGreen/x1/handLeftGreen.png');
    this.load.image('handRight', 'assets/img/avatar/avatarGreen/x1/handRightGreen.png');
    this.load.image('knee', 'assets/img/avatar/avatarGreen/x1/kneeGreen.png');
    this.load.image('joint', 'assets/img/avatar/avatarGreen/x1/schijfGroen.png');


    this.load.image('a', 'assets/img/alphabet/x0.5/a.png');
    this.load.image('b', 'assets/img/alphabet/x0.5/b.png');
    this.load.image('c', 'assets/img/alphabet/x0.5/c.png');
    this.load.image('d', 'assets/img/alphabet/x0.5/d.png');
    this.load.image('e', 'assets/img/alphabet/x0.5/e.png');
    this.load.image('f', 'assets/img/alphabet/x0.5/f.png');
    this.load.image('g', 'assets/img/alphabet/x0.5/g.png');
    this.load.image('h', 'assets/img/alphabet/x0.5/h.png');
    this.load.image('i', 'assets/img/alphabet/x0.5/i.png');
    this.load.image('j', 'assets/img/alphabet/x0.5/j.png');
    this.load.image('k', 'assets/img/alphabet/x0.5/k.png');
    this.load.image('l', 'assets/img/alphabet/x0.5/l.png');
    this.load.image('m', 'assets/img/alphabet/x0.5/m.png');
    this.load.image('n', 'assets/img/alphabet/x0.5/n.png');
    this.load.image('o', 'assets/img/alphabet/x0.5/o.png');
    this.load.image('p', 'assets/img/alphabet/x0.5/p.png');
    this.load.image('q', 'assets/img/alphabet/x0.5/q.png');
    this.load.image('r', 'assets/img/alphabet/x0.5/r.png');
    this.load.image('s', 'assets/img/alphabet/x0.5/s.png');
    this.load.image('t', 'assets/img/alphabet/x0.5/t.png');
    this.load.image('u', 'assets/img/alphabet/x0.5/u.png');
    this.load.image('v', 'assets/img/alphabet/x0.5/v.png');
    this.load.image('w', 'assets/img/alphabet/x0.5/w.png');
    this.load.image('x', 'assets/img/alphabet/x0.5/x.png');
    this.load.image('y', 'assets/img/alphabet/x0.5/y.png');
    this.load.image('z', 'assets/img/alphabet/x0.5/z.png');

    this.load.image('somber0', 'assets/img/letterdoos/grumpySmiley/x1/grumpyBlue.png');
    this.load.image('somber1', 'assets/img/letterdoos/grumpySmiley/x1/grumpyDark.png');
    this.load.image('somber2', 'assets/img/letterdoos/grumpySmiley/x1/grumpyGreen.png');
    this.load.image('somber3', 'assets/img/letterdoos/grumpySmiley/x1/grumpyOrange.png');
    this.load.image('somber4', 'assets/img/letterdoos/grumpySmiley/x1/grumpyYellow.png');

    this.load.image('happy0', 'assets/img/letterdoos/smilingSmiley/x1/smilingBlue.png');
    this.load.image('happy1', 'assets/img/letterdoos/smilingSmiley/x1/smilingDark.png');
    this.load.image('happy2', 'assets/img/letterdoos/smilingSmiley/x1/smilingGreen.png');
    this.load.image('happy3', 'assets/img/letterdoos/smilingSmiley/x1/smilingOrange.png');
    this.load.image('happy4', 'assets/img/letterdoos/smilingSmiley/x1/smilingYellow.png');

    this.load.image('quirky0', 'assets/img/letterdoos/smirkingSmiley/x1/smirkingBlue.png');
    this.load.image('quirky1', 'assets/img/letterdoos/smirkingSmiley/x1/smirkingDark.png');
    this.load.image('quirky2', 'assets/img/letterdoos/smirkingSmiley/x1/smirkingGreen.png');
    this.load.image('quirky3', 'assets/img/letterdoos/smirkingSmiley/x1/smirkingOrange.png');
    this.load.image('quirky4', 'assets/img/letterdoos/smirkingSmiley/x1/smirkingYellow.png');

    this.load.image('tired0', 'assets/img/letterdoos/snoringSmiley/x1/snoringBlue.png');
    this.load.image('tired1', 'assets/img/letterdoos/snoringSmiley/x1/snoringDark.png');
    this.load.image('tired2', 'assets/img/letterdoos/snoringSmiley/x1/snoringGreen.png');
    this.load.image('tired3', 'assets/img/letterdoos/snoringSmiley/x1/snoringOrange.png');
    this.load.image('tired4', 'assets/img/letterdoos/snoringSmiley/x1/snoringYellow.png');


    this.load.image('hand', 'assets/img/letterdoos/hand/x1/handDark.png');
    this.load.image('heart', 'assets/img/letterdoos/heart/hart.png');


  }

  create(){
    console.log(`CREATE`);

    this.makeConnectionAdmin();
    //backgroundimage = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'backgroundimage');

   // this.noseAvatar = this.matter.add.image(jointPositions.nosePos.x, jointPositions.nosePos.y, 'head', 0, {mass: 1000, inverseMass: 1000, isStatic: true, ignoreGravity: false, density: 1});
    this.leftEyeAvatar = this.matter.add.image(jointPositions.leftEyePos.x, jointPositions.leftEyePos.y, 'head', 0, {mass: 1000, inverseMass: 1000, isStatic: true, ignoreGravity: false, density: 1});

    this.leftWristAvatar = this.matter.add.image(jointPositions.leftWristPos.x, jointPositions.leftWristPos.y, 'handLeft', 0, {mass: 1000, inverseMass: 1000, isStatic: true, ignoreGravity: false, density: 1});
    this.rightWristAvatar = this.matter.add.image(jointPositions.rightWristPos.x, jointPositions.rightWristPos.y, 'handRight', 0, {mass: 1000, inverseMass: 1000, isStatic: true, ignoreGravity: false, density: 1});
    this.leftShoulderAvatar = this.matter.add.image(jointPositions.leftShoulderPos.x, jointPositions.leftShoulderPos.y, 'joint', 0, {mass: 1000, inverseMass: 1000, isStatic: true, ignoreGravity: false, density: 1});
    this.rightShoulderAvatar = this.matter.add.image(jointPositions.rightShoulderPos.x, jointPositions.rightShoulderPos.y, 'joint', 0, {mass: 1000, inverseMass: 1000, isStatic: true, ignoreGravity: false, density: 1});
    this.leftElbowAvatar = this.matter.add.image(jointPositions.leftElbowPos.x, jointPositions.leftElbowPos.y, 'joint', 0, {mass: 1000, inverseMass: 1000, isStatic: true,ignoreGravity: false, density: 1});
    this.rightElbowAvatar = this.matter.add.image(jointPositions.rightElbowPos.x, jointPositions.rightElbowPos.y, 'joint', 0, {mass: 1000, inverseMass: 1000, isStatic: true, ignoreGravity: false, density: 1});
    this.leftHipAvatar = this.matter.add.image(jointPositions.leftHipPos.x, jointPositions.leftHipPos.y, 'joint', 0, {mass: 1000, inverseMass: 1000, isStatic: true, ignoreGravity: false, density: 1});
    this.rightHipAvatar = this.matter.add.image(jointPositions.rightHipPos.x, jointPositions.rightHipPos.y, 'joint', 0, {mass: 1000, inverseMass: 1000, isStatic: true, ignoreGravity: false, density: 1});
    this.leftKneeAvatar = this.matter.add.image(jointPositions.leftKneePos.x, jointPositions.leftKneePos.y, 'knee', 0, {mass: 1000, inverseMass: 1000, isStatic: true, ignoreGravity: false, density: 1});
    this.rightKneeAvatar = this.matter.add.image(jointPositions.rightKneePos.x, jointPositions.rightKneePos.y, 'knee', 0, {mass: 1000, inverseMass: 1000, isStatic: true, ignoreGravity: false, density: 1});
    this.leftAnkleAvatar = this.matter.add.image(jointPositions.leftAnklePos.x, jointPositions.leftAnklePos.y, 'footLeft', 0, {mass: 1000, inverseMass: 1000, isStatic: true, ignoreGravity: false, density: 1});
    this.rightAnkleAvatar = this.matter.add.image(jointPositions.rightAnklePos.x, jointPositions.rightAnklePos.y, 'footRight', 0, {mass: 1000, inverseMass: 1000, isStatic: true, ignoreGravity: false, density: 1});
    this.polygon = new Phaser.Geom.Polygon([{x:100, y:100}, {x: 200, y: 200}, {x: 200, y: 400}, {x: 100, y: 500}]);
    this.graphics = this.add.graphics({ fillStyle: { color: 0x32b099 } });
    this.group1 = this.matter.world.nextGroup();
    this.group2 = this.matter.world.nextGroup(true);

  

    this.spawnLetters();
    // emit only 10 times per second
    this.time.addEvent({ delay: 100, callback: this.onEvent, callbackScope: this, loop: true });

    this.matter.world.on('collisionstart', function (event, bodyA, bodyB) {
      //console.log(bodyA.texture.key);

      if (event.pairs[0].bodyA.gameObject){
        if(bodyA.gameObject.texture.key === "handLeft"){
          if(bodyB.gameObject.texture.key === "hand"){
            console.log(bodyA.gameObject.texture.key);
            //bodyB.gameObject.visible = false;
            //bodyB.gameObject.opacity = 0;
            bodyB.gameObject.destroy();
            this.matter.world.remove(bodyB);
            console.log(bodyB)
            socket.emit('handShake', handShakeId);

          }

        }
        if(bodyA.gameObject.texture.key === "hand"){
          if(bodyB.gameObject.texture.key === "handLeft"){
            console.log(bodyA.gameObject.texture.key);
            this.matter.world.remove(bodyA);

          }

        }

        if(bodyA.gameObject.texture.key === "hand"){
          if(bodyB.gameObject.texture.key === "handRight"){
            console.log(bodyA.gameObject.texture.key);
            this.matter.world.remove(bodyA);

          }

        }

        if(bodyA.gameObject.texture.key === "handRight"){
          if(bodyB.gameObject.texture.key === "hand"){
            console.log(bodyA.gameObject.texture.key);
            //bodyB.gameObject.visible = false;
            //bodyB.gameObject.opacity = 0;
            bodyB.gameObject.destroy();
            this.matter.world.remove(bodyB);
            console.log(bodyB)
            socket.emit('handShake', handShakeId);

          }

        }


      }

  }, this);
  }

  onEvent(){
   //socket.emit('points', jointPositions);
    socket.emit('points', jointPositionsWebcamPercentage);
  }

  update(){
    //bij een bepaald aantal letters op het scherm - zullen er een hoeveelheid verdwijnen,
    //random gekozen om zo nieuwe woorden en mysterie te creëren
    if (letters.length >= 250) {
      for (let numberOfRemoveletters = 10; numberOfRemoveletters>0; numberOfRemoveletters--){
        for(let removeletters = letters.length-1; removeletters >= 0; removeletters--){
          array.splice(Math.floor(Math.random()*removeletters.length), 1);
        }
      }
    }


  // this.calcPercentage();
/*
  jointPositionsWebcamPercentage.nosePos.x = (jointPositionsTenserflow.nosePos.x / videoWidth);
  jointPositionsWebcamPercentage.nosePos.y = (jointPositionsTenserflow.nosePos.y / videoHeight);
  jointPositionsTarget.nosePosTarget.x = (this.cameras.main.width * jointPositionsWebcamPercentage.nosePos.x);
  jointPositionsTarget.nosePosTarget.y = (this.cameras.main.height * jointPositionsWebcamPercentage.nosePos.y);
  jointPositions.nosePos.x += ( jointPositionsTarget.nosePosTarget.x - jointPositions.nosePos.x ) / fpsFactor;
  jointPositions.nosePos.y += ( jointPositionsTarget.nosePosTarget.y - jointPositions.nosePos.y ) / fpsFactor;
  this.noseAvatar.x = jointPositions.nosePos.x;
  this.noseAvatar.y = jointPositions.nosePos.y;
  */

  jointPositionsWebcamPercentage.leftEyePos.x = (jointPositionsTenserflow.leftEyePos.x / videoWidth);
  jointPositionsWebcamPercentage.leftEyePos.y = (jointPositionsTenserflow.leftEyePos.y / videoHeight);
  jointPositionsTarget.leftEyePosTarget.x = (this.cameras.main.width * jointPositionsWebcamPercentage.leftEyePos.x);
  jointPositionsTarget.leftEyePosTarget.y = (this.cameras.main.height * jointPositionsWebcamPercentage.leftEyePos.y);
  jointPositions.leftEyePos.x += ( jointPositionsTarget.leftEyePosTarget.x - jointPositions.leftEyePos.x ) / fpsFactor;
  jointPositions.leftEyePos.y += ( jointPositionsTarget.leftEyePosTarget.y - jointPositions.leftEyePos.y ) / fpsFactor;
  this.leftEyeAvatar.x = jointPositions.leftEyePos.x + 10;
  this.leftEyeAvatar.y = jointPositions.leftEyePos.y;

    jointPositionsWebcamPercentage.leftWristPos.x = (jointPositionsTenserflow.leftWristPos.x / videoWidth);
    jointPositionsWebcamPercentage.leftWristPos.y = (jointPositionsTenserflow.leftWristPos.y / videoHeight);
    jointPositionsTarget.leftWristPosTarget.x = (this.cameras.main.width * jointPositionsWebcamPercentage.leftWristPos.x);
    jointPositionsTarget.leftWristPosTarget.y = (this.cameras.main.height * jointPositionsWebcamPercentage.leftWristPos.y);
    jointPositions.leftWristPos.x += ( jointPositionsTarget.leftWristPosTarget.x - jointPositions.leftWristPos.x ) / fpsFactor;
    jointPositions.leftWristPos.y += ( jointPositionsTarget.leftWristPosTarget.y - jointPositions.leftWristPos.y ) / fpsFactor;
    this.leftWristAvatar.x = jointPositions.leftWristPos.x;
    this.leftWristAvatar.y = jointPositions.leftWristPos.y;

    jointPositionsWebcamPercentage.leftShoulderPos.x = (jointPositionsTenserflow.leftShoulderPos.x / videoWidth);
    jointPositionsWebcamPercentage.leftShoulderPos.y = (jointPositionsTenserflow.leftShoulderPos.y / videoHeight);
    jointPositionsTarget.leftShoulderPosTarget.x = (this.cameras.main.width * jointPositionsWebcamPercentage.leftShoulderPos.x);
    jointPositionsTarget.leftShoulderPosTarget.y = (this.cameras.main.height * jointPositionsWebcamPercentage.leftShoulderPos.y);
    jointPositions.leftShoulderPos.x += ( jointPositionsTarget.leftShoulderPosTarget.x - jointPositions.leftShoulderPos.x ) / fpsFactor;
    jointPositions.leftShoulderPos.y += ( jointPositionsTarget.leftShoulderPosTarget.y - jointPositions.leftShoulderPos.y ) / fpsFactor;
    this.leftShoulderAvatar.x = jointPositions.leftShoulderPos.x;
    this.leftShoulderAvatar.y = jointPositions.leftShoulderPos.y;

    jointPositionsWebcamPercentage.leftElbowPos.x = (jointPositionsTenserflow.leftElbowPos.x / videoWidth);
    jointPositionsWebcamPercentage.leftElbowPos.y = (jointPositionsTenserflow.leftElbowPos.y / videoHeight);
    jointPositionsTarget.leftElbowPosTarget.x = (this.cameras.main.width * jointPositionsWebcamPercentage.leftElbowPos.x);
    jointPositionsTarget.leftElbowPosTarget.y = (this.cameras.main.height * jointPositionsWebcamPercentage.leftElbowPos.y);
    jointPositions.leftElbowPos.x += ( jointPositionsTarget.leftElbowPosTarget.x - jointPositions.leftElbowPos.x ) / fpsFactor;
    jointPositions.leftElbowPos.y += ( jointPositionsTarget.leftElbowPosTarget.y - jointPositions.leftElbowPos.y ) / fpsFactor;
    this.leftElbowAvatar.x = jointPositions.leftElbowPos.x;
    this.leftElbowAvatar.y = jointPositions.leftElbowPos.y;


    jointPositionsWebcamPercentage.leftHipPos.x = (jointPositionsTenserflow.leftHipPos.x / videoWidth);
    jointPositionsWebcamPercentage.leftHipPos.y = (jointPositionsTenserflow.leftHipPos.y / videoHeight);
    jointPositionsTarget.leftHipPosTarget.x = (this.cameras.main.width * jointPositionsWebcamPercentage.leftHipPos.x);
    jointPositionsTarget.leftHipPosTarget.y = (this.cameras.main.height * jointPositionsWebcamPercentage.leftHipPos.y);
    jointPositions.leftHipPos.x += ( jointPositionsTarget.leftHipPosTarget.x - jointPositions.leftHipPos.x ) / fpsFactor;
    jointPositions.leftHipPos.y += ( jointPositionsTarget.leftHipPosTarget.y - jointPositions.leftHipPos.y ) / fpsFactor;
    this.leftHipAvatar.x = jointPositions.leftHipPos.x;
    this.leftHipAvatar.y = jointPositions.leftHipPos.y;

    jointPositionsWebcamPercentage.leftKneePos.x = (jointPositionsTenserflow.leftKneePos.x / videoWidth);
    jointPositionsWebcamPercentage.leftKneePos.y = (jointPositionsTenserflow.leftKneePos.y / videoHeight);
    jointPositionsTarget.leftKneePosTarget.x = (this.cameras.main.width * jointPositionsWebcamPercentage.leftKneePos.x);
    jointPositionsTarget.leftKneePosTarget.y = (this.cameras.main.height * jointPositionsWebcamPercentage.leftKneePos.y);
    jointPositions.leftKneePos.x += ( jointPositionsTarget.leftKneePosTarget.x - jointPositions.leftKneePos.x ) / fpsFactor;
    jointPositions.leftKneePos.y += ( jointPositionsTarget.leftKneePosTarget.y - jointPositions.leftKneePos.y ) / fpsFactor;
    this.leftKneeAvatar.x = jointPositions.leftKneePos.x;
    this.leftKneeAvatar.y = jointPositions.leftKneePos.y;

    jointPositionsWebcamPercentage.leftAnklePos.x = (jointPositionsTenserflow.leftAnklePos.x / videoWidth);
    jointPositionsWebcamPercentage.leftAnklePos.y = (jointPositionsTenserflow.leftAnklePos.y / videoHeight);
    jointPositionsTarget.leftAnklePosTarget.x = (this.cameras.main.width * jointPositionsWebcamPercentage.leftAnklePos.x);
    jointPositionsTarget.leftAnklePosTarget.y = (this.cameras.main.height * jointPositionsWebcamPercentage.leftAnklePos.y);
    jointPositions.leftAnklePos.x += ( jointPositionsTarget.leftAnklePosTarget.x - jointPositions.leftAnklePos.x ) / fpsFactor;
    jointPositions.leftAnklePos.y += ( jointPositionsTarget.leftAnklePosTarget.y - jointPositions.leftAnklePos.y ) / fpsFactor;
    this.leftAnkleAvatar.x = jointPositions.leftAnklePos.x;
    this.leftAnkleAvatar.y = jointPositions.leftAnklePos.y;



    jointPositionsWebcamPercentage.rightWristPos.x = (jointPositionsTenserflow.rightWristPos.x / videoWidth);
    jointPositionsWebcamPercentage.rightWristPos.y = (jointPositionsTenserflow.rightWristPos.y / videoHeight);
    jointPositionsTarget.rightWristPosTarget.x = (this.cameras.main.width * jointPositionsWebcamPercentage.rightWristPos.x);
    jointPositionsTarget.rightWristPosTarget.y = (this.cameras.main.height * jointPositionsWebcamPercentage.rightWristPos.y);
    jointPositions.rightWristPos.x += ( jointPositionsTarget.rightWristPosTarget.x - jointPositions.rightWristPos.x ) / fpsFactor;
    jointPositions.rightWristPos.y += ( jointPositionsTarget.rightWristPosTarget.y - jointPositions.rightWristPos.y ) / fpsFactor;
    this.rightWristAvatar.x = jointPositions.rightWristPos.x;
    this.rightWristAvatar.y = jointPositions.rightWristPos.y;


    jointPositionsWebcamPercentage.rightShoulderPos.x = (jointPositionsTenserflow.rightShoulderPos.x / videoWidth);
    jointPositionsWebcamPercentage.rightShoulderPos.y = (jointPositionsTenserflow.rightShoulderPos.y / videoHeight);
    jointPositionsTarget.rightShoulderPosTarget.x = (this.cameras.main.width * jointPositionsWebcamPercentage.rightShoulderPos.x);
    jointPositionsTarget.rightShoulderPosTarget.y = (this.cameras.main.height * jointPositionsWebcamPercentage.rightShoulderPos.y);
    jointPositions.rightShoulderPos.x += ( jointPositionsTarget.rightShoulderPosTarget.x - jointPositions.rightShoulderPos.x ) / fpsFactor;
    jointPositions.rightShoulderPos.y += ( jointPositionsTarget.rightShoulderPosTarget.y - jointPositions.rightShoulderPos.y ) / fpsFactor;
    this.rightShoulderAvatar.x = jointPositions.rightShoulderPos.x;
    this.rightShoulderAvatar.y = jointPositions.rightShoulderPos.y;


    jointPositionsWebcamPercentage.rightElbowPos.x = (jointPositionsTenserflow.rightElbowPos.x / videoWidth);
    jointPositionsWebcamPercentage.rightElbowPos.y = (jointPositionsTenserflow.rightElbowPos.y / videoHeight);
    jointPositionsTarget.rightElbowPosTarget.x = (this.cameras.main.width * jointPositionsWebcamPercentage.rightElbowPos.x);
    jointPositionsTarget.rightElbowPosTarget.y = (this.cameras.main.height * jointPositionsWebcamPercentage.rightElbowPos.y);
    jointPositions.rightElbowPos.x += ( jointPositionsTarget.rightElbowPosTarget.x - jointPositions.rightElbowPos.x ) / fpsFactor;
    jointPositions.rightElbowPos.y += ( jointPositionsTarget.rightElbowPosTarget.y - jointPositions.rightElbowPos.y ) / fpsFactor;
    this.rightElbowAvatar.x = jointPositions.rightElbowPos.x;
    this.rightElbowAvatar.y = jointPositions.rightElbowPos.y;


    jointPositionsWebcamPercentage.rightHipPos.x = (jointPositionsTenserflow.rightHipPos.x / videoWidth);
    jointPositionsWebcamPercentage.rightHipPos.y = (jointPositionsTenserflow.rightHipPos.y / videoHeight);
    jointPositionsTarget.rightHipPosTarget.x = (this.cameras.main.width * jointPositionsWebcamPercentage.rightHipPos.x);
    jointPositionsTarget.rightHipPosTarget.y = (this.cameras.main.height * jointPositionsWebcamPercentage.rightHipPos.y);
    jointPositions.rightHipPos.x += ( jointPositionsTarget.rightHipPosTarget.x - jointPositions.rightHipPos.x ) / fpsFactor;
    jointPositions.rightHipPos.y += ( jointPositionsTarget.rightHipPosTarget.y - jointPositions.rightHipPos.y ) / fpsFactor;
    this.rightHipAvatar.x = jointPositions.rightHipPos.x;
    this.rightHipAvatar.y = jointPositions.rightHipPos.y;


    jointPositionsWebcamPercentage.rightKneePos.x = (jointPositionsTenserflow.rightKneePos.x / videoWidth);
    jointPositionsWebcamPercentage.rightKneePos.y = (jointPositionsTenserflow.rightKneePos.y / videoHeight);
    jointPositionsTarget.rightKneePosTarget.x = (this.cameras.main.width * jointPositionsWebcamPercentage.rightKneePos.x);
    jointPositionsTarget.rightKneePosTarget.y = (this.cameras.main.height * jointPositionsWebcamPercentage.rightKneePos.y);
    jointPositions.rightKneePos.x += ( jointPositionsTarget.rightKneePosTarget.x - jointPositions.rightKneePos.x ) / fpsFactor;
    jointPositions.rightKneePos.y += ( jointPositionsTarget.rightKneePosTarget.y - jointPositions.rightKneePos.y ) / fpsFactor;
    this.rightKneeAvatar.x = jointPositions.rightKneePos.x;
    this.rightKneeAvatar.y = jointPositions.rightKneePos.y;


    jointPositionsWebcamPercentage.rightAnklePos.x = (jointPositionsTenserflow.rightAnklePos.x / videoWidth);
    jointPositionsWebcamPercentage.rightAnklePos.y = (jointPositionsTenserflow.rightAnklePos.y / videoHeight);
    jointPositionsTarget.rightAnklePosTarget.x = (this.cameras.main.width * jointPositionsWebcamPercentage.rightAnklePos.x);
    jointPositionsTarget.rightAnklePosTarget.y = (this.cameras.main.height * jointPositionsWebcamPercentage.rightAnklePos.y);
    jointPositions.rightAnklePos.x += ( jointPositionsTarget.rightAnklePosTarget.x - jointPositions.rightAnklePos.x ) / fpsFactor;
    jointPositions.rightAnklePos.y += ( jointPositionsTarget.rightAnklePosTarget.y - jointPositions.rightAnklePos.y ) / fpsFactor;
    this.rightAnkleAvatar.x = jointPositions.rightAnklePos.x;
    this.rightAnkleAvatar.y = jointPositions.rightAnklePos.y;

    this.graphics.clear();
    this.graphics.fillPoints([
      {
        x: jointPositions.leftShoulderPos.x,
        y: jointPositions.leftShoulderPos.y
      },
      {
      x: jointPositions.rightShoulderPos.x,
      y: jointPositions.rightShoulderPos.y
      },
      {
        x: jointPositions.rightHipPos.x,
        y: jointPositions.rightHipPos.y
      },
      {
        x: jointPositions.leftHipPos.x,
        y: jointPositions.leftHipPos.y
      }], true);

  };


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

  //woord word gespawned op scherm
  spawnWord() {

    let fallPosition = Phaser.Math.Between(20, widthDivScreen / 4);
    this.splitWord();

    for (letter = 0; letter < split.length; letter++)
    {
      console.log('spawnWord: ' + split[letter]);
      const l = this.matter.add.sprite(fallPosition, 0, split[letter], 0, {restitution: .5, slop: 1});
      fallPosition = fallPosition + spacebetween;
      letters.push(l);

    }

  };

   //indien een woord werd ingegeven word het woord ingelezen gesplits en erna gespawend


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
      split = readWord.split('');
      console.log('splitWord: ' + split);
      //letters.push(split);
    };


    makeConnectionAdmin() {
      socket = io.connect('/');
      socket.on('connect', () => {

        console.log(`Admin connected: ${socket.id}`);
        socket.emit('admin');
        socket.emit('requestHearts');
        socket.emit('requestHighfives');
      });

      socket.on('getHeartCount', hearts => {
        heartCount = hearts;
        document.querySelector('.heartscount').innerHTML = heartCount;
        console.log(heartCount);
        // use in DOM
      });

      socket.on('getHighfiveCount', highfives => {
        highfiveCount = highfives;
        document.querySelector('.highfivescount').innerHTML = highfiveCount;
        console.log(highfiveCount);
        // use in DOM
      });

      socket.on('handShaken', highfives => {
        highfiveCount = highfives;
        document.querySelector('.highfivescount').innerHTML = highfiveCount;
        console.log(highfiveCount);
        // use in DOM
      });

      socket.on('heartAll', hearts => {
        heartCount = hearts;
        document.querySelector('.heartscount').innerHTML = heartCount;
        console.log(heartCount);
        // use in DOM
      });

      socket.on('message', message => {
        console.log(`Received message: ${message}`);
        words.push(message);

        console.log(words);
        readWord = message;
        this.spawnWord();
      });

      socket.on('heartAll', () => {
        console.log("hartje??")
        const hartje = this.matter.add.sprite(200, this.cameras.main.height, 'heart', 0, {restitution: .5, ignoreGravity: true});
        hartje.setCollisionGroup(this.group2);
        hartje.setCollidesWith(0);
        hartje.setVelocityY(-20);
        hartjes.push(hartje);
        console.log(this.group1);
        console.log(this.group2);



      });
      socket.on('handAll', id => {
        handShakeId = id;
        const fallPositionX = Phaser.Math.Between(60, this.cameras.main.height - 60);
        const fallPositionY = Phaser.Math.Between(60, this.cameras.main.width - 60);
        const hand = this.matter.add.sprite(fallPositionX, fallPositionY, 'hand', 0, {restitution: .5, ignoreGravity: true}).setScale(.1);
        this.tweens.add({
          targets: hand,
          scaleX: 1,
          scaleY: 1,
          duration: 200,
          ease: 'Linear'
      });
      });


      socket.on('shakeAll', () => {

        letters.forEach(letter => {
          letter.setVelocity(20, 30)
        });
        feelings.forEach(feeling => {
          feeling.setVelocity(20, 30)
        });


      });

      socket.on('selectedFeeling', selectedFeeling => {
        let fallPosition = Phaser.Math.Between(60, this.cameras.main.width);
        let rand = Math.floor(Math.random()*4);
        switch(selectedFeeling){
          case "somber": this.feeling = this.matter.add.sprite(fallPosition, 0, `somber${rand.toString()}`, 0, {restitution: .5, slop: 1});break;
          case "giechelig": this.feeling = this.matter.add.sprite(fallPosition, 0, `quirky${rand.toString()}`, 0, {restitution: .5, slop: 1});break;
          case "blij": this.feeling = this.matter.add.sprite(fallPosition, 0, `happy${rand.toString()}`, 0, {restitution: .5, slop: 1});break;
          case "afgemat": this.feeling = this.matter.add.sprite(fallPosition, 0, `tired${rand.toString()}`, 0, {restitution: .5, slop: 1});break;

        }
        feelings.push(this.feeling);
      });

    };


}

