import {DINO} from "./dino.js";

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;
console.log("test start");
DINO.draw();
console.log("test end");
