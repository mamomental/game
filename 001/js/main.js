import {DINOMANAGER} from "./dino.js";
import {CACTUSMANAGER} from "./cactus.js";

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

var timer = 0;

function runFrame() {
  requestAnimationFrame(runFrame);
  timer++;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  DINOMANAGER.draw(ctx, timer);
  CACTUSMANAGER.draw(ctx);
}

runFrame();
