// returns users from the API
function getUsers() {
    return $.get("http://jsonplaceholder.typicode.com/users");
}

// returns the todos from the API
function getTodos() {
    return $.get("http://jsonplaceholder.typicode.com/todos");
}

// prints the list of users to screen
function printUsers(data) {
    data[0].forEach(function (user) {
        $("#myList ul").append('<li>' + user.name + '</li>');
    });
}

// create an array of promises
var promises = [];
// push the get Users
promises.push(getUsers());
promises.push(getTodos());

// when all promises have been resolved
$.when.apply($, promises).then(function (users, todos) {
    printUsers(users);
});