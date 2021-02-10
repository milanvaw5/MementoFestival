{
   const $emotics = document.querySelectorAll(`.emotics__label`);
   const $blij = document.querySelector(`.blij`);
   const $somber = document.querySelector(`.somber`);
   const $giechelig = document.querySelector(`.giechelig`);
   const $afgemat = document.querySelector(`.afgemat`);


   const handleClickEmotic = e => {
    
       const feeling = e.currentTarget.textContent.replace(/\s/g,'').toLowerCase();
       console.log(feeling);
       $blij.style.backgroundImage = `url(../assets/img/emotics/happy.svg)`;
       $somber.style.backgroundImage = `url(../assets/img/emotics/sad.svg)`;
       $giechelig.style.backgroundImage = `url(../assets/img/emotics/quirky.svg)`;
       $afgemat.style.backgroundImage = `url(../assets/img/emotics/tired.svg)`;
       
       const emoticImg = document.querySelector(`.${feeling}`); 
       switch(feeling){
           case "blij": emoticImg.style.backgroundImage = `url(../assets/img/emotics/happyco.png)`;break;
           case "somber": emoticImg.style.backgroundImage = `url(../assets/img/emotics/sadco.png)`;break;
           case "giechelig": emoticImg.style.backgroundImage = `url(../assets/img/emotics/quirkyco.png)`;break;
           case "afgemat": emoticImg.style.backgroundImage = `url(../assets/img/emotics/tiredco.png)`;break;
       }
     
   }

   const init = () => {
    $emotics.forEach(item => {
        item.addEventListener('click', handleClickEmotic);
    })
   }
   
   
   
    init();
}