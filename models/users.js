var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var userSchema = new Schema({
	user:      { type: String, required: true, unique: true },
	name:      { type: String, required: true },
	last_name: { type: String, required: true },
	email:     { type: String, required: true, unique: true },
	company:   { type: String },
	phone:     { type: String },
	latitude:  { type: String },
	longitude: { type: String }
});


var User = mongoose.model('user', userSchema);

User.findAll = function(callback){
	this.find(function(err, users){
		if(err)
			callback(err, null);
		else
			callback(err, users);
	});
};

User.findByEmail = function(_email, callback){
	this.findOne({email: _email}, function(err, user){
		if(err)
			callback(err, null);
		else
			callback(err, user);
	});
};

User.newUser = function(_users, callback){
	var user = new User(_users);

    user.save(function(err, data) {
		if(err)
			callback(err, null);
		else
			callback(err, data);
    });
};

User.updateUser = function(_email, _users, callback){

	this.update({email: _email}, _users, {multi: false}, function (err, count) {
		if(err)
			callback(err, null);
		else
			callback(err, count);
	});
};

User.removeUser = function(_email, callback){
	this.remove({email: _email}, function (err, count) {
		if(err)
			callback(err, null);
		else
			callback(err, count);
	});

};

module.exports = User;