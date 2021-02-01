let letter;
//let backgroundimage;
let spawnWordInterval;
let lowercase;
let fpsFactor = 5;
let readWord;
let split = [];
let words = [];
let letters = [];
let widthDivScreen = document.querySelector('.bottomblock').style.width;
let spacebetween = 200;
let socket; // will be assigned a value later

/*
let auteurInput = ['Verloren','hinkel ik','over de sproeten op mijn vingers',
'Afgeslagen','langzaam ademend','langs mijn armen dwalend','Mijn rug','terug – gezucht –',
'geen bescherming op de vlucht','Veilig','aan mijn zij','de afgrond daar als lijn',
'Onontdekt','en zorgeloos','dolend door mijn eigen hoofd'];*/

let auteurInput = ['verloren','hinkelik','overdesproeten','opmijnvingers'];

let jointPositions = {
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

let jointPositionsTarget = {
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


{
  const videoWidth = 1280;
  const videoHeight = 760;
  const colorRight = "red";
  const colorLeft = "black";
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
  //const ctx = canvas.getContext('2d');
  const flipPoseHorizontal = true;

  //canvas.width = videoWidth;
  //canvas.height = videoHeight;

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

    //ctx.clearRect(0, 0, videoWidth, videoHeight);

   /* if (poseNetState.output.showVideo) {
      ctx.save();
      ctx.scale(-1, 1);
      ctx.translate(-videoWidth, 0);
      ctx.restore();
    }*/

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

  let leftWrist = keypoints.find(point => point.part === 'leftWrist');
  let rightWrist = keypoints.find(point => point.part === 'rightWrist');
  let leftEye = keypoints.find(point => point.part === 'leftEye');
  let rightEye = keypoints.find(point => point.part === 'rightEye');
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

  //tensorflowpunten.push(leftWrist, rightWrist, leftEye, rightEye, leftShoulder, rightShoulder, leftElbow,
  //  rightElbow, leftHip, rightHip, leftKnee, rightKnee, leftAnkle, rightAnkle, minConfidence);




  if (leftWrist.score > minConfidence) {
      //const {y, x} = leftWrist.position;
      jointPositionsTarget.leftWristPosTarget = leftWrist.position;
      //drawPoint(ctx, y * scale, x * scale, 10, colorLeft);
  }

  if (rightWrist.score > minConfidence) {
      //const {y, x} = rightWrist.position;
      jointPositionsTarget.rightWristPosTarget = rightWrist.position;
      //drawPoint(ctx, y * scale, x * scale, 10, colorRight);
  }

  if (rightEye.score > minConfidence) {
    //const {y, x} = rightEye.position;
    jointPositionsTarget.rightEyePosTarget = rightEye.position;
    //drawPoint(ctx, y * scale, x * scale, 10, colorRight);
  }
  if (leftEye.score > minConfidence) {
    //const {y, x} = leftEye.position;
    jointPositionsTarget.leftEyePosTarget = leftEye.position;
    //drawPoint(ctx, y * scale, x * scale, 10, colorRight);
  }
  if (leftShoulder.score > minConfidence) {
    //const {y, x} = leftShoulder.position;
    jointPositionsTarget.leftShoulderPosTarget = leftShoulder.position;
   // drawPoint(ctx, y * scale, x * scale, 10, colorRight);
  }
  if (rightShoulder.score > minConfidence) {
    //const {y, x} = rightShoulder.position;
    jointPositionsTarget.rightShoulderPosTarget = rightShoulder.position;
    //drawPoint(ctx, y * scale, x * scale, 10, colorRight);
  }
  if (leftElbow.score > minConfidence) {
    //const {y, x} = leftElbow.position;
    jointPositionsTarget.leftElbowPosTarget = leftElbow.position;
    //drawPoint(ctx, y * scale, x * scale, 10, colorRight);
  }
  if (rightElbow.score > minConfidence) {
    //const {y, x} = rightElbow.position;
    jointPositionsTarget.rightElbowPosTarget = rightElbow.position;
    //drawPoint(ctx, y * scale, x * scale, 10, colorRight);
  }
  if (leftHip.score > minConfidence) {
    //const {y, x} = leftHip.position;
    jointPositionsTarget.leftHipPosTarget = leftHip.position;
    //drawPoint(ctx, y * scale, x * scale, 10, colorRight);
  }
  if (rightHip.score > minConfidence) {
    //const {y, x} = rightHip.position;
    jointPositionsTarget.rightHipPosTarget = rightHip.position;
    //drawPoint(ctx, y * scale, x * scale, 10, colorRight);
  }
  if (leftKnee.score > minConfidence) {
    //const {y, x} = leftKnee.position;
    jointPositionsTarget.leftKneePosTarget = leftKnee.position;
    //drawPoint(ctx, y * scale, x * scale, 10, colorRight);
  }
  if (rightKnee.score > minConfidence) {
    //const {y, x} = rightKnee.position;
    jointPositionsTarget.rightKneePosTarget = rightKnee.position;
    //drawPoint(ctx, y * scale, x * scale, 10, colorRight);
  }
  if (leftAnkle.score > minConfidence) {
    //const {y, x} = leftAnkle.position;
    jointPositionsTarget.leftAnklePosTarget = leftAnkle.position;
    //drawPoint(ctx, y * scale, x * scale, 10, colorRight);
  }
  if (rightAnkle.score > minConfidence) {
    //const {y, x} = rightAnkle.position;
    jointPositionsTarget.rightAnklePosTarget = rightAnkle.position;
    //drawPoint(ctx, y * scale, x * scale, 10, colorRight);
  }
}


/*function drawPoint(ctx, y, x, r, color) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  ctx.fillStyle = color;
  ctx.fill();
  tensorflowpunten = [];
}*/

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

    this.load.spritesheet('heart', 'assets/img/interactions/heart.png', { frameWidth: 70, frameHeight: 70 });
    this.load.spritesheet('wave', 'assets/img/interactions/wave.png', { frameWidth: 70, frameHeight: 70 });

  }

  create(){
    console.log(`CREATE`);

    this.makeConnectionAdmin();
    //backgroundimage = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'backgroundimage');

    this.leftWristAvatar = this.matter.add.image(jointPositions.leftWristPos.x, jointPositions.leftWristPos.y, 'test', 0, {mass: 1000, inverseMass: 1000, ignoreGravity: false, density: 1});
    this.rightWristAvatar = this.matter.add.image(jointPositions.rightWristPos.x, jointPositions.rightWristPos.y, 'test', 0, {mass: 1000, inverseMass: 1000, ignoreGravity: false, density: 1});
    this.leftEyeAvatar = this.matter.add.image(jointPositions.leftEyePos.x, jointPositions.leftEyePos.y, 'test', 0, {mass: 1000, inverseMass: 1000, ignoreGravity: false, density: 1});
    this.rightEyeAvatar = this.matter.add.image(jointPositions.rightEyePos.x, jointPositions.rightEyePos.y, 'test', 0, {mass: 1000, inverseMass: 1000, ignoreGravity: false, density: 1});
    this.leftShoulderAvatar = this.matter.add.image(jointPositions.leftShoulderPos.x, jointPositions.leftShoulderPos.y, 'test', 0, {mass: 1000, inverseMass: 1000, ignoreGravity: false, density: 1});
    this.rightShoulderAvatar = this.matter.add.image(jointPositions.rightShoulderPos.x, jointPositions.rightShoulderPos.y, 'test', 0, {mass: 1000, inverseMass: 1000, ignoreGravity: false, density: 1});
    this.leftElbowAvatar = this.matter.add.image(jointPositions.leftElbowPos.x, jointPositions.leftElbowPos.y, 'test', 0, {mass: 1000, inverseMass: 1000, ignoreGravity: false, density: 1});
    this.rightElbowAvatar = this.matter.add.image(jointPositions.rightElbowPos.x, jointPositions.rightElbowPos.y, 'test', 0, {mass: 1000, inverseMass: 1000, ignoreGravity: false, density: 1});
    this.leftHipAvatar = this.matter.add.image(jointPositions.leftHipPos.x, jointPositions.leftHipPos.y, 'test', 0, {mass: 1000, inverseMass: 1000, ignoreGravity: false, density: 1});
    this.rightHipAvatar = this.matter.add.image(jointPositions.rightHipPos.x, jointPositions.rightHipPos.y, 'test', 0, {mass: 1000, inverseMass: 1000, ignoreGravity: false, density: 1});
    this.leftKneeAvatar = this.matter.add.image(jointPositions.leftKneePos.x, jointPositions.leftKneePos.y, 'test', 0, {mass: 1000, inverseMass: 1000, ignoreGravity: false, density: 1});
    this.rightKneeAvatar = this.matter.add.image(jointPositions.rightKneePos.x, jointPositions.rightKneePos.y, 'test', 0, {mass: 1000, inverseMass: 1000, ignoreGravity: false, density: 1});
    this.leftAnkleAvatar = this.matter.add.image(jointPositions.leftAnklePos.x, jointPositions.leftAnklePos.y, 'test', 0, {mass: 1000, inverseMass: 1000, ignoreGravity: false, density: 1});
    this.rightAnkleAvatar = this.matter.add.image(jointPositions.rightAnklePos.x, jointPositions.rightAnklePos.y, 'test', 0, {mass: 1000, inverseMass: 1000, ignoreGravity: false, density: 1});


    this.spawnLetters();
    // emit only 10 times per second
    this.time.addEvent({ delay: 100, callback: this.onEvent, callbackScope: this, loop: true });
  }

  onEvent(){
    socket.emit('points', jointPositions);
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
    }

    jointPositions.leftWristPos.x += ( jointPositionsTarget.leftWristPosTarget.x - jointPositions.leftWristPos.x ) / fpsFactor;
    jointPositions.leftWristPos.y += ( jointPositionsTarget.leftWristPosTarget.y - jointPositions.leftWristPos.y ) / fpsFactor;
    this.leftWristAvatar.x = jointPositions.leftWristPos.x;
    this.leftWristAvatar.y = jointPositions.leftWristPos.y;

    jointPositions.leftEyePos.x += ( jointPositionsTarget.leftEyePosTarget.x - jointPositions.leftEyePos.x ) / fpsFactor;
    jointPositions.leftEyePos.y += ( jointPositionsTarget.leftEyePosTarget.y - jointPositions.leftEyePos.y ) / fpsFactor;
    this.leftEyeAvatar.x = jointPositions.leftEyePos.x;
    this.leftEyeAvatar.y = jointPositions.leftEyePos.y;

    jointPositions.leftShoulderPos.x += ( jointPositionsTarget.leftShoulderPosTarget.x - jointPositions.leftShoulderPos.x ) / fpsFactor;
    jointPositions.leftShoulderPos.y += ( jointPositionsTarget.leftShoulderPosTarget.y - jointPositions.leftShoulderPos.y ) / fpsFactor;
    this.leftShoulderAvatar.x = jointPositions.leftShoulderPos.x;
    this.leftShoulderAvatar.y = jointPositions.leftShoulderPos.y;

    jointPositions.leftElbowPos.x += ( jointPositionsTarget.leftElbowPosTarget.x - jointPositions.leftElbowPos.x ) / fpsFactor;
    jointPositions.leftElbowPos.y += ( jointPositionsTarget.leftElbowPosTarget.y - jointPositions.leftElbowPos.y ) / fpsFactor;
    this.leftElbowAvatar.x = jointPositions.leftElbowPos.x;
    this.leftElbowAvatar.y = jointPositions.leftElbowPos.y;

    jointPositions.leftHipPos.x += ( jointPositionsTarget.leftHipPosTarget.x - jointPositions.leftHipPos.x ) / fpsFactor;
    jointPositions.leftHipPos.y += ( jointPositionsTarget.leftHipPosTarget.y - jointPositions.leftHipPos.y ) / fpsFactor;
    this.leftHipAvatar.x = jointPositions.leftHipPos.x;
    this.leftHipAvatar.y = jointPositions.leftHipPos.y;

    jointPositions.leftKneePos.x += ( jointPositionsTarget.leftKneePosTarget.x - jointPositions.leftKneePos.x ) / fpsFactor;
    jointPositions.leftKneePos.y += ( jointPositionsTarget.leftKneePosTarget.y - jointPositions.leftKneePos.y ) / fpsFactor;
    this.leftKneeAvatar.x = jointPositions.leftKneePos.x;
    this.leftKneeAvatar.y = jointPositions.leftKneePos.y;

    jointPositions.leftAnklePos.x += ( jointPositionsTarget.leftAnklePosTarget.x - jointPositions.leftAnklePos.x ) / fpsFactor;
    jointPositions.leftAnklePos.y += ( jointPositionsTarget.leftAnklePosTarget.y - jointPositions.leftAnklePos.y ) / fpsFactor;
    this.leftAnkleAvatar.x = jointPositions.leftAnklePos.x;
    this.leftAnkleAvatar.y = jointPositions.leftAnklePos.y;



    jointPositions.rightWristPos.x += ( jointPositionsTarget.rightWristPosTarget.x - jointPositions.rightWristPos.x ) / fpsFactor;
    jointPositions.rightWristPos.y += ( jointPositionsTarget.rightWristPosTarget.y - jointPositions.rightWristPos.y ) / fpsFactor;
    this.rightWristAvatar.x = jointPositions.rightWristPos.x;
    this.rightWristAvatar.y = jointPositions.rightWristPos.y;

    jointPositions.rightEyePos.x += ( jointPositionsTarget.rightEyePosTarget.x - jointPositions.rightEyePos.x ) / fpsFactor;
    jointPositions.rightEyePos.y += ( jointPositionsTarget.rightEyePosTarget.y - jointPositions.rightEyePos.y ) / fpsFactor;
    this.rightEyeAvatar.x = jointPositions.rightEyePos.x;
    this.rightEyeAvatar.y = jointPositions.rightEyePos.y;

    jointPositions.rightShoulderPos.x += ( jointPositionsTarget.rightShoulderPosTarget.x - jointPositions.rightShoulderPos.x ) / fpsFactor;
    jointPositions.rightShoulderPos.y += ( jointPositionsTarget.rightShoulderPosTarget.y - jointPositions.rightShoulderPos.y ) / fpsFactor;
    this.rightShoulderAvatar.x = jointPositions.rightShoulderPos.x;
    this.rightShoulderAvatar.y = jointPositions.rightShoulderPos.y;

    jointPositions.rightElbowPos.x += ( jointPositionsTarget.rightElbowPosTarget.x - jointPositions.rightElbowPos.x ) / fpsFactor;
    jointPositions.rightElbowPos.y += ( jointPositionsTarget.rightElbowPosTarget.y - jointPositions.rightElbowPos.y ) / fpsFactor;
    this.rightElbowAvatar.x = jointPositions.rightElbowPos.x;
    this.rightElbowAvatar.y = jointPositions.rightElbowPos.y;

    jointPositions.rightHipPos.x += ( jointPositionsTarget.rightHipPosTarget.x - jointPositions.rightHipPos.x ) / fpsFactor;
    jointPositions.rightHipPos.y += ( jointPositionsTarget.rightHipPosTarget.y - jointPositions.rightHipPos.y ) / fpsFactor;
    this.rightHipAvatar.x = jointPositions.rightHipPos.x;
    this.rightHipAvatar.y = jointPositions.rightHipPos.y;

    jointPositions.rightKneePos.x += ( jointPositionsTarget.rightKneePosTarget.x - jointPositions.rightKneePos.x ) / fpsFactor;
    jointPositions.rightKneePos.y += ( jointPositionsTarget.rightKneePosTarget.y - jointPositions.rightKneePos.y ) / fpsFactor;
    this.rightKneeAvatar.x = jointPositions.rightKneePos.x;
    this.rightKneeAvatar.y = jointPositions.rightKneePos.y;

    jointPositions.rightAnklePos.x += ( jointPositionsTarget.rightAnklePosTarget.x - jointPositions.rightAnklePos.x ) / fpsFactor;
    jointPositions.rightAnklePos.y += ( jointPositionsTarget.rightAnklePosTarget.y - jointPositions.rightAnklePos.y ) / fpsFactor;
    this.rightAnkleAvatar.x = jointPositions.rightAnklePos.x;
    this.rightAnkleAvatar.y = jointPositions.rightAnklePos.y;

    /*this.leftWristAvatar.x = jointPositions.leftWristPos.x;
    this.leftWristAvatar.y = jointPositions.leftWristPos.y + 200;
    this.leftEyeAvatar.x = jointPositions.leftEyePos.x;
    this.leftEyeAvatar.y = jointPositions.leftEyePos.y + 200;
    this.leftShoulderAvatar.x = jointPositions.leftShoulderPos.x;
    this.leftShoulderAvatar.y = jointPositions.leftShoulderPos.y + 200;
    this.leftElbowAvatar.x = jointPositions.leftElbowPos.x;
    this.leftElbowAvatar.y = jointPositions.leftElbowPos.y + 200;
    this.leftHipAvatar.x = jointPositions.leftHipPos.x;
    this.leftHipAvatar.y = jointPositions.leftHipPos.y + 200;
    this.leftKneeAvatar.x = jointPositions.leftKneePos.x;
    this.leftKneeAvatar.y = jointPositions.leftKneePos.y + 200;
    this.leftAnkleAvatar.x = jointPositions.leftAnklePos.x;
    this.leftAnkleAvatar.y = jointPositions.leftAnklePos.y + 200;

    this.rightWristAvatar.x = jointPositions.rightWristPos.x;
    this.rightWristAvatar.y = jointPositions.rightWristPos.y + 200;
    this.rightEyeAvatar.x = jointPositions.rightEyePos.x;
    this.rightEyeAvatar.y = jointPositions.rightEyePos.y + 200;
    this.rightShoulderAvatar.x = jointPositions.rightShoulderPos.x;
    this.rightShoulderAvatar.y = jointPositions.rightShoulderPos.y + 200;
    this.rightElbowAvatar.x = jointPositions.rightElbowPos.x;
    this.rightElbowAvatar.y = jointPositions.rightElbowPos.y + 200;
    this.rightHipAvatar.x = jointPositions.rightHipPos.x;
    this.rightHipAvatar.y = jointPositions.rightHipPos.y + 200;
    this.rightKneeAvatar.x = jointPositions.rightKneePos.x;
    this.rightKneeAvatar.y = jointPositions.rightKneePos.y + 200;
    this.rightAnkleAvatar.x = jointPositions.rightAnklePos.x;
    this.rightAnkleAvatar.y = jointPositions.rightAnklePos.y + 200;*/

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
      split[letter] = this.matter.add.sprite(fallPosition, 0, split[letter], 0, {restitution: .5});
      fallPosition = fallPosition + spacebetween;
      letters.push(split[letter]);
      console.log(letters);
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
      letters.push(split);
    };


    makeConnectionAdmin() {
      socket = io.connect('/');
      socket.on('connect', () => {
        console.log(`Admin connected: ${socket.id}`);
      });
      socket.on('message', message => {
        console.log(`Received message: ${message}`);
        words.push(message);

        console.log(words);
        readWord = message;
        this.spawnWord();
      });

    };


}

