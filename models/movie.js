const 	mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    name: String,
    date: Date,
    length_min: Number,
    length_hour: Number,
    genres: Array,
    thumbnail: String,
    trailer: String,
    description: String,
    incoming: {type: Boolean, default: false},
    branch1: {type: Boolean, default: false},
    branch2: {type: Boolean, default: false},
    branch3: {type: Boolean, default: false},
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
});

module.exports = mongoose.model("Movie", movieSchema);