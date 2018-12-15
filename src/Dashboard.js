// Import Core
import classNames from 'classnames';
import compose from 'recompose/compose';
import React, { Component } from 'react';
import moment from 'moment';

// Material UI
import AppBar from '@material-ui/core/AppBar';
import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import { fade } from '@material-ui/core/styles/colorManipulator';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Modal from '@material-ui/core/Modal';
import Snackbar from '@material-ui/core/Snackbar';
import { withStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';

// Material UI icons
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import BusinessIcon from '@material-ui/icons/Business';
import ChatIcon from '@material-ui/icons/Chat';
import CloseIcon from '@material-ui/icons/Close';
import EventIcon from '@material-ui/icons/Event';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import FaceIcon from '@material-ui/icons/Face';
import LayersIcon from '@material-ui/icons/Layers';
import LocalActivityIcon from '@material-ui/icons/LocalActivity';
import MapIcon from '@material-ui/icons/Map';
import MenuIcon from '@material-ui/icons/Menu';
import NavigationIcon from '@material-ui/icons/Navigation';
import NotificationsIcon from '@material-ui/icons/Notifications';
import PeopleIcon from '@material-ui/icons/People';
import PlaceIcon from '@material-ui/icons/Place';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import ScreenShareIcon from '@material-ui/icons/ScreenShare';
import SecurityIcon from '@material-ui/icons/Security';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import ViewListIcon from '@material-ui/icons/ViewList';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

// Sub pages
import Analytics from './Analytics';
import AgentEdit from './AgentEdit';
import AgentList from './AgentList';
import AgentSidebar from './AgentSidebar';
import AppSearch from './AppSearch';
import Broadcast from './Broadcast';
import CategoryEdit from './CategoryEdit';
import CategoryList from './CategoryList';
import Chat from './Chat';
import ConsumerList from './ConsumerList';
import ConsumerSidebar from './ConsumerSidebar';
import LandingDesktop from './LandingDesktop';
import Layers from './Layers';
import FeaturesView from './FeaturesView';
import ManualTask from './ManualTask';
import MegaMenu from './MegaMenu';
import NavigationSidebar from './NavigationSidebar';
import PostSidebarConsumer from './PostSidebarConsumer';
import PostSidebarProvider from './PostSidebarProvider';
import PostTask from './PostTask';
import ProfileAccount from './ProfileAccount';
import ProfileAgent from './ProfileAgent';
import ProfileConsumer from './ProfileConsumer';
import ProfileConsumerShare from './ProfileConsumerShare';
import ProfileProvider from './ProfileProvider';
import ProfileService from './ProfileService';
import ProfileNotifications from './ProfileNotifications';
import ProfilePayments from './ProfilePayments';
import ProviderList from './ProviderList';
import ProviderView from './ProviderView';
import QuestionEdit from './QuestionEdit';
import RegistrationPages from './RegistrationPages';
import RequestTask from './RequestTask';
import ReferenceDataEdit from './ReferenceDataEdit';
import ReferenceDataList from './ReferenceDataList';
import ServiceEdit from './ServiceEdit';
import ServiceList from './ServiceList';
import ShareUserView from './ShareUserView';
import TaskList from './TaskList';
import TaskMap from './TaskMap';
import TaskSidebarProvider from './TaskSidebarProvider';
import TaskSidebarAgent from './TaskSidebarAgent';
import TaskSidebarConsumer from './TaskSidebarConsumer';
import TaskView from './TaskView';

// actions
import * as administrators from './actions/administrators';
import * as authentication from './actions/authentication';
import * as agents from './actions/agents';
import * as categories from './actions/categories';
import * as consumers from './actions/consumers';
import * as map from './actions/map';
import * as providers from './actions/providers';
import * as referencedata from './actions/referencedata';
import * as services from './actions/services';
import * as tasks from './actions/tasks';
import * as talk from './actions/talk';

const menu_drawer_width = 190;

// Styles
const styles = theme => ({
	appBar: {
		background: '#FBEA21',
		display: 'block',
		width: '100%',
		zIndex: '9999',
		[theme.breakpoints.down('sm')]: {
			margin: '0 auto'
		}
	},
	appBarToolbar: {
		margin: '0 auto',
		maxWidth: '1200px',
		textAlign: 'center',
		position: 'relative',
		width: '100%'
	},
	headerInternal: {
		display: 'inline-block',
		width: 'calc(100% - 60px)',
		[theme.breakpoints.down('sm')]: {
			background: '#F9F9F9',
			borderRight: '10px solid #FBEA22',
			height: '100%',
			left: 0,
			position: 'fixed',
			top: 0,
			transform: 'translateX(-100%)',
			transition: '0.3s ease-out transform',
			width: 'calc(100% - 50px)'
		}
	},
	headerInternalActive: {
		transform: 'translateX(0)'
	},
	headerSeparator: {
		display: 'inline-block',
		fontSize: '2rem',
		color: 'black',
		[theme.breakpoints.down('sm')]: {
			pointerEvents: 'none',
			transform: 'rotate(90deg)'
		}
	},
	headerMenuButton: {
		position: 'absolute',
		right: 0,
		top: 0,
		display: 'none',
		[theme.breakpoints.down('sm')]: {
			display: 'inline',
			lineHeight: 1.5,
			width: 'auto'
		}
	},
	headerMenuButtonSpan: {
		display: 'inline-block',
		verticalAlign: 'middle'
	},
	headerMenuButtonSvg: {
		display: 'inline-block',
		verticalAlign: 'middle',
		marginLeft: '1rem'
	},
	appBarButton: {
		background: 'none',
		border: 'none',
		color: '#313131',
		cursor: 'pointer',
		fontFamily: "'Montserrat', sans-serif",
		fontWeight: 700,
		letterSpacing: '1.5px',
		margin: 0,
		padding: '1rem',
		outline: 'none',
	},
	appBarButtonOutline: {
		background: 'none',
		color: '#313131',
		cursor: 'pointer',
		fontFamily: "'Montserrat', sans-serif",
		fontWeight: 700,
		letterSpacing: '1.5px',
		margin: 0,
		outline: 'none',
		border: '2px solid #313131',
		borderRadius: '17px',
		display: 'inline-block',
		padding: '0.6rem 2rem',
		verticalAlign: 'middle'
	},
	fullWidth: {
		[theme.breakpoints.down('sm')]: {
			width: '100%',
			padding: 5
		}
	},
	title: {
		display: 'none',
		[theme.breakpoints.up('sm')]: {
			display: 'block',
		},
	},
	search: {
		position: 'relative',
		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade(theme.palette.common.white, 0.15),
		'&:hover': {
			backgroundColor: fade(theme.palette.common.white, 0.25),
		},
		marginLeft: 0,
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			marginLeft: theme.spacing.unit,
			width: 'auto',
		},
	},
	applicationDrawerPaper: {
		position: 'relative',
		overflowX: 'hidden',
		overflowY: 'hidden',
		width: menu_drawer_width,
		textColor: '#000',
		color: '#000',
		whiteSpace: 'nowrap',
		backgroundColor: '#FBEA21',
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		})
	},
	applicationDrawerPaperClose: {
		overflowX: 'hidden',
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		width: 50
	},
	appFrame: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.default,
		overflow: 'auto'
	},
	contentDrawerPaper: {
		overflowX: 'hidden',
		backgroundColor: '#F9F9F9',
		minWidth: 370,
		maxWidth: 370
	},
	logo: {
		display: 'inline-block',
		height: '40px',
		marginRight: '10px',
		verticalAlign: 'middle'
	},
	leftDrawer: {
		borderRight: '10px solid #FBEA22'
	},
	rightDrawer: {
		borderLeft: '10px solid #FBEA22'
	},
	root: {
		flexGrow: 1,
		height: '100%',
		width: '100%',
		zIndex: 1,
		overflow: 'hidden',
		position: 'relative',
		display: 'flex',
	},
	sidebarList: {
		color: 'black',
		fontWeight: 370,
		fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
		lineHeight: '1.5rem'
	},
	snackbarClose: {
		width: theme.spacing.unit * 4,
		height: theme.spacing.unit * 4,
	},
	toolbar: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		padding: '0 8px',
		...theme.mixins.toolbar,
	},
	menuButton: {
		marginLeft: -12,
		marginRight: 20,
	},
	nested: {
		paddingLeft: theme.spacing.unit * 2,
	},
	passwordModal: {
		position: 'absolute',
		width: theme.spacing.unit * 50,
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[5],
		padding: theme.spacing.unit * 4,
	},
	passwordControl: {
		margin: theme.spacing.unit,
		marginLeft: '15% !important',
	}
});

// Class: Dashboard. Contains and controls all the main dashboard components
class Dashboard extends Component {
	// contructor: in the constructor we set the state and call super.
	constructor(props) {
		super(props);

		// Check for state in session storage
		let state = sessionStorage.getItem('state');

		// If we have state in session storage, parse it into JSON and set the new state.
		if (state) state = JSON.parse(state);
		if (state && state.user) {
			this.state = state;
		} else {
			this.state = {
				web_token: '',
				// By default we show the landing desktop until it's dismissed
				landing_desktop: true,
				mega_menu: false,
				mega_menu_request_function: '',
				// Used to pass login and registration progress indicators.
				login_progress: false,
				register_progress: false,
				// Main user object. Retrieved from login.
				user: {},
				username: '',
				// Message broadcasting dialog
				broadcast_dialog_open: false,
				broadcast_receivers: [],
				broadcast_type: '',
				// Chat user: who we're talking to
				chat_user: {},
				// Map buildings
				show_buildings: true,
				map_language: 'en',
				agent_active: true,
				date_filter: moment().format('YYYY-MM-DD'), // Use current date by default
				// Live location tracking.
				current_location: [],
				live_locations: [],
				location_interval_id: '',
				share_user: {},
				// Live updating of messages
				check_message_interval_id: '',
				// Live updating of tasks
				check_task_interval_id: '',
				// Map navigation.
				origin: [],
				destination: [],
				map_location: [],
				map_pin: [],
				map_bounds: {},
				route_legs: [],
				// Snackbar used to provide notifications when things happen!
				snackbar_open: false,
				snackbar_message: '',
				// The menu drawer holds the menuW
				menu_drawer: false,
				// The content drawer holds display items
				showRegistrationDrawer: false,
				content_drawer_screen: '',
				content_drawer: false,
				task_view_drawer: false,
				task_request_drawer: false,
				task_request_screen: '',
				task_request_screen_title: '',
				request_progress: false,
				// Content screens - agents, service providers, appointments, requests, create service type
				current_page_view: 'map',
				// The intermediate menu structure
				left_menu: '',
				// Stores the list of services
				services: [],
				current_selected_services: [],
				questions: [],
				current_selected_questions: [],
				// To trigger a service and provider from sub-components
				current_provider: {},
				current_provider_department: '',
				current_service: {},
				current_service_date: '',
				current_service_start: '',
				// Categories
				categories: [],
				current_selected_categories: [],
				// Reference Data
				referencedata: [],
				current_selected_referencedata: [],
				// Filtering the map by tags
				category_keys: {},
				// Edit service dialog
				service_edit_dialog_open: false,
				// Edit question dialog
				question_edit_dialog_open: false,
				// Edit reference data dialog
				reference_data_edit_dialog_open: false,
				// Adding an agent dialog
				agent_edit_dialog_open: false,
				agent_profile_edit: false,
				agent_profile_user: {},
				// Stores the list of service functions e.g. Appointment and Quote
				service_functions: [],
				// Stores the list of service providers
				providers: [],
				current_selected_providers: [],
				provider_view_allow_request: true,
				// Stores the list of service provider agents
				agents: [],
				current_selected_agents: [],
				agent_filter: '',
				agent_drawer: true,
				// Stores the list of consumers
				consumers: [],
				current_selected_consumers: [],
				consumer_drawer: false,
				// Stores the list of tasks
				tasks: [],
				current_selected_tasks: [],
				tasks_drawer: false,
				posts_drawer: false,
				// Current service data
				current_service_data: {},
				// Current service type (e.g. Hospital)
				service_type: '',
				// Current service function (e.g. Appointment)
				service_function: '',
				// Profile menu
				profile_menu_open: false,
				profile_menu_anchor: null,
				// Edit agent menu
				task_agent_menu_open: false,
				task_agent_menu_anchor: null,
				// Edit agent status menu
				agent_status_menu_open: false,
				agent_status_menu_anchor: null,
				// Edit provider status menu
				provider_status_menu_open: false,
				provider_status_menu_anchor: null,
				// Edit category status menu
				category_status_menu_open: false,
				category_status_menu_anchor: null,
				// Edit task status menu
				task_status_menu_open: false,
				task_status_menu_anchor: null,
				// Edit service status menu
				service_status_menu_open: false,
				service_status_menu_anchor: null,
				// Question status menu
				question_status_menu_open: false,
				question_status_menu_anchor: null,
				// Question status menu
				referencedata_status_menu_open: false,
				referencedata_status_menu_anchor: null,
				// Task drawer
				view_task_drawer: false,
				// Bottom navigation
				bottom_navigation_value: -1,
				// Top navigation
				top_navigation_value: -1,
				registration_shortcut_type: '',
				// unread messages badge
				message_count: '0',
				message_tooltip: 'Chat',
				reset_password_modal_open: false,
				new_password1: '',
				new_password2: '',
				show_password1: false,
				show_password2: false,
				show_menu: false,
				// Notifications
				task_notification: false
			};
		}

	}
	// componentDidMount: When the dashboard is mounted
	// Main method to set up the state and retrieve reference data.
	componentDidMount = () => {
		let location_interval_id = setInterval(this.logLocation, 10000);
		this.setState({ location_interval_id: location_interval_id });

		// Get all our data. These are all open services.
		this.getAgents();
		this.getCategories();
		this.getReferenceData();
		this.getProviders();
		this.getServices();

		this.resetPasswordDialog();

		if (this.state.user.user_type) {
			this.getTasks();
			if (this.state.user.user_type === 'administrator') this.getQuestions();
			this.getUserConversations();
			this.getConsumers();
			// Get user conversations every minute
			let check_message_interval_id = setInterval(this.getUserConversations, 10000);
			this.setState({ check_message_interval_id: check_message_interval_id });
			let check_task_interval_id = setInterval(this.getTasks, 60000);
			this.setState({ check_task_interval_id: check_task_interval_id });
		}
	}

