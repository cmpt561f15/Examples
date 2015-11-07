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
var router_1 = require('angular2/router');
var hero_service_1 = require('./hero.service');
var route_config_1 = require('./route.config');
var HeroDetailComponent = (function () {
    function HeroDetailComponent(_heroService, _routeParams) {
        var _this = this;
        this._heroService = _heroService;
        this._routeParams = _routeParams;
        this.routes = route_config_1.Routes;
        var id = parseInt(_routeParams.get('id'), 10);
        this._heroService.getHero(id).then(function (hero) { return _this.hero = hero; });
    }
    HeroDetailComponent = __decorate([
        angular2_1.Component({
            selector: 'my-hero-detail',
            templateUrl: 'app/hero-detail.component.html',
            styleUrls: ['app/hero-detail.component.css'],
            directives: [angular2_1.FORM_DIRECTIVES, router_1.ROUTER_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [hero_service_1.HeroService, router_1.RouteParams])
    ], HeroDetailComponent);
    return HeroDetailComponent;
})();
exports.HeroDetailComponent = HeroDetailComponent;
//# sourceMappingURL=hero-detail.component.js.map