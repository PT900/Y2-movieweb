const   express = require("express"),
        router = express.Router({mergeParams: true}),
        middleware = require("../middleware"),
        Movie = require("../models/movie"),
        Comment = require("../models/comment");

router.get("/new", middleware.isLoggedIn, function(req, res){
	Movie.findById(req.params.id, function(err, allMovies){
		if (err) {
			console.log(err);
		} else {
            res.render("comments/new.ejs", {movie: allMovies});
		}
	});
});

router.post("/", middleware.isLoggedIn, function(req, res){
    Movie.findById(req.params.id, function(err, foundMovie){
        if(err){
            console.log(err);
        } else {
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                } else {
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();    
                    foundMovie.comments.push(comment);
                    foundMovie.save();
                    res.redirect('/movie/'+ foundMovie._id);
                }
            });
        }
    });
});

router.get('/all', function(req, res){
    Movie.findById(req.params.id).populate("comments").exec(function(err, foundMovie){
        if (err) {
            console.log(err);
        } else {
            Comment.findById(req.params.comment_id, function(err, foundComment){
                if(err){
                    console.log(err);
                    res.redirect('back');
                } else {
                    res.render('comments/show.ejs', {movie_id: req.params.id, comment: foundComment, movie: foundMovie});
                }
            });
        }
    });
});

router.get('/:comment_id/edit', middleware.checkCommentOwner, function(req, res){
    Movie.findById(req.params.id, function(err, foundMovie){
        if (err) {
            console.log(err);
        } else {
            Comment.findById(req.params.comment_id, function(err, foundComment){
                if(err){
                    console.log(err);
                    res.redirect('back');
                } else {
                    res.render('comments/edit.ejs', {movie_id: req.params.id, comment: foundComment, movie: foundMovie});
                }
            });
        }
    });
});

router.put('/:comment_id', middleware.checkCommentOwner, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
            res.redirect('back');
        } else {
            req.flash("success", "Edit Comment Success");
            res.redirect('/movie/'+req.params.id);
        }
    });
});

router.delete('/:comment_id', middleware.checkCommentOwner, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            req.flash('error','There are something wrong!')
            res.redirect('/movie/'+req.params.id);
        } else {
            req.flash('success','Your comment was deleted.');
            res.redirect('/movie/'+req.params.id);
        }
    });
});

module.exports = router;