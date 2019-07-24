
let last_known_scroll_position = 0;
let ticking = false;
let newPos = 0;
let once =true;

$(document).ready(
  function(){
    var n = document.getElementsByClassName("progress");
    var percent_final = document.getElementsByClassName("percent_answer");
    var percent_bar = document.getElementsByClassName("percent_bar")
    var skills = document.getElementById("skills");
    let profile_image = document.getElementById("profile_img");


    //function that runs all the time
    animateImage(profile_image);

    // function that runs only when scroll
    window.addEventListener('scroll', function(event) {
    last_known_scroll_position = this.scrollY;
    
    if (!ticking) {
      window.requestAnimationFrame(function() {
        animateProfile(last_known_scroll_position);
        animateProcessBar(last_known_scroll_position);
        animateMenu(last_known_scroll_position); // check if the user is scolling up
        
        ticking = false;
      });
      ticking = true;
    }
  },false);


  function animateImage(elem){
    let images= ["./asset/img/profile1.png"], index = 0;

    function changeImage()
    {
     
     $("#profile_img").fadeOut(1000,function(){
      elem.setAttribute("src",images[index]);
      $("#profile_img").fadeIn(500);
     });
     
     
      index++;
      if(index >= images.length)
      {
        index=0;
      }
    }
  setInterval(changeImage, 8000);
}

  function animateMenu(position){
    var oldPos = position;
      if(oldPos - newPos < 0){
        document.getElementById("menu").style.top = "0%";
      } else if(oldPos - newPos > 0){
        document.getElementById("menu").style.top = "-10%";
      }
    newPos = oldPos;
  }

  function animateProfile(position){
    if(position>=370){
      document.getElementById("profile_left_container").classList.add('bounceInLeft'); // animate profile left
      document.getElementById("profile_right_container").classList.add('bounceInRight');// animate profile right
  }
}

  function animateProcessBar(position) {
    if(position>=370 && once){
      fadein(skills)
      for(var i =0;i<n.length;i++){    
        // go through each progess bar and animate it
        processBar(percent_final,percent_bar,i);
    }  
    once =false; 
  }
}
  
});
/*
* A method that take in process bar and animate
*/
  function processBar(bar,element,number){
    var p =0;
    var intValue = parseInt(bar[number].innerHTML); 
    var timer = setInterval(function () {
      if (intValue<p){
        clearInterval(timer);
      }
        bar[number].innerHTML = p+"%";
        element[number].style.width = p +"%";
        p++;
      },1);
  }

  function fadein(element) {
      var op = 0.1;  // initial opacity
      var timer = setInterval(function () {
          if (op >= 1){
              clearInterval(timer);
          }
          element.style.opacity = op;
          element.style.filter = 'alpha(opacity=' + op * 100 + ")";
          op += op * 0.3;
      }, 100);
  }
  function fadeout(element) {
    var op = 1;  // initial opacity
    var timer = setInterval(function () {
        if (op <= 0){
            //element
            //fadein(element);
            clearInterval(timer);
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -=.5 ;
        console.log(op);
    }, 100);
}


  // changing word
  //var dev = document.getElementById('dev');
  //dev.onmouseover = function(){
    //fadeout(dev);
    //fadein(dev);
  //}
  //dev.onmouseout = function(){
  //  dev.innerHTML = "Full Stack Developer";
  //  fadeout(dev);
  //}
