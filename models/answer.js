//import mongoose and bcrypt
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

//need an allas for mongoose.Schema
var Schema = mongoose.Schema;

//define contact Schema
var AnswerSchema = new Schema({
	answer_id: Number,
	survey_id: Number,
	survey_questionOneAns: String,
	survey_questionTwoAns: String
}, {
	collection: 'answerInfo'
});
//make it public
module.exports = mongoose.model('Answer', AnswerSchema);