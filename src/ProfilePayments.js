// Import React
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Material UI includes
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
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
	formControl: {
		margin: theme.spacing.unit,
		minWidth: 120
	},
	content: {
		padding: 10,
		backgroundColor: '#F9F9F9',
		border: '1px solid #ccc'
	}
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
};

// Class: ProfilePayments
class ProfilePayments extends Component {

	// constructor: call super, set up state, and handler bindings
	constructor(props) {
		super(props);
		this.state = {
			payment_how: (this.props.user.payment_how ? this.props.user.payment_how : []),
			payment_when: (this.props.user.payment_when ? this.props.user.payment_when : ''),
			payment_percentage: (this.props.user.payment_percentage ? this.props.user.payment_percentage : ''),
		};
	}

	// handleEditUserClick: 
	handleEditUserClick = () => {
		let user = this.props.user;
		user.payment_how = this.state.payment_how;
		user.payment_when = this.state.payment_when;
		user.payment_percentage = this.state.payment_percentage;
		this.props.editUser(user);
	}

	// render: 
	render() {
		const { classes } = this.props;
		return (
			<div className={classes.root}>
				<Paper className={classes.content}>
					<ListSubheader>{this.props.user.type === 'provider' ? 'When do you need to be paid?' : 'When would you prefer to pay?'}</ListSubheader>
					<Divider />
					<br />
					<FormControl fullWidth className={classes.formControl}>
						<InputLabel htmlFor="sel-whenpaid">When</InputLabel>
						<Select
							value={this.state.payment_when}
							onChange={(event) => this.setState({ payment_when: event.target.value })}
							inputProps={{
								name: 'whenpaid',
								id: 'sel-whenpaid',
							}}
						>
							{this.props.referencedata
								.filter(dataitem => {
									return dataitem.type === 'payment_deadline'
								})
								.map(dataitem => {
									return <MenuItem value={dataitem.system_name}>{dataitem.text}</MenuItem>
								})}
						</Select>
					</FormControl>
					{this.state.payment_when === 'percentage' ? <TextField
						id="txt-payment_percentage"
						type="text"
						label="Percentage required"
						value={this.state.payment_percentage}
						margin="normal"
						className={this.props.classes.formControl}
						helperText="Enter the percentage payment you would like up front."
						onChange={(event) => this.setState({ payment_percentage: event.target.value })}
					/> : null}
					<br />
					<ListSubheader>{this.props.user.type === 'provider' ? 'How can you be paid?' : 'How can you pay?'}</ListSubheader>
					<Divider />
					<br />
					<FormControl fullWidth className={classes.formControl}>
						<Select
							fullWidth
							multiple
							value={this.state.payment_how}
							label="Payment type"
							onChange={(event) => this.setState({ payment_how: event.target.value })}
							input={<Input id="sel-paymenthow" />}
							renderValue={selected => (
								<div className={classes.chips}>
									{selected.map(value => <Chip key={value} label={value} className={classes.chip} />)}
								</div>
							)}
							MenuProps={MenuProps}
							InputProps={{
								name: 'sel-paymenthow',
								id: 'sel-paymenthow',
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
							{this.props.referencedata
								.filter(dataitem => {
									return dataitem.type === 'payment_type'
								})
								.map(dataitem => {
									return <MenuItem key={dataitem.system_name} value={dataitem.system_name}>
										<Checkbox checked={this.state.payment_how ? this.state.payment_how.indexOf(dataitem.system_name) !== -1 : false} />
										<ListItemText primary={dataitem.text} />
									</MenuItem>
								})}
						</Select>
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
ProfilePayments.propTypes = {
	classes: PropTypes.shape.isRequired
};

// 
export default withStyles(styles)(ProfilePayments);