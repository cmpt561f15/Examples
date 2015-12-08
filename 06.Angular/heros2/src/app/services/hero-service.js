var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var angular2_1 = require('angular2/angular2');
var http_1 = require('angular2/http');
var HeroService = (function () {
    function HeroService(http) {
        this.http = http;
        /*this.heroes = [
        new Hero(1, 'Muhammad Ibn `Abd Allāh', 'Prophet', 'Kindness is a mark of faith, and whoever is not kind has no faith.'),
        new Hero(2, 'Abu Bakr Al-Siddiq', 'Companion'),
        new Hero(3, 'Umar ibn Al-Khattāb', 'Companion' ),
        new Hero(4, 'Uthman Ibn Affan', 'Companion'),
        new Hero(5, 'Ali ibn Abi Talib', 'Companion')
        ];*/
        this.baseUrl = 'src/app/data/';
    }
    HeroService.prototype.fetchHeros = function () {
        return this.http.get(this.baseUrl + "heros.json").map(function (response) { return response.json(); });
    };
    HeroService.prototype.fetchQuotes = function () {
        return this.http.get(this.baseUrl + "quotes.json")
            .map(function (response) { return response.json(); });
    };
    HeroService.prototype.find = function (id) {
        return this.heroes.filter(function (c) { return c.id == id; })[0];
    };
    HeroService.prototype.remove = function (hero) {
        var index = this.heroes.indexOf(hero);
        this.heroes.splice(index, 1);
    };
    HeroService.prototype.add = function (hero) {
        hero.id = this.heroes[this.heroes.length - 1].id + 1;
        this.heroes.push(hero);
        this.selectedHero = hero;
        console.log(hero);
    };
    HeroService = __decorate([
        angular2_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], HeroService);
    return HeroService;
})();
exports.HeroService = HeroService;
//# sourceMappingURL=hero-service.js.map