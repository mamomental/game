import {DINO} from "./dino.js";
import {CACTUS} from "./cactus.js";

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

var timer = 0;
var cactusArray = [];
function runFrame() {
  requestAnimationFrame(runFrame);
  timer++;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (timer % 120 === 0) {
    cactusArray.push(new Cactus());
  }
  cactusArray.forEacch((a)=> {
    a.x--;
    a.draw();
  });
  
  DINO.draw(ctx);
}

runFrame();
