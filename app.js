const express = require("express"),
      app = express(),
      bodyParser = require("body-parser"),
      mongoose = require("mongoose"),
      flash = require('connect-flash'),
      seedDB = require("./seed"),
      passport = require('passport'),
      localStrategy = require('passport-local'),
      methodOverride = require('method-override'),
      User = require('./models/user');

const campgroundRoutes = require('./routes/campground'),
      commentRoutes = require('./routes/comment'),
      indexRoutes = require('./routes/index');


mongoose.connect("mongodb+srv://test:test@cluster0-hat68.mongodb.net/test?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
.then(() => {
    console.log("connected...");
});

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

app.use(require('express-session')({
    secret: "secret text",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//seedDB();

app.use('/campgrounds', campgroundRoutes);
app.use('/campgrounds/:id/comments', commentRoutes);
app.use(indexRoutes);

app.listen(3000, () => {
    console.log("The YelpCamp server has started on port 3000\nVisit http://localhost:3000/");
});