var greetingData;
$(document).ready(function() {
    $.ajax({
        url: "http://rest-service.guides.spring.io/greeting"
    }).done(function(data) {
       greetingData = data;
       $('.greeting-id').append(data.id);
       $('.greeting-content').append(data.content);
    });
});