var express = require('express');
var router = express.Router();
var User = require('../models/userDetails');


router.get('/', function (req, res) {
    res.redirect('/api/bookStore/v0/login');
});

// Signup API
router.post('/signup', function (req, res) {
    User.findOne({
        email: req.body.email
    }).then(function (userDetails) {
        if (userDetails) {
            res.status(422).json({
                message: "User already exists.Kindly login"
            })
        } else {
            User.create(req.body, function (err, details) {
                res.redirect('/api/bookStore/v0/login');
            })

        }
    })
})


router.get('/signup', function (req, res) {
    res.render("signup", {
        title: "Signup"
    })
});





module.exports = router;