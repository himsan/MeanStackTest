var express = require('express');
var bcrypt = require('bcrypt-nodejs');
var router = express.Router();
var User = require('../models/userDetails');



//Login for application

router.post('/login_action', function (req, res) {
    User.findOne({
        email: req.body.email
    }).then(function (login) {
        if (!login) {
            return res.status(401).json({
                error: 'Authentication Failed'
            });
        } else {
            login.comparePassword(req.body.password, (err, isMatch) => {
                if (err) return res.status(401).json({
                    error: 'Something went wrong please try again.'
                });
                if (isMatch) {
                    res.redirect('/api/bookStore/v0/admin/userlist');
                } else {
                    return res.status(401).json({
                        error: 'Wrong password'
                    });
                };
            });
        };
    });
});


router.get('/login', function (req, res) {
    res.render("login", {
        title: "Login"
    })
})

//Logout application
router.get("/logout", (req, res) => {
    res.redirect("/api/bookStore/v0/login");
});






module.exports = router;