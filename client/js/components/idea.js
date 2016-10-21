var React = require('react');

var Idea = React.createClass({
	handleUpVote: function(){
		this.props.handleUpVote(this.props.ideaTitle);
	},
	render: function(){
	return (
		<div className="Idea wrapper">
			<h3>{this.props.ideaTitle}</h3>
			<div className='voteCount'>
                <a onClick={this.handleUpVote}>
                  <i className='fa fa-caret-up fa-3x'></i>
                </a>
                <p><b>{this.props.votes}</b></p>
              </div>
		</div>
	);
}});

module.exports = Idea;