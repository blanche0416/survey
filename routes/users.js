//File name: user.js
//Author's name: Pui In Kwok, Mo Zou, Yang Li 
//Web site name: final project
//File description: router for edit user info page.

//import require material
var express = require('express');
var passport = require('passport');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/user');

//utility functin to check if user is authenticatd
function requireAuth(req, res, next){

  // check if the user is login
  if(!req.isAuthenticated()){
    res.redirect('/login');
  }
  next();
}

//render user list page
router.get('/', requireAuth, function (req, res, next) {
    User.find(function (err, user) {
        //if any err, console the it
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.render('user/index', {
                title: 'Edit User Info',
                user: user,
                username: req.user ? req.user.username : ''            
        });
        }
    });
});

//render edit user info page
router.get('/:id', requireAuth, function (req, res, next) {
    //create id
    var id = req.params.id;
    User.findById(id, function (err, user) {
        //if any err, console it
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.render('user/edit', {
                title: 'Edit User Info',
                user: user,
                username: req.user ? req.user.username : ''       
            });
        };
    });
});

//process update form submission
router.post('/:id', requireAuth, function (req, res, next) {
    var id = req.params.id;
    var user = new User(req.body);
    user.password = user.generateHash(user.password);
    user._id = id;
    user.updated = Date.now();

    User.update({ _id: id }, user, function (err) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.redirect('/survey');
        }
    });
});

//make it public
module.exports = router;
