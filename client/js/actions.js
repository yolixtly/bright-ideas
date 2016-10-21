require('isomorphic-fetch');

var FETCH_ALL_TITLES_SUCCESS = 'FETCH_ALL_TITLES_SUCCESS';
var FETCH_ALL_TITLES_ERROR = 'FETCH_ALL_TITLES_ERROR';

var ADD_NEW_IDEA_SUCCESS = 'ADD_NEW_IDEA_SUCCESS';
var ADD_NEW_IDEA_ERROR = 'ADD_NEW_IDEA_ERROR';

var FETCH_A_BOARD_SUCCESS = 'FETCH_A_BOARD_SUCCESS';
var FETCH_A_BOARD_ERROR = 'FETCH_A_BOARD_ERROR';

var UPDATE_VOTECOUNT_IDEA_SUCCESS = 'UPDATE_VOTECOUNT_IDEA_SUCCESS';
var UPDATE_VOTECOUNT_IDEA_ERROR = 'UPDATE_VOTECOUNT_IDEA_ERROR';

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

/* FETCH A SPECIFIC BOARD ACTIONS */

var fetchABoardSuccess = function(bodyBoard){
	return {
		type: FETCH_A_BOARD_SUCCESS,
		data: bodyBoard
	};
};
var fetchABoardError = function(error){
	return {
		type: FETCH_A_BOARD_ERROR,
		data: error
	};
};

var fetchABoard = function(boardTitle){
	return function(dispatch){
		
		var url = 'http://localhost:8080/api/'+ boardTitle;

		return fetch(url).then(function(response){
			if(response.status < 200 || response.status >= 300){
				var error = new Error(response.statusText);
				error.response = response;
				throw error;
			}
			return response.json();
		})
		.then(function(bodyBoard){
			return dispatch(
				fetchABoardSuccess(bodyBoard)
			);
		})
		.catch(function(error){
			return dispatch(
				fetchABoardError(error)
			);
		});
	}
};


/* ADD A NEW IDEA ACTIONS */
var addNewIdeaSuccess = function(boardBody){
	return {
		type: ADD_NEW_IDEA_SUCCESS,
		data: boardBody
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
		var url = 'http://localhost:8080/api/'+ boardTitle +'/newIdea';
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

/* UPDATE THE VOTECOUNT OF AN IDEA ACTIONS */

var updateVoteCountSuccess = function(updatedIdea){
	console.log(updatedIdea);
	return {
		type: UPDATE_VOTECOUNT_IDEA_SUCCESS,
		data: updatedIdea
	};
};
var updateVoteCountError = function(error){
	return {
		type: UPDATE_VOTECOUNT_IDEA_ERROR,
		data: error
	};
};

var updateVoteCount = function(ideaTitle, boardTitle){
	console.log(ideaTitle, 'ideaTitle arrived at action');
	return function(dispatch){
		var url = 'http://localhost:8080/api/'+ boardTitle +'/voteCount/' + ideaTitle;
		return fetch(url, {
			method: 'put',
			 headers: {
		        "Content-type": "application/json"
		      }
		}).then(function(response){
			if(response.status < 200 || response.status >= 300){
				var error = new Error(response.statusText);
				error.response = response;
				throw error;
			}
			return response.json();
		})
		.then(function(updatedIdea){
			return dispatch(
				updateVoteCountSuccess(updatedIdea)
			);
		})
		.catch(function(error){
			return dispatch(
				updateVoteCountError(error)
			);
		});
	};
};





exports.fetchAllTitles = fetchAllTitles;
exports.FETCH_ALL_TITLES_SUCCESS = FETCH_ALL_TITLES_SUCCESS;
exports.fetchAllTitlesSuccess = fetchAllTitlesSuccess;
exports.FETCH_ALL_TITLES_ERROR = FETCH_ALL_TITLES_ERROR;
exports.fetchAllTitlesError = fetchAllTitlesError;

exports.addNewIdea = addNewIdea;
exports.ADD_NEW_IDEA_SUCCESS = ADD_NEW_IDEA_SUCCESS;
exports.addNewIdeaSuccess = addNewIdeaSuccess;
exports.ADD_NEW_IDEA_ERROR = ADD_NEW_IDEA_ERROR;
exports.addNewIdeaError = addNewIdeaError;

exports.fetchABoard = fetchABoard;
exports.FETCH_A_BOARD_SUCCESS = FETCH_A_BOARD_SUCCESS;
exports.fetchABoardSuccess = fetchABoardSuccess;
exports.FETCH_A_BOARD_ERROR = FETCH_A_BOARD_ERROR;
exports.fetchABoardError = fetchABoardError;

exports.updateVoteCount = updateVoteCount;
exports.UPDATE_VOTECOUNT_IDEA_SUCCESS = UPDATE_VOTECOUNT_IDEA_SUCCESS;
exports.updateVoteCountSuccess = updateVoteCountSuccess;
exports.UPDATE_VOTECOUNT_IDEA_ERROR = UPDATE_VOTECOUNT_IDEA_ERROR;
exports.updateVoteCountError = updateVoteCountError;


