import {DINO} from "./dino.js";
import {cactus} from "./cactus.js";

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

function runFrame() {
  requestAnimationFrame(runFrame);

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  DINO.x++;
  DINO.draw(ctx);

}

cactus.draw(ctx);

runFrame();
