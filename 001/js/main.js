import {DINO} from "./dino.js";
import {CACTUS} from "./cactus.js";

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;
DINO.draw(ctx);
CACTUS.draw(ctx);
