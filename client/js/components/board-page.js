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
	sortedIdeas(){
		var self = this;
		var unSortedList = this.props.BoardIdeas;

		console.log('unSortedList', unSortedList);
		var sortedList = unSortedList.sort((ideaA, ideaB) => {
      		return ideaB.voteCount - ideaA.voteCount;
    	});
    	console.log("sortedList", sortedList);

    	var ideaList = this.props.BoardIdeas.map(function(idea, index){
			return (
				<Idea key={index} votes={idea.voteCount} ideaTitle={idea.ideaTitle} handleUpVote={self.handleUpVote}/>
			)
		});
		return ideaList;
	},
	render: function(){
		return (
			<div className="BoardPage wrapper">
				<h1>{this.props.BoardTitle}</h1>
				<hr />
				{this.sortedIdeas()}
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