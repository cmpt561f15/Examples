System.register(['angular2/core', 'angular2/common', 'angular2/router', '../services/stars-service', "./ActionEditor", "./ActionViewer"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, common_1, router_1, stars_service_1, ActionEditor_1, ActionViewer_1;
    var ActionsList;
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
            },
            function (ActionEditor_1_1) {
                ActionEditor_1 = ActionEditor_1_1;
            },
            function (ActionViewer_1_1) {
                ActionViewer_1 = ActionViewer_1_1;
            }],
        execute: function() {
            ActionsList = (function () {
                function ActionsList(starsService, router, params) {
                    this.starsService = starsService;
                    this.router = router;
                    this.params = params;
                    if (typeof starsService.currentUser === 'undefined') {
                        router.navigate(['/Login']);
                    }
                    this.selectedStudentId = params.get('id');
                    this.selectedActionBy = 'Me';
                    this.onParamChanged(this.selectedStudentId, this.selectedActionBy);
                }
                ActionsList.prototype.onParamChanged = function (studentId, actionBy) {
                    studentId = parseInt(studentId);
                    this.starsService.getActions(studentId, actionBy);
                };
                ActionsList.prototype.onChangeStudent = function (direction) {
                    var i = 0;
                    for (i; i < this.starsService.students.length; i++) {
                        if (this.starsService.students[i].StudentId == this.selectedStudentId) {
                            break;
                        }
                    }
                    if (direction == "next" && i < this.starsService.students.length - 1) {
                        this.selectedStudentId = this.starsService.students[i + 1].StudentId;
                    }
                    else if (direction == "previous" && i > 0) {
                        this.selectedStudentId = this.starsService.students[i - 1].StudentId;
                    }
                    this.onParamChanged(this.selectedStudentId, this.selectedActionBy);
                };
                ActionsList.prototype.onDelete = function (actionId) {
                    if (confirm("Confirm delete?")) {
                        this.starsService.deleteAction(actionId);
                    }
                    return false;
                };
                ActionsList = __decorate([
                    core_1.Component({
                        selector: 'actions',
                        templateUrl: './app/components/actions.html',
                        directives: [common_1.CORE_DIRECTIVES, router_1.ROUTER_DIRECTIVES, ActionEditor_1.ActionEditor, ActionViewer_1.ActionViewer]
                    }), 
                    __metadata('design:paramtypes', [stars_service_1.default, router_1.Router, router_1.RouteParams])
                ], ActionsList);
                return ActionsList;
            })();
            exports_1("ActionsList", ActionsList);
        }
    }
});
//# sourceMappingURL=actions.js.map