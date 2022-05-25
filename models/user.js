const 	mongoose = require('mongoose'),
		passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
	username: String,
	password: String,
	firstname: String,
	lastname: String,
	email: String,
	isAdmin: {type: Boolean, default: false},
	profileimage: {type: String, default: "images/user.png"}
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(passportLocalMongoose, {usernameQueryFields: ["username", "email"]});

module.exports = mongoose.model("User", userSchema);