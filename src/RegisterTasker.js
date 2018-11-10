// Import React Stuff
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InputMask from 'react-input-mask';

// Material UI includes
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';

// Material Icons
import * as icons from '@material-ui/icons';
import CakeIcon from '@material-ui/icons/Cake';
import EmailIcon from '@material-ui/icons/Email';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import TagFacesIcon from '@material-ui/icons/TagFaces';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

// Styles
const styles = theme => ({
	root: {
		width: '100%',
		height: '100%',
		zIndex: 100,
		overflowY: 'auto',
		margin: 5,
		padding: 10
	},
	formControl: {
		margin: theme.spacing.unit,
	},
	wrapForm: {
		padding: 10,
		textAlign: 'center',
		width: '100%',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center'
	},
	rightIcon: {
		marginLeft: theme.spacing.unit,
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

// custom phone mask
const PhoneMask = (props) => {
	const { inputRef, ...other } = props;
	return (
		<InputMask
			{...other}
			startAdornment={<InputAdornment position="start">$</InputAdornment>}
			ref={inputRef}
			mask="9999 9999"
			maskChar=" "
			alwaysShowMask
		/>
	);
}

PhoneMask.propTypes = {
	inputRef: PropTypes.func.isRequired,
};

const re_email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// Class: RegisterTasker
class RegisterTasker extends Component {
	// constructor: 
	constructor(props) {
		super(props);
		this.state = {
			// The provider
			provider_id: '',
			// Agent fields
			first_name: '',
			last_name: '',
			phone: '',
			email: '',
			gender: '',
			vehicle: '',
			username: '',
			password: '',
			// Validation
			username_invalid: false,
			password_invalid: false,
			date_of_birth_invalid: false,
			email_invalid: false,
			show_password: false,

		};
	}
	// handleUsernameChange: 
	handleUsernameChange = (event) => {
		if (event.target.value.length > 3 && event.target.value.length < 21) this.setState({ username_invalid: false });
		this.setState({ username: event.target.value });
	}
	// handlePasswordChange: 
	handlePasswordChange = (event) => {
		this.setState({ password: event.target.value });
		if (event.target.value.length > 5 && event.target.value.length < 21) this.setState({ password_invalid: false });
	}
	// handleDateOfBirthChange
	handleDateOfBirthChange = (event) => {
		this.setState({ date_of_birth: event.target.value });
		var birthday = new Date(event.target.value);
		var ageDifMs = Date.now() - birthday.getTime();
		var ageDate = new Date(ageDifMs); // miliseconds from epoch
		var age = Math.abs(ageDate.getUTCFullYear() - 1970);
		if (age > 10 && age < 150) this.setState({ date_of_birth_invalid: false });
		if (birthday > Date.now()) this.setState({ date_of_birth_invalid: true });
	}
	handleEmailChange = (event) => {
		this.setState({ email: event.target.value });
		if (re_email.test(String(event.target.value).toLowerCase())) {
			this.setState({ email_invalid: false });
		} else {
			this.setState({ email_invalid: true });
		}
	}
	handlePhoneChange = (event) => {
		this.setState({ phone: event.target.value });

	}
	// handleMouseDownPassword: 
	handleMouseDownPassword = event => {
		event.preventDefault();
	};
	// handleClickShowPassword: 
	handleClickShowPassword = () => {
		this.setState({ show_password: !this.state.show_password });
	};
	// handleSubmitClick: 
	handleSubmitClick = () => {
		var self = this;
		let form_valid = true;
		if (this.state.username.length < 4 || this.state.username.length > 21) {
			this.setState({ username_invalid: true });
			form_valid = false;
		}
		if (this.state.password.length < 6 || this.state.password.length > 21) {
			this.setState({ password_invalid: true });
			form_valid = false;
		}
		if (re_email.test(String(this.state.email).toLowerCase())) {
			this.setState({ email_invalid: false });
		} else {
			this.setState({ email_invalid: true });
			form_valid = false;
		}

		let birthday = new Date(this.state.date_of_birth);
		let ageDifMs = Date.now() - birthday.getTime();
		let ageDate = new Date(ageDifMs); // miliseconds from epoch
		let age = Math.abs(ageDate.getUTCFullYear() - 1970);
		if (this.state.date_of_birth === '' || age < 10 || age > 150 || (birthday > Date.now())) {
			this.setState({ date_of_birth_invalid: true });
			form_valid = false;
		}
		if (form_valid) {
			var payload = {
				first_name: self.state.first_name,
				last_name: self.state.last_name,
				username: self.state.username,
				email: self.state.email,
				vehicle: self.state.vehicle,
				gender: self.state.gender,
				phone: self.state.phone,
				password: self.state.password,
				date_of_birth: self.state.date_of_birth,
				provider_id: self.state.provider_id,
				user_type: 'agent'
			};

			// Must always have username, and password
			if (payload.username === '') return false;
			if (payload.password === '') return false;
			if (payload.vehicle === '') return false;

			// 
			self.props.register(payload);
		}
	}
	// render: 
	render() {
		const { classes } = this.props;
		return (
			<div className={classes.root}>
				<div className={classes.wrapForm}>
					<FormControl fullwidth className={classes.formControl}>
						<InputLabel shrink={true} htmlFor="firstname">First Name</InputLabel>
						<Input
							id="txt-firstname"
							type="text"
							margin="normal"
							placeholder="First Name"
							value={this.state.first_name}
							disableUnderline={true}
							classes={{
								root: classes.textFieldRoot,
								input: classes.textFieldInput,
							}}
							onChange={(event) => this.setState({ first_name: event.target.value })}
							startAdornment={
								<InputAdornment position="start">
									<PermIdentityIcon />
								</InputAdornment>
							}
						/>
					</FormControl>
					<FormControl fullwidth className={classes.formControl}>
						<InputLabel shrink={true} htmlFor="lastname">Last Name</InputLabel>
						<Input
							id="txt-lastname"
							type="text"
							margin="normal"
							placeholder="Last Name"
							value={this.state.last_name}
							disableUnderline={true}
							classes={{
								root: classes.textFieldRoot,
								input: classes.textFieldInput,
							}}
							onChange={(event) => this.setState({ last_name: event.target.value })}
							startAdornment={
								<InputAdornment position="start">
									<PermIdentityIcon />
								</InputAdornment>
							}
						/>
					</FormControl>
					<FormControl fullwidth className={classes.formControl}>
						<InputLabel shrink={true} htmlFor="email">Email</InputLabel>
						<Input
							id="txt-email"
							type="text"
							error={this.state.email_invalid}
							margin="normal"
							placeholder="Example@example.com"
							value={this.state.email}
							disableUnderline={true}
							classes={{
								root: classes.textFieldRoot,
								input: classes.textFieldInput,
							}}
							onChange={this.handleEmailChange}
							startAdornment={
								<InputAdornment position="start">
									<EmailIcon />
								</InputAdornment>
							}
						/>
					</FormControl>
					<FormControl fullwidth className={classes.formControl}>
						<InputLabel shrink={true} htmlFor="txt-phone">Phone</InputLabel>
						<TextField
							id="txt-phone"
							type="text"
							margin="normal"
							placeholder="Help us contact you"
							InputProps={{
								id: 'sel-registrationtype',
								name: 'sel-registrationtype',
								disableUnderline: true,
								classes: {
									root: classes.textFieldRoot,
									input: classes.textFieldInput,
								}
							}}
							startAdornment={
								<InputAdornment position="start">
									<EmailIcon />
								</InputAdornment>
							}
						/>
					</FormControl>
					<FormControl fullwidth className={classes.formControl}>
						<InputLabel shrink={true} htmlFor="txt-date">Date of Birth</InputLabel>
						<Input
							id="txt-date"
							type="date"
							error={this.state.date_of_birth_invalid}
							helperText="Tell us your date of birth"
							value={this.state.date_of_birth}
							disableUnderline={true}
							classes={{
								root: classes.textFieldRoot,
								input: classes.textFieldInput,
							}}
							onChange={this.handleDateOfBirthChange}
							startAdornment={
								<InputAdornment position="start">
									<CakeIcon />
								</InputAdornment>
							}
						/>
					</FormControl>
					<FormControl className={classes.formControl}>
						<TextField
							fullWidth
							select
							value={this.state.gender}
							onChange={(e) => this.setState({ gender: e.target.value })}
							label="Gender"
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
							startAdornment={
								<InputAdornment position="start">
									<EmailIcon />
								</InputAdornment>
							}
						>
							<MenuItem value="male">Male</MenuItem>
							<MenuItem value="female">Female</MenuItem>
						</TextField>
					</FormControl>
					<FormControl className={classes.formControl}>
						<TextField
							fullWidth
							select
							value={this.state.vehicle}
							onChange={(e) => this.setState({ vehicle: e.target.value })}
							label="Vehicle"
							InputProps={{
								name: 'sel-vehicle',
								id: 'sel-vehicle',
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
							startAdornment={
								<InputAdornment position="start">
									<EmailIcon />
								</InputAdornment>
							}
						>
							{this.props.referencedata
								.filter(dataitem => {
									return dataitem.type === 'transportation_type'
								})
								.map(dataitem => {
									const Icon = icons[dataitem.icon];
									return <MenuItem value={dataitem.system_name}>
										<ListItemIcon className={classes.icon}>
											<Icon />
										</ListItemIcon>
										<ListItemText inset primary={dataitem.text} />
									</MenuItem>
								})}
						</TextField>
					</FormControl>
					<FormControl fullwidth className={classes.formControl}>
						<InputLabel shrink={true} htmlFor="txt-username">Username</InputLabel>
						<Input
							id="txt-username"
							type="text"
							error={this.state.username_invalid}
							margin="normal"
							value={this.state.username}
							onChange={this.handleUsernameChange}
							disableUnderline={true}
							classes={{
								root: classes.textFieldRoot,
								input: classes.textFieldInput,
							}}
						/>
					</FormControl>
					<FormControl fullwidth className={classes.formControl}>
						<InputLabel shrink={true} htmlFor="txt-password">Password</InputLabel>
						<Input
							id="txt-password"
							type={this.state.show_password ? 'text' : 'password'}
							error={this.state.password_invalid}
							margin="normal"
							value={this.state.password}
							onChange={this.handlePasswordChange}
							disableUnderline={true}
							classes={{
								root: classes.textFieldRoot,
								input: classes.textFieldInput,
							}}
							endAdornment={
								<InputAdornment position="end">
									<IconButton
										onClick={this.handleClickShowPassword}
										onMouseDown={this.handleMouseDownPassword}
									>
										{this.state.show_password ? <VisibilityOff /> : <Visibility />}
									</IconButton>
								</InputAdornment>
							}
						/>
						<br />
					</FormControl>
					<Tooltip id="tooltip-icon" title="Take the next big step" placement="bottom">
						<Button   onClick={this.handleSubmitClick}>Join<TagFacesIcon className={classes.rightIcon} /></Button>
					</Tooltip>
				</div>
			</div>
		);
	}
}

export default withStyles(styles)(RegisterTasker);