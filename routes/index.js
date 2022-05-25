const	express = require("express"),
		router = express.Router(),
		multer  = require('multer'),
        path    = require('path'),
        storage = multer.diskStorage({
                    destination: function(req, file, callback){
                        callback(null,'./public/upload/');
                    },
                    filename: function(req, file, callback){
                        callback(null, file.fieldname + '-' + Date.now()+ path.extname(file.originalname));
                    }
        }),
        imageFilter = function(req, file, callback){
            if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)){
                return callback(new Error('Only jpg, jpeg, png and gif.'), false);
            }
            callback(null, true);
        },
        upload = multer({storage: storage, fileFilter: imageFilter}),
		User = require("../models/user"),
		Movie = require("../models/movie"),
		passport = require("passport");

router.get("/", function(req, res){
	Movie.find({}, function(err, allMovies){
		if (err) {
			console.log(err);
		} else {
			res.render("landing.ejs", {movie: allMovies});
		}
	});
});

router.get("/register", function(req, res){
	res.render("register.ejs");
});

router.post("/register", function(req, res){
	let newUser = new User({username: req.body.username,
							firstname: req.body.firstname,
							lastname: req.body.lastname,
							email: req.body.email});
	if (req.body.admincode === "foradmin") newUser.isAdmin = true;
	User.register(newUser, req.body.password, function(err, user){
		if (err) {
			req.flash('error', err.message);
			return res.redirect("/register");
		} else {
			passport.authenticate('local')(req, res, function(){
			req.flash('success', 'Registration complete!');
			res.redirect("/");
			});
		}
	});
});

router.get("/login", function(req, res){
	res.render("login.ejs");
});

router.post("/login", passport.authenticate('local',
	{
		successRedirect: '/',
		failureRedirect: '/login',
        successFlash: true,
        failureFlash: true,
        successFlash: 'Successfully login',
        failureFlash: 'Invalid username or password'
	}), function(req, res){
});

router.get("/forget", function(req, res){
	res.render("forget.ejs");
});

router.get("/logout", function(req, res){
	req.logout();
    req.flash('success', 'Successfully logout');
	res.redirect("/");
});

router.get("/user/:id", function(req, res){
	User.findById(req.params.id, function(err, foundUser){
		if (err) {
			req.flash('error', 'There is something wrong');
			return res.redirect("/");
		} else {
			res.render("user/show.ejs", {user: foundUser});
		}
	});
});

module.exports = router;