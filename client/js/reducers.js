var actions = require('./actions');
var update = require('react-addons-update');

var initialState = {
	boardTitles: []
};

var reducer = function(state, action){
	state = state || initialState;
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
	return state;
};

module.exports = reducer;