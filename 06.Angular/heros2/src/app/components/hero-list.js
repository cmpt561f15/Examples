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
var router_1 = require('angular2/router');
var hero_show_1 = require('./hero-show');
var hero_service_1 = require("../services/hero-service");
var HeroList = (function () {
    function HeroList(heroService) {
        this.heroService = heroService;
        this.heroes = this.heroService.heroes;
        this.selectedHero = this.heroes[0];
    }
    HeroList.prototype.select = function (hero) {
        this.selectedHero = hero;
        return false;
    };
    HeroList.prototype.remove = function (hero) {
        this.heroService.remove(hero);
        return false;
    };
    HeroList = __decorate([
        angular2_1.Component({
            selector: 'heros-app',
            template: "\n          <h2>Selected hero: {{selectedHero.name}}</h2>\n          <p>Heroes:</p>\n          <table>\n            <tr *ng-for=\"#hero of heroes\">\n                <td>\n                  {{ hero.name }}\n                </td>\n                <td>\n                    <a href (click)=\"select(hero)\" class=\"pure-button\">\n                        <i class=\"fa fa-caret-square-o-down\"></i> Show\n                    </a>\n                    <a href [router-link]=\"['/Edit', {id: hero.id}]\" class=\"pure-button\">\n                        <i class=\"fa fa-pencil-square-o\"></i> Edit\n                    </a>\n                    <a href (click)=\"remove(hero)\" class=\"pure-button\">\n                        <i class=\"fa fa-trash-o\"></i> Remove\n                    </a>\n                </td>\n          </tr>\n          </table>\n          <hero-show [hero]=\"selectedHero\"></hero-show>\n        ",
            directives: [angular2_1.CORE_DIRECTIVES, router_1.ROUTER_DIRECTIVES, hero_show_1.HeroViewer]
        }), 
        __metadata('design:paramtypes', [hero_service_1.HeroService])
    ], HeroList);
    return HeroList;
})();
exports.HeroList = HeroList;
//# sourceMappingURL=hero-list.js.map