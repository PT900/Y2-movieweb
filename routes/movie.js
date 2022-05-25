const   express = require('express'),
        router  = express.Router(),
        multer  = require('multer'),
        path    = require('path'),
        moment  = require('moment'),
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
        middleware = require('../middleware'),
        Movie = require("../models/movie");

router.post("/", middleware.isLoggedIn, upload.single("thumbnail"), function(req, res){
    req.body.movie.thumbnail = "/upload/" + req.file.filename;
    Movie.create(req.body.movie, function(err, newlyAdded){
        if (err) {
            console.log(err);
        } else {
            req.flash("success", "Add movie success!");
            res.redirect("/");
        }
    });
});

router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("movie/new.ejs");
});

router.get("/", function(req, res){
	Movie.find({}, function(err, allMovies){
		if (err) {
			console.log(err);
		} else {
            res.render("movie/all.ejs", {movie: allMovies});
		}
	});
});

router.get("/search/:name", function(req, res){
    Movie.find({"name": {$regex: ".*" + req.params.name + ".*", "$options": "i"}}, function(err, foundMovie) {
        if (err) {
            console.log(err);
        } else {
            res.render("movie/search.ejs", {movie: foundMovie});
        }
    });
});

router.get("/:id", function(req, res){
    Movie.findById(req.params.id).populate("comments").exec(function(err, foundMovie){
        if (err) {
            console.log(err);
        } else {
            res.render("movie/show.ejs", {movie: foundMovie});
        }
    });
});

router.get("/:id/edit", function(req, res){
    Movie.findById(req.params.id, function(err, foundMovie){
        if(err){
            console.log(err);
        } else {
            res.render("movie/edit.ejs", {movie: foundMovie})
        }
    });
});

router.put('/:id',upload.single('thumbnail'), function(req, res){
    if(req.file){
        req.body.movie.thumbnail = '/upload/' + req.file.filename;
    }
    Movie.findByIdAndUpdate(req.params.id, req.body.movie, function(err, updatedmovie){
        if(err){
            console.log(err);
            res.redirect('/movie');
        } else {
            res.redirect('/');
        }
    });
});

router.delete('/:id', function(req,res){
    Movie.findByIdAndRemove(req.params.id, function(err){
        if(err){
            console.log(err);
        } else {
            req.flash("success", "Delete movie success!");
            res.redirect('/');
        }
    });
});

module.exports = router;