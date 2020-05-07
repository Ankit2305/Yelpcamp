const Comment = require('../models/comment'),
      Campground = require('../models/campground');

var middlewareObj = {};

middlewareObj.isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You must be logged in to do that");
    res.redirect('/login');
};

middlewareObj.checkCampgroundOwnership = (req, res, next) => {
    if(req.isAuthenticated()){
        Campground.findById(req.params.id)
        .then((campground) => {
            if(campground.author.id.equals(req.user._id))
                next();
            else{
                req.flash("error", "You don't have permission to do that");
                res.redirect("back");
            }
        })
        .catch((err) => {
            req.flash("error", "Campground not found");
            res.redirect("back");
        });
    }
    else{
        req.flash("error", "You must be logged in to do that");
        res.redirect("back");
    }
}

middlewareObj.checkCommentOwnership = (req, res, next) => {
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id)
        .then((comment) => {
            if(comment.author.id.equals(req.user._id))
                next();
            else{
                req.flash("error", "You don't have permission to do that");
                res.redirect("back");
            }
        })
        .catch(() => {
            req.flash("error", "Comment not found");
            res.redirect("back");
        });
    }
    else{
        req.flash("error", "You must be logged in to do that");
        res.redirect("back");
    }
}

module.exports = middlewareObj;