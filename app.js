const 	express = require("express"),
		app = express(),
		mongoose = require("mongoose"),
		cookieParser = require("cookie-parser"),
		session = require("express-session"),
		flash = require("connect-flash"),
		passport = require("passport"),
		LocalStrategy = require("passport-local"),
		methodOverride = require("method-override"),
		Movie = require("./models/movie"),
		// Theater = require("./models/theater"),
		User = require("./models/user"),
		seedDB = require("./seeds.js");

const	indexRoutes = require("./routes/index"),
		movieRoutes = require("./routes/movie"),
		commentRoutes = require("./routes/comment"),
		branchRoutes = require("./routes/branch");

mongoose.connect("mongodb://localhost/Myproj", {useNewUrlParser: true, useUnifiedTopology: true});
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
// seedDB();

var moment = require("moment");
app.locals.moment = moment;

app.use(cookieParser("secret"));
app.use(session({
	secret: "secret",
	resave: true,
	saveUninitialized: true
}));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
	res.locals.currentUser = req.user;
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
	next();
});

app.use("/", indexRoutes);
app.use("/movie", movieRoutes);
app.use("/movie/:id/comments", commentRoutes);
app.use("/branch", branchRoutes);

app.listen(3000, function(){
	console.log("Activated");
})
