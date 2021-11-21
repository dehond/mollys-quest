var spotlight = require('./spotlight');
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
    sptl = new Path2D(); // This will be the clip path of the spotlight
    inlevel = false;
    currentLevel = 0;
    drawMolly() {
        this.sptl = new Path2D();
        this.sptl.moveTo(spotlight.radius*spotlight.pts[0][0] + this.position[0], spotlight.radius*spotlight.pts[0][1] + this.position[1]);
        for (let i = 1; i < spotlight.pts.length; i++){
            this.sptl.lineTo(spotlight.radius*spotlight.pts[i][0] + this.position[0], spotlight.radius*spotlight.pts[i][1] + this.position[1]);
        }
        this.sptl.closePath();
        ctx.save();
        ctx.clip(this.sptl);
        ctx.fillStyle = '#a3a3a3';
        ctx.fillRect(0, 0, width, height);
        ctx.restore();
    
        ctx.save();
        ctx.clip(this.sptl);
        ctx.translate(this.position[0], this.position[1]);
        if (this.heading == "right") {
            ctx.scale(-this.scale, this.scale);
        }
        else if (this.heading == "down") {
          ctx.scale(-this.scale, this.scale);
          ctx.rotate(-Math.PI/2);
        }
        else if (this.heading == "up") {
          ctx.scale(this.scale, this.scale);
          ctx.rotate(Math.PI/2);
        }
        else {
          ctx.scale(this.scale, this.scale);
        }
        ctx.drawImage(this.sprite, -this.sprite.width/2, -this.sprite.height/2);
        if (this.velocity[0] || this.velocity[1]){
            this.movecounter += 1;
            if (this.movecounter % 10 == 0) {
                (this.sprite == img1) ? (this.sprite = img2) : (this.sprite = img1);
            }
        }
        ctx.restore();
    
        // Orient this left/right/up/down
        if (this.velocity[0]) {
          (this.velocity[0] > 0 ? this.heading = "right" : this.heading = "left");
        }
        else if (this.velocity[1]) {
          (this.velocity[1] > 0 ? this.heading = "down" : this.heading = "up");
        }
        
        if (this.inlevel) {
            // Stop Molly if she runs into the wall
            if ( (this.position[0] - this.boundingBox[0]/4) <= 0 && this.velocity[0] < 0 ) {
                this.velocity[0] = 0;
            } else if ( (this.position[0] + this.boundingBox[0]/4) >= width && this.velocity[0] > 0 ) {
                this.velocity[0] = 0;
            }
            if ( (this.position[1] - this.boundingBox[1]/4) <= 0 && this.velocity[1] < 0 ) {
                this.velocity[1] = 0;
            } else if ( (this.position[1] + this.boundingBox[1]/4) >= height && this.velocity[1] > 0 ) {
                this.velocity[1] = 0;
            }

            // Only move Molly if she's not bumping into the maze
            let collision = this.checkWallCollision();
            if (!collision) {
                this.position[0] += this.velocity[0];
                this.position[1] += this.velocity[1];
            } else if (collision == "h") {
                this.velocity[0] = 0;
            } else if (collision == "v") {
                this.velocity[1] = 0;
            }

            // Has Molly found the treasure yet?
            this.checkTreasureFound();
        }
    }
    runTo(x, y) {
        let _this = this;
        let intr = setInterval(function() {
            _this.position[0] += -Math.sign(_this.position[0] - x);
            _this.position[1] += -Math.sign(_this.position[1] - y);
            if (_this.position[0] == x && _this.position[1] == y) {clearInterval(intr)};
        }, 1)
    }
    
    step = 4;
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
        let wallpts = Levels[this.currentLevel].wallpaths.flat();
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
            }
        }
        return false;
    }
    checkTreasureFound() {
        let dx = this.position[0] - Levels[this.currentLevel].treasureLocation[0];
        let dy = this.position[1] - Levels[this.currentLevel].treasureLocation[1];
        if (Math.sqrt(dx**2 + dy**2) < 20) {
            Levels[this.currentLevel].finishLevel();
            this.inlevel = false;
            return true;
        }
        else return false;
    }
}

let molly = new Molly();
molly.drawMolly();
module.exports = new Molly();
let Levels = require('./levels');