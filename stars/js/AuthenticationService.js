var DataService_1 = require('./DataService');
var AuthenticationService = (function () {
    function AuthenticationService() {
    }
    AuthenticationService.login = function (username, password) {
        return new Promise(function (resolve, reject) {
            var ds = new DataService_1.default();
            ds.getResource('staff').then(function (users) {
                users = users.filter(function (s) { return s.Username === username && s.Password === password; });
                if (users.length > 0) {
                    resolve(users[0]);
                }
                else {
                    reject("Invalid username and/or password");
                }
            });
        });
    };
    return AuthenticationService;
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AuthenticationService;
//# sourceMappingURL=AuthenticationService.js.map