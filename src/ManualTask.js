// Import React Stuff
import React, { Component } from 'react'
import PropTypes from 'prop-types';
import InputMask from 'react-input-mask';

// Material UI includes
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import * as agents from './actions/agents';
// Address selection
import ProfileAddress from './ProfileAddress';
import { ListSubheader } from '@material-ui/core';

// Styles: 
const styles = theme => ({
	appBar: {
		textAlign: 'center',
		borderBottom: '1px solid #B3B3B3',
		backgroundColor: '#F9F9F9',
		padding: 10,
		top: 62
	},
	title: {
		fontSize: '1.2rem',
		fontFamily: "'Montserrat', sans-serif",
		fontWeight: 700,
		textTransform: 'uppercase',
		letterSpacing: '1px',
		textAlign: 'center',
		margin: 'auto', 
		color:'black'
	},
	root: {
		width: '100%',
		zIndex: 100
	},
	content: {
		padding: 10
	},
	button: {
		margin: theme.spacing.unit
	},
	formControl: {
		margin: theme.spacing.unit,
		minWidth: 300
	},
	card: {
		maxWidth: 400,
		backgroundColor: theme.palette.sidebar_background.main
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
})

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
}

class ManualTask extends Component {

	constructor(props) {
		super(props);
		this.state = {
			// Task details
			title: '',
			description: '',
			price: '',
			// customer details
			customer_name: '',
			customer_phone: '',
			// address
			address: '',
			location: [],
			governorate: '',
			neighbourhood: '',
			block: '',
			street: '',
			house: '',
			// order details
			start_date_time: '',
			// agent details
			agent_id: '0',
			// validation
			phone_invalid: false

		};
	}

	// phone validation [may need tweaking]
	handlePhoneChange = (event) => {
		this.setState({ customer_phone: event.target.value });
		if (event.target.value.length === 9 || this.event.target.value === 0) {
			this.setState({ phone_invalid: false });
		} else {
			this.setState({ phone_invalid: true });
		}
	}

	// Date time validation
	handleDateTimeChange = (event) => {
		this.setState({ start_date_time: event.target.value });
	}

	// handleSetAddress:
	handleSetAddress = (location, address, fields) => {
		this.setState({
			address: address,
			location: location,
			governorate: fields.governorate,
			neighbourhood: fields.neighbourhood,
			block: fields.block,
			street: fields.street,
			house: fields.house
		});
	}

	// handle creating the new task [todo finish function]
	handleSubmitClick = (event) => {

		// Validation
		if (this.state.title === '') return null;
		if (this.state.description === '') return null;
		if (this.state.customer_name === '') return null;
		if (this.state.phone === '') return null;

		// Set the answers
		let answers = {
			'Title': this.state.title,
			'Description': this.state.description,
			'Name': this.state.customer_name,
			'Phone': this.state.phone
		};

		// Construct the task
		let data = {
			answers: answers,
			provider_id: this.props.provider_id,
			consumer_id: '0',
			service_id: '0',
			agent_id: this.state.agent_id,
			price: this.state.price,
			address: this.state.address,
			location: this.state.location,
			governorate: this.state.governorate,
			neighbourhood: this.state.neighbourhood,
			block: this.state.block,
			street: this.state.street,
			house: this.state.house,
			start_date_time: this.state.start_date_time
		};
		this.props.createTask(event, data);
	}

