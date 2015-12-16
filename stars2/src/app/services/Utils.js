var Utils = (function () {
    function Utils() {
    }
    Utils.getTodayDate = function () {
        var date = new Date;
        return date.getFullYear() + "-" + date.getDate() + "-" + (date.getMonth() + 1);
    };
    Utils.toDate = function (strDate) {
        var dateParts = strDate.split("/");
        console.log("dateParts: ", dateParts);
        if (parseInt(dateParts[0]) < 10) {
            return dateParts[2] + "-" + dateParts[1] + "-0" + dateParts[0];
        }
        else {
            return dateParts[2] + "-" + dateParts[1] + "-" + dateParts[0];
        }
    };
    Utils.formatDate = function (date) {
        var dateParts = date.split("-");
        return dateParts[2] + "/" + dateParts[1] + "/" + dateParts[0];
    };
    return Utils;
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Utils;
//# sourceMappingURL=Utils.js.map