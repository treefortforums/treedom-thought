var Donation = require('../models/donation');

var async = require('async');

const {body, validationResult} = require('express-validator');
//Display list of all Donators
exports.donation_list = function(req, res, next){
	
	Donation.find()
	.populate('donation')
	.sort([['username', 'ascending']])
	.exec(function(err, list_donations){
		if(err){return next(err);}
		//On Success
		res.render('donation_list', {title: 'Donations', donation_list: list_donations});
	})
};

exports.donation_detail = function(req, res, next){
	res.send('Donation Detail ' + req.params.id);
};

exports.donation_success = function(req, res, next){
    res.render('donation_success', {title: 'Success'});
}

exports.donation_create_get = function(req, res, next){
	res.render('donation_form', {title: "Donation"});
};


//Handle Donation on POST
exports.donation_create_post = [
    //change recipient reference to username



	//Validate fields
    body('username').isLength({min: 2}).trim().withMessage('Username is required'),
    body('recipient').isLength({min: 2}).trim().withMessage('Recipient name is required'),
    //category
    body('title').isLength({min: 2}).trim().withMessage('Need a Post title'),
    //currency
    body('amount').isInt().withMessage("Enter a Number"),
    
    body('username').escape(),
    body('recipient').escape(),
    body('title').escape(),

    //Process reqests after validation 
    (req, res, next) => {
    	//There are errors
    	const errors = validationResult(req);

    	if(!errors.isEmpty()){
    		//There are errors repopulate form
    		res.render('donation_form', {title: 'Donation', donation: req.body, errors: errors.array()});
    		return;
    	}
    	else{
    		//Data form is valid

    		//Create a Donation object
    		var donation = new Donation({
    			username: req.body.username,
    			recipient: req.body.recipient,
                title: req.body.title,
                category: req.body.category, 
                currency: req.body.currency,
    			amount: req.body.amount
    		});
            donation.save(function(err){
                if(err){return next(err);}
                // On Success
                //res.redirect(donation.url);
                res.render('donation_success', {title: 'Success! Thank you for your contribution'});
            });
    	}
    }
];




