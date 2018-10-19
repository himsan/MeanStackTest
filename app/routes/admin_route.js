var express = require('express');
var router = express.Router();
var User = require('../models/userDetails');
var Book = require('../models/bookDetails');

//user list API
router.get('/admin/userlist', function (req, res) {
    let page = req.query.p ? +req.query.p : 1;
    let paginationObj = {
        page: page,
        pageCount: 1
    }
    let pageLimit = req.app.paginationLimit;
    User.count({

    }).then(function (count) {
        paginationObj.pageCount = Math.ceil(count / pageLimit);
        User.find({}, {
            firstName: 1,
            lastName: 1,
            email: 1,
            phoneNumber: 1
        }).limit(pageLimit).skip((page - 1) * pageLimit).then(function (userList) {
            res.render("userlist", {
                top_results: userList,
                pagination: paginationObj

            });
        })

    })

});

//bool list API
router.get('/admin/booklist', function (req, res) {
    Book.find({
        status: "Active"
    }, {
        name: 1,
        author: 1,
        quantityOfBooks: 1,
        datePublished: 1
    }).then(function (bookList) {
        res.render("books", {
            top_results: bookList
        });
    });
});

//creating a new entery for book
router.post('/admin/book-create', function (req, res) {
    Book.findOne({
        name: req.body.name
    }).then(function (bookDetails) {
        if (bookDetails) {
            res.status(422).json({
                message: "User already exists.Kindly login"
            })
        } else {
            Book.create(req.body, function (err, book) {
                res.redirect("/api/bookStore/v0/admin/booklist")
            })
        }

    })
})


//creation form for book
router.get('/admin/book-create', function (req, res) {
    res.render("bookCreate", {
        title: "Book Creation"
    });
})


//update for API book
router.post("/admin/book-update", function (req, res) {
    Book.findOne({
        _id: req.body.id
    }).then(function (bookData) {
        var detailsbook = {
            name: req.body.name,
            author: req.body.author,
            quantityOfBooks: req.body.quantityOfBooks,
            datePublished: req.body.datePublished
        }
        Book.update({
            _id: req.body.id
        }, {
            $set: detailsbook
        }, {}, (err, updateDetails) => {
            console.log(updateDetails)
            res.redirect('/api/bookStore/v0/admin/booklist');
        })
    })
});

//get update form
router.get("/admin/book-update/:id", function (req, res) {
    Book.findOne({
        _id: req.params.id
    }, (err, result) => {
        if (err) {
            console.info(err.stack);
        }
        res.render("bookedit", {
            title: "Edit book details",
            session: req.session,
            result: result
        });
    })
})

//delete book
router.get("/admin/book-delete/:id", function (req, res) {

    Book.remove({
        _id: req.params.id
    }).then(function (removedData) {
        res.redirect('/api/bookStore/v0/admin/booklist');
    })

});



module.exports = router;