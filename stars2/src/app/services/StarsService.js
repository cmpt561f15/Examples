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
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/operator/map');
var DataService_1 = require("./DataService");
var StarsService = (function () {
    function StarsService(ds) {
        this.ds = ds;
    }
    StarsService.prototype.getStudentsByProgram = function (program) {
        var _this = this;
        //Convert a string value to an array if needed
        var programs = typeof program === "string" ? [program] : program;
        return new Observable_1.Observable.create(function (observer) {
            _this.ds.getResource('students').subscribe(function (students) {
                students = students.filter(function (s) { return programs.indexOf(s.Program) >= 0; });
                if (students.length > 0) {
                    // alert(users[0].Username + " hello");
                    observer.next([students, programs]);
                }
                else {
                    observer.error("No records found");
                }
            });
        });
    };
    StarsService.prototype.getStudentsByCourse = function (instructorCourses) {
        var _this = this;
        return new Observable_1.Observable.create(function (observer) {
            _this.ds.getResource('students').subscribe(function (students) {
                students = students.filter(function (s) { return _this.containsAny(instructorCourses, s.Courses, 'CRN'); });
                console.log("instructorCourses", instructorCourses);
                if (students.length > 0) {
                    // alert(users[0].Username + " hello");
                    observer.next(students, instructorCourses);
                }
                else {
                    observer.error("No records found");
                }
            });
        });
    };
    StarsService.prototype.getStudentsByInstructor = function (instructorId) {
        var _this = this;
        var instructorCourses;
        return new Observable_1.Observable.create(function (observer) {
            _this.getCourses(instructorId).subscribe(function (courses) {
                instructorCourses = courses;
                _this.ds.getResource('students').subscribe(function (students) {
                    students = students.filter(function (s) { return _this.containsAny(instructorCourses, s.Courses, 'CRN'); });
                    if (students.length > 0) {
                        observer.next([students, instructorCourses]);
                    }
                    else {
                        observer.error("No records found");
                    }
                });
            });
        });
    };
    StarsService.prototype.getCourses = function (instructorId) {
        var _this = this;
        return new Observable_1.Observable.create(function (observer) {
            _this.ds.getResource('courses').subscribe(function (courses) {
                courses = courses.filter(function (c) { return c.InstructorId == instructorId; });
                if (courses.length > 0) {
                    observer.next(courses);
                }
                else {
                    observer.error("No records found");
                }
            });
        });
    };
    StarsService.prototype.getActions = function (students) {
        var _this = this;
        return new Observable_1.Observable.create(function (observer) {
            _this.ds.getResource('actions').subscribe(function (actions) {
                actions = actions.filter(function (a) { return _this.containsAny(students, a.Students, 'StudentId'); });
                if (actions.length > 0) {
                    observer.next(actions);
                }
                else {
                    observer.error("No records found");
                }
            });
        });
    };
    StarsService.prototype.getActionTypes = function () {
        return this.ds.getResource('actionTypes');
    };
    StarsService.prototype.getStaff = function () {
        return this.ds.getResource('staff');
    };
    StarsService.prototype.getPrograms = function () {
        return this.ds.getResource('programs');
    };
    /*
     Check if an array contains any elements in another array
     e.g. check if student.Courses contain any of the instructorCourses
     Further details @ http://stackoverflow.com/questions/16312528/check-if-an-array-contains-any-elements-in-another-array-in-javascript
    */
    StarsService.prototype.containsAny = function (objectsArray, valuesArray, objectProperty) {
        var result = objectsArray.filter(function (o) { return valuesArray.indexOf(o[objectProperty]) >= 0; });
        return (result.length > 0);
    };
    StarsService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [DataService_1.default])
    ], StarsService);
    return StarsService;
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = StarsService;
//# sourceMappingURL=StarsService.js.map