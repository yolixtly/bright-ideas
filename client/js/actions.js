require('isomorphic-fetch');

var FETCH_ALL_TITLES_SUCCESS = 'FETCH_ALL_TITLES_SUCCESS';
var FETCH_ALL_TITLES_ERROR = 'FETCH_ALL_TITLES_ERROR';

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
			console.log("fetchTitles Success in Actions: ", titles);
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



exports.fetchAllTitles = fetchAllTitles;
exports.FETCH_ALL_TITLES_SUCCESS = FETCH_ALL_TITLES_SUCCESS;
exports.fetchAllTitlesSuccess = fetchAllTitlesSuccess;
exports.FETCH_ALL_TITLES_ERROR = FETCH_ALL_TITLES_ERROR;
exports.fetchAllTitlesError = fetchAllTitlesError;
