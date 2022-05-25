const mongoose = require("mongoose");

const theaterSchema = new mongoose.Schema({
    isClosed: {
        type: Boolean,
        default: false
    },
    theaterNo: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Seat"
        }
    ]
});

module.exports = mongoose.model("Theater", theaterSchema);