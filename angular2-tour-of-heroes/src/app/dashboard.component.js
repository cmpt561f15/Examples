var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var angular2_1 = require('angular2/angular2');
var hero_service_1 = require('./hero.service');
var status_component_1 = require("./status.component");
var DashboardComponent = (function () {
    function DashboardComponent(_heroService) {
        var _this = this;
        this._heroService = _heroService;
        this.ngHeroes = [];
        _heroService.getHeroes().then(function (resp) { return _this.heroes = resp; });
    }
    DashboardComponent.prototype.onChange = function (event, hero) {
        if (event.status) {
            this.ngHeroes.push(hero);
        }
        else {
            this.ngHeroes.splice(this.ngHeroes.indexOf(hero), 1);
        }
    };
    Object.defineProperty(DashboardComponent.prototype, "ngHeroesString", {
        get: function () { return this.ngHeroes.map(function (h) { return h.name; }).join(', '); },
        enumerable: true,
        configurable: true
    });
    DashboardComponent = __decorate([
        angular2_1.Component({
            selector: 'my-dashboard',
            templateUrl: 'app/dashboard.component.html',
            styleUrls: ['app/dashboard.component.css'],
            directives: [angular2_1.CORE_DIRECTIVES, status_component_1.StatusComponent]
        }), 
        __metadata('design:paramtypes', [hero_service_1.HeroService])
    ], DashboardComponent);
    return DashboardComponent;
})();
exports.DashboardComponent = DashboardComponent;
//# sourceMappingURL=dashboard.component.js.map