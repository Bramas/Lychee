	
import React from 'react';
import SplitPane from 'react-split-pane';
import LeftPane from './left-pane';

class Layout extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Layout';
    }
    render() {
    	console.log(this.props);
        return <SplitPane split="horizontal" minSize="50" defaultSize="50">
	        <div></div>
	        <SplitPane split="vertical" minSize="100" defaultSize="300">
	            <div><LeftPane/></div>
	            <div>{this.props.children}</div>
	        </SplitPane>
	    </SplitPane>;
    }
}

export default Layout;
	