var actions = require('./actions');
var update = require('react-addons-update');

var initialState = {
	boardTitles: [],
	currentBoardTitle: 'Example1',
	currentBoardIdeas: []
};

var reducer = function(state, action){
	state = state || initialState;

	/*Fetch Titles*/
	if(action.type === actions.FETCH_ALL_TITLES_SUCCESS){
		var newState = update(state, {
			boardTitles: {$set : action.data}
		});
		return newState;
	}
	if(action.type === actions.FETCH_ALL_TITLES_ERROR){
		return {
			error: action.error
		}
	}
	/*On Save new Idea, we get All the Board Contents to display next*/
	if(action.type === actions.ADD_NEW_IDEA_SUCCESS){
		var newState = update(state, {
			currentBoardTitle: {$set : action.data.title},
			currentBoardIdeas: {$set: action.data.ideas}
		});
		return newState;
	}
	if(action.type === actions.ADD_NEW_IDEA_ERROR){
		return {
			error: action.error
		}
	}
	return state;
};

module.exports = reducer;