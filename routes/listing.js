const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing} = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer  = require("multer");
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });


//Index Route
router.get("/", wrapAsync(listingController.index));

// New route
router.get("/new", isLoggedIn, listingController.renderNewForm);

//Show route
router.get("/:id", wrapAsync(listingController.showListing));

//Create Route 
router.post("/",isLoggedIn, upload.single("listing[image]"), wrapAsync(listingController.postListing));


//Edit route
router.get("/:id/edit",isLoggedIn,isOwner, wrapAsync(listingController.editListing));

//Update route
router.put("/:id",isLoggedIn, isOwner,upload.single("listing[image]"), wrapAsync(listingController.updateListing));

// Delete route
router.delete("/:id", isLoggedIn,isOwner, wrapAsync(listingController.destroyListing));

module.exports = router;