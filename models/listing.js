const mongoose = require("mongoose");
const Review = require("./review.js");
const { ref } = require("joi");
const Schema = mongoose.Schema;

const default_link = "https://media.istockphoto.com/id/1369829721/photo/radhanagar-beach-swaraj-dweep.jpg?s=2048x2048&w=is&k=20&c=9ztSEuYEJoUUx8go7TYy6Gkn1ZuOCxZnuamekNbxb-0=";

const listingSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    image: {
        filename: String,
        url: { 
            type: String,
            //set: (v) => v === "" ? "https://media.istockphoto.com/id/1369829721/photo/radhanagar-beach-swaraj-dweep.jpg?s=2048x2048&w=is&k=20&c=9ztSEuYEJoUUx8go7TYy6Gkn1ZuOCxZnuamekNbxb-0=" : v
        },
        
    },
    price: Number,
    location: String,
    country: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
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

listingSchema.post("findOneAndDelete", async (listing) => {
    if(listing){
        await Review.deleteMany({_id: {$in: listing.reviews }});
    }
    
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
