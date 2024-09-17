const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { route } = require("./listing");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/users.js");

router.get("/signup", (req, res)=> {
    res.render("users/signup.ejs");
});

router.post("/signup", wrapAsync(userController.createUser));


router.get("/login", userController.getUser);

router.post("/login", saveRedirectUrl,passport.authenticate("local", {failureRedirect: '/login', failureFlash: true}) ,userController.authUser);

router.get("/logout", userController.signOutUser);

module.exports = router;