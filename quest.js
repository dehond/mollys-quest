var Typewriter = require('typewriter-effect');
var Molly = require('./molly');
require('./dialogControl');

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

class Spotlight {
    maxradius = 70;
    radius = 70;
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

let molly = new Molly();
let spotlight = new Spotlight();

window.requestAnimationFrame(animate);

function animate() {
    ctx.fillStyle = '#292929';
    ctx.fillRect(0, 0, width, height);
    if (molly.visible) {
        molly.drawMolly();
    }
    window.requestAnimationFrame(animate);
}


function startLevel(num) {
    if (num == 1) {
        molly.heading = "right";
        molly.position = [100, 100];
        spotlight.showSpotlight();
    }
}

document.onkeydown = molly.moveMolly.bind(molly);
document.onkeyup = molly.stopMolly.bind(molly);
window.onresize = function() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
}

window.spotlight = spotlight;
window.molly = molly;
window.startLevel = startLevel;