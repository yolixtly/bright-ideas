var React = require('react');
var ReactDOM = require('react-dom');
var connect = require('react-redux').connect;
var actions = require('../actions');
var Form = require('./form.js');
// var ButtonBoard = require('./board-button.js');


var LandingPage = React.createClass({
	componentWillMount: function(){
		this.props.dispatch(actions.fetchAllTitles());
		
	},
	onTodoSubmit: function(newIdea, selectedBoard){
		console.log('New Idea is: ', newIdea);
		console.log('Selected Board where New Idea will be stored: ', selectedBoard)
	},
	render: function(){
		return (
			<div className="LandingPage wrapper">
			<h1>Bright Ideas</h1>
				<Form onTodoSubmit={this.onTodoSubmit} />
			<hr />
			<h3>Popular Boards</h3>

			</div>
		);
	}
});

var mapStateToProps = function(state, props){
	return {

	}
};

var Container = connect(mapStateToProps)(LandingPage);

module.exports = Container;