var mock_heroes_1 = require('./mock-heroes');
var HeroService = (function () {
    function HeroService() {
    }
    HeroService.prototype.getHeroes = function () { return Promise.resolve(mock_heroes_1.HEROES); };
    HeroService.prototype.getHero = function (id) {
        return Promise.resolve(mock_heroes_1.HEROES).then(function (heroes) {
            for (var _i = 0; _i < heroes.length; _i++) {
                var hero = heroes[_i];
                if (hero.id === id) {
                    return hero;
                }
            }
        });
    };
    return HeroService;
})();
exports.HeroService = HeroService;
//# sourceMappingURL=hero.service.js.map