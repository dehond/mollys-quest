var spotlight = require('./spotlight');
var Typewriter = require('typewriter-effect');
var molly = require('./molly');
var Levels = require('./levels');
var dialog = require('./dialogControl');

const canvas = document.getElementById('game');

let width = window.innerWidth;
let height = window.innerHeight;

canvas.width = width;
canvas.height = height;
const ctx = canvas.getContext('2d');

let img1 = new Image();
let img2 = new Image();
img1.src = 'molly1-pixel.png';
img2.src = 'molly2-pixel.png';


window.requestAnimationFrame(animate);

function animate() {
    ctx.fillStyle = '#292929';
    ctx.fillRect(0, 0, width, height);
    if (molly.visible) {
        molly.drawMolly();
    }
    Levels[molly.currentLevel].drawLevel(ctx);
    window.requestAnimationFrame(animate);
}


document.onkeydown = molly.moveMolly.bind(molly);
document.onkeyup = molly.stopMolly.bind(molly);
window.onresize = function() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
}

// window.spotlight = spotlight;
window.molly = molly;
molly.runTo(100, 100);
molly.inlevel = true;
// window.startLevel = startLevel;
// Levels[0].startLevel();
// Levels[0].drawWall(ctx);