const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    image: {
        type: String,
        default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcNCwO2q_g4Z9UsQUPWqYOpzkFSrFR57ibKg&s",
        set: (img) => img === "" ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcNCwO2q_g4Z9UsQUPWqYOpzkFSrFR57ibKg&s" : img,
    }, 
    price: Number,
    location: String,
    country: String,
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
