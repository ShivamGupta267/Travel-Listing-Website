const mongoose = require("mongoose");
const data = require("./data.js")
const Listing = require("../models/listing.js");
const mongoUrl = "mongodb://127.0.0.1:27017/travelmingle";

main()
    .then((res) => {
        console.log("connected to db");
    }).catch((err)=>{
        console.log(err);
    })
async function main(){
    await mongoose.connect(mongoUrl);
}

const initDb = async () => {
    await Listing.insertMany(data.data);
}

initDb().then(() => {console.log("data inserted")})
        .catch((err) => {console.log(err)});