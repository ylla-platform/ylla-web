// Import React
import React, { Component } from 'react';

// Import Material UI
import { withStyles } from '@material-ui/core/styles';

// styles: 
const styles = theme => ({
	root: {
		width: '100%',
		height: '100%',
		zIndex: 100,
		overflowY: 'auto',
		margin: 5,
		padding: 10
	},
	content: {
		padding: 20,
		backgroundColor: 'rgba(255,255,255,0.8)'
	}
});

// Class: Audit
class Audit extends Component {

	// constructor
	// Sets the state
	constructor(props) {
		super(props);
		this.state = {

		};
	}
	// componentWillReceiveProps:
	componentWillReceiveProps(nextProps) {

	}
	// render
	render() {
		const { classes } = this.props;
		return (
			<div className={classes.root}>

			</div>
		);
	}
}

export default withStyles(styles, { withTheme: true })(Audit);