	//////////////////////////
	// Password Reset Process
	//////////////////////////

	// resetPasswordDialog:
	resetPasswordDialog = () => {
		let url = window.location.href;
		if (url.includes('token')) {
			this.setState({ token: url.split('=')[1], reset_password_modal_open: true });
		}
	}

	// resetPassword: When the user clicks the password reset.
	resetPassword = () => {
		let error = '';
		// verify password matches
		if (this.state.new_password1 !== this.state.new_password2) {
			error = "Please select matching passwords!";
			alert(error);
		} else {
			// get token from url
			let token = this.state.token;
			let newpass = this.state.new_password1;
			authentication.authenticateAndSetPassword(token, newpass, response => {
				if (response.data.success === true) {
					// Notify user
					this.setState({ snackbar_open: true, snackbar_message: 'Password Changed', reset_password_modal_open: false });
					window.location.href = "/";
				} else {
					this.setState({ snackbar_open: true, snackbar_message: 'Something went wrong', reset_password_modal_open: false });
				}
			});
		}
	}

	// getResetPasswordModalStyle: Gets the positioning of the password reset dialog
	getResetPasswordModalStyle = () => {
		const top = 50;
		const left = 50;
		return {
			top: `${top}%`,
			left: `${left}%`,
			transform: `translate(-${top}%, -${left}%)`,
		};
	}

	////////////////////////////
	// Chat functions (TalkJS)
	////////////////////////////

	// chatConsumer:
	chatConsumer = (user) => {
		this.state.consumers.forEach(consumer => {
			if (user.indexOf(consumer.id) !== -1) this.setState({ chat_user: consumer, content_drawer: true, content_drawer_screen: 'chat' });
		});
	}

	// getUserConversations: Gets the current user conversations (messages waiting).
	getUserConversations = () => {
		if (this.state.user.id) {
			talk.getConversations(this.state.user.id, true, this.state.web_token, conversations => {
				if (conversations.length > 0) {
					this.setState({ message_tooltip: 'Messages available', message_count: conversations.length.toString() || '0' });
				} else {
					this.setState({ message_tooltip: 'No new messages', message_count: '0' });
				}
			})
		}
	}

	// sendBroadcast: Sends a message from subject and message.
	sendBroadcast = (subject, message) => {
		let self = this;
		talk.sendToMultiple(this.state.user.id, this.state.broadcast_receivers, subject, message, this.state.web_token, response => {
			// Trigger a retrieve of the latest conversations.
			self.getUserConversations();
			self.setState({ broadcast_dialog_open: false, broadcast_receivers: [], snackbar_open: true, snackbar_message: 'Message broadcast' });
		});
	}

	////////////////////////////
	// Reference Data retrieval.
	////////////////////////////

	// getAgents:
	getAgents = () => agents.getAgents(response => this.setState({ agents: response.data.agents || [] }))

	// getCategories:
	getCategories = () => categories.getCategories(categories => this.setState({ categories: categories || [] }))

	// getReferenceData:
	getReferenceData = () => referencedata.getReferenceData(referencedata => this.setState({ referencedata: referencedata || [] }))

	// getConsumers:
	getConsumers = () => consumers.getConsumers(this.state.user.username, response => this.setState({ consumers: response.data.consumers || [] }))

	// getProviders:
	getProviders = () => providers.getProviders(response => this.setState({ providers: response.data.providers || [] }))

	// getServices: retrieves the service data
	getServices = () => {
		services.getServices(response => {
			var service_functions = [];
			response.data.services.forEach((i, service) => {
				if (this.state.service_functions.indexOf(service.service_function) === -1) service_functions.push(service.service_function);
			}, this);
			this.setState({ services: response.data.services || [], service_functions: service_functions || [] });
		});
	}

	// getQuestions: gets the list of questions
	getQuestions = () => services.getQuestions(questions => this.setState({ questions: questions }))

	// getTasks: gets the list of tasks and then updates state
	getTasks = () => tasks.getTasks(this.state.user, response => this.setState({ tasks: response.data.tasks || [] }))

	////////////////////////////
	// Live Location Logging
	////////////////////////////

	// logLocation: logs the current location to a web service
	logLocation = () => {
		map.logLocation(this.state.user, this.state.web_token, locations => {
			this.setState({ current_location: locations.current_location, live_locations: locations.live_locations });
		});
	}

	////////////////////////////////////
	// Login and Registration Processes
	////////////////////////////////////

	// login: Logs the user into the system and saves their data in state.
	login = (data) => {
		this.setState({ login_progress: true });
		let self = this;
		authentication.authenticate(data, response => {
			if (response.data.success === false) self.setState({ snackbar_open: true, snackbar_message: 'Invalid login', login_progress: false });
			if (response.data.success === true) {
				let keys = {};
				this.state.categories.forEach(category => {
					let selected = false;
					if (response.data.user.categories && response.data.user.categories.indexOf(category.system_name) !== -1) {
						selected = true;
					}
					keys[category.system_name] = { display: category.title, open: false, selected: selected, osm_tags: category.osm_tags, osm_icon: category.osm_icon, colour: category.colour }
				});
				self.setState({
					user: response.data.user,
					login_dialog_open: false,
					menu_drawer: false,
					current_page_view: 'map',
					category_keys: keys,
					agent_active: response.data.user.active,
					username: data.username,
					login_progress: false,
					web_token: response.data.token
				});
				sessionStorage.setItem('state', JSON.stringify(self.state));
				self.getTasks();
				if (response.data.user.user_type === 'administrator') self.getQuestions();
				self.getUserConversations();
				self.getConsumers();
				// Get user conversations every 10 seconds
				let check_message_interval_id = setInterval(self.getUserConversations, 10000);
				self.setState({ check_message_interval_id: check_message_interval_id });
				// Update tasks every minute
				let check_task_interval_id = setInterval(this.getTasks, 60000);
				this.setState({ check_task_interval_id: check_task_interval_id });
			}
		});
	}

	// logout: Logs the user out and clears state.
	logout = () => {
		sessionStorage.removeItem('state');
		this.setState({ user: {}, current_page_view: 'map', tasks: [], profile_menu_open: false });
	}

	// register: Registers the user in the system and logs them in.
	register = (data) => {
		let self = this;
		this.setState({ register_progress: true });
		// Call the add methods
		var responseAction = function (response) {
			if (response.data.success) {
				self.setState({ current_page_view: 'map', snackbar_open: true, snackbar_message: 'Account Created!', register_progress: false });
				// Then login
				self.login({ username: data.username, password: data.password });

			} else {
				self.setState({ snackbar_open: true, snackbar_message: 'Username already taken', register_progress: false });
			}
		};
		if (data.user_type === 'consumer') consumers.addConsumer(data, responseAction);
		if (data.user_type === 'agent') agents.addAgent(data, responseAction);
		if (data.user_type === 'provider') providers.addProvider(data, responseAction);
	}

	/////////////////
	// User Editing
	/////////////////

	// editUser: Calls to the edit user functions for profile editing
	editUser = (user) => {
		var self = this;
		consumers.editConsumer(user, self.state.web_token, response => {
			if (response.data.success) {
				if (this.state.agent_profile_edit) {
					self.setState({ snackbar_open: true, snackbar_message: 'Profile record updated' });
					self.getAgents();
				} else {
					self.setState({ user: user, snackbar_open: true, snackbar_message: 'Profile record updated' });
				}
			}
		});
	}

	// updatePassword: Updates the users password.
	updatePassword = (old_password, new_password) => {
		var self = this;
		authentication.updatePassword({ username: this.state.username, old_password: old_password, new_password: new_password }, response => {
			if (response.data.success) {
				self.setState({ snackbar_open: true, snackbar_message: 'Password updated' });
			} else {
				self.setState({ snackbar_open: true, snackbar_message: 'Password update failed' });
			}
		});
	}

	//////////////////////////////////////////////////////////////////////////////
	// Agent Administration. (Agents do not register but are created by providers)
	//////////////////////////////////////////////////////////////////////////////

	// addAgent:
	addAgent = () => this.setState({ agent_edit_dialog_open: true });

	// chatAgent:
	chatAgent = (agentdata) => {
		this.state.agents.forEach(agent => {
			if (agentdata.indexOf(agent.id) !== -1) this.setState({ chat_user: agent, content_drawer: true, content_drawer_screen: 'chat' });
		});
	}

	// saveService
	saveAgent = (agent) => {
		let self = this;
		agents.addAgent(agent, self.state.web_token, response => {
			self.getAgents();
			self.setState({ snackbar_open: true, snackbar_message: 'Account created', agent_edit_dialog_open: false });
		});
	}

	// saveRunner
	saveRunner = (agent) => {
		var self = this;
		agents.addAgent(agent, self.state.web_token, response => {
			self.getAgents();
			self.setState({ current_page_view: 'map', login_dialog_open: true });
		});
	}

	// toggleAgentActive:
	toggleAgentActive = () => {
		this.setState({ agent_active: !this.state.agent_active });
		let agent = this.state.user;
		agent.active = !this.state.agent_active;
		this.editUser(agent);
	}

	/////////////////////////////////////////////////////////////////////////////////
	// Service editing
	/////////////////////////////////////////////////////////////////////////////////

	// editServiceStatus:
	editServiceStatus = (data, anchor) => {
		var services = [];
		this.state.services.forEach(s => {
			if (data.indexOf(s.id) !== -1) services.push(s);
		});
		this.setState({ current_selected_services: services, service_status_menu_open: true, service_status_menu_anchor: anchor });
	}

	// editServiceStatuses:
	editServiceStatuses = (status) => {
		var payload = [];
		var self = this;
		this.state.current_selected_services.forEach((i, t) => {
			var status_update = { id: i.id, status: status };
			payload.push(status_update);
		});
		services.editServiceStatuses(payload, self.state.web_token, response => {
			self.getServices();
			self.setState({ snackbar_open: true, snackbar_message: 'Service status updated' });
		});
	}

	// createService:
	createServiceType = (service) => {
		var self = this;
		services.editService(service, self.state.web_token, response => {
			self.getServices();
			self.setState({ admin_home_view: true, create_service_type_view: false, snackbar_open: true, snackbar_message: 'Service created' });
		});
	}

	// addService:
	addService = (service_function) => this.setState({ current_selected_services: [{ service_function: service_function }], service_edit_dialog_open: true });

	// editService:
	editService = (data, anchor) => {
		var services = [];
		this.state.services.forEach((i, t) => {
			if (data.indexOf(i.id) !== -1) services.push(i);
		});
		this.setState({ current_selected_services: services, service_edit_dialog_open: true });
	}

	// addServiceQuestion
	addServiceQuestion = (service_ids, question_id) => {
		const self = this;
		services.addServiceQuestion(service_ids, question_id, self.state.web_token, response => {
			self.getServices();
			self.setState({ snackbar_open: true, snackbar_message: 'Service modified' });
		});
	}

	// removeServiceQuestion
	removeServiceQuestion = (service_ids, question_id) => {
		const self = this;
		services.removeServiceQuestion(service_ids, question_id, self.state.web_token, response => {
			self.getServices();
			self.setState({ snackbar_open: true, snackbar_message: 'Service modified' });
		});
	}

	// deleteService:
	deleteService = (data, anchor) => { }

	// saveService
	saveService = (service) => {
		var self = this;
		services.editService(service, self.state.web_token, response => {
			self.getServices();
			self.setState({ snackbar_open: true, snackbar_message: 'Service edited', service_edit_dialog_open: false });
		});
	}

	// handleSetServiceStatus:
	handleSetServiceStatus = (event) => {
		this.editServiceStatuses(event.target.firstChild.nodeValue);
		this.setState({ service_status_menu_open: false });
	}

	/////////////////////////////////////////////////////////////////////////////////
	// Question editing
	/////////////////////////////////////////////////////////////////////////////////

