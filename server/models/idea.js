var mongoose = require('mongoose');

var IdeaSchema = new mongoose.Schema({
	_creator: {type: Number, ref: 'Board'},
	ideaTitle: {type: String, require: true},
	voteCount: {type: Number, require: true}
});

var Idea = mongoose.model('Idea', IdeaSchema);

module.exports = Idea;