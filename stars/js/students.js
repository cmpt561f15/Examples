var Utils_1 = require("./Utils");
$(function () {
    var currentUser = JSON.parse(localStorage.currentUser);
    var students = JSON.parse(localStorage.students);
    $('#coursesDiv').hide();
    $('#programsDiv').hide();
    if (currentUser.Type === "Faculty") {
        $('#coursesDiv').show();
        var courses = JSON.parse(localStorage.courses);
        fillCoursesDD(courses);
    }
    else if (currentUser.Type === "Adviser") {
        $('#programsDiv').show();
        var programs = JSON.parse(localStorage.programs);
        fillProgramsDD(programs);
    }
    Utils_1.default.setUserInfo(currentUser);
    studentsToHtml(students);
    $('#logout').on('click', function (event) {
        event.preventDefault();
        Utils_1.default.logout();
    });
});
function fillCoursesDD(courses) {
    for (var _i = 0; _i < courses.length; _i++) {
        var course = courses[_i];
        $('#coursesDD').append($('<option>', { value: course.CRN, text: course.CRN + ' ' + course.CourseName }));
    }
}
function fillProgramsDD(programs) {
    for (var _i = 0; _i < programs.length; _i++) {
        var program = programs[_i];
        $('#programsDD').append($('<option>', { value: program.Code, text: program.Name + '(' + program.Code + ')' }));
    }
}
function studentsToHtml(students) {
    $("#studentsTable tbody").empty();
    for (var _i = 0; _i < students.length; _i++) {
        var student = students[_i];
        $("#studentsTable tbody").append("<tr>\n                <td><input type=\"checkbox\" id=\"isSelected\" value=\"" + student.StudentId + "\" /></td>\n                <td>" + student.StudentId + "</td>\n                <td>" + student.FirstName + "</td>\n                <td>" + student.LastName + "</td>\n                <td>" + student.Gender + "</td>\n                <td>" + student.Program + "</td>\n                <td>" + student.GPA + "</td>\n                <td>" + student.AtRiskCategory + " </td>\n                <td>" + student.Courses + "</td>\n                <td><a id='studentActions' href='" + Utils_1.default.getBaseUrl() + "/actions.html?id=" + student.StudentId + "'> actions </a></td>\n            </tr>");
    }
}
//# sourceMappingURL=students.js.map