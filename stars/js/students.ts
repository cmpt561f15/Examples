import Utils from "./Utils";
import * as ActionFormController from "./ActionFormController";

$(function () {
    if (localStorage.getItem('currentUser') === null) {
        Utils.redirect('login.html');
        return;
    }

    let currentUser = JSON.parse(localStorage.currentUser);
    let students = JSON.parse(localStorage.students);

    $('#coursesDiv').hide();
    $('#programsDiv').hide();
    if (currentUser.Type === "Faculty") {
        $('#coursesDiv').show();
        let courses = JSON.parse(localStorage.courses);
        fillCoursesDD(courses);
    }
    else if (currentUser.Type === "Adviser") {
        $('#programsDiv').show();
        let programs = JSON.parse(localStorage.programs);
        fillProgramsDD(programs);
    }

    Utils.setUserInfo(currentUser);
    studentsToHtml(students);

    $('#logout').on('click', (event) => {
        event.preventDefault();
        Utils.logout();
    });

    $('#programsDD').on('change', function() {
        let selectedProgram = this.value;
        let studentsToDispaly = students;
        if (selectedProgram != '') {
            studentsToDispaly = students.filter(s => s.Program === selectedProgram);
        }
        studentsToHtml(studentsToDispaly);
    });

    $('#coursesDD').on('change', function() {
        let selectedCourse = this.value;
        let studentsToDispaly = students;
        if (selectedCourse != '') {
            selectedCourse = parseInt(selectedCourse);
            studentsToDispaly = students.filter(s => s.Courses.indexOf(selectedCourse) >= 0);
        }
        studentsToHtml(studentsToDispaly);
    });

    $( "#actionForm" ).load( Utils.getBaseUrl() + "/action.html" );

    let actionForm = ActionFormController.initActionForm();

    $( "#addAction" ).on( "click", function() {
        if ($("input:checked").length === 0) {
            $(`<div><i class='fa fa-exclamation-triangle'></i>
                Please select students first</div>`).dialog({'title': 'Alert'});
            return;
        }
        actionForm.dialog( "open" );
    });
});

function fillCoursesDD(courses) {
    for (let course of courses) {
        $('#coursesDD').append(
            $('<option>', { value: course.CRN, text: course.CRN + ' ' + course.CourseName })
        );
    }
}

function fillProgramsDD(programs) {
    for (let program of programs) {
        $('#programsDD').append(
            $('<option>', { value: program.Code, text: program.Name + '(' + program.Code + ')' })
        );
    }
}

function studentsToHtml(students){
    $("#studentsTable tbody").empty();
    for(let student of students){
        $("#studentsTable tbody").append(
            `<tr>
                <td><input type="checkbox" value="${student.StudentId}" /></td>
                <td>${student.StudentId}</td>
                <td>${student.FirstName}</td>
                <td>${student.LastName}</td>
                <td>${student.Gender}</td>
                <td>${student.Program}</td>
                <td>${student.GPA}</td>
                <td>${student.AtRiskCategory} </td>
                <td>${student.Courses}</td>
                <td><a id='studentActions' href='${Utils.getBaseUrl()}/actions.html?id=${student.StudentId}'> actions </a></td>
            </tr>`
        )
    }
}
