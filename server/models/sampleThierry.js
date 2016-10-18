'use strict';
var mongoose = require('mongoose'); 
var relationship = require('mongoose-relationship');

var postSchema = new mongoose.Schema({ 
	message: { type: String, required: true }, 
	_user: { type: mongoose.Schema.ObjectId, ref: 'User', 
		childPath: 'posts', required: true } 
	}); 

postSchema.plugin(relationship, { relationshipPathName: '_user' });
module.exports = mongoose.model('Post', postSchema);