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
		this.props.dispatch(actions.addNewIdea(newIdea, selectedBoard));
		this.context.router.push('/BoardPage');
	},
	boardClick: function(boardTitle){
		this.props.dispatch(actions.fetchABoard(boardTitle));
		this.context.router.push('/BoardPage');
	},
	render: function(){
		var self = this;
		var buttonBoards = this.props.boardTitles.map(function(titles, index){
			return(
				<ButtonBoard key={index} value={titles} boardClick={self.boardClick}/>
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