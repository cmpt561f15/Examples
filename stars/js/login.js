var AuthenticationService_1 = require('./AuthenticationService');
var StarsService_1 = require('./StarsService');
var DataService_1 = require("./DataService");
var Utils_1 = require("./Utils");
$(document).ready(function () {
    $('#login-form').validate({
        rules: {
            username: {
                minlength: 2,
                maxlength: 15,
                required: true
            },
            password: {
                minlength: 5,
                maxlength: 15,
                required: true
            }
        },
        highlight: function (element) {
            $(element).closest('.input-group').addClass('has-error');
        },
        unhighlight: function (element) {
            $(element).closest('.input-group').removeClass('has-error');
        },
        errorClass: 'help-block',
        submitHandler: function (form) {
            onLogin();
        }
    });
    //Login on enter
    $('input').keydown(function (e) {
        if (e.keyCode == 13) {
            $('#login').click();
        }
    });
    $("#closeAlert").on("click", function () {
        $(this).closest('div').hide();
    });
});
//Using Promises
function onLogin() {
    var username = $('#username').val();
    var password = $('#password').val();
    var currentUser;
    var adviserPrograms;
    var dataService = new DataService_1.default();
    var starsService = new StarsService_1.default();
    //Upon successful login then get all the data: students, courses, actions
    AuthenticationService_1.default.login(username, password).then(function (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        console.log(user);
        currentUser = user;
        //Get Students
        var getStudentsPromise = (user.Type === "Faculty") ?
            starsService.getStudentsByInstructor(user.StaffNo) :
            starsService.getStudentsByProgram(user.Program);
        return getStudentsPromise;
    }).then(function (results) {
        //In case of faculty the method will return both students and courses
        var students, instructorCourses;
        if (currentUser.Type === "Faculty") {
            students = results[0], instructorCourses = results[1];
            console.log("Instructor Courses", instructorCourses);
            localStorage.setItem('courses', JSON.stringify(instructorCourses));
        }
        else {
            students = results[0], adviserPrograms = results[1];
        }
        console.log("Students", students);
        localStorage.setItem('students', JSON.stringify(students));
        return starsService.getActions(students);
    }).then(function (actions) {
        console.log("Actions", actions);
        localStorage.setItem('actions', JSON.stringify(actions));
        return Promise.all([starsService.getActionTypes(), starsService.getStaff(), starsService.getPrograms()]);
    }).then(function (results) {
        var actionTypes = results[0], staff = results[1], programs = results[2];
        //Only keep the prgrams the current user has access to
        if (typeof adviserPrograms !== "undefined") {
            programs = programs.filter(function (p) { return adviserPrograms.indexOf(p.Code) >= 0; });
            localStorage.setItem('programs', JSON.stringify(programs));
        }
        console.log(actionTypes, staff, programs);
        var coordinators = staff.filter(function (s) { return s.Type === 'Coordinator'; }).map(function (s) { return s.Username; });
        var advisors = staff.filter(function (s) { return s.Type === 'Adviser'; }).map(function (s) { return s.Username; });
        localStorage.setItem('actionTypes', JSON.stringify(actionTypes));
        localStorage.setItem('coordinators', JSON.stringify(coordinators));
        localStorage.setItem('advisors', JSON.stringify(advisors));
        Utils_1.default.redirect('students.html');
    }).catch(function (error) {
        $('#errorMessage').text(error).closest('div').show();
        console.log(error);
    });
}
//# sourceMappingURL=login.js.map