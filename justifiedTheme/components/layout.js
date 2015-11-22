	
import React from 'react';
import SplitPane from 'react-split-pane';

class Layout extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Layout';
    }
    render() {
        return <SplitPane split="horizontal" minSize="50" defaultSize="50">
	        <div>{this.props.headPane}</div>
	        <SplitPane split="vertical" minSize="100" defaultSize="300">
	            <div>{this.props.leftPane}</div>
	            <div>{this.props.mainPane}</div>
	        </SplitPane>
	    </SplitPane>;
    }
}

export default Layout;
	