//GENERATORS ARE AWESOME!!!!
//use with Traceur: https://github.com/google/traceur-compiler
//find out how this works: look at what-are-generators.js
'use strict';

var $status = $('#status');

Promise.coroutine(regeneratorRuntime.mark(function callee$0$0() {
    var profile, tweets, friend;
    return regeneratorRuntime.wrap(function callee$0$0$(context$1$0) {
        while (1) switch (context$1$0.prev = context$1$0.next) {
            case 0:
                context$1$0.next = 2;
                return $.get('profile.json');

            case 2:
                profile = context$1$0.sent;

                $status.append('<li>got profile</li>');
                $('#profile-pre').html(JSON.stringify(profile));

                context$1$0.next = 7;
                return $.get('tweets.json?id=' + profile.id);

            case 7:
                tweets = context$1$0.sent;

                $status.append('<li>got tweets</li>');
                $('#tweets-pre').html(JSON.stringify(tweets));

                context$1$0.next = 12;
                return $.get('friend.json?id=' + tweets[0].usersMentioned[0].id);

            case 12:
                friend = context$1$0.sent;

                $status.append('<li>got friend</li>');
                $('#friend-pre').html(JSON.stringify(friend));

            case 15:
            case 'end':
                return context$1$0.stop();
        }
    }, callee$0$0, this);
}))()['catch'](function (errs) {
    //handle errors on any events
});

//WHAT??!!!!!!  What just happened??
//Every time you yield a value, it waits for that promise to resolve
//once it resolves, it passes it's value to the variable and resumes
//But that seems like magic.  "Wrong...it IS magic"

//see what-are-generators.js for more examples

//# sourceMappingURL=generators-compiled.js.map