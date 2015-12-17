System.register(['angular2/core', 'angular2/common', 'angular2/router', "../services/stars-service"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, common_1, router_1, stars_service_1;
    var LoginComponent;
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
            function (stars_service_1_1) {
                stars_service_1 = stars_service_1_1;
            }],
        execute: function() {
            LoginComponent = (function () {
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
                                console.log("this.starsService.instructorCourses", _this.starsService.instructorCourses);
                            }
                            else {
                                console.log("this.starsService.adviserPrograms", _this.starsService.adviserPrograms);
                            }
                            //console.log("Students", this.starsService.students);
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
                            _this.router.navigate(['/Students']);
                        });
                    }, function (error) {
                        console.log(error);
                        _this.authenticateFailed = true;
                    }, function () {
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
            exports_1("LoginComponent", LoginComponent);
        }
    }
});
//# sourceMappingURL=login.js.map