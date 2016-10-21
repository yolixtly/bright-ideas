var actions = require('./actions');

var initialState = {
	test : "hello From reducer!"
};

var reducer = function(state, action){
	return {
		test: 'Hey there!'
	}
};

module.exports = reducer;