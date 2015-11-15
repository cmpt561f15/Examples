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
var hero_1 = require('./hero');
var keyup_1 = require("./keyup");
var AppComponent = (function () {
    function AppComponent() {
        this.title = 'Beloved Heroes';
        this.heroes = [
            new hero_1.Hero(1, 'Muhammad Ibn `Abd Allāh'),
            new hero_1.Hero(2, 'Abu Bakr Al-Siddiq'),
            new hero_1.Hero(3, 'Umar ibn Al-Khattāb'),
            new hero_1.Hero(4, 'Uthman Ibn Affan'),
            new hero_1.Hero(5, 'Ali ibn Abi Talib')
        ];
        this.myHero = this.heroes[0];
    }
    AppComponent.prototype.addHero = function (newHero) {
        if (newHero.value) {
            //Set id to last id+1
            var id = this.heroes[this.heroes.length - 1].id + 1;
            this.heroes.push(new hero_1.Hero(id, newHero.value));
            newHero.value = ''; // clear the newHero textbox
            console.log(this.heroes);
        }
    };
    AppComponent = __decorate([
        angular2_1.Component({
            selector: 'heros-app',
            template: "\n          <h1>{{title}}</h1>\n          <input #new-hero\n              (keyup.enter)=\"addHero(newHero)\"\n              (blur)=\"addHero(newHero)\">\n\n          <button (click)=addHero(newHero)>Add</button>\n\n          <h2>My favorite hero is: {{myHero.name}}</h2>\n          <p>Heroes:</p>\n          <ul>\n            <li *ng-for=\"#hero of heroes\">\n              {{ hero.name }}\n              </li>\n          </ul>\n          <p *ng-if=\"heroes.length > 3\">There are many heroes!</p>\n\n          <keyup-form></keyup-form>\n        ",
            directives: [angular2_1.CORE_DIRECTIVES, keyup_1.KeyUpComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
})();
exports.AppComponent = AppComponent;
angular2_1.bootstrap(AppComponent);
//# sourceMappingURL=app.js.map