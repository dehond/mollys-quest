class Spotlight {
    maxradius = 70;
    radius = 0;
    pts =[...Array(500).keys()].map( (i) => [Math.floor(14*Math.cos(2*i*Math.PI/500 + 0.0001))/14, Math.floor(14*Math.sin(2*i*Math.PI/500 + 0.0001))/14] );
    showSpotlight() {
        let _this = this;
        _this.radius = 0;
        let intr = setInterval(function() {
            _this.radius += 10;
            if (_this.radius >= _this.maxradius) {
                clearInterval(intr);
            }
        }, 300)
    }
}

let spotlight = new Spotlight();
window.spotlight = spotlight;

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
    Levels[0].drawLevel(ctx);
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
// window.startLevel = startLevel;
// Levels[0].startLevel();
// Levels[0].drawWall(ctx);