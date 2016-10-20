var React = require('react');
// var Idea = require('./idea.js');

var BoardPage = React.createClass({
	onTodoSubmit: function(newIdea, selectedBoard){
		console.log('New Idea is: ', newIdea);
		console.log('Selected Board where New Idea will be stored: ', selectedBoard)
	},
	render: function(){
		return (
			<div className="BoardPage wrapper">
				<h1>Board Page</h1>
			</div>
		);
	}
});

module.exports = BoardPage;