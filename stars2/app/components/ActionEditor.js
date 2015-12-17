System.register(['angular2/core', 'angular2/common', "../services/stars-service", "../models/action"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, common_1, stars_service_1, action_1;
    var ActionEditor;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (stars_service_1_1) {
                stars_service_1 = stars_service_1_1;
            },
            function (action_1_1) {
                action_1 = action_1_1;
            }],
        execute: function() {
            ActionEditor = (function () {
                function ActionEditor(starsService) {
                    this.starsService = starsService;
                }
                ActionEditor.prototype.edit = function (action) {
                    console.log("ActionEditor", action);
                    this.action = action;
                };
                ActionEditor.prototype.add = function (students) {
                    var byWhom = this.starsService.currentUser.Username;
                    this.action = new action_1.Action(0, this.getTodayDate(), '', '', '', byWhom, undefined, students);
                    console.log("ActionEditor.add.action", this.action);
                };
                ActionEditor.prototype.onFormSubmit = function () {
                    if (this.action.ActionId === 0) {
                        this.starsService.addAction(this.action);
                    }
                    console.log("ActionEditor.action", this.action);
                };
                ActionEditor.prototype.getTodayDate = function () {
                    var date = new Date;
                    return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
                };
                ActionEditor = __decorate([
                    core_1.Component({
                        selector: 'action-editor',
                        templateUrl: './app/components/actionEdictor.html',
                        directives: [common_1.CORE_DIRECTIVES]
                    }), 
                    __metadata('design:paramtypes', [stars_service_1.default])
                ], ActionEditor);
                return ActionEditor;
            })();
            exports_1("ActionEditor", ActionEditor);
        }
    }
});
//# sourceMappingURL=ActionEditor.js.map