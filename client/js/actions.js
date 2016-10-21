require('isomorphic-fetch');

var FETCH_ALL_TITLES_SUCCESS = 'FETCH_ALL_TITLES_SUCCESS';
var FETCH_ALL_TITLES_ERROR = 'FETCH_ALL_TITLES_ERROR';
var ADD_NEW_IDEA_SUCCESS = 'ADD_NEW_IDEA_SUCCESS';
var ADD_NEW_IDEA_ERROR = 'ADD_NEW_IDEA_ERROR';

/*FETCH ALL TITLES ACTIONS */
var fetchAllTitlesSuccess = function(titles){
	return {
		type: FETCH_ALL_TITLES_SUCCESS,
		data: titles
	};
};
var fetchAllTitlesError = function(error){
	return {
		type: FETCH_ALL_TITLES_ERROR,
		data: error
	};
};

var fetchAllTitles = function(){
	return function(dispatch){
		
		var url = 'http://localhost:8080/api/boardTitles';

		return fetch(url).then(function(response){
			if(response.status < 200 || response.status >= 300){
				var error = new Error(response.statusText);
				error.response = response;
				throw error;
			}
			return response.json();
		})
		.then(function(titles){
			return dispatch(
				fetchAllTitlesSuccess(titles)
			);
		})
		.catch(function(error){
			return dispatch(
				fetchAllTitlesError(error)
			);
		});
	}
};

/* ADD A NEW IDEA ACTIONS */

var addNewIdeaSuccess = function(titles){
	return {
		type: ADD_NEW_IDEA_SUCCESS,
		data: titles
	};
};
var addNewIdeaError = function(error){
	return {
		type: ADD_NEW_IDEA_ERROR,
		data: error
	};
};

var addNewIdea = function(newIdea, boardTitle){
	return function(dispatch){
		var url = 'http://localhost:8080/api/:boardTitle/newIdea';
		return fetch(url, {
			method: 'post',
			headers: {
				"Content-type": "application/json"
			},
			body: JSON.stringify({ideaTitle: newIdea})

		}).then(function(response){
			if(response.status < 200 || response.status >= 300){
				var error = new Error(response.statusText);
				error.response = response;
				throw error;
			}
			return response.json();
		})
		.then(function(fullBoard){
			console.log("new Idea response received in Actions", fullBoard);
			return dispatch(
				addNewIdeaSuccess(fullBoard)
			);
		})
		.catch(function(error){
			return dispatch(
				addNewIdeaError(error)
			);
		});
	};
};



exports.fetchAllTitles = fetchAllTitles;
exports.FETCH_ALL_TITLES_SUCCESS = FETCH_ALL_TITLES_SUCCESS;
exports.fetchAllTitlesSuccess = fetchAllTitlesSuccess;
exports.FETCH_ALL_TITLES_ERROR = FETCH_ALL_TITLES_ERROR;
exports.fetchAllTitlesError = fetchAllTitlesError;
