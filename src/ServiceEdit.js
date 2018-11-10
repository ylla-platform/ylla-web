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
import Divider from '@material-ui/core/Divider';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

// Material icons
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

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
	list: {
		maxWidth: 350
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

// Class: ServiceEdit
class ServiceEdit extends React.Component {

	// constructor: 
	constructor(props) {
		super(props);
		this.state = {
			// Dialog functions
			open: false,
			service: this.props.service,
			// Fields
			title: (this.props.service && this.props.service.title ? this.props.service.title : ''),
			provider_card: (this.props.service && this.props.service.provider_card ? this.props.service.provider_card : ''),
			grouping: (this.props.service && this.props.service.grouping ? this.props.service.grouping : ''),
			keywords: (this.props.service && this.props.service.keywords ? this.props.service.keywords : []),
			categories: (this.props.service && this.props.service.categories ? this.props.service.categories : []),
			service_function: (this.props.service && this.props.service.service_function ? this.props.service.service_function : ''),
			date_required: (this.props.service && this.props.service.date_required && this.props.service.date_required === true ? true : false),
			start_time_required: (this.props.service && this.props.service.start_time_required && this.props.service.start_time_required === true ? true : false),
			end_time_required: (this.props.service && this.props.service.end_time_required && this.props.service.end_time_required === true ? true : false),
			agent_required_by: (this.props.service && this.props.service.agent_required_by ? this.props.service.agent_required_by : ''),
			price_required: (this.props.service && this.props.service.price_required && this.props.service.price_required === true ? true : false),
			price_description: (this.props.service && this.props.service.price_description ? this.props.service.price_description : ''),
			agent_term: (this.props.service && this.props.service.agent_term ? this.props.service.agent_term : ''),
			date_term: (this.props.service && this.props.service.date_term ? this.props.service.date_term : ''),
			start_time_term: (this.props.service && this.props.service.start_time_term ? this.props.service.start_time_term : ''),
			end_time_term: (this.props.service && this.props.service.end_time_term ? this.props.service.end_time_term : ''),
			location: (this.props.service && this.props.service.location ? this.props.service.location : []),
			location_terms: (this.props.service && this.props.service.location_terms ? this.props.service.location_terms : {}),
			statuses: (this.props.service && this.props.service.statuses ? this.props.service.statuses : [])
		};
	}

	// componentWillReceiveProps: set the services on receiving a state update from the parent
	componentWillReceiveProps = (nextProps) => {
		if (nextProps.service === this.state.service) {
			this.setState({ open: nextProps.open });
		} else {
			this.setState({
				open: nextProps.open,
				service: nextProps.service,
				title: (nextProps.service && nextProps.service.title ? nextProps.service.title : ''),
				provider_card: (nextProps.service && nextProps.service.provider_card ? nextProps.service.provider_card : ''),
				grouping: (nextProps.service && nextProps.service.grouping ? nextProps.service.grouping : ''),
				keywords: (nextProps.service && nextProps.service.keywords ? nextProps.service.keywords : []),
				categories: (nextProps.service && nextProps.service.categories ? nextProps.service.categories : []),
				service_function: (nextProps.service && nextProps.service.service_function ? nextProps.service.service_function : ''),
				date_required: (nextProps.service && nextProps.service.date_required && nextProps.service.date_required === true ? true : false),
				agent_required_by: (nextProps.service && nextProps.service.agent_required_by ? nextProps.service.agent_required_by : ''),
				price_required: (nextProps.service && nextProps.service.price_required && nextProps.service.price_required === true ? true : false),
				start_time_required: (nextProps.service && nextProps.service.start_time_required && nextProps.service.start_time_required === true ? true : false),
				end_time_required: (nextProps.service && nextProps.service.end_time_required && nextProps.service.end_time_required === true ? true : false),
				price_description: (nextProps.service && nextProps.service.price_description ? nextProps.service.price_description : ''),
				agent_term: (nextProps.service && nextProps.service.agent_term ? nextProps.service.agent_term : ''),
				date_term: (nextProps.service && nextProps.service.date_term ? nextProps.service.date_term : ''),
				start_time_term: (nextProps.service && nextProps.service.start_time_term ? nextProps.service.start_time_term : ''),
				end_time_term: (nextProps.service && nextProps.service.end_time_term ? nextProps.service.end_time_term : ''),
				location: (nextProps.service && nextProps.service.location ? nextProps.service.location : []),
				location_terms: (nextProps.service && nextProps.service.location_terms ? nextProps.service.location_terms : {}),
				statuses: (nextProps.service && nextProps.service.statuses ? nextProps.service.statuses : [])
			});
		}
	}

	// handleChangeQuestionOrder: 
	handleChangeQuestionOrder = (id, direction) => {
		let service = this.state.service;
		let fields = this.state.service.fields;
		let from = id;
		let to = from + direction;
		fields.splice(to, 0, fields.splice(from, 1)[0]);
		service.fields = fields;
		this.setState({ service: service });
	}

	// handleUpdateLocationTerm: 
	handleUpdateLocationTerm = (loc, event) => {
		let location_terms = this.state.location_terms;
		location_terms[loc] = event.target.value;
		this.setState({ location_terms: location_terms });
	}

	// handleSave: 
	handleSave = () => {
		var service = this.state.service;
		service.provider_card = this.state.provider_card;
		service.location = this.state.location;
		service.location_terms = this.state.location_terms;
		if (!service.fields) service.fields = [];
		if (this.props.service && this.props.service.fields) service.fields = this.props.service.fields
		service.price_required = this.state.price_required;
		service.agent_required_by = this.state.agent_required_by;
		service.date_required = this.state.date_required;
		service.start_time_required = this.state.start_time_required;
		service.end_time_required = this.state.end_time_required;
		service.price_description = this.state.price_description;
		service.agent_term = this.state.agent_term;
		service.date_term = this.state.time_term;
		service.start_time_term = this.state.start_time_term;
		service.end_time_term = this.state.end_time_term;
		service.title = this.state.title;
		service.grouping = this.state.grouping;
		service.keywords = this.state.keywords;
		service.categories = this.state.categories;
		service.service_function = this.state.service_function;
		service.statuses = this.state.statuses;
		this.props.saveService(service);
	}

	// render: 
	render() {
		const { classes } = this.props;
		const categoryTitles = {};
		this.props.categories.forEach(category => {
			categoryTitles[category.system_name] = category.title;
		});
		return (
			<div>
				<Dialog
					open={this.state.open}
					onRequestClose={this.props.serviceEditDialogClose}
				>
					<DialogTitle>{this.props.service && this.props.service.id ? 'Edit service' : 'Add service'}</DialogTitle>
					<DialogContent>
						<FormControl className={classes.formControl}>
							<TextField
								autoFocus
								margin="dense"
								id="txt-title"
								label="Title"
								value={this.state.title}
								onChange={(event) => this.setState({ title: event.target.value })}
								type="text"
								InputProps={{
									name: 'txt-title',
									id: 'txt-title',
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
						<br />
						<FormControl className={classes.formControl}>
							<TextField
								autoFocus
								margin="dense"
								id="txt-keywords"
								label="Keywords (separated by |)"
								value={this.state.keywords ? this.state.keywords.join('|') : ''}
								onChange={(event) => this.setState({ keywords: event.target.value.split('|') })}
								type="text"
								InputProps={{
									name: 'sel-category',
									id: 'sel-category',
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
						<br />
						<FormControl className={classes.formControl}>
							<InputLabel htmlFor="sel-categories">Categories</InputLabel>
							<Select
								multiple
								value={this.state.categories}
								onChange={(event) => this.setState({ categories: event.target.value })}
								input={<Input id="sel-categories" />}
								renderValue={selected => (
									<div className={classes.chips}>
										{selected.map(value => <Chip key={value} label={categoryTitles[value]} className={classes.chip} />)}
									</div>
								)}
								MenuProps={MenuProps}
							>
								{this.props.categories
									.sort((a, b) => {
										return a.title < b.title
									})
									.map((category, key) => {
										return (
											<MenuItem key={'mnu-' + key} value={category.system_name}>
												<Checkbox checked={this.state.categories.indexOf(category.system_name) > -1} />
												<ListItemText primary={category.title} />
											</MenuItem>
										)
									})}
							</Select>
							<FormHelperText>Select the categories for this service</FormHelperText>
						</FormControl>
						<br />
						<FormControl className={classes.formControl}>
							<TextField
								select
								label="Service function"
								value={this.state.service_function}
								onChange={(event) => this.setState({ service_function: event.target.value })}
								input={<Input name="sel-servicefunction" id="sel-servicefunction" />}
								InputProps={{
									name: 'sel-servicefunction',
									id: 'sel-servicefunction',
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
								<MenuItem value="book">Book</MenuItem>
								<MenuItem value="findapro">Find a Pro</MenuItem>
								<MenuItem value="reserve">Reserve</MenuItem>
								<MenuItem value="order">Order</MenuItem>
							</TextField>
						</FormControl>
						<br />
						<FormControl className={classes.formControl}>
							<TextField
								select
								value={this.state.provider_card}
								label="Provider card style"
								onChange={(event) => this.setState({ provider_card: event.target.value })}
								input={<Input name="sel-providercard" id="sel-providercard" />}
								InputProps={{
									name: 'sel-providercard',
									id: 'sel-providercard',
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
								<MenuItem value="detail">Detail</MenuItem>
								<MenuItem value="image">Image</MenuItem>
							</TextField>
						</FormControl>
						<br />
						<FormControl className={classes.formControl}>
							<TextField
								select
								label="Date required"
								value={this.state.date_required && this.state.date_required === true ? 'yes' : 'no'}
								onChange={(event) => this.setState({ date_required: (event.target.value === 'no' ? false : true) })}
								input={<Input name="sel-daterequired" id="sel-daterequired" />}
								InputProps={{
									name: 'sel-daterequired',
									id: 'sel-daterequired',
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
								<MenuItem value="no">No</MenuItem>
								<MenuItem value="yes">Yes</MenuItem>
							</TextField>
						</FormControl>
						<br />
						<FormControl className={classes.formControl}>
							<TextField
								autoFocus
								margin="dense"
								id="txt-dateterm"
								label="Date description"
								value={this.state.date_term}
								onChange={(event) => this.setState({ date_term: event.target.value })}
								type="text"
								InputProps={{
									name: 'sel-dateterm',
									id: 'sel-dateterm',
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
						<br />
						<FormControl className={classes.formControl}>
							<TextField
								select
								label="Start time required"
								value={this.state.start_time_required && this.state.start_time_required === true ? 'yes' : 'no'}
								onChange={(event) => this.setState({ start_time_required: (event.target.value === 'no' ? false : true) })}
								input={<Input name="sel-starttimerequired" id="sel-starttimerequired" />}
								InputProps={{
									name: 'sel-starttimerequired',
									id: 'sel-starttimerequired',
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
								<MenuItem value="no">No</MenuItem>
								<MenuItem value="yes">Yes</MenuItem>
							</TextField>
						</FormControl>
						<br />
						<FormControl className={classes.formControl}>
							<TextField
								autoFocus
								margin="dense"
								id="txt-timeterm"
								label="Start time description"
								value={this.state.time_term}
								onChange={(event) => this.setState({ start_time_term: event.target.value })}
								type="text"
								InputProps={{
									name: 'txt-timeterm',
									id: 'txt-starttimerequired',
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
						<br />
						<FormControl className={classes.formControl}>
							<TextField
								select
								label="End time required"
								value={this.state.end_time_required && this.state.end_time_required === true ? 'yes' : 'no'}
								onChange={(event) => this.setState({ end_time_required: (event.target.value === 'no' ? false : true) })}
								input={<Input name="sel-endtimerequired" id="sel-endtimerequired" />}
								InputProps={{
									name: 'sel-endtimerequired',
									id: 'sel-endtimerequired',
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
								<MenuItem value="no">No</MenuItem>
								<MenuItem value="yes">Yes</MenuItem>
							</TextField>
						</FormControl>
						<br />
						<FormControl className={classes.formControl}>
							<TextField
								autoFocus
								margin="dense"
								id="txt-endtimeterm"
								label="End time description"
								value={this.state.end_time_term}
								onChange={(event) => this.setState({ end_time_term: event.target.value })}
								type="text"
								InputProps={{
									name: 'txt-endtimeterm',
									id: 'txt-endtimeterm',
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
						<br />
						<FormControl className={classes.formControl}>
							<TextField
								select
								label="Price required"
								value={this.state.price_required && this.state.price_required === true ? 'yes' : 'no'}
								onChange={(event) => this.setState({ price_required: (event.target.value === 'no' ? false : true) })}
								input={<Input name="sel-pricerequired" id="sel-pricerequired" />}
								InputProps={{
									name: 'sel-pricerequired',
									id: 'sel-pricerequired',
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
								<MenuItem value="no">No</MenuItem>
								<MenuItem value="yes">Yes</MenuItem>
							</TextField>
						</FormControl>
						<br />
						<FormControl className={classes.formControl}>
							<TextField
								autoFocus
								margin="dense"
								id="txt-pricedescription"
								label="Price description"
								value={this.state.price_description}
								onChange={(event) => this.setState({ price_description: event.target.value })}
								type="text"
								InputProps={{
									name: 'txt-pricedescription',
									id: 'txt-pricedescription',
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
						<br />
						<FormControl className={classes.formControl}>
							<TextField
								select
								label="Agent required By"
								value={this.state.agent_required_by}
								onChange={(event) => this.setState({ agent_required_by: event.target.value })}
								input={<Input name="sel-agentrequired" id="sel-agentrequired" />}
								InputProps={{
									name: 'sel-agentrequired',
									id: 'sel-agentrequired',
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
								<MenuItem value="">No agent required</MenuItem>
								<MenuItem value="consumer">Consumer</MenuItem>
								<MenuItem value="provider">Provider</MenuItem>
							</TextField>
						</FormControl>
						<br />
						<FormControl className={classes.formControl}>
							<TextField
								autoFocus
								margin="dense"
								id="txt-agentterm"
								label="Agent description"
								value={this.state.agent_term}
								onChange={(event) => this.setState({ agent_term: event.target.value })}
								type="text"
								InputProps={{
									name: 'txt-agentterm',
									id: 'txt-agentterm',
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
						<br />
						<FormControl className={classes.formControl}>
							<InputLabel htmlFor="sel-location">Location</InputLabel>
							<Select
								multiple
								value={this.state.location}
								onChange={(event) => this.setState({ location: event.target.value })}
								input={<Input id="select-multiple-checkbox" />}
								renderValue={selected => (
									<div className={classes.chips}>
										{selected.map(value => <Chip key={value} label={value} className={classes.chip} />)}
									</div>
								)}
								MenuProps={MenuProps}
							>
								{['provider', 'consumer', 'custom'].map(location => {
									return (
										<MenuItem key={location} value={location}>
											<Checkbox checked={this.state.location.indexOf(location) > -1} />
											<ListItemText primary={location} />
										</MenuItem>
									)
								})}
							</Select>
						</FormControl>
						<br />
						{this.state.location.map(loc => { // For each location, give the option for a label
							return (
								<FormControl className={classes.formControl}>
									<TextField
										autoFocus
										margin="dense"
										id={'txt_location_' + loc}
										label={loc + ' location description'}
										value={this.state.location_terms[loc]}
										onChange={this.handleUpdateLocationTerm.bind(this, loc)}
										type="text"
										InputProps={{
											name: 'txt_location_' + loc,
											id: 'txt_location_' + loc,
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
							)
						})}
						<br />
						<ListSubheader>Question order</ListSubheader>
						<Divider />
						<List dense="true" className={classes.list}>
							{this.state.service.fields ?
								this.state.service.fields.map((field, i) => {
									return (
										<ListItem>
											{i !== 0 ?
												<ListItemIcon>
													<IconButton aria-label="Up" onClick={this.handleChangeQuestionOrder.bind(this, i, -1)}>
														<KeyboardArrowUpIcon />
													</IconButton>
												</ListItemIcon> : null}
											<ListItemText
												primary={field.title}
											/>
											<ListItemSecondaryAction>
												{i !== (this.state.service.fields.length - 1) ?
													<IconButton aria-label="Down" onClick={this.handleChangeQuestionOrder.bind(this, i, 1)}>
														<KeyboardArrowDownIcon />
													</IconButton> : null}
											</ListItemSecondaryAction>
										</ListItem>
									)
								}) : null
							}
						</List>
					</DialogContent>
					<DialogActions>
						<Button onClick={this.handleSave}>Save</Button>
						<Button onClick={this.props.serviceEditDialogClose} autoFocus>Cancel</Button>
					</DialogActions>
				</Dialog>
			</div>
		);
	}
}

// 
ServiceEdit.propTypes = {
	fullScreen: PropTypes.bool.isRequired,
};

export default withStyles(styles)(ServiceEdit);