// Your code will go here
// open up your console - if everything loaded properly you should see 0.3.0
{
const video = document.getElementById('webcam');  
const $canvas = document.querySelector(`#canvas`), context = $canvas.getContext(`2d`);
const fps = 4;
 
let myImage = new Image();
let source = "assets/idle2.png";
let newSource = undefined;

//myImage.addEventListener("load", animate, false);
 

 
let shift = 0;
let frameWidth = 125;
let frameHeight = 125;
let totalFrames = 4;
let currentFrame = 0;
 
function animate() {
  context.clearRect(300, 125, 125, 125);
 
  //draw each frame + place them in the middle
  context.drawImage(myImage, shift, 0, frameWidth, frameHeight,
                    300, 125, frameWidth, frameHeight);
 
  shift += frameWidth + 1;
 
  /*
    Start at the beginning once you've reached the
    end of your sprite!
  */
  if (currentFrame == totalFrames) {
    shift = 0;
    currentFrame = 0;
  }
 
  currentFrame++;
 


    setTimeout(function(){ 
        requestAnimationFrame(animate)
    }, 1000/fps);

}
 
const init = () => {
    myImage.src = source;
    animate();
    navigator.getUserMedia({video: {}},
        stream => video.srcObject = stream,
        err => console.error(err)
        )

    startDetection();  
}



const startDetection = () => {
  
    video.addEventListener('play', () => {
        console.log("play");
        setInterval(async () => {
            const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
            .withFaceLandmarks()
            .withFaceExpressions()
       
            if(detections[0] != undefined){

                if(detections[0].expressions.happy > .5){
                    totalFrames = 6;
                    newSource = "assets/walk.png";
                    if(source != newSource){
                        source = newSource;
                        myImage.src = newSource;
                      } 
                }else if(detections[0].expressions.angry > .5){
                    totalFrames = 6;
                    newSource = "assets/attack.png";
                    if(source != newSource){
                        source = newSource;
                        myImage.src = newSource;
                    }
                    
                     }else if(detections[0].expressions.surprised > .3){
                        totalFrames = 4;
                        newSource = "assets/run.png";
                        if(source != newSource){
                            source = newSource;
                          myImage.src = newSource;
                        }
                          
                         }else{
                            totalFrames = 4;
                            newSource = "assets/idle2.png";
                            if(source != newSource){
                                source = newSource;
                              myImage.src = newSource;
                         }
             console.log(detections[0])
            }   
        }
        }, 100)
    })
}
Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('./models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('./models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('./models'),
    faceapi.nets.faceExpressionNet.loadFromUri('./models')
  ]).then(init)



}