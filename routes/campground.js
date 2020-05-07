const express = require('express'),
      Campground = require('../models/campground'),
      Comment = require('../models/comment'),
      middleware = require('../middleware'),
      router = express.Router();

router.get("/", (req, res) => {
    Campground.find({}).then((campgrounds) => {
        res.render("campgrounds/index", {campgrounds: campgrounds});
    }).catch((err) => {
        req.flash("error", err.message);
        res.redirect("/");
    });
});

router.post("/", middleware.isLoggedIn, (req, res) => {
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newCampground = {name: req.body.name, price: req.body.price, image: req.body.image, description: req.body.description, author: author};
    Campground.create(newCampground).then(() => { 
        req.flash("success", "Successfully created the campground");
        res.redirect("/campgrounds");
    }).catch((err) => {
        req.flash("error", err.message);
        res.redirect("/campgrounds");
    });
});

router.get("/new", middleware.isLoggedIn, (req, res) => {
    res.render("campgrounds/new");
});

router.get("/:id", (req, res) => {
    Campground.findById(req.params.id).populate("comments").exec().then((foundCampground) => {
        res.render("campgrounds/show", {campground: foundCampground});
    }).catch((err) => {
        req.flash("error", err.message);
        res.redirect("/campgrounds");
    });
});

router.get("/:id/edit", middleware.checkCampgroundOwnership, (req, res) => {
    Campground.findById(req.params.id)
    .then((campground) => {
        res.render("campgrounds/edit", { campground: campground });
    })
    .catch((err) => {
        req.flash("error", err.message);
        res.redirect("/campgrounds/:id");
    });
});

router.put("/:id", middleware.checkCampgroundOwnership, (req, res) => {
    Campground.findByIdAndUpdate(req.params.id, req.body.campground)
    .then(() => {
        req.flash("success", "Successfully updated the campground");
        res.redirect("/campgrounds/" + req.params.id);
    })
    .catch((err) => {
        req.flash("error", err.message);
        res.redirect("/campgrounds/" + req.params.id);
    });
});

router.delete('/:id', middleware.checkCampgroundOwnership, (req, res) => {
    Campground.findById(req.params.id)
    .then((campground) => {
        campground.comments.forEach((comment) => {
            Comment.findByIdAndRemove(comment)
            .then();
        });
        Campground.findByIdAndRemove(req.params.id)
        .then(() => {
            req.flash("success", "Successfully deleted the campground");
            res.redirect("/campgrounds");
        })
        .catch((err) => {
            req.flash("error", err.message);
            res.redirect('/campgrounds');
        });
    })
    .catch((err) => {
        req.flash("error", err.message);
        res.redirect('/campgrounds');
    });
});

module.exports = router;