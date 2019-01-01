// Import Core
import classNames from 'classnames';
import Lightbox from 'react-image-lightbox';
import moment from 'moment';
import React, { Component } from 'react';

// Material UI
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import LinearProgress from '@material-ui/core/LinearProgress';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListSubheader from '@material-ui/core/ListSubheader';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Radio from '@material-ui/core/Radio';
import { withStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

// Material UI Icons
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import BusinessIcon from '@material-ui/icons/Business';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import EventIcon from '@material-ui/icons/Event';
import FilterIcon from '@material-ui/icons/Filter';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import SortIcon from '@material-ui/icons/Sort';

// Sub components
import ProfileAddress from './ProfileAddress';
import ProviderCardDetail from './ProviderCardDetail';
import ProviderCardImage from './ProviderCardImage';
import RequestTaskQuestions from './RequestTaskQuestions';

import * as agentHelper from './actions/agents';
import * as providerHelper from './actions/providers';
import * as serviceHelper from './actions/services';

// Styles: 
const styles = theme => ({
	actions: {
		display: 'flex',
	},
	appBar: {
		textAlign: 'center',
		borderBottom: '1px solid #B3B3B3',
		backgroundColor: '#F9F9F9',
		padding: 10,
		top: 62
	},
	avatar: {
		margin: 10
	},
	bigAvatar: {
		width: 60,
		height: 60
	},
	button: {
		margin: theme.spacing.unit,
	},
	card: {
		maxWidth: 400,
		backgroundColor: theme.palette.sidebar_background.main
	},
	categoryHeading: {
		fontSize: '1rem',
		fontFamily: "'Montserrat', sans-serif",
		fontWeight: 700,
		textTransform: 'uppercase',
		letterSpacing: '1px',
		cursor: 'pointer'
	},
	content: {
		padding: 10
	},
	formControl: {
		margin: theme.spacing.unit,
		minWidth: 300
	},
	menuList: {
		maxHeight: 300
	},
	radioLabel: {
		fontSize: '1rem',
		fontFamily: "'Montserrat', sans-serif",
		fontWeight: 700,
		textTransform: 'uppercase',
		letterSpacing: '1px',
		margin: 0,
	},
	root: {
		width: '100%',
		height: '100%',
		zIndex: 100
	},
	serviceHeading: {
		fontSize: '0.9rem',
		fontFamily: "'Montserrat', sans-serif",
		letterSpacing: '1px',
		cursor: 'pointer'
	},
	tab: {
		minWidth: 30
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
		},
	},
	textFieldFormLabel: {
		fontSize: 18,
	},
	title: {
		fontSize: '1.2rem',
		fontFamily: "'Montserrat', sans-serif",
		fontWeight: 700,
		textTransform: 'uppercase',
		letterSpacing: '1px',
		textAlign: 'center',
		margin: 'auto',
		color: 'black'
	}
});

const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

// Class: RequestTask.
class RequestTask extends Component {

	// constructor: call super, set up state, and handler bindings
	constructor(props) {
		super(props);

		// Set the provider distances
		let providers = this.props.providers;
		providers.forEach(provider => {
			provider.distance = providerHelper.getProviderDistance(provider, this.props.current_location);
		});

		// Group the services into categories.
		let services_grouped = serviceHelper.groupServices(this.props.services);

		// Can skip the first stage if we either are passed a service or there is only one available.
		let stage = 1;
		let service = (
			this.props.service && Object.keys(this.props.service).length > 0 ?
				this.props.service : // If we pass in a service, this is the one that gets used.
				(
					this.props.services.length === 1 ? // Else if there is only one available, we use that one
						this.props.services[0] : {} // Else we will use the service selector.
				)
		);
		if (Object.keys(service).length > 0) stage = 2;

		this.state = {
			stage: stage,
			service_function: this.props.service_function,
			service: service,
			service_id: (service && service.id ? service.id : ''),
			provider: (this.props.provider && Object.keys(this.props.provider).length > 0 ? this.props.provider : {}),
			provider_id: (this.props.provider && Object.keys(this.props.provider).length > 0 && this.props.provider.id !== '' ? this.props.provider.id : ''),
			agent: {},
			agent_id: '',
			date: (this.props.date && this.props.date !== '' ? this.props.date : ''),
			providers: providers,
			// Service address and location fields.
			address: '', location: [], governorate: '', neighbourhood: '', block: '', street: '', house: '',
			custom_address: '', custom_location: [], custom_governorate: '', custom_neighbourhood: '', custom_block: '', custom_street: '', custom_house: '',
			// Validation for date and time.
			invalid_date: false,
			invalid_start: false,
			invalid_end: false,
			end: '',
			// The service answers.
			answers: {},
			session: '',
			// UI requirements. Grouped services
			services_grouped: services_grouped,
			selected_category: '',
			selected_grouping: '',
			available_dates: (this.props.provider && Object.keys(this.props.provider).length > 0 ? providerHelper.getProviderServiceBookingDates(this.props.provider, this.props.service) : []),
			available_starts: (this.props.provider && this.props.date && Object.keys(this.props.provider).length > 0 && this.props.date !== '' ? providerHelper.getProviderServiceBookingHours(this.props.date, this.props.provider, this.props.service.system_name) : []),
			start: (this.props.start && this.props.start !== '' ? this.props.start : ''),
			available_ends: [],
			provider_sort: 'provider_distance',
			provider_sort_menu: false,
			provider_sort_menu_anchor: null,
			selected_provider: {},
			lightbox_index: 0,
			lightbox: false,
			lightbox_images: [],
			price: 0,
			provider_searchfilter: '',
			request_complete: false,
			current_item_tab: 0,
			// We have a progress bar which counts down
			reservation_progress: 0,
			timer_interval: 0,
			seconds: 300,
			question_filter: false,
			preferred_location: ''
		};
	}

