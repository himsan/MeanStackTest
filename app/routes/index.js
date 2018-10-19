var express = require('express');
var router = express.Router();

var user = require('./user_route');
var login = require('./login_route');
var admin = require('./admin_route');

router.use('/',user);
router.use('/',login);
router.use('/',admin);



module.exports = router;
