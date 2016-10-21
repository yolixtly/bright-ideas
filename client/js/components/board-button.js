var React = require('react');

var ButtonBoard = React.createClass({
	render: function(){
	return (
		<div className="ButtonBoard wrapper">
			<button type='submit' className="btn btn-success boardbtn"><a href="#">{this.props.value}</a></button>
		</div>
	);
}});

module.exports = ButtonBoard;