var Utils_1 = require("./Utils");
var ActionFormController = require("./ActionFormController");
$(function () {
    if (localStorage.getItem('currentUser') === null) {
        Utils_1.default.redirect('login.html');
        return;
    }
    var currentUser = JSON.parse(localStorage.currentUser);
    var students = JSON.parse(localStorage.students);
    var actions = JSON.parse(localStorage.actions);
    var coordinators = JSON.parse(localStorage.coordinators);
    var advisors = JSON.parse(localStorage.advisors);
    Utils_1.default.setUserInfo(currentUser);
    fillStudentsDD(students);
    $('#logout').on('click', function (event) {
        event.preventDefault();
        Utils_1.default.logout();
    });
    $(".navButton").click(function () {
        $("#students :selected")[this.id]().prop("selected", true);
        $("#actionby").change(); //To trigger table update
    });
    $('#students').on('change', function () {
        var selectedStudent = parseInt(this.value);
        var actionsToDispaly = actions;
        actionsToDispaly = actions.filter(function (a) { return a.Students.indexOf(selectedStudent) >= 0; });
        actionsToHtml(actionsToDispaly);
    });
    $('#actionby').on('change', function () {
        var actionBy = this.value;
        var studentId = parseInt($("#students").val());
        var actionsToDispaly = actions.filter(function (a) { return a.Students.indexOf(studentId) >= 0; });
        switch (actionBy) {
            case 'me':
                actionsToDispaly = actionsToDispaly.filter(function (a) { return a.ByWhom === currentUser.Username; });
                break;
            case 'adviser':
                actionsToDispaly = actionsToDispaly.filter(function (a) { return advisors.indexOf(a.ByWhom) >= 0; });
                break;
            case 'coordinator':
                actionsToDispaly = actionsToDispaly.filter(function (a) { return coordinators.indexOf(a.ByWhom) >= 0; });
                break;
            case 'faculty':
                actionsToDispaly = actionsToDispaly.filter(function (a) { return coordinators.indexOf(a.ByWhom) < 0 && advisors.indexOf(a.ByWhom) < 0; });
                break;
        }
        actionsToHtml(actionsToDispaly);
    });
    var studentId = Utils_1.default.getQueryStringValue('id');
    $("#students").val(studentId);
    $("#students").change();
    $("#actionForm").load(Utils_1.default.getBaseUrl() + "/action.html");
    var actionForm = ActionFormController.initActionForm();
    $("#addAction").on("click", function () {
        actionForm.dialog("open");
    });
    $('#actionsTable').on("click", ".delete", function (event) {
        event.preventDefault();
        ActionFormController.deleteAction(actions, this);
    });
    $('#actionsTable').on("click", ".edit, .view", function (event) {
        event.preventDefault();
        ActionFormController.editAction(actions, this);
        actionForm.dialog("open");
        actions = JSON.parse(localStorage.actions);
    });
    $('#actionForm').on('dialogclose', function (event) {
        console.log(event);
        actions = JSON.parse(localStorage.actions);
        console.log(actions[actions.length - 1]);
        $("#actionby").trigger("change"); //To trigger table update
        //$("#actionby").change();
    });
});
function fillStudentsDD(students) {
    for (var _i = 0; _i < students.length; _i++) {
        var student = students[_i];
        $('#students').append($('<option>', { value: student.StudentId, text: student.StudentId + ' - ' + student.FirstName + ' ' + student.LastName }));
    }
}
function actionsToHtml(actions) {
    $("#actionsTable tbody").empty();
    for (var _i = 0; _i < actions.length; _i++) {
        var action = actions[_i];
        $("#actionsTable tbody").append("<tr>\n                <td>" + action.ActionId + "</td>\n                <td>" + ((typeof action.CourseCRN === 'undefined') ? '' : action.CourseCRN) + "</td>\n                <td>" + action.Date + "</td>\n                <td>" + action.ByWhom + "</td>\n                <td>" + action.ActionType + "</td>\n                <td>" + action.Title + "</td>\n                <td><a class=\"view\" href=\"\">Details</a>\n                    &nbsp;&nbsp;|&nbsp;&nbsp;<a class=\"edit\" href=\"\">Edit</a>\n                    &nbsp;&nbsp;|&nbsp;&nbsp;<a class=\"delete\" href=\"\">Delete</a>\n                </td>\n            </tr>");
    }
}
//# sourceMappingURL=actions.js.map