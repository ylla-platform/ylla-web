// Import React
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Material UI includes
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import ListSubheader from '@material-ui/core/ListSubheader';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';

// Styles
const styles = theme => ({
	root: {
		width: '100%',
		height: '100%',
		maxWidth: 380,
		zIndex: 100,
		position: 'relative',
		margin: 5,
		overflowY: 'auto'
	},
	content: {
		padding: 10,
		backgroundColor: '#F9F9F9',
		border: '1px solid #ccc'
	},
	textFieldRoot: {
		padding: 0,
		'label + &': {
			marginTop: theme.spacing.unit * 3,
		},
	},
	textFieldInput: {
		borderRadius: 4,
		backgroundColor: theme.palette.common.white,
		border: '1px solid #ced4da',
		fontSize: 16,
		padding: '10px 12px',
		width: 'calc(100% - 24px)',
		transition: theme.transitions.create(['border-color', 'box-shadow']),
		'&:focus': {
			borderColor: '#80bdff',
			boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
		}
	},
	textFieldFormLabel: {
		fontSize: 18,
	}
});

// Class: ProfileAccount
class ProfileAccount extends Component {

	// constructor: call super, set up state, and handler bindings
	constructor(props) {
		super(props);
		this.state = {
			first_name: this.props.user.first_name,
			last_name: this.props.user.last_name,
			email: this.props.user.email,
			phone: this.props.user.phone,
			date_of_birth: this.props.user.date_of_birth,
			date_of_birth_invalid: false,
			gender: (this.props.user.gender ? this.props.user.gender : ''),
			new_password_invalid: false,
			new_password: '',
			old_password: '',
		};
	}

	// handleDateOfBirthChange
	handleDateOfBirthChange = (event) => {
		this.setState({ date_of_birth: event.target.value });
		var birthday = new Date(event.target.value);
		var ageDifMs = Date.now() - birthday.getTime();
		var ageDate = new Date(ageDifMs); // miliseconds from epoch
		var age = Math.abs(ageDate.getUTCFullYear() - 1970);
		if (age > 9) this.setState({ date_of_birth_invalid: false });
		if (birthday > Date.now()) this.setState({ date_of_birth_invalid: true });
	}

	// handleEditUserClick:
	handleEditUserClick = () => {
		let user = this.props.user;
		user.first_name = this.state.first_name;
		user.last_name = this.state.last_name;
		user.email = this.state.email;
		user.phone = this.state.phone;
		user.date_of_birth = this.state.date_of_birth;
		user.gender = this.state.gender;
		this.props.editUser(user);
	}

	// handleUpdatePasswordClick: 
	handleUpdatePasswordClick = (event) => {
		// Validate new password
		let new_password = this.state.new_password;
		let old_password = this.state.old_password;
		if (new_password < 5 && new_password > 21) {
			this.setState({ password_invalid: false });
			return null;
		}
		this.setState({ old_password: '', new_password: '', new_password_invalid: false });
		this.props.updatePassword(old_password, new_password);
	}

