var molly = require('./molly');
var dialog = require('./dialogControl');
var spotlight = require('./spotlight');
let width = window.innerWidth;
let height = window.innerHeight;

class Level {
    // Wall defined as [x0, y0, width, height] where they're all between 0 and 100
    constructor(walls, treasure, finishLevelAction) {
        this.walls = walls;
        this.wallpaths = [];
        this.buildWalls();
        this.treasureImg = new Image();
        this.treasureImg.src = treasure.file;
        this.treasureLocation = [width*treasure.location[0]/100, height*treasure.location[1]/100];
        this.treasureSize = treasure.size;
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
        molly.runTo(100, 100).then(() => molly.inlevel = true);
        console.log("starting level...");
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
        ctx.drawImage(this.treasureImg, this.treasureLocation[0] - this.treasureSize/2, this.treasureLocation[1] - this.treasureSize/2, this.treasureSize, this.treasureSize);
    }
    finishLevel() {
        molly.inlevel = false;
        this.finishLevelAction();
        if (molly.currentLevel < (Levels.length - 1)) {
            molly.currentLevel += 1;
        }
    }
}

Levels = []

Levels.push(new Level([[20, 0, 0, 30],
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
], {file: "key.png", location: [77.5, 50], size: 50},
() => {
    dialog.showDialogBox().then( 
        () =>
            dialog.displayMessages(
                [`Hoera, de sleutel is door Molly gevonden!<br>
                Wisten we maar welk slot we hiermee openen konden.<br>
                Je raadt het al, hij is natuurlijk voor de kluis,<br>
                In de krochten van Sint zijn abductiehuis.
                `,
                `Zoek het huis, hier is een hint,<br>
                Het is in het noordoosten dat je het vindt.<br>
                Doe voorzichtig, wees niet te stoer,<br>
                Er liggen veel gevaren op de loer!
                `], [null, null, Levels[molly.currentLevel].startLevel])
        );
    }
));

Levels.push(
    new Level([[0, 20, 62, 0],
        [72, 0, 0, 90],
        [10, 30, 62, 0],
        [10, 40, 0, 50],
        [20, 30, 0, 50],
        [10, 80, 20, 0],
        [20, 90, 40, 0],
        [60, 90, 0, 10],
        [40, 40, 0, 40],
        [40, 80, 20, 0],
        [60, 80, 0, 10],
        [50, 50, 40, 0],
        [50, 40, 13, 0],
        [50, 40, 0, 10],
        [30, 40, 0, 40],
        [40, 60, 20, 0],
        [60, 70, 0, 10],
        [81, 60, 0, 40],
        [90, 50, 0, 40]
    ], {file: "house.png", location: [85, 15], size: 250},
    () => {
        dialog.showDialogBox().then(
            () => {
                    dialog.displayMessages([
                        `Molly is ongeschonden bij het huis beland,<br>
                        En is nu een heel eind weg van haar warme mand.<br>
                        Zou het haar ook lukken om de kluis te vinden?<br>
                        Of wordt ze gedognapt door Sint die haar vast zal binden?`,
                        
                        `Wees op je hoede, en voor je het weet,<br>
                        Geniet je weer van het mannetje z'n scheet.<br>
                        Steek je sleutel in de kluis,<br>
                        En ga dan rap samen naar huis!
                        `
                    ], [null, null, Levels[molly.currentLevel].startLevel])
                });
        }
    ));

Levels.push(
    new Level([[0, 20, 20, 0],
        [30, 0, 0, 30],
        [10, 40, 60, 0],
        [40, 20, 20, 0],
        [50, 10, 0, 30],
        [40, 40, 0, 30],
        [70, 0, 0, 70],
        [10, 80, 30, 0],
        [40, 80, 0, 20],
        [40, 70, 20, 0],
        [60, 55, 0, 15]
    ],
        {file: "safe.png", location: [50, 50], size: 100},
        () => {
            dialog.showDialogBox().then(
                () => {
                    dialog.displayMessages([
                        `Hoera! Het mannetje is boven water!<br>
                        Het is weer een en al geschater.<br>
                        Als beloning hier een heuse prijs,<br>
                        Met wat ideeën voor heerlijk spijs.
                        `
                    ], [null, () => {null}]);  
                }
            );   
        }
    )
)


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