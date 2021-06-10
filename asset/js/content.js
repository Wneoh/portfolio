
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

    // close burger menu if a link is clicked

    var linkMenu = document.getElementById("myLinks");
    linkMenu.classList.add("active");
    var burgerIcon = document.getElementById("burger-icon");
    burgerIcon.addEventListener("click", function(e){
      var linkMenu = document.getElementById("myLinks");
      var allLinks = document.querySelectorAll(".topnav #myLinks a");
      var linkHeight = allLinks[0].offsetHeight;
      var numOfLinks = allLinks.length;
      if(linkMenu.classList.contains("active")){
        linkMenu.style.height = (linkHeight*numOfLinks) +"px";
        linkMenu.classList.remove("active");
      }else{
        linkMenu.style.height = "0px";
        linkMenu.classList.add("active");
      }
    });

    // burger action
    var allLinks = document.querySelectorAll(".link");
    allLinks.forEach(function(elem) {
      elem.addEventListener("click", function() {
        burgerIcon.click();
      });
  });
    window.addEventListener('click', function(event) {
      if (event.target.id == "canvas") {
        linkMenu.style.height = "0px";
        linkMenu.classList.add("active");
      }
    },false);
    // function that runs only when scroll
    window.addEventListener('scroll', function(event) {
    last_known_scroll_position = this.scrollY;

    if (last_known_scroll_position > 620 ) {
      document.getElementById("menu").style.backgroundColor = "#0B132B";
      console.log(document.getElementById("menu"));
    }else{
      document.getElementById("menu").style.backgroundColor = "";
    }
  },false);

// Work Modal section

var img = document.getElementsByClassName("work-img");
var description = document.getElementsByClassName("description");
var modal,modal_pic,caption;
for (var i = 0; i < img.length; i++) {
      img[i].onclick = function(){
        menu = document.getElementById("menu");
        menu.style.display = 'none';
        modal = this.parentElement.parentElement.getElementsByClassName('modal');
        modal_pic = this.parentElement.parentElement.getElementsByClassName('modal-pic');
        caption = this.parentElement.parentElement.getElementsByClassName('caption');
        modal[0].style.display = "flex";
        modal_pic[0].src = this.src;
        $("body").css("position","fixed");
  }
}

var span = document.getElementsByClassName("close");
for (var i = 0; i < span.length; i++) {
      span[i].onclick = function() {
        menu = document.getElementById("menu");
        menu.style.display = '';
        modal1 = this.parentElement;
        modal1.style.display = "none";
        $("body").css("position","relative");
    }
  }
});



