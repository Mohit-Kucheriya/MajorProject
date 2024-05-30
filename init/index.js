const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js")

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

async function initDB(){
    await Listing.deleteMany({});
    await Listing.insertMany(initData.data);
    console.log("Data was Initialized");

}

initDB();