// requiring mongoose 
const mongoose = require('mongoose');
//creating a variable
const Schema= mongoose.Schema;

// new review schema
const reviewSchema = new Schema({
    comment: String,
    rating: {
        type: Number,
        min: 1,
        max: 5,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },

});


// Creating A model Named " Review " and Exporting it
module.exports = mongoose.model("Review", reviewSchema); 