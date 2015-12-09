//import require material
var express = require('express');
var passport = require('passport');
var router = express.Router();


//render home page and define username
router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'Survey Cans',
        username: req.user ? req.user.username : ''
     
    });
});

//render login page
router.get('/login', function (req, res, next) {
    //if user is not login, show login message, and define title and username
    if (!req.user) {
        res.render('login', {
            title: 'Login',
            messages: req.flash('loginMessage'),
            username: req.user ? req.user.username : ''
  
        });
    }
    //else redirect to dashboard page
    else {
        return res.redirect('/survey');
    }
});

//execute the login Request
router.post('/login', passport.authenticate('local-login', {
    //success then go to dashboard page or fail then go to login page
    successRedirect: '/survey',
    failureRedirect: '/login',
    failureFlash: true
}));

//render registration page
router.get('/register', function (req, res, next) {
    //if user is not login, show register message, and define title and username
    if (!req.user) {
        res.render('register', {
            title: 'Register',
            messages: req.flash('registerMessage'),
            username: req.user ? req.user.username : ''
   
        });
    }
    //else redirect to dashboard page
    else {
        return res.redirect('/survey');
    }
});

//post register data
router.post('/register', passport.authenticate('local-registration', {
    //success then go to dashboard page or fail then go to Signup page
    successRedirect : '/survey',
    failureRedirect : '/register',
    failureFlash : true
}));


//execute logout Request
router.get('/logout', function (req, res){
  //logout and redirect to login page
  req.logout();
  res.redirect('/login');
});

//make it public
module.exports = router;
