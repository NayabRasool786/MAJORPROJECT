const express = require("express"); 
const router = express.Router({ mergeParams : true }); //router object
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer  = require('multer')
const { storage } = require("../cloudConfig.js");
const upload = multer({storage});



router
    .route("/")
    .get(wrapAsync(listingController.index))
    .post(isLoggedIn,  upload.single('listing[image.url]'),validateListing, wrapAsync(listingController.createListing));
    
//newrouter
router.get("/new",isLoggedIn, listingController.renderNewForm);

router
    .route("/:id")
    .get( wrapAsync(listingController.showListing))
    .put( isLoggedIn, isOwner, upload.single('listing[image.url]'), validateListing, wrapAsync(listingController.updateListing ))
    .delete( isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));



module.exports =router;


