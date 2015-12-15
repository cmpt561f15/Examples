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
var Utils_1 = require('../services/Utils');
var ActionsComponent = (function () {
    function ActionsComponent(router, params) {
        var _this = this;
        this.router = router;
        this.params = params;
        this.currentUser = JSON.parse(localStorage.currentUser);
        this.isAdviser = (this.currentUser.Type === 'Adviser');
        this.isFaculty = (this.currentUser.Type === "Faculty");
        this.students = JSON.parse(localStorage.students);
        this.actions = JSON.parse(localStorage.actions);
        this.coordinators = JSON.parse(localStorage.coordinators);
        this.advisors = JSON.parse(localStorage.advisors);
        this.DeleteActionCofirm = false;
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
        this.openForm = false;
        if (this.isAdviser) {
            this.programs = JSON.parse(localStorage.programs);
        }
        else if (this.isFaculty) {
            this.courses = JSON.parse(localStorage.courses);
        }
        this.currentStudentId = parseInt(params.get('id'));
        this.filteredActions = this.actions.filter(function (a) {
            return a.Students.indexOf(_this.currentStudentId) >= 0;
        });
        this.selectedStudent = this.currentStudentId;
        this.selectedActionBy = 'me';
        this.filterActionsBy('me');
    }
    ActionsComponent.prototype.onLogout = function () {
        localStorage.clear();
    };
    ActionsComponent.prototype.filterActionsBy = function (actionBy) {
        var _this = this;
        this.filteredActions = this.actions.filter(function (a) {
            return a.Students.indexOf(_this.currentStudentId) >= 0;
        });
        switch (actionBy) {
            case 'me':
                this.filteredActions = this.filteredActions.filter(function (a) {
                    return a.ByWhom === _this.currentUser.Username;
                });
                break;
            case 'adviser':
                this.filteredActions = this.filteredActions.filter(function (a) {
                    return _this.advisors.indexOf(a.ByWhom) >= 0;
                });
                break;
            case 'coordinator':
                this.filteredActions = this.filteredActions.filter(function (a) {
                    return _this.coordinators.indexOf(a.ByWhom) >= 0;
                });
                break;
            case 'faculty':
                this.filteredActions = this.filteredActions.filter(function (a) {
                    return _this.coordinators.indexOf(a.ByWhom) < 0 && _this.advisors.indexOf(a.ByWhom) < 0;
                });
                break;
        }
    };
    ActionsComponent.prototype.selectStudent = function (studentId) {
        this.currentStudentId = parseInt(studentId);
        this.selectedActionBy = 'me';
        this.filterActionsBy('me');
    };
    ActionsComponent.prototype.nextStudent = function (studentId) {
        var nextStuentIndex = (this.students.map(function (s) { return parseInt(s.StudentId); }).indexOf(parseInt(studentId))) + 1;
        if (nextStuentIndex >= this.students.length) {
            return;
        }
        else {
            var nextStudetnId = this.students[nextStuentIndex].StudentId;
            this.currentStudentId = nextStudetnId;
            this.selectedStudent = nextStudetnId;
            this.selectStudent(nextStudetnId);
        }
    };
    ActionsComponent.prototype.prevStudent = function (studentId) {
        var prevStuentIndex = (this.students.map(function (s) { return parseInt(s.StudentId); }).indexOf(parseInt(studentId))) - 1;
        if (prevStuentIndex < 0) {
            return;
        }
        else {
            var prevStudetnId = this.students[prevStuentIndex].StudentId;
            this.currentStudentId = prevStudetnId;
            this.selectedStudent = prevStudetnId;
            this.selectStudent(prevStudetnId);
        }
    };
    ActionsComponent.prototype.showConfirm = function (actionId, event) {
        event.preventDefault();
        this.deletActionId = actionId;
        this.DeleteActionCofirm = true;
        //this.router.navigateByUrl(`/actions/${this.currentStudentId}(deleteAction)`);
        //console.log(actionId);
    };
    ActionsComponent.prototype.onCofirm = function () {
        var _this = this;
        this.filteredActions = this.filteredActions.filter(function (a) { return a.ActionId != _this.deletActionId; });
        this.actions = this.actions.filter(function (a) { return a.ActionId != _this.deletActionId; });
        localStorage.setItem('actions', JSON.stringify(this.actions));
        this.onClose();
    };
    ActionsComponent.prototype.onClose = function () {
        this.DeleteActionCofirm = false;
    };
    ActionsComponent.prototype.actionEditor = function (actionId, event, mode) {
        var _this = this;
        this.openForm = true;
        var tempAction;
        this.editActionMode = mode;
        switch (mode) {
            case "Edit":
                event.preventDefault();
                tempAction = this.actions.filter(function (a) { return a.ActionId == parseInt(actionId); })[0];
                this.editedAction = tempAction;
                this.editedActionDate = Utils_1.default.toDate(tempAction.Date);
                console.log(this.editedActionDate);
                break;
            case "Add":
                var ids = this.actions.map(function (a) { return a.ActionId; });
                var nextId = Math.max.apply(Math, ids) + 1;
                var courseCRN = '';
                if (this.isFaculty) {
                    var studentCourses = this.students.filter(function (s) { return _this.selectedStudent == s.StudentId; })
                        .map(function (s) { return s.Courses; });
                    var instructorCourses = this.courses.filter(function (c) { return c.InstructorId == _this.currentUser.StaffNo; }).map(function (c) { return c.CRN; });
                    studentCourses[0].forEach(function (c) {
                        if (instructorCourses.indexOf(parseInt(c)) >= 0) {
                            courseCRN = c;
                        }
                    });
                }
                this.editedAction = editedAction = {
                    "ActionId": nextId,
                    "Date": Utils_1.default.formatDate(Utils_1.default.setTodayDate()),
                    "ActionType": '',
                    "Title": '',
                    "Description": '',
                    "ByWhom": this.currentUser.Firstname,
                    "CourseCRN": courseCRN,
                    "Students": this.selectedStudent
                };
                this.editedActionDate = Utils_1.default.setTodayDate();
                //console.log(this.editedAction);
                break;
        }
        //console.log(this.editedAction);
        // console.log(mode)
    };
    ActionsComponent.prototype.onCloseForm = function () {
        this.openForm = false;
    };
    ActionsComponent.prototype.onSubmitForm = function (event) {
        this.openForm = false;
        console.log(event);
        if (event != "null") {
            this.actions.push((event));
            this.filteredActions.push((event));
        }
        localStorage.setItem('actions', JSON.stringify(this.actions));
    };
    ActionsComponent.prototype.onTest = function () {
        //alert("hello");
        //this.router.navigate(['/Login']);
        this.router.navigateByUrl('/(deleteAction)');
    };
    ActionsComponent = __decorate([
        core_1.Component({
            selector: 'Actions',
            templateUrl: './app/components/actions.html',
            directives: [common_1.CORE_DIRECTIVES, router_1.ROUTER_DIRECTIVES, actionForm_1.actionFormComponent]
        }), 
        __metadata('design:paramtypes', [router_1.Router, router_1.RouteParams])
    ], ActionsComponent);
    return ActionsComponent;
})();
exports.ActionsComponent = ActionsComponent;
//# sourceMappingURL=actions.js.map