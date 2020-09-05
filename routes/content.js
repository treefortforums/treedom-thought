var express = require('express');
var router = express.Router();


//Require Controller Modules
var creator_controller = require('../controllers/creatorController');
var donation_controller = require('../controllers/donationController');

// Controller Routes

//GET Catalog Home Page
router.get('/', creator_controller.nav);

//Get request for create creator
router.get('/creator', creator_controller.creator_create_get);

//POST request for create creators
router.post('/creator', creator_controller.creator_create_post);


// GET request for one creators
/*
router.get('/creator/:id', creator_controller.creator_detail);
*/

router.get('/creator/:id', creator_controller.creator_detail);

//Success Page
router.get('/creator/success', creator_controller.creator_success);

//Get Request for list of all Creators
router.get('/creators', creator_controller.creator_list);


//GET Titles
/*
router.get('/creator/titles', creator_controller.creator_get_titles);
*/

/*
router.get('/creator/categories', creator_controller.creator_get_categories);
*/


// Donation Route

//GET Request for Donation
router.get('/donation', donation_controller.donation_create_get);

//POST request
router.post('/donation', donation_controller.donation_create_post);

//GET ID
router.get('/donation/:id', donation_controller.donation_detail);

//Donation Success
router.get('/donation/success', donation_controller.donation_success);

//GET requst for Donations
router.get('/donations', donation_controller.donation_list);



module.exports = router;