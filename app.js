//setting env only for development not for producton
if(process.env.NODE_ENV != "production"){
    require('dotenv').config();
}
 
// Basic Code SetUp By Requiring few Operations
const express = require("express"); 
const app = express();
const mongoose = require("mongoose");
//importing listing model
/////////const Listing = require("./models/listing.js");
//Setting up EJS
const path = require("path");
//Method OverRide Requireing to change API Methods
const methodOverride = require("method-override");
// Requiring EJS Mate 
const ejsMate = require("ejs-mate");
//const { send } = require("process");
////////const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const {listingSchema, reviewSchema} = require("./schema.js");
//importing reviews model
//////////const Review = require("./models/review.js");
const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");
const session = require("express-session"); ////npm pakage
const MongoStore = require('connect-mongo');
const cookie = require("express-session/session/cookie.js");
// we use flash before the lines where we use routes
const flash = require("connect-flash"); //npm package // to use flash we must need to use sessions , its mandatory
// To use Passport and authentication
const passport = require("passport");
const LocalStrategy = require("passport-local");
//require user moodel
const User = require("./models/user.js");

//Copying link from the mongoose.com and storing in a variable
// const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
const dbUrl = process.env.ATLASDB_URL;
//Calling Main() to run DB and run the code
main()
    .then(()=>{
    console.log("Connected to MongoDB");
})
.catch((err)=>{
    console.log(err);
});
// To Create DataBase WE need to build ASYNC Function Called "Main()"
async function main() {
    await mongoose.connect(dbUrl);//either we can add direct URL available from website
};
//Setting up EJS for rendering views
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true })); // data comes under request will be parsed by using this
app.use(methodOverride("_method"));//using methodOverride package or Using Method In a MethodOverride
app.engine("ejs", ejsMate);  //Middleware to use EJS Mate
app.use(express.static(path.join(__dirname, "/public")));  //Setting up Static Folder or use static files with templates 


const store = MongoStore.create({
    mongoUrl: dbUrl,
    crypto: {
        secret: process.env.SECRET,
    },
    touchAfter: 24 * 3600,
});

store.on("error",()=>{
    console.log("ERROR in MONGO SESSION STORE", err);
});

const sessionOptions = {
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000, //milliseconds -> week,day,hours,minutes,seconds, milliseconds
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    },
};

//Creating A Basic API with Root"/"
// app.get("/",(req,res)=>{
//     res.send("Hi this is home/root page");
// });



app.use(session(sessionOptions));
app.use(flash());  //// we use flash before the lines where we use routes,==> 1st we get flash then we get routes below
// to stop making user to login again & again we use this below the session middleware because it also takes session properties.
app.use(passport.initialize()); //initilizing before use
app.use(passport.session()); // same user using different tabs of one session
passport.use(new LocalStrategy(User.authenticate()));//use static authentic method of modelmin LocalStrategy
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next) =>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});

app.get("/demouser", async(req,res)=>{
    let fakeUser = new User ({
        email:"student@gmail.com",
        username:"delta-student",
    });

    let registerUser = await User.register(fakeUser, "helloworld");
    res.send(registerUser);
});




////////////////////////                Routes
app.use("/listings", listingRouter); // if we get listings it will use listings.js file
app.use("/listings/:id/reviews", reviewRouter);
app.use("/",userRouter);



app.all("*",(req,res,next)=>{
    // res.render("error.ejs");
    next(new ExpressError(404,"Page Not Found"));
});

app.use((err,req,res,next)=>{
    let{status=500 , message="Something Went Wrong"} = err;
    res.status(status).render("error.ejs",{ message });
    //res.status(status).send(message); 
});

//Setting Port 8080 and test by "nodemon app.js" 
app.listen(8080,()=>{
    console.log("server is running on port 8080");
});













