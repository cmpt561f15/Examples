var Utils = (function () {
    function Utils() {
    }
    Utils.redirect = function (url) {
        var url = this.getBaseUrl() + '/' + url;
        $(location).attr('href', url);
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
        localStorage.removeItem('currentUser');
        localStorage.removeItem('courses');
        localStorage.removeItem('programs');
        localStorage.removeItem('students');
        this.redirect('login.html');
    };
    return Utils;
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Utils;
//# sourceMappingURL=Utils.js.map