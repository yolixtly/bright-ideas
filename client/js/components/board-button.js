var React = require('react');

var ButtonBoard = React.createClass({
	render: function(){
	return (
		<div className="ButtonBoard wrapper">
			<a href="/#/BoardPage"><button type='submit' onClick={this.props.boardClick} className="btn btn-success boardbtn">{this.props.value}</button></a>
		</div>
	);
}});

module.exports = ButtonBoard;