	// countdown: counts down the stored timer.
	countdown = () => {
		let seconds = this.state.seconds - 1;
		if (seconds === 0) { // Clear down.
			clearInterval(this.state.timer_interval);
			this.setState({ start: '', end: '', date: '', seconds: 300, timer_interval: 0 });
		} else { // Carry on counting down.
			this.setState({ seconds: seconds });
		}
	}

	// startTimer: trigger the countdown timer. Set up interval.
	startTimer = () => {
		if (this.state.timer_interval === 0) {
			let interval = setInterval(this.countdown, 1000);
			this.setState({ timer_interval: interval });
		}
	}

	// setBookingDays: sets the available dates for the provider and service.
	setBookingDays = (prov, service) => {
		if (prov && service) {
			let booking_days = providerHelper.getProviderServiceBookingDates(prov, service);
			this.setState({ available_dates: booking_days });
		}
	}

	// setBookingHours: 
	setBookingHours = (date, prov, service_name) => {
		let times = providerHelper.getProviderServiceBookingHours(date, prov, service_name);
		this.setState({ available_starts: times, available_ends: times });
	}

	// checkProviderDistance: If the provider distance is under the acepted distance return true.
	checkProviderDistance = (provider) => {
		let accepted_distance = providerHelper.getProviderAcceptedDistance(provider);
		return (accepted_distance === 0 || accepted_distance <= provider.distance);
	}

	/////////////////////////////////////////////////////
	// Stage Handlers
	/////////////////////////////////////////////////////

	// selectService: Stage 1. Select the service and set it in state
	selectService = (service) => {

		// Set the provider next available dates.
		let providers = this.state.providers;
		providers.forEach(provider => {
			provider.next_available = providerHelper.getProviderNextAvailable(provider, service);
		});

		this.setState({ providers: providers, service_id: service.id, service: service, stage: 2 });
	}

	// selectProvider: Stage 2. Select the provider and set it in state
	selectProvider = (provider) => {
		let stage = 6;

		if (!this.state.service.date_required) {
			stage = 8;
			if (this.state.service.agent_required_by === 'consumer') stage = 7;
		}

		// Or go to the product list
		let product_questions = false;
		this.state.service.fields.forEach(field => {
			if (field.provider_options) product_questions = true;
		});
		if (product_questions) stage = 5;

		// Or select a department if applicable
		if (provider.departments &&
			provider.departments.length) stage = 4;

		this.setBookingDays(provider, this.state.service);
		this.setState({ provider_id: provider.id, provider: provider, stage: stage });
	}

	// selectDepartment: Stage 4. Select a department
	selectDepartment = (e) => {
		let stage = 6;

		if (!this.state.service.date_required) {
			stage = 8;
			if (this.state.service.agent_required_by === 'consumer') stage = 7;
		}

		// Or go to the product list
		let product_questions = false;
		this.state.service.fields.forEach(field => {
			if (field.provider_options) product_questions = true;
		});
		if (product_questions) stage = 5;

		var answers = this.state.answers;
		answers['Department'] = e.target.value;
		this.setState({ answers: answers, stage: stage });
	}

	// selectProduct: Stage 5. Select product options.
	selectProduct = () => {
		let stage = 8;

		if (this.state.service.agent_required_by === 'consumer') stage = 7;
		if (this.state.service.date_required) stage = 6;

		this.setState({ stage: stage });
	}

	// selectDate: Stage 6. The user selects a date and we check the provider supports it.
	selectDate = (event) => {
		if (providerHelper.checkProviderServiceDate(this.state.service, this.state.provider, new Date(event.target.value))) {
			this.setState({ invalid_date: false, date: event.target.value });
			this.setBookingHours(event.target.value, this.state.provider, this.state.service.system_name);
		} else {
			this.setState({ invalid_date: true });
		}
	}

	// selectStartTime: Stage 6. We need to check that the service provider supports appointments at that time
	selectStartTime = (event) => {

		let date_selected = new Date(this.state.date);
		let day_number = date_selected.getDay();
		let day = days[day_number];
		let service_name = this.state.service.system_name;
		let session_choice = '';

		// Check the day is OK
		if (this.state.provider.service_booking_days && this.state.provider.service_booking_days[service_name] && this.state.provider.service_booking_days[service_name][day]) {
			// See which session
			let found_session = false;
			Object.keys(this.state.provider.service_booking_days[service_name][day]).forEach(session => {
				if (this.state.provider.service_booking_days[service_name][day][session].start <= event.target.value
					&& this.state.provider.service_booking_days[service_name][day][session].end >= event.target.value) {
					found_session = true;
					session_choice = session;
				}
			});
			if (found_session) {
				this.setState({ is_valid_start: true, start: event.target.value, session: session_choice });
			} else {
				this.setState({ is_valid_start: false });
			}
		} else {
			this.setState({ is_valid_start: false, session: session_choice });
		}
	}

