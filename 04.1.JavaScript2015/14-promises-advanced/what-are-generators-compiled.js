//what are generators?
//they're pausable functions, pausable iterable objects, to be more precise
//they're defined with the *
'use strict';

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

var myGen = regeneratorRuntime.mark(function myGen() {
    var one, two, three;
    return regeneratorRuntime.wrap(function myGen$(context$1$0) {
        while (1) switch (context$1$0.prev = context$1$0.next) {
            case 0:
                context$1$0.next = 2;
                return 1;

            case 2:
                one = context$1$0.sent;
                context$1$0.next = 5;
                return 2;

            case 5:
                two = context$1$0.sent;
                context$1$0.next = 8;
                return 3;

            case 8:
                three = context$1$0.sent;

                console.log(one, two, three);

            case 10:
            case 'end':
                return context$1$0.stop();
        }
    }, myGen, this);
});
var gen = myGen(); //get the generator ready to run
//when you run next() on a generator, it runs until a yield, then waits until next() is called again
console.log(gen.next()); //{value:1, done: false}
console.log(gen.next()); //{value:2, done: false}
console.log(gen.next()); //{value:3, done: false}
console.log(gen.next()); //{value:undefined, done: true}
console.log(gen.next()); //errors because you can't call next() on a closed generator

//so yippee, when do I ever have to yield numbers?  Seems silly
//the magic happens when smarter code wraps the generator
function smartCode(generator) {
    var gen = generator();
    var yieldedVal = gen.next();
    if (yieldedVal.then) {
        //it's a promise!!!
        yieldedVal.then(gen.next);
    }
}

//enter libraries like Co, Bluebird, Q...let's use Bluebird
Promise.coroutine(regeneratorRuntime.mark(function callee$0$0() {
    var tweets;
    return regeneratorRuntime.wrap(function callee$0$0$(context$1$0) {
        while (1) switch (context$1$0.prev = context$1$0.next) {
            case 0:
                context$1$0.next = 2;
                return $.get('tweets.json');

            case 2:
                tweets = context$1$0.sent;

                console.log(tweets);

            case 4:
            case 'end':
                return context$1$0.stop();
        }
    }, callee$0$0, this);
}))();
//Bluebird runs the generator, notices yield is a promise
//so it waits on that promise, then passes it's value back to the generator when complete

//here, it runs them in sequence, waiting for each to complete before proceeding
Promise.coroutine(regeneratorRuntime.mark(function callee$0$0() {
    var tweets, profile, friends;
    return regeneratorRuntime.wrap(function callee$0$0$(context$1$0) {
        while (1) switch (context$1$0.prev = context$1$0.next) {
            case 0:
                context$1$0.next = 2;
                return $.get('tweets.json');

            case 2:
                tweets = context$1$0.sent;
                context$1$0.next = 5;
                return $.get('profile.json');

            case 5:
                profile = context$1$0.sent;
                context$1$0.next = 8;
                return $.get('friends.json');

            case 8:
                friends = context$1$0.sent;

                console.log(tweets, profile, friends);

            case 10:
            case 'end':
                return context$1$0.stop();
        }
    }, callee$0$0, this);
}))();

//if you want to run them at the same time, yield an object or an array
Promise.coroutine(regeneratorRuntime.mark(function callee$0$0() {
    var data;
    return regeneratorRuntime.wrap(function callee$0$0$(context$1$0) {
        while (1) switch (context$1$0.prev = context$1$0.next) {
            case 0:
                context$1$0.t0 = $.get('tweets.json');
                context$1$0.next = 3;
                return $.get('profile.json');

            case 3:
                context$1$0.t1 = context$1$0.sent;
                context$1$0.next = 6;
                return {
                    tweets: context$1$0.t0,
                    profile: context$1$0.t1
                };

            case 6:
                data = context$1$0.sent;

                console.log(data.tweets, data.profile);

            case 8:
            case 'end':
                return context$1$0.stop();
        }
    }, callee$0$0, this);
}))();

Promise.coroutine(regeneratorRuntime.mark(function callee$0$0() {
    var _ref, _ref2, tweets, profile;

    return regeneratorRuntime.wrap(function callee$0$0$(context$1$0) {
        while (1) switch (context$1$0.prev = context$1$0.next) {
            case 0:
                context$1$0.t0 = $.get('tweets.json');
                context$1$0.next = 3;
                return $.get('profile.json');

            case 3:
                context$1$0.t1 = context$1$0.sent;
                context$1$0.next = 6;
                return [context$1$0.t0, context$1$0.t1];

            case 6:
                _ref = context$1$0.sent;
                _ref2 = _slicedToArray(_ref, 2);
                tweets = _ref2[0];
                profile = _ref2[1];

                console.log(tweets, profile);

            case 11:
            case 'end':
                return context$1$0.stop();
        }
    }, callee$0$0, this);
}))();

//# sourceMappingURL=what-are-generators-compiled.js.map