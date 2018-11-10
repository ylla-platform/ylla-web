// Import React Stuff
import PropTypes from 'prop-types';
import React from 'react';

// Import Material UI stuff
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

// Styles
const styles = theme => ({
	formControl: {
		margin: theme.spacing.unit,
		minWidth: 120,
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

// Class: Broadcast
class Broadcast extends React.Component {
	// constructor: 
	constructor(props) {
		super(props);
		this.state = {
			// Dialog functions
			open: false,
			subject: '',
			message: ''
		};
	}
	// componentWillReceiveProps: set the services on receiving a state update from the parent
	componentWillReceiveProps = (nextProps) => {
		this.setState({
			open: nextProps.open
		});
	}
	// handleSave: 
	handleBroadcast = () => {
		this.props.sendBroadcast(this.state.subject, this.state.message);
		this.setState({ subject: '', message: '' });
	}
	// render: 
	render() {
		const { fullScreen } = this.props;
		const { classes } = this.props;
		return (
			<div>
				<Dialog
					fullScreen={fullScreen}
					open={this.state.open}
					onRequestClose={this.props.broadcastDialogClose}
				>
					<DialogTitle>{"Broadcast message"}</DialogTitle>
					<DialogContent>
						<TextField
							autoFocus
							id="txt-subject"
							label="Subject"
							value={this.state.subject}
							onChange={(e) => this.setState({ subject: e.target.value })}
							type="text"
							InputProps={{
								name: 'txt-subject',
								id: 'txt-subject',
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
							id="txt-message"
							label="Message"
							type="text"
							value={this.state.message}
							onChange={(e) => this.setState({ message: e.target.value })}
							InputProps={{
								name: 'txt-message',
								id: 'txt-message',
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
					</DialogContent>
					<DialogActions>
						<Button onClick={this.handleBroadcast}  >Send</Button>
						<Button onClick={this.props.broadcastDialogClose}   autoFocus>Cancel</Button>
					</DialogActions>
				</Dialog>
			</div>
		);
	}
}

// 
Broadcast.propTypes = {
	fullScreen: PropTypes.bool.isRequired,
};

export default withStyles(styles)(Broadcast);