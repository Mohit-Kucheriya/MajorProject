const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const ExpressError = require("../utils/ExpressError.js");
const { reviewSchema } = require("../schema.js");
const Review = require("../models/review.js");

// Function to check ReviewValidation
const validationReview = (req, res, next) => {
    // console.log(reviewSchema);
    let { error } = reviewSchema.validate(req.body);
    if (error) {
        throw new ExpressError(400, error);
    } else {
        next();
    }
};

// Review Route
router.post(
    "/",
    validationReview,
    wrapAsync(async (req, res) => {
        let listing = await Listing.findById(req.params.id); //these will return the complete info about that id.
        let newReview = new Review(req.body.review);
        // console.log(req.body.review)

        listing.review.push(newReview);

        await newReview.save();
        await listing.save();

        console.log("Review Saved");
        res.redirect(`/listings/${req.params.id}`);
    })
);

// Delete Review
router.delete(
    "/:reviewId",
    wrapAsync(async (req, res) => {
        let { id, reviewId } = req.params;
        await Listing.findByIdAndUpdate(id, { $pull: { review: reviewId } }); //this update the listing by remiving it from its review array
        await Review.findByIdAndDelete(reviewId); //this will only delete review

        res.redirect(`/listings/${id}`);
    })
);

module.exports = router;
