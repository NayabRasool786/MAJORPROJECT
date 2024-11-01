const express = require("express"); 
const router = express.Router({mergeParams : true}); //router object
const wrapAsync = require("../utils/wrapAsync.js");
//importing reviews model
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware.js");
const reviewController = require("../controllers/reviews.js");



//Reviews Post Route 
router.post("/", isLoggedIn, validateReview, wrapAsync(reviewController.createReview));

//Reviews DELETE Route
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, wrapAsync(reviewController.destroyReview));


module.exports = router;