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

class Molly {
    position = [250, height/2];
    boundingBox = [200, 150];
    velocity = [0, 0];
    sprite = img1;
    movecounter = 0;
    heading = "left";
    scale = 0.5;
    visible = true;
    drawMolly() {
        let sptl = new Path2D();
        sptl.moveTo(spotlight.radius*spotlight.pts[0][0] + molly.position[0], spotlight.radius*spotlight.pts[0][1] + molly.position[1]);
        for (let i = 1; i < spotlight.pts.length; i++){
            sptl.lineTo(spotlight.radius*spotlight.pts[i][0] + molly.position[0], spotlight.radius*spotlight.pts[i][1] + molly.position[1]);
        }
        sptl.closePath();
        ctx.save();
        ctx.clip(sptl);
        ctx.fillStyle = '#a3a3a3';
        ctx.fillRect(0, 0, width, height);
        ctx.restore();
    
        ctx.save();
        ctx.clip(sptl);
        ctx.translate(molly.position[0], molly.position[1]);
        if (molly.heading == "right") {
            ctx.scale(-molly.scale, molly.scale);
        }
        else if (molly.heading == "down") {
          ctx.scale(-molly.scale, molly.scale);
          ctx.rotate(-Math.PI/2);
        }
        else if (molly.heading == "up") {
          ctx.scale(molly.scale, molly.scale);
          ctx.rotate(Math.PI/2);
        }
        else {
          ctx.scale(molly.scale, molly.scale);
        }
        ctx.drawImage(molly.sprite, -molly.sprite.width/2, -molly.sprite.height/2);
        if (molly.velocity[0] || molly.velocity[1]){
            molly.movecounter += 1;
            if (molly.movecounter % 10 == 0) {
                (molly.sprite == img1) ? (molly.sprite = img2) : (molly.sprite = img1);
            }
        }
        // ctx.strokeStyle = "red";
        // ctx.strokeRect(-molly.boundingBox[0]/2, -molly.boundingBox[1]/2, molly.boundingBox[0], molly.boundingBox[1]);
        ctx.restore();
    
        if (molly.velocity[0]) {
          (molly.velocity[0] > 0 ? molly.heading = "right" : molly.heading = "left");
        }
        else if (molly.velocity[1]) {
          (molly.velocity[1] > 0 ? molly.heading = "down" : molly.heading = "up");
        }
    
        if ( (molly.position[0] - molly.boundingBox[0]/4) <= 0 && molly.velocity[0] < 0 ) {
            molly.velocity[0] = 0;
        } else if ( (molly.position[0] + molly.boundingBox[0]/4) >= width && molly.velocity[0] > 0 ) {
            molly.velocity[0] = 0;
        }
        if ( (molly.position[1] - molly.boundingBox[1]/4) <= 0 && molly.velocity[1] < 0 ) {
            molly.velocity[1] = 0;
        } else if ( (molly.position[1] + molly.boundingBox[1]/4) >= height && molly.velocity[1] > 0 ) {
            molly.velocity[1] = 0;
        }
        molly.position[0] += molly.velocity[0];
        molly.position[1] += molly.velocity[1];
    }
    runTo(x, y) {
        let _this = this;
        let intr = setInterval(function() {
            _this.position[0] += -Math.sign(_this.position[0] - x);
            _this.position[1] += -Math.sign(_this.position[1] - y);
            if (_this.position[0] == x && _this.position[1] == y) {clearInterval(intr)};
        }, 5)
    }
}

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

let molly = new Molly();
let spotlight = new Spotlight();

startLevel(1);

window.requestAnimationFrame(animate);

function animate() {
    ctx.fillStyle = '#292929';
    ctx.fillRect(0, 0, width, height);
    if (molly.visible) {
        molly.drawMolly();
    }
    window.requestAnimationFrame(animate);
}

let step = 2;
function moveMolly(e) {
    if (e.key == "ArrowLeft") {
        molly.velocity[0] = -step;
    }
    else if (e.key == "ArrowRight") {
        molly.velocity[0] = step;
    }
    else if (e.key == "ArrowUp") {
        molly.velocity[1] = -step;
    }
    else if (e.key == "ArrowDown") {
        molly.velocity[1] = step;
    }
}

function stopMolly(e) {
    if (e.repeat == false) {
        if (e.key == "ArrowLeft") {
            molly.velocity[0] = 0;
        }
        else if (e.key == "ArrowRight") {
            molly.velocity[0] = 0;
        }
        else if (e.key == "ArrowUp") {
            molly.velocity[1] = 0;
        }
        else if (e.key == "ArrowDown") {
            molly.velocity[1] = 0;
        }
    }
}

function startLevel(num) {
    if (num == 1) {
        molly.heading = "right";
        molly.position = [100, 100];
        spotlight.showSpotlight();
    }
}

document.onkeydown = moveMolly;
document.onkeyup = stopMolly;
window.onresize = function() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
}