$(document).ready(function(){
    var groupn= 1;

    $("button[name='view']").click(function() {
        $('#viewmodal').modal('show')
    });

    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    });

    $(" li.sname").on('click', function(){
        $('#datebox').val($(this).text());
        $(" .panel").removeClass("not-hidden").addClass(" hidden");

        if (($(this).text())== ("Student 1") ){
            $(" .s1").addClass("not-hidden").removeClass(" hidden");
        }else if (($(this).text())== ("Student 2")) {
            $(" .s2").addClass("not-hidden").removeClass(" hidden");
        }else if (($(this).text())== ("Student 3")) {
            $(" .s3").addClass("not-hidden").removeClass(" hidden");
        }else if (($(this).text())== ("Group 1")) {
            $(" .s1").addClass("not-hidden").removeClass(" hidden");
        }else if (($(this).text())== ("Group 2")) {
            $(" .s2").addClass("not-hidden").removeClass(" hidden");
        }else if (($(this).text())== ("Group 3")) {
            $(" .s3").addClass("not-hidden").removeClass(" hidden");
        }
        });


    $(" li.next").click(function( ) {
        if ( $(" .not-hidden").next(" .panel").length){
            var x= $(" .not-hidden").next(" .panel");
            $(" .panel").removeClass("not-hidden").addClass(" hidden");
            x.addClass("not-hidden").removeClass(" hidden");
            $('#datebox').val('');
        }

    });

    $(" li.previous").click(function( ) {
        if ( $(" .not-hidden").prev(" .panel").length){
            var x= $(" .not-hidden").prev(" .panel");
            $(" .panel").removeClass("not-hidden").addClass(" hidden");
            x.addClass("not-hidden").removeClass(" hidden");
            $('#datebox').val('');
        }
    });

    $("input[type=range]").on('change', function (){
        var score = 0;
        var  x= $(this).val();
        $(this).siblings(" span").text(x);

        $(" td.selected_cell").each( function (){
            if ( $(this).parents(" .panel").hasClass("not-hidden")){
                score += ($(this).find("input[type=range]").val()) * 25;
                $(" .not-hidden span.score").text(score);
            }
        });
     });


    $(" tr td.rubric_cell").click(function(){
        var score = 0;
        $(this).siblings(" td").removeClass("selected_cell").children(" div").addClass("hidden").removeClass("show");
        $(this).addClass("selected_cell").children(" div").removeClass("hidden").addClass("show");

        $(" td.selected_cell").each( function (){

            if ( $(this).parents(" .panel").hasClass("not-hidden")){
                score += ($(this).find("input[type=range]").val()) * 25;
                $(" .not-hidden span.score").text(score);
            }
        });
    });


    $(" #agt").click(function(){
        $(this).addClass("active");
        $(" #gt").removeClass("active");
        $(" .gt").addClass("hidden");
        $(" .agt").removeClass("hidden");
    });

    $(" #gt").click(function(){
        $(this).addClass("active");
        $(" #agt").removeClass("active");
        $(" .agt").addClass("hidden");
        $(" .gt").removeClass("hidden");
    });

    $(" li.cname").on('click', function(){
        $('#datebox1').val($(this).text());

    });

    $(" li.ri").on('click', function(){
        $('#datebox3').val($(this).text());

    });

    $(" li.gi").on('click', function(){
        $('#datebox2').val($(this).text());
        if (($(this).text())== ("Group")) {
            $(" .panel1").removeClass("hidden");

        }else if(($(this).text())== ("Individual")) {
            $(" .panel1").addClass("hidden");
        }
    });

    $(" .ds").draggable({
        containment:  $(" .panel-body"),
        grid: [ 10, 10 ],
        scope: 'student',
        revert: "invalid"
    });

    $( ".sgroup" ).droppable({
        scope: 'student',
        hoverClass: "drop-hover",
        drop: function(event ,ui){
            var x = ui.draggable;
            x.css('position','').css('left','').css('top','').css('margin-bottom','10px');
            x.clone().appendTo(".g1");
            x.remove();
            $(" .ds").draggable({
                containment:  $(" .panel-body"),
                grid: [ 10, 10 ],
                scope: 'student',
                revert: "invalid"
            });
        }

    });

    var dropable = function (g){
        $( ".g"+g ).droppable({
            scope: 'student',
            hoverClass: "drop-hover",
            drop: function(event ,ui){
                var x = ui.draggable;
                x.css('position','').css('left','').css('top','').css('margin-bottom','10px');
                x.clone().appendTo(".g"+g);
                x.remove();
                $(" .ds").draggable({
                    containment:  $(" .panel-body"),
                    grid: [ 10, 10 ],
                    scope: 'student',
                    revert: "invalid"
                });
            }
        });
    };

    var clos = function(){
        $(" button.close").click(function(){
            if (($(this).nextAll(" a").length)== 0){
                $(this).parent(" div.sgroup").remove();
            }else{
                $("#fa1").removeClass('hidden');
                setTimeout(function (){
                    $("#fa1").addClass('hidden');
                },4000);
                return;
            }
        });
    };

    dropable(1);

    $(".glyphicon-plus").click(function() {
        groupn++;
        var i =0;
        $(" .sgroup").each(function(){
            i++;
           if (($(" .sgroup.g"+i).length)== 0){

              return false;
           }
           });

        $(" .groups").append( '<div class="col-md-3 text-center sgroup ui-droppable g'+groupn+'">' +
            '<button type="button" class="close" aria-label="Close">' +
            '<span aria-hidden="true">&times;</span></button><label>Group '+groupn+' </label></div>');
        dropable(groupn);
        clos();


    });


    $("#agtsave").click(function(){
        var crs= $ (" #datebox1").val();
        var tite= $(" #agttitle").val();
        var des= $(" #agtdes").val();
        var rub= $ (" #datebox3").val();
        var type= $ (" #datebox2").val();

        if((crs=='')|| (type=='')|| (tite=='') || (des=='')|| (rub=='') ){

            $("#fa").removeClass('hidden');
            setTimeout(function (){

                $("#fa").addClass('hidden');
            },4000);
            return;
        }

        if (type =="Group"){

            if(($(" .sgroup .ds").length) < 10 ){

                $("#fa2").removeClass('hidden');
                setTimeout(function (){

                    $("#fa2").addClass('hidden');
                },4000);
                return;
            }


            $(" #gttable").prepend('<tr> <td>'+crs+'</td> <td>'+tite+'2</td> <td>'+des+'</td> <td>Group</td> <td>'+rub+'</td> <td>Pending</td>' +
           ' <td><a class="btn btn-primary btn-xs" data-toggle="tooltip" data-placement="right" title="10 needs grading"'+
           ' href="index.html?op=grade4" role="button">Grade <span class="badge"> 10</span></a></td> <td></td> </tr>')


        }

        if (type =="Individual"){
            $(" #gttable").prepend('<tr> <td>'+crs+'</td> <td>'+tite+'2</td> <td>'+des+'</td> <td>Individual</td> <td>'+rub+'</td> <td>Pending</td>' +
                ' <td><a class="btn btn-primary btn-xs" data-toggle="tooltip" data-placement="right" title="10 needs grading"'+
                ' href="index.html?op=grade5" role="button">Grade <span class="badge"> 10</span></a></td> <td></td> </tr>')


        }

        $(" #gt").addClass("active");
        $(" #agt").removeClass("active");
        $(" .agt").addClass("hidden");
        $(" .gt").removeClass("hidden");

    });
});
