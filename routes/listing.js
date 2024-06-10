const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema } = require("../schema.js");

// Function to check Validation
const validationListing = (req, res, next) => {
    // console.log(listingSchema);
    let { error } = listingSchema.validate(req.body);
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
router.get("/new", (req, res) => {
    res.render("listings/new.ejs");
});

// Show Route using Id
router.get(
    "/:id",
    wrapAsync(async (req, res) => {
        let { id } = req.params;
        const listing = await Listing.findById(id).populate("review");
        res.render("listings/show.ejs", { listing });
    })
);

// Create Route
router.post(
    "/",
    wrapAsync(async (req, res) => {
        const newListing = new Listing(req.body.listing); //simply in these we have created new model instance
        await newListing.save();
        res.redirect("/listings");
    })
);

// Edit Route
router.get(
    "/:id/edit",
    wrapAsync(async (req, res) => {
        let { id } = req.params;
        const listing = await Listing.findById(id);
        res.render("listings/edit.ejs", { listing });
    })
);

// Update Route
router.put(
    "/:id",
    validationListing,
    wrapAsync(async (req, res) => {
        let { id } = req.params;
        await Listing.findByIdAndUpdate(id, { ...req.body.listing });
        // res.redirect(`/listings/${id}`);
        res.redirect("/listings");
    })
);

// Delete Route
router.delete(
    "/:id",
    wrapAsync(async (req, res) => {
        let { id } = req.params;
        let deletedListing = await Listing.findByIdAndDelete(id);
        console.log(deletedListing);
        res.redirect("/listings");
    })
);

module.exports = router;