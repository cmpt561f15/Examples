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
var route_config_1 = require('./route.config');
var hero_service_1 = require("./hero.service");
var AppComponent = (function () {
    function AppComponent() {
        this.title = 'Tour of Heroes';
        this.routes = route_config_1.Routes;
    }
    AppComponent = __decorate([
        angular2_1.Component({
            selector: 'my-app',
            directives: [router_1.ROUTER_DIRECTIVES],
            templateUrl: 'app/app.component.html',
            styleUrls: ['app/app.component.css'],
            providers: [
                router_1.ROUTER_PROVIDERS,
                hero_service_1.HeroService,
                angular2_1.provide(router_1.LocationStrategy, { useClass: router_1.HashLocationStrategy })
            ]
        }),
        router_1.RouteConfig(route_config_1.APP_ROUTES), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
})();
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map