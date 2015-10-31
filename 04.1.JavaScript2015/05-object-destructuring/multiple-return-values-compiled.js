"use strict";

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();

function timeLeft(seconds) {
    var mins = Math.floor(seconds / 60);
    var secs = seconds % 60;
    // return two values in array
    return [mins, secs];
}

//We can use destructing to create variables m and s from the returned array

var _timeLeft = timeLeft(450);

var _timeLeft2 = _slicedToArray(_timeLeft, 2);

var m = _timeLeft2[0];
var s = _timeLeft2[1];

var sentence = "You've got " + (m ? m + " minutes and " : " ") + s + " seconds left!";

console.log(m, s);
console.log(sentence);

//# sourceMappingURL=multiple-return-values-compiled.js.map