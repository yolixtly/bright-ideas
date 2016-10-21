var React = require('react');
var ReactDOM = require('react-dom');
var connect = require('react-redux').connect;
var actions = require('../actions');
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
				{this.props.test2}
			</div>
		);
	}
});

var mapStateToProps = function(state, props){
	return {
		test : state.test,
		test2: state.test2
	}
};

var Container = connect(mapStateToProps)(BoardPage);

module.exports = Container;