System.register([], function(exports_1) {
    var Hero;
    return {
        setters:[],
        execute: function() {
            Hero = (function () {
                function Hero(id, name, heroType, quote) {
                    this.id = id;
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
//# sourceMappingURL=hero.js.map