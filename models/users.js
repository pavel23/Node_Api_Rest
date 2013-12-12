var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var userSchema = new Schema({
	user:      { type: String },
	name:      { type: String },
	last_name: { type: String },
	email:     { type: String },
	company:   { type: String },
	phone:     { type: String },
	latitude:  { type: String },
	longitude: { type: String }
});


module.exports = mongoose.model('user', userSchema);