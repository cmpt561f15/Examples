"use strict";

var marked0$0 = [idMaker].map(regeneratorRuntime.mark);
function idMaker() {
    var index;
    return regeneratorRuntime.wrap(function idMaker$(context$1$0) {
        while (1) switch (context$1$0.prev = context$1$0.next) {
            case 0:
                index = 0;

            case 1:
                if (!true) {
                    context$1$0.next = 6;
                    break;
                }

                context$1$0.next = 4;
                return index++;

            case 4:
                context$1$0.next = 1;
                break;

            case 6:
            case "end":
                return context$1$0.stop();
        }
    }, marked0$0[0], this);
}

var gen = idMaker();

console.log(gen.next().value); // 0
console.log(gen.next().value); // 1
console.log(gen.next().value); // 2

//# sourceMappingURL=generator-compiled.js.map