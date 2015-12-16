var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('angular2/core');
var common_1 = require('angular2/common');
var router_1 = require('angular2/router');
var stars_service_1 = require("../services/stars-service");
var LoginComponent = (function () {
    function LoginComponent(starsService, router) {
        this.starsService = starsService;
        this.router = router;
        this.authenticateFailed = false;
    }
    LoginComponent.prototype.onLogin = function (username, password) {
        var _this = this;
        var currentUser;
        var adviserPrograms;
        this.starsService.login(username, password).subscribe(function (user) {
            console.log("starsService.currentUser", _this.starsService.currentUser);
            var getStudentsObservable = (user.Type === "Faculty") ?
                _this.starsService.getStudentsByInstructor(user.StaffNo) :
                _this.starsService.getStudentsByProgram(user.Program);
            getStudentsObservable.subscribe(function (results) {
                //In case of faculty the method will return both students and courses
                var students, instructorCourses;
                if (user.Type === "Faculty") {
                    //[students, instructorCourses] = results;
                    console.log("this.starsService.instructorCourses", _this.starsService.instructorCourses);
                }
                else {
                    console.log("this.starsService.adviserPrograms", _this.starsService.adviserPrograms);
                }
                console.log("Students", _this.starsService.students);
                _this.starsService.getActions(_this.starsService.students).subscribe(function (actions) {
                    console.log("Actions", _this.starsService.actions);
                    //let actionTypes, staff, programs;
                    _this.starsService.getPrograms().subscribe(function (programs) {
                        if (typeof _this.starsService.adviserPrograms !== "undefined") {
                            _this.starsService.programs = programs.filter(function (p) { return _this.starsService.adviserPrograms.indexOf(p.Code) >= 0; });
                        }
                    });
                    _this.starsService.getActionTypes().subscribe(function (actionTypes) {
                        _this.starsService.actionTypes = actionTypes;
                    });
                    _this.starsService.getStaff().subscribe(function (staff) {
                        _this.starsService.coordinators = staff.filter(function (s) { return s.Type === 'Coordinator'; }).map(function (s) { return s.Username; });
                        _this.starsService.advisors = staff.filter(function (s) { return s.Type === 'Adviser'; }).map(function (s) { return s.Username; });
                    });
                    setTimeout(function () {
                        _this.router.navigate(['/Students']);
                    }, 500);
                });
            });
        }, function (error) { console.log(error); _this.authenticateFailed = true; }, function () {
            console.log("Getting STARS data done!");
        });
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'login',
            templateUrl: './app/components/login.html',
            directives: [common_1.CORE_DIRECTIVES, router_1.ROUTER_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [stars_service_1.default, router_1.Router])
    ], LoginComponent);
    return LoginComponent;
})();
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.js.map