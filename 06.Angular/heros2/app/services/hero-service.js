System.register(['angular2/core', 'angular2/http', 'rxjs/add/operator/map', "angular2/http"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, http_1, http_2;
    var HeroService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (_1) {},
            function (http_2_1) {
                http_2 = http_2_1;
            }],
        execute: function() {
            HeroService = (function () {
                function HeroService(http) {
                    this.http = http;
                    /*this.heroes = [
                    new Hero(1, 'Muhammad Ibn `Abd Allāh', 'Prophet', 'Kindness is a mark of faith, and whoever is not kind has no faith.'),
                    new Hero(2, 'Abu Bakr Al-Siddiq', 'Companion'),
                    new Hero(3, 'Umar ibn Al-Khattāb', 'Companion' ),
                    new Hero(4, 'Uthman Ibn Affan', 'Companion'),
                    new Hero(5, 'Ali ibn Abi Talib', 'Companion')
                    ];*/
                    this.baseUrl = 'http://localhost:9080/api/heros';
                }
                HeroService.prototype.fetchHeros = function () {
                    return this.http.get(this.baseUrl).map(function (response) { return response.json(); });
                };
                HeroService.prototype.find = function (id) {
                    return this.heroes.filter(function (c) { return c._id == id; })[0];
                };
                HeroService.prototype.remove = function (hero) {
                    var _this = this;
                    console.log("Hero to be deleted", JSON.stringify(hero));
                    var headers = new http_2.Headers();
                    headers.append('Content-Type', 'application/json');
                    this.http.delete(this.baseUrl + "/" + hero._id)
                        .subscribe(function (response) {
                        console.log('Delete done sucessfully');
                        var index = _this.heroes.indexOf(hero);
                        _this.heroes.splice(index, 1);
                        if (_this.heroes.length > 0) {
                            _this.selectedHero = _this.heroes[0];
                        }
                        else {
                            _this.selectedHero = undefined;
                        }
                    });
                };
                HeroService.prototype.update = function (hero) {
                    console.log("Hero to be updated", JSON.stringify(hero));
                    var headers = new http_2.Headers();
                    headers.append('Content-Type', 'application/json');
                    this.http.put(this.baseUrl + "/" + hero._id, JSON.stringify(hero), { headers: headers })
                        .map(function (res) { return res.json(); })
                        .subscribe(function (updatedHero) {
                        console.log("updatedHero", updatedHero);
                    });
                };
                HeroService.prototype.add = function (hero) {
                    var _this = this;
                    delete hero._id;
                    console.log("Hero to add", JSON.stringify(hero));
                    var headers = new http_2.Headers();
                    headers.append('Content-Type', 'application/json');
                    this.http.post(this.baseUrl, JSON.stringify(hero), { headers: headers })
                        .map(function (res) { return res.json(); })
                        .subscribe(function (addedHero) {
                        _this.heroes.push(addedHero);
                        _this.selectedHero = addedHero;
                        console.log("addedHero", addedHero);
                    });
                };
                HeroService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], HeroService);
                return HeroService;
            })();
            exports_1("HeroService", HeroService);
        }
    }
});
//# sourceMappingURL=hero-service.js.map