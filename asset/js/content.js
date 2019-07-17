

let last_known_scroll_position = 0;
let ticking = false;
let once =true;


    function doSomething(scroll_pos) {
    var img =document.getElementById("profile_img");
    if(scroll_pos>300 && once){
        console.log("hit");
        fadein(img);
        img.classList.add('horizTranslate');
        once= false;
    }
    }

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

function fadein(element) {
    var op = 0.1;  // initial opacity
    element.style.display = 'block';
    var timer = setInterval(function () {
        if (op >= 1){
            clearInterval(timer);
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += op * 0.2;
    }, 8);
}