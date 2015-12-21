$(document).ready(function(){

     var op = GetURLParameter('op');
     if(op=="grading") {
         $('#content').load("grading-tasks.html");
         $("#grading").addClass("active");
    }
     else if(op=="searchRubric") {
         $('#content').load("rubric-search.html");
         $("#searchRubric").addClass("active");
    }
     else if(op=="rubricEditor") {
         $('#content').load("rubric-editor.html");
         $("#searchRubric").addClass("active");
    }
     else if(op=="gradingEditor") {
         $('#content').load("grading-editor.html");
         $("#grading").addClass("active");
    }
    else if(op=="viewGrading") {
         $('#content').load("grading-view.html");
         $("#viewGrading").addClass("active");
    }
     else if (op=="addGradingTask") {
         $('#content').load("grading-task.html");
         $("#grading").addClass("active");
    }
     else {
         $('#content').load("rubric-search.html");
         $("#searchRubric").addClass("active");
     }

    function GetURLParameter(sParam)
    {
        var url = window.location.search.substring(1);
        var sURLVariables = url.split('&');
        for (var i = 0; i < sURLVariables.length; i++)
        {
            var sParameterName = sURLVariables[i].split('=');
            if (sParameterName[0] == sParam)
            {
                return sParameterName[1];
            }
        }
    }

});

