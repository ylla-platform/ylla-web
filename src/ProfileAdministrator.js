// Import React
import PropTypes from 'prop-types';
import React, { Component } from 'react';

// Material UI includes
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

// Styles
const styles = theme => ({
	button: {
		margin: theme.spacing.unit,
	},
	input: {
		display: 'none',
	},
	formControl: {
		margin: theme.spacing.unit,
		minWidth: 120,
	},
	toolbar: theme.mixins.toolbar
});

// Class: ProfileAdministrator
class ProfileAdministrator extends Component {

	// constructor: call super, set up state, and handler bindings
	constructor(props) {
		super(props);
		this.state = {
			first_name: this.props.user.first_name,
			last_name: this.props.user.last_name
		};
	}

	// handleUploadLogo: 
	handleUploadAvatar = (e) => {
		let reader = new FileReader();
		let file = e.target.files[0];
		reader.onloadend = () => {
			this.setState({
				avatar: reader.result
			});
		}
		reader.readAsDataURL(file);
	}

	// handleEditUserClick:
	handleEditUserClick = () => {
		var user = this.props.user;
		user.first_name = this.state.first_name;
		user.last_name = this.state.last_name;
		this.props.editUser(user);
	}

	// render: render the component.
	render() {
		const { classes } = this.props;
		return (
			<div>
				<div className={classes.toolbar} />
				<Typography variant="headline" component="h4">Administrator Profile</Typography>
				<TextField
					id="txt-firstname"
					type="text"
					label="First name"
					value={this.state.first_name}
					margin="normal"
					className={this.props.classes.formControl}
					helperText="Your first name without title"
					onChange={(event) => this.setState({ first_name: event.target.value })}
				/>
				<TextField
					id="txt-lastname"
					type="text"
					label="Last name"
					value={this.state.last_name}
					margin="normal"
					className={this.props.classes.formControl}
					helperText="Your last name"
					onChange={(event) => this.setState({ last_name: event.target.value })}
				/>
				<br />
				<br />
				<Tooltip id="tooltip-icon" title="Check your fields and click to save profile details" placement="bottom">
					<Button   onClick={this.handleEditUserClick}>Save</Button>
				</Tooltip>
			</div>
		);
	}
}

// 
ProfileAdministrator.propTypes = {
	classes: PropTypes.shape.isRequired
};

export default withStyles(styles)(ProfileAdministrator);