// Import React Stuff
import React from 'react';
import PropTypes from 'prop-types';

// Import Material UI stuff
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import Modal from '@material-ui/core/Modal'
import Typography from '@material-ui/core/Typography';

// Authentication actions
import * as authentication from './actions/authentication'

// Icons
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import SecurityIcon from '@material-ui/icons/Security';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

// Styles
const styles = theme => ({
	buttonProgress: {
		align: 'center'
	},
	root: {
		zIndex: 100,
		overflowY: 'auto'
	},
	formInput: {
		border: '1px solid #ced4da',
		borderRadius: 4,
		padding: '4px 10px'
	},
	forgotControl: {
		margin: theme.spacing.unit,
		marginLeft: '15% !important',
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
	wrapForm: {
		padding: 10,
		textAlign: 'center',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center'
	},
	snackbar_close: {
		width: theme.spacing.unit * 4,
		height: theme.spacing.unit * 4,
	},
	forgot_modal: {
		position: 'absolute',
		width: theme.spacing.unit * 50,
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[5],
		padding: theme.spacing.unit * 4,
	}
});

// Class: Login
class Login extends React.Component {
	// constructor: 
	constructor(props) {
		super(props);
		this.state = {
			open: false,
			username: '',
			forgot_username: '',
			username_invalid: false,
			password: '',
			show_password: false,
			password_invalid: false,
			snackbar_open: false,
			snackbar_message: '',
			modal_open: false,

		};
	}
	// componentWillReceiveProps:
	componentWillReceiveProps = (nextProps) => {
		this.setState({ open: nextProps.open });
	};
	// handleUsernameChange: 
	handleUsernameChange = (event) => {
		if (event.target.value.length > 3 && event.target.value.length < 21) this.setState({ username_invalid: false });
		this.setState({ username: event.target.value });
	};

	// handleUsernameChange:
	handleForgotUsernameChange = (event) => {
		this.setState({ forgot_username: event.target.value });
	};
	// handlePasswordChange: 
	handlePasswordChange = (event) => {
		this.setState({ password: event.target.value });
		if (event.target.value.length > 5 && event.target.value.length < 21) this.setState({ password_invalid: false });
	};
	// handleLoginClick: 
	handleLoginClick = () => {
		let form_valid = true;
		if (this.state.username.length < 4 || this.state.username.length > 21) {
			this.setState({ username_invalid: true });
			form_valid = false;
		}
		if (this.state.password.length < 6 || this.state.password.length > 21) {
			this.setState({ password_invalid: true });
			form_valid = false;
		}
		if (form_valid) this.props.login({ username: this.state.username, password: this.state.password });
	};
	handleMouseDownPassword = event => {
		event.preventDefault();
	};
	handleClickShowPassword = () => {
		this.setState({ show_password: !this.state.show_password });
	};

	// handle snackbar
	handleSnackbarClose = (event, reason) => {
		if (reason === 'clickaway') return;
		this.setState({ snackbar_open: false });
	};

	// functions for forgot password modal display
	getModalStyle = () => {
		const top = 50;
		const left = 50;

		return {
			top: `${top}%`,
			left: `${left}%`,
			transform: `translate(-${top}%, -${left}%)`,
		};
	};

	handleOpen = () => {
		this.setState({ modal_open: true });
	};

	handleClose = () => {
		this.setState({ modal_open: false });
	};

	handleForgotSend = () => {
		// Close modal
		this.handleClose();

		// notify user
		this.setState({ snackbar_open: true, snackbar_message: 'Please check your email!' });

		// start backend proccess
		let username = this.state.forgot_username;

		authentication.resetPasswordEmail(username);
	};

	// render: 
	render() {
		const { classes } = this.props;
		return (
			<div className={classes.root}>
				<form onsubmit={(e) => { e.preventDefault(); this.handleLoginClick() }}>
					<div className={classes.wrapForm}>
						<FormControl fullwidth className={classes.formControl}>
							<InputLabel shrink={true} htmlFor="txt-username">Username</InputLabel>
							<Input
								id="txt-username"
								type="text"
								error={this.state.username_invalid}
								margin="normal"
								placeholder="Your username"
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
							<InputLabel shrink={true} htmlFor="txt-password">Password</InputLabel>
							<Input
								id="txt-password"
								type={this.state.show_password ? 'text' : 'password'}
								error={this.state.password_invalid}
								margin="normal"
								placeholder="Your password"
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
						<Button
							fullWidth
							 
							variant="flat"
							size="large"
							onClick={this.handleOpen}>Forgot your password?
						</Button>
						{this.props.login_progress ?
							<CircularProgress size={24} className={classes.buttonProgress} /> :
							<Button
								fullWidth
								variant="outlined"
								size="large"
								type="submit"
								disabled={this.props.login_progress}
								onClick={(e) => { e.preventDefault(); this.handleLoginClick() }}
								 >Login
						</Button>}
					</div>
				</form>
				<Modal
					aria-labelledby="simple-modal-title"
					aria-describedby="simple-modal-description"
					open={this.state.modal_open}
					onClose={this.handleClose}
				>
					<div style={this.getModalStyle()} className={classes.forgot_modal}>
						<Typography variant="title" id="modal-title" align="center">
							Enter Your Username: </Typography> <br />
						<FormControl fullwidth className={classes.forgotControl}>
							<Input
								id="txt-forgot-username"
								type="text"
								label="Username"
								margin="normal"
								placeholder="Your username"
								value={this.state.forgot_username}
								disableUnderline={true}
								className={classes.formInput}
								onChange={this.handleForgotUsernameChange}
								startAdornment={
									<InputAdornment position="start">
										<PermIdentityIcon />
									</InputAdornment>
								}
							/>
						</FormControl>
						<br />
						<Typography variant="caption" gutterBottom align="center" id="simple-modal-description">
							If there is an email associated with this account, we will send an email!
                        </Typography>
						<br />
						<Button fullWidth variant="outlined" onClick={this.handleForgotSend}   > Send Email</Button>
					</div>
				</Modal>
				<Snackbar
					anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
					open={this.state.snackbar_open}
					autoHideDuration={3000}
					onClose={this.handleSnackbarClose}
					SnackbarContentProps={{ 'aria-describedby': 'message-id' }}
					message={<span id="message-id">{this.state.snackbar_message}</span>}
					action={[
						<IconButton
							key="icn-close"
							aria-label="Close"
							color="inherit"
							className={classes.snackbar_close}
							onClick={this.handleSnackbarClose}
						>
							<CloseIcon />
						</IconButton>
					]}
				/>
			</div>
		);
	}
}

Login.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);