{
    const $popupWord = document.querySelector(`.popup--word`);
    const $popupText = document.querySelector(`.popup__text`);
    const $questionmarks = document.querySelectorAll(`.questionmark`);
    let isOpen = 0;


    const handleClickWindow = e => {
 
        if(e.target.classList[0] !== "questionmark"){
          
            if(isOpen % 2 == 0){
               
              
            }else{
                if(isOpen !== 0){
                    console.log("windows")
                    $popupWord.style.display = "none";
                    isOpen++; 
                }
            }
    
        }
        
    }

    const handleClickQuestionmark = e => {
        const question = e.currentTarget.classList.value;
        let text = "";
       

        if(isOpen % 2 == 0){
            switch(question){
                case "questionmark questionmark--word": 
                text = "Het thema van het festival is dit jaar “verdwalen”. Wij vroegen ons af wat verdwalen betekent voor jou.";
                break;
                case "questionmark questionmark--feeling": 
                text = "Laat de mensen op het festival weten hoe je je voelt. De emotie die jij kiest zal mee in de letterdoos vallen.";
                break;
                case "questionmark questionmark--challenge": 
                text = "Staat jouw letter er niet bij? Dan moet je even wachten! Je kan terwijl even zwaaien of een hartje sturen.";
                break;
            }


            $popupWord.style.display = "block";
            $popupText.textContent = text;
        }else{
            $popupWord.style.display = "none";
        }
        isOpen++;
    }
    const init = () => {
        $questionmarks.forEach(questionmark => {
            questionmark.addEventListener('click', handleClickQuestionmark);
        });
        window.addEventListener('click', handleClickWindow);
    }
    init();
}