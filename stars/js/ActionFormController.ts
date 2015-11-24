import Utils from "./Utils";

export function actionFormToObject() {
    return {
        "ActionId": parseInt($('#actionId').val()),
        "Date": $('#actionDate').val(),
        "ActionType": $('#actionType').val(),
        "Title": $('#title').val(),
        "Description": $('#description').val()
    }
}

export function updateAction(byWhom, actionStudents, courseCRN) {
    let actions = JSON.parse(localStorage.actions);

    let action = actionFormToObject();
    console.log("action.ActionId: ", action.ActionId);

    if (action.ActionId == 0) {
        action.ActionId = getNextActionId(actions);
        console.log("action.ActionId", action.ActionId);
        action.ByWhom = byWhom;
        action.Students = actionStudents;
        if (typeof courseCRN !== 'undefined')
            action.CourseCRN = courseCRN;
        actions.push(action);
    } else {
        let actionIndex = actions.findIndex(a=> a.ActionId == action.ActionId);
        console.log("actionIndex", actionIndex);
        console.log("Utils.formatDate(action.Date): ", Utils.formatDate(action.Date));
        actions[actionIndex].Date = Utils.formatDate(action.Date);
        actions[actionIndex].ActionType = action.ActionType;
        actions[actionIndex].Title = action.Title;
        actions[actionIndex].Description = action.Description;
    }

    console.log(action);

    localStorage.actions = JSON.stringify(actions);
}

export function deleteAction(actions, element) {
    var result = confirm("Confirm delete?");
    if (result) {
        var actionId = parseInt($(element).closest('tr').children(':first-child').text());
        console.log(actionId);
        $(element).closest('tr').remove();

        let actionIndex = actions.findIndex(a=> a.ActionId == actionId);
        console.log("actionIndex", actionIndex);
        actions.splice(actionIndex, 1);
        localStorage.actions = JSON.stringify(actions);
    }
}

export function editAction(actions, element) {
    var actionId = parseInt($(element).closest('tr').children(':first-child').text());
    console.log('ActionId: ' + actionId);
    var actionIndex = actions.findIndex(a=> a.ActionId == actionId);
    console.log('ActionIndex: ' + actionIndex);
    var action = actions[actionIndex];
    console.log('Action: ' + action);

    console.log("Utils.toDate(action.Date): ", Utils.toDate(action.Date));
    $('#actionId').val(actionId);
    $('#actionDate').val(Utils.toDate(action.Date));
    $('#actionType').val(action.ActionType);
    $('#title').val(action.Title);
    $('#description').val(action.Description);
}

export function initActionForm() {
    let actionTypes = JSON.parse(localStorage.actionTypes);
    let currentUser = JSON.parse(localStorage.currentUser);
    let actionForm = $( "#actionForm" ).dialog({
        autoOpen: false,
        height: 600,
        width: 700,
        modal: true,
        open: function () {
            for (let actionType of actionTypes) {
                $('#actionType').append(
                    $('<option>', { value: actionType, text: actionType })
                );
            }
            console.log("#actionDate: ", $("#actionDate").val());
            if ($("#actionDate").val() === "")
                Utils.setTodayDate('actionDate');
        },
        buttons: {
            "Submit": function() {
                updateAction(currentUser.Username, getSelectedStudentIds());
                actionForm.dialog( "close" );
            },
            Cancel: function() {
                actionForm.dialog( "close" );
            }
        },
        close: function() {
            $(this).find('form')[0].reset();
            //allFields.removeClass( "ui-state-error" );
        }
    });

    return actionForm;
}

function getSelectedStudentIds() {
    let ids = new Array<Number>();
    if ($("input:checked").length > 0) {
        $("input:checked").each((i, element) => {
            ids.push(parseInt(element.value));
        });
    }
    else {
        ids.push(parseInt($("#students").val()));
    }
    return ids;
}

function getNextActionId(actions) {
    let ids = actions.map(a => a.ActionId);
    return Math.max(...ids) + 1;
}