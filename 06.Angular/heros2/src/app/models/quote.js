System.register([], function(exports_1) {
    var Quote;
    return {
        setters:[],
        execute: function() {
            Quote = (function () {
                function Quote(heroId, quote) {
                    this.heroId = heroId;
                    this.quote = quote;
                }
                return Quote;
            })();
            exports_1("Quote", Quote);
        }
    }
});
