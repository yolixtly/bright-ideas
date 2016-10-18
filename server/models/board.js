var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Idea = require('./idea');



var BoardSchema = new mongoose.Schema({
	title: {type: String, require: true},
	ideas: [{type: Schema.Types.ObjectId, ref: 'Idea'}]
});

var Board = mongoose.model('Board', BoardSchema);

module.exports = Board;
