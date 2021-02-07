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
                    $popupWord.style.animation = "disappear 1s ease";
                    $popupWord.style.opacity = "0";
                    isOpen++; 
                }
            }
    
        }
        
    }

    const handleClickQuestionmark = e => {
        console.log(e.currentTarget.getBoundingClientRect());
        const question = e.currentTarget.classList.value;
        let text = "";
        const top = e.currentTarget.getBoundingClientRect().top;
        const right = e.currentTarget.getBoundingClientRect().left;
       

        if(isOpen % 2 == 0){
            console.log(question);
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
                case "questionmark questionmark--live": 
                text = "Alles wat je ziet in De Letterdoos is live aan het gebeuren. Jij en de community bepalen wat er in De Letterdoos komt. ";
               // top = 0;
                //right = "70%";
                
                break;
            }
            
            $popupWord.style.top = `${top}px`;
            $popupWord.style.left = `${right}px`;
            $popupWord.style.animation = "appear 1s ease";
            $popupWord.style.opacity = "1";
           // $popupWord.style.display = "block";
            $popupText.textContent = text;
        }else{
            $popupWord.style.animation = "disappear 1s ease";
            $popupWord.style.opacity = "0";
           // $popupWord.style.display = "none";
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