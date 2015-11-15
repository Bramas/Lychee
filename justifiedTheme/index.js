
var $ = require('jquery');
window.$ = window.jQuery = $;
window.loadingBar = $('#loadingBar');
window.lychee = {};

var JustifiedGallery = require('justifiedGallery');


var React = require('react');
var ReactDom = require('react-dom');

var api = require('./api');
var Albums = require('./components/albums');
var Album = require('./components/album');

/*
api.post('Album::getAll', {}, function(data) {
	ReactDom.render(<Albums albums={data.albums} />, document.getElementById('main-container'))
});*/
var params = {
	albumID: 1,
	password: null
}
api.post('Album::get', params, function(data) {
	photos = Object.keys(data.content).map(function (key) {return data.content[key]});
	console.log(photos);
	ReactDom.render(<Album photos={photos} />, document.getElementById('main-container'))
});