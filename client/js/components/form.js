var React = require('react');

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
	return (
		<div className="Form wrapper">
			<form onSubmit={this.onFormSubmit} className='input-group'>
				<input placeholder='the best of...'
				className="form-control" ref="theInput" />
				<select ref="saveOnBoard">
					<option value="Asian Countries">Asian Countries</option>
					<option value="Healthy Food">Healthy Food</option>
					<option value="States of America">States of America</option>
				</select>
				<span className="input-group-btn">
					<button type='submit' className="btn btn-success">Share your Idea!</button>
				</span>
			</form>
		</div>
	);
}});

module.exports = Form;