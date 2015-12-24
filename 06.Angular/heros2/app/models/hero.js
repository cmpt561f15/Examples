System.register([], function(exports_1) {
    var Hero;
    return {
        setters:[],
        execute: function() {
            Hero = (function () {
                function Hero(_id, name, heroType, quote) {
                    this._id = _id;
                    this.name = name;
                    this.heroType = heroType;
                    this.quote = quote;
                }
                return Hero;
            })();
            exports_1("Hero", Hero);
        }
    }
});
