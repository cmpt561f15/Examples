"use strict";

var obj = {

    init: function init() {
        var _this = this;

        //var self = this;
        console.log("waiting 2 seconds");
        setTimeout(function () {
            return _this.doSomething();
        }, 2000);
    },

    doSomething: function doSomething() {
        console.log("doing something in ES5");
    }

};

obj.init();

//# sourceMappingURL=this5-compiled.js.map