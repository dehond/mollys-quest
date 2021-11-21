////// HIDE DIALOG
// let el = document.getElementById("dialogBox");
// el.style.display = "none";
//////
var Typewriter = require('typewriter-effect/dist/core');
let molly = require('./molly');

class Dialog {
    constructor() {
        this.dialogtxt = document.getElementById("dialogtext");
        this.dialogbox = document.getElementById("dialogBox");
        this.typewriter = new Typewriter(this.dialogtxt, {
                            loop: false,
                            delay: 0,
                        });
        this.shown = true;
    }
    blinkPointer() {
        document.getElementsByClassName("Typewriter__cursor")[0].style.display = "none";
        let el = document.getElementById("dialognav");
        el.style.visibility = "visible";
    }
    hidePointer() {
        document.getElementsByClassName("Typewriter__cursor")[0].style.display = "";
        let el = document.getElementById("dialognav");
        el.style.visibility = "hidden";
    }
    displayMessages(messages, actions = null) {
        this.messages = messages;
        this.actions = actions;
        if (typeof(messages) == 'string') {
            this.typeMessage(this.messages, actions);
        } else {
            this.typeMessage(this.messages.shift(), this.actions.shift());
        }
    }
    typeMessage(message, action = null) {
        this.hidePointer();
        this.clearDialog();
        this.typewriter
            .typeString(message)
            .start()
            .callFunction(() => {
                this.blinkPointer();
                if (action) {
                    action();
                }
            });
    }
    clearDialog() {
        document.getElementsByClassName("Typewriter__wrapper")[0].innerHTML = "";
    }
    hideDialogBox() {
        let _this = this;
        this.shown = false;
        
        // Empty out dialog box
        this.clearDialog();
        this.hidePointer();
        document.getElementById("logo").style.display = "none";
        document.getElementsByClassName("Typewriter__cursor")[0].style.display = "none";

        this.dialogbox.style.animation = "animate-hide 3s steps(10, jump-none) both";
        this.dialogbox.addEventListener("animationend", function() {
            _this.dialogbox.style.display = "none";
            _this.dialogbox.style.animation = "animate-show 3s steps(10, jump-none) both";
        });
    }
    showDialogBox() {
        let _this = this;
        this.shown = true;
        this.dialogbox.offsetHeight; // Reflow for restarting animation
        this.dialogbox.style.display = "block";
        
        this.dialogbox.addEventListener("animationend", function() {
            _this.dialogbox.style.display = "block";
        });

    }
    next() {
        if (this.messages.length > 0 && typeof(this.messages) != "string") {
            this.typeMessage(this.messages.shift(), this.actions.shift());
        } else {
            let lastAction = this.actions.pop()
            this.hideDialogBox();
            lastAction();
            ;
        }
    }
}

let Levels = require('./levels');
let dialog = new Dialog();
module.exports = dialog;

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
                Maar misschien kun jij haar kunt helpen?<br>
                Zoek de baconsleutels in het huis,<br>
                En haal het mannetje uit de Sint z'n kluis.
                `
            ];

let actions = [null, null, () => spotlight.showSpotlight(), () => molly.runTo(-100, molly.position[1]), null, () => Levels[0].startLevel()];
dialog.displayMessages(messages, actions);

window.dialog = dialog;