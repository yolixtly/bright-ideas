var mongoose = require('mongoose');

var BoardSchema = new mongoose.Schema({
	title: {type: String, require: true}
});

var Board = mongoose.model('Board', BoardSchema);

module.exports = Board;
