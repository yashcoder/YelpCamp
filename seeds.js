var mongoose    = require('mongoose');
var Campground  = require('./models/campground');
var Comment     = require("./models/comment");

var data = [
	{
		name: "New place",
		image: "https://farm8.staticflickr.com/7254/7626422072_07ffcdd064.jpg",
		description: "dgjhagdjadjmabd"
	},
	{
		name: "New place",
		image: "https://farm5.staticflickr.com/4016/4270995674_9fd4546267.jpg",
		description: "dgjhagdjadjmabd"
	},
	{
		name: "New place",
		image: "https://farm4.staticflickr.com/3273/2602356334_20fbb23543.jpg",
		description: "dgjhagdjadjmabd"
	}
]

function seedDB(){
	Campground.remove({}, function(err){
		if(err){
			console.log(err);
		} 
		console.log("removed camgrounds!");
		data.forEach(function(seed){
			Campground.create(seed, function(err, campground){
				if(err){
					console.log(err);
				} else{
					console.log("added a campground");

					Comment.create(
					{
						text: "This place is great",
						author: "Homer"
					}, function(err, comment){
						if(err){
							console.log(err);
						} else{
							campground.comments.push(comment);
							campground.save();
							console.log("Created new campground");
						}
					})
				}
			});
		});

	});
}

module.exports = seedDB;