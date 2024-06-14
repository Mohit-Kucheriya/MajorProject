const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

router.get("/signup", (req, res) => {
    res.render("./users/signup.ejs");
});

router.post(
    "/signup",
    wrapAsync(async (req, res) => {
        try {
            let { username, email, password } = req.body;
            const newUser = new User({ username, email });
            const registeredUser = await User.register(newUser, password);
            console.log(registeredUser);
            // After user singup for the first time, req.login will login the user.
            req.login(registeredUser, (err) => {
                if (err) {
                    return next(err)
                }
                req.flash("success", "Registered Successfully! Welcome to Wanderlust.");
                res.redirect("/listings");
            })

        } catch (error) {
            req.flash("error", error.message);
            res.redirect("/signup");
        }
    })
);

router.get("/login", (req, res) => {
    res.render("./users/login.ejs");
});

router.post(
    "/login",
    saveRedirectUrl,
    passport.authenticate("local", {
        failureRedirect: "/login",
        failureFlash: true,
    }),
    async (req, res) => {
        req.flash("success", "Welcome to Wanderlust");
        let redirectUrl = res.locals.redirectUrl || "/listings";
        console.log(redirectUrl);
        res.redirect(redirectUrl);
    }
);

router.get("/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "Logout Successfully");
        res.redirect("/listings");
    })
})

module.exports = router;
