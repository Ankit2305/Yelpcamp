const express = require('express'),
      Campground = require('../models/campground'),
      Comment = require('../models/comment'),
      middleware = require('../middleware'),
      router = express.Router({ mergeParams: true });

router.get("/new", middleware.isLoggedIn, (req, res) => {
    Campground.findById(req.params.id).then(campground => {
        res.render("comments/new", { campground: campground });
    }).catch( err => {
        req.flash("error", err.message);
        res.redirect("/campgrounds/" + req.params.id);
    });
});

router.post("/", middleware.isLoggedIn, (req, res) => {
    Campground.findById(req.params.id).then( campground => {
        req.body.comment.author = {
            id: req.user._id,
            username: req.user.username
        };
        Comment.create(req.body.comment).then( comment => {
            campground.comments.push(comment);
            campground.save();
            res.redirect("/campgrounds/" + campground._id);
        }).catch( err => {
            console.log(err);
        });
    }).catch( err => {
        console.log(err);
    });
});

router.get('/:comment_id/edit', middleware.checkCommentOwnership, (req, res) => {
    Comment.findById(req.params.comment_id)
    .then((comment) => {
        res.render('comments/edit', { campground_id: req.params.id, comment: comment });
    })
    .catch((err) => {
        req.flash("error", err.message);
        res.redirect('/campgrounds/' + req.params.id);
    });
});

router.put('/:comment_id', middleware.checkCommentOwnership, (req, res) => {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment)
    .then(() => {
        req.flash("success", "Successfully updated the comment");
        res.redirect('/campgrounds/' + req.params.id);
    })
    .catch((err) => {
        req.flash("error", err.message);
        res.redirect('/campgrounds/' + req.params.id);
    });
});

router.delete('/:comment_id', middleware.checkCommentOwnership, (req, res) => {
    Comment.findByIdAndRemove(req.params.comment_id)
    .then(() => {
        req.flash("success", "Successfully deleted the comment");
        res.redirect('/campgrounds/' + req.params.id);
    })
    .catch((err) => {
        req.flash("error", err.message);
        res.redirect('/campgrounds/' + req.params.id);
    });
});

module.exports = router;
