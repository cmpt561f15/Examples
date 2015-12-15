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
var actionForm_1 = require("./actionForm");
var Utils_1 = require("../services/Utils");
var StudentsComponent = (function () {
    function StudentsComponent(router) {
        this.router = router;
        this.currentUser = JSON.parse(localStorage.currentUser);
        this.students = JSON.parse(localStorage.students);
        this.actions = JSON.parse(localStorage.actions);
        this.filteredStudents = this.students;
        this.checkedStudents = [];
        this.isAdviser = (this.currentUser.Type === 'Adviser');
        this.isFaculty = (this.currentUser.Type === "Faculty");
        this.openForm = false;
        this.editedAction = {
            "ActionId": '',
            "Date": '',
            "ActionType": '',
            "Title": '',
            "Description": '',
            "ByWhom": '',
            "CourseCRN": '',
            "Students": ''
        };
        if (this.currentUser.Type === 'Adviser') {
            this.programs = JSON.parse(localStorage.programs);
        }
        else if (this.currentUser.Type === "Faculty") {
            this.courses = JSON.parse(localStorage.courses);
        }
    }
    StudentsComponent.prototype.onLogout = function () {
        localStorage.clear();
    };
    StudentsComponent.prototype.filterByProgram = function (programDD) {
        if (programDD == "ALL") {
            this.filteredStudents = this.students;
        }
        else {
            this.filteredStudents = this.students.filter(function (s) { return s.Program == programDD; });
        }
    };
    StudentsComponent.prototype.filterByCourse = function (courseDD) {
        if (courseDD == "ALL") {
            this.filteredStudents = this.students;
        }
        else {
            this.filteredStudents = this.students.filter(function (s) { return s.Courses.indexOf(parseInt(courseDD)) >= 0; });
        }
    };
    StudentsComponent.prototype.selectCheckbox = function (event) {
        if (event.target.checked) {
            this.checkedStudents.push(parseInt(event.target.value));
        }
        else {
            this.checkedStudents = this.checkedStudents.filter(function (s) { return s != parseInt(event.target.value); });
        }
        console.log(this.checkedStudents);
    };
    StudentsComponent.prototype.actionEditor = function () {
        var _this = this;
        if (this.checkedStudents.length == 0) {
            alert("Please select student first");
            return false;
        }
        this.openForm = true;
        var tempAction;
        this.editActionMode = 'Add';
        var ids = this.actions.map(function (a) { return a.ActionId; });
        var nextId = Math.max.apply(Math, ids) + 1;
        var courseCRN = '';
        if (this.isFaculty) {
            var studentCourses = this.students.filter(function (s) { return (_this.checkedStudents.indexOf(s.StudentId)); })
                .map(function (s) { return s.Courses; });
            courseCRN = studentCourses[0][0];
            console.log(courseCRN);
        }
        this.editedAction = {
            "ActionId": nextId,
            "Date": Utils_1.default.formatDate(Utils_1.default.setTodayDate()),
            "ActionType": '',
            "Title": '',
            "Description": '',
            "ByWhom": this.currentUser.Firstname,
            "CourseCRN": courseCRN,
            "Students": this.checkedStudents
        };
        this.editedActionDate = Utils_1.default.setTodayDate();
        //console.log(this.editedAction);
        //console.log(this.editedAction);
        // console.log(mode)
    };
    StudentsComponent.prototype.onCloseForm = function () {
        this.openForm = false;
    };
    StudentsComponent.prototype.onSubmitForm = function (event) {
        this.openForm = false;
        console.log(event);
        if (event != "null") {
            this.actions.push((event));
        }
        localStorage.setItem('actions', JSON.stringify(this.actions));
    };
    StudentsComponent = __decorate([
        core_1.Component({
            selector: 'Students',
            templateUrl: './app/components/students.html',
            directives: [common_1.CORE_DIRECTIVES, router_1.ROUTER_DIRECTIVES, actionForm_1.actionFormComponent]
        }), 
        __metadata('design:paramtypes', [router_1.Router])
    ], StudentsComponent);
    return StudentsComponent;
})();
exports.StudentsComponent = StudentsComponent;
//# sourceMappingURL=students.js.map