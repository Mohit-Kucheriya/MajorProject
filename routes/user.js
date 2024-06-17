const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/user.js")

router.get("/signup", userController.signupRenderForm);

router.post(
    "/signup",
    wrapAsync(userController.signUp)
);

router.get("/login", userController.loginRenderForm);

router.post(
    "/login",
    saveRedirectUrl,
    passport.authenticate("local", {
        failureRedirect: "/login",
        failureFlash: true,
    }),
    userController.logIn
);

router.get("/logout", userController.logOut)

module.exports = router;
