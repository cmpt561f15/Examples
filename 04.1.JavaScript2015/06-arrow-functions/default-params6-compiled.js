'use strict';

var greeting = function greeting(name) {
  var msg = arguments.length <= 1 || arguments[1] === undefined ? "Salam" : arguments[1];
  return msg + ' ' + name;
};

console.log(greeting('Samir', 'Hello'));
console.log(greeting('Samir'));

//# sourceMappingURL=default-params6-compiled.js.map