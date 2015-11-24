var DataService_1 = require('./DataService');
var StarsService = (function () {
    function StarsService() {
        this.dataService = new DataService_1.default();
    }
    StarsService.prototype.getStudentsByProgram = function (program) {
        var _this = this;
        //Convert a string value to an array if needed
        var programs = typeof program === "string" ? [program] : program;
        return new Promise(function (resolve, reject) {
            _this.dataService.getResource('students').then(function (students) {
                students = students.filter(function (s) { return programs.indexOf(s.Program) >= 0; });
                if (students.length > 0) {
                    resolve([students, programs]);
                }
                else {
                    reject("No records found");
                }
            });
        });
    };
    StarsService.prototype.getStudentsByCourse = function (instructorCourses) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.dataService.getResource('students').then(function (students) {
                students = students.filter(function (s) { return _this.containsAny(instructorCourses, s.Courses, 'CRN'); });
                console.log("instructorCourses", instructorCourses);
                if (students.length > 0) {
                    resolve(students, instructorCourses);
                }
                else {
                    reject("No records found");
                }
            });
        });
    };
    StarsService.prototype.getStudentsByInstructor = function (instructorId) {
        var _this = this;
        var instructorCourses;
        return new Promise(function (resolve, reject) {
            _this.getCourses(instructorId).then(function (courses) {
                instructorCourses = courses;
                return _this.dataService.getResource('students');
            }).then(function (students) {
                students = students.filter(function (s) { return _this.containsAny(instructorCourses, s.Courses, 'CRN'); });
                if (students.length > 0) {
                    resolve([students, instructorCourses]);
                }
                else {
                    reject("No records found");
                }
            });
        });
    };
    StarsService.prototype.getCourses = function (instructorId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.dataService.getResource('courses').then(function (courses) {
                courses = courses.filter(function (c) { return c.InstructorId == instructorId; });
                if (courses.length > 0) {
                    resolve(courses);
                }
                else {
                    reject("No records found");
                }
            });
        });
    };
    StarsService.prototype.getActions = function (students) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.dataService.getResource('actions').then(function (actions) {
                actions = actions.filter(function (a) { return _this.containsAny(students, a.Students, 'StudentId'); });
                if (actions.length > 0) {
                    resolve(actions);
                }
                else {
                    reject("No records found");
                }
            });
        });
    };
    StarsService.prototype.getActionTypes = function () {
        return this.dataService.getResource('actionTypes');
    };
    StarsService.prototype.getStaff = function () {
        return this.dataService.getResource('staff');
    };
    StarsService.prototype.getPrograms = function () {
        return this.dataService.getResource('programs');
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
    return StarsService;
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = StarsService;
//# sourceMappingURL=StarsService.js.map