	// editQuestionStatus
	editQuestionStatus = (data, anchor) => {
		var questions = [];
		this.state.services.forEach(function (i, t) {
			if (i.fields) {
				i.fields.forEach(function (field) {
					if (data.indexOf(field.system_name) !== -1) {
						questions.push(field);
					}
				});
			}
		});
		this.setState({ current_selected_questions: questions, question_status_menu_open: true, question_status_menu_anchor: anchor });
	}

	// editQuestionStatuses:
	editQuestionStatuses = (status) => {
		var payload = [];
		var self = this;
		this.state.current_selected_questions.forEach(function (i, t) {
			var status_update = { service_name: i.service_name, question_name: i.system_name, status: status };
			payload.push(status_update);
		});
		services.editServiceQuestionStatuses(payload, self.state.web_token, response => {
			self.getServices();
			self.setState({ snackbar_open: true, snackbar_message: 'Question status updated' });
		});
	}

	// addQuestion:
	addQuestion = () => this.setState({ current_selected_questions: [{}], question_edit_dialog_open: true });

	// editService:
	editQuestion = (data, anchor) => {
		var questions = [];
		this.state.questions.forEach(question => {
			if (data.indexOf(question.id) !== -1) questions.push(question);
		});
		this.setState({ current_selected_questions: questions, question_edit_dialog_open: true });
	}

	// deleteQuestion:
	deleteQuestion = (data, anchor) => { }

	// saveQuestion:
	saveQuestion = (data) => {
		var self = this;
		services.editServiceQuestion(data, self.state.web_token, response => {
			self.getServices();
			self.setState({ snackbar_open: true, snackbar_message: 'Question record saved', question_edit_dialog_open: false });
		});
	}

	// handleSetQuestionStatus
	handleSetQuestionStatus = (event) => {
		this.editQuestionStatuses(event.target.firstChild.nodeValue);
		this.setState({ question_status_menu_open: false });
	}

	/////////////////////////////////////////////////////////////////////////////////
	// Reference data editing
	/////////////////////////////////////////////////////////////////////////////////

	// editReferenceDataStatus
	editReferenceDataStatus = (data, anchor) => {
		let referencedataitems = [];
		this.state.referencedata.forEach(item => {
			if (data.indexOf(item.id) !== -1) referencedataitems.push(item);
		});
		this.setState({ current_selected_referencedata: referencedataitems, referencedata_status_menu_open: true, referencedata_status_menu_anchor: anchor });
	}

	// editQuestionStatuses:
	editReferenceDataStatuses = (status) => {
		let payload = [];
		let self = this;
		this.state.current_selected_referencedata.forEach(item => {
			let status_update = { id: item.id, status: status };
			payload.push(status_update);
		});
		referencedata.editReferenceDataStatuses(payload, self.state.web_token, response => {
			self.getReferenceData();
			self.setState({ snackbar_open: true, snackbar_message: 'Reference data status updated' });
		});
	}

	// addReferenceDataItem:
	addReferenceDataItem = () => this.setState({ current_selected_referencedata: [{}], reference_data_edit_dialog_open: true });

	// editReferenceDataItem:
	editReferenceDataItem = (data) => {
		let referencedata = [];
		this.state.referencedata.forEach(item => {
			if (data.indexOf(item.id) !== -1) referencedata.push(item);
		});
		this.setState({ current_selected_referencedata: referencedata, reference_data_edit_dialog_open: true });
	}

	// saveReferenceDataItem:
	saveReferenceDataItem = (data) => {
		let self = this;
		referencedata.editReferenceDataItem(data, self.state.web_token, response => {
			self.getReferenceData();
			self.setState({ snackbar_open: true, snackbar_message: 'Reference data item saved', reference_data_edit_dialog_open: false });
		});
	}

	// handleSetQuestionStatus
	handleSetReferenceDataStatus = (event) => {
		this.editReferenceDataStatuses(event.target.firstChild.nodeValue);
	}

	/////////////////////////////////////////////////////////////////////////////////
	// Category editing
	/////////////////////////////////////////////////////////////////////////////////

	// editCategoryStatus
	editCategoryStatus = (data, anchor) => {
		var categories = [];
		this.state.categories.forEach((cat, i) => {
			if (data.indexOf(cat.id) !== -1) categories.push(cat);
		});
		this.setState({ current_selected_categories: categories, category_status_menu_open: true, category_status_menu_anchor: anchor });
	}

	// editCategoryStatuses:
	editCategoryStatuses = (status) => {
		var payload = [];
		var self = this;
		this.state.current_selected_categories.forEach(function (i, t) {
			var status_update = { id: i.id, status: status };
			payload.push(status_update);
		});
		categories.editCategoryStatuses(payload, self.state.web_token, response => {
			self.getCategories();
			self.setState({ snackbar_open: true, snackbar_message: 'Category status updated' });
		});
	}

	// addCategory:
	addCategory = () => this.setState({ current_selected_categories: [{}], category_edit_dialog_open: true });

	// editService:
	editCategory = (data) => {
		var categories = [];
		this.state.categories.forEach(function (cat, i) {
			if (data.indexOf(cat.id) !== -1) categories.push(cat);
		});
		this.setState({ current_selected_categories: categories, category_edit_dialog_open: true });
	}

	// deleteCategory:
	deleteCategory = (data) => { }

	// saveCategory:
	saveCategory = (data) => {
		var self = this;
		categories.editCategory(data, self.state.web_token, response => {
			self.getCategories();
			self.setState({ snackbar_open: true, snackbar_message: 'Category record saved', category_edit_dialog_open: false });
		});
	}

	// handleSetCategoryStatus:
	handleSetCategoryStatus = (event) => {
		this.editCategoryStatuses(event.target.firstChild.nodeValue);
		this.setState({ category_status_menu_open: false });
	}

	/////////////////////////////////////////////////////////////////////////////////
	// Agent editing
	/////////////////////////////////////////////////////////////////////////////////

	// editAgentStatus:
	editAgentStatus = (data, anchor) => {
		var agents = [];
		this.state.agents.forEach(function (i, t) {
			if (data.indexOf(i.id) !== -1) agents.push(i);
		});
		this.setState({ current_selected_agents: agents, agent_status_menu_open: true, agent_status_menu_anchor: anchor });
	}

	// editAgentStatuses:
	editAgentStatuses = (status) => {
		// For this call we need to pass a set of task ids and statuses
		var payload = [];
		var self = this;
		this.state.current_selected_agents.forEach(function (i, t) {
			var status_update = { id: i.id, status: status };
			payload.push(status_update);
		});
		agents.editAgentStatuses(payload, self.state.web_token, response => {
			self.getAgents();
			self.setState({ snackbar_open: true, snackbar_message: 'Agent status updated' });
		});
	}

	// handleSetAgentStatus: setting a new status
	handleSetAgentStatus = (event) => {
		this.editAgentStatuses(event.target.firstChild.nodeValue);
		this.setState({ agent_status_menu_open: false });
	}

	/////////////////////////////////////////////////////////////////////////////////
	// Provider editing
	/////////////////////////////////////////////////////////////////////////////////

	// chatProvider:
	chatProvider = (providerdata) => {
		this.state.providers.forEach(provider => {
			if (providerdata.indexOf(provider.id) !== -1) this.setState({ chat_user: provider, content_drawer: true, content_drawer_screen: 'chat' });
		});
	}

	// editProviderStatus:
	editProviderStatus = (data, anchor) => {
		var providers = [];
		this.state.providers.forEach((i, t) => {
			if (data.indexOf(i.id) !== -1) providers.push(i);
		});
		this.setState({ current_selected_providers: providers, provider_status_menu_open: true, provider_status_menu_anchor: anchor });
	}

	// editProviderStatuses
	editProviderStatuses = (status, ids) => {
		// For this call we need to pass a set of task ids and statuses
		var payload = [];
		var self = this;
		if (ids) {
			ids.forEach((i, t) => {
				var status_update = { id: i, status: status };
				payload.push(status_update);
			});
		} else {
			this.state.current_selected_providers.forEach((i, t) => {
				var status_update = { id: i.id, status: status };
				payload.push(status_update);
			});
		}
		providers.editProviderStatuses(payload, self.state.web_token, response => {
			self.getProviders();
			self.setState({ snackbar_open: true, snackbar_message: 'Provider status updated' });
		});
	}

	// handleSetProviderStatus: setting a new status
	handleSetProviderStatus = (event) => {
		this.editProviderStatuses(event.target.firstChild.nodeValue);
		this.setState({ provider_status_menu_open: false });
	}

	/////////////////////////////////////////////////////////////////////////////////
	// Task View and Manipulation
	/////////////////////////////////////////////////////////////////////////////////

	// addTask: adds a new task by calling the add tasks webservice
	addTask = (taskdata) => {
		var self = this;
		// Create the task as the current logged in user
		taskdata.username = this.state.user.username;
		taskdata.user_id = this.state.user.id;
		tasks.addTask(taskdata, response => {
			self.setState({ snackbar_open: true, snackbar_message: 'Task added', content_drawer: false, post_request_drawer: false, task_request_drawer: false, request_progress: false });
			self.getTasks();
		});
	}

	// deleteTask:
	deleteTask = (taskdata) => {
		// For this call we need to pass a set of task ids and statuses
		var statuses = [];
		var self = this;
		taskdata.forEach(function (i, t) {
			var status_update = { id: i, status: 'Cancelled' };
			statuses.push(status_update);
		});
		tasks.editTaskStatuses(statuses, response => {
			self.getTasks();
			self.setState({ snackbar_open: true, snackbar_message: 'Task cancelled' });
		});
	}

	// viewTask:
	viewTask = (data) => {
		var tasks = [];
		this.state.tasks.forEach(function (i, t) {
			if (data.indexOf(i.id) !== -1) tasks.push(i);
		});
		this.setState({ current_selected_tasks: tasks, task_view_drawer: true });
	}

	// editTaskAgent:
	editTaskAgent = (data, anchor) => {
		var tasks = [];
		this.state.tasks.forEach(function (i, t) {
			if (data.indexOf(i.id) !== -1) tasks.push(i);
		});
		this.setState({ current_selected_tasks: tasks, task_agent_menu_open: true, task_agent_menu_anchor: anchor });
	}

	// editTaskAgents:
	editTaskAgents = (agent) => {
		// For this call we need to pass a set of task ids and statuses
		var payload = [];
		var self = this;
		this.state.current_selected_tasks.forEach(function (i, t) {
			var agent_update = { id: i.id, agent_id: agent || '' };
			payload.push(agent_update);
		});
		tasks.editTaskAgents(payload, response => {
			self.getTasks();
			self.setState({ snackbar_open: true, snackbar_message: 'Task agent updated' });
		});
	}

	// cancelTasks:
	cancelTasks = (data) => {
		var statuses = [];
		var self = this;
		this.state.tasks.forEach(function (i, t) {
			if (data.indexOf(i.id) !== -1) statuses.push({ id: i.id, status: 'Cancelled' });
		});
		tasks.editTaskStatuses(statuses, response => {
			self.getTasks();
			self.setState({ snackbar_open: true, snackbar_message: 'Task status updated' });
		});
	}

	// makeBid
	makeBid = (task_id, amount) => {
		let bid = { task_id: task_id, amount: amount, provider_id: this.state.user.id }
		const self = this;
		tasks.addTaskBid(bid, response => {
			self.getTasks();
			self.setState({ snackbar_open: true, snackbar_message: 'Bid submitted' });
		});
	}

	// editTaskProvider
	editTaskProvider = (task_id, provider_id, price) => {
		const self = this;
		tasks.editTaskProvider(task_id, provider_id, price, response => {
			self.getTasks();
			self.setState({ snackbar_open: true, snackbar_message: 'Task posting moved into orders', order_notification: true });
		});
	}

	// editTaskStatus:
	editTaskStatus = (data, anchor) => {
		var tasks = [];
		this.state.tasks.forEach(function (i, t) {
			if (data.indexOf(i.id) !== -1) tasks.push(i);
		});
		this.setState({ current_selected_tasks: tasks, task_status_menu_open: true, task_status_menu_anchor: anchor });
	}

	// isValidStatus:
	isValidStatus = (status) => {
		let found = false;
		if (status === 'Cancelled') {
			this.state.current_selected_tasks.forEach(task => {
				if (['Requested', 'Accepted', 'Unassigned', 'Assigned'].indexOf(task.status) !== -1) found = true;
			});
			return found
		}
		let service_ids = [];
		this.state.current_selected_tasks.forEach(task => {
			service_ids.push(task.service_id);
			if (!task.service_id) found = true;
		});
		this.state.services.forEach(service => {
			if (service_ids.indexOf(service.id) !== -1) {
				if (!service.statuses || service.statuses.length === 0) found = true;
				if (service.statuses) {
					service.statuses.forEach(stat => {
						if (stat === status.system_name) found = true;
					});
				}
			}
		});
		return found;
	}

