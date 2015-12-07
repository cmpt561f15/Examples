System.register(['angular2/angular2', '../models/hero'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var angular2_1, hero_1;
    var HeroViewer;
    return {
        setters:[
            function (angular2_1_1) {
                angular2_1 = angular2_1_1;
            },
            function (hero_1_1) {
                hero_1 = hero_1_1;
            }],
        execute: function() {
            HeroViewer = (function () {
                function HeroViewer() {
                }
                __decorate([
                    angular2_1.Input(), 
                    __metadata('design:type', hero_1.Hero)
                ], HeroViewer.prototype, "hero", void 0);
                HeroViewer = __decorate([
                    angular2_1.Component({
                        selector: 'hero-show',
                        template: "\n        <style>\n            table#hero-show img {\n                width: 400px;\n                height: 300px;\n            }\n            table#hero-show td.label {\n                width: 25%;\n                text-align: right;\n                color: #555;\n            }\n        </style>\n        <div *ng-if=\"hero\">\n            <h2>Hero details:</h2>\n            <table class=\"pure-table pure-table-bordered\"  id=\"hero-show\">\n                <tbody>\n                    <tr>\n                        <td class=\"label\">Name</td>\n                        <td>{{hero.name}}</td>\n                    </tr>\n                    <tr>\n                        <td class=\"label\">Type</td>\n                        <td>{{hero.heroType}}</td>\n                    </tr>\n                    <tr [hidden]=\"!hero.quote\">\n                        <td class=\"label\">Quote</td>\n                        <td>{{hero.quote}}</td>\n                    </tr>\n                </tbody>\n            </table>\n        </div>\n    ",
                        directives: [angular2_1.CORE_DIRECTIVES],
                    }), 
                    __metadata('design:paramtypes', [])
                ], HeroViewer);
                return HeroViewer;
            })();
            exports_1("HeroViewer", HeroViewer);
        }
    }
});
