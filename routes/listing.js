const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema } = require("../schema.js");
const { isLoggedIn } = require("../middleware.js");


// Function to check Validation
const validationListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    // console.log(listingSchema);
    if (error) {
        throw new ExpressError(400, error);
    } else {
        next();
    }
};

// Index Route
router.get(
    "/",
    wrapAsync(async (req, res) => {
        const allListings = await Listing.find({});
        res.render("listings/index.ejs", { allListings });
    })
);

// New Route
router.get("/new", isLoggedIn, (req, res) => {
    console.log(req.user);
    res.render("listings/new.ejs");
});

// Show Route using Id
router.get(
    "/:id",
    wrapAsync(async (req, res) => {
        let { id } = req.params;
        const listing = await Listing.findById(id).populate("review");
        if (!listing) {
            req.flash("error", "Listing you requested doesn't exist anymore");
            res.redirect("/listings");
        }
        res.render("listings/show.ejs", { listing });
    })
);

// Create Route
router.post(
    "/",
    isLoggedIn,
    validationListing,
    wrapAsync(async (req, res) => {
        const newListing = new Listing(req.body.listing); //simply in these we have created new model instance
        await newListing.save();
        req.flash("success", "New Listing Created");
        res.redirect("/listings");
    })
);

// Edit Route
router.get(
    "/:id/edit",
    isLoggedIn,
    wrapAsync(async (req, res) => {
        let { id } = req.params;
        const listing = await Listing.findById(id);
        if (!listing) {
            req.flash("error", "Listing you requested doesn't exist anymore");
            res.redirect("/listings");
        }
        res.render("listings/edit.ejs", { listing });
    })
);

// Update Route
router.put(
    "/:id",
    isLoggedIn,
    validationListing,
    wrapAsync(async (req, res) => {
        let { id } = req.params;
        await Listing.findByIdAndUpdate(id, { ...req.body.listing });
        // res.redirect(`/listings/${id}`);
        req.flash("success", "Listing Updated");

        res.redirect("/listings");
    })
);

// Delete Route
router.delete(
    "/:id",
    isLoggedIn,
    wrapAsync(async (req, res) => {
        let { id } = req.params;
        let deletedListing = await Listing.findByIdAndDelete(id);
        console.log(deletedListing);
        req.flash("success", "Listing deleted");

        res.redirect("/listings");
    })
);

module.exports = router;
