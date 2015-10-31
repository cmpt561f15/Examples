"use strict";

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

var colors = ["red", "green", "blue"];

// Create Variables from Array
var primaryColor = colors[0];
var secondaryColor = colors[1];
var tertiaryColor = colors[2];

console.log(primaryColor);
console.log(secondaryColor);
console.log(tertiaryColor);

var _arr = ["a", "b", "c"];
for (var _i = 0; _i < _arr.length; _i++) {
    var value = _arr[_i];
    console.log(value);
}
// "a"
// "b"
// "c"

var abcArray = [].concat(_toConsumableArray("abc"));
console.log(abcArray); // ["a", "b", "c"]

//# sourceMappingURL=array-destructuring6-compiled.js.map