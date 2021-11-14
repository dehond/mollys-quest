let width = window.innerWidth;
let height = window.innerHeight;

class Level {
    // Wall defined as [x0, y0, width, height] where they're all between 0 and 100
    constructor(walls) {
        this.walls = walls;
        this.wallpaths = [];
        this.buildWalls();
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
    drawWall(ctx) {
        ctx.strokeStyle = "white";
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
}


Levels = [new Level([[20, 0, 0, 30], [20, 40, 0, 50], [20, 50, 20, 0]])];

module.exports = Levels;