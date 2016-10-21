var actions = require('./actions');

var initialState = {
	boardtitles: []
};

var reducer = function(state, action){
	state = state || initialState;
	if(action.type === actions.FETCH_ALL_TITLES_SUCCESS){
		console.log(action);
	}
};

module.exports = reducer;