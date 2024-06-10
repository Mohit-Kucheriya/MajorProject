const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const listings = require("./routes/listing.js");
const reviews = require("./routes/review.js");
const session = require("express-session");
// const cookieParser = require('cookie-parser')

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
app.use(express.static(path.join(__dirname, "/public")));
app.engine("ejs", ejsMate);

app.get("/", (req, res) => {
    res.send("Welcome to MajorProject");
});

// Express Router
app.use("/listings", listings);
app.use("/listings/:id/reviews", reviews);

const sessionOptions = {
    secret:"mysupersecret",
    resave:false,
    saveUninitialized:true
};

app.use(session(sessionOptions));

// After checking all routes if not found then handle the error and send the response.(Middleware)
app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page Not Found!"));
});

app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Something went Wrong" } = err;
    res.status(statusCode).render("error.ejs", { message });
});

app.listen(8080, () => {
    console.log("Server listening at port 8080");
});
