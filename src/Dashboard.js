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
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

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
import Avatar from '@material-ui/core/Avatar';
//import NotificationList from './NotificationList';
import AdminNotifications from './AdminNotifications'; //changed::11-feb
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
import './components/app-search/app-search.css'
import * as notifications from './actions/notifications';

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
		// margin: '0 auto',
		// maxWidth: '1200px',
		textAlign: 'center',
		position: 'relative',
		width: '100%'
	},
	switchs: {
	    marginTop: "-8px",
	    marginLeft: "-55px"
  	},
	fabs : {
		width: '32px',
   	 	height: '32px',
    	marginLeft: '-35px',
    	minHeight: '30px',
    	position: 'relative',
    	zIndex: 1,
    	color: '#2D9CDB'
	},
	signup: {
		backgroundColor: 'white',
	    "&:hover": {
        	backgroundColor:"white"
    	},		
	    color : 'green',
	    borderColor: 'green',
	    borderTopRightRadius: '0px',
	    borderBottomRightRadius: '0px'
  	}, 
  	joinaspro: {
	    color: 'white',
	    borderColor: 'green',
	    backgroundColor: 'green',
	    "&:hover": {
        	backgroundColor:"green"
    	},
	    borderTopRightRadius: '18px',
	    borderBottomRightRadius: '18px',
	    borderTopLeftRadius: '0px',
	    borderBottomLeftRadius: '0px',
	     width: '180px'
  	},
  	explore: {
	    color: '#7F4095',
	    borderColor: '#7F4095',
	    backgroundColor: 'white',
	    "&:hover": {
        	backgroundColor:"white"
    	},	    
	    borderTopRightRadius: "18px",
	    borderBottomRightRadius: "18px",
	    borderTopLeftRadius: "18px",
	    borderBottomLeftRadius: "18px",
	    width: '180px',
	    marginLeft: "-35px"
  	},
  	onduty: {
	    color: 'white',
	    borderColor: '#649F55',
	    backgroundColor: '#649F55',
	    "&:hover": {
        	backgroundColor:"#649F55"
    	},	    
	    borderTopRightRadius: "18px",
	    borderBottomRightRadius: "18px",
	    borderTopLeftRadius: "18px",
	    borderBottomLeftRadius: "18px",
	    width: '180px',
	    marginLeft: "-35px"
  	},
 	hirearunner: {
	    color: 'white',
	    borderColor: '#7F4095',
	    backgroundColor: '#7F4095',
	    "&:hover": {
        	backgroundColor:"#7F4095"
    	},
    	"&:disabled": {
		      color: "white",
		      backgroundColor: "#B68CC5"
    	},    
	 	borderTopRightRadius: "18px",
	    borderBottomRightRadius: "18px",
	    borderTopLeftRadius: "18px",
	    borderBottomLeftRadius: "18px",
	    width: '180px',
	    marginLeft: "-35px"
  	},
  	cfloat: {
  		display: 'inline-flex',
	    float:'left',
	    marginTop: '10px',
	    marginLeft:'5%'
  	}, 
  	findapro: {
	    color: 'white',
	    backgroundColor: '#30769C',
	    "&:hover": {
        	backgroundColor:"#30769C"
    	},
    	"&:disabled": {
	      	color: "white",
	      	backgroundColor: "#5D92AF"
    	},    
	    width: '180px',
	    borderTopRightRadius: "18px",
	    borderBottomRightRadius: "18px",
	    borderTopLeftRadius: "18px",
	    borderBottomLeftRadius: "18px",
  	},
  	hello: {
	    color: '#2D9CDB',
	    borderColor: '#2D9CDB',
	    backgroundColor: 'white',
	    "&:hover": {
        	backgroundColor:"white"
    	},	    
	    borderTopLeftRadius: '20px',
	    borderBottomLeftRadius: '20px',
	    width: '180px',
	    marginLeft: '-35px'
  	},
   mytasks: {
	    color: "white",
	    borderColor: "#2D9CDB",
	    backgroundColor: "#2D9CDB",
	    "&:hover": {
        	backgroundColor:"#2D9CDB"
    	},		    
	    borderTopRightRadius: "18px",
	    borderBottomRightRadius: "18px",
	    borderTopLeftRadius: "18px",
	    borderBottomLeftRadius: "18px",
	    width: "180px",
	    marginLeft: "-35px"
  	},
  	myTasksCount: {
	    borderRadius: "50%",
	    behavior: "url(PIE.htc)" /* remove if you don't care about IE8 */,
	    width: "35px",
	    height: "35px",
	    padding: "8px",
	    background: "white",
	    border: "2px solid #2D9CDB",
	    color: "#2D9CDB",
	    textAlign: "center",
	    font: "16px Arial, sans-serif",
	    float: "left",
	    position: 'relative',
	    zIndex: 1
  	},
   	exploreCount: {
	    borderRadius: "50%",
	    behavior: "url(PIE.htc)" /* remove if you don't care about IE8 */,
	    width: "35px",
	    height: "35px",
	    padding: "8px",
	    background: "#7F4095",
	    border: "2px solid white",
	    color: "white",
	    textAlign: "center",
	    font: "16px Arial, sans-serif",
	    float: "left",
	    position: 'relative',
	    zIndex: 1,
	    marginTop: '1px'
  	},  
  	numberCircle3: {
	    borderRadius: "50%",
	    behavior: "url(PIE.htc)" /* remove if you don't care about IE8 */,
		width: "35px",
	    height: "35px",
	    padding: "8px",
	    background: "white",
	    border: "2px solid purple",
	    color: "purple",
	    textAlign: "center",
	    font: "16px Arial, sans-serif",
	    float: "left",
	    position: 'relative',
	    zIndex: 1,
	    marginTop: '1px'
  	},
 	account: {
      fontSize: '35px',
      color: '#2D9CDB',
      width: 35,
   	  height: 35,
   	  position: 'relative',
   	  zIndex: 1
  },
   leftmargin: {
    marginLeft: "-35px"
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
	grow: {
    	flexGrow: 1
  	},
  	rights: {
  		float:'right',
  		padding: '1rem'
  	},
	appBarButton: {
		background: 'none',
		border: 'none',
		color: '#313131',
		cursor: 'pointer',
		fontFamily: "'Montserrat', sans-serif",
		fontWeight: 700,
		fontSize: '1rem',
		margin: 0,
		padding: '1rem',
		outline: 'none',
		textTransform: 'inherit'
	},
	browseTasks: {
		background: 'none',
		border: 'none',
		color: '#313131',
		cursor: 'pointer',
		fontFamily: "'Montserrat', sans-serif",
		fontWeight: 700,
		marginRight: '20px',
		marginLeft: '15px',
		padding: '0.1rem',
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
		marginLeft: '50px',
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
				menu_enter: '',
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
				client_tasks_drawer: false,
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
				adminnotifications: [],   //changed::11-feb
				task_notification: false,
				search: false,
				menu_type: ''
			};
		}

	}


	savestate = () => {
	  this.setState({profile_menu_open: false,profile_menu_anchor: null });
	  localStorage.setItem('localstate', JSON.stringify(this.state,this.replacer));
	}

	componentWillUnmount = () => {
	  this.savestate();
      window.removeEventListener('beforeunload', this.savestate);
	}

	componentWillMount = () => {
	  const rehydrate = JSON.parse(localStorage.getItem('localstate'));
	  if(rehydrate){
	  	this.setState(rehydrate);
	  }
	  localStorage.setItem('localstate', null);
	}
	// componentDidMount: When the dashboard is mounted
	// Main method to set up the state and retrieve reference data.
	componentDidMount = () => {
		window.addEventListener('beforeunload', this.savestate);
		let location_interval_id = setInterval(this.logLocation, 10000);
		this.setState({ location_interval_id: location_interval_id });

		// Get all our data. These are all open services.
		this.getNotifications(); //changed 11-feb	
		this.getAgents();
		this.getCategories();
		this.getReferenceData();
		this.getProviders();
		this.getServices();
		this.getTasks();
		let check_task_interval_id = setInterval(this.getTasks, 60000);
		this.setState({ check_task_interval_id: check_task_interval_id });		

		this.resetPasswordDialog();

		if (this.state.user.user_type) {
			
			if (this.state.user.user_type === 'administrator') this.getQuestions();
			this.getUserConversations();
			this.getConsumers();
			// Get user conversations every minute
			let check_message_interval_id = setInterval(this.getUserConversations, 10000);
			this.setState({ check_message_interval_id: check_message_interval_id });

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

	isRunner = (task) => {
	 	var isRunner = false ;
	 	isRunner = task.provider_id == 0 || !task.provider_id  || task.provider_id == null ;
	 	return isRunner;
	}

	// getUserConversations: Gets the current user conversations (messages waiting).
	getUserConversations = () => {
		if (this.state.user.id) {
			this.getAgents();
			talk.getConversations(this.state.user.id, true, this.state.web_token, conversations => {
				if (conversations!=null && conversations.length > 0) {
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
    // getNotifications:
	getNotifications = () => notifications.getNotifications(notifications => this.setState({ adminnotifications: notifications || [] })) //changed 11-feb
	
	// getQuestions: gets the list of questions
	getQuestions = () => services.getQuestions(questions => this.setState({ questions: questions }))

	// getTasks: gets the list of tasks and then updates state
	getTasks = () => tasks.getTasks(this.state.user.user_type? this.state.user: {} , response => this.setState({ tasks: response.data.tasks || [] }))

	////////////////////////////
	// Live Location Logging
	////////////////////////////

	// logLocation: logs the current location to a web service
	logLocation = () => {
		// map.logLocation(this.state.user, this.state.web_token, locations => {
		// 	this.setState({ current_location: locations.current_location, live_locations: locations.live_locations });
		// });
	}

	replacer = (key,value) => 
	{
	    if (key=="services"){
	    	if(value.length > 50 ) return [];
	    } 
	    if (key=="questions") return [];
	    return value;
	}

	////////////////////////////////////
	// Login and Registration Processes
	////////////////////////////////////

	// login: Logs the user into the system and saves their data in state.
	login = (data) => {
		this.setState({ login_progress: true });
		let self = this;
		authentication.authenticate(data, response => {
			if (response!= null && response.data.success === false) self.setState({ snackbar_open: true, snackbar_message: 'Invalid login', login_progress: false });
			if (response!= null && response.data.success === true) {
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
					web_token: response.data.token,
					profile_menu_open: false, 
					profile_menu_anchor: null
				});
				sessionStorage.setItem('state', JSON.stringify(self.state,this.replacer));

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
		this.setState({ task_view_drawer: false, tasks_drawer: false, client_tasks_drawer: false, user: {}, current_page_view: 'map',  profile_menu_open: false, content_drawer: false, agent_drawer: false, current_service: {}, current_provider: {}, task_request_drawer: false });
		localStorage.setItem('localstate', null);
	}

	// register: Registers the user in the system and logs them in.
	register = (data) => {
		let self = this;
		this.setState({ register_progress: true });
		// Call the add methods
		var responseAction = function (response) {
			if (response.data.success) {
				self.setState({ current_page_view: 'map', snackbar_open: true, snackbar_message: 'Account Created!', register_progress: false });
				self.getAgents();
				// Then login
				self.login({ username: data.username, password: data.password });

			} else {
				self.setState({ snackbar_open: true, snackbar_message: 'Username already taken', register_progress: false });
			}
		};
		if (data.user_type === 'consumer') consumers.addConsumer(data, responseAction);
		if (data.user_type === 'agent') agents.addAgent(data, self.state.web_token, responseAction);
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
					self.getProviders();
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

		// var toggle = false ; 
		// if(!this.state.agent_active && agents.getAgentAvailability(this.state.user) == 'inactive'){
		//  if (window.confirm('Do you want to override your casual ?')) {
		//  	toggle = true; 
		//  }
		// }else{
		// 	toggle = true; 
		// }
		// if(toggle){
			this.setState({ agent_active: !this.state.agent_active });
			this.getAgents();
			let cagent = this.state.user;
			this.state.agents.forEach(agent => {
				if (cagent.id === agent.id) {
					cagent.status = agent.status; 
					cagent.active = !this.state.agent_active;
					this.editUser(cagent);
				}
			});
		// }
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
			if(i.status){
				var agent_update = { id: i.id, agent_id: agent || '' };
				payload.push(agent_update);

			}
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
	makeBid = (task_id, amount,comment) => {
		let bid = { task_id: task_id, amount: amount, provider_id: this.state.user.id, comment:comment }
		const self = this;
		tasks.addTaskBid(bid, response => {
			self.getTasks();
			self.setState({ snackbar_open: true, snackbar_message: 'Bid submitted' });
		});
	}

	// editTaskProvider // narayan changed this for runner in backend
	editTaskProvider = (task_id, provider_id, price) => {
		const self = this;
		tasks.editTaskProvider(task_id, provider_id, price, response => {
			self.getTasks();
			self.setState({ snackbar_open: true, snackbar_message: 'Task posting moved into orders', order_notification: true });
		});
	}

	// editTaskStatus: // added by narayan refactor later TODO
	editTaskStatusFromConsumer = (data, anchor, type) => {
		var tasks = [];
		this.state.tasks.forEach(function (i, t) {
			if (data.indexOf(i.id) !== -1) tasks.push(i);
		});
		this.setState({ current_selected_tasks: tasks, task_status_menu_open: true, menu_type : type, task_status_menu_anchor: anchor });
	}


	// editTaskStatus:
	editTaskStatus = (data, anchor) => {
		var tasks = [];
		this.state.tasks.forEach(function (i, t) {
			if (data.indexOf(i.id) !== -1) tasks.push(i);
		});
		this.setState({ current_selected_tasks: tasks, task_status_menu_open: true, menu_type : '', task_status_menu_anchor: anchor });
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

		// editTaskStatuses:
	editSingleTaskStatus = (task, status) => {
		// For this call we need to pass a set of task ids and statuses
		var statuses = [];
		var self = this;
		var status_update = { id: task.id, status: status };
		statuses.push(status_update);
		tasks.editTaskStatuses(statuses, response => {
			self.getTasks();
			self.setState({ snackbar_open: true, snackbar_message: 'Task status updated' });
		});
	}

	// editTaskRating:
	editTaskRating = (rating) => {
		var self = this;
		tasks.editTaskRating(rating, response => {
			// self.getTasks();
			self.getAgents();
			self.getConsumers();
			self.setState({ snackbar_open: true, snackbar_message: 'Task rating submitted' });
		});
	}

	// handleSetAgent
	handleSetTaskAgent = (agent_id, evefnt) => {
		if(agent_id == null){
			if(window.confirm('Are you sure ?')){
				this.editTaskAgents(agent_id);
				this.setState({ task_agent_menu_open: false });
			}
		}
		else{
			this.editTaskAgents(agent_id);
			this.setState({ task_agent_menu_open: false });
		}
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
		this.setState({ task_request_drawer: true, task_request_screen: request_function, task_request_screen_title: request_title, current_page_view: 'map', request_progress: true, landing_desktop: false , mega_menu: false });
	}

	// launchRequestProcess:
	launchRequestProcessService = (request_function, request_title, service) => {
		this.closeDrawers();
		this.setState({ task_request_drawer: true, task_request_screen: request_function, task_request_screen_title: request_title, current_page_view: 'map', request_progress: true, landing_desktop: false, current_service: service, mega_menu: false });
	}

	// launchRequestProcessProvider:
	launchRequestProcessProvider = (provider, service) => {
		this.closeDrawers();
		let cur_service = {} ; 
		if (this.state.services) {
			var len = this.state.services.length; 
			for (var i = 0; i < len; ++i) {
				if(this.state.services[i].system_name === service){
					cur_service = this.state.services[i]; 
					break;
				}
			}
		}
		this.setState({ task_request_drawer: true, content_drawer: false, content_drawer_screen: '', task_request_screen: cur_service.service_function, task_request_screen_title: 'Request', current_provider: provider, current_service: cur_service, request_progress: true });
	}

	// launchMegaMenu:
	launchMegaMenu = (request_function) => {
		this.setState({ mega_menu: true, mega_menu_request_function: request_function });
	}

	// launchSearchMenu:
	launchSearchMenu = () => {
		this.setState({ search: true });
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
		this.setState({ current_selected_providers: providers, content_drawer: true, content_drawer_screen: 'providers', provider_view_allow_request: provider_view_allow_request, search:false });
	}

	handleOpen = () => {
		var uid = Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
	 	this.state.services.length > 0 && !this.state.request_progress? this.setState({mega_menu: true, menu_enter: uid }): this.setState({ mega_menu: false }) ; 
	}

	getMyTasks = () => {

		var tasks = [];
		if(this.state.user.user_type === 'provider')
			tasks = this.state.tasks.filter(task => { return task.consumer_id && task.consumer_id == this.state.user.id && task.status != "Cancelled"});
		if(this.state.user.user_type === 'agent')
			tasks = this.state.tasks.filter(task => {return task.agent_id && task.agent_id == this.state.user.id && task.status != "Cancelled" && task.status != 'Requested' && task.status != 'Bidding' && task.status != 'BidChoosen'});
		if(this.state.user.user_type === 'consumer')
			tasks = this.state.tasks.filter(task => { return task.consumer_id && task.consumer_id == this.state.user.id  && task.status != "Cancelled"})
		return tasks; 

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
				<AppBar  position="absolute"   className={classes.appBar} elevation={0}>
					<Toolbar   className={classes.appBarToolbar}>
						
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
						<div className={classNames(classes.headerInternal, (this.state.show_menu ? classes.headerInternalActive : null))} >
							
						    {!this.state.user.user_type ? 
						    	<div className={classes.cfloat}>
						      <Button variant="outlined" className={classes.signup} onClick={(event) => this.setState({ showRegistrationDrawer: !this.state.showRegistrationDrawer, show_menu: false })}>
						        SIGN UP
						      </Button>
						      <Button variant="contained" color="primary" className={classes.joinaspro} onClick={(event) => this.setState({ showRegistrationDrawer: !this.state.showRegistrationDrawer, show_menu: false })}>
						        JOIN AS A PRO 
						      </Button>
						    </div>	: null}

							{this.state.user && this.state.user.user_type ?
							<div className={classes.cfloat}>
												
									{ this.state.user.avatar && this.state.user.avatar.id !== ''  ?
									<Avatar
										aria-label="agent initials" 
										className={classes.account}
										onClick={(e) => this.setState({ profile_menu_open: true, profile_menu_anchor: e.currentTarget })}
										src={'/api/images/getimage?id=' + this.state.user.avatar.id }
									>
									</Avatar> : '' }
									{ this.state.user.logo && this.state.user.logo.id !== ''  ?
									<Avatar
										aria-label="agent initials" 
										className={classes.account}
										onClick={(e) => this.setState({ profile_menu_open: true, profile_menu_anchor: e.currentTarget })}
										src={'/api/images/getimage?id=' + this.state.user.logo.id }
									>
									</Avatar> : '' }
									{ !this.state.user.avatar && !this.state.user.logo  ?
									 <AccountCircleIcon onClick={(e) => this.setState({ profile_menu_open: true, profile_menu_anchor: e.currentTarget })} 
									className={classes.account} /> : '' }

							        <Button onClick={(e) => this.setState({ profile_menu_open: true, profile_menu_anchor: e.currentTarget })} variant="outlined" className={classes.hello} >
							             {this.state.user.user_type == "provider" ? this.state.user.name.substring(0, 8) : 'Hello, '+this.state.user.first_name.substring(0, 8)  }
									</Button>
										
									<div className={classes.leftmargin}>
										<div className={classes.myTasksCount}>{this.getMyTasks().length}</div>
										<Button variant="contained" color="primary" className={classes.mytasks} onClick={() => this.setState({ tasks_drawer: true, posts_drawer: false, current_page_view: 'map' })} >
								        	My Tasks
										</Button>
									</div>
											
							    </div>: null }

								<span className={classes.cfloat}>
							     	<div>

							     	<div className={classes.exploreCount}> {this.state.tasks.length - this.getMyTasks().length }
									</div>
											<Button onClick={(e) => this.setState({ posts_drawer: true, tasks_drawer: false, client_tasks_drawer: false, current_page_view: 'map' })} variant="outlined" className={classes.explore} >
								        	EXPLORE
											</Button>
								

								       { this.state.user.user_type != 'agent' ?   <Button disabled={this.state.request_progress } onClick={() => this.hireRunner()} variant="contained" color="primary" className={classes.hirearunner} >
								        	HIRE A RUNNER
										</Button>:''}

								  	</div>

								 	 { this.state.user.user_type != 'agent' ?   <div className={classes.search} class="menu">
       									<Button 
       										disabled={this.state.request_progress} variant="contained" color="primary" className={classes.findapro} 
       										onClick={this.state.services.length > 0?() => this.launchRequestProcess('findapro', 'Find A Pro'):null} 
       										onMouseOver={() => this.handleOpen()}
       										>
          									FIND A PRO
										</Button>
										{this.state.services.length > 0 && this.state.mega_menu && isWidthUp('md', this.props.width) ?
											<MegaMenu
												open={this.state.mega_menu}
												menuenter={this.state.menu_enter}
												categories={this.state.categories.filter(category => { return category.status === 'Active' })}
												services={this.state.services.filter((s) => { return (s.service_function === 'findapro' && s.status === 'Active') })}
												request={this.launchRequestProcessService}
												close={() => this.setState({ mega_menu: false, mega_menu_request_function: '' })}
											/> : null
										}
									</div>:''}
								</span> 

								{ this.state.user && this.state.user.user_type && this.state.user.user_type === 'provider' ? 
								
								<span className={classes.cfloat}>
									<div className={classes.numberCircle3}>{this.state.agents.filter(agent => { return agent.provider_id === self.state.user.id }).length}</div>
								 	<Button onClick={() => this.setState({ agent_drawer: true, consumer_drawer: false, current_page_view: 'map' })} variant="outlined" className={classes.hirearunner}>
						          		Agents
						          	</Button>
								
								 <Button onClick={() => this.setState({ client_tasks_drawer: true, posts_drawer: false, current_page_view: 'map' })} variant="outlined" className={classes.explore}>
						          	Client Orders 
						          </Button>
						          
		            			 </span>: null }  
		            			
		            			{/* this.state.user && this.state.user.user_type &&  this.state.user.user_type === 'agent' ? 

		            			<span className={classes.cfloat}>
									<div className={classes.numberCircle3}> {this.state.consumers.length} </div>
								 	<Button onClick={() => this.setState({ consumer_drawer: true, agent_drawer: false,  current_page_view: 'map' })} variant="outlined" className={classes.hirearunner}>
						          		Customers
						        	</Button>
						        	{ this.state.agent_active ? <Button onClick={() => this.toggleAgentActive()} variant="outlined" color="primary" className={classes.onduty} >  On Duty </Button> : 
						        	 <Button onClick={() => this.toggleAgentActive()} variant="outlined" color="primary" className={classes.explore} >  Off Duty </Button> } 
						        	</span>: null */}


							{this.state.route_legs && this.state.route_legs.length > 0 ? // Navigation notification
								<Tooltip id="tooltip-icon" title="Navigation Instructions" placement="bottom">
									<IconButton
										onClick={() => this.setState({ navigation_drawer: true })}>
										<NavigationIcon />
									</IconButton>
								</Tooltip> : null}

							{this.state.user && this.state.user.user_type ? // All users see the logout and chat icons
								<span className={classes.rights}>
									<Tooltip id="tooltip-icon" title={this.state.message_tooltip} placement="bottom">
											<Badge
												color={(this.state.message_count > 0 ? 'error' : 'primary')}
												badgeContent={this.state.message_count}
												className={classes.margin}
											>
										<label onClick={() => this.setState({ content_drawer: true, content_drawer_screen: 'chat' })} >
											<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M12.5905 15.8431L12.4601 15.75H12.2999H7.92826L9.64276 14.25H16.2499C17.2167 14.25 17.9999 13.4668 17.9999 12.5V6.125H19.3749C19.4438 6.125 19.4999 6.18114 19.4999 6.25V15.625C19.4999 15.6939 19.4438 15.75 19.3749 15.75H17.4999H16.9999V16.25V18.75C16.9999 18.7972 16.974 18.8393 16.9336 18.8604C16.8877 18.8834 16.8393 18.8777 16.8033 18.8519L16.8024 18.8512L12.5905 15.8431Z" fill="#3A5868" stroke="black"/>
											<path d="M3.625 12.5V12H3.125H0.625C0.555517 12 0.5 11.9445 0.5 11.875V1.25C0.5 1.18052 0.555517 1.125 0.625 1.125H15.625C15.6945 1.125 15.75 1.18052 15.75 1.25V11.875C15.75 11.9445 15.6945 12 15.625 12H8.985H8.79714L8.65576 12.1237L3.83254 16.3439C3.83248 16.3439 3.83243 16.344 3.83237 16.344C3.79471 16.3768 3.74136 16.3831 3.70034 16.3643L3.69801 16.3632C3.65319 16.3429 3.625 16.2993 3.625 16.25V12.5Z" fill="#3A5868" stroke="black"/>
											</svg>								
										</label>
											</Badge>
										
									</Tooltip>
									{this.state.current_page_view !== 'map' ? // Return to map
										<Tooltip id="tooltip-icon" title="Return to map" placement="bottom">
											<IconButton onClick={(e) => this.setState({ current_page_view: 'map' })}>
												<MapIcon />
											</IconButton>
										</Tooltip> : null}

									
								</span> : null}								

							<label onClick={this.state.services.length > 0?() => this.launchSearchMenu():null} class="search__icon">
								<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M18.5689 16.9194L18.5694 16.9198C18.6985 17.0486 18.6996 17.2591 18.5681 17.3906L17.3898 18.5689L17.3893 18.5694C17.26 18.6991 17.0494 18.6998 16.9186 18.569C16.9186 18.569 16.9186 18.569 16.9186 18.5689L13.2778 14.9273L12.9886 14.6381L12.6477 14.8642C11.4089 15.6861 9.92701 16.1667 8.33333 16.1667C4.01448 16.1667 0.5 12.6522 0.5 8.33333C0.5 4.01448 4.01448 0.5 8.33333 0.5C12.6522 0.5 16.1667 4.01448 16.1667 8.33333C16.1667 9.92701 15.6861 11.4089 14.8642 12.6477L14.6381 12.9885L14.9273 13.2777L18.5689 16.9194ZM8.33333 1.16667C4.38136 1.16667 1.16667 4.38136 1.16667 8.33333C1.16667 12.2853 4.38136 15.5 8.33333 15.5C12.2853 15.5 15.5 12.2853 15.5 8.33333C15.5 4.38136 12.2853 1.16667 8.33333 1.16667Z" fill="#3A5868" stroke="black"/>
								</svg>									
							</label>
							{this.state.search ?
							<AppSearch
								open={this.state.search}
								agents={this.state.agents}
								providers={this.state.providers}
								services={this.state.services}
								updateMapLocation={this.handleGoTo}
								updateMapLocationWithPin={(destination) => this.setState({ map_location: destination, map_pin: destination })}
								viewProvider={(data) => this.viewProvider(data, true)}
								selectService={(service, service_function) => this.setState({ current_service: service, service_function: service_function, task_request_drawer: true, task_request_screen: service_function })}
								close={() => this.setState({ search: false})}
							/>:null}


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
								<ListItem button onClick={() => this.setState({ current_page_view: 'profile', tasks_drawer: false, client_tasks_drawer: false, agent_drawer: false, profile_menu_open: false, profile_menu_anchor: null })} className={classes.nested}>
									<Tooltip id="tooltip-icon" title="Profile" placement="bottom">
										<ListItemIcon className={classes.sidebarList}>
											<AccountCircleIcon />
										</ListItemIcon>
									</Tooltip>
									<ListItemText primary="Profile" classes={{ root: classNames(classes.sidebarList) }} disableTypography={true} />
								</ListItem> : null}
							<ListItem button onClick={() => this.setState({ current_page_view: 'account', tasks_drawer: false, client_tasks_drawer: false, agent_drawer: false, profile_menu_open: false, profile_menu_anchor: null })} className={classes.nested}>
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
									<ListItem button onClick={() => this.setState({ current_page_view: 'admin_notifications' })} className={classes.nested}>
										<Tooltip id="tooltip-icon" title="Notifications" placement="bottom">
											<ListItemIcon className={classes.sidebarList}>
												<NotificationsIcon/>
											</ListItemIcon>
										</Tooltip>
										<ListItemText primary="Notifications" classes={{ root: classNames(classes.sidebarList) }} disableTypography={true} />
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
										return <ListItem button className={classes.nested} onClick={() => this.setState({ profile_service: serviceLookup[service], current_page_view: 'profile_service', tasks_drawer: false, client_tasks_drawer: false, agent_drawer: false })}>
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
							notifications={this.state.notifications}  
							adminnotifications={this.state.adminnotifications}//changed 11-feb
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
						&& this.state.current_page_view === 'admin_notifications' ? //changed::11-feb
						<AdminNotifications
							key="page-adminnotifications"
							//editCategoryStatus={(e, data) => this.editCategoryStatus(data, e.currentTarget)}
							//addCategory={(data) => this.addCategory()}
							//editCategory={(data) => this.editCategory(data)}
							//deleteCategory={(data) => this.deleteCategory(data)}
							adminnotifications={this.state.adminnotifications}
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
							profile={(agent) => this.setState({ current_page_view: 'profile', tasks_drawer: false, client_tasks_drawer: false, agent_drawer: false, agent_profile_edit: true, agent_profile_user: agent })}
							close={() => { this.setState({ agent_drawer: false }) }}
							opencustomer={() => { this.setState({ agent_drawer: false, consumer_drawer:true }) }}
							addAgent={() => this.setState({ agent_edit_dialog_open: true })}
							setAgentFilter={(filter) => { this.setState({ agent_filter: filter }) }}
							editAgentStatus={(e, data) => this.editAgentStatus(data, e.currentTarget)}
							goToAgentList={() => { this.setState({ agent_drawer: false, tasks_drawer: false, client_tasks_drawer: false, consumer_drawer: false, current_page_view: 'agents' }) }}
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
							openagents={() => { this.setState({ agent_drawer: true, consumer_drawer:false }) }}
							broadcast={((action, receivers) => this.setState({ broadcast_dialog_open: true, broadcast_type: action, broadcast_receivers: receivers }))}
							goToConsumerList={() => this.setState({ agent_drawer: false, consumer_drawer: false, tasks_drawer: false, client_tasks_drawer: false, current_page_view: 'consumers' })}
						/>
					</Drawer> : null}
				 {this.state.user && this.state.user.user_type === 'provider' && this.state.client_tasks_drawer ? // Task drawer on the left hand side
					<Drawer
						anchor="right"
						variant="persistent"
						open={this.state.client_tasks_drawer}
						ModalProps={{ elevation: 0, BackdropProps: { invisible: true } }}
						classes={{ paper: classNames(classes.contentDrawerPaper, classes.leftDrawer) }}>
						<div className={classes.toolbar} />
						<PostSidebarProvider
							view='provider_tasks'
							user={this.state.user}
							tasks={this.state.tasks.filter(task => { return task.provider_id === this.state.user.id && task.status!= "Cancelled"; })}
							agents={this.state.agents}
							agent_filter={this.state.agent_filter}
							providers={this.state.providers}
							consumers={this.state.consumers}
							services={this.state.services}
							goto={this.handleGoTo}
							chat={(user) => this.setState({ chat_user: user, content_drawer: true, content_drawer_screen: 'chat' })}
							manualtask={() => this.setState({ content_drawer: true, content_drawer_screen: 'createtask' })}
							navigate={this.handleNavigate}
							close={() => { this.setState({ client_tasks_drawer: false }) }}
							setAgentFilter={(filter) => { this.setState({ agent_filter: filter }) }}
							viewTask={(data) => this.viewTask(data)}
							editTaskAgent={(e, data) => this.editTaskAgent(data, e.currentTarget)}
							editTaskStatus={(e, data) => this.editTaskStatus(data, e.currentTarget)}
							goToTaskList={() => { this.setState({ tasks_drawer: false, client_tasks_drawer: false, agent_drawer: false, consumer_drawer: false, current_page_view: 'tasks' }) }}
							goToCreateOrder={() => { this.setState({ client_tasks_drawer: false, content_drawer: true, content_drawer_screen: 'createtask', current_page_view: 'map' })}}
						/>
					</Drawer> : null} 
				{this.state.user && this.state.user.user_type === 'agent' && this.state.posts_drawer ? // Posts drawer on the right hand side
					<Drawer
						anchor="left"
						variant="persistent"
						open={this.state.posts_drawer}
						ModalProps={{ elevation: 0, BackdropProps: { invisible: true } }}
						classes={{ paper: classNames(classes.contentDrawerPaper, classes.leftDrawer) }}>
						<div className={classes.toolbar} />
						<PostSidebarProvider
							view='runner_view'
							user={this.state.user}
							tasks={this.state.tasks.filter(task => { 

								var live = task.status != "Cancelled"; 
								var isatask = false; 
								if(task.status != 'Requested' && task.status != 'Bidding' && task.status != 'BidChoosen' ){
									if(this.state.user.id == task.agent_id){
										isatask = true; 
									}
								}

								return live && !isatask ;  
							})
							}
							consumers={this.state.consumers}
							agents={this.state.agents}
							categories={this.state.categories.filter(category => { return category.status === 'Active' })}
							goto={this.handleGoTo}
							chat={(user) => this.setState({ chat_user: user, content_drawer: true, content_drawer_screen: 'chat' })}
							navigate={this.handleNavigate}
							close={() => { this.setState({ posts_drawer: false }) }}
							viewTask={(data) => this.viewTask(data)}
							makeBid={this.makeBid}
							editSingleTaskStatus={(task,status) => this.editSingleTaskStatus(task,status)}
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
						<PostSidebarProvider
							view='runner_tasks'
							user={this.state.user}
							tasks={this.state.tasks.filter(task => { return task.agent_id && task.agent_id == this.state.user.id && task.status != 'Requested' && task.status != 'Bidding' && task.status != 'BidChoosen' } )}
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
							goToTaskList={() => { this.setState({ tasks_drawer: false, client_tasks_drawer: false, agent_drawer: false, consumer_drawer: false, current_page_view: 'tasks' }) }}
							editSingleTaskStatus={(task,status) => this.editSingleTaskStatus(task,status)}
						/>
					</Drawer> : null}
				{!this.state.user.user_type || ( this.state.user && (this.state.user.user_type === 'consumer' || this.state.user.user_type === 'provider' ) )&& this.state.posts_drawer ? // Posts drawer on the right hand side
					<Drawer
						anchor="left"
						variant="persistent"
						open={this.state.posts_drawer}
						ModalProps={{ elevation: 0, BackdropProps: { invisible: true } }}
						classes={{ paper: classNames(classes.contentDrawerPaper, classes.leftDrawer) }}>
						<div className={classes.toolbar} />
						<PostSidebarProvider
							view='consumer_view'
							user={this.state.user}
							tasks={this.state.tasks.filter(task => { return task.status!= "Cancelled" && this.state.user.id != task.consumer_id && this.isRunner(task) })}
							agents={this.state.agents}
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
				{this.state.user && (this.state.user.user_type === 'consumer' || this.state.user.user_type === 'provider') && this.state.tasks_drawer ? // Orders drawer on the left hand side for consumers
					<Drawer
						anchor="left"
						variant="persistent"
						open={this.state.tasks_drawer}
						ModalProps={{ elevation: 0, BackdropProps: { invisible: true } }}
						classes={{ paper: classNames(classes.contentDrawerPaper, classes.leftDrawer) }}>
						<div className={classes.toolbar} />
						<PostSidebarProvider
							view='consumer_tasks'
							user={this.state.user}
							tasks={this.state.tasks.filter(task => { return (task.status!= "Cancelled" && task.consumer_id && task.consumer_id == this.state.user.id)})}
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
							editTaskStatus={(e, data, type) => this.editTaskStatusFromConsumer(data, e.currentTarget,type)}
							goToTaskList={() => { this.setState({ tasks_drawer: false, client_tasks_drawer: false, agent_drawer: false, current_page_view: 'tasks' }) }}
							chooseTaskProvider={(task_id, provider_id, price) => { this.editTaskProvider(task_id, provider_id, price); this.setState({ task_notification: true }) }}
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
							user={this.state.user}
							tasks={this.state.tasks.filter(task => { return (this.state.current_selected_tasks[0].id === task.id )})}
							agents={this.state.agents}
							providers={this.state.providers}
							services={this.state.services}
							consumers={this.state.consumers}
							referencedata={this.state.referencedata}
							cancelTask={(data) => this.cancelTasks(data)}
							editTaskStatus={this.state.user.user_type === 'consumer' ? (e, data, type) =>this.editTaskStatusFromConsumer(data, e.currentTarget,type):(e, data) => this.editTaskStatus(data, e.currentTarget) }
							editSingleTaskStatus={(task,status) => this.editSingleTaskStatus(task,status)}
							editTaskRating={(data) => this.editTaskRating(data)}
							chat={(user) => this.setState({ chat_user: user, content_drawer: true, content_drawer_screen: 'chat' })}
							goto={this.handleGoTo}
							navigate={this.handleNavigate}
							makeBid={this.makeBid}
							chooseTaskProvider={(task_id, provider_id, price) => { this.editTaskProvider(task_id, provider_id, price); this.setState({ task_notification: true }) }}
							viewProvider={(data) => this.viewProvider(data, false)}
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
							setNullProvider={() => this.setState({  current_provider: {}})}
							chat={(user) => this.setState({ chat_user: user, content_drawer: true, content_drawer_screen: 'chat' })}
							goto={this.handleGoTo}
							navigate={this.handleNavigate}
							viewProvider={(data) => this.viewProvider(data, true)}
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
					saveCategory={(data) => this.saveCategory(data)}
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
					<MenuItem className={classes.menuItem} onClick={() => this.setState({ current_page_view: 'profile', tasks_drawer: false, client_tasks_drawer: false, agent_drawer: false, profile_menu_open: false, profile_menu_anchor: null })}>
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
					{this.isValidStatus('Cancelled') && this.state.user.user_type === 'consumer' || this.state.menu_type == 'consumer'? <MenuItem onClick={this.handleSetTaskStatus}>Cancelled</MenuItem> : null}
					{ /* this.isValidStatus('Accepted') && this.state.user.user_type !== 'consumer' && this.state.menu_type !== 'consumer' ? <MenuItem onClick={this.handleSetTaskStatus}>Accepted</MenuItem> : null */ }
					{this.isValidStatus('Preparing') && this.state.user.user_type !== 'consumer'  && this.state.menu_type !== 'consumer'? <MenuItem onClick={this.handleSetTaskStatus}>Preparing</MenuItem> : null}
					{this.isValidStatus('On the road') && this.state.user.user_type !== 'consumer' && this.state.menu_type !== 'consumer' ? <MenuItem onClick={this.handleSetTaskStatus}>On the road</MenuItem> : null}
					{this.isValidStatus('Arrived') && this.state.user.user_type !== 'consumer'  && this.state.menu_type !== 'consumer'? <MenuItem onClick={this.handleSetTaskStatus}>Arrived</MenuItem> : null}
					{this.isValidStatus('Delivered') && this.state.user.user_type !== 'consumer' && this.state.menu_type !== 'consumer' ? <MenuItem onClick={this.handleSetTaskStatus}>Delivered</MenuItem> : null}
					{this.isValidStatus('Awaiting payment') && this.state.user.user_type !== 'consumer' && this.state.menu_type !== 'consumer' ? <MenuItem onClick={this.handleSetTaskStatus}>Awaiting payment</MenuItem> : null}
					{this.isValidStatus('Paid') && this.state.user.user_type !== 'consumer' && this.state.menu_type !== 'consumer' ? <MenuItem onClick={this.handleSetTaskStatus}>Paid</MenuItem> : null}
					{this.isValidStatus('Completed') && this.state.user.user_type !== 'consumer' && this.state.menu_type !== 'consumer' ? <MenuItem onClick={this.handleSetTaskStatus}>Completed</MenuItem> : null}
					{this.isValidStatus('Declined') && this.state.user.user_type !== 'consumer' && this.state.menu_type !== 'consumer' ? <MenuItem onClick={this.handleSetTaskStatus}>Declined</MenuItem> : null}
					{this.isValidStatus('Failed') && this.state.user.user_type !== 'consumer' && this.state.menu_type !== 'consumer' ? <MenuItem onClick={this.handleSetTaskStatus}>Failed</MenuItem> : null}
					{this.isValidStatus('Cancelled') && this.state.user.user_type !== 'consumer' && this.state.menu_type !== 'consumer' ? <MenuItem onClick={this.handleSetTaskStatus}>Cancelled</MenuItem> : null}
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
					
					{this.state.current_selected_tasks.length>0 
						&& (this.state.current_selected_tasks[0].status !== "Completed") ? 
					<MenuItem onClick={self.handleSetTaskAgent.bind(this, null)}>Unassign Task</MenuItem> :null}

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
						services={this.state.services}
						close={() => this.setState({ landing_desktop: false })}
						launchRequestProcess={(request_function, request_title) => this.launchRequestProcess(request_function, request_title)}
						hireRunner={() => this.hireRunner()}
					/> : null}

			</div>
		);
	}
}

export default compose(withStyles(styles, { withTheme: true }), withWidth())(Dashboard);