	// selectEndTime: Stage 6. User selects an end time and we check it is supported.
	selectEndTime = (event) => {

		let date_selected = new Date(this.state.date);
		let day_number = date_selected.getDay();
		let day = days[day_number];
		let service_name = this.state.service.system_name;

		if (this.state.provider.service_booking_days && this.state.provider.service_booking_days[service_name] && this.state.provider.service_booking_days[service_name][day]) {
			if (this.state.provider.service_booking_days[service_name][day][this.state.session].end >= event.target.value) {
				this.setState({ is_valid_end: true, end: event.target.value });
			} else {
				this.setState({ is_valid_end: false });
			}
		} else {
			this.setState({ is_valid_end: false });
		}
	}

	// selectTimeslot: Stage 6. Confirm the date and time selected
	selectTimeslot = () => {
		let stage = 8;
		if (this.state.service.agent_required_by === 'consumer') stage = 7;
		this.setState({ stage: stage });
	}

	// selectAgent: Stage 7. Select the agent and set in state.
	selectAgent = (agent) => {
		this.setState({ agent_id: agent.id, agent: agent, stage: 8 });
	}

	// selectAddress: Stage 8.
	selectAddress = (type) => {
		if (type === 'custom') {
			this.setState({
				address: this.state.custom_address,
				location: this.state.custom_location,
				governorate: this.state.custom_governorate,
				neighbourhood: this.state.custom_neighbourhood,
				block: this.state.custom_block,
				street: this.state.custom_street,
				house: this.state.custom_house,
				stage: 9
			});
		}
		if (type === 'provider') {
			this.setState({ address: this.state.provider.addresses[0].address, location: this.state.provider.addresses[0].location, stage: 9 });
		}
		if (type === 'consumer') {
			this.setState({ address: this.props.user.address, location: this.props.user.location, stage: 9 });
		}
	}

	// confirm: 
	confirm = () => {

		// Need to build up a proper single timestamp before creating the task.
		let start_date_time = this.state.date;
		if (this.state.start !== '') start_date_time = start_date_time + ' ' + this.state.start;

		var data = {
			service_id: this.state.service_id,
			provider_id: this.state.provider_id,
			agent_id: (this.state.agent_id !== 'None' ? this.state.agent_id : 0),
			location: this.state.location,
			address: this.state.address,
			answers: this.state.answers,
			start_date_time: moment(start_date_time).format(),
			end_date_time: this.state.end,
			price: this.state.price
		};

		// Clear down data and create the task
		this.setState({ answers: {}, agent_id: '', provider: {}, agent: {}, service: {}, service_id: '', provider_id: '', date: '', start: '', end: '', address: '', location: [] });
		this.props.createTask(data);
	}

	// back: go back between steps
	back = () => {

		if (this.state.stage === 2) { // Move from providers to services
			this.setState({ stage: 1 });
		}

		if (this.state.stage === 3) { // Move from filter to providers
			this.setState({ stage: 2 });
		}

		if (this.state.stage === 4) { // Move from department to providers
			this.setState({ stage: 2 });
		}

		if (this.state.stage === 5) { // Move from product questions to department or providers

			let stage = 2;
			if (this.state.provider.departments &&
				this.state.provider.departments.length) stage = 4;

			this.setState({ stage: stage });
		}

		if (this.state.stage === 6) { // Move from timeslot to product questions, or department, or providers
			let stage = 2;

			if (this.state.provider.departments &&
				this.state.provider.departments.length) stage = 4;

			let product_questions = false;
			this.state.service.fields.forEach(field => {
				if (field.provider_options) product_questions = true;
			});

			if (product_questions) stage = 5;

			this.setState({ stage: stage });
		}

		if (this.state.stage === 7) { // Move from agent to timeslot
			// Normally we'll go back to the timeslot
			let stage = 6;
			if (!this.state.service.date_required) stage = 2;
			if (this.state.provider.departments &&
				this.state.provider.departments.length) stage = 4;
			let product_questions = false;
			this.state.service.fields.forEach(field => {
				if (field.provider_options) product_questions = true;
			});
			if (product_questions) stage = 5;

			this.setState({ stage: stage });
		}

		if (this.state.stage === 8) { // Move from location to agent or timeslot

			// Normally we'll go back to the timeslot

			let stage = 6;
			if (!this.state.service.date_required) stage = 2;

			if (this.state.provider.departments &&
				this.state.provider.departments.length) stage = 4;

			let product_questions = false;
			this.state.service.fields.forEach(field => {
				if (field.provider_options) product_questions = true;
			});


			if (product_questions) stage = 5;

			if (this.state.service.agent_required_by === 'consumer') stage = 7;
			this.setState({ stage: stage });
		}

		if (this.state.stage === 9) { // Move from confirmation to location
			this.setState({ stage: 8 });
		}

	}

	// handleChangeAnswer: To handle changes to the answer object.
	handleChangeAnswer = (question, event) => {
		var answers = this.state.answers;
		answers[question] = event.target.value;
		this.setState({ answers: answers });
	}

	// handleAddProviderOption:To handle additions to the answer object for provider set questions
	handleAddProviderOption = (question, description, price, event) => {
		let answers = this.state.answers;
		if (!answers[question]) answers[question] = {};
		if (!answers[question][description]) answers[question][description] = { quantity: 0, price: price };
		answers[question][description].quantity++;
		let total_price = this.state.price;
		if (price && price !== 0 && price !== '') total_price = parseFloat(total_price) + parseFloat(price);
		this.setState({ answers: answers, price: total_price.toFixed(2) });
	}

	// handleRemoveProviderOption: To handle removing from the answer object for provider set questions
	handleRemoveProviderOption = (question, description, price, event) => {
		let answers = this.state.answers;
		if (!answers[question]) return;
		if (!answers[question][description]) return;
		answers[question][description].quantity--;
		if (answers[question][description].quantity === 0) delete answers[question][description];
		let total_price = this.state.price;
		if (price && price !== 0 && price !== '') total_price = parseFloat(total_price) - parseFloat(price);
		this.setState({ answers: answers, price: total_price.toFixed(2) });
	}

