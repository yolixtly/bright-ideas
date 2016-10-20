var React = require('react');
// var Form = require('./form.js');
// var ButtonBoard = require('./board-button.js');


var LandingPage = React.createClass({
	onTodoSubmit: function(newIdea, selectedBoard){
		console.log('New Idea is: ', newIdea);
		console.log('Selected Board where New Idea will be stored: ', selectedBoard)
	},
	render: function(){
		return (
			<div className="LandingPage wrapper">
			<h1>Bright Ideas</h1>

			<hr />
			<h3>Popular Boards</h3>

			</div>
		);
	}
});

module.exports = LandingPage;