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
    const newListing = new Listing(req.body.listing); //simply in these we have created new model instance
    newListing.owner = req.user._id;
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

module.exports.updateListingroute = async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    // res.redirect(`/listings/${id}`);
    req.flash("success", "Listing Updated");

    res.redirect("/listings");
}

module.exports.destroyListingRoute = async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success", "Listing deleted");

    res.redirect("/listings");
}