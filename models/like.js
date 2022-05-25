const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema({
    state: Boolean,
    owner: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    movie: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Movie'
        }
    }
});

module.exports = mongoose.model("Like", likeSchema);