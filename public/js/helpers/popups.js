{
    const $popupWord = document.querySelector(`.popup--word`);
    const $popupText = document.querySelector(`.popup__text`);
    const $questionmarks = document.querySelectorAll(`.questionmark`);
    let isOpen = false;


    const handleClickWindow = e => {
        console.log(e.target);
        if(e.target.classList[0] !== "questionmark"){
          
            if(isOpen === false){
               
              
            }else{
                if(isOpen === true){
                    console.log("windows")
                    $popupWord.style.animation = "disappear 1s ease";
                    $popupWord.style.opacity = "0";
                    $popupWord.style.zIndex = "0";
                    isOpen = false;

                }
            }
    
        }
        
    }

    const handleClickQuestionmark = e => {
        console.log(isOpen)
        console.log(e.currentTarget.getBoundingClientRect());
        const question = e.currentTarget.classList.value;
        let text = "";
        const top = e.currentTarget.getBoundingClientRect().top;
        const right = e.currentTarget.getBoundingClientRect().left;
       

        if(isOpen === false){
            console.log(question);
            switch(question){
                case "questionmark questionmark--word": 
                text = "Het thema van het Memento Woordfestival is dit jaar “Verdwalen”. We vragen ons af wat verdwalen betekent voor jou.";
                break;
                case "questionmark questionmark--feeling": 
                text = "Laat de mensen op het festival weten hoe je je voelt. De emotie die jij kiest zal mee in De Letterdoos vallen.";
                break;
                case "questionmark questionmark--challenge": 
                text = "Staat jouw letter er niet bij? Dan moet je even wachten op beurt! Terwijl je wacht kan je even een highfive of een hartje sturen.";
                break;
                case "questionmark questionmark--live": 
                text = "Alles wat je ziet is live aan het gebeuren op het festival. Jij en de rest van de online community bepaalt wat er in de letterdoos komt. Bekijk de opties rechts en bespeel De Letterdoos!";
               // top = 0;
                //right = "70%";
                
                break;
            }
            
            $popupWord.style.top = `${top}px`;
            $popupWord.style.left = `${right}px`;
            $popupWord.style.animation = "appear 1s ease";
            $popupWord.style.opacity = "1";
            $popupWord.style.zIndex = "5";
           // $popupWord.style.display = "block";
            $popupText.textContent = text;
            isOpen = true;
        }else{
            $popupWord.style.animation = "disappear 1s ease";
            $popupWord.style.opacity = "0";
            $popupWord.style.zIndex = "0";
            isOpen = false;
           // $popupWord.style.display = "none";
        }
       
    }
    const init = () => {
        $questionmarks.forEach(questionmark => {
            questionmark.addEventListener('click', handleClickQuestionmark);
            //questionmark.addEventListener('touch', handleClickQuestionmark);
        });
        window.addEventListener('click', handleClickWindow);
       // window.addEventListener('touch', handleClickWindow);
    }
    init();
}