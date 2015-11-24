import AuthenticationService from './AuthenticationService'
import StarsService from './StarsService'
import DataService from "./DataService";
import Utils from "./Utils";

$(document).ready( () => {
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
        highlight: function(element) {
            $(element).closest('.input-group').addClass('has-error');
        },
        unhighlight: function(element) {
            $(element).closest('.input-group').removeClass('has-error');
        },
        errorClass: 'help-block',
        submitHandler: function(form) {
            onLogin();
        }
    });

    //Login on enter
    $('input').keydown(function(e) {
        if (e.keyCode == 13) {
            $('#login').click();
        }
    });

    $("#closeAlert").on("click", function() {
        $(this).closest('div').hide();
    });
});

//Using Promises
function onLogin() {
    let username = $('#username').val();
    let password = $('#password').val();
    let currentUser;
    var adviserPrograms;

    let dataService = new DataService();
    let starsService = new StarsService();

    //Upon successful login then get all the data: students, courses, actions
    AuthenticationService.login(username, password).then(user => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        console.log(user);
        currentUser = user;

        //Get Students
        let getStudentsPromise = (user.Type === "Faculty") ?
                starsService.getStudentsByInstructor(user.StaffNo) :
                starsService.getStudentsByProgram(user.Program);

        return getStudentsPromise;

    }).then(results => {
        //In case of faculty the method will return both students and courses
        let students, instructorCourses;
        if (currentUser.Type === "Faculty") {
            [students, instructorCourses] = results;
            console.log("Instructor Courses", instructorCourses);
            localStorage.setItem('courses', JSON.stringify(instructorCourses));
        } else {
            [students, adviserPrograms] = results;
        }
        console.log("Students", students);
        localStorage.setItem('students', JSON.stringify(students));
        return starsService.getActions(students);
    }).then(actions => {
        console.log("Actions", actions);
        localStorage.setItem('actions', JSON.stringify(actions));
        return Promise.all([starsService.getActionTypes(), starsService.getStaff(), starsService.getPrograms()]);
    }).then(results => {
        let [actionTypes, staff, programs] = results;

        //Only keep the prgrams the current user has access to
        if (typeof adviserPrograms !== "undefined") {
            programs = programs.filter(p => adviserPrograms.indexOf(p.Code) >= 0);
            localStorage.setItem('programs', JSON.stringify(programs));
        }
        console.log(actionTypes, staff, programs);

        let coordinators : string[] = staff.filter(s => s.Type === 'Coordinator').map(s => s.Username);
        let advisors : string [] = staff.filter(s => s.Type === 'Adviser').map(s => s.Username);

        localStorage.setItem('actionTypes', JSON.stringify(actionTypes));
        localStorage.setItem('coordinators', JSON.stringify(coordinators));
        localStorage.setItem('advisors', JSON.stringify(advisors));

        Utils.redirect('students.html');
    }).catch (error => {
        $('#errorMessage').text(error).closest('div').show();
        console.log(error);
    });
}