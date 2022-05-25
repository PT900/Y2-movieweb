const mongoose = require("mongoose");

const branchSchema = new mongoose.Schema({
    movies: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movie"
        }
    ]
});

module.exports = mongoose.model("Branch3", branchSchema);