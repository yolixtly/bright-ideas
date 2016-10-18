var mongoose = require('mongoose');
var Board = require('./board');
var Schema = mongoose.Schema;


var IdeaSchema = new mongoose.Schema({
	_creator: {type: Schema.Types.ObjectId, ref: 'Board'},
	ideaTitle: {type: String, require: true},
	voteCount: {type: Number, require: true}
});

var Idea = mongoose.model('Idea', IdeaSchema);

module.exports = Idea;