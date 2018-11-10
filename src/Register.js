// Import React Stuff
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InputMask from 'react-input-mask';

// Material UI includes
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import MenuItem from '@material-ui/core/MenuItem';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

// Material Icons
import BusinessIcon from '@material-ui/icons/Business';
import CakeIcon from '@material-ui/icons/Cake';
import EmailIcon from '@material-ui/icons/Email';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import SecurityIcon from '@material-ui/icons/Security';
import TagFacesIcon from '@material-ui/icons/TagFaces';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

// Import our actions
import * as providers from './actions/providers';

// Styles
const styles = theme => ({
	root: {
		width: '100%',
		height: '100%',
		zIndex: 100,
		overflowY: 'auto',
		margin: 5,
		padding: 10,
		backgroundColor: theme.palette.sidebar_background.main,
	},
	stepper: {
		backgroundColor: theme.palette.sidebar_background.main,
	},
	title: {
		marginBottom: 16,
		fontSize: 14,
		color: theme.palette.text.secondary,
	},
	media: {
		height: 250,
	},
	container: {
		display: 'flex',
		flexWrap: 'wrap',
	},
	column: {
		flexBasis: '50%',
	},
	selectEmpty: {
		marginTop: theme.spacing.unit * 2,
	},
	instructions: {
		marginTop: theme.spacing.unit,
		marginBottom: theme.spacing.unit,
	},
	wrapForm: {
		padding: 10,
		textAlign: 'center',
		width: '100%',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center'
	},
	icon: {
		color: 'rgba(255, 255, 255, 0.54)',
	},
	rightIcon: {
		marginLeft: theme.spacing.unit,
	},
	formInput: {
		border: '1px solid #ced4da',
		borderRadius: 4,
		padding: '4px 10px'
	},
	formControl: {
		margin: theme.spacing.unit
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

// 
function getSteps() {
	return [
		{ optional: true },
		{ optional: true },
		{ optional: false }
	];
}

// custom phone mask
const PhoneMask = (props) => {
	const { inputRef, ...other } = props;
	return (
		<InputMask
			{...other}
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

const re_email = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// Class: Register
class Register extends Component {
	// constructor: 
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			email_invalid: false,
			user_type: (this.props.user_type && this.props.user_type !== '' ? this.props.user_type : ''),
			first_name: '',
			last_name: '',
			gender: '',
			phone: '',
			username: '',
			username_invalid: false,
			password: '',
			password_invalid: false,
			date_of_birth: '',
			date_of_birth_invalid: false,
			name: '',
			provider_id: '',
			providers: [],
			activeStep: 1,
			skipped: new Set(),
			show_password: false,
		};
	}
	componentWillReceiveProps = (nextProps) => {
		if (nextProps.user_type && nextProps.user_type !== '') this.setState({ user_type: nextProps.user_type });
	}
	// isStepSkipped
	isStepSkipped = (step) => { return this.state.skipped.has(step); };
	// isStepOptional
	isStepOptional = (step) => { return getSteps()[step].optional; };
	// handleSelectUserType
	handleSelectUserType = (user_type, event) => {
		this.setState({ user_type: user_type });
	}
	// handleNext
	handleNext = () => {
		const { activeStep } = this.state;
		if (activeStep === 0 && this.state.user_type === '') return null; // There must be a user type
		if (activeStep === 0 && this.state.user_type === 'agent' && this.state.provider_id === '') return null; // An agent must have a provider ID

		if (activeStep === 1 && this.state.user_type === 'consumer') {
			// Validate date of birth
			var birthday = new Date(this.state.date_of_birth);
			var ageDifMs = Date.now() - birthday.getTime();
			var ageDate = new Date(ageDifMs); // miliseconds from epoch
			var age = Math.abs(ageDate.getUTCFullYear() - 1970);
			if (this.state.date_of_birth === '' || age < 10 || age > 150) {
				this.setState({ date_of_birth_invalid: true });
				return null;
			}
		}

		if (activeStep === 1 && this.state.user_type === 'provider') {
			if (re_email.test(String(this.state.email).toLowerCase())) {
				this.setState({ email_invalid: false });
			} else {
				this.setState({ email_invalid: true });
				return null;
			}
		}

		let { skipped } = this.state;
		if (this.isStepSkipped(activeStep)) {
			skipped = new Set(skipped.values());
			skipped.delete(activeStep);
		}
		this.setState({ activeStep: activeStep + 1, skipped });
	};
	// 
	handleBack = () => {
		const { activeStep } = this.state;
		this.setState({ activeStep: activeStep - 1 });
	};
	// 
	handleSkip = () => {
		const { activeStep } = this.state;
		if (!this.isStepOptional(activeStep)) throw new Error("You can't skip a step that isn't optional.");
		const skipped = new Set(this.state.skipped.values());
		skipped.add(activeStep);
		this.setState({
			activeStep: this.state.activeStep + 1,
			skipped,
		});
	};
	// handleReset
	handleReset = () => this.setState({ activeStep: 0 });
	// getProviders: gets a list of providers so that these can be used by agents.
	getProviders() {
		providers.getProviders(function (response) {
			if (response.data.success) this.setState({ providers: response.data.providers.map(function (s) { return { name: s.name, id: s.id }; }) });
		}.bind(this));
	}
	// 
	componentDidMount() {
		this.getProviders();
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
	// handles phone change
	handlePhoneChange = (event) => {
		this.setState({ phone: event.target.value });

	}
	//handles email change and validation
	handleEmailChange = (event) => {
		this.setState({ email: event.target.value });
		if (re_email.test(String(event.target.value).toLowerCase())) {
			this.setState({ email_invalid: false });
		} else {
			this.setState({ email_invalid: true });
		}
	}
	// handleMouseDownPassword: 
	handleMouseDownPassword = event => {
		event.preventDefault();
	};
	// handleClickShowPassword: 
	handleClickShowPassword = () => {
		this.setState({ show_password: !this.state.show_password });
	};

	// handleDateOfBirthChange
	handleDateOfBirthChange = (event) => {
		this.setState({ date_of_birth: event.target.value });
		var birthday = new Date(event.target.value);
		var ageDifMs = Date.now() - birthday.getTime();
		var ageDate = new Date(ageDifMs); // miliseconds from epoch
		var age = Math.abs(ageDate.getUTCFullYear() - 1970);
		if (age > 9 && age < 150) this.setState({ date_of_birth_invalid: false });
	}
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

		if (this.state.user_type !== 'administrator' && this.state.user_type !== 'provider') {
			var birthday = new Date(this.state.date_of_birth);
			var ageDifMs = Date.now() - birthday.getTime();
			var ageDate = new Date(ageDifMs); // miliseconds from epoch
			var age = Math.abs(ageDate.getUTCFullYear() - 1970);
			if (this.state.date_of_birth === '' || age < 10 || age > 150 || (birthday > Date.now())) {
				this.setState({ date_of_birth_invalid: true });
				form_valid = false;
			}
		}

		if (re_email.test(String(this.state.email).toLowerCase())) {
			this.setState({ email_invalid: false });
		} else {
			this.setState({ email_invalid: true });
			form_valid = false;
		}

		let categories = [];
		if (this.props.selected_category !== '') categories = [this.props.selected_category];

		if (form_valid) {
			var payload = {
				first_name: self.state.first_name,
				last_name: self.state.last_name,
				username: self.state.username,
				email: self.state.email,
				gender: self.state.gender,
				phone: self.state.phone,
				password: self.state.password,
				date_of_birth: self.state.date_of_birth,
				provider_id: self.state.provider_id,
				user_type: self.state.user_type,
				services: this.props.selected_services,
				categories: categories,
				name: self.state.name
			};

			// Must always have user type, username, and password
			if (payload.user_type === '') return false;
			if (payload.username === '') return false;
			if (payload.password === '') return false;

			// A consumer must hae a date of birth
			if (payload.user_type === 'consumer' && payload.date_of_birth === '') return false;
			// An agent must be assigned to an provider
			if (payload.user_type === 'agent' && payload.provider_id === '') return false;
			// An provider must have a name
			if (payload.user_type === 'provider' && payload.name === '') return false;

			self.props.register(payload);
		}
	}
	// render: 
	render() {
		const { classes } = this.props;
		const steps = getSteps();
		const { activeStep } = this.state;
		return (
			<div className={classes.root}>
				<div >
					<Stepper activeStep={activeStep} className={classes.stepper}>
						<Step key="stp-1" completed={this.isStepSkipped(0)} optional={true}>
							<StepLabel >{this.state.user_type === 'provider' ? 'Category' : 'Interests'}</StepLabel>
						</Step>
						<Step key="stp-2" completed={this.isStepSkipped(0)} optional={false}>
							<StepLabel>{this.state.user_type === 'provider' ? 'Info' : 'Info'}</StepLabel>
						</Step>
						<Step key="stp-3" completed={this.isStepSkipped(0)} optional={false}>
							<StepLabel>Account</StepLabel>
						</Step>
					</Stepper>
					<div >
						{activeStep === steps.length ? (
							<div >
								<Typography className={classes.instructions}>That's everything. Select Register to complete</Typography>
								<Tooltip id="tooltip-icon" title="Take the next big step" placement="bottom">
									<Button fullWidth   onClick={this.handleSubmitClick}>Register</Button>
								</Tooltip>
							</div>
						) : (
								<div>
									<form>
										<div>
											{activeStep === 1 ?
												<div className={classes.wrapForm}>
													{this.state.user_type === 'provider' ? // Only need provider name for providers
														<FormControl fullwidth className={classes.formControl}>
															<InputLabel shrink={true} htmlFor="businessname">Business Name</InputLabel>
															<Input
																id="txt-providername"
																type="text"
																margin="normal"
																placeholder="Business Name"
																value={this.state.name}
																disableUnderline={true}
																classes={{
																	root: classes.textFieldRoot,
																	input: classes.textFieldInput,
																}}
																onChange={(event) => this.setState({ name: event.target.value })}
																startAdornment={
																	<InputAdornment position="start">
																		<BusinessIcon />
																	</InputAdornment>
																}
															/>
														</FormControl> : ''
													}
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
													{this.state.user_type !== 'provider' ?
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
														</FormControl> : null}
													<FormControl fullwidth className={classes.formControl}>
														<InputLabel shrink={true} htmlFor="phone">Phone</InputLabel>
														<TextField
															id="txt-phone"
															type="text"
															margin="normal"
															placeholder="Help us contact you"
															disableUnderline={true}
															InputProps={{
																inputComponent: PhoneMask,
																value: this.state.phone,
																onChange: this.handlePhoneChange,
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
													{this.state.user_type !== 'administrator' && this.state.user_type !== 'provider' ?
														<FormControl fullwidth className={classes.formControl}>
															<InputLabel shrink={true} htmlFor="date">Date of Birth</InputLabel>
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
														</FormControl> : ''}
												</div> : ''
											}
											{activeStep === 2 ?
												<div className={classes.wrapForm}>
													<FormControl fullwidth className={classes.formControl}>
														<InputLabel shrink={true} htmlFor="date">Username</InputLabel>
														<Input
															id="txt-username"
															type="text"
															error={this.state.username_invalid}
															label="Username"
															margin="normal"
															helperText="Memorable and between 4 and 20 characters."
															value={this.state.username}
															disableUnderline={true}
															classes={{
																root: classes.textFieldRoot,
																input: classes.textFieldInput,
															}}
															onChange={this.handleUsernameChange}
															startAdornment={
																<InputAdornment position="start">
																	<PermIdentityIcon />
																</InputAdornment>
															}
														/>
													</FormControl>
													<FormControl fullwidth className={classes.formControl}>
														<InputLabel shrink={true} htmlFor="password">Password</InputLabel>
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
															startAdornment={
																<InputAdornment position="start">
																	<SecurityIcon />
																</InputAdornment>
															}
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
													</FormControl>
													<br />
												</div> : ''
											}
										</div>
										<div>
											{activeStep !== 1 ?
												<Button
													size="large"
													disabled={activeStep === 0}
													onClick={this.handleBack}
													 
													className={classes.button}>Back</Button> : null}
											{activeStep !== 2 ?
												<Tooltip id="tooltip-icon" title="Check your fields and click to go to next section" placement="bottom">
													<Button
														fullWidth
														size="large"
														 
														onClick={this.handleNext}
														className={classes.button}>Next
												</Button>
												</Tooltip> : null}
											{activeStep === 2 ?
												<Tooltip id="tooltip-icon" title="Now you can register" placement="bottom">
													<Button
														 
														size="large"
														type="submit"
														disabled={this.props.register_progress}
														onClick={(e) => { e.preventDefault(); this.handleSubmitClick() }}>
														Register
													{this.props.register_progress ?
															<CircularProgress size={24} className={classes.rightIcon} /> :
															<TagFacesIcon className={classes.rightIcon}>Join</TagFacesIcon>}
													</Button>
												</Tooltip> : null}
										</div>
									</form>
								</div>)}
					</div>
				</div>
			</div>
		);
	}
}

export default withStyles(styles)(Register);