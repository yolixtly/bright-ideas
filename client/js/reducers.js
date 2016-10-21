var actions = require('./actions');

var initialState = {
	test : "hello From reducer!",
	test2: "What up!"
};

var reducer = function(state, action){
	state = state || initialState;
	return {
		test: 'Hey there!',
		test2:  "What up!"
	}
};

module.exports = reducer;