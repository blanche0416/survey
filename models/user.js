//import mongoose and bcrypt
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

//need an allas for mongoose.Schema
var Schema = mongoose.Schema;

//define user Schema
var UserSchema = new Schema({
	username: String,
	password: String,
	email: String,
	salt: String,
	created: Number
}, {
	collection: 'userInfo'
});

//generate a Hash for password
UserSchema.methods.generateHash = function(password){
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

//check if password is valid
UserSchema.methods.validPassword = function(password){
	return bcrypt.compareSync(password, this.password);
}

//make it public
module.exports = mongoose.model('User', UserSchema);