	// render
	render() {
		const { classes } = this.props;
		return (
			<div className={classes.root}>
				<Paper className={classes.content}>
					<ListSubheader>Account</ListSubheader>
					<Divider />
					<TextField
						fullWidth
						id="txt-firstname"
						type="text"
						label="First name"
						value={this.state.first_name}
						margin="normal"
						onChange={(event) => this.setState({ first_name: event.target.value })}
						InputProps={{
							name: 'txt-firstname',
							id: 'txt-firstname',
							disableUnderline: true,
							classes: {
								root: classes.textFieldRoot,
								input: classes.textFieldInput,
							}
						}}
						InputLabelProps={{
							shrink: true,
							className: classes.textFieldFormLabel,
						}}
					/>
					<TextField
						fullWidth
						id="txt-lastname"
						type="text"
						label="Last name"
						value={this.state.last_name}
						margin="normal"
						onChange={(event) => this.setState({ last_name: event.target.value })}
						InputProps={{
							name: 'txt-lastname',
							id: 'txt-lastname',
							disableUnderline: true,
							classes: {
								root: classes.textFieldRoot,
								input: classes.textFieldInput,
							}
						}}
						InputLabelProps={{
							shrink: true,
							className: classes.textFieldFormLabel,
						}}
					/>
					{this.props.user.user_type === 'consumer' ? <TextField
						fullWidth
						select
						value={this.state.gender}
						label="Gender"
						margin="normal"
						onChange={(e) => this.setState({ gender: e.target.value })}
						InputProps={{
							name: 'sel-gender',
							id: 'sel-gender',
							disableUnderline: true,
							classes: {
								root: classes.textFieldRoot,
								input: classes.textFieldInput,
							}
						}}
						InputLabelProps={{
							shrink: true,
							className: classes.textFieldFormLabel,
						}}
					>
						<MenuItem value="male">Male</MenuItem>
						<MenuItem value="female">Female</MenuItem>
					</TextField> : null}
					<TextField
						fullWidth
						id="txt-date"
						label="Birthday"
						margin="normal"
						type="date"
						error={this.state.date_of_birth_invalid}
						InputProps={{
							name: 'txt-date',
							id: 'txt-date',
							disableUnderline: true,
							classes: {
								root: classes.textFieldRoot,
								input: classes.textFieldInput,
							}
						}}
						InputLabelProps={{
							shrink: true,
							className: classes.textFieldFormLabel,
						}}
						onChange={(event) => this.handleDateOfBirthChange(event)}
					/>
					<TextField
						fullWidth
						id="txt-phone"
						label="Phone"
						margin="normal"
						type="text"
						InputProps={{
							name: 'txt-phone',
							id: 'txt-phone',
							disableUnderline: true,
							classes: {
								root: classes.textFieldRoot,
								input: classes.textFieldInput,
							}
						}}
						InputLabelProps={{
							shrink: true,
							className: classes.textFieldFormLabel,
						}}
						onChange={(event) => this.setState({ phone: event.target.value })}
					/>
					<TextField
						fullWidth
						id="txt-email"
						type="text"
						label="Email"
						value={this.state.email}
						margin="normal"
						InputProps={{
							name: 'txt-email',
							id: 'txt-email',
							disableUnderline: true,
							classes: {
								root: classes.textFieldRoot,
								input: classes.textFieldInput,
							}
						}}
						InputLabelProps={{
							shrink: true,
							className: classes.textFieldFormLabel,
						}}
						onChange={(event) => this.setState({ email: event.target.value })}
					/>
					<br />
					<Divider />
					<Tooltip id="tooltip-icon" title="Check your fields and click to save profile details" placement="bottom">
						<Button fullWidth   onClick={this.handleEditUserClick}>Save</Button>
					</Tooltip>
					<ListSubheader>Password</ListSubheader>
					<Divider />
					<TextField
						fullWidth
						id="txt-oldpassword"
						type="password"
						error={this.state.old_password_invalid}
						label="Current Password"
						margin="normal"
						value={this.state.old_password}
						InputProps={{
							name: 'txt-oldpassword',
							id: 'txt-oldpassword',
							disableUnderline: true,
							classes: {
								root: classes.textFieldRoot,
								input: classes.textFieldInput,
							}
						}}
						InputLabelProps={{
							shrink: true,
							className: classes.textFieldFormLabel,
						}}
						onChange={(event) => this.setState({ old_password: event.target.value })}
					/>
					<TextField
						fullWidth
						id="txt-password"
						type="password"
						error={this.state.new_password_invalid}
						label="New Password"
						margin="normal"
						value={this.state.new_password}
						InputProps={{
							name: 'txt-password',
							id: 'txt-password',
							disableUnderline: true,
							classes: {
								root: classes.textFieldRoot,
								input: classes.textFieldInput,
							}
						}}
						InputLabelProps={{
							shrink: true,
							className: classes.textFieldFormLabel,
						}}
						onChange={(event) => this.setState({ new_password: event.target.value })}
					/>
					<br />
					<Divider />
					<Tooltip id="tooltip-icon" title="Update your password" placement="right">
						<Button fullWidth   onClick={this.handleUpdatePasswordClick}>Update Password</Button>
					</Tooltip>
				</Paper>
			</div >
		);
	}
}

// 
ProfileAccount.propTypes = {
	classes: PropTypes.shape.isRequired
};

// 
export default withStyles(styles)(ProfileAccount);
