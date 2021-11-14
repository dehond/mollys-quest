////// HIDE DIALOG
// let el = document.getElementById("dialogBox");
// el.style.display = "none";
//////

var Typewriter = require('typewriter-effect/dist/core');
let dialogtxt = document.getElementById("dialogtext");

let typewriter = new Typewriter(dialogtxt, {
    loop: false,
    delay: 0,
});

function blinkPointer() {
    if (currentMessage == 2)
        {spotlight.showSpotlight()}
    else if (currentMessage == 3)   
        {molly.runTo(-100, molly.position[1])};
    document.getElementsByClassName("Typewriter__cursor")[0].style.display = "none";
    let el = document.getElementById("dialognav");
    el.style.visibility = "visible";
}

function hidePointer() {
    document.getElementsByClassName("Typewriter__cursor")[0].style.display = "";
    let el = document.getElementById("dialognav");
    el.style.visibility = "hidden";
}

let currentMessage = 0;
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
                `
            ]

typewriter
    .typeString(messages[0])
    .start()
    .callFunction(blinkPointer);

function nextDialog() {
    hidePointer();
    currentMessage += 1;
    document.getElementsByClassName("Typewriter__wrapper")[0].innerHTML = "";
    typewriter
        .typeString(messages[currentMessage])
        .start()
        .callFunction(blinkPointer);

    if (currentMessage >= messages.length) {
        let el = document.getElementById("dialogBox");
        el.innerHTML = "";
        el.style.animation = "animate-hide 3s steps(10, jump-none) both";
        el.addEventListener("animationend", function() {
            console.log(el);
            el.style.display = "none";
        });
        startLevel(1);
    }
}

window.nextDialog = nextDialog;