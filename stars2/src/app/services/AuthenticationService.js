var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var DataService_1 = require('./DataService');
var core_1 = require('angular2/core');
var Observable_1 = require('rxjs/Observable');
var AuthenticationService = (function () {
    function AuthenticationService(ds) {
        this.ds = ds;
    }
    AuthenticationService.prototype.login = function (username, password) {
        var _this = this;
        return new Observable_1.Observable.create(function (observer) {
            _this.ds.getResource('staff').subscribe(function (users) {
                users = users.filter(function (s) { return s.Username == username && s.Password == password; });
                if (users.length > 0) {
                    // alert(users[0].Username + " hello");
                    observer.next(users[0]);
                }
                else {
                    observer.error("Invalid username and/or password");
                }
            });
        });
    };
    AuthenticationService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [DataService_1.default])
    ], AuthenticationService);
    return AuthenticationService;
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AuthenticationService;
//# sourceMappingURL=AuthenticationService.js.map