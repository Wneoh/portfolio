var canvas;
var ctx;
var particles = [];
var num_particles = 200;
var mouse = {
    x: undefined,
    y: undefined
}

window.onload = function() {
    init();
};

window.addEventListener('mousemove', mousePosition);
window.addEventListener('resize', resizeCanvas);


$("canvas").mouseleave(function () { // if mouse leave the window, then reset the position
    mousePosition('mousemove');
});
/*
* Get mouse position
*/
function mousePosition(event) {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
}

/*
* Start the program
*/
function init(){
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    start();
};

/*
* start create particles
*/
function start(){
    for (var i = 0; i < num_particles; i++){
        particles.push(new Particle());
       
    }
    loop();
}

/*
* Particle Object
*/
var Particle = function () {
    this.x = canvas.width * Math.random();
    this.y = canvas.height * Math.random();
   
    if(Math.random() >= 0.5){
        this.vx = Math.random()*2;
    }else{
        this.vx = Math.random()*-2;
    }
   
    if(Math.random() >= 0.5){
        this.vy = Math.random()*2;
    }else{
        this.vy = Math.random()*-2;
    }

    this.Color = "#5C6B73";
    this.radius = 3;

    this.draw = function () {
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = this.Color;
        ctx.fill();
    };

    /*
    * check if it's out of boundary
    */
    this.update = function () {
        this.x += this.vx;
        this.y += this.vy;
 
       
        if (this.x<0 || this.x > canvas.width){
            this.vx = -this.vx;
        }
   
        if (this.y < 0 || this.y > canvas.height){
            this.vy = -this.vy;
        }
    };
    /*
    * get distance between
    */
    this.distanceBetween = function(p){
    var dx = this.x -p.x;
    var dy = this.y -p.y;

    return Math.sqrt(dx * dx + dy * dy);
    };
}

/*
* loop to get condition
*/
function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for(var i = 0;i<num_particles;i++){
        particles[i].draw();
        particles[i].update();

        if(particles[i].distanceBetween(mouse)<200){
            connect(particles[i],mouse,particles[i].distanceBetween(mouse),mouse);
        }
        for (var j = 0; j < num_particles; j++) {
            if(particles[i].distanceBetween(particles[j])<120){
                connect(particles[i],particles[j],particles[i].distanceBetween(particles[j]));
            }
        }
    }
    requestAnimationFrame(loop);
}

/*
* resize canvas
*/
function resizeCanvas()
{  
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    for(var i = 0;i<num_particles;i++){
        particles[i].draw();
    }
}


/*
* connect two point with line
*/
function connect(fp,sp,distance,object){
    if(object ===mouse){
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(92, 107, 115,2.5)';
        ctx.moveTo(fp.x, fp.y); // begin at position (fp.x,fp.y)
        ctx.lineTo(sp.x, sp.y); // ends at position (sp.x,sp.y)
        ctx.stroke();
        ctx.closePath();
    }else{
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(92, 107, 115,'+Math.min(20/distance,1)+')';
        ctx.moveTo(fp.x, fp.y); // begin at position (fp.x,fp.y)
        ctx.lineTo(sp.x, sp.y); // ends at position (sp.x,sp.y)
        ctx.stroke();
        ctx.closePath();
    }
}