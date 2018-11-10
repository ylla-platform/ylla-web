// Import React Stuff
import React from 'react';

// Import Material UI stuff
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import { withStyles } from '@material-ui/core/styles';

import LocationOnIcon from '@material-ui/icons/LocationOn';

// Styles
const styles = theme => ({
	dialog: {
		width: 800,
		height: 600,
		margin: 'auto',
		marginTop: 150,
		backgroundColor: 'rgba(0, 0, 0, 0)'
	},
	landingImage: {
		borderBottom: '10px solid #FBEA22'
	},
	button: {
		backgroundColor: '#FBEA22',
		marginLeft: 300
	}
});

// Class: LandingDesktop. A modal dialog to show to users on first entering site.
class LandingDesktop extends React.Component {

	// constructor:
	constructor(props) {
		super(props);
		this.state = {
			// Dialog
			open: this.props.open,
		};
	}

	// componentWillReceiveProps: set the provider on receiving a state update from the parent
	componentWillReceiveProps = (nextProps) => {
		this.setState({
			open: nextProps.open
		});
	}

	// render: 
	render() {
		const { classes } = this.props;
		return (
			<div>
				<Modal
					open={this.state.open}
					disableAutoFocus={true}
					className={classes.dialog}
					BackdropProps={{ invisible: true }}
					onClose={() => this.props.close()}
				>
					<div>
						<img alt="Landing Options" src={'./landing-desktop.png'} usemap="#image-map" className={classes.landingImage} />
						<map name="image-map">
							<area title="Close" href="#" shape="rect" coords="761,11,785,37" target="" alt="Close" onClick={(e) => { e.preventDefault(); this.props.close() }} />
							<area title="Book a Professional" href="#" shape="rect" coords="18,50,391,263" target="" alt="Book a Professional" onClick={(e) => { e.preventDefault(); this.props.launchRequestProcess('findapro', 'Find A Pro') }} />
							<area title="Hire a Runner" href="#" shape="rect" coords="409,49,783,263" target="" alt="Hire a Runner" onClick={(e) => { e.preventDefault(); this.props.hireRunner() }} />
							<area title="Book a Service" href="#" shape="rect" coords="18,281,259,495" target="" alt="Book a Service" onClick={(e) => { e.preventDefault(); this.props.launchRequestProcess('book', 'Book') }} />
							<area title="Reserve" href="#" shape="rect" coords="277,282,521,497" target="" alt="Reserve" onClick={(e) => { e.preventDefault(); this.props.launchRequestProcess('reserve', 'Reserve') }} />
							<area title="Order Food" href="#" shape="rect" coords="538,282,784,494" target="" alt="Order Food" onClick={(e) => { e.preventDefault(); this.props.launchRequestProcess('order', 'Order Food') }} />
						</map>
						<Button className={classes.button} onClick={() => this.props.close()}>Explore Map <LocationOnIcon /></Button>
					</div>
				</Modal>
			</div>
		);
	}
}

LandingDesktop.propTypes = {
};

export default withStyles(styles)(LandingDesktop);