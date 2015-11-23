import Utils from "./Utils";

$(function () {
    let currentUser = JSON.parse(localStorage.currentUser);
    var students = JSON.parse(localStorage.students);

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
                <td><input type="checkbox" id="isSelected" value="${student.StudentId}" /></td>
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

