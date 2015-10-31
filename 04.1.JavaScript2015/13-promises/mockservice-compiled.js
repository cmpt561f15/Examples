"use strict";

var employees = [{ name: "Samir" }];

function findAll() {
    return new Promise(function (resolve, reject) {
        //In real app - fetch employees from REST service
        if (employees) {
            resolve(employees);
        } else {
            reject("employees is not defined");
        }
    });
}

findAll().then(function (employees) {
    console.log(employees);
})["catch"](function (error) {
    console.log(error);
});

//# sourceMappingURL=mockservice-compiled.js.map