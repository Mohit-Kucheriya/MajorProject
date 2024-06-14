const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const { validationReview, isLoggedIn, isReviewAuthor } = require("../middleware.js")

// Review Route
router.post(
    "/",
    isLoggedIn,
    validationReview,
    wrapAsync(async (req, res) => {
        let listing = await Listing.findById(req.params.id); //these will return the complete info about that id.
        let newReview = new Review(req.body.review);
        // console.log(req.body.review)
        newReview.author = req.user._id;

        listing.review.push(newReview);

        await newReview.save();
        await listing.save();

        console.log("Review Saved");
        req.flash("success", "New Review added");

        res.redirect(`/listings/${req.params.id}`);
    })
);

// Delete Review
router.delete(
    "/:reviewId",
    isLoggedIn,
    isReviewAuthor,
    wrapAsync(async (req, res) => {
        let { id, reviewId } = req.params;
        await Listing.findByIdAndUpdate(id, { $pull: { review: reviewId } }); //this update the listing by removing it from its review array
        await Review.findByIdAndDelete(reviewId); //this will only delete review
        req.flash("success", "Review deleted");

        res.redirect(`/listings/${id}`);
    })
);

module.exports = router;
