import Agent from "./agent.js"
import Flock from "./flock.js"

var canvas = document.getElementById("canvas"); 
var ctx = canvas.getContext("2d"); 

let x, y;

window.addEventListener('resize', resizeCanvas, false);

resizeCanvas();

document.onmousemove = handleMouseMove;

function handleMouseMove(event){
    x = event.clientX;
    y = event.clientY;
}

function resizeCanvas(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

let flock = new Flock();

flock.generate(400, canvas.width, canvas.height);

function mainLoop(timestamp){

    ctx.fillStyle = "#225f9f";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    flock.update();
    flock.move();
    flock.draw(ctx);

    requestAnimationFrame(mainLoop);

}

mainLoop();