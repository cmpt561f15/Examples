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
var Utils_1 = require('../services/Utils');
var actionFormComponent = (function () {
    function actionFormComponent() {
        this.closeform = new core_1.EventEmitter();
        this.submitform = new core_1.EventEmitter();
        this.titleerror = false;
        this.dateerror = false;
        this.typeerror = false;
    }
    actionFormComponent.prototype.closeForm = function () {
        this.closeform.next();
    };
    actionFormComponent.prototype.submitForm = function () {
        if (this.action.ActionType == "") {
            this.typeerror = true;
            return;
        }
        else if (this.action.Title == "") {
            this.titleerror = true;
            return;
        }
        if (this.mode == 'Edit') {
            if (this.action.Date == "") {
                this.dateerror = true;
                return;
            }
            this.action.Date = Utils_1.default.formatDate(this.actiondate);
            this.submitform.next("null");
        }
        else if (this.mode == 'Add') {
            this.action.Date = Utils_1.default.formatDate(this.actiondate);
            //console.log(this.action);
            var tempstutent = [this.action.Students];
            if (typeof (this.action.Students) != 'number') {
                tempstutent = this.action.Students;
            }
            var tempaction = {
                "ActionId": this.action.ActionId,
                "Date": this.action.Date,
                "ActionType": this.action.ActionType,
                "Title": this.action.Title,
                "Description": this.action.Description,
                "ByWhom": this.action.ByWhom.toLowerCase(),
                "CourseCRN": this.action.CourseCRN,
                "Students": tempstutent };
            this.submitform.next(tempaction);
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], actionFormComponent.prototype, "mode", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], actionFormComponent.prototype, "action", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], actionFormComponent.prototype, "actiondate", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], actionFormComponent.prototype, "closeform", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], actionFormComponent.prototype, "submitform", void 0);
    actionFormComponent = __decorate([
        core_1.Component({
            selector: 'action-form',
            templateUrl: './app/components/actionForm.html',
            directives: [common_1.CORE_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], actionFormComponent);
    return actionFormComponent;
})();
exports.actionFormComponent = actionFormComponent;
//# sourceMappingURL=actionForm.js.map