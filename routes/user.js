const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/user.js")

router.route("/signup")
    // Signup render From
    .get(userController.signupRenderForm)
    // Signup
    .post(
        wrapAsync(userController.signUp)
    );

router.route("/login")
    // Login Render Form
    .get(userController.loginRenderForm)
    // Login
    .post(
        saveRedirectUrl,
        passport.authenticate("local", {
            failureRedirect: "/login",
            failureFlash: true,
        }),
        userController.logIn
    );

router.get("/logout", userController.logOut)

module.exports = router;
