var Creator = require('../models/creator');
var Donation = require('../models/donation');

const {body, validationResult} = require('express-validator');

var async = require('async');


//Index Router
exports.nav = function(req, res){

	let donationArray;
	let totalDonation = 0;

	for(let i = 0; i < donationArray.length; i++){
		totalDonation += donationArray[i];
	}

	

	async.parallel({
		creator_count: function(callback){
			Creator.countDocuments({}, callback); //Pass empty object as match
		},
		donation_count: function(callback){
			Donation.countDocuments({}, callback);
		},
	}, function(err, results){
		res.render('nav', {title: 'Content Creators', error: err, data: totalDonation});
	});
};


//Display list of all Creators
exports.creator_list = function(req, res, next){
	
	Creator.find()
	.populate('creator')
	.sort([['username', 'ascending']])
	.exec(function(err, list_creators){
		if(err){return next(err);}
		//On Success
		res.render('creator_list', {title: 'Creators', creator_list: list_creators});
	})
};

// Display detal page for a specific creator

exports.creator_detail = function(req, res, next){
   res.send('Creator Detail' + req.params.id);
};

exports.creator_success = function(req, res, next){
	res.render('creator_success', {title: 'Success'});
};



// Display Creator form on GET
exports.creator_create_get = function(req, res, next){
	res.render('creator_form', {title: 'Creator'});
}

// Handle Creator On POst
exports.creator_create_post = [
	//Validate fields
	body('username').isLength({min: 2}).trim().withMessage("Username is required"),
	body('email').isLength({min:3}).isEmail().trim().withMessage("Email is required"),
	//category
	body('title').isLength({min: 1}).trim().withMessage('Post Title is required'),


	//Sanitize fields
	body('username').escape(),
	body('email').escape(),
	//category
	body('title').escape(),

	//Process requests after validation and sanitization
	(req, res, next) => {
		//Get Validation errors
		const errors = validationResult(req);

		if(!errors.isEmpty()){
			//There are errors
			res.render('creator_form', {title: 'Creator', creator: req.body, errors: errors.array()});
			return;
		}
		else{
			//Data form is valid

			//Create a Creator Object
			var creator = new Creator({
				username: req.body.username,
				email: req.body.email,
				category: req.body.category,
				title: req.body.title
			});
			creator.save(function(err){
				if(err){return next(err);}
				//Success so redirect
				//res.redirect(creator.url);
				res.render('creator_success', {title: 'Success!'});
			});
		}
	}


];