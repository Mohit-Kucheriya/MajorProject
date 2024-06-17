const Listing = require("../models/listing.js");

module.exports.indexRoute = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
}

module.exports.newListingRoute = (req, res) => {
    console.log(req.user);
    res.render("listings/new.ejs");
}

module.exports.showListingRoute = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate({
        path: "review", populate: {
            path: "author"
        }
    }).populate("owner");
    if (!listing) {
        req.flash("error", "Listing you requested doesn't exist anymore");
        res.redirect("/listings");
    }
    console.log(listing);
    res.render("listings/show.ejs", { listing });
}

module.exports.createRoute = async (req, res) => {
    let url = req.file.path;
    let filename = req.file.filename;
    const newListing = new Listing(req.body.listing); //simply in these we have created new model instance
    newListing.owner = req.user._id;
    newListing.image = { url, filename }
    await newListing.save();
    req.flash("success", "New Listing Created");
    res.redirect("/listings");
}

module.exports.editListingRoute = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing you requested doesn't exist anymore");
        res.redirect("/listings");
    }
    res.render("listings/edit.ejs", { listing });
}

module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

    //if an image is provided, only then update the filename and url.
    if (typeof req.file !== "undefined") {
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = { url, filename };

        await listing.save();
    }

    req.flash("success", "Listing updated!");
    res.redirect(`/listings`);
};

module.exports.destroyListingRoute = async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success", "Listing deleted");

    res.redirect("/listings");
}