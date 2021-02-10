{
    const $nextButtons = document.querySelectorAll(`.btn-next`);
    const $wordForm = document.querySelector(`.wordForm`);
    const $feelingsForm = document.querySelector(`.feelingsForm`);
    const $challengeForm = document.querySelector(`.challengeForm`);
    const $haikuForm = document.querySelector(`.haikuForm`);
    const $haiku = document.querySelector(`.haiku`);
    let currentForm = 0;
    const haikuWords = ["zonneschijn"];
    const haikus = ["“De zon schijnt vandaag net iets harder omdat jij hier bent.”"];
    
    const handleNextForm = e => {
        e.preventDefault();
        document.querySelector(`.form-${currentForm}`).style.display = `none`;
        if (currentForm === 4) {
          currentForm = 4;


        } else {
          currentForm++;
        }
        document.querySelector(`.btn-next`).innerHTML = `&#10132; ${currentForm}/8`;
        document.querySelector(`.form-${currentForm}`).style.display = `block`;
        if(currentForm === 4){
           // $haiku.textContent = haikus[0];
        }
           
       // hidePrev();

    }


    const hidePrev = () => {
        if (currentForm === 0) {
          $btnVorige.style.display = `none`;
        } else {
          $btnVorige.style.display = `block`;
        }
      };
 
    
    
    const init = () => {
        $wordForm.style.display = `none`;
        $feelingsForm.style.display = `none`;
        $challengeForm.style.display = `none`;
        $haikuForm.style.display = `none`;
     
        $nextButtons.forEach(nextButton => {
            nextButton.addEventListener(`click`, handleNextForm);

        })

    }
    init();
}