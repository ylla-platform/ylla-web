// Import React
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Material UI includes
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';

// Icons
import DeleteIcon from '@material-ui/icons/Delete';

// Consumer actions
import * as consumerActions from './actions/consumers'

// Moment for date and time formatting
import moment from 'moment';

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
	formControl: {
		margin: theme.spacing.unit,
		minWidth: 120
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

// Class: ProfileConsumerShare
class ProfileConsumerShare extends Component {

	// constructor: call super, set up state, and handler bindings
	constructor(props) {
		super(props);
		this.state = {
			share_location_users: (this.props.user.share_location_users ? this.props.user.share_location_users : []),
			current_share_value: '',
			current_share_end: ''
		};
	}

	// addShareUser: 
	addShareUser = () => {
		let user = this.state.current_share_value;
		let end_time = this.state.current_share_end;

		// Validate the user
		consumerActions.checkConsumerUsername(user, valid => {
			if (valid) {
				let users = this.state.share_location_users;
				let found = false;
				users.forEach(user => {
					if (user.username === user) found = true;
				});

				// Work out the end times
				var today = moment();
				if (end_time === '1hour') today.add('hours', 1);
				if (end_time === '2hours') today.add('hours', 2);
				if (end_time === 'today') today.endOf('day');
				if (end_time === 'forever') today = '';

				if (!found) {
					users.push({
						username: user,
						end: (today !== '' ? today.format('DD/MM/YYYY HH:mm') : '')
					});
				}
				this.setState({ share_location_users: users, current_share_value: '' });
			}
		});
	}

	// removeShareUser: 
	removeShareUser = (user) => {
		let users = this.state.share_location_users;
		let new_users = [];
		users.forEach(u => {
			if (u.username !== user) new_users.push(u);
		});
		this.setState({ share_location_users: new_users });
	}

	// handleEditUserClick:
	handleEditUserClick = () => {
		var user = this.props.user;
		user.share_location_users = this.state.share_location_users;
		this.props.editUser(user);
	}

	// render
	render() {
		const { classes } = this.props;
		return (
			<div className={classes.root}>
				<Paper className={classes.content}>
					<ListSubheader>Share your live location</ListSubheader>
					<Divider />
					<TextField
						fullWidth
						id="txt-shareuser"
						type="text"
						label="Enter a username"
						margin="normal"
						value={this.state.current_share_value}
						onChange={(event) => this.setState({ current_share_value: event.target.value })}
						InputProps={{
							name: 'governorate',
							id: 'sel-governorate',
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
						select
						value={this.state.current_share_end}
						label="How long?"
						margin="normal"
						onChange={(event) => this.setState({ current_share_end: event.target.value })}
						InputProps={{
							name: 'governorate',
							id: 'sel-governorate',
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
						<MenuItem value="1hour">1 hour</MenuItem>
						<MenuItem value="2hours">2 hours</MenuItem>
						<MenuItem value="today">Today</MenuItem>
						<MenuItem value="forever">Forever</MenuItem>
					</TextField>
					<br />
					<Tooltip id="tooltip-icon" title="Add this user to allow them to see your location" placement="right">
						<Button variant="flat"   onClick={(e) => this.addShareUser()}>Add</Button>
					</Tooltip>
					<br />
					<ListSubheader>Sharing List</ListSubheader>
					<Divider />
					<List>
						{this.state.share_location_users.map((user, idx) => {
							let end_time = '';
							if (user.end && user.end !== '') end_time = moment(user.end, 'ddd MMM HH:mm');
							return (
								<ListItem key={'li_share_' + idx} dense className={classes.listItem}>
									<ListItemText primary={user.username} secondary={'Sharing ends ' + (user.end !== '' ? moment().to(end_time) : 'never')} />
									<ListItemSecondaryAction>
										<IconButton aria-label="Delete" onClick={(event) => this.removeShareUser(user.username)}>
											<DeleteIcon />
										</IconButton>
									</ListItemSecondaryAction>
								</ListItem>
							)
						})}
					</List>
					<br />
					<Tooltip id="tooltip-icon" title="Check your share details and click to save profile details" placement="bottom">
						<Button fullWidth   onClick={this.handleEditUserClick}>Save</Button>
					</Tooltip>
				</Paper>
			</div>
		);
	}
}

// 
ProfileConsumerShare.propTypes = {
	classes: PropTypes.shape.isRequired
};

// 
export default withStyles(styles)(ProfileConsumerShare);
