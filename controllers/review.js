const Listing = require("../models/listing.js");
const Review = require("../models/review.js");

module.exports.createReviewRoute = async (req, res) => {
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
}

module.exports.destroyReviewRoute = async (req, res) => {
    let { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { review: reviewId } }); //this update the listing by removing it from its review array
    await Review.findByIdAndDelete(reviewId); //this will only delete review
    req.flash("success", "Review deleted");

    res.redirect(`/listings/${id}`);
}