	// handleCancel: Cancelling out of the request process 
	handleCancel = (event) => {
		if (this.state.start === '') {
			this.setState({
				service_id: '', provider_id: '', agent_id: '', date: '', address: '', location: [],
				invalid_date: false, start: '', invalid_start: false, end: '',
				invalid_end: false, answers: {}, service: {}, provider: {}, agent: {}
			})
			this.props.cancel();
		} else {
			this.setState({ start: '', end: '', date: '', seconds: 300, timer_interval: 0 });
		}
	}

	// checkAgentAvailable: 
	checkAgentAvailable = (agent) => {
		return agentHelper.checkAgentAvailableProviderServiceDateTime(agent, this.state.provider_id, this.state.service.system_name, this.state.date, this.state.start, this.state.end);
	}

	// checkAgentDepartment:
	checkAgentDepartment = (agent) => {
		let department_check = false;
		if (!this.state.provider.departments
			|| this.state.provider.departments.length === 0) {
			department_check = true;
		}

		if (!this.state.answers['Department'] || this.state.answers['Department'] === '') department_check = true;

		// Check the agent
		if (this.state.provider.departments
			&& this.state.provider.departments.length > 0
			&& agent.departments
			&& agent.departments.length > 0
			&& this.state.answers
			&& this.state.answers['Department']
			&& this.state.answers['Department'] !== '') {
			agent.departments.forEach(department => {
				if (department === this.state.answers['Department']) department_check = true;
			});
		}
		return department_check;
	}

	// handleSetAddress:
	handleSetAddress = (location, address, fields) => {
		this.setState({
			custom_address: address,
			custom_location: location,
			custom_governorate: fields.governorate,
			custom_neighbourhood: fields.neighbourhood,
			custom_block: fields.block,
			custom_street: fields.street,
			custom_house: fields.house
		});
	}

	// handleSetAddressFilter: 
	handleSetAddressFilter = (location, address, fields) => {
		let providers = this.state.providers;
		providers.forEach(provider => {
			provider.distance = providerHelper.getProviderDistance(provider, location);
		});
		this.setState({ location_filter: location, address_filter: address, providers: providers });
	}

