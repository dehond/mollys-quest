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
        return new Promise(
            resolve => {
                let _this = this;
                this.shown = true;
                this.dialogbox.offsetHeight; // Reflow for restarting animation
                this.dialogbox.style.display = "block";
                
                this.dialogbox.addEventListener("animationend", function() {
                    _this.dialogbox.style.display = "block";
                    document.getElementById("logo").style.display = "";
                    resolve();
                });
            }
        )
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
window.dialog = dialog;