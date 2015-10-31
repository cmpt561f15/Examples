"use strict";

var Greeter = (function () {
    function Greeter(message) {
        this.greeting = message;
    }
    Greeter.prototype.greet = function () {
        return "Hello, " + this.greeting;
    };
    return Greeter;
})();
var greeter = new Greeter("world");
console.log(greeter.greet());
//# sourceMappingURL=Greeter.js.map

//# sourceMappingURL=Greeter-compiled.js.map

//# sourceMappingURL=Greeter-compiled-compiled.js.map