let width = window.innerWidth;
let height = window.innerHeight;

class Level {
    // Wall defined as [x0, y0, width, height] where they're all between 0 and 100
    constructor(walls, treasureImgPath, treasureLocation) {
        this.walls = walls;
        this.wallpaths = [];
        this.buildWalls();
        this.treasureImg = new Image();
        this.treasureImg.src = treasureImgPath;
        this.treasureLocation = treasureLocation;
    }
    buildWalls() {
        for (let wall of this.walls) {
            let wallpoints = [];
            let dx = wall[2];
            let dy = wall[3];
            let npts = 40;
            for (let i = 0; i <= npts; i++) {
                wallpoints.push( [ width/100 * (wall[0] + dx*i/npts), height/100 * ( wall[1] + dy*i/npts ) ] );
            }
            this.wallpaths.push(wallpoints);
        }
    }
    drawLevel(ctx) {
        this.drawWall(ctx);
        this.drawTreasure(ctx);
    }
    drawWall(ctx) {
        ctx.strokeStyle = "white";
        ctx.lineCap = "square";
        ctx.lineWidth = 15;
        ctx.stroke
        for (let wallpath of this.wallpaths) {
            ctx.beginPath();
            ctx.moveTo(wallpath[0][0], wallpath[0][1]);
            for (let point of wallpath) {
                ctx.lineTo(point[0], point[1]);
            }
            ctx.stroke();
        }
    }
    drawTreasure(ctx) {
        ctx.drawImage(this.treasureImg, this.treasureLocation[0]*width/100 - 25, this.treasureLocation[1]*height/100 - 25, 50, 50);
    }
}


Levels = [new Level([[20, 0, 0, 30],
    [20, 40, 0, 50],
    [20, 50, 20, 0],
    [30, 10, 0, 50],
    [40, 0, 0, 50],
    [30, 90, 0, 10],
    [30, 75, 40, 0],
    [50, 60, 0, 40],
    [50, 90, 30, 0],
    [50, 30, 50, 0],
    [65, 60, 25, 0],
    [70, 30, 0, 30],
    [85, 45, 0, 15]
], "treasures/key.png", [77.5, 50])];

module.exports = Levels;