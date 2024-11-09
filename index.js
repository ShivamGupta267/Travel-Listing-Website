const express = require("express");
const app = express();
const path = require("path");
const mongoose = require('mongoose');
const methodOverride = require("method-override");
const port = 8080;
const mongoUrl = "mongodb://127.0.0.1:27017/travelmingle";
const Listing = require("./models/listing");
const engine = require("ejs-mate");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use('/source', express.static(path.join(__dirname, 'source')));
app.engine('ejs', engine);
app.use(express.static(path.join(__dirname, "public")));

main()
    .then((res) => {
        console.log("connected to db");
    }).catch((err)=>{
        console.log(err);
    })
async function main(){
    await mongoose.connect(mongoUrl);
}

app.get("/", (req, res)=> {
    res.send("request accepted");
})


//main route
app.get("/listing", async (req, res)=>{
    let allListing = await Listing.find({});
    res.render("listing/index.ejs", {allListing});
})

// create new Render form 
app.get("/listing/new", (req,res)=>{
    res.render("listing/form.ejs")
})

//read route
app.get("/listing/:id", async (req,res)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    res.render("listing/show.ejs", {listing});
});

app.post("/listing/submit", async (req, res)=>{
    let object = req.body;
    const result = await Listing.insertMany(object.listing);
    console.log(result);
    res.redirect("/listing")
})

app.get("/listing/:id/edit",async (req, res)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    res.render("listing/edit.ejs", {listing});
})

app.put("/listing/:id", async(req, res)=>{
    let {id} = req.params;
    const result = await Listing.findByIdAndUpdate(id, {...req.body.listing});
    console.log(result);
    res.redirect("/listing")
})

app.delete("/listing/:id/delete", async(req,res)=>{
    let {id} = req.params;
    const result = await Listing.findByIdAndDelete(id);
    console.log(result);
    res.redirect("/listing")
})

app.listen(port, ()=>{
    console.log("server is listning")
})