$(document).ready(function(){
    var canvas;
    var ctx;
    var particles = [];
    var num_particles = window.innerWidth/9;
    var mouse = {
        x: undefined,
        y: undefined
    }
    var canvasW = $('#intro_section').width();
    var canvasH = $('#intro_section').height();
    var onCanvas = true;

    window.onload = function() {
        init();
    };

    //window.addEventListener('mousemove', mousePosition);
    //canvas.addEventListener('mouseout', mouseOut);
    //window.addEventListener('scroll', mouseOut);
    //window.addEventListener('mouseenter', mousePosition);
    window.addEventListener('resize', resizeCanvas);


    /*
    * Get mouse position
    */
    function mousePosition(event) {
        onCanvas =true;
        mouse.x = event.pageX;
        mouse.y = event.pageY;
    }
    /*
    * Cancel mouse postion
    */
    function mouseOut(){
        onCanvas =false;
    }

    /*
    * Start the program
    */
    function init(){
        canvas = document.getElementById("canvas");
        ctx = canvas.getContext("2d");
        //canvas.addEventListener('mousemove', mousePosition); // doesn't work
        canvas.width = canvasW;
        canvas.height = canvasH;
        canvas.addEventListener('mousemove', mousePosition);
        canvas.addEventListener('mouseout', mouseOut);
        //canvas.addEventListener('resize', resizeCanvas);
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
            this.vx = Math.random()*1.2;
        }else{
            this.vx = Math.random()*-1.2;
        }
    
        if(Math.random() >= 0.5){
            this.vy = Math.random()*1.2;
        }else{
            this.vy = Math.random()*-1.2;
        }

        this.Color = "#3a506b";
        this.radius = 2.5;

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

            if(particles[i].distanceBetween(mouse)<140 && onCanvas){
                connect(particles[i],mouse,particles[i].distanceBetween(mouse),mouse);
            }
            for (var j = i+1; j < num_particles; j++) {
                if(particles[i].distanceBetween(particles[j])<105){
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
    {   canvasW = $('#intro_section').width();
        canvasH = $('#intro_section').height();
        canvas.width = canvasW;
        canvas.height = canvasH;
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
});