//import mongoose and bcrypt
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

//need an allas for mongoose.Schema
var Schema = mongoose.Schema;

//define contact Schema
var SurveySchema = new Schema({
	survey_id: Number,
	survey_title: String,
	survey_questionOne: String,
	survey_questionOne_template: String,
	survey_questionOneAnsA: String,
	survey_questionOneAnsB: String,
	survey_questionOneAnsC: String,
	survey_questionOneAnsD: String,
	survey_questionTwo: String,
	survey_questionTwo_template: String,
	survey_questionTwoAnsA: String,
	survey_questionTwoAnsB: String,
	survey_questionTwoAnsC: String,
	survey_questionTwoAnsD: String,
	username: String,
	status: String,
	created: Number,
	lifeTime: Number,
	closeAt: Number
}, {
	collection: 'surveyInfo'
});
//make it public
module.exports = mongoose.model('Survey', SurveySchema);