	// render: render the component
	render() {
		const { classes } = this.props;
		const self = this;
		const { lightbox, lightbox_index } = this.state;
		return (
			<div className={classes.root}>
				<Menu // Menu used to sort providers
					id="menu-providersort"
					anchorEl={this.state.provider_sort_menu_anchor}
					open={this.state.provider_sort_menu}
					onClose={() => this.setState({ provider_sort_menu: false })}
				>
					<MenuItem onClick={() => this.setState({ provider_sort_menu: false, provider_sort: 'provider_distance' })}>Distance</MenuItem>
					<MenuItem onClick={() => this.setState({ provider_sort_menu: false, provider_sort: 'provider_date' })}>Date available</MenuItem>
					<MenuItem onClick={() => this.setState({ provider_sort_menu: false, provider_sort: 'provider_name' })}>Name</MenuItem>
				</Menu>
				<AppBar position="sticky" elevation={0} className={classes.appBar}>
					<Toolbar disableGutters={true}>
						<Typography variant="title" color="inherit" className={classes.title}>{this.state.stage === 1 ? this.props.title : this.state.service.title}</Typography>
						{
							this.state.stage === 1 ?
								<IconButton color="default" aria-label="Menu" onClick={() => this.props.close()}>
									<svg width='20'
										fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="1.414" clip-rule="evenodd" viewBox="0 0 28 28">
										<g fill="#313131" fill-rule="nonzero" stroke="#313131" stroke-width=".3">
											<path d="M8.893 10.36a1.037 1.037 0 0 0 1.471 0 1.042 1.042 0 0 0 0-1.472L2.043.559a1.04 1.04 0 1 0-1.47 1.472l8.32 8.329zM15.26 13.788L27.008 2.031a1.042 1.042 0 0 0 0-1.472c-.407-.407-1.065-.586-1.471-.179L13.055 12.694h-.309v.36L.419 25.546c-.406.406-.329 1.065.076 1.472.203.204.508.305.774.305.267 0 .552-.101.755-.305L13.78 15.261l11.751 11.758a1.041 1.041 0 0 0 1.474 0 1.04 1.04 0 0 0 .001-1.472L15.26 13.788z" />
										</g>
									</svg>
								</IconButton> :
								<IconButton color="default" aria-label="Menu" onClick={() => this.back()}>
									<ArrowBackIcon />
								</IconButton>
						}
					</Toolbar>
				</AppBar>
				<div className={classes.content}>
					{this.state.stage === 1 ? // Stage 1: List categories and services
						<div>
							{Object.keys(this.state.services_grouped).sort().map((key, i) => { // Show categories
								let title = '';
								this.props.categories.forEach(cat => {
									if (cat.system_name === key) title = cat.title;
								});
								return (
									<div>
										<Typography
											variant="subheading"
											className={classes.categoryHeading}
											onClick={() => this.setState({ selected_category: key, selected_grouping: '' })}>
											{title}
										</Typography>
										{this.state.selected_category !== '' && this.state.selected_category === key ?
											(
												<div>
													{Object.keys(this.state.services_grouped[this.state.selected_category]).sort()
														.map((key, i) => { // Show any groupings
															return (key !== 'default' ?
																<Typography
																	className={classes.serviceHeading}
																	onClick={() => this.setState({ selected_grouping: key })}>
																	{key}
																</Typography> : null)
														})}
													{this.props.services
														.filter(s => {
															return s.categories.indexOf(this.state.selected_category) !== -1
																&& (!s.grouping || s.grouping === '')
														}).sort((a, b) => { return a.title.localeCompare(b.title) })
														.map(service => { // Show any services
															return (
																<Typography
																	className={classes.serviceHeading}
																	onClick={() => this.selectService(service)}>
																	{service.title}
																</Typography>)
														})}
													{this.props.services
														.filter(s => {
															return s.categories.indexOf(this.state.selected_category) !== -1
																&& s.grouping === this.state.selected_grouping
																&& s.grouping !== ''
														}).sort((a, b) => { return a.title.localeCompare(b.title) })
														.map(service => { // Show any services where the group is selected
															return (
																<Typography
																	className={classes.serviceHeading}
																	onClick={() => this.selectService(service)}>
																	{service.title}
																</Typography>)
														})}
												</div>
											) : null}


									</div>
								)
							})}
						</div> : null}
					{this.state.stage === 2 ? // Stage 2: Select a provider
						<div>
							<ProfileAddress // Show an address control for address searching.
								setAddress={this.handleSetAddressFilter}
								updateMapLocation={this.props.updateMapLocation}
								updateMapBounds={this.props.updateMapBounds}
								location={this.state.location_filter}
								address={this.state.address_filter}
								governorate={''}
								neighbourhood={''}
								block={''}
								street={''}
								house={''}
								current_location={this.state.location_filter}
								allow_autodetect={true}
								governorate_lookup={false}
							/>
							<Divider />
							{this.state.service.location.map(location_option => {
								return <FormControlLabel
									classes={{
										label: classes.radioLabel
									}}
									value={location_option}
									control={
										<Radio

											checked={this.state.preferred_location === location_option}
											onChange={(e) => this.setState({ preferred_location: e.target.value })}
											value={location_option} />
									}
									label={this.state.service.location_terms && this.state.service.location_terms[location_option] ? this.state.service.location_terms[location_option] : location_option} />
							})}
							<Divider />
							<Button className={classes.button} onClick={() => this.setState({ stage: 3 })}>
								<FilterIcon className={classes.leftIcon} />Filter
							</Button>
							<Button className={classes.button} onClick={(e) => this.setState({ provider_sort_menu: true, provider_sort_menu_anchor: e.currentTarget })}>
								Sort <SortIcon className={classes.rightIcon} />
							</Button>
							{this.state.providers
								.filter(provider => {
									return (
										provider.services &&
										provider.services.indexOf(self.state.service.system_name) !== -1 &&
										providerHelper.checkProviderMatchServiceAnswers(provider, this.state.service, this.state.answers) &&
										this.checkProviderDistance(provider)
									);
								}).length === 0 ? <Typography variant="body2">No providers available</Typography> : null}
							{this.state.providers // Loop through the providers
								.filter(provider => { // The provider must provide that service
									return (
										provider.services &&
										provider.services.indexOf(self.state.service.system_name) !== -1
										&& (
											provider.name.indexOf(self.state.provider_searchfilter) !== -1 ||
											self.state.provider_searchfilter === ''
										)
										&& providerHelper.checkProviderMatchServiceAnswers(provider, this.state.service, this.state.answers)
										&& this.checkProviderDistance(provider)
									);
								})
								.sort((a, b) => { // We use the sort menu to change sort options
									if (this.state.provider_sort === 'provider_date') return a.next_available - b.next_available;
									if (this.state.provider_sort === 'provider_name') return a.name.localeCompare(b.name);
									if (this.state.provider_sort === 'provider_distance') return (a.distance < b.distance);
									return false;
								})
								.map(provider => {
									return (
										<div>
											{this.state.service.provider_card === 'detail' // Detail card and default
												|| !this.state.service.provider_card ?
												<ProviderCardDetail
													provider={provider}
													service={this.state.service}
													user={this.props.user}
													selectMoreInfo={(id, e) => this.props.viewProvider([id], e)}
													selectProvider={() => this.selectProvider(provider)}
													goto={this.props.goto}
													distance={provider.distance}
													next_available={provider.next_available}
													chat={this.props.chat}
												/> : null}
											{this.state.service.provider_card === 'image' ? // Optional image card
												<ProviderCardImage
													provider={provider}
													service={this.state.service}
													user={this.props.user}
													selectMoreInfo={(id, e) => this.props.viewProvider([id], e)}
													selectProvider={() => this.selectProvider(provider)}
													goto={this.props.goto}
													distance={provider.distance}
													next_available={provider.next_available}
													chat={this.props.chat}
												/> : null}
										</div>)
								})}
						</div> : ''}
					{this.state.stage === 3 ? // Stage 3 (Optional): Question Filter
						<RequestTaskQuestions
							service={this.state.service}
							answers={this.state.answers}
							submitAnswers={(answers) => this.setState({ answers: answers, stage: 2 })}
						/> : null
					}
					{this.state.stage === 4 ? // Stage 4 (Optional): Select a department
						<FormControl className={classes.formControl}>
							<TextField
								fullWidth
								select
								label="Department"
								className={classNames(classes.margin, classes.textField)}
								value={self.state.answers['Department'] ? self.state.answers['Department'] : ''}
								onChange={(e) => self.selectDepartment(e)}
								InputProps={{
									id: 'sel-department',
									name: 'sel-department',
									startAdornment: <InputAdornment position="start"><BusinessIcon /></InputAdornment>,
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
								<MenuItem value="">All departments</MenuItem>
								{this.state.provider.departments.map(department => {
									return <MenuItem key={department} value={department}>{department}</MenuItem>
								})}
							</TextField>
						</FormControl> : null}
					{this.state.stage === 5 ? // Stage 5: Provider product questions.
						<div>
							{self.state.service.fields // Questions that the provider has provided answers for
								.filter(question => { return question.provider_options })
								.map((question, i) => {
									return (
										<div key={'tc_' + i}>
											<ListSubheader>{question.title}</ListSubheader>
											<Tabs
												value={this.state.current_item_tab}
												className={classes.tabs}
												onChange={(event, value) => { this.setState({ current_item_tab: value }) }}
												indicatorColor="primary"
												textColor="primary"
												scrollable
												scrollButtons="auto"
											>
												{self.state.provider.service_answer_groups
													&& self.state.provider.service_answer_groups[self.state.service.system_name]
													&& self.state.provider.service_answer_groups[self.state.service.system_name][question.title] ?
													self.state.provider.service_answer_groups[self.state.service.system_name][question.title].map((group, i) => {
														return (
															<Tab label={group} />
														)
													}) : null
												}
											</Tabs>
											<List className={classes.menuList}>
												{self.state.provider.service_answers
													&& self.state.provider.service_answers[self.state.service.system_name]
													&& self.state.provider.service_answers[self.state.service.system_name][question.title] ?
													self.state.provider.service_answers[self.state.service.system_name][question.title]
														.filter(field => {
															return field.grouping === self.state.provider.service_answer_groups[self.state.service.system_name][question.title][self.state.current_item_tab]
														})
														.map((field, i) => {
															return (
																<div>
																	<ListItem disableGutters>
																		{field.image && field.image !== '' ?
																			<Avatar
																				src={field.image && field.image.id ? '/api/images/getimage?id=' + field.image.id : ''}
																				className={classNames(classes.bigAvatar)}
																				onClick={() => this.setState({ lightbox: true, lightbox_index: 0, lightbox_images: [field.image] })}
																			/> : null}
																		<Avatar
																			className={classNames(classes.avatar)}>
																			{
																				this.state.answers
																					&& this.state.answers[question.title]
																					&& this.state.answers[question.title][field.description] ?
																					this.state.answers[question.title][field.description].quantity : '0'
																			}</Avatar>&nbsp;
																		<ListItemText
																			primary={field.description}
																			secondary={field.price ? 'Price: ' + field.price : ''} />
																		<ListItemSecondaryAction>
																			<IconButton aria-label="Remove" onClick={this.handleRemoveProviderOption.bind(this, question.title, field.description, field.price)}>
																				<RemoveCircleIcon />
																			</IconButton>
																			<IconButton aria-label="Add" onClick={this.handleAddProviderOption.bind(this, question.title, field.description, field.price)}>
																				<AddCircleIcon />
																			</IconButton>
																		</ListItemSecondaryAction>
																	</ListItem>
																</div>
															)
														}) : null
												}
											</List>
											{lightbox && (
												<Lightbox
													mainSrc={'/api/images/getimage?id=' + self.state.lightbox_images[lightbox_index].id}
													nextSrc={'/api/images/getimage?id=' + self.state.lightbox_images[(lightbox_index + 1) % self.state.lightbox_images.length].id}
													prevSrc={'/api/images/getimage?id=' + self.state.lightbox_images[(lightbox_index + self.state.lightbox_images.length - 1) % self.state.lightbox_images.length].id}
													onCloseRequest={() => this.setState({ lightbox: false })}
													onMovePrevRequest={() =>
														this.setState({
															lightbox_index: (lightbox_index + self.state.lightbox_images.length - 1) % self.state.lightbox_images.length,
														})
													}
													onMoveNextRequest={() =>
														this.setState({
															lightbox_index: (lightbox_index + 1) % self.state.lightbox_images.length,
														})
													}
													reactModalStyle={{
														overlay: {
															zIndex: 1500
														}
													}}
												/>
											)}
										</div>
									)
								})
							}
							<Typography variant="headline">{(this.state.price && this.state.price !== 0 ? ('KD ' + this.state.price) : '')}</Typography>
							<Divider />
							<Button variant="outlined" fullWidth onClick={() => this.selectProduct()}>Continue</Button>
						</div> : null}
					{this.state.stage === 6 ? // Stage 6: Date Screen
						<div>
							{this.state.date === '' ?
								<div>
									<FormControl className={classes.formControl}>
										<TextField
											fullWidth
											select
											label={this.state.service && this.state.service.date_term && this.state.service.date_term !== '' ? this.state.service.date_term : 'Date'}
											className={classNames(classes.margin, classes.textField)}
											value={this.state.date}
											onChange={(e) => self.selectDate(e)}
											InputProps={{
												name: 'sel-date',
												id: 'sel-date',
												startAdornment: <InputAdornment position="start"><EventIcon /></InputAdornment>,
												disableUnderline: true,
												classes: {
													root: classes.textFieldRoot,
													input: classes.textFieldInput,
												},
											}}
											InputLabelProps={{
												shrink: true,
												className: classes.textFieldFormLabel,
											}}
										>
											{this.state.available_dates.map(date => {
												return <MenuItem value={date}>{date}</MenuItem>
											})}
										</TextField>
									</FormControl>
								</div> : null}
							<br />
							{self.state.invalid_date ? <Typography variant="body2">No timeslots on that date. Please try again.</Typography> : null}
							{this.state.date !== ''
								&& this.state.service.start_time_required
								&& this.state.start === '' ?
								<div>
									<ListSubheader component="div" disableSticky>{'Select a time'}</ListSubheader>
									<Divider />
									<br />
									<FormControl className={classes.formControl}>
										<TextField
											fullWidth
											select
											label={this.state.service && this.state.service.start_time_term && this.state.service.start_time_term !== '' ? this.state.service.start_time_term : 'Start time'}
											className={classNames(classes.margin, classes.textField)}
											value={self.state.start}
											onChange={(e) => self.selectStartTime(e)}
											InputProps={{
												name: 'sel-start',
												id: 'sel-start',
												startAdornment: <InputAdornment position="start"><AccessTimeIcon /></InputAdornment>,
												disableUnderline: true,
												classes: {
													root: classes.textFieldRoot,
													input: classes.textFieldInput,
												},
											}}
											InputLabelProps={{
												shrink: true,
												className: classes.textFieldFormLabel,
											}}
										>
											{this.state.available_starts.map(time => {
												return <MenuItem value={time}>{time}</MenuItem>
											})}
										</TextField>
									</FormControl>
									{self.state.invalid_start ? <Typography variant="body2">Unfortunately the provider is not available at that time. Please try again.</Typography> : null}
									{this.state.start !== ''
										&& this.state.service.end_time_required ?
										<FormControl className={classes.formControl}>
											<TextField
												fullWidth
												select
												label={this.state.service && this.state.service.end_time_term && this.state.service.end_time_term !== '' ? this.state.service.end_time_term : 'End time'}
												className={classNames(classes.margin, classes.textField)}
												value={self.state.end}
												onChange={(e) => self.selectEndTime(e)}
												InputProps={{
													name: 'sel-end',
													id: 'sel-end',
													startAdornment: <InputAdornment position="start"><AccessTimeIcon /></InputAdornment>,
													disableUnderline: true,
													classes: {
														root: classes.textFieldRoot,
														input: classes.textFieldInput,
													},
												}}
												InputLabelProps={{
													shrink: true,
													className: classes.textFieldFormLabel,
												}}
											>
												{this.state.available_ends.map(time => {
													return <MenuItem value={time}>{time}</MenuItem>
												})}
											</TextField>
										</FormControl> : ''}
								</div> : ''}
							{self.state.invalid_end ? <Typography variant="body2">Unfortunately the provider is not available at that time. Please try again.</Typography> : null}
							<br />
							{this.state.date !== '' // Once all complete show a confirmation
								&& (this.state.start !== '' || !this.state.service.start_time_required)
								&& (this.state.end !== '' || !this.state.service.end_time_required) ?
								<div>
									<ListSubheader component="div" disableSticky>{'Check Slot'}</ListSubheader>
									<Divider />
									<br />
									<Typography variant="headline">{this.state.start + (this.state.end !== '' ? (' to ' + this.state.end) : '') + ' ' + moment(this.state.date).format('DD/MM/YYYY')}</Typography>
									<br />
									{this.state.location && this.state.location.length === 2
										&& this.state.service_function === 'reserve' ? // For reserving let's show a countdown
										<div>
											<Typography variant="body2">{'You have ' + moment.duration(this.state.seconds, 'seconds').humanize() + ' remaining to make this reservation'}</Typography>
											<LinearProgress variant="determinate" value={100 - (this.state.seconds / 3)} />
											<br />
										</div> : null}
									<Button variant="outlined" fullWidth onClick={() => this.setState({ start: '', end: '', date: '', seconds: 300, timer_interval: 0 })}>Change timeslot</Button>
									<br />
									<br />
									<Button variant="outlined" fullWidth onClick={() => this.selectTimeslot()}>Continue</Button>
								</div> : null
							}
						</div> : null}
					{this.state.stage === 7 ? // Stage 7: Agent Selection ?
						<div>
							{this.props.agents
								.filter(agent => {
									return this.checkAgentAvailable(agent)
								}).length === 0 ?
								<Typography variant="body2">{'No ' + this.state.service.agent_term + 's available. Please try again'}</Typography> :
								<div>
									<ListSubheader component="div" disableSticky>{'Now choose a ' + this.state.service.agent_term}</ListSubheader>
								</div>
							}
							<br />
							{this.props.agents
								.filter(agent => {
									return this.checkAgentAvailable(agent) && this.checkAgentDepartment(agent)
								})
								.map(function (agent) {
									let provider = this.state.provider;
									return ( // Agent card
										<Card key={agent.id} className={classes.card} elevation={0}>
											<CardHeader
												avatar={
													<div>
														{provider.logo ?
															<Avatar src={provider.logo.id && provider.logo.id !== '' ? '/api/images/getimage?id=' + provider.logo.id : provider.logo.datauri} className={classes.avatar}></Avatar>
															:
															<Avatar aria-label={provider.name} className={classes.avatar}>{provider.name.substring(0, 1)}</Avatar>
														}
														<Typography variant="body" className={classes.distance}>{provider.distance + ' miles away'}</Typography>
													</div>
												}
												action={
													<div>
													</div>
												}
												title={agent.first_name + ' ' + agent.last_name}
												subheader={agent.departments}
											/>
											<CardActions className={classes.actions} disableActionSpacing>
												<Button variant="outlined" onClick={() => self.selectAgent(agent)}>Choose</Button>
											</CardActions>
										</Card>
									)
								})}
						</div> : ''
					}
					{this.state.stage === 8 ? // Stage 8: Location selection
						<div>
							<ListSubheader>Check where you want it</ListSubheader>
							<Divider />
							<Tabs
								value={this.state.preferred_location}
								indicatorColor="primary"
								textColor="primary"
								fullWidth
								onChange={(event, value) => { this.setState({ preferred_location: value }) }}
							>
								{this.props.user
									&& this.props.user.location
									&& this.props.user.location.length === 2
									&& this.state.service.location.indexOf('consumer') !== -1 ?
									<Tab
										label={this.state.service.location_terms && this.state.service.location_terms['consumer'] ? this.state.service.location_terms['consumer'] : 'Home'}
										classes={{
											root: classes.tab
										}}
										value="consumer"
									/> : null}
								{this.state.provider.addresses &&
									this.state.service.location.indexOf('provider') !== -1 ?
									<Tab
										label={this.state.service.location_terms && this.state.service.location_terms['provider'] ? this.state.service.location_terms['provider'] : 'Provider'}
										classes={{
											root: classes.tab
										}}
										value="provider"
									/> : null}
								{this.state.service.location.indexOf('custom') !== -1 ?
									<Tab
										label={this.state.service.location_terms && this.state.service.location_terms['custom'] ? this.state.service.location_terms['custom'] : 'New'}
										classes={{
											root: classes.tab
										}}
										value="custom"
									/>
									: null}
							</Tabs>
							{this.props.user
								&& this.props.user.location
								&& this.props.user.location.length === 2
								&& this.state.service.location.indexOf('consumer') !== -1
								&& this.state.preferred_location === 'consumer' ?
								<div>
									<Card className={classes.card} elevation={0}>
										<CardHeader
											avatar={
												<Avatar
													className={classNames(classes.avatar)}><LocationOnIcon /></Avatar>
											}
											action={
												<div>
													<Tooltip id="tooltip-icon" title="View on map" placement="bottom">
														<IconButton aria-label="View on map" onClick={this.props.goto.bind(this, this.state.location)}>
															<LocationOnIcon />
														</IconButton>
													</Tooltip>
												</div>
											}
											title={this.props.user.address}
											subheader={this.props.user.neighbourhood}
										/>
									</Card>
									<Button variant="flat" size="large" fullWidth onClick={() => this.selectAddress('consumer')}>Continue</Button>
								</div> : null}
							{this.state.provider.addresses
								&& this.state.provider.addresses.length > 0
								&& this.state.preferred_location === 'provider' ?
								<div>
									<Card className={classes.card} elevation={0}>
										<CardHeader
											avatar={
												<Avatar
													className={classNames(classes.avatar)}><LocationOnIcon /></Avatar>
											}
											action={
												<div>
													<Tooltip id="tooltip-icon" title="View on map" placement="bottom">
														<IconButton aria-label="View on map" onClick={this.props.goto.bind(this, this.state.location)}>
															<LocationOnIcon />
														</IconButton>
													</Tooltip>
												</div>
											}
											title={this.state.provider.addresses[0].address}
											subheader={this.state.provider.addresses[0].neighbourhood}
										/>
									</Card>
									<Button variant="flat" size="large" fullWidth onClick={() => this.selectAddress('provider')}>Continue</Button>
								</div> : null}
							{this.state.service.location.indexOf('custom') !== -1
								&& this.state.preferred_location === 'custom' ?
								<div>
									<ProfileAddress
										setAddress={this.handleSetAddress}
										updateMapLocation={this.props.updateMapLocation}
										updateMapBounds={this.props.updateMapBounds}
										location={this.state.custom_location}
										address={this.state.custom_address}
										governorate={this.state.custom_governorate}
										neighbourhood={this.state.custom_neighbourhood}
										block={this.state.custom_block}
										street={this.state.custom_street}
										house={this.state.custom_house}
										current_location={this.props.current_location}
										allow_autodetect={true}
										governorate_lookup={true}
									/>
									<br />
									<Button variant="flat" size="large" fullWidth onClick={() => this.selectAddress('custom')}>Continue</Button>
								</div>
								: null}
						</div> : null
					}
					{this.state.stage === 9 ? // Stage 9. Confirmation
						<div>
							<ListSubheader component="div" disableSticky>Final location</ListSubheader>
							<Divider />
							<br />
							<Card className={classes.card} elevation={0}>
								<CardHeader
									avatar={
										<Avatar
											className={classNames(classes.avatar)}><LocationOnIcon /></Avatar>
									}
									action={
										<div>
											<Tooltip id="tooltip-icon" title="View on map" placement="bottom">
												<IconButton aria-label="View on map" onClick={this.props.goto.bind(this, this.state.location)}>
													<LocationOnIcon />
												</IconButton>
											</Tooltip>
										</div>
									}
									title={this.state.address}
									subheader={this.state.neighbourhood}
								/>
							</Card>
							<br />
							{self.state.provider.payment_when && self.state.provider.payment_when === 'upfront' ?
								<Button fullWidth variant="outlined" size="large"  >{'Pay now' + (this.state.price && this.state.price !== 0 ? (' KD ' + this.state.price) : '')}</Button> :
								<Button fullWidth variant="outlined" size="large" onClick={() => self.confirm()}>{'Confirm ' + (this.state.price && this.state.price !== 0 ? (' KD ' + this.state.price) : '')}</Button>
							}
						</div> : null
					}
				</div>
			</div>
		);
	}
}

export default withStyles(styles)(RequestTask);