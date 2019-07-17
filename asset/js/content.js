
let last_known_scroll_position = 0;
let ticking = false;
let once =true;
let second =true;

$(document).ready(
  function(){
    window.addEventListener('scroll', function(e) {
    last_known_scroll_position = window.scrollY;

    if (!ticking) {
      window.requestAnimationFrame(function() {
        doSomething(last_known_scroll_position);
        ticking = false;
      });

      ticking = true;
    }
  });

  function doSomething(scroll_pos) {
      var img =document.getElementById("profile_img");
      var menu = document.getElementById("second_menu");
        if(scroll_pos>300 && once){
            img.classList.add('horizTranslate');
            once= false;
        }
        if(scroll_pos>800 && second){
             //menu.style.display = "flex";
             second = false;
        }else if (scroll_pos<800 && !second){
             //menu.style.display = "none"
             second = true;
        }
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
            element.innerHTML ="Developer Of Anything";
            fadein(element);
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


});