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
  else{
      res.redirect('/survey');
  }
  next();
}

//render user list page
router.get('/', requireAuth, function (req, res, next) {
    User.find(function (err, users) {
        //if any err, console the it
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.render('user/index', {
                title: 'User List',
                users: users,
                username: req.user ? req.user.username : '',
       
        });
        }
    });
});

//delete selected user
router.get('/delete/:id', requireAuth, function (req, res, next) {
    var id = req.params.id;
    User.remove({ _id: id }, function (err) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.redirect('/users');
        }
    });
});

//make it public
module.exports = router;
