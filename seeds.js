
const	mongoose = require("mongoose"),
        User = require("./models/user"),
		Movie = require("./models/movie"),
		Branch1 = require("./models/branch1"),
		Branch2 = require("./models/branch2"),
		Branch3 = require("./models/branch3");

function seedDB() {
	// Branch1.create(function(err){
	// 	if (err) {
	// 		console.log(err);
	// 	} else {
	// 		console.log("Branch 1 create complete!");
	// 	}
	// });
	// Branch2.create(function(err){
	// 	if (err) {
	// 		console.log(err);
	// 	} else {
	// 		console.log("Branch 2 create complete!");
	// 	}
	// });
	// Branch3.create(function(err){
	// 	if (err) {
	// 		console.log(err);
	// 	} else {
	// 		console.log("Branch 3 create complete!");
	// 	}
	// });
	Movie.remove({}, function(err){
		if (err) {
			console.log(err);
		} else {
			console.log("Data removal complete");
		}
	});
}

module.exports = seedDB;