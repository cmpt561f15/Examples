/**
 * Classes and Inheritance
 * Code Example from http://www.es6fiddle.net/
 */
'use strict';

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Polygon = (function () {
    function Polygon(height, width) {
        _classCallCheck(this, Polygon);

        //class constructor
        this.name = 'Polygon';
        this.height = height;
        this.width = width;
    }

    _createClass(Polygon, [{
        key: 'sayName',
        value: function sayName() {
            //class method
            console.log('Hi, I am a', this.name + '.');
        }
    }, {
        key: 'area',
        get: function get() {
            //calculated attribute getter
            return this.height * this.width;
        }
    }]);

    return Polygon;
})();

var Square = (function (_Polygon) {
    _inherits(Square, _Polygon);

    function Square() {
        var length = arguments.length <= 0 || arguments[0] === undefined ? 10 : arguments[0];

        _classCallCheck(this, Square);

        // ES6 features Default Parameters
        _get(Object.getPrototypeOf(Square.prototype), 'constructor', this).call(this, length, length); //call the parent method with super
        this.name = 'Square';
    }

    return Square;
})(Polygon);

var s = new Square(5);

s.sayName(); // => Hi, I am a Square.
console.log(s.area); // => 25

console.log(new Square().area); // => 100

//# sourceMappingURL=square-compiled.js.map