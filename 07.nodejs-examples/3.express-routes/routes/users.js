var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
   res.render('users', {
       users: [
           { userId: 1, userName: 'John Doe' },
           { userId: 2, userName: 'Jane Doe' }
       ]
   });
});


module.exports = router;
