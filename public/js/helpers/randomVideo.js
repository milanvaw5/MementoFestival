{
    let randomVideo = 0;
    const videos = ["video0.mp4", "video2.mp4"];
    const $video = document.querySelector(`.previewVideo`);

    const handleEndedVideo = () => {
        randomVideo++;
        if(randomVideo >= videos.length){ // videos.length is 2
            randomVideo = 0;
        }
        $video.src = `assets/video/${videos[randomVideo]}`;
    }

    const init = () => {
        $video.addEventListener(`ended`, handleEndedVideo);
        randomVideo = randomNumber();
        $video.src = `assets/video/${videos[randomVideo]}`;
    }


    const randomNumber = () => {
        const random = Math.floor(Math.random(1)*videos.length);
        return random;
    }

    init();
}