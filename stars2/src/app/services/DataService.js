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
var http_1 = require('angular2/http');
require('rxjs/add/operator/map');
var DataService = (function () {
    function DataService(http) {
        this.http = http;
        this.resourceUrls = new Map();
        this.resourceUrls.set('courses', './data/course.json');
        this.resourceUrls.set('programs', './data/program.json');
        this.resourceUrls.set('students', './data/student.json');
        this.resourceUrls.set('staff', './data/staff.json');
        this.resourceUrls.set('actions', './data/action.json');
        this.resourceUrls.set('actionTypes', './data/actionType.json');
        this.resourceUrls.set('adviserTypes', './data/advisertype.json');
    }
    DataService.prototype.getResource = function (resource) {
        var url = this.resourceUrls.get(resource);
        //alert (url);
        return this.http.get(url).map(function (response) { return response.json(); });
    };
    DataService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], DataService);
    return DataService;
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DataService;
//# sourceMappingURL=DataService.js.map