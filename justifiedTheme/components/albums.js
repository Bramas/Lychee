

var React = require('react');
var ReactDOM = require('react-dom');

module.exports = React.createClass({
	renderAlbum: function(album) {
		console.log(album);
		return <div key={album.id} className="jg-entry" title={album.title}>
					<img src={album.thumbs[0]}/>
				</div>
	},

	componentDidUpdate: function() {
		$(ReactDOM.findDOMNode(this)).justifiedGallery();
	},
	componentDidMount: function() {
		this.componentDidUpdate();
	},

	render: function() {
		return <div>{this.props.albums.map(this.renderAlbum)}</div>;
	}
})