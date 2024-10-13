// requiring mongoose 
const mongoose = require('mongoose');
//creating a variable
const Schema= mongoose.Schema;

const Review = require("./review.js");


// creating listing schema
const listingSchema = new Schema({
    title: {
      type: String,
      required: true,
    },
    description: String,
    image: {
      filename: {
        type: String,
        //required: true,
        default: 'listingimage', // Default filename if not provided
      },
      url: {
        type: String,
        set: (v) => v === "" ? "https://images.pexels.com/photos/28250738/pexels-photo-28250738/free-photo-of-couple-embracing-on-bridge.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" : (v), 
        default : 'https://images.pexels.com/photos/28250738/pexels-photo-28250738/free-photo-of-couple-embracing-on-bridge.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', // Default image URL if not provided
        //required: true,

      },
    },
    price: {
      type: Number,
      required: true,
      min: 0, // Assuming prices are non-negative
    },
    location: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    reviews: [
      {
        //Storying the object id in the form of an array.
        type: Schema.Types.ObjectId, //We are going to store all reviews at the ParticularId
        ref : "Review" // For reference we are using Review
      }, 
    ],
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    geometry: {
      type: {
        type: String, // Don't do `{ location: { type: String } }`
        enum: ['Point'], // 'location.type' must be 'Point'
        required: true
      },
      coordinates: {
        type: [Number],
        required: true
      }
    },
  });
  


listingSchema.post("findOneAndDelete", async(listing) => {
  if(listing){
    await Review.deleteMany({_id : {$in : listing.reviews}});
  }
});




// creating mongoose model from schema to export
const Listing = mongoose.model("Listing", listingSchema);

// let a = Listing.deleteOne({ title: "1111111111111111" });
// if(!a){
//     console.log("yes");
// }else{
//   console.log("no");
// }


// Exporting Model
module.exports = Listing;