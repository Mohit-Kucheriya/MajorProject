const Listing = require("./models/listing");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("./schema.js");
const Review = require("./models/review.js");

module.exports.isLoggedIn = (req, res, next) => {
    // To check if user doesn't login, first he must be logged-in our website
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "You must be logged-in first");
        return res.redirect("/login");
    }
    next();
}

module.exports.saveRedirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl
    }
    next();
};

// These middleware will check if current Logged-In user is the owner of the particular listing or not  
module.exports.isOwner = async (req, res, next) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if (!listing.owner.equals(res.locals.currUser._id)) {
        req.flash("error", "You are not the Owner of listing");
        return res.redirect(`/listings/${id}`);
    }
    next()

}

// Function to check Validation
module.exports.validationListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    // console.log(listingSchema);
    if (error) {
        throw new ExpressError(400, error);
    } else {
        next();
    }
};

// Function to check ReviewValidation
module.exports.validationReview = (req, res, next) => {
    // console.log(reviewSchema);
    let { error } = reviewSchema.validate(req.body);
    if (error) {
        throw new ExpressError(400, error);
    } else {
        next();
    }
};

module.exports.isReviewAuthor = async (req, res, next) => {
    let { id,reviewId } = req.params;
    let review = await Review.findById(reviewId);
    if (!review.author.equals(res.locals.currUser._id)) {
        req.flash("error", "You are not the Author of this Review");
        return res.redirect(`/listings/${id}`);
    }
    next()

}

