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
    function HeroList(heroService, router) {
        this.heroService = heroService;
        this.router = router;
    }
    //auto-executed during the component initialization
    HeroList.prototype.ngOnInit = function () {
        var _this = this;
        //If the heroes list is undefined then fetch the data from REST service
        if (!this.heroService.heroes) {
            //After getting the heros -> get their quotes
            //This is a demo of two async calls done in sequence
            this.heroService.fetchHeros().subscribe(function (heroes) {
                _this.heroService.fetchQuotes().subscribe(function (quotes) {
                    console.log('Quotes', quotes);
                    for (var _i = 0; _i < quotes.length; _i++) {
                        var quote = quotes[_i];
                        var indx = heroes.findIndex(function (h) { return h.id === quote.heroId; });
                        heroes[indx].quote = quote.quote;
                    }
                    console.log('Heroes', heroes);
                    _this.heroService.heroes = heroes;
                    _this.heroService.selectedHero = heroes[0];
                }, function (err) { return console.error('There was an error: ' + err); }, function () { return console.log('Completed!'); });
            });
        }
    };
    HeroList.prototype.add = function () {
        this.router.navigate(['/Add']);
        return false;
    };
    HeroList.prototype.select = function (hero) {
        this.heroService.selectedHero = hero;
        return false;
    };
    HeroList.prototype.remove = function (hero) {
        if (confirm("Confirm delete?")) {
            this.heroService.remove(hero);
        }
        return false;
    };
    HeroList = __decorate([
        angular2_1.Component({
            selector: 'heros-app',
            template: "\n       <a href (click)=\"add()\" class=\"btn btn-info\">\n            <i class=\"fa fa-plus\"></i> Add\n       </a>\n       <div *ng-if=\"heroService.heroes\">\n          <table>\n            <tr *ng-for=\"#hero of heroService.heroes\">\n                <td>\n                  {{ hero.name }}\n                </td>\n                <td>\n                    <a href (click)=\"select(hero)\" class=\"btn btn-info\">\n                        <i class=\"fa fa-caret-square-o-down\"></i> Show\n                    </a>\n                    <a href [router-link]=\"['/Edit', {id: hero.id}]\" class=\"btn btn-info\">\n                        <i class=\"fa fa-pencil-square-o\"></i> Edit\n                    </a>\n                    <a href (click)=\"remove(hero)\" class=\"btn btn-info\">\n                        <i class=\"fa fa-trash-o\"></i> Remove\n                    </a>\n                </td>\n          </tr>\n          </table>\n          <h2>Selected hero: {{heroService.selectedHero.name}}</h2>\n          <hero-show [hero]=\"heroService.selectedHero\"></hero-show>\n        </div>\n        ",
            directives: [angular2_1.CORE_DIRECTIVES, router_1.ROUTER_DIRECTIVES, hero_show_1.HeroViewer]
        }), 
        __metadata('design:paramtypes', [hero_service_1.HeroService, router_1.Router])
    ], HeroList);
    return HeroList;
})();
exports.HeroList = HeroList;
//# sourceMappingURL=hero-list.js.map