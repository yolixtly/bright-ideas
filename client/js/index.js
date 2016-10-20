// require("babel-polyfill");
var React = require('react');
var ReactDOM = require('react-dom');
//React-Redux 
// var connect = require('react-redux').connect;
// var store = require('./client/js/store');
// var Provider = require('react-redux').Provider;
// var actions = require('./client/js/actions');

//React-Route
// var router = require('react-router');
// var Router = router.Router;
// var Route = router.Route;
// var IndexRoute = router.IndexRoute;
// var hashHistory = router.hashHistory;
// var Link = router.Link;

//components
// var LandingPage = require('./components/l
// anding-page.js');

console.log(`Client running in ${process.env.NODE_ENV} mode`);


var HelloWorld = React.createClass({render: function(){return(<h1>hi</h1>)}});

document.addEventListener('DOMContentLoaded', function() {
    ReactDOM.render(<HelloWorld />, document.getElementById('app'));
});

