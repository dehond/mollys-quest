class Spotlight {
    maxradius = 100;
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
    hideSpotlight() {
        let _this = this;
        let intr = setInterval(function() {
            _this.radius += -10;
            if (_this.radius == 0) {
                clearInterval(intr);
            }
        })
    }
}

let spotlight = new Spotlight();
module.exports = spotlight;