var React = require('react');
var actions = require('../actions');
var connect = require('react-redux').connect;

var Form = React.createClass({
	onFormSubmit(event){
		event.preventDefault();
		//Grabs the values from the input and select on submit
		var newIdea = this.refs.theInput.value;
		var selectedBoard = this.refs.saveOnBoard.value;
		//Sends to parent Components the newIdea and selectedBoard Values
		this.props.onTodoSubmit(newIdea, selectedBoard);
		//Clears the value on Submit
		this.refs.theInput.value = '';
	},
	render: function(){
		var boardTitles = this.props.boardTitles.map(function(title, index){
			return (
				<option key={index} value={title}>{title}</option>
			)
		});
	return (
		<div className="Form wrapper">
			<form onSubmit={this.onFormSubmit} className='input-group'>
				<input placeholder='the best of...'
				className="form-control" ref="theInput" />
				<select ref="saveOnBoard">
					{boardTitles}
				</select>
				<span className="input-group-btn">
					<button type='submit' className="btn btn-success">Share your Idea!</button>
				</span>
			</form>
		</div>
	);
}});

module.exports = Form;