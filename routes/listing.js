const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validationListing } = require("../middleware.js");
const listingController = require("../controllers/listing.js");
const multer  = require('multer');
const {storage} = require("../cloudConfig.js")
const upload = multer({ storage })

router
    .route("/")
    //   Index
    .get(wrapAsync(listingController.indexRoute))
    //   Create 
    .post(
        isLoggedIn,
        upload.single("listing[image]"),
        validationListing,
        wrapAsync(listingController.createRoute)
    );
 
// New Route
router.get("/new", isLoggedIn, listingController.newListingRoute);

router.route("/:id")
    // Show Route using Id
    .get(wrapAsync(listingController.showListingRoute))
    // Update Route
    .put(
        isLoggedIn,
        isOwner,
        validationListing,
        wrapAsync(listingController.updateListingroute)
    )
    // Delete Route
    .delete(
        isLoggedIn,
        isOwner,
        wrapAsync(listingController.destroyListingRoute)
    );


// Edit Route
router.get(
    "/:id/edit",
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.editListingRoute)
);

module.exports = router;
