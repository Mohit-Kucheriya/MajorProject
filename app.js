const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");

// Mongoose to connect with DB
let MONGOOSE_URL = "mongodb://127.0.0.1:27017/wanderlust";

async function main() {
    await mongoose.connect(MONGOOSE_URL);
}

main()
    .then(() => {
        console.log("Connected with DB");
    })
    .catch((err) => {
        console.log(err);
    });

// Express

// To set EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.get("/", (req, res) => {
    res.send("Welcome to MajorProject");
});

// Index Route
app.get("/listings", async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
});

// New Route
app.get("/listings/new", (req, res) => {
    res.render("listings/new.ejs");
});

// Show Route using Id
app.get("/listings/:id", async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs", { listing });
});

// Create Route
app.post("/listings", async (req, res) => {
    // let {title,description,image,price,location,country} = req.body;  1st way to extract data
    const newListing = await new Listing(req.body.listing); //simply in these we have created new model instance
    newListing.save();
    res.redirect("/listings");
});

// Edit Route
app.get("/listings/:id/edit", async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", { listing });
});

// Update Route
app.put("/listings/:id", async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    // res.redirect(`/listings/${id}`);
    res.redirect("/listings");
});

// Delete Route
app.delete("/listings/:id", async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
});

// app.get("/testListing", async (req,res)=>{
//     let sampleListing =  new Listing({
//         title:"Con Villa",
//         description:"Villa with luxurious arrangement",
//         price:5000,
//         location:"Calcutge, Goa",
//         country:"India"
//     });
//    await sampleListing.save()
//     console.log("Data Saved");
//     res.send("Testing Sample")
// })

app.listen(8080, () => {
    console.log("Server listening at port 8080");
});
