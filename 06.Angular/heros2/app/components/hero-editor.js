System.register(['angular2/core', 'angular2/common', 'angular2/router', '../models/hero', "../services/hero-service"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, common_1, router_1, hero_1, hero_service_1;
    var HeroEditor;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (hero_1_1) {
                hero_1 = hero_1_1;
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
                    console.log('params.get("id") : ', params.get('id'));
                    if (params.get('id') != null) {
                        this.hero = heroService.find(params.get('id'));
                        this.heroService.selectedHero = this.hero;
                    }
                    else {
                        console.log('Entered HeroEditor add mode');
                        this.hero = new hero_1.Hero('', '', '');
                    }
                }
                HeroEditor.prototype.onSubmit = function () {
                    if (this.hero._id === '') {
                        this.heroService.add(this.hero);
                    }
                    else {
                        this.heroService.update(this.hero);
                    }
                    this.router.navigate(['/Home']);
                };
                HeroEditor = __decorate([
                    core_1.Component({
                        selector: 'hero-form',
                        templateUrl: 'app/components/hero-form.html',
                        directives: [common_1.CORE_DIRECTIVES, common_1.FORM_DIRECTIVES, router_1.ROUTER_DIRECTIVES]
                    }), 
                    __metadata('design:paramtypes', [hero_service_1.HeroService, router_1.Router, router_1.RouteParams])
                ], HeroEditor);
                return HeroEditor;
            })();
            exports_1("HeroEditor", HeroEditor);
        }
    }
});
//# sourceMappingURL=hero-editor.js.map