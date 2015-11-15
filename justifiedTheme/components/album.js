

var React = require('react');
var ReactDOM = require('react-dom');

module.exports = React.createClass({
	renderPhoto: function(photo) {
		console.log(photo);
		return <div key={photo.id} className="jg-entry" title={photo.title}>
					<img src={photo.prettyThumbUrl} />
				</div>
	},

	componentDidUpdate: function() {
		$(ReactDOM.findDOMNode(this)).justifiedGallery();
	},
	componentDidMount: function() {
		this.componentDidUpdate();
	},

	render: function() {
		return <div>{this.props.photos.map(this.renderPhoto)}</div>;
	}
})