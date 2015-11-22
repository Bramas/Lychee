
var $ = require('jquery');
window.$ = window.jQuery = $;
window.loadingBar = $('#loadingBar');
window.lychee = {};

var JustifiedGallery = require('justifiedGallery');


import React from 'react';
import ReactDom  from 'react-dom';

import api from './api';
import Albums from './components/albums';
import Album from './components/album';
import TreeTimeline from './components/tree-timeline';
import Layout from './components/layout';

/*
api.post('Album::getAll', {}, function(data) {
	ReactDom.render(<Albums albums={data.albums} />, document.getElementById('main-container'))
});*/


let photos = []
let timeline = {}



function handleTreeClick(node, toggled){
	var params = {
		year: node.name
	}
	api.post('Plugin::PhotosTimeline::getYear', params, function(data) {
		photos = Object.keys(data.content).map(function (key) {return data.content[key]});
		ReactDom.render(<Layout 
			leftPane={<TreeTimeline data={timeline} onToggle={handleTreeClick}/>}
			mainPane={<Album photos={photos} />} />, document.getElementById('main-container'))
	});

}

api.post('Plugin::PhotosTimeline::getDates', {}, function(data) {
	timeline = data;
	ReactDom.render(<Layout 
		leftPane={<TreeTimeline data={timeline} onToggle={handleTreeClick}/>}
		mainPane={<Album photos={photos} />} />, document.getElementById('main-container'))
});