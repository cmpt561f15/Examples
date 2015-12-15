var Utils = (function () {
    function Utils() {
    }
    Utils.redirect = function (url) {
        //let url = this.getBaseUrl() + '/' + url;
        location.href = url;
    };
    Utils.getBaseUrl = function () {
        var baseUrl = window.location.origin;
        //let pathArray = window.location.pathname.split( '/' );
        //console.log(pathArray);
        baseUrl = baseUrl + '/' + window.location.pathname.split('/')[1];
        return baseUrl;
    };
    Utils.setUserInfo = function (currentUser) {
        $('#userFullname').text(currentUser.Firstname + " " + currentUser.Lastname);
    };
    Utils.logout = function () {
        localStorage.clear();
        this.redirect('login.html');
    };
    Utils.getQueryStringValue = function (param) {
        var sPageURL = window.location.search.substring(1);
        var queryStringVars = sPageURL.split('&');
        for (var i = 0; i < queryStringVars.length; i++) {
            var paramName = queryStringVars[i].split('=');
            if (paramName[0] == param) {
                return paramName[1];
            }
        }
    };
    Utils.setTodayDate = function () {
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