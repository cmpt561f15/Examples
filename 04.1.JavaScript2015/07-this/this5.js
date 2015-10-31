var obj = {

    init: function () {
        //var self = this;
        console.log("waiting 2 seconds");
        setTimeout(() => this.doSomething(),
         2000);
    },

    doSomething: function() {
        console.log("doing something in ES5");
    }

};

obj.init();