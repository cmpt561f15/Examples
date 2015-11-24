var Utils_1 = require("./Utils");
function actionFormToObject() {
    return {
        "ActionId": parseInt($('#actionId').val()),
        "Date": $('#actionDate').val(),
        "ActionType": $('#actionType').val(),
        "Title": $('#title').val(),
        "Description": $('#description').val()
    };
}
exports.actionFormToObject = actionFormToObject;
function updateAction(byWhom, actionStudents, courseCRN) {
    var actions = JSON.parse(localStorage.actions);
    var action = actionFormToObject();
    console.log("action.ActionId: ", action.ActionId);
    if (action.ActionId == 0) {
        action.ActionId = getNextActionId(actions);
        console.log("action.ActionId", action.ActionId);
        action.ByWhom = byWhom;
        action.Students = actionStudents;
        if (typeof courseCRN !== 'undefined')
            action.CourseCRN = courseCRN;
        actions.push(action);
    }
    else {
        var actionIndex = actions.findIndex(function (a) { return a.ActionId == action.ActionId; });
        console.log("actionIndex", actionIndex);
        console.log("Utils.formatDate(action.Date): ", Utils_1.default.formatDate(action.Date));
        actions[actionIndex].Date = Utils_1.default.formatDate(action.Date);
        actions[actionIndex].ActionType = action.ActionType;
        actions[actionIndex].Title = action.Title;
        actions[actionIndex].Description = action.Description;
    }
    console.log(action);
    localStorage.actions = JSON.stringify(actions);
}
exports.updateAction = updateAction;
function deleteAction(actions, element) {
    var result = confirm("Confirm delete?");
    if (result) {
        var actionId = parseInt($(element).closest('tr').children(':first-child').text());
        console.log(actionId);
        $(element).closest('tr').remove();
        var actionIndex = actions.findIndex(function (a) { return a.ActionId == actionId; });
        console.log("actionIndex", actionIndex);
        actions.splice(actionIndex, 1);
        localStorage.actions = JSON.stringify(actions);
    }
}
exports.deleteAction = deleteAction;
function editAction(actions, element) {
    var actionId = parseInt($(element).closest('tr').children(':first-child').text());
    console.log('ActionId: ' + actionId);
    var actionIndex = actions.findIndex(function (a) { return a.ActionId == actionId; });
    console.log('ActionIndex: ' + actionIndex);
    var action = actions[actionIndex];
    console.log('Action: ' + action);
    console.log("Utils.toDate(action.Date): ", Utils_1.default.toDate(action.Date));
    $('#actionId').val(actionId);
    $('#actionDate').val(Utils_1.default.toDate(action.Date));
    $('#actionType').val(action.ActionType);
    $('#title').val(action.Title);
    $('#description').val(action.Description);
}
exports.editAction = editAction;
function initActionForm() {
    var actionTypes = JSON.parse(localStorage.actionTypes);
    var currentUser = JSON.parse(localStorage.currentUser);
    var actionForm = $("#actionForm").dialog({
        autoOpen: false,
        height: 600,
        width: 700,
        modal: true,
        open: function () {
            for (var _i = 0; _i < actionTypes.length; _i++) {
                var actionType = actionTypes[_i];
                $('#actionType').append($('<option>', { value: actionType, text: actionType }));
            }
            console.log("#actionDate: ", $("#actionDate").val());
            if ($("#actionDate").val() === "")
                Utils_1.default.setTodayDate('actionDate');
        },
        buttons: {
            "Submit": function () {
                updateAction(currentUser.Username, getSelectedStudentIds());
                actionForm.dialog("close");
            },
            Cancel: function () {
                actionForm.dialog("close");
            }
        },
        close: function () {
            $(this).find('form')[0].reset();
            //allFields.removeClass( "ui-state-error" );
        }
    });
    return actionForm;
}
exports.initActionForm = initActionForm;
function getSelectedStudentIds() {
    var ids = new Array();
    if ($("input:checked").length > 0) {
        $("input:checked").each(function (i, element) {
            ids.push(parseInt(element.value));
        });
    }
    else {
        ids.push(parseInt($("#students").val()));
    }
    return ids;
}
function getNextActionId(actions) {
    var ids = actions.map(function (a) { return a.ActionId; });
    return Math.max.apply(Math, ids) + 1;
}
//# sourceMappingURL=ActionFormController.js.map