//define our local strategy
var LocalStrategy = require('passport-local').Strategy;

//import the User Model
var User = require('../models/user');

//pass in reference to passport from app.js
module.exports = function(passport) {
	
	//serialize user
	passport.serializeUser(function(user, done) {
		done(null, user);
	});
	
	//deserialize user
	passport.deserializeUser(function(id, done) {
		User.findById(id, function(err, user) {
			done(err, user);
		});
	});
	
	//Configure login local strategy, check if the username and password is exist and correct.
	passport.use('local-login', new LocalStrategy({
		passReqToCallback:true
	},
	function(req, username, password, done) {
		
		//asynchronous process
		process.nextTick(function() {
			User.findOne({
				'username': username
			}, function(err, user) {
				if(err) {
					return done(err);
				}
				
				//if username is not exist
				if(!user) {
					return done(null, false, req.flash('loginMessage','Incorrect Username'));
				}
				
				//if password is incorrect
				if(!user.validPassword(password)) {
					return done(null, false, req.flash('loginMessage','Incorrect Password'));
				}
				
				//if username and password is exist and correct then proceed with login
				return done(null, user);
			});
		});
	}));
	
	//Configure registration local strategy, check if username is already exist, else create the user
	passport.use('local-registration', new LocalStrategy({
		passReqToCallback: true
	},
	function(req, username, password, done) {
		
		//asynchronous process
		process.nextTick(function(){
			//if the user is not login
			if(!req.user) {
				User.findOne({
					'username': username
				},
				//if any errors
				function(err, user) {
					if(err) {
						return done(err);
					}
					
					//check if username is already exist
					if(user) {
						return done(null, false, req.flash('registerMessage','The username is already in use.'));
					}
					else {
						//create the user with user info
						var newUser = new User(req.body);
						newUser.password = newUser.generateHash(newUser.password);
						newUser.created = Date.now();
						newUser.save(function(err) {
							if(err) {
								throw err;
							}
							return done(null, newUser);
						});
					}
				});
			} else {
				//if username is not exist, then proceed with register
				return done(null, req.user);
			}
		});
	}));
}