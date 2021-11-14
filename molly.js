const canvas = document.getElementById('game');

let Levels = require('./levels');

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
        ctx.restore();
    
        // Orient Molly left/right/up/down
        if (molly.velocity[0]) {
          (molly.velocity[0] > 0 ? molly.heading = "right" : molly.heading = "left");
        }
        else if (molly.velocity[1]) {
          (molly.velocity[1] > 0 ? molly.heading = "down" : molly.heading = "up");
        }
    
        // Stop Molly if she runs into the wall
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

        // Only move Molly if she's not bumping into the maze
        let collision = this.checkWallCollision();
        if (!collision) {
            this.position[0] += this.velocity[0];
            this.position[1] += this.velocity[1];
        } else if (collision == "h") {
            // console.log(this.checkWallCollision());
            this.velocity[0] = 0;
        } else if (collision == "v") {
            this.velocity[1] = 0;
        }
    }
    runTo(x, y) {
        let _this = this;
        let intr = setInterval(function() {
            _this.position[0] += -Math.sign(_this.position[0] - x);
            _this.position[1] += -Math.sign(_this.position[1] - y);
            if (_this.position[0] == x && _this.position[1] == y) {clearInterval(intr)};
        }, 5)
    }
    
    step = 2;
    moveMolly(e) {
        if (e.key == "ArrowLeft") {
            this.velocity[0] = -this.step;
        }
        else if (e.key == "ArrowRight") {
            this.velocity[0] = this.step;
        }
        else if (e.key == "ArrowUp") {
            this.velocity[1] = -this.step;
        }
        else if (e.key == "ArrowDown") {
            this.velocity[1] = this.step;
        }
    }
    stopMolly(e) {
        if (e.repeat == false) {
            if (e.key == "ArrowLeft") {
                this.velocity[0] = 0;
            }
            else if (e.key == "ArrowRight") {
                this.velocity[0] = 0;
            }
            else if (e.key == "ArrowUp") {
                this.velocity[1] = 0;
            }
            else if (e.key == "ArrowDown") {
                this.velocity[1] = 0;
            }
        }
    }
    checkWallCollision() {
        let wallpts = Levels[0].wallpaths.flat();
        let threshold = 20;
        for (let wallpt of wallpts) {
            let dx = this.position[0] + this.velocity[0] - wallpt[0];
            let dy = this.position[1] + this.velocity[1] - wallpt[1];
            if ( Math.sqrt( dx**2 + dy**2 ) < threshold ){
                let angle = Math.atan2(dy, dx);
                if ((angle > Math.PI/4 && angle < 3*Math.PI/4) || (angle < -Math.PI/4 && angle > -3*Math.PI/4)) {
                    return "v";
                } else {
                    return "h"
                }
                // return true;
            }
        }
        return false;
    }
}

module.exports = Molly;
