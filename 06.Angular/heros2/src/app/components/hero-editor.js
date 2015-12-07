System.register(['angular2/angular2', 'angular2/router', "../services/hero-service"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var angular2_1, router_1, hero_service_1;
    var HeroEditor;
    return {
        setters:[
            function (angular2_1_1) {
                angular2_1 = angular2_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (hero_service_1_1) {
                hero_service_1 = hero_service_1_1;
            }],
        execute: function() {
            HeroEditor = (function () {
                function HeroEditor(heroService, router, params) {
                    this.heroService = heroService;
                    this.router = router;
                    this.heroTypes = ['Prophet', 'Companion', 'Scholar'];
                    this.hero = heroService.find(params.get('id'));
                    this.heroService.selectedHero = this.hero;
                }
                HeroEditor.prototype.onSubmit = function () {
                    this.router.navigate(['/Home']);
                };
                HeroEditor = __decorate([
                    angular2_1.Component({
                        selector: 'hero-form',
                        templateUrl: 'src/app/components/hero-form.html',
                        directives: [angular2_1.CORE_DIRECTIVES, angular2_1.FORM_DIRECTIVES, router_1.ROUTER_DIRECTIVES]
                    }), 
                    __metadata('design:paramtypes', [hero_service_1.HeroService, router_1.Router, router_1.RouteParams])
                ], HeroEditor);
                return HeroEditor;
            })();
            exports_1("HeroEditor", HeroEditor);
        }
    }
});
