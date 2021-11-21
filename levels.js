var molly = require('./molly');
var dialog = require('./dialogControl');
var spotlight = require('./spotlight');
let width = window.innerWidth;
let height = window.innerHeight;

class Level {
    // Wall defined as [x0, y0, width, height] where they're all between 0 and 100
    constructor(walls, treasureImgPath, treasureLocation, finishLevelAction) {
        this.walls = walls;
        this.wallpaths = [];
        this.buildWalls();
        this.treasureImg = new Image();
        this.treasureImg.src = treasureImgPath;
        this.treasureLocation = [width*treasureLocation[0]/100, height*treasureLocation[1]/100];
        this.finishLevelAction = finishLevelAction;
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
    startLevel() {
        molly.heading = "right";
        molly.runTo(100, 100);
        molly.inlevel = true;
        spotlight.showSpotlight();
    }
    drawLevel(ctx) {
        ctx.save();
        ctx.clip(molly.sptl);
        this.drawWall(ctx);
        this.drawTreasure(ctx);
        ctx.restore();
    }
    drawWall(ctx) {
        ctx.strokeStyle = "white";
        ctx.lineCap = "square";
        ctx.lineWidth = 15;
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
        ctx.drawImage(this.treasureImg, this.treasureLocation[0] - 25, this.treasureLocation[1] - 25, 50, 50);
    }
    finishLevel() {
        molly.inlevel = false;
        this.finishLevelAction();
        molly.currentLevel += 1;
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
], "key.png", [77.5, 50], () => {
    dialog.showDialogBox();
    dialog.displayMessages(['Found!', 'No really!'], [null, null, () => {console.log("bla")}]);
}
)];

let messages = [`Er was eens een mannetje, in het midden van het land,<br>
                Die zich niet altijd gedroeg; wie had hem in de hand?<br>
                Een scheetje, een boertje, voor niemand een genotje,<br>
                En als hoogtepunt: 'Broeder, wilt u soms mijn snotje?'`,

                `Dat kon zo niet langer, er was geen houden meer aan,<br>
                Tot Sint eens zei: 'Hij zal mee naar Spanje moeten gaan.'<br>
                En zo geschiedde, in het holst van de nacht,<br>
                Werd deze meneer per zak naar de boot gebracht.`,

                `Sint had zich echter op een cruciaal punt verkeken,<br>
                en het scheelde niet veel, of het plan was eronder bezweken.<br>
                Het was tijdens de ontvoering, hij ging het huis bijna weer uit<br>
                Maar plots hing daar Molly aan zijn kuit!`,

                `Ze beet door, haar tandjes wisten niet van wijken,<br>
                Tot Sint haar naar bacon riekende sleutels zag prijken.<br>
                Een soepele worp in de richting van het bos,<br>
                En Molly rende er achteraan, haar tandjes waren los.
                `,

                `Bij thuiskomst was Molly's verdriet niet te stelpen,<br>
                Maar misschien dat jij haar kunt helpen?<br>
                Zoek de baconsleutels in het huis,<br>
                En haal het mannetje uit de Sint z'n kluis.
                `
            ];

let actions = [null, null, () => spotlight.showSpotlight(), () => molly.runTo(-100, molly.position[1]), null, () => Levels[0].startLevel()];
dialog.displayMessages(messages, actions);

module.exports = Levels;