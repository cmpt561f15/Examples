var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var angular2_1 = require('angular2/angular2');
var StatusComponent = (function () {
    function StatusComponent() {
        this.change = new angular2_1.EventEmitter();
        this.active = true;
        this.isSelected = false;
    }
    StatusComponent.prototype.onClick = function () {
        if (!this.active)
            return;
        this.isSelected = !this.isSelected;
        this.change.next({ status: this.isSelected });
    };
    __decorate([
        angular2_1.Input(), 
        __metadata('design:type', Boolean)
    ], StatusComponent.prototype, "active");
    __decorate([
        angular2_1.Output(), 
        __metadata('design:type', angular2_1.EventEmitter)
    ], StatusComponent.prototype, "change");
    StatusComponent = __decorate([
        angular2_1.Component({
            selector: 'status',
            templateUrl: 'app/status.component.html',
            directives: [angular2_1.CORE_DIRECTIVES],
            styleUrls: ['app/status.component.css']
        }), 
        __metadata('design:paramtypes', [])
    ], StatusComponent);
    return StatusComponent;
})();
exports.StatusComponent = StatusComponent;
//# sourceMappingURL=status.component.js.map