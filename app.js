const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js")

// Mongoose to connect with DB
let MONGOOSE_URL = "mongodb://127.0.0.1:27017/wanderlust"

async function main() {
    await mongoose.connect(MONGOOSE_URL)
}

main().then(() => {
    console.log("Connected with DB")
}).catch((err) => {
    console.log(err)
});


// Express 
app.get("/", (req, res) => {
    res.send("Welcome to Root")
});

app.get("/testListing", async (req,res)=>{
    let sampleListing =  new Listing({
        title:"Con Villa",
        description:"Villa with luxurious arrangement",
        price:5000,
        location:"Calcutge, Goa",
        country:"India"
    });
   await sampleListing.save()
    console.log("Data Saved");
    res.send("Testing Sample")
})

app.listen(8080, () => {
    console.log("Server listening at port 8080");
});