	render() {
		// menu items list for agent selection
		const { classes } = this.props;
		return (
			<div className={classes.root}>
				<AppBar position="sticky" elevation={0} className={classes.appBar}>
					<Toolbar disableGutters={true}>
						<Typography variant="title" color="inherit" className={classes.title}>Create Order</Typography>
						<IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={() => this.props.close()}>
							<svg width='20'
								fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="1.414" clip-rule="evenodd" viewBox="0 0 28 28">
								<g fill="#313131" fill-rule="nonzero" stroke="#313131" stroke-width=".3">
									<path d="M8.893 10.36a1.037 1.037 0 0 0 1.471 0 1.042 1.042 0 0 0 0-1.472L2.043.559a1.04 1.04 0 1 0-1.47 1.472l8.32 8.329zM15.26 13.788L27.008 2.031a1.042 1.042 0 0 0 0-1.472c-.407-.407-1.065-.586-1.471-.179L13.055 12.694h-.309v.36L.419 25.546c-.406.406-.329 1.065.076 1.472.203.204.508.305.774.305.267 0 .552-.101.755-.305L13.78 15.261l11.751 11.758a1.041 1.041 0 0 0 1.474 0 1.04 1.04 0 0 0 .001-1.472L15.26 13.788z" />
								</g>
							</svg>
						</IconButton>
					</Toolbar>
				</AppBar>
				<ListSubheader>Customer</ListSubheader>
				<Divider />
				<br />
				<FormControl error={this.state.phone_invalid} className={classes.formControl}>
					<TextField
						fullwidth
						id="txt-customer_phone"
						type="text"
						label="Phone"
						margin="normal"
						disableUnderline={true}
						InputProps={{
							inputComponent: PhoneMask,
							value: this.state.customer_phone,
							onChange: this.handlePhoneChange,
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
				</FormControl>
				<FormControl required fullwidth className={classes.formControl}>
					<InputLabel shrink={true} htmlFor="txt-name">Name</InputLabel>
					<Input
						id="txt-name"
						type="text"
						margin="normal"
						value={this.state.customer_name}
						disableUnderline={true}
						classes={{
							root: classes.textFieldRoot,
							input: classes.textFieldInput,
						}}
						onChange={(event) => this.setState({ customer_name: event.target.value })}
					/>
				</FormControl>
				<FormControl fullwidth className={classes.formControl}>
					<InputLabel shrink={true} htmlFor="txt-title">Title</InputLabel>
					<Input
						id="txt-title"
						type="text"
						margin="normal"
						value={this.state.title}
						className={classes.formInput}
						disableUnderline={true}
						classes={{
							root: classes.textFieldRoot,
							input: classes.textFieldInput,
						}}
						onChange={(e) => this.setState({ title: e.currentTarget.value })}
					/>
				</FormControl>
				<FormControl fullwidth className={classes.formControl}>
					<InputLabel shrink={true} htmlFor="txt-description">Description</InputLabel>
					<Input
						id="txt-description"
						type="text"
						margin="normal"
						value={this.state.description}
						disableUnderline={true}
						classes={{
							root: classes.textFieldRoot,
							input: classes.textFieldInput,
						}}
						onChange={(e) => this.setState({ description: e.currentTarget.value })}
					/>
				</FormControl>
				<FormControl fullwidth className={classes.formControl}>
					<InputLabel shrink={true} htmlFor="txt-price">Price</InputLabel>
					<Input
						id="txt-price"
						type="text"
						margin="normal"
						value={this.state.price}
						disableUnderline={true}
						classes={{
							root: classes.textFieldRoot,
							input: classes.textFieldInput,
						}}
						onChange={(e) => this.setState({ price: e.currentTarget.value })}
					/>
				</FormControl>
				<FormControl fullwidth className={classes.formControl}>
					<InputLabel shrink={true} htmlFor="order_datetime">Date</InputLabel>
					<Input
						id="txt-order_datetime"
						type="datetime-local"
						margin="normal"
						value={this.state.start_date_time}
						disableUnderline={true}
						classes={{
							root: classes.textFieldRoot,
							input: classes.textFieldInput,
						}}
						onChange={this.handleDateTimeChange}
					/>
				</FormControl>
				<br />
				<ListSubheader>Order Location</ListSubheader>
				<Divider />
				<ProfileAddress
					setAddress={this.handleSetAddress}
					updateMapLocation={this.props.updateMapLocation}
					updateMapBounds={this.props.updateMapBounds}
					location={this.state.location}
					address={this.state.address}
					governorate={this.state.governorate}
					neighbourhood={this.state.neighbourhood}
					block={this.state.block}
					street={this.state.street}
					house={this.state.house}
					current_location={this.props.current_location}
					allow_autodetect={false}
					governorate_lookup={true}
				/>
				<ListSubheader>Quick assign</ListSubheader>
				<Divider />
				<FormControl className={classes.formControl}>
					<InputLabel shrink={true} htmlFor="txt-agentname">Agent Name</InputLabel>
					<Select
						fullwidth
						value={this.state.agent_id}
						onChange={(event) => this.setState({ agent_id: event.target.value })}
						inputProps={{
							name: 'agent',
							id: 'txt-agentname'
						}}
					>
						<MenuItem value="0">
							<em>Unassigned</em>
						</MenuItem>
						{this.props.agents
							.filter(agent => { return (agents.getAgentAvailability(agent) !== 'inactive') && agent.provider_id === this.props.provider_id })
							.map((agent, i) => {
								return <MenuItem value={agent.id} key={i}>{agent.first_name + ' ' + agent.last_name}</MenuItem>
							})};
                    </Select>
				</FormControl>
				<br />
				<Divider />
				<Tooltip id="tooltip-icon" title="Create Order" placement="bottom">
					<Button fullWidth variant="flat"   size="large" onClick={this.handleSubmitClick}>Create Order</Button>
				</Tooltip>
			</div>
		);
	}
}

export default withStyles(styles)(ManualTask);
