{
    const $popupWord = document.querySelector(`.popup--word`);
    const $popupText = document.querySelector(`.popup__text`);
    const $questionmarks = document.querySelectorAll(`.questionmark`);
    let isOpen = false;


    const handleClickWindow = e => {
        if(e.target.classList[0] !== "questionmark"){

            if(isOpen === false){


            }
            else{
                if(isOpen === true){
                    $popupWord.style.animation = "disappear 1s ease";
                    $popupWord.style.opacity = "0";
                    $popupWord.style.zIndex = "7";
                    $popupWord.style.position = "absolute";
                    isOpen = false;

                }
            }

        }

    }

    const handleClickQuestionmark = e => {
        const question = e.currentTarget.classList.value;
        let text = "";
        const top = e.currentTarget.getBoundingClientRect().bottom;
        const right = e.currentTarget.getBoundingClientRect().right - 210;


        if(isOpen === false){
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
                text = "Alles wat je ziet is live aan het gebeuren op het festival. Jij en de rest van de online community bepaalt wat er in De Letterdoos komt. Bekijk de opties rechts en bespeel De Letterdoos!";

                break;
            }

            $popupWord.style.top = `${top}px`;
            $popupWord.style.left = `${right}px`;
            $popupWord.style.animation = "appear 1s ease";
            $popupWord.style.opacity = "1";
            $popupWord.style.zIndex = "5";
            $popupText.textContent = text;
            isOpen = true;
        }
        else{
            $popupWord.style.animation = "disappear 1s ease";
            $popupWord.style.opacity = "0";
            $popupWord.style.zIndex = "0";
            isOpen = false;
        }

    }
    const init = () => {
        $questionmarks.forEach(questionmark => {
            questionmark.addEventListener('click', handleClickQuestionmark);
        });
        window.addEventListener('click', handleClickWindow);
    }
    init();
}
