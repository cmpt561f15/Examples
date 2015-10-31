'use strict';

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Shape = (function () {
    function Shape(x, y) {
        _classCallCheck(this, Shape);

        this.x = x;
        this.y = y;
    }

    _createClass(Shape, [{
        key: 'render',
        value: function render() {
            console.log('Rendering shape');
        }
    }]);

    return Shape;
})();

var Circle = (function (_Shape) {
    _inherits(Circle, _Shape);

    function Circle(x, y, radius) {
        _classCallCheck(this, Circle);

        _get(Object.getPrototypeOf(Circle.prototype), 'constructor', this).call(this, x, y);
        this.radius = radius;
    }

    _createClass(Circle, [{
        key: 'render',
        value: function render() {
            console.log('Rendering circle at ' + this.x + ' , ' + this.x);
        }
    }, {
        key: 'circumference',
        get: function get() {
            return 2 * Circle.pi * this.radius;
        }
    }], [{
        key: 'pi',
        get: function get() {
            return 3.14159265359;
        }
    }]);

    return Circle;
})(Shape);

var c = new Circle(20, 10, 50);
console.log(c.x);
c.x = 5;
console.log(c.x);
console.log(Circle.pi);
console.log(c.circumference);
c.render();

//# sourceMappingURL=inheritance-compiled.js.map