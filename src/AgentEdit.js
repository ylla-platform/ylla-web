// Import React Stuff
import PropTypes from 'prop-types';
import React from 'react';

// Import Material UI stuff
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { withStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';

// Styles
const styles = theme => ({
	chip: {
		margin: theme.spacing.unit / 4,
		backgroundColor: theme.palette.ylla_yellow.main
	},
	chips: {
		display: 'flex',
		flexWrap: 'wrap',
	},
	formControl: {
		margin: theme.spacing.unit,
		minWidth: 350,
		maxWidth: 350
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

// Chips in menu styling
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		}
	}
};

// Class: AgentEdit. A modal dialog to create a new agent.
class AgentEdit extends React.Component {
	// constructor:
	constructor(props) {
		super(props);
		this.state = {
			// Dialog
			open: this.props.open,
			// The provider
			provider: this.props.provider,
			// Agent fields
			first_name: '',
			last_name: '',
			phone: '',
			email: '',
			username: '',
			password: '',
			departments: [],
			// Validation
			username_invalid: false,
			password_invalid: false,
			sms_notification: false,
			can_edit_profile: true
		};
	}

	// componentWillReceiveProps: set the provider on receiving a state update from the parent
	componentWillReceiveProps = (nextProps) => {
		this.setState({
			open: nextProps.open,
			provider: nextProps.provider
		});
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

	// save
	save = () => {
		let valid = true;

		// Standard field validation
		if (!this.state.first_name
			|| this.state.first_name === ''
			|| !this.state.last_name
			|| this.state.last_name === '' || !this.state.email || this.state.email === '') {
			valid = false;
		}

		// Username validation:
		if (!this.state.username || this.state.username.length < 3 || this.state.username.length > 21) {
			this.setState({ username_invalid: true });
			valid = false;
		}

		// Password validation
		if (!this.state.password || this.state.password.length < 5 || this.state.password.length > 21) {
			this.setState({ password_invalid: true });
			valid = false;
		}

		// Save the agent
		if (valid) {
			var agent = {
				user_type: 'agent',
				provider_id: this.state.provider.id,
				first_name: this.state.first_name,
				last_name: this.state.last_name,
				email: this.state.email,
				phone: this.state.phone,
				sms_notification: this.state.sms_notification,
				departments: this.state.departments,
				username: this.state.username,
				password: this.state.password,
				can_edit_profile: this.state.can_edit_profile
			};
			this.props.saveAgent(agent);
		}
	}

	// render: 
	render() {
		const { fullScreen, classes } = this.props;
		return (
			<div>
				<Dialog
					fullScreen={fullScreen}
					open={this.state.open}
					onRequestClose={this.props.addAgentDialogClose}
				>
					<DialogTitle>Add agent</DialogTitle>
					<DialogContent>
						<TextField
							id="txt-firstname"
							type="text"
							label="First name"
							margin="normal"
							className={this.props.classes.formControl}
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
						<br />
						<TextField
							id="txt-lastname"
							type="text"
							label="Last name"
							margin="normal"
							className={this.props.classes.formControl}
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
						<br />
						<TextField
							id="txt-email"
							type="text"
							label="Email"
							margin="normal"
							className={this.props.classes.formControl}
							onChange={(event) => this.setState({ email: event.target.value })}
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
						/>
						<br />
						<TextField
							id="txt-phone"
							type="text"
							label="Phone"
							margin="normal"
							className={this.props.classes.formControl}
							onChange={(event) => this.setState({ phone: event.target.value })}
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
						/>
						<br />
						<TextField
							id="txt-username"
							type="text"
							error={this.state.username_invalid}
							label="Username"
							margin="normal"
							className={this.props.classes.formControl}
							onChange={this.handleUsernameChange}
							InputProps={{
								name: 'txt-username',
								id: 'txt-username',
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
						<br />
						<TextField
							id="txt-password"
							type="password"
							error={this.state.password_invalid}
							label="Password"
							margin="normal"
							className={this.props.classes.formControl}
							onChange={this.handlePasswordChange}
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
						/>
						<br />
						{this.state.provider &&
							this.state.provider.departments &&
							this.state.provider.departments.length > 0 ?
							(
								<FormControl className={classes.formControl}>
									<InputLabel htmlFor="sel-departments">Departments</InputLabel>
									<Select
										multiple
										value={this.state.departments}
										onChange={(e) => this.setState({ departments: e.target.value })}
										input={<Input id="select-multiple-checkbox" />}
										renderValue={selected => (
											<div className={classes.chips}>
												{selected.map(value => <Chip key={value} label={value} className={classes.chip} />)}
											</div>
										)}
										MenuProps={MenuProps}
									>
										{this.state.provider.departments.map(department => {
											return (
												<MenuItem key={department} value={department}>
													<Checkbox checked={this.state.departments.indexOf(department) > -1} />
													<ListItemText primary={department} />
												</MenuItem>
											)
										})}
									</Select>
								</FormControl>
							) : null}
						<br />
						<FormControlLabel
							control={
								<Switch
									checked={this.state.can_edit_profile}
									onChange={() => this.setState({ can_edit_profile: !this.state.can_edit_profile })}
									value={this.state.can_edit_profile}
									 
								/>
							}
							label="Agent can edit profile"
						/>
					</DialogContent>
					<DialogActions>
						<Button onClick={() => this.save()}  >Save</Button>
						<Button onClick={this.props.agentEditDialogClose}   autoFocus>Cancel</Button>
					</DialogActions>
				</Dialog>
			</div>
		);
	}
}

// 
AgentEdit.propTypes = {
	fullScreen: PropTypes.bool.isRequired
};

export default withStyles(styles)(AgentEdit);