	// editTaskStatuses:
	editTaskStatuses = (status) => {
		// For this call we need to pass a set of task ids and statuses
		var statuses = [];
		var self = this;
		this.state.current_selected_tasks.forEach(function (i, t) {
			var status_update = { id: i.id, status: status };
			let valid = true;
			if (status === 'Cancelled' && (i.status !== 'Requested' && i.status !== 'Accepted' && i.status !== 'Unassigned' && i.status !== 'Assigned')) {
				valid = false;
			}
			if (i.status === status) valid = false;
			if (valid) {
				statuses.push(status_update);
			} else {
				self.setState({ snackbar_open: true, snackbar_message: 'Invalid status selected' });
			}
		});
		tasks.editTaskStatuses(statuses, response => {
			self.getTasks();
			self.setState({ snackbar_open: true, snackbar_message: 'Task status updated' });
		});
	}

	// editTaskRating:
	editTaskRating = (rating) => {
		var self = this;
		tasks.editTaskRating(rating, response => {
			self.getTasks();
			self.setState({ snackbar_open: true, snackbar_message: 'Task rating submitted' });
		});
	}

	// handleSetAgent
	handleSetTaskAgent = (agent_id, event) => {
		this.editTaskAgents(agent_id);
		this.setState({ task_agent_menu_open: false });
	}

	// handleSetTaskStatus: setting a new status
	handleSetTaskStatus = (event) => {
		this.editTaskStatuses(event.target.firstChild.nodeValue);
		this.setState({ task_status_menu_open: false });
	}

	////////////////////////
	// Request Menu Options
	////////////////////////

	// closeDrawers
	closeDrawers = () => this.setState({ task_request_drawer: false, post_request_drawer: false, task_request_screen: '', task_request_screen_title: '', show_menu: !this.state.show_menu, request_progress: false })

	// handleHireRunner:
	hireRunner = () => {
		this.closeDrawers();
		this.setState({ post_request_drawer: true, current_page_view: 'map' })
	}

	// launchRequestProcess:
	launchRequestProcess = (request_function, request_title) => {
		this.closeDrawers();
		this.setState({ task_request_drawer: true, task_request_screen: request_function, task_request_screen_title: request_title, current_page_view: 'map', request_progress: true, landing_desktop: false });
	}

	// launchRequestProcess:
	launchRequestProcessService = (request_function, request_title, service) => {
		this.closeDrawers();
		this.setState({ task_request_drawer: true, task_request_screen: request_function, task_request_screen_title: request_title, current_page_view: 'map', request_progress: true, landing_desktop: false, current_service: service, mega_menu: false });
	}

	// launchRequestProcessProvider:
	launchRequestProcessProvider = (provider, service) => {
		this.closeDrawers();
		this.setState({ task_request_drawer: true, content_drawer: false, content_drawer_screen: '', task_request_screen: service.service_function, task_request_screen_title: 'Request', current_provider: provider, current_service: service, request_progress: true });
	}

	// launchMegaMenu:
	launchMegaMenu = (request_function) => {
		this.setState({ mega_menu: true, mega_menu_request_function: request_function });
	}

	//////////////////////////////////////////////////////////////////
	// Snackbar Interaction
	//////////////////////////////////////////////////////////////////

	// handleSnackbarClose: triggered when the snackbar close event occurs
	handleSnackbarClose = (e, reason) => {
		if (reason === 'clickaway') return;
		this.setState({ snackbar_open: false });
	}

	//////////////////////////////////////////////////////////////////
	// Map events
	//////////////////////////////////////////////////////////////////

	// handleNavigate
	handleNavigate = (destination) => {
		this.setState({ origin: this.state.current_location, destination: destination, navigation_drawer: true });
	}

	// handleGoTo
	handleGoTo = (destination) => {
		this.setState({ map_location: destination });
	}

	/////////////////////////////////////////////////////////
	// Viewing a provider
	/////////////////////////////////////////////////////////

	// viewProvider:
	viewProvider = (data, provider_view_allow_request) => {
		var providers = [];
		this.state.providers.forEach(function (i, t) {
			if (data.indexOf(i.id) !== -1) providers.push(i);
		});
		this.setState({ current_selected_providers: providers, content_drawer: true, content_drawer_screen: 'providers', provider_view_allow_request: provider_view_allow_request });
	}

