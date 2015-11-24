import Utils from "./Utils";
import * as ActionFormController from "./ActionFormController";

$(function () {
    if (localStorage.getItem('currentUser') === null) {
        Utils.redirect('login.html');
        return;
    }

    let currentUser = JSON.parse(localStorage.currentUser);
    let students = JSON.parse(localStorage.students);
    let actions = JSON.parse(localStorage.actions);
    let coordinators = JSON.parse(localStorage.coordinators);
    let advisors = JSON.parse(localStorage.advisors);

    Utils.setUserInfo(currentUser);
    fillStudentsDD(students);

    $('#logout').on('click', (event) => {
        event.preventDefault();
        Utils.logout();
    });

    $(".navButton").click(function() {
        $("#students :selected")[this.id]().prop("selected", true);
        $("#actionby").change(); //To trigger table update
    });

    $('#students').on('change', function() {
        let selectedStudent =  parseInt(this.value);
        let actionsToDispaly = actions;
        actionsToDispaly = actions.filter(a => a.Students.indexOf(selectedStudent) >= 0);
        actionsToHtml(actionsToDispaly);
    });

    $('#actionby').on('change', function() {
        let actionBy = this.value;
        let studentId = parseInt($("#students").val());
        let actionsToDispaly = actions.filter(a => a.Students.indexOf(studentId) >= 0);
        switch (actionBy) {
            case 'me':
                actionsToDispaly = actionsToDispaly.filter(a => a.ByWhom === currentUser.Username);
                break;
            case 'adviser':
                actionsToDispaly = actionsToDispaly.filter(a => advisors.indexOf(a.ByWhom) >= 0);
                break;
            case 'coordinator':
                actionsToDispaly = actionsToDispaly.filter(a => coordinators.indexOf(a.ByWhom) >= 0);
                break;
            case 'faculty':
                actionsToDispaly = actionsToDispaly.filter(a => coordinators.indexOf(a.ByWhom) < 0 && advisors.indexOf(a.ByWhom) < 0);
                break;
        }
        actionsToHtml(actionsToDispaly);
    });

    let studentId = Utils.getQueryStringValue('id');
    $("#students").val(studentId);
    $("#students").change();

    $( "#actionForm" ).load( Utils.getBaseUrl() + "/action.html" );

    let actionForm = ActionFormController.initActionForm();

    $( "#addAction" ).on( "click", function() {
        actionForm.dialog( "open" );
    });

    $('#actionsTable').on( "click", ".delete", function(event) {
        event.preventDefault();
        ActionFormController.deleteAction(actions, this);
    });

    $('#actionsTable').on( "click", ".edit, .view", function(event) {
        event.preventDefault();
        ActionFormController.editAction(actions, this);
        actionForm.dialog( "open" );
        actions = JSON.parse(localStorage.actions);
    });

    $('#actionForm').on('dialogclose', function(event) {
        console.log(event);
        actions = JSON.parse(localStorage.actions);
        console.log(actions[actions.length -1]);
        $( "#actionby" ).trigger( "change" ); //To trigger table update
        //$("#actionby").change();
    });
});

function fillStudentsDD(students) {
    for (let student of students) {
        $('#students').append(
            $('<option>', { value: student.StudentId, text: student.StudentId + ' - ' + student.FirstName + ' ' + student.LastName })
        );
    }
}

function actionsToHtml(actions){
    $("#actionsTable tbody").empty();
    for(let action of actions){
        $("#actionsTable tbody").append(
            `<tr>
                <td>${action.ActionId}</td>
                <td>${(typeof action.CourseCRN === 'undefined') ? '' : action.CourseCRN}</td>
                <td>${action.Date}</td>
                <td>${action.ByWhom}</td>
                <td>${action.ActionType}</td>
                <td>${action.Title}</td>
                <td><a class="view" href="">Details</a>
                    &nbsp;&nbsp;|&nbsp;&nbsp;<a class="edit" href="">Edit</a>
                    &nbsp;&nbsp;|&nbsp;&nbsp;<a class="delete" href="">Delete</a>
                </td>
            </tr>`
        )
    }
}

