//File name: survey.js
//Author's name: Pui In Kwok, Mo Zou, Yang Li 
//Web site name: final project
//File description: router for active survey, view all survey, add survey page.

//import require material
var express = require('express');
var passport = require('passport');
var router = express.Router();
var mongoose = require('mongoose');
var Survey = require('../models/survey');
var Answer = require('../models/answer');
var User = require('../models/user');

//utility functin to check if user is authenticatd
function requireAuth(req, res, next){

  // check if the user is login
  if(!req.isAuthenticated()){
    res.redirect('/login');
  }
  next();
}

//render survey list page
router.get('/', function (req, res, next) {
    Survey.find(function (err, survey) {
        //if any err, console the it
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
        Answer.find(function (err, answer) {
            if (err) {
                console.log(err);
                res.end(err);
            }
            else {
                User.find(function (err, user) {
                    if (err) {
                        console.log(err);
                        res.end(err);
                    }
                    else{
                    res.render('survey/index', {
                        title: 'Active Survey List',       
                        survey: survey,      
                        answer: answer,
                        user: user,
                        username: req.user ? req.user.username : ''
                    })}
                });
            }
        });
        }
    });
});

//render view_all page
router.get('/view_all', function (req, res, next) {
    Survey.find(function (err, survey) {
        //if any err, console the it
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
        Answer.find(function (err, answer) {
            if (err) {
                console.log(err);
                res.end(err);
            }
            else {
                User.find(function (err, user) {
                    if (err) {
                        console.log(err);
                        res.end(err);
                    }
                    else{
                    res.render('survey/view_all', {
                        title: 'All Survey List',       
                        survey: survey,      
                        answer: answer,
                        user: user,
                        username: req.user ? req.user.username : ''
                    })}
                });
            }
        });
        }
    });
});

//render add new survey Page
router.get('/add', requireAuth, function (req, res, next) {
    User.find(function (err, user) {
    if (err) {
        console.log(err);
        res.end(err);
    }
    else{
        res.render('survey/add', {
            title: 'Add new survey here',
            user: user,
            username: req.user ? req.user.username : ''
        })}
    });
});

//process add new survey, depend on user choices
router.post('/add',  requireAuth, function (req, res, next) {
    var survey = new Survey(req.body);
    var time = Date.now();
    var addTime = req.body.lifeTime;
    if(req.body.survey_questionOne_template == "mc" && req.body.survey_questionTwo_template != "mc"){
        Survey.create({
            survey_id: Date.now(),
            survey_title: req.body.survey_title,
            survey_questionOne: req.body.survey_questionOne,
            survey_questionOne_template: req.body.survey_questionOne_template,
            survey_questionOneAnsA: req.body.survey_questionOneAnsA,
            survey_questionOneAnsB: req.body.survey_questionOneAnsB,
            survey_questionOneAnsC: req.body.survey_questionOneAnsC,
            survey_questionOneAnsD: req.body.survey_questionOneAnsD,
            survey_questionTwo: req.body.survey_questionTwo,
            survey_questionTwo_template: req.body.survey_questionTwo_template,
            username: req.user.username,
            status: 'Open',
            created: Date.now(),
            lifeTime: req.body.lifeTime,
            closeAt: Number(time) + Number(addTime)
        },function (err) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.redirect('/survey');
        }
    })}
    else if(req.body.survey_questionOne_template != "mc" && req.body.survey_questionTwo_template == "mc"){
        Survey.create({
            survey_id: Date.now(),
            survey_title: req.body.survey_title,
            survey_questionOne: req.body.survey_questionOne,
            survey_questionOne_template: req.body.survey_questionOne_template,
            survey_questionTwo: req.body.survey_questionTwo,
            survey_questionTwo_template: req.body.survey_questionTwo_template,
            survey_questionTwoAnsA: req.body.survey_questionTwoAnsA,
            survey_questionTwoAnsB: req.body.survey_questionTwoAnsB,
            survey_questionTwoAnsC: req.body.survey_questionTwoAnsC,
            survey_questionTwoAnsD: req.body.survey_questionTwoAnsD,
            username: req.user.username,
            status: 'Open',
            created: Date.now(),
            lifeTime: req.body.lifeTime,
            closeAt: Number(time) + Number(addTime)
        },function (err) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.redirect('/survey');
        }
    })}
    else if(req.body.survey_questionOne_template == "mc" && req.body.survey_questionTwo_template == "mc"){
        Survey.create({
            survey_id: Date.now(),
            survey_title: req.body.survey_title,
            survey_questionOne: req.body.survey_questionOne,
            survey_questionOne_template: req.body.survey_questionOne_template,
            survey_questionOneAnsA: req.body.survey_questionOneAnsA,
            survey_questionOneAnsB: req.body.survey_questionOneAnsB,
            survey_questionOneAnsC: req.body.survey_questionOneAnsC,
            survey_questionOneAnsD: req.body.survey_questionOneAnsD,
            survey_questionTwo: req.body.survey_questionTwo,
            survey_questionTwo_template: req.body.survey_questionTwo_template,
            survey_questionTwoAnsA: req.body.survey_questionTwoAnsA,
            survey_questionTwoAnsB: req.body.survey_questionTwoAnsB,
            survey_questionTwoAnsC: req.body.survey_questionTwoAnsC,
            survey_questionTwoAnsD: req.body.survey_questionTwoAnsD,
            username: req.user.username,
            status: 'Open',
            created: Date.now(),
            lifeTime: req.body.lifeTime,
            closeAt: Number(time) + Number(addTime)
        },function (err) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.redirect('/survey');
        }
    })}
    else{
        Survey.create({
            survey_id: Date.now(),
            survey_title: req.body.survey_title,
            survey_questionOne: req.body.survey_questionOne,
            survey_questionOne_template: req.body.survey_questionOne_template,
            survey_questionTwo: req.body.survey_questionTwo,
            survey_questionTwo_template: req.body.survey_questionTwo_template,
            username: req.user.username,
            status: 'Open',
            created: Date.now(),
            lifeTime: req.body.lifeTime,
            closeAt: Number(time) + Number(addTime)
        },function (err) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.redirect('/survey');
        }
    })}
});

//render detail Page
router.get('/:id',  function (req, res, next) {
    //create id
    var id = req.params.id;
    Survey.findById(id, function (err, survey) {
        //if any err, console it
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            Answer.find(function (err, answer) {
                if (err) {
                    console.log(err);
                    res.end(err);
                    }
                else {
                    User.find(function (err, user) {
                        res.render('survey/detail', {
                            title: 'Survey detail',
                            survey: survey,
                            answer: answer,
                            user: user,
                            username: req.user ? req.user.username : ''   
                        })  
                    })
                }
            })
        }
    });
});

//process the answer form submission
router.post('/:id', function (req, res, next) {
    var id = req.params.id;
    var answer = new Answer(req.body); 
    answer._id = id;
    
    Answer.create({
        answer_id: Date.now(),
        survey_id: req.body.survey_id,
        survey_questionOneAns: req.body.survey_questionOneAns,
        survey_questionTwoAns: req.body.survey_questionTwoAns
    },function (err) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.redirect('/survey');
        }
    })
});

//make it public
module.exports = router;