	// render()
	render() {
		const { classes } = this.props;
		const self = this;
		const serviceLookup = {};
		if (this.state.services) {
			this.state.services.forEach(service => {
				serviceLookup[service.system_name] = service;
			});
		}
		return (
			<div className={classes.root}>
				<AppBar position="absolute"   className={classes.appBar} elevation={0}>
					<Toolbar className={classes.appBarToolbar}>
						{this.state.user && this.state.user.user_type ? // If we have any user we show the application menu.
							<IconButton className={classes.menuButton}   aria-label="Menu" onClick={(e) => this.setState({ menu_drawer: !this.state.menu_drawer })}>
								<MenuIcon />
							</IconButton> : null}
						<img alt="Ylla Logo" className={classes.logo} src={'./ylla.png'} />
						<Button className={classNames(classes.headerMenuButton, classes.appBarButton)} onClick={(e) => this.setState({ show_menu: !this.state.show_menu })}>
							<span className={classes.headerMenuButtonSpan}>Menu</span>
							<svg className={classes.headerMenuButtonSvg} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" viewBox="0 0 24 24">
								<path d="M3 12h18M3 6h18M3 18h18" />
							</svg>
						</Button>
						<div className={classNames(classes.headerInternal, (this.state.show_menu ? classes.headerInternalActive : null))}>
							{this.state.user && this.state.user.user_type === 'provider' ? // For providers we show their name
								<Button className={classNames(classes.appBarButton, classes.fullWidth)} onClick={() => this.setState({ current_page_view: 'profile', tasks_drawer: false, agent_drawer: false, profile_menu_open: false, profile_menu_anchor: null })}>
									{this.state.user.name}
								</Button> : null}
							{this.state.user && this.state.user.user_type &&
								this.state.user.user_type === 'provider' ? // Provider option to manually create task
								<Button
									className={classNames(classes.appBarButton, classes.fullWidth)}
									onClick={() => this.setState({ content_drawer: true, content_drawer_screen: 'createtask', current_page_view: 'map' })}>
									New task
								</Button> : null}
							{!this.state.user.user_type || this.state.user.user_type === 'consumer' ?
								<span>
                  <a href="http://tokensale.yl.la" className="button blue">Token Sale</a>&nbsp;&nbsp;&nbsp;
                  {/*<a href="http://docs.yl.la" className="button blue">API Docs</a>*/}
									<Button disabled={this.state.request_progress} className={classNames(classes.appBarButton, classes.fullWidth)} onMouseOver={() => this.launchMegaMenu('findapro')} onClick={() => this.launchRequestProcess('findapro', 'Find A Pro')}>Find a pro</Button>
									<Button disabled={this.state.request_progress} className={classNames(classes.appBarButton, classes.fullWidth)} onClick={() => this.hireRunner()}>Hire a runner</Button>
									<span className={classes.headerSeparator}>|</span>
									<Button disabled={this.state.request_progress} className={classNames(classes.appBarButton, classes.fullWidth)} onClick={() => this.launchRequestProcess('book', 'Book')}>Book</Button>
									<Button disabled={this.state.request_progress} className={classNames(classes.appBarButton, classes.fullWidth)} onClick={() => this.launchRequestProcess('reserve', 'Reserve')}>Reserve</Button>
									<Button disabled={this.state.request_progress} className={classNames(classes.appBarButton, classes.fullWidth)} onClick={() => this.launchRequestProcess('order', 'Order Food')}>Food</Button>
								</span> : null}
							<AppSearch
								agents={this.state.agents}
								providers={this.state.providers}
								services={this.state.services}
								updateMapLocation={this.handleGoTo}
								updateMapLocationWithPin={(destination) => this.setState({ map_location: destination, map_pin: destination })}
								viewProvider={(data) => this.viewProvider(data, true)}
								selectService={(service, service_function) => this.setState({ current_service: service, service_function: service_function, task_request_drawer: true, task_request_screen: service_function })}
							/>
							{!this.state.user.user_type ?
								<Button className={classNames(classes.appBarButtonOutline, classes.fullWidth)} onClick={(event) => this.setState({ showRegistrationDrawer: !this.state.showRegistrationDrawer, show_menu: false })}>Sign In</Button>
								: null}
							{this.state.user && this.state.user.user_type && // All users except administrators see posts
								this.state.user.user_type !== 'administrator' ?
								<Tooltip id="tooltip-icon" title="See posts" placement="bottom">
									<IconButton
										onClick={(e) => this.setState({ posts_drawer: true, tasks_drawer: false, current_page_view: 'map' })}>
										<Badge
											color={(this.state.post_notification ? 'error' : 'primary')}
											badgeContent={
												this.state.tasks
													.filter(task => !task.provider_id || task.provider_id === '0' || task.provider_id === '')
													.filter(task => {
														if (this.state.user.user_type === 'consumer' && task.status !== 'Cancelled') return true;
														if (task.status !== 'Cancelled' && this.state.user.categories && this.state.user.categories.indexOf(task.category) !== -1) return true;
														return false;
													})
													.length
											}
											className={classes.margin}>
											<LocalActivityIcon />
										</Badge>
									</IconButton>
								</Tooltip> : null}
							{this.state.route_legs && this.state.route_legs.length > 0 ? // Navigation notification
								<Tooltip id="tooltip-icon" title="Navigation Instructions" placement="bottom">
									<IconButton
										onClick={() => this.setState({ navigation_drawer: true })}>
										<NavigationIcon />
									</IconButton>
								</Tooltip> : null}
							{this.state.user && this.state.user.user_type === 'consumer' ? // Show consumers a badge of their orders.
								<Tooltip id="tooltip-icon" title="Orders" placement="bottom">
									<IconButton
										onClick={() => this.setState({ order_notification: false, tasks_drawer: true, posts_drawer: false, current_page_view: 'map' })}>
										<Badge color={(this.state.order_notification ? 'error' : 'primary')} badgeContent={this.state.tasks.filter(task => { return task.provider_id && task.providerid !== '' && task.provider_id !== '0' }).length} className={classes.margin}>
											<ShoppingBasketIcon />
										</Badge>
									</IconButton>
								</Tooltip> : null}
							{this.state.user && this.state.user.user_type &&
								this.state.user.user_type === 'provider' ? // Show providers an icon to see their agents
								<Tooltip id="tooltip-icon" title="See agents" placement="bottom">
									<IconButton
										onClick={() => this.setState({ agent_drawer: true, consumer_drawer: false, current_page_view: 'map' })}>
										<Badge color="primary" badgeContent={this.state.agents.filter(agent => { return agent.provider_id === self.state.user.id }).length} className={classes.margin}>
											<SupervisorAccountIcon />
										</Badge>
									</IconButton>
								</Tooltip> : null}
							{this.state.user && this.state.user.user_type && // Providers and agents see tasks and customer notification
								(this.state.user.user_type === 'provider' || this.state.user.user_type === 'agent') ?
								<span>
									<Tooltip id="tooltip-icon" title="See Tasks" placement="bottom">
										<IconButton
											onClick={() => this.setState({ tasks_drawer: true, posts_drawer: false, current_page_view: 'map' })}>
											<Badge
												color={(this.state.task_notification ? 'error' : 'primary')}
												badgeContent={
													this.state.tasks
														.filter(task => { return task.provider_id && task.provider_id !== '' && task.provider_id !== '0' })
														.length
												}
												className={classes.margin}>
												<EventIcon />
											</Badge>
										</IconButton>
									</Tooltip>
									<Tooltip id="tooltip-icon" title="See customers" placement="bottom">
										<IconButton
											onClick={() => this.setState({ consumer_drawer: true, agent_drawer: false, current_page_view: 'map' })}>
											<Badge
												color="primary"
												badgeContent={this.state.consumers.length}
												className={classes.margin}>
												<PeopleIcon />
											</Badge>
										</IconButton>
									</Tooltip>
								</span> : null}
							{this.state.user && this.state.user.user_type ? // All users see the logout and chat icons
								<span>
									<Tooltip id="tooltip-icon" title={this.state.message_tooltip} placement="bottom">
										<IconButton
											onClick={() => this.setState({ content_drawer: true, content_drawer_screen: 'chat' })}
										>
											<Badge
												color={(this.state.message_count > 0 ? 'error' : 'primary')}
												badgeContent={this.state.message_count}
												className={classes.margin}
											>
												<ChatIcon />
											</Badge>
										</IconButton>
									</Tooltip>
									{this.state.current_page_view !== 'map' ? // Return to map
										<Tooltip id="tooltip-icon" title="Return to map" placement="bottom">
											<IconButton onClick={(e) => this.setState({ current_page_view: 'map' })}>
												<MapIcon />
											</IconButton>
										</Tooltip> : null}
									<Tooltip id="tooltip-icon" title="Profile" placement="bottom">
										<IconButton
											onClick={(e) => this.setState({ profile_menu_open: true, profile_menu_anchor: e.currentTarget })}
										>
											<AccountCircleIcon />
										</IconButton>
									</Tooltip>
								</span> : null}
							{this.state.user && this.state.user.user_type === 'agent' ? // Agent can go off duty
								<FormControlLabel
									control={
										<Switch
											checked={!this.state.agent_active}
											onChange={() => this.toggleAgentActive()}
											value={!this.state.agent_active}
										/>
									}
									label="Off duty"
								/> : null}
						</div>
					</Toolbar>
				</AppBar>
				{this.state.user && this.state.user.user_type ? //  Application side drawer
					<Drawer
						variant="permanent"
						classes={{ paper: classNames(classes.applicationDrawerPaper, !this.state.menu_drawer && classes.applicationDrawerPaperClose) }}
						open={this.state.menu_drawer}
					>
						<div className={classes.toolbar} />
						<List disablePadding>
							{this.state.user && this.state.user.user_type !== 'administrator' ?
								<ListItem button onClick={() => this.setState({ current_page_view: 'profile', tasks_drawer: false, agent_drawer: false, profile_menu_open: false, profile_menu_anchor: null })} className={classes.nested}>
									<Tooltip id="tooltip-icon" title="Profile" placement="bottom">
										<ListItemIcon className={classes.sidebarList}>
											<AccountCircleIcon />
										</ListItemIcon>
									</Tooltip>
									<ListItemText primary="Profile" classes={{ root: classNames(classes.sidebarList) }} disableTypography={true} />
								</ListItem> : null}
							<ListItem button onClick={() => this.setState({ current_page_view: 'account', tasks_drawer: false, agent_drawer: false, profile_menu_open: false, profile_menu_anchor: null })} className={classes.nested}>
								<Tooltip id="tooltip-icon" title="Account" placement="bottom">
									<ListItemIcon className={classes.sidebarList}>
										<SecurityIcon />
									</ListItemIcon>
								</Tooltip>
								<ListItemText primary="Account" classes={{ root: classNames(classes.sidebarList) }} disableTypography={true} />
							</ListItem>
							{this.state.user && this.state.user.user_type !== 'administrator' ? <ListItem button onClick={() => this.setState({ current_page_view: 'notifications' })} className={classes.nested}>
								<Tooltip id="tooltip-icon" title="Notifications" placement="bottom">
									<ListItemIcon className={classes.sidebarList}>
										<NotificationsIcon />
									</ListItemIcon>
								</Tooltip>
								<ListItemText primary="Notifications" classes={{ root: classNames(classes.sidebarList) }} disableTypography={true} />
							</ListItem> : null}
							{this.state.user && this.state.user.user_type !== 'administrator' ? <ListItem button onClick={() => this.setState({ current_page_view: 'payments' })} className={classes.nested}>
								<Tooltip id="tooltip-icon" title="Payments" placement="bottom">
									<ListItemIcon className={classes.sidebarList}>
										<ShoppingCartIcon />
									</ListItemIcon>
								</Tooltip>
								<ListItemText primary="Payments" classes={{ root: classNames(classes.sidebarList) }} disableTypography={true} />
							</ListItem> : null}
							<Divider />
							{this.state.user && this.state.user.user_type === 'consumer' ? // Consumer menu items
								<div>
									<ListItem button onClick={() => this.setState({ current_page_view: 'share' })} className={classes.nested}>
										<Tooltip id="tooltip-icon" title="Share location" placement="bottom">
											<ListItemIcon className={classes.sidebarList}>
												<ScreenShareIcon />
											</ListItemIcon>
										</Tooltip>
										<ListItemText primary="Share" classes={{ root: classNames(classes.sidebarList) }} disableTypography={true} />
									</ListItem>
									<ListItem button className={classes.nested}>
										<Tooltip id="tooltip-icon" title="Wallet" placement="bottom">
											<ListItemIcon className={classes.sidebarList}>
												<AccountBalanceIcon />
											</ListItemIcon>
										</Tooltip>
										<ListItemText primary="Wallet" classes={{ root: classNames(classes.sidebarList) }} disableTypography={true} />
									</ListItem>
									<Divider />
									<ListItem button className={classes.nested}>
										<Tooltip id="tooltip-icon" title="Friends" placement="bottom">
											<ListItemIcon className={classes.sidebarList}>
												<PeopleIcon />
											</ListItemIcon>
										</Tooltip>
										<ListItemText primary="Friends" classes={{ root: classNames(classes.sidebarList) }} disableTypography={true} />
									</ListItem>
									<ListItem button className={classes.nested}>
										<Tooltip id="tooltip-icon" title="Places" placement="bottom">
											<ListItemIcon className={classes.sidebarList}>
												<PlaceIcon />
											</ListItemIcon>
										</Tooltip>
										<ListItemText primary="Places" classes={{ root: classNames(classes.sidebarList) }} disableTypography={true} />
									</ListItem>
								</div> : null}
							{this.state.user && this.state.user.user_type === 'administrator' ? // Admin menu items
								<div>
									<ListItem button onClick={() => this.setState({ current_page_view: 'home' })} className={classes.nested}>
										<Tooltip id="tooltip-icon" title="Analytics" placement="bottom">
											<ListItemIcon className={classes.sidebarList}>
												<ShowChartIcon />
											</ListItemIcon>
										</Tooltip>
										<ListItemText primary="Analytics" classes={{ root: classNames(classes.sidebarList) }} disableTypography={true} />
									</ListItem>
									<Divider />
									<ListItem button onClick={() => this.setState({ current_page_view: 'tasks' })} className={classes.nested}>
										<Tooltip id="tooltip-icon" title="Tasks" placement="bottom">
											<ListItemIcon className={classes.sidebarList}>
												<ViewListIcon />
											</ListItemIcon>
										</Tooltip>
										<ListItemText primary="Tasks" classes={{ root: classNames(classes.sidebarList) }} disableTypography={true} />
									</ListItem>
									<Divider />
									<ListItem button onClick={() => this.setState({ current_page_view: 'providers' })} className={classes.nested}>
										<Tooltip id="tooltip-icon" title="Businesses" placement="bottom">
											<ListItemIcon className={classes.sidebarList}>
												<BusinessIcon />
											</ListItemIcon>
										</Tooltip>
										<ListItemText primary="Businesses" classes={{ root: classNames(classes.sidebarList) }} disableTypography={true} />
									</ListItem>
									<ListItem button onClick={() => this.setState({ current_page_view: 'agents' })} className={classes.nested}>
										<Tooltip id="tooltip-icon" title="Agents" placement="bottom">
											<ListItemIcon className={classes.sidebarList}>
												<SupervisorAccountIcon />
											</ListItemIcon>
										</Tooltip>
										<ListItemText primary="Agents" classes={{ root: classNames(classes.sidebarList) }} disableTypography={true} />
									</ListItem>
									<ListItem button onClick={() => this.setState({ current_page_view: 'consumers' })} className={classes.nested}>
										<Tooltip id="tooltip-icon" title="Customers" placement="bottom">
											<ListItemIcon className={classes.sidebarList}>
												<FaceIcon />
											</ListItemIcon>
										</Tooltip>
										<ListItemText primary="Customers" classes={{ root: classNames(classes.sidebarList) }} disableTypography={true} />
									</ListItem>
									<Divider />
									<ListItem button onClick={() => this.setState({ current_page_view: 'services' })} className={classes.nested}>
										<Tooltip id="tooltip-icon" title="Services" placement="bottom">
											<ListItemIcon className={classes.sidebarList}>
												<EventIcon />
											</ListItemIcon>
										</Tooltip>
										<ListItemText primary="Services" classes={{ root: classNames(classes.sidebarList) }} disableTypography={true} />
									</ListItem>
									<ListItem button onClick={() => this.setState({ current_page_view: 'categories' })} className={classes.nested}>
										<Tooltip id="tooltip-icon" title="Categories" placement="bottom">
											<ListItemIcon className={classes.sidebarList}>
												<LayersIcon />
											</ListItemIcon>
										</Tooltip>
										<ListItemText primary="Categories" classes={{ root: classNames(classes.sidebarList) }} disableTypography={true} />
									</ListItem>
									<ListItem button onClick={() => this.setState({ current_page_view: 'referencedata' })} className={classes.nested}>
										<Tooltip id="tooltip-icon" title="Text" placement="bottom">
											<ListItemIcon className={classes.sidebarList}>
												<TextFieldsIcon />
											</ListItemIcon>
										</Tooltip>
										<ListItemText primary="Text" classes={{ root: classNames(classes.sidebarList) }} disableTypography={true} />
									</ListItem>
									<Divider />
								</div> : null}
							<Divider />
							{this.state.user // Go to customers list
								&& this.state.user.user_type
								&& (this.state.user.user_type === 'provider' || this.state.user.user_type === 'agent') ?
								<div>
									<ListItem button onClick={() => this.setState({ current_page_view: 'consumers' })} className={classes.nested}>
										<Tooltip id="tooltip-icon" title="Customers" placement="bottom">
											<ListItemIcon className={classes.sidebarList}>
												<FaceIcon />
											</ListItemIcon>
										</Tooltip>
										<ListItemText primary="Customers" classes={{ root: classNames(classes.sidebarList) }} disableTypography={true} />
									</ListItem>
								</div> : null}
							<Divider />
							{this.state.user && this.state.user.user_type === 'provider' ? // Go to agent list
								<ListItem button onClick={() => this.setState({ current_page_view: 'agents' })} className={classes.nested}>
									<Tooltip id="tooltip-icon" title="Agents" placement="bottom">
										<ListItemIcon className={classes.sidebarList}>
											<SupervisorAccountIcon />
										</ListItemIcon>
									</Tooltip>
									<ListItemText primary="Agents" classes={{ root: classNames(classes.sidebarList) }} disableTypography={true} />
								</ListItem> : null}
							<Divider />
							{this.state.user &&
								this.state.user.user_type === 'provider' &&
								this.state.user.services &&
								this.state.user.services.length > 0 ? // Services each have their own list item
								<div>
									{this.state.user.services.map(service => {
										return <ListItem button className={classes.nested} onClick={() => this.setState({ profile_service: serviceLookup[service], current_page_view: 'profile_service', tasks_drawer: false, agent_drawer: false })}>
											<Tooltip id="tooltip-icon" title={serviceLookup[service] ? serviceLookup[service].title : ''} placement="bottom">
												<ListItemIcon className={classes.sidebarList}>
													<QuestionAnswerIcon />
												</ListItemIcon>
											</Tooltip>
											<ListItemText primary={serviceLookup[service] ? serviceLookup[service].title : ''} classes={{ root: classNames(classes.sidebarList) }} disableTypography={true} />
										</ListItem>
									})}
								</div> : null}
						</List>
					</Drawer> : null}
				<main className={classes.appFrame}>
					<div className={classes.toolbar} />
					{this.state.current_page_view === 'map' ? // The map sits as the primary content at all times.
						<IconButton
							className="layers__icon"
							onClick={() => this.setState({ content_drawer: true, content_drawer_screen: 'layers', current_page_view: 'map' })}>
							<LayersIcon />
						</IconButton> : null}
					<TaskMap
						key="page-map"
						language={this.state.map_language}
						show_buildings={this.state.show_buildings}
						live_locations={this.state.live_locations}
						current_location={this.state.current_location}
						origin={this.state.origin}
						destination={this.state.destination}
						location={this.state.map_location}
						pin={this.state.map_pin}
						bounds={this.state.map_bounds}
						role={this.props.role}
						tasks={this.state.tasks}
						user={this.state.user}
						category_keys={this.state.category_keys}
						providers={this.state.providers.filter(prov => { return prov.status === 'Active' })}
						navigate={this.handleNavigate}
						goto={this.handleGoTo}
						chat={(user) => this.setState({ chat_user: user, content_drawer: true, content_drawer_screen: 'chat' })}
						viewTask={(data) => this.viewTask(data)}
						viewProvider={(data) => this.viewProvider(data, true)}
						viewFeatures={(data) => this.setState({ osm_features: data, content_drawer: true, content_drawer_screen: 'osm_features' })}
						viewSharingOptions={() => this.setState({ current_page_view: 'share' })}
						viewShareUser={(user) => this.setState({ share_user: user, content_drawer_screen: 'share_user', content_drawer: true })}
						updateInstructions={(route_legs) => this.setState({ route_legs: route_legs })} />
					{this.state.user && this.state.user.user_type === 'administrator' && this.state.current_page_view === 'home' ?
						<Analytics
							key="page-adminhome"
							tasks={this.state.tasks}
							services={this.state.services}
							categories={this.state.categories}
							consumers={this.state.consumers}
							agents={this.state.agents}
							providers={this.state.providers}
							editProviders={() => this.setState({ current_page_view: 'providers' })}
							editAgents={() => this.setState({ current_page_view: 'agents' })}
							editConsumers={() => this.setState({ current_page_view: 'consumers' })}
							editServices={() => this.setState({ current_page_view: 'services' })}
							editTasks={() => this.setState({ current_page_view: 'tasks' })}
						/> : null
					}
					{this.state.current_page_view === 'account' && this.state.user.user_type ?
						<ProfileAccount
							user={this.state.user}
							editUser={(user) => this.editUser(user)}
							updatePassword={this.updatePassword}
						/> : null
					}
					{this.state.current_page_view === 'share' && this.state.user.user_type === 'consumer' ?
						<ProfileConsumerShare
							user={this.state.user}
							editUser={(user) => this.editUser(user)}
						/> : null
					}
					{this.state.current_page_view === 'notifications' ?
						<ProfileNotifications
							user={this.state.user}
							editUser={(user) => this.editUser(user)}
						/> : null
					}
					{this.state.current_page_view === 'payments' ?
						<ProfilePayments
							user={this.state.user}
							referencedata={this.state.referencedata}
							editUser={(user) => this.editUser(user)}
						/> : null
					}
					{this.state.current_page_view === 'profile' && this.state.user.user_type === 'consumer' ?
						<ProfileConsumer
							user={this.state.user}
							current_location={this.state.current_location}
							categories={this.state.categories.filter(category => { return category.status === 'Active' })}
							updatePassword={this.updatePassword}
							editUser={(user) => this.editUser(user)}
							updateMapLocation={this.handleGoTo}
							updateMapBounds={(bounds) => this.setState({ map_bounds: bounds })}
						/> : null
					}
					{this.state.current_page_view === 'profile' && this.state.user.user_type === 'agent' && this.state.user.can_edit_profile ?
						<ProfileAgent
							user={this.state.user}
							referencedata={this.state.referencedata}
							provider_edit={false}
							current_location={this.state.current_location}
							providers={this.state.providers}
							services={this.state.services}
							updatePassword={this.updatePassword}
							editUser={(user) => this.editUser(user)}
							close={false}
							closeprofile={() => this.setState({ current_page_view: 'map', tasks_drawer: true, agent_drawer: true, agent_profile_edit: false, agent_profile_user: {} })}
							updateMapLocation={this.handleGoTo}
							updateMapBounds={(bounds) => this.setState({ map_bounds: bounds })}
						/> : null
					}
					{this.state.current_page_view === 'profile' && this.state.user.user_type === 'provider' && this.state.agent_profile_edit ?
						<ProfileAgent
							user={this.state.agent_profile_user}
							referencedata={this.state.referencedata}
							provider_edit={true}
							current_location={this.state.current_location}
							providers={this.state.providers}
							services={this.state.services}
							updatePassword={this.updatePassword}
							editUser={(user) => this.editUser(user)}
							close={true}
							closeprofile={() => this.setState({ current_page_view: 'map', tasks_drawer: true, agent_drawer: true, agent_profile_edit: false, agent_profile_user: {} })}
							updateMapLocation={this.handleGoTo}
							updateMapBounds={(bounds) => this.setState({ map_bounds: bounds })}
						/> : null
					}
					{this.state.current_page_view === 'profile' && this.state.user.user_type === 'provider' && !this.state.agent_profile_edit ?
						<ProfileProvider
							user={this.state.user}
							current_location={this.state.current_location}
							services={this.state.services.filter(service => service.status === 'Active')}
							categories={this.state.categories.filter(category => { return category.status === 'Active' })}
							referencedata={this.state.referencedata}
							updatePassword={this.updatePassword}
							editUser={(user) => this.editUser(user)}
							updateMapLocation={this.handleGoTo}
							updateMapBounds={(bounds) => this.setState({ map_bounds: bounds })}
							chat={(user) => this.setState({ chat_user: user, content_drawer: true, content_drawer_screen: 'chat' })}
							viewProvider={(data) => this.viewProvider(data, false)}
							editProviderStatus={(id, status) => { this.editProviderStatuses(status, [id]) }}
						/> : null
					}
					{this.state.services && this.state.services.length > 0 && this.state.current_page_view === 'profile_service' && this.state.user.user_type === 'provider' && !this.state.agent_profile_edit ?
						<ProfileService
							user={this.state.user}
							current_location={this.state.current_location}
							services={this.state.services.filter(service => service.status === 'Active')}
							categories={this.state.categories.filter(category => { return category.status === 'Active' })}
							referencedata={this.state.referencedata}
							updatePassword={this.updatePassword}
							editUser={(user) => this.editUser(user)}
							updateMapLocation={this.handleGoTo}
							updateMapBounds={(bounds) => this.setState({ map_bounds: bounds })}
							chat={(user) => this.setState({ chat_user: user, content_drawer: true, content_drawer_screen: 'chat' })}
							viewProvider={(data) => this.viewProvider(data, false)}
							service={this.state.profile_service}
						/> : null
					}
					{this.state.user && this.state.user.user_type === 'administrator'
						&& this.state.current_page_view === 'services' ? // Admin service list
						<ServiceList
							key="page-servicelist"
							services={this.state.services}
							questions={this.state.questions}
							categories={this.state.categories}
							editServiceStatus={(e, data) => this.editServiceStatus(data, e.currentTarget)}
							addService={() => this.addService()}
							editService={(e, data) => this.editService(data, e.currentTarget)}
							addServiceQuestion={(service_ids, question_id) => this.addServiceQuestion(service_ids, question_id)}
							removeServiceQuestion={(service_ids, question_id) => this.removeServiceQuestion(service_ids, question_id)}
							deleteService={(e, data) => this.deleteService(data, e.currentTarget)}
							editQuestionStatus={(e, data) => this.editQuestionStatus(data, e.currentTarget)}
							addQuestion={() => this.addQuestion()}
							editQuestion={(e, data) => this.editQuestion(data, e.currentTarget)}
							deleteQuestion={(e, data) => this.deleteQuestion(data, e.currentTarget)}
						/> : null}
					{this.state.user && this.state.user.user_type === 'administrator'
						&& this.state.current_page_view === 'categories' ? // Admin category list
						<CategoryList
							key="page-categorylist"
							editCategoryStatus={(e, data) => this.editCategoryStatus(data, e.currentTarget)}
							addCategory={(data) => this.addCategory()}
							editCategory={(data) => this.editCategory(data)}
							deleteCategory={(data) => this.deleteCategory(data)}
							categories={this.state.categories}
						/> : null}
					{this.state.user && this.state.user.user_type === 'administrator'
						&& this.state.current_page_view === 'referencedata' ? // Admin reference data list
						<ReferenceDataList
							key="cst-referencedatalist"
							referencedata={this.state.referencedata}
							editReferenceDataStatus={(e, data) => this.editReferenceDataStatus(data, e.currentTarget)}
							addReferenceDataItem={() => this.addReferenceDataItem()}
							editReferenceDataItem={(data) => this.editReferenceDataItem(data)}
						/> : null}
					{this.state.current_page_view === 'tasks' ?
						<TaskList
							user={this.state.user}
							tasks={this.state.tasks}
							agents={this.state.agents}
							providers={this.state.providers}
							services={this.state.services}
							consumers={this.state.consumers}
							role={this.props.role}
							viewTask={(data) => this.viewTask(data)}
							chatAgent={(e, data) => this.chatAgent(data)}
							editTaskAgent={(e, data) => this.editTaskAgent(data, e.currentTarget)}
							editTaskStatus={(e, data) => this.editTaskStatus(data, e.currentTarget)}
						/> : null}
					{this.state.user && this.state.user.user_type === 'administrator' && this.state.current_page_view === 'providers' ?
						<ProviderList // The table of providers
							key="page-providerlist"
							providers={this.state.providers}
							chatProvider={(e, data) => this.chatProvider(data)}
							editProviderStatus={(e, data) => this.editProviderStatus(data, e.currentTarget)}
						/> : null}
					{this.state.user && (this.state.user.user_type === 'administrator' || this.state.user.user_type === 'provider') && this.state.current_page_view === 'agents' ?
						<AgentList // The table of agents
							user={this.state.user}
							tasks={this.state.tasks}
							agents={this.state.agents.filter(agent => { return (agent.provider_id === this.state.user.id) || this.state.user.user_type === 'administrator' })}
							providers={this.state.providers}
							services={this.state.services}
							addAgent={() => this.setState({ agent_edit_dialog_open: true })}
							chatAgent={(e, data) => this.chatAgent(data)}
							editAgentStatus={(e, data) => this.editAgentStatus(data, e.currentTarget)}
						/> : null}
					{this.state.user && (this.state.user.user_type === 'administrator' || this.state.user.user_type === 'provider' || this.state.user.user_type === 'agent') && this.state.current_page_view === 'consumers' ?
						<ConsumerList // The table of consumers
							key="page-consumerlist"
							consumers={this.state.consumers}
							tasks={this.state.tasks}
							chatConsumer={(e, data) => this.chatConsumer(data)}
						/> : null}
				</main>
				{!this.state.user || Object.keys(this.state.user).length === 0 ?
					<Drawer
						anchor="left"
						variant="persistent"
						open={this.state.showRegistrationDrawer}
						ModalProps={{ elevation: 0, BackdropProps: { invisible: true } }}
						classes={{ paper: classNames(classes.contentDrawerPaper, classes.leftDrawer) }}>
						<div className={classes.toolbar} />
						<RegistrationPages
							login={this.login}
							login_progress={this.state.login_progress}
							register_progress={this.state.register_progress}
							referencedata={this.state.referencedata}
							registerRunner={(e, data) => this.saveRunner(data)}
							register={this.register}
							categories={this.state.categories.filter(category => { return category.status === 'Active' })}
							services={this.state.services}
							closeModal={(event) => this.setState({ showRegistrationDrawer: !this.state.showRegistrationDrawer })}
						/>
					</Drawer> : null}
				{this.state.route_legs && this.state.route_legs.length > 0 && this.state.navigation_drawer ? // Navigation drawer
					<Drawer
						anchor="right"
						variant="persistent"
						open={true}
						ModalProps={{ elevation: 0, BackdropProps: { invisible: true } }}
						classes={{ paper: classNames(classes.contentDrawerPaper, classes.rightDrawer) }}>
						<div className={classes.toolbar} />
						<NavigationSidebar
							route_legs={this.state.route_legs}
							goto={this.handleGoTo}
							close={() => { this.setState({ navigation_drawer: false }) }}
							stopNavigation={() => this.setState({ navigation_drawer: false, destination: [], route_legs: [] })}
						/>
					</Drawer> : null}
				{this.state.user && this.state.user.user_type === 'provider' && this.state.agent_drawer ? // Agent drawer on the right hand side
					<Drawer
						anchor="right"
						variant="persistent"
						open={this.state.agent_drawer}
						ModalProps={{ elevation: 0, BackdropProps: { invisible: true } }}
						classes={{ paper: classNames(classes.contentDrawerPaper, classes.rightDrawer) }}>
						<div className={classes.toolbar} />
						<AgentSidebar
							agents={this.state.agents.filter(agent => { return (agent.status === 'Active' && agent.provider_id === this.state.user.id) })}
							tasks={this.state.tasks}
							providers={this.state.providers}
							services={this.state.services}
							goto={this.handleGoTo}
							chat={(user) => this.setState({ chat_user: user, content_drawer: true, content_drawer_screen: 'chat' })}
							navigate={this.handleNavigate}
							profile={(agent) => this.setState({ current_page_view: 'profile', tasks_drawer: false, agent_drawer: false, agent_profile_edit: true, agent_profile_user: agent })}
							close={() => { this.setState({ agent_drawer: false }) }}
							addAgent={() => this.setState({ agent_edit_dialog_open: true })}
							setAgentFilter={(filter) => { this.setState({ agent_filter: filter }) }}
							editAgentStatus={(e, data) => this.editAgentStatus(data, e.currentTarget)}
							goToAgentList={() => { this.setState({ agent_drawer: false, tasks_drawer: false, consumer_drawer: false, current_page_view: 'agents' }) }}
						/>
					</Drawer> : null}
				{this.state.user && (this.state.user.user_type === 'provider' || this.state.user.user_type === 'agent')
					&& this.state.consumer_drawer ? // Customers drawer on the right hand side
					<Drawer
						anchor="right"
						variant="persistent"
						open={this.state.consumer_drawer}
						ModalProps={{ elevation: 0, BackdropProps: { invisible: true } }}
						classes={{ paper: classNames(classes.contentDrawerPaper, classes.rightDrawer) }}>
						<div className={classes.toolbar} />
						<ConsumerSidebar
							consumers={this.state.consumers}
							tasks={this.state.tasks}
							goto={this.handleGoTo}
							chat={(user) => this.setState({ chat_user: user, content_drawer: true, content_drawer_screen: 'chat' })}
							navigate={this.handleNavigate}
							close={() => { this.setState({ consumer_drawer: false }) }}
							broadcast={((action, receivers) => this.setState({ broadcast_dialog_open: true, broadcast_type: action, broadcast_receivers: receivers }))}
							goToConsumerList={() => this.setState({ agent_drawer: false, consumer_drawer: false, tasks_drawer: false, current_page_view: 'consumers' })}
						/>
					</Drawer> : null}
				{this.state.user && this.state.user.user_type === 'provider' && this.state.tasks_drawer ? // Task drawer on the left hand side
					<Drawer
						anchor="left"
						variant="persistent"
						open={this.state.tasks_drawer}
						ModalProps={{ elevation: 0, BackdropProps: { invisible: true } }}
						classes={{ paper: classNames(classes.contentDrawerPaper, classes.leftDrawer) }}>
						<div className={classes.toolbar} />
						<TaskSidebarProvider
							user={this.state.user}
							tasks={this.state.tasks.filter(task => { return task.provider_id === this.state.user.id; })}
							agents={this.state.agents}
							agent_filter={this.state.agent_filter}
							providers={this.state.providers}
							consumers={this.state.consumers}
							services={this.state.services}
							goto={this.handleGoTo}
							chat={(user) => this.setState({ chat_user: user, content_drawer: true, content_drawer_screen: 'chat' })}
							manualtask={() => this.setState({ content_drawer: true, content_drawer_screen: 'createtask' })}
							navigate={this.handleNavigate}
							close={() => { this.setState({ tasks_drawer: false }) }}
							setAgentFilter={(filter) => { this.setState({ agent_filter: filter }) }}
							viewTask={(data) => this.viewTask(data)}
							editTaskAgent={(e, data) => this.editTaskAgent(data, e.currentTarget)}
							editTaskStatus={(e, data) => this.editTaskStatus(data, e.currentTarget)}
							goToTaskList={() => { this.setState({ tasks_drawer: false, agent_drawer: false, consumer_drawer: false, current_page_view: 'tasks' }) }}
						/>
					</Drawer> : null}
				{this.state.user && this.state.user.user_type === 'provider' && this.state.posts_drawer ? // Posts drawer on the right hand side
					<Drawer
						anchor="left"
						variant="persistent"
						open={this.state.posts_drawer}
						ModalProps={{ elevation: 0, BackdropProps: { invisible: true } }}
						classes={{ paper: classNames(classes.contentDrawerPaper, classes.leftDrawer) }}>
						<div className={classes.toolbar} />
						<PostSidebarProvider
							user={this.state.user}
							tasks={this.state.tasks.filter(task => { return (task.provider_id === '0' || !task.provider_id) })}
							providers={this.state.providers}
							consumers={this.state.consumers}
							categories={this.state.categories.filter(category => { return category.status === 'Active' })}
							goto={this.handleGoTo}
							chat={(user) => this.setState({ chat_user: user, content_drawer: true, content_drawer_screen: 'chat' })}
							navigate={this.handleNavigate}
							close={() => { this.setState({ posts_drawer: false }) }}
							viewTask={(data) => this.viewTask(data)}
							makeBid={this.makeBid}
						/>
					</Drawer> : null}
				{this.state.user && this.state.user.user_type === 'agent' && this.state.tasks_drawer ? // Task drawer on the left hand side
					<Drawer
						anchor="left"
						variant="persistent"
						open={this.state.tasks_drawer}
						ModalProps={{ elevation: 0, BackdropProps: { invisible: true } }}
						classes={{ paper: classNames(classes.contentDrawerPaper, classes.leftDrawer) }}>
						<div className={classes.toolbar} />
						<TaskSidebarAgent
							user={this.state.user}
							tasks={this.state.tasks.filter(task => { return true; })}
							agents={this.state.agents.filter(agent => { return agent.status === 'Active' })}
							agent_filter={this.state.agent_filter}
							providers={this.state.providers}
							consumers={this.state.consumers}
							services={this.state.services}
							goto={this.handleGoTo}
							chat={(user) => this.setState({ chat_user: user, content_drawer: true, content_drawer_screen: 'chat' })}
							navigate={this.handleNavigate}
							close={() => { this.setState({ tasks_drawer: false }) }}
							setAgentFilter={(filter) => { this.setState({ agent_filter: filter }) }}
							viewTask={(data) => this.viewTask(data)}
							editTaskAgent={(e, data) => this.editTaskAgent(data, e.currentTarget)}
							editTaskStatus={(e, data) => this.editTaskStatus(data, e.currentTarget)}
							goToTaskList={() => { this.setState({ tasks_drawer: false, agent_drawer: false, consumer_drawer: false, current_page_view: 'tasks' }) }}
						/>
					</Drawer> : null}
				{this.state.user && this.state.user.user_type === 'consumer' && this.state.posts_drawer ? // Posts drawer on the right hand side
					<Drawer
						anchor="left"
						variant="persistent"
						open={this.state.posts_drawer}
						ModalProps={{ elevation: 0, BackdropProps: { invisible: true } }}
						classes={{ paper: classNames(classes.contentDrawerPaper, classes.leftDrawer) }}>
						<div className={classes.toolbar} />
						<PostSidebarConsumer
							user={this.state.user}
							tasks={this.state.tasks.filter(task => { return (task.provider_id === '0' || !task.provider_id) })}
							providers={this.state.providers}
							consumers={this.state.consumers}
							categories={this.state.categories.filter(category => { return category.status === 'Active' })}
							goto={this.handleGoTo}
							chat={(user) => this.setState({ chat_user: user, content_drawer: true, content_drawer_screen: 'chat' })}
							navigate={this.handleNavigate}
							close={() => { this.setState({ posts_drawer: false }) }}
							viewTask={(data) => this.viewTask(data)}
							cancelTask={(data) => this.deleteTask(data)}
							viewProvider={(data) => this.viewProvider(data, false)}
							chooseTaskProvider={(task_id, provider_id, price) => { this.editTaskProvider(task_id, provider_id, price); this.setState({ task_notification: true }) }}
						/>
					</Drawer> : null}
				{this.state.user && (this.state.user.user_type === 'consumer') && this.state.tasks_drawer ? // Orders drawer on the left hand side for consumers
					<Drawer
						anchor="left"
						variant="persistent"
						open={this.state.tasks_drawer}
						ModalProps={{ elevation: 0, BackdropProps: { invisible: true } }}
						classes={{ paper: classNames(classes.contentDrawerPaper, classes.leftDrawer) }}>
						<div className={classes.toolbar} />
						<TaskSidebarConsumer
							user={this.state.user}
							tasks={this.state.tasks.filter(task => { return task.provider_id && task.provider_id !== '' && task.provider_id !== '0'; })}
							agents={this.state.agents}
							agent_filter={this.state.agent_filter}
							providers={this.state.providers}
							consumers={this.state.consumers}
							services={this.state.services}
							goto={this.handleGoTo}
							chat={(user) => this.setState({ chat_user: user, content_drawer: true, content_drawer_screen: 'chat' })}
							navigate={this.handleNavigate}
							close={() => { this.setState({ tasks_drawer: false }) }}
							viewTask={(data) => this.viewTask(data)}
							editTaskAgent={(e, data) => this.editTaskAgent(data, e.currentTarget)}
							editTaskStatus={(e, data) => this.editTaskStatus(data, e.currentTarget)}
							goToTaskList={() => { this.setState({ tasks_drawer: false, agent_drawer: false, current_page_view: 'tasks' }) }}
						/>
					</Drawer> : null}
				{this.state.task_view_drawer ?
					<Drawer
						anchor="left"
						variant="persistent"
						open={this.state.task_view_drawer}
						onClose={() => this.setState({ task_view_drawer: false })}
						ModalProps={{ elevation: 0, BackdropProps: { invisible: true } }}
						classes={{ paper: classNames(classes.contentDrawerPaper, classes.leftDrawer) }}>
						<div className={classes.toolbar} />
						<TaskView
							title={this.state.user.user_type === 'consumer' ? 'Order' : 'Task'}
							tasks={this.state.current_selected_tasks}
							agents={this.state.agents}
							providers={this.state.providers}
							services={this.state.services}
							consumers={this.state.consumers}
							referencedata={this.state.referencedata}
							cancelTask={(data) => this.cancelTasks(data)}
							editTaskStatus={(e, data) => this.editTaskStatus(data, e.currentTarget)}
							editTaskRating={(data) => this.editTaskRating(data)}
							chat={(user) => this.setState({ chat_user: user, content_drawer: true, content_drawer_screen: 'chat' })}
							goto={this.handleGoTo}
							navigate={this.handleNavigate}
							close={() => this.setState({ task_view_drawer: false })} />
					</Drawer> : null}
				{this.state.task_request_drawer ? // The main task request process drawer
					<Drawer
						anchor="right"
						variant="persistent"
						open={this.state.task_request_drawer}
						onClose={() => this.setState({ task_request_drawer: false })}
						ModalProps={{ elevation: 0, BackdropProps: { invisible: true } }}
						classes={{ paper: classNames(classes.contentDrawerPaper, classes.rightDrawer) }}>
						<div className={classes.toolbar} />
						<RequestTask
							title={this.state.task_request_screen_title}
							user={this.state.user}
							tasks={this.state.tasks}
							categories={this.state.categories.filter(category => { return category.status === 'Active' })}
							current_location={this.state.current_location}
							service_function={this.state.task_request_screen}
							agents={this.state.agents.filter(agent => (agent.status === 'Active'))}
							service={this.state.current_service}
							services={this.state.services.filter(function (s) { return (s.service_function === self.state.task_request_screen && s.status === 'Active') })}
							date={this.state.current_service_date}
							start={this.state.current_service_start}
							provider={this.state.current_provider}
							department={this.state.current_provider_department}
							providers={this.state.providers.filter(provider => provider.status === 'Active')}
							close={() => this.setState({ current_service: {}, current_provider: {}, task_request_drawer: false, request_progress: false })}
							chat={(user) => this.setState({ chat_user: user, content_drawer: true, content_drawer_screen: 'chat' })}
							goto={this.handleGoTo}
							navigate={this.handleNavigate}
							viewProvider={(data) => this.viewProvider(data, false)}
							createTask={(data) => this.addTask(data)}
							updateMapLocation={this.handleGoTo}
							updateMapBounds={(bounds) => this.setState({ map_bounds: bounds })} />
					</Drawer> : null}
				{this.state.post_request_drawer ?
					<Drawer
						anchor="right"
						variant="persistent"
						open={this.state.post_request_drawer}
						onClose={() => this.setState({ post_request_drawer: false })}
						ModalProps={{ elevation: 0, BackdropProps: { invisible: true } }}
						classes={{ paper: classNames(classes.contentDrawerPaper, classes.rightDrawer) }}>
						<div className={classes.toolbar} />
						<PostTask
							user={this.state.user}
							categories={this.state.categories.filter(category => { return category.status === 'Active' })}
							createTask={(e, data) => this.addTask(data)}
							updateMapLocation={this.handleGoTo}
							updateMapBounds={(bounds) => this.setState({ map_bounds: bounds })}
							close={() => this.setState({ post_request_drawer: false })}
						/>
					</Drawer> : null}
				{this.state.content_drawer ?
					<Drawer
						anchor="right"
						variant="persistent"
						open={this.state.content_drawer}
						ModalProps={{ BackdropProps: { invisible: true } }}
						PaperProps={{ elevation: 0 }}
						classes={{ paper: classNames(classes.contentDrawerPaper, classes.rightDrawer) }}>
						<div className={classes.toolbar} />
						{this.state.content_drawer_screen === 'layers' ?
							<Layers
								close={() => this.setState({ content_drawer: false })}
								current_location={this.state.current_location}
								categories={this.state.categories.filter(category => { return category.status === 'Active' })}
								show_buildings={this.state.show_buildings}
								map_language={this.state.map_language}
								category_keys={this.state.category_keys}
								updateCategories={(category_keys) => this.setState({ category_keys: category_keys })}
								toggleBuildings={() => this.setState({ show_buildings: !this.state.show_buildings })}
								toggleMapLanguage={() => this.setState({ map_language: (this.state.map_language === 'en' ? 'ar' : 'en') })}
								updateMapLocation={this.handleGoTo}
								updateMapBounds={(bounds) => this.setState({ map_bounds: bounds })} />
							: null}
						{this.state.content_drawer_screen === 'createtask' ?
							<ManualTask
								close={() => this.setState({ content_drawer: false })}
								agents={this.state.agents}
								provider_id={this.state.user.id}
								createTask={(e, data) => this.addTask(data)}
							/>
							: null}
						{this.state.content_drawer_screen === 'chat' ?
							<Chat
								close={() => this.setState({ content_drawer: false })}
								me={this.state.user || {}}
								chat_user={this.state.chat_user}
							/> : null}
						{this.state.content_drawer_screen === 'providers' ?
							<ProviderView
								close={() => this.setState({ content_drawer: false })}
								agents={this.state.agents}
								categories={this.state.categories.filter(category => { return category.status === 'Active' })}
								services={this.state.services.filter(service => { return service.status === 'Active' })}
								provider={this.state.current_selected_providers && this.state.current_selected_providers.length > 0 ? this.state.current_selected_providers[0] : {}}
								referencedata={this.state.referencedata}
								request={this.launchRequestProcessProvider}
								allow_request={this.state.provider_view_allow_request}
								user={this.state.user}
								chat={(user) => this.setState({ chat_user: user, content_drawer: true, content_drawer_screen: 'chat' })}
								goto={this.handleGoTo}
								navigate={this.handleNavigate} />
							: ''}
						{this.state.content_drawer_screen === 'share_user' ?
							<ShareUserView
								close={() => this.setState({ content_drawer: false })}
								user={this.state.share_user}
								live_locations={this.state.live_locations}
								chat={(user) => this.setState({ chat_user: user, content_drawer: true, content_drawer_screen: 'chat' })}
								goto={this.handleGoTo}
								navigate={this.handleNavigate} />
							: ''}
						{this.state.content_drawer_screen === 'osm_features' ?
							<FeaturesView
								close={() => this.setState({ content_drawer: false })}
								features={this.state.osm_features}
								current_location={this.state.current_location}
								navigate={this.handleNavigate}
								goto={this.handleGoTo}
							/> : null
						}
					</Drawer> : null}
				{this.state.user // Service editing for Admins
					&& this.state.user.user_type === 'administrator'
					&& this.state.current_page_view === 'services' ?
					<ServiceEdit
						open={this.state.service_edit_dialog_open}
						categories={this.state.categories.filter(category => { return category.status === 'Active' })}
						service={this.state.current_selected_services.length > 0 ? this.state.current_selected_services[0] : {}}
						referencedata={this.state.referencedata}
						serviceEditDialogClose={() => this.setState({ service_edit_dialog_open: false })}
						saveService={(data) => this.saveService(data)}
					/> : null}
				{this.state.user && this.state.user.user_type === 'administrator' && this.state.current_page_view === 'referencedata' ?
					<ReferenceDataEdit
						key="cst-referencedataedit"
						open={this.state.reference_data_edit_dialog_open}
						referencedataitem={this.state.current_selected_referencedata.length > 0 ? this.state.current_selected_referencedata[0] : {}}
						referenceDataItemEditDialogClose={() => this.setState({ reference_data_edit_dialog_open: false })}
						saveReferenceDataItem={(data) => this.saveReferenceDataItem(data)}
					/> : null}
				<CategoryEdit
					key="cst-categoryedit"
					open={this.state.category_edit_dialog_open}
					categories={this.state.categories}
					category={this.state.current_selected_categories.length > 0 ? this.state.current_selected_categories[0] : {}}
					categoryEditDialogClose={() => this.setState({ category_edit_dialog_open: false })}
					saveCategory={(event, data) => this.saveCategory(data)}
				/>
				<Broadcast
					open={this.state.broadcast_dialog_open}
					sendBroadcast={(subject, message) => { this.sendBroadcast(subject, message) }}
					broadcastDialogClose={() => this.setState({ broadcast_dialog_open: false })}
				/>
				<Menu // Menu used to select status when editing a task
					id="menu-profile"
					marginThreshold={70}
					anchorEl={this.state.profile_menu_anchor}
					open={this.state.profile_menu_open}
					onClose={() => this.setState({ profile_menu_open: false })}>
					<MenuItem className={classes.menuItem} onClick={() => this.setState({ current_page_view: 'profile', tasks_drawer: false, agent_drawer: false, profile_menu_open: false, profile_menu_anchor: null })}>
						<ListItemIcon className={classes.icon}>
							<AccountCircleIcon />
						</ListItemIcon>
						<ListItemText classes={{ primary: classes.primary }} inset primary="Profile" />
					</MenuItem>
					<MenuItem className={classes.menuItem} onClick={this.logout}>
						<ListItemIcon className={classes.icon}>
							<ExitToAppIcon />
						</ListItemIcon>
						<ListItemText classes={{ primary: classes.primary }} inset primary="Logout" />
					</MenuItem>
				</Menu>
				<Menu // Menu used to select status when editing a task
					id="menu-taskstatuses"
					anchorEl={this.state.task_status_menu_anchor}
					open={this.state.task_status_menu_open}
					onClose={() => this.setState({ task_status_menu_open: false })}
				>
					<ListSubheader>Available statuses</ListSubheader>
					<Divider />
					{this.isValidStatus('Cancelled') && this.state.user.user_type === 'consumer' ? <MenuItem onClick={this.handleSetTaskStatus}>Cancelled</MenuItem> : null}
					{this.isValidStatus('Accepted') && this.state.user.user_type !== 'consumer' ? <MenuItem onClick={this.handleSetTaskStatus}>Accepted</MenuItem> : null}
					{this.isValidStatus('Preparing') && this.state.user.user_type !== 'consumer' ? <MenuItem onClick={this.handleSetTaskStatus}>Preparing</MenuItem> : null}
					{this.isValidStatus('On the road') && this.state.user.user_type !== 'consumer' ? <MenuItem onClick={this.handleSetTaskStatus}>On the road</MenuItem> : null}
					{this.isValidStatus('Arrived') && this.state.user.user_type !== 'consumer' ? <MenuItem onClick={this.handleSetTaskStatus}>Arrived</MenuItem> : null}
					{this.isValidStatus('Delivered') && this.state.user.user_type !== 'consumer' ? <MenuItem onClick={this.handleSetTaskStatus}>Delivered</MenuItem> : null}
					{this.isValidStatus('Awaiting payment') && this.state.user.user_type !== 'consumer' ? <MenuItem onClick={this.handleSetTaskStatus}>Awaiting payment</MenuItem> : null}
					{this.isValidStatus('Paid') && this.state.user.user_type !== 'consumer' ? <MenuItem onClick={this.handleSetTaskStatus}>Paid</MenuItem> : null}
					{this.isValidStatus('Completed') && this.state.user.user_type !== 'consumer' ? <MenuItem onClick={this.handleSetTaskStatus}>Completed</MenuItem> : null}
					{this.isValidStatus('Declined') && this.state.user.user_type !== 'consumer' ? <MenuItem onClick={this.handleSetTaskStatus}>Declined</MenuItem> : null}
					{this.isValidStatus('Failed') && this.state.user.user_type !== 'consumer' ? <MenuItem onClick={this.handleSetTaskStatus}>Failed</MenuItem> : null}
					{this.isValidStatus('Cancelled') && this.state.user.user_type !== 'consumer' ? <MenuItem onClick={this.handleSetTaskStatus}>Completed</MenuItem> : null}
					{this.state.referencedata
						.filter(dataitem => {
							return dataitem.type === 'task_status'
						})
						.map(status => {
							if (this.isValidStatus(status)) return <MenuItem onClick={this.handleSetTaskStatus}>{status.text}</MenuItem>
							return null;
						})}

				</Menu>
				<Menu // Menu used to select status when editing a service
					id="menu-servicestatuses"
					anchorEl={this.state.service_status_menu_anchor}
					open={this.state.service_status_menu_open}
					onClose={() => this.setState({ service_status_menu_open: false })}
				>
					<MenuItem onClick={this.handleSetServiceStatus}>Active</MenuItem>
					<MenuItem onClick={this.handleSetServiceStatus}>Inactive</MenuItem>
				</Menu>
				<Menu // Menu used to select status when editing a category
					id="menu-categorystatuses"
					anchorEl={this.state.category_status_menu_anchor}
					open={this.state.category_status_menu_open}
					onClose={() => this.setState({ category_status_menu_open: false })}
				>
					<MenuItem onClick={this.handleSetCategoryStatus}>Active</MenuItem>
					<MenuItem onClick={this.handleSetCategoryStatus}>Inactive</MenuItem>
				</Menu>
				<Menu // Menu used to select status when editing an agent
					id="menu-agentstatuses"
					anchorEl={this.state.agent_status_menu_anchor}
					open={this.state.agent_status_menu_open}
					onClose={() => this.setState({ agent_status_menu_open: false })}
				>
					<MenuItem onClick={this.handleSetAgentStatus}>Active</MenuItem>
					<MenuItem onClick={this.handleSetAgentStatus}>Inactive</MenuItem>
					<MenuItem onClick={this.handleSetAgentStatus}>Archived</MenuItem>
				</Menu>
				<Menu // Menu used to select status when editing an agent
					id="menu-providerstatuses"
					anchorEl={this.state.provider_status_menu_anchor}
					open={this.state.provider_status_menu_open}
					onClose={() => this.setState({ provider_status_menu_open: false })}
				>
					<MenuItem onClick={this.handleSetProviderStatus}>Active</MenuItem>
					<MenuItem onClick={this.handleSetProviderStatus}>Inactive</MenuItem>
				</Menu>
				<Menu // Menu used to select status when editing an agent
					id="menu-questionstatuses"
					anchorEl={this.state.question_status_menu_anchor}
					open={this.state.question_status_menu_open}
					onClose={() => this.setState({ question_status_menu_open: false })}
				>
					<MenuItem onClick={this.handleSetQuestionStatus}>Active</MenuItem>
					<MenuItem onClick={this.handleSetQuestionStatus}>Inactive</MenuItem>
				</Menu>
				<Menu // Menu used to select status when editing reference data
					id="menu-referencedatastatuses"
					anchorEl={this.state.referencedata_status_menu_anchor}
					open={this.state.referencedata_status_menu_open}
					onClose={() => this.setState({ referencedata_status_menu_open: false })}
				>
					<MenuItem onClick={this.handleSetReferenceDataStatus}>Active</MenuItem>
					<MenuItem onClick={this.handleSetReferenceDataStatus}>Inactive</MenuItem>
				</Menu>
				<Menu // Menu used to select an agent when changing task
					id="menu-agents"
					anchorEl={this.state.task_agent_menu_anchor}
					open={this.state.task_agent_menu_open}
					onClose={() => this.setState({ task_agent_menu_open: false })}
				>
					<MenuItem onClick={self.handleSetTaskAgent.bind(this, null)}>Unassign task</MenuItem>
					{
						this.state.agents
							.filter(agent => {
								return (agents.getAgentAvailability(agent) !== 'inactive') && agent.provider_id === this.state.user.id
							})
							.map(function (a, i) {
								return <MenuItem key={'menu-' + i} onClick={self.handleSetTaskAgent.bind(this, a.id)}>{a.first_name + ' ' + a.last_name}</MenuItem>
							})
					}
				</Menu>
				{this.state.user && this.state.user.user_type === 'provider' ? // Provider agent edit
					<AgentEdit
						open={this.state.agent_edit_dialog_open}
						provider={this.state.user}
						agentEditDialogClose={() => this.setState({ agent_edit_dialog_open: false })}
						saveAgent={(data) => this.saveAgent(data)}
					/> : null}
				<QuestionEdit
					open={this.state.question_edit_dialog_open}
					question={this.state.current_selected_questions.length > 0 ? this.state.current_selected_questions[0] : {}}
					questionEditDialogClose={() => this.setState({ question_edit_dialog_open: false })}
					saveQuestion={(e, data) => this.saveQuestion(data)}
				/>
				<Modal
					aria-labelledby="reset password"
					aria-describedby="reset password"
					open={this.state.reset_password_modal_open}
					onClose={(e) => this.setState({ reset_password_modal_open: false })}
				>
					<div style={this.getResetPasswordModalStyle()} className={classes.passwordModal}>
						<Typography variant="title" id="modal-title" align="center">Enter your new password</Typography>
						<br />
						<FormControl fullwidth className={classes.passwordControl}>
							<Input
								id="txt-new-password1"
								type={this.state.show_password1 ? 'text' : 'password'}
								margin="normal"
								placeholder="Enter new password..."
								value={this.state.new_password1}
								disableUnderline={true}
								className={classes.formInput}
								onChange={(e) => this.setState({ new_password1: e.target.value })}
								startAdornment={
									<InputAdornment position="start">
										<SecurityIcon />
									</InputAdornment>
								}
								endAdornment={
									<InputAdornment position="end">
										<IconButton
											onClick={() => this.setState({ show_password1: !this.state.show_password1 })}
											onMouseDown={(e) => e.preventDefault()}
										>
											{this.state.show_password1 ? <VisibilityOff /> : <Visibility />}
										</IconButton>
									</InputAdornment>
								}
							/>
						</FormControl>
						<br />
						<FormControl fullwidth className={classes.passwordControl}>
							<Input
								id="txt-new-password2"
								type={this.state.show_password2 ? 'text' : 'password'}
								margin="normal"
								placeholder="Confirm password"
								value={this.state.new_password2}
								disableUnderline={true}
								className={classes.formInput}
								onChange={(e) => this.setState({ new_password2: e.target.value })}
								startAdornment={
									<InputAdornment position="start">
										<SecurityIcon />
									</InputAdornment>
								}
								endAdornment={
									<InputAdornment position="end">
										<IconButton
											onClick={() => this.setState({ show_password2: !this.state.show_password2 })}
											onMouseDown={(e) => e.preventDefault()}
										>
											{this.state.show_password2 ? <VisibilityOff /> : <Visibility />}
										</IconButton>
									</InputAdornment>
								}
							/>
						</FormControl>
						<br />
						<Button fullWidth variant="outlined" onClick={() => this.resetPassword()}  >Reset Password</Button>
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
							className={classes.snackbarClose}
							onClick={this.handleSnackbarClose}
						>
							<CloseIcon />
						</IconButton>
					]}
				/>
				{this.state.landing_desktop && isWidthUp('md', this.props.width) ?
					<LandingDesktop
						open={this.state.landing_desktop}
						close={() => this.setState({ landing_desktop: false })}
						launchRequestProcess={(request_function, request_title) => this.launchRequestProcess(request_function, request_title)}
						hireRunner={() => this.hireRunner()}
					/> : null}
				{this.state.mega_menu && isWidthUp('md', this.props.width) ?
					<MegaMenu
						open={this.state.mega_menu}
						categories={this.state.categories.filter(category => { return category.status === 'Active' })}
						services={this.state.services.filter((s) => { return (s.service_function === self.state.mega_menu_request_function && s.status === 'Active') })}
						request={this.launchRequestProcessService}
						close={() => this.setState({ mega_menu: false, mega_menu_request_function: '' })}
					/> : null}
			</div>
		);
	}
}

export default compose(withStyles(styles, { withTheme: true }), withWidth())(Dashboard);
