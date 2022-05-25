const   express = require("express"),
        router = express.Router(),
        Movie = require("../models/movie");

router.get("/", function(req, res){
	res.render("branch/index.ejs");
})

router.get("/theater", function(req, res){
	Movie.find({}, function(err, allMovies){
		if (err) {
			console.log(err);
		} else {
            res.render("branch/show.ejs", {movie: allMovies});
		}
	});
});

router.get("/theater/seat", function(req, res){
	res.render("branch/seat.ejs");
})

module.exports = router;