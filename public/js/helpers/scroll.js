{
    let last_known_scroll_position = 0;
    let ticking = false;
    let lastScrollTop = 0;
    let anchorPos = 0;
    let isFired = false;
    let isTimedOut = false;
    
   /* function doSomething(scroll_pos) {
      // Do something with the scroll position
    }
    
    document.addEventListener('scroll', function(e) {
      last_known_scroll_position = window.scrollY;
    
      if (!ticking) {
          console.log("one scroll")
        window.requestAnimationFrame(function() {
          doSomething(last_known_scroll_position);
          ticking = false;
        });
    
        ticking = true;
      }
    });*/



       

    const handleScrollEvent = e => {

         if(isFired === false){

            isFired = true;
            var st = window.pageYOffset || document.documentElement.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
        if (st > lastScrollTop){
           // downscroll code
           if(anchorPos >= 1){
               anchorPos = 1;
           }else{
               anchorPos++;
           }
           changeAnchorView();
         
         
        } else{
           // upscroll code
           if(anchorPos <= 0){
            anchorPos = 0;
        }else{
            anchorPos--;
        }
        changeAnchorView();
        }


    

        lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
        last_known_scroll_position = window.scrollY;
    }
    else{
        e.preventDefault();
        if(isTimedOut === false){
            isTimedOut = true;
            setTimeout(function(){ 
                console.log("timeout")
                isTimedOut = false;
                isFired = false;
            }, 1000);
    }

    }
     }


       


       
const changeAnchorView = () => {
    console.log(anchorPos)
  
    switch(anchorPos){
        case 0: document.getElementById("intro").scrollIntoView();break;
        case 1: document.getElementById("bottomblock").scrollIntoView();break;
    }
}

const init = () => {
    document.addEventListener('scroll', handleScrollEvent);
}
    init();
}