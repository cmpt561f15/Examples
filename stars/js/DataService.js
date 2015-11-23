var DataService = (function () {
    function DataService() {
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
        return new Promise(function (resolve, reject) {
            $.get(url).then(resolve, reject);
        });
    };
    return DataService;
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DataService;
//# sourceMappingURL=DataService.js.map