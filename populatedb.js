console.log('Populates fields of Treefort-creators');


//Get Arguments passed on command line
var userArgs = process.argv.slice(2);


var async = require('async');
var Creator = require('./models/creator');
var Donation = require('./models/donation');

var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var creators = [];
var donations = [];


function creatorCreate(username, email, category, title, callback){
	creatordetail = {
		username: username,
		email: email,
		category: category,
		title: title
	}

	var creator = new Creator(creatordetail);

	creator.save(function(err){
		if(err){
			callback(err, null);
			return;
		}
		console.log('New Creator: ' + creator);
		creators.push(creator);
		callback(null, creator)
	});
}

//Donations
function donationCreate(username, email, recipient, category, title, currency, amount, callback){
	donationdetail = {
		username: username,
		email: email,
		recipient: recipient,
		category: category,
		title: title,
		currency: currency,
		amount: amount
	}

	var donation = new Donation(donationdetail);

	donation.save(function(err){
		if(err){
			callback(err, null);
			return;
		}
		console.log('New Donator: ' + donation);
		donations.push(donation);
		callback(null, donation);
	});
}

function creatorArrCreate(cb){
	async.series(
		[ function(callback){
			creatorCreate('Meliai', 'mel@g.com', 'Art', 'Treedom Thought', callback);
		},
		function(callback){
			creatorCreate('Audogen', 'mct@g.com', 'Music', 'Sound Within', callback);
		},
		function(callback){
			creatorCreate('J Ruth', 'j@g.com', 'Photography', 'Horsies', callback);
		},
		function(callback){
			creatorCreate('tumbling.dice', 'td@a.com', 'Essays', 'Pink Floyd jams', callback);
		},
		function(callback){
			creatorCreate('Undies', 'u@g.gov', 'ASMR', 'Chopping Broccoli', callback);
		}

		], cb);
}

function donationArrCreate(cb){
	async.series(
		[
		function(callback){
			donationCreate('Fun', 'fun@doo.com', creators[1], 'Music', 'Sound Within', 'USD', 38, callback);
		},
		function(callback){
			donationCreate('Mally', 'glen@gm.com', creators[3], 'Essays', 'Pink Floyd jams', 'CAD', 99, callback);
		}
		], cb);
}


async.series([
	creatorArrCreate,
	donationArrCreate
	],
	//Optional Callback
	function(err, results){
		if(err){
			console.log('FINAL ERR: ' + err);
		}
		else{
			console.log('Working!');
		}
		//ALL DONE disconnect from Database
		mongoose.connection.close();
	})




















