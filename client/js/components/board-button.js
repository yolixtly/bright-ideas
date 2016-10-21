var React = require('react');

var ButtonBoard = React.createClass({
	onButtonClick: function(){
		var boardTitle = this.props.value;
		this.props.boardClick(boardTitle);
	},
	render: function(){
	return (
		<div className="ButtonBoard wrapper">
			<button type='submit' onClick={this.onButtonClick} className="btn btn-success boardbtn">{this.props.value}</button>
		</div>
	);
}});

module.exports = ButtonBoard;