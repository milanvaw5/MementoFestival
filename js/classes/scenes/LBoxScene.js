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

const videoWidth = 600;
const videoHeight = 700;
const colorRight = "red";
const colorLeft = "black";

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
  const ctx = canvas.getContext('2d');
  const flipPoseHorizontal = true;
  console.log(video)
  canvas.width = videoWidth;
  canvas.height = videoHeight;
  console.log(videoHeight)
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

    ctx.clearRect(0, 0, videoWidth, videoHeight);

    if (poseNetState.output.showVideo) {
      ctx.save();
      ctx.scale(-1, 1);
      ctx.translate(-videoWidth, 0);
      ctx.restore();
    }

    poses.forEach(({score, keypoints}) => {
      if (score >= minPoseConfidence) {
        if (poseNetState.output.showPoints) {
          drawKeypoints(keypoints, minPartConfidence, ctx);
        }
      }
    });
    requestAnimationFrame(poseDetectionFrame);
  }

  poseDetectionFrame();
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

  try {
    video = await setupCamera();
    video.play();

  } catch (e) {
    throw e;
  }
  detectPoseInRealTime(video);
}


export default class LetterBoxScene extends Phaser.Scene {

  constructor(config){
    super(config);
  }

  init = async () => {
    //reset some variables
    console.log('INITLIALIZING');
    poseNetModel = await posenet.load({
      architecture: poseNetState.input.architecture,
      outputStride: poseNetState.input.outputStride,
      inputResolution: poseNetState.input.inputResolution,
      multiplier: poseNetState.input.multiplier,
      quantBytes: poseNetState.input.quantBytes
  });
  console.log(poseNetModel)
  startVideo();

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


  drawKeypoints(keypoints, minConfidence, ctx, scale = 1) {
    let leftWrist = keypoints.find(point => point.part === 'leftWrist');
    let rightWrist = keypoints.find(point => point.part === 'rightWrist');
    let leftEye = keypoints.find(point => point.part === 'leftEye');
    let rightEye = keypoints.find(point => point.part === 'rightEye');
    // plaats joints naar believen

    if (leftWrist.score > minConfidence) {
        const {y, x} = leftWrist.position;
        drawPoint(ctx, y * scale, x * scale, 10, colorLeft);
    }

    if (rightWrist.score > minConfidence) {
        const {y, x} = rightWrist.position;
        drawPoint(ctx, y * scale, x * scale, 10, colorRight);
    }

    if (leftEye.score > minConfidence) {
      const {y, x} = leftEye.position;
      drawPoint(ctx, y * scale, x * scale, 10, colorLeft);
  }

  if (rightEye.score > minConfidence) {
      const {y, x} = rightEye.position;
      drawPoint(ctx, y * scale, x * scale, 10, colorRight);
  }
}

drawPoint(ctx, y, x, r, color) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  ctx.fillStyle = color;
  ctx.fill();
}

}
