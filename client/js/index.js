
console.log(`Client running in ${process.env.NODE_ENV} mode`);

require("babel-polyfill");
var React = require('react');
var ReactDOM = require('react-dom');

//React-Redux 
var connect = require('react-redux').connect;
var Provider = require('react-redux').Provider;
var store = require('./store');
var actions = require('./actions');

//React-Route
var router = require('react-router');
var Router = router.Router;
var Route = router.Route;
var IndexRoute = router.IndexRoute;
var hashHistory = router.hashHistory;
var Link = router.Link;


//Components: 
var LandingPage = require('./components/landing-page.js');
var BoardPage = require('./components/board-page.js');


var App = function(props) {
    return (
        <div className="container">
	       {props.children}
        </div>
    );
};

var routes = (
	<Provider store={store}>
    <Router history={hashHistory}>
    	<Route path="/" component={App}>
	        <IndexRoute component={LandingPage} />
          <Route path="/BoardPage" component={BoardPage} />
      </Route>
    </Router>
    </Provider>
);

document.addEventListener('DOMContentLoaded', function() {
    ReactDOM.render(routes, document.getElementById('app'));
});

