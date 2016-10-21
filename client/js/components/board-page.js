var React = require('react');
var ReactDOM = require('react-dom');
var connect = require('react-redux').connect;
var actions = require('../actions');
var Idea = require('./idea.js');

var BoardPage = React.createClass({
	handleUpVote(ideaTitle){
		var boardTitle = this.props.BoardTitle;
		this.props.dispatch(actions.updateVoteCount(ideaTitle, boardTitle));
		this.props.dispatch(actions.fetchABoard(boardTitle));
		
	},
	render: function(){
		var self = this;
		var ideaList = this.props.BoardIdeas.map(function(idea, index){
			return (
				<Idea key={index} votes={idea.voteCount} ideaTitle={idea.ideaTitle} handleUpVote={self.handleUpVote}/>
			)
		});
		return (
			<div className="BoardPage wrapper">
				<h1>{this.props.BoardTitle}</h1>
				<hr />
				{ideaList}
			</div>
		);
	}
});

var mapStateToProps = function(state, props){
	// console.log(state);
	return {
		BoardTitle: state.currentBoardTitle,
		BoardIdeas: state.currentBoardIdeas
	}
};

var Container = connect(mapStateToProps)(BoardPage);

module.exports = Container;