var mongoose = require('mongoose');


var Schema = mongoose.Schema;

var DonationSchema = new Schema({
	username: {type: String, required: true, maxlength: 30},
	recipient: {type: String, maxlength: 30, required: true},
	title: {type: String, required: true, maxlength: 30},
	category: {type: String, required: true, maxlength: 30},
	currency: {type: String, required: true},
	amount: {type: Number, required: true}
	
});

//Create a url for Donations
DonationSchema
.virtual('url')
.get(function(){
	return '/content/donation/' + this._id;
});


//export model
module.exports = mongoose.model('Donation', DonationSchema);


