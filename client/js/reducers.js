var actions = require('./actions');
var update = require('react-addons-update');

var initialState = {
	boardTitles: []
};

var reducer = function(state, action){
	state = state || initialState;
	if(action.type === actions.FETCH_ALL_TITLES_SUCCESS){
		console.log("fetch titles reducer", action.data);
		var newState = update(state, {
			boardTitles: {$set : action.data}
		});
		console.log('newState', newState);
		return newState;
	}
	return state;
};

module.exports = reducer;