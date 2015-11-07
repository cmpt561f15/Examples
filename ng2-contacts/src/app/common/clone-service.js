var CloneService = (function () {
    function CloneService() {
    }
    CloneService.prototype.setItem = function (item) {
        this.originalItem = item;
        this.currentItem = this.clone(item);
    };
    CloneService.prototype.getItem = function () {
        return this.currentItem;
    };
    CloneService.prototype.restoreItem = function () {
        this.currentItem = this.originalItem;
        return this.getItem();
    };
    CloneService.prototype.commitChanges = function () {
        Object.assign(this.originalItem, this.currentItem);
        ;
    };
    CloneService.prototype.clone = function (item) {
        // super poor clone implementation
        return JSON.parse(JSON.stringify(item));
    };
    return CloneService;
})();
exports.CloneService = CloneService;
//# sourceMappingURL=clone-service.js.map