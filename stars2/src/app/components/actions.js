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
var stars_service_1 = require('../services/stars-service');
var actionForm_1 = require("./actionForm");
var Utils_1 = require('../services/Utils');
var ActionsComponent = (function () {
    function ActionsComponent(starsService, router, params) {
        var _this = this;
        this.starsService = starsService;
        this.router = router;
        this.params = params;
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
        this.isAdviser = (this.starsService.currentUser.Type === 'Adviser');
        this.isFaculty = (this.starsService.currentUser.Type === "Faculty");
        this.currentStudentId = parseInt(params.get('id'));
        this.filteredActions = this.starsService.actions.filter(function (a) {
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
        this.filteredActions = this.starsService.actions.filter(function (a) {
            return a.Students.indexOf(_this.currentStudentId) >= 0;
        });
        switch (actionBy) {
            case 'me':
                this.filteredActions = this.filteredActions.filter(function (a) {
                    return a.ByWhom === _this.starsService.currentUser.Username;
                });
                break;
            case 'adviser':
                this.filteredActions = this.filteredActions.filter(function (a) {
                    return _this.starsService.advisors.indexOf(a.ByWhom) >= 0;
                });
                break;
            case 'coordinator':
                this.filteredActions = this.filteredActions.filter(function (a) {
                    return _this.starsService.coordinators.indexOf(a.ByWhom) >= 0;
                });
                break;
            case 'faculty':
                this.filteredActions = this.filteredActions.filter(function (a) {
                    return _this.starsService.coordinators.indexOf(a.ByWhom) < 0 && _this.starsService.advisors.indexOf(a.ByWhom) < 0;
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
        var nextStuentIndex = (this.starsService.students.map(function (s) { return parseInt(s.StudentId); }).indexOf(parseInt(studentId))) + 1;
        if (nextStuentIndex >= this.starsService.students.length) {
            return;
        }
        else {
            var nextStudetnId = this.starsService.students[nextStuentIndex].StudentId;
            this.currentStudentId = nextStudetnId;
            this.selectedStudent = nextStudetnId;
            this.selectStudent(nextStudetnId);
        }
    };
    ActionsComponent.prototype.prevStudent = function (studentId) {
        var prevStuentIndex = (this.starsService.students.map(function (s) { return parseInt(s.StudentId); }).indexOf(parseInt(studentId))) - 1;
        if (prevStuentIndex < 0) {
            return;
        }
        else {
            var prevStudetnId = this.starsService.students[prevStuentIndex].StudentId;
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
        //ToDo: improve delete actions
        this.filteredActions = this.filteredActions.filter(function (a) { return a.ActionId != _this.deletActionId; });
        this.starsService.deleteAction(this.deletActionId);
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
                tempAction = this.starsService.actions.filter(function (a) { return a.ActionId == parseInt(actionId); })[0];
                this.editedAction = tempAction;
                this.editedActionDate = Utils_1.default.toDate(tempAction.Date);
                console.log(this.editedActionDate);
                break;
            case "Add":
                //ToDo: improve this and simplify it
                var ids = this.starsService.actions.map(function (a) { return a.ActionId; });
                var nextId = Math.max.apply(Math, ids) + 1;
                var courseCRN = '';
                if (this.isFaculty) {
                    var studentCourses = this.starsService.students.filter(function (s) { return _this.selectedStudent == s.StudentId; })
                        .map(function (s) { return s.Courses; });
                    var instructorCourses = this.starsService.instructorCourses; //this.courses.filter(c => c.InstructorId == this.starsService.currentUser.StaffNo).map(c => c.CRN);
                    studentCourses[0].forEach(function (c) {
                        if (instructorCourses.indexOf(parseInt(c)) >= 0) {
                            courseCRN = c;
                        }
                    });
                }
                this.editedAction = editedAction = {
                    "ActionId": nextId,
                    "Date": Utils_1.default.formatDate(Utils_1.default.getTodayDate()),
                    "ActionType": '',
                    "Title": '',
                    "Description": '',
                    "ByWhom": this.starsService.currentUser.Firstname,
                    "CourseCRN": courseCRN,
                    "Students": this.selectedStudent
                };
                this.editedActionDate = Utils_1.default.getTodayDate();
                //console.log(this.editedAction);
                break;
        }
    };
    ActionsComponent.prototype.onCloseForm = function () {
        this.openForm = false;
    };
    ActionsComponent.prototype.onSubmitForm = function (event) {
        this.openForm = false;
        console.log(event);
        if (event != "null") {
            this.starsService.actions.push((event));
            this.filteredActions.push((event));
        }
        localStorage.setItem('actions', JSON.stringify(this.starsService.actions));
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
        __metadata('design:paramtypes', [stars_service_1.default, router_1.Router, router_1.RouteParams])
    ], ActionsComponent);
    return ActionsComponent;
})();
exports.ActionsComponent = ActionsComponent;
//# sourceMappingURL=actions.js.map