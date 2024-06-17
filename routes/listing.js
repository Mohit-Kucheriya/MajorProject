const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validationListing } = require("../middleware.js");

const listingController = require("../controllers/listing.js")

// Index Route
router.get(
    "/",
    wrapAsync(listingController.indexRoute)
);

// New Route
router.get("/new", isLoggedIn, listingController.newListingRoute);

// Show Route using Id
router.get(
    "/:id",
    wrapAsync(listingController.showListingRoute)

);

// Create Route
router.post(
    "/",
    isLoggedIn,
    validationListing,
    wrapAsync(listingController.createRoute)
);

// Edit Route
router.get(
    "/:id/edit",
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.editListingRoute)
);

// Update Route
router.put(
    "/:id",
    isLoggedIn,
    isOwner,
    validationListing,
    wrapAsync()
);

// Delete Route
router.delete(
    "/:id",
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.destroyListingRoute)
);

module.exports = router;
