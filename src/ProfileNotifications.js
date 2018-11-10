// Import React
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Material UI includes
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import ListSubheader from '@material-ui/core/ListSubheader';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';

// Styles
const styles = theme => ({
	root: {
		width: '100%',
		height: '100%',
		maxWidth: 380,
		zIndex: 3,
		position: 'relative',
		margin: 5,
		overflowY: 'auto'
	},
	content: {
		padding: 10,
		backgroundColor: '#F9F9F9',
		border: '1px solid #ccc'
	}
});

// Class: ProfileNotifications
class ProfileNotifications extends Component {
	// constructor: call super, set up state, and handler bindings
	constructor(props) {
		super(props);
		this.state = {
			notification_orderstatus: (this.props.user.notification_orderstatus ? this.props.user.notification_orderstatus : true),
		};
	}
	// handleEditUserClick: 
	handleEditUserClick = () => {
		let user = this.props.user;
		user.notification_orderstatus = this.state.notification_orderstatus;
		this.props.editUser(user);
	}
	// render: 
	render() {
		const { classes } = this.props;
		return (
			<div className={classes.root}>
				<Paper className={classes.content}>
					<ListSubheader>Notifications</ListSubheader>
					<Divider/>
					<FormControl component="fieldset">
						<FormGroup>
							<FormControlLabel
								control={
									<Checkbox
										checked={this.state.notification_orderstatus}
										onChange={(event, checked) => this.setState({ notification_orderstatus: checked })}
										value="notification_orderstatus"
									/>
								}
								label="Order status updates"
							/>
						</FormGroup>
					</FormControl>
					<br />
					<Divider />
					<Tooltip id="tooltip-icon" title="Check your fields and click to save profile details" placement="bottom">
						<Button fullWidth   onClick={this.handleEditUserClick}>Save</Button>
					</Tooltip>
				</Paper>
			</div >
		);
	}
}

// 
ProfileNotifications.propTypes = {
	classes: PropTypes.shape.isRequired
};

// 
export default withStyles(styles)(ProfileNotifications);