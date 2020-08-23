var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var CreatorSchema = new Schema({
	username: {type: String, required: true, maxlength: 30},
	email: {type: String, required: true, maxlength: 30},
	category: {type: String, required: true, maxlength: 30},
	title: {type: String, required: true, maxlength: 30},
	
});

//Virtual for Creator's URL
CreatorSchema
.virtual('url')
.get(function(){
	return '/content/creator/' + this._id;
});
// Creates a Unique url for the content creators


//Export model
module.exports = mongoose.model('Creator', CreatorSchema);