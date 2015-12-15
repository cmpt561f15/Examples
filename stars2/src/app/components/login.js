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
var AuthenticationService_1 = require('../services/AuthenticationService');
var DataService_1 = require("../services/DataService");
var StarsService_1 = require('../services/StarsService');
var LoginComponent = (function () {
    function LoginComponent(as, ds, ss, router) {
        this.as = as;
        this.ds = ds;
        this.ss = ss;
        this.router = router;
        this.alert = true;
        this.isDeauthenticated = false;
    }
    LoginComponent.prototype.onLogin = function () {
        var _this = this;
        var currentUser;
        var adviserPrograms;
        this.as.login(this.username, this.password).subscribe(function (user) {
            currentUser = user;
            localStorage.setItem('currentUser', JSON.stringify(user));
            var getStudentsObservable = (user.Type === "Faculty") ?
                _this.ss.getStudentsByInstructor(user.StaffNo) :
                _this.ss.getStudentsByProgram(user.Program);
            getStudentsObservable.subscribe(function (results) {
                //In case of faculty the method will return both students and courses
                var students, instructorCourses;
                if (currentUser.Type === "Faculty") {
                    students = results[0], instructorCourses = results[1];
                    console.log("Instructor Courses", instructorCourses);
                    localStorage.setItem('courses', JSON.stringify(instructorCourses));
                }
                else {
                    students = results[0], adviserPrograms = results[1];
                }
                console.log("Students", students);
                localStorage.setItem('students', JSON.stringify(students));
                _this.ss.getActions(students).subscribe(function (actions) {
                    console.log("Actions", actions);
                    localStorage.setItem('actions', JSON.stringify(actions));
                    //let actionTypes, staff, programs;
                    _this.ss.getPrograms().subscribe(function (programs) {
                        if (typeof adviserPrograms !== "undefined") {
                            programs = programs.filter(function (p) { return adviserPrograms.indexOf(p.Code) >= 0; });
                            localStorage.setItem('programs', JSON.stringify(programs));
                        }
                    });
                    _this.ss.getActionTypes().subscribe(function (actionTypes) {
                        localStorage.setItem('actionTypes', JSON.stringify(actionTypes));
                    });
                    _this.ss.getStaff().subscribe(function (staff) {
                        var coordinators = staff.filter(function (s) { return s.Type === 'Coordinator'; }).map(function (s) { return s.Username; });
                        var advisors = staff.filter(function (s) { return s.Type === 'Adviser'; }).map(function (s) { return s.Username; });
                        localStorage.setItem('coordinators', JSON.stringify(coordinators));
                        localStorage.setItem('advisors', JSON.stringify(advisors));
                    });
                    setTimeout(function () {
                        _this.router.navigate(['/Students']);
                    }, 500);
                });
            });
        }, function (error) { console.log(error); _this.isDeauthenticated = true; }, function () {
        });
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'login',
            providers: [AuthenticationService_1.default, DataService_1.default, StarsService_1.default],
            templateUrl: './app/components/login.html',
            directives: [common_1.CORE_DIRECTIVES, router_1.ROUTER_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [AuthenticationService_1.default, DataService_1.default, StarsService_1.default, router_1.Router])
    ], LoginComponent);
    return LoginComponent;
})();
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.js.map