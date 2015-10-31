"use strict";

var myArray = [1, 2, 3];

var sum = function sum(array) {
    var total = 0;
    array.forEach(function (item) {
        return total = total + item;
    });
    return total;
};

var total = sum(myArray);
console.log(total);

//# sourceMappingURL=foreach6-compiled.js.map