var express        = require('express'),

	app            = express(),

	bodyParser     = require('body-parser'),

	mongoose       = require('mongoose'),

	session        = require('express-session'),

    cookieParser   = require('cookie-parser'),

	flash          = require('connect-flash'),

	passport       = require('passport'),

	LocalStrategy  = require('passport-local'),

	Campground     = require('./models/campground'),

	seedDB         = require('./seeds'),

	User           = require('./models/users'),

	methodOverride = require('method-override'),

	Comment        = require('./models/comment');

//requiring routes
var commentRoutes    = require('./routes/comments'),
	campgroundRoutes = require('./routes/campgrounds'),
	indexRoutes      =  require('./routes/index');



mongoose.connect("mongodb://localhost:27017/YelpCampData", {useNewUrlParser: true});

//seedDB(); //seed the database

app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));

app.use(methodOverride("_method"));


app.use(flash());

//Pasport Configuration
app.use(require('express-session')({
	secret: "My App",
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);


app.listen(3000, function(){
	console.log("The Yelp Camp Server has started!!");
});
