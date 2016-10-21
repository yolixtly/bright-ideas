var React = require('react');
var ReactDOM = require('react-dom');
var connect = require('react-redux').connect;
var actions = require('../actions');
var Form = require('./form.js');
var ButtonBoard = require('./board-button.js');

var LandingPage = React.createClass({
	componentWillMount: function(){
		this.props.dispatch(actions.fetchAllTitles());
	},
	contextTypes: {
		router: React.PropTypes.object.isRequired
	},
	onTodoSubmit: function(newIdea, selectedBoard){
		console.log('New Idea is: ', newIdea);
		console.log('Selected Board where New Idea will be stored: ', selectedBoard);
		this.props.dispatch(actions.addNewIdea(newIdea, selectedBoard));
		//using window.location is not the best practice, instead use the context.router
		// window.location = '/#/BoardPage'; 
		this.context.router.push('/BoardPage');
	},
	render: function(){
		var buttonBoards = this.props.boardTitles.map(function(titles, index){
			return(
				<ButtonBoard key={index} value={titles} />
			)
		});
		return (
			<div className="LandingPage wrapper">
			<h1>Bright Ideas</h1>
				<Form onTodoSubmit={this.onTodoSubmit} boardTitles={this.props.boardTitles} />
			<hr />
			<h3>Popular Boards</h3>
				{buttonBoards}
			</div>
		);
	}
});

var mapStateToProps = function(state, props){
	// console.log(state, 'state');
	return {
		boardTitles: state.boardTitles
	}
};

var Container = connect(mapStateToProps)(LandingPage);

module.exports = Container;