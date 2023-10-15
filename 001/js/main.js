import {DINOMANAGER} from "./dino.js";
import {CACTUSMANAGER} from "./cactus.js";

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

var timer = 0;
var cactusArray = [];
function runFrame() {
  requestAnimationFrame(runFrame);
//  timer++;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

//  if (timer % 120 === 0) {
//    cactusArray.push(new Cactus());
//  }
//  cactusArray.forEach((a)=> {
//    a.x--;
//    a.draw(ctx);
//  });
  
  DINOMANAGER.draw(ctx);
  CACTUSMANAGER.draw(ctx);
}

runFrame();
