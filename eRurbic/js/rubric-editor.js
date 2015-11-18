$("#addCriterion").click(function () {
    var lastRow = $('#rubric-table tr:last');
    lastRow.clone(true).insertAfter(lastRow).hide().fadeIn(500);
    $('#rubric-table tr:last input').val('');
});


$('#addLevel').click(function () {
    var lastCol = $('#rubric-table td:last');
    lastCol.clone(true).insertAfter(lastCol).hide().fadeIn(500);
    $('#rubric-table td:last input').val('');

    //Work around because above is not fully working-- Not the best! but working...
    $("#rubric-table tr:first").append('<td style="text-align: center;">'+
        '<button class="close removeLevel" >&times;</button>' +
        '<input type="text" class="form-control" placeholder="Performance Level" /></td>');
    $("#rubric-table tr:nth-child(2)").append('<td><input type="text" class="input-sm form-control form-control-inline" min="1" max="100" placeholder="Min" /><input type="text" class="input-sm form-control form-control-inline"min="1" max="100" placeholder="Max" /></td>');
});

$("#rubric-table").on("click",".removeCriterion", function () {
    //If last criterion then do not allow removing it
    if ($('.removeCriterion').length == 1) {
        $('#dangerAlert').show();
        return;
    }
    var rowToDelete = $(this).closest('tr');
    //var nextRow = rowToDelete.next();
    rowToDelete.fadeOut(300, function () {
        rowToDelete.remove();
        //nextRow.remove();
    });
});

$("#rubric-table").on("click",".removeLevel", function () {
    //If last level then do not allow removing it
    if ($('.removeLevel').length == 1) {
        $('#errorMessage').text('You cannot delete this level');
        $('#dangerAlert').show();
        return;
    }
    var columnToDelete = $(this).closest('td');
    var index = columnToDelete.index();

    $('table thead>tr').each(function() {
        $('td:eq(' + index + ')',this).remove();
    });
    $('table tbody>tr').each(function() {
        index++;
        $('td:eq(' + index + ')',this).remove();
    });
});

$("#closeAlert").on("click", function() {
    $(this).closest('div').hide();
});
