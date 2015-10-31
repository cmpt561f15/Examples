"use strict";

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var speaker = {
    firstName: "Samir",
    lastName: "Saghir",
    officePhone: "615-123-4567",
    mobilePhone: "615-987-6543",
    homePhone: "615-888-1234"
};

var firstName = speaker.firstName;
var lastName = speaker.lastName;

var phoneNumbers = _objectWithoutProperties(speaker, ["firstName", "lastName"]);

console.log(firstName);
console.log(lastName);
console.log(phoneNumbers);

//# sourceMappingURL=spread-compiled.js.map