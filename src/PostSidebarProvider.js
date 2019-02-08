// Import React
import React, { Component } from 'react';

// Material UI
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import CardActions from "@material-ui/core/CardActions";
import Divider from "@material-ui/core/Divider";
import Badge from '@material-ui/core/Badge';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import AddIcon from '@material-ui/icons/Add';
// Icons
import CreateIcon from '@material-ui/icons/Create';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FilterListIcon from '@material-ui/icons/FilterList';
import SearchIcon from '@material-ui/icons/Search';
import SortIcon from '@material-ui/icons/Sort';
import Fab from '@material-ui/core/Fab';

// Task actions
import * as taskActions from './actions/tasks';

// Moment for date and time formatting
import moment from 'moment';


// styles
const styles = theme => ({
	root: {
		width: '100%',
		height: '100%',
		zIndex: 100
	},
	appBar: {
		textAlign: 'center',
		borderBottom: '1px solid #B3B3B3',
		backgroundColor: '#F9F9F9',
		padding: 10,
		top: 62
	},
	upperhalf: {
		display:'inline-flex',
		width: '100%',
		cursor: 'pointer',
		marginBottom: '5px'
	},
	tab: {
		minWidth: 40
	},
	margin: {
		margin: theme.spacing.unit * 2,
	},
	padding: {
		padding: `0 ${theme.spacing.unit + 2}px`,
	},
	leftIcon: {
		marginRight: theme.spacing.unit,
	},
	cardRoot: {
		backgroundColor: theme.palette.sidebar_background.main
	},
	tabLabel: {
		marginLeft: 5,
		marginRight: 5,
		paddingLeft: 5,
		paddingRight: 5
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
	justifyc: {
	    display: "flex",
	    justifyContent: 'space-between'
	},
  bigAvatar: {
    width: 40,
    height: 40,
    marginLeft: '5px',
  },
  fullheight: {
 	height: '84%',
  }, 
  titledateloc: {
    marginLeft: 10,
    width: '200px'
  },
  status: {
	marginTop: 10,
    textTransform: 'capitalize',
    fontSize: '15px',
    display: 'inline-flex',
  }
  	,
  offers: {
	color: 'black',
    fontSize: '13.5px',
    marginTop: '5px'
  	},
  bids1: {
    marginTop: 5,
    marginRight: 10
  },
  price:{
	display: "flex",
  }, 
  bids: {
    marginTop: 	5,
    display: "inline-flex",
    flexWrap: "wrap"
  },
  upperscript: {
    fontSize: '10px',
    marginTop: 'auto'
  },
  moreoptions: {
  	padding:0,
  	marginLeft: '35px'
  },
  runner: {
    width: "50px",
    height: "5px",
    borderTopRightRadius: "15px",
    borderBottomRightRadius: "15px",
    borderTopLeftRadius: "15px",
    borderBottomLeftRadius: "15px",
    backgroundColor: "#FF0000",
    display: "table-cell"
  },
   provider: {
	  	fontSize: '12px',
	    width: "50px",
	    height: "5px",
	    borderTopRightRadius: "15px",
	    borderBottomRightRadius: "15px",
	    borderTopLeftRadius: "15px",
	    borderBottomLeftRadius: "15px",
	    backgroundColor: "#30769C",
	    display: "table-cell"
  },
  greenbid: {
  	fontSize: 'smaller',
    width: "120px",
    height: "25px",
    borderTopRightRadius: "18px",
    borderBottomRightRadius: "18px",
    borderTopLeftRadius: "18px",
    borderBottomLeftRadius: "18px",
    backgroundColor: "#649F55",
    color: "white",
    textAlign: "center",
    verticalAlign: "middle",
    fontWeight: "bold",
    display: "table-cell",
    marginTop: "10px",
    marginLeft: "10px",
    textTransform: 'capitalize',
    cursor: 'pointer'
  },
   greybid: {
	  	fontSize: 'smaller',
	    width: "120px",
	    height: "25px",
	    borderTopRightRadius: "18px",
	    borderBottomRightRadius: "18px",
	    borderTopLeftRadius: "18px",
	    borderBottomLeftRadius: "18px",
	    backgroundColor: "#60707C",
	    color: "white",
	    textAlign: "center",
	    verticalAlign: "middle",
	    fontWeight: "bold",
	    display: "table-cell",
	    marginTop: "10px",
	    marginLeft: "10px",
	    textTransform: 'capitalize',
	    cursor: 'pointer'
  },
   whitebid: {
	  	fontSize: 'smaller',
	    width: "120px",
	    height: "25px",
	    borderTopRightRadius: "18px",
	    borderBottomRightRadius: "18px",
	    borderTopLeftRadius: "18px",
	    borderBottomLeftRadius: "18px",
	    backgroundColor: "white",
	    border: "1px solid",
	    color: "#7F4095",
	    textAlign: "center",
	    verticalAlign: "middle",
	    fontWeight: "bold",
	    display: "table-cell",
	    marginTop: "10px",
	    marginLeft: "10px",
	    textTransform: 'capitalize',
	    cursor: 'pointer'
  },  
  whitebutton: {
    fontSize: '12px',
    color: "#7F4095",
    borderColor: "#7F4095",
    backgroundColor: "white",
    "&:hover": {
      backgroundColor: "white"
    },
    borderTopRightRadius: "18px",
    borderBottomRightRadius: "18px",
    borderTopLeftRadius: "18px",
    borderBottomLeftRadius: "18px",
 	width: "180px",
    height:'28px',
    'minHeight': '25px',
    marginTop: "5px",
    border: '1px solid'
  },  
  providerbutton: {
    fontSize: '12px',
    color: "white",
    borderColor: "#30769C",
    backgroundColor: "#30769C",
    "&:hover": {
      backgroundColor: "#30769C"
    },
    borderTopRightRadius: "18px",
    borderBottomRightRadius: "18px",
    borderTopLeftRadius: "18px",
    borderBottomLeftRadius: "18px",
 	width: "180px",
    height:'28px',
    'minHeight': '25px',
    marginTop: "5px",
    border: '1px solid'
  },
  progressbutton: {
    fontSize: '12px',
    color: "white",
    borderColor: "#FF7F50",
    backgroundColor: "#FF7F50",
    "&:hover": {
      backgroundColor: "#FF7F50"
    },
    borderTopRightRadius: "18px",
    borderBottomRightRadius: "18px",
    borderTopLeftRadius: "18px",
    borderBottomLeftRadius: "18px",
 	width: "180px",
    height:'28px',
    'minHeight': '25px',
    marginTop: "5px",
    border: '1px solid'
  },

  completedbutton: {
    fontSize: '12px',
    color: "white",
    borderColor: "#2D9CDB",
    backgroundColor: "#2D9CDB",
    "&:hover": {
      backgroundColor: "#2D9CDB"
    },
    borderTopRightRadius: "18px",
    borderBottomRightRadius: "18px",
    borderTopLeftRadius: "18px",
    borderBottomLeftRadius: "18px",
 	width: "180px",
    height:'28px',
    minHeight: '25px',
    marginTop: "5px",
    border: '1px solid'
  },
  greybutton: {
    fontSize: '12px',
    color: "white",
    borderColor: "#60707C",
    backgroundColor: "#60707C",
    "&:hover": {
      backgroundColor: "#60707C"
    },
    borderTopRightRadius: "18px",
    borderBottomRightRadius: "18px",
    borderTopLeftRadius: "18px",
    borderBottomLeftRadius: "18px",
 	width: "180px",
    height:'28px',
    'minHeight': '25px',
    marginTop: "5px"
  },
  greenbutton: {
    fontSize: '12px',
    color: "white",
    borderColor: "#649F55",
    backgroundColor: "#649F55",
    "&:hover": {
      backgroundColor: "#649F55"
    },
    borderTopRightRadius: "18px",
    borderBottomRightRadius: "18px",
    borderTopLeftRadius: "18px",
    borderBottomLeftRadius: "18px",
 	width: "180px",
    height:'28px',
    'minHeight': '25px',
    marginTop: "5px"
  },
  purplebutton: {
  	fontSize: '12px',
    color: "white",
    borderColor: "#7F4095",
    backgroundColor: "#7F4095",
    "&:hover": {
      backgroundColor: "#7F4095"
    },
    "&:disabled": {
      color: "white",
      backgroundColor: "#B68CC5"
    },
    borderTopRightRadius: "18px",
    borderBottomRightRadius: "18px",
    borderTopLeftRadius: "18px",
    borderBottomLeftRadius: "18px",
    width: "180px",
    height:'28px',
    'minHeight': '25px',
    marginTop: "5px"
  }, 
  card: {
  	minWidth: 200,
    width: 343,
    backgroundColor: "#F9F9F9",
    marginTop: 15,
    display:'flex'
  }, 
  cardcontent: {
  	padding: '10px',
  	width: '100%',
  	"&:last-child": {
      paddingBottom: 10
    }
  },
  location: { 
    marginTop: "25px",
    marginLeft:"40px",
    cursor: 'pointer'
  },
  cardtitle:{
  	fontSize: '15px',
  	fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  	textTransform: 'capitalize',
  	fontWeight: 'bold'
  },
  subtitle: { 
  	fontSize: '15px'
  },
  pinkline: {
    borderLeft: '5px solid #7F4095',
    marginLeft: '4px'
  },
  grayline: {
    borderLeft: '5px solid #30769C',
    marginLeft: '4px'
  },fab: {
    margin: theme.spacing.unit,
  	},
  	cardupperright:{
  		display: 'grid'
  	},
  	pricetext:{
  		fontSize:'2rem',
  		lineHeight:'1',
  		marginTop:'auto'
  	}
});

// CLass: PostSidebarProvider
class PostSidebarProvider extends Component {

	// getAgentName: 
	getAgentName = (agents, id) => {
		let name = 'All agents'
		agents.forEach(agent => {
			if (agent.id === id) name = agent.first_name + ' ' + agent.last_name;
		});
		return name;
	}

	// constructor: 
	constructor(props) {
		super(props);

		var tks = {} 
		if(this.props.view == 'runner_view' || this.props.view == 'consumer_view'){
			tks = taskActions.convertTasksToDisplayFormat(this.props.tasks, [], [], [], this.props.consumers);
		}
		if(this.props.view == 'provider_tasks' || this.props.view == 'runner_tasks' || this.props.view == 'consumer_tasks'){
			tks = taskActions.convertTasksToDisplayFormat(this.props.tasks, this.props.agents, this.props.providers, this.props.services, this.props.consumers);
		}
		
		this.state = {
			tasks: tks,
			
			task_sort_menu: false,
			task_sort_menu_anchor: null,
			task_sort: 'due_date',
			task_actions_menu: false,
			task_actions_menu_anchor: null,
			task_filter_menu: false,
			task_filter_menu_anchor: null,
			task_filter: 'All',
			selected_task: {},
			bid_dialog_open: false,
			bid_amount: '',
			bid_comment:'',
			tag_filter: '',
			profilter: false,

			agent_filter_menu: false,
			agent_filter_menu_anchor: null,
			agent_filter: this.props.agent_filter || '',

			agent_filter_name: this.getAgentName(this.props.agents, this.props.agent_filter),

			//  will be seen on consumer
			task_provider_menu: false,
			task_provider_menu_anchor: null,
			selected_runner_id: '',
			selected_runner_name: '',
			selected_runner_price: 0,

			runner_view: this.props.view == 'runner_view'?true:false,
			consumer_view: this.props.view == 'consumer_view'?true:false,
			tab_index: this.props.view == 'runner_view' || this.props.view == 'consumer_view'?-1:0,
			runner_tasks: this.props.view == 'runner_tasks'?true:false, 
			consumer_tasks: this.props.view == 'consumer_tasks'?true:false, 
			provider_tasks: this.props.view == 'provider_tasks'?true:false, 

			heading : this.props.view == 'runner_view' || this.props.view == 'consumer_view' ? 'POSTS':'Tasks'


		};
	}

	// componentWillReceiveProps: set the tasks from the parent state
	componentWillReceiveProps = (nextProps) => {
		
		if(this.state.runner_tasks || this.state.consumer_tasks){
			this.setState({
			tasks: taskActions.convertTasksToDisplayFormat(nextProps.tasks, nextProps.agents, nextProps.providers, nextProps.services, nextProps.consumers),
			agent_filter: nextProps.agent_filter
		});
		}
		if(this.state.provider_tasks){
			this.setState({
						tasks: taskActions.convertTasksToDisplayFormat(nextProps.tasks, nextProps.agents, nextProps.providers, nextProps.services, nextProps.consumers),
						agent_filter: nextProps.agent_filter,
						agent_filter_name: this.getAgentName(nextProps.agents, nextProps.agent_filter)
					});
		}
		else{

			this.setState({
				tasks: taskActions.convertTasksToDisplayFormat(nextProps.tasks, [], [], [], nextProps.consumers)
			});
	}
	}

// handleGoToTaskList: 
	handleGoToTaskList = () => {
		this.props.goToTaskList();
	}

	// handleChangeTab: 
	handleChangeTab = (event, value) => {
		this.setState({ tab_index: value });
	}


	// handleSortMenu: 
	handleSortMenu = (sort, event) => {
		this.setState({ task_sort_menu: false, task_sort: sort })
	}

	getCurrentUserBid = (bids) => {
		var bidValue  = '';
		bids.forEach(bid => {
			if(bid.provider_id.toString() == this.props.user.id){
				bidValue = bid.amount; 
			}		
		});
		return bidValue;
	}
	//
	handleTaskActionsMenu = (action, event) => {
		this.setState({ task_actions_menu: false })
		if (action === 'chat_consumer') {
			let chat = {
				name: this.state.selected_task.answers['Name'],
				id: this.state.selected_task.user_id
			}
			this.props.chat(chat, event);
		}
		if (action === 'chat_agent') {
			let chat = {
				name: (this.state.selected_task.agent ? (this.state.selected_task.agent.first_name + ' ' + this.state.selected_task.agent.last_name) : ''),
				id: this.state.selected_task.agent ? this.state.selected_task.agent.id : null
			}
			this.props.chat(chat, event);
		}
		if (action === 'task_details') this.props.viewTask([this.state.selected_task.id]);
		if (action === 'navigate') this.props.navigate(this.state.selected_task.location);
		if (action === 'task_details') this.props.viewTask([this.state.selected_task.id]);
		if (action === 'navigate') this.props.navigate(this.state.selected_task.location);
	}

	openBidMenu = (e,task,bid) => {
		if( task.consumer_id == this.props.user.id && task.status === "Bidding" ) {
			this.setState({ task_provider_menu: true, task_provider_menu_anchor: e.currentTarget, selected_task: task, selected_runner_name: bid.agent_name, selected_runner_id: bid.provider_id, selected_runner_price: bid.amount })
		}
	}

		//
	handleCloseAgentFilterMenu = () => {
		this.setState({ agent_filter_menu: false })
	}

	//
	handleAgentFilterMenu = (filter, event) => {
		this.setState({ agent_filter_menu: false, agent_filter: filter });
		this.props.setAgentFilter(filter);
	}

	viewTask = (task) => {
		this.props.viewTask([task.id]);
		this.props.navigate(task.location);
	}

	getBidStyle = (task, bid) => {

		var bidStyle = this.props.classes.whitebid; 

		if( (bid.provider_id && bid.provider_id.toString() == this.props.user.id ) || ( task.agent_id && task.agent_id == bid.provider_id.toString()))  {
			bidStyle = this.props.classes.greybid; 
		}
		if(task.status !== 'Requested' && task.status !== 'Bidding' && task.status !== 'BidChoosen' && task.agent_id && task.agent_id == bid.provider_id.toString()) {
			bidStyle = this.props.classes.greenbid; 
		}

		return bidStyle; 

	}

	getButtonStyle = (task, bids) => {

		
		var buttonStyle = this.props.classes.purplebutton;
		var stats = ['Preparing' ,'On the road', 'Arrived', 'Delivered', 'Awaiting payment', 'Paid'];
		var greystats = ['Declined' , 'Failed' , 'Cancelled'];
		
		if(stats.includes(task.status) && (task.consumer_id == this.props.user.id || task.agent_id == this.props.user.id ) ){
			buttonStyle = this.props.classes.progressbutton; 
			return buttonStyle; 
		}
		if(task.status == 'Completed' && (task.consumer_id == this.props.user.id || task.agent_id == this.props.user.id )){
			buttonStyle = this.props.classes.completedbutton; 
			return buttonStyle; 
		}
		if(greystats.includes(task.status)){
			buttonStyle = this.props.classes.greybutton; 
			return buttonStyle; 
		}

		if(!taskActions.isRunner(task)) return this.props.classes.providerbutton; 

		var didIbid =false; 
		
		bids.forEach(bid => {
			if(bid.provider_id.toString() == this.props.user.id){
				didIbid =true ; 
			}		
		});

		if(task.status == "Requested" ){
			if(task.consumer_id == this.props.user.id){
				buttonStyle= this.props.classes.greybutton;
			}
			else {
				buttonStyle= this.props.classes.purplebutton;
			}
		}
		else if(task.status == "Bidding" ){
			if(task.consumer_id == this.props.user.id ){
				buttonStyle= this.props.classes.whitebutton;
			}
			else if(didIbid){
				buttonStyle= this.props.classes.greybutton;
			}
			else{
				buttonStyle= this.props.classes.purplebutton; 
			}
		}
		else if(task.status == "BidChoosen" ){
			if( task.consumer_id == this.props.user.id ){
				buttonStyle= this.props.classes.greybutton;
			}
			else if(task.agent_id == this.props.user.id){
				buttonStyle= this.props.classes.whitebutton;
			}
			else {
				buttonStyle= this.props.classes.greybutton;
			}
		}
		else {
			buttonStyle= this.props.classes.greenbutton;
		}
		
		return buttonStyle ;
	}

	handleButtonClick = (e, task, bids) => {

		var didIbid =false; 
		bids.forEach(bid => {
			if(bid.provider_id.toString() == this.props.user.id){
				didIbid =true ; 
			}		
		});

		if(task.status == "Requested" && this.state.runner_view ){
			this.setState({ bid_dialog_open: true, selected_task: task }); 
			e.stopPropagation();
		}
		if(task.status == "Bidding" && !didIbid && this.state.runner_view ){
			this.setState({ bid_dialog_open: true, selected_task: task }); 
			e.stopPropagation();
		}
		if(task.status == "BidChoosen" ){
			if(task.agent_id == this.props.user.id)
				this.props.editSingleTaskStatus(task,"Accepted");
		}

		if( this.state.provider_tasks && task.status !== 'Completed' && task.status !== 'Cancelled' && task.status !== 'Declined' && task.status !== 'Failed' ){
			this.props.editTaskStatus(e, [task.id]); 
			e.stopPropagation(); 
		}
		if( this.state.runner_tasks  && task.agent_id && task.agent_id != null && task.agent_id != 0 && task.status !== 'Completed' && task.status !== 'Cancelled'  && task.status !== 'Declined' && task.status !== 'Failed' ){
			this.props.editTaskStatus(e, [task.id]); 
			e.stopPropagation(); 
		}

		if( this.state.consumer_tasks  && task.consumer_id == this.props.user.id && (task.status === 'Requested' || task.status === 'Bidding')){
			this.props.editTaskStatus(e, [task.id],'consumer'); 
			e.stopPropagation();
		}			

	}
	

	// render: 
	render() {
		const { classes } = this.props;
		return (
			<div className={classes.root}>
				<Menu // Menu used to sort a task
					id="menu-tasksort"
					anchorEl={this.state.task_sort_menu_anchor}
					open={this.state.task_sort_menu}
					onClose={() => this.setState({ task_sort_menu: false })}
				>
					
					{ this.state.runner_view || this.state.runner_tasks || this.state.provider_tasks  ? <MenuItem onClick={this.handleSortMenu.bind(this, 'customer_name')}>Customer name</MenuItem>:''}
					{ this.state.runner_view  ? <MenuItem onClick={this.handleSortMenu.bind(this, 'price')}>Price</MenuItem>:''}
					{ this.state.runner_tasks || this.state.provider_tasks  ? <MenuItem onClick={this.handleSortMenu.bind(this, 'agent_name')}>Agent name</MenuItem>:''}
					{ this.state.runner_tasks || this.state.provider_tasks  ? <MenuItem onClick={this.handleSortMenu.bind(this, 'due_date')}>Due date</MenuItem>:''}
					{ this.state.consumer_tasks  ? <MenuItem onClick={this.handleSortMenu.bind(this, 'due_date')}>Due date</MenuItem>:''}
					{ this.state.consumer_tasks  ? <MenuItem onClick={this.handleSortMenu.bind(this, 'provider_name')}>Provider name</MenuItem>:''}
				
					{ !this.state.consumer_tasks  ? <MenuItem onClick={this.handleSortMenu.bind(this, 'neighbourhood')}>Near By</MenuItem>:''}

				</Menu>
				{ /* <Menu // Menu used to filter tasks
					id="menu-taskfilter"
					anchorEl={this.state.task_filter_menu_anchor}
					open={this.state.task_filter_menu}
					onClose={() => this.setState({ task_filter_menu: false, task_filter_menu_anchor: null })}
				>
					<MenuItem onClick={(e) => this.setState({ task_filter: 'All', task_filter_menu: false })}>All</MenuItem>
					<MenuItem onClick={(e) => this.setState({ task_filter: 'My Interests', task_filter_menu: false })}>My interests</MenuItem>
				</Menu> */ }
				<Menu // Menu used for actions
					id="menu-taskactions"
					anchorEl={this.state.task_actions_menu_anchor}
					open={this.state.task_actions_menu}
					onClose={() => this.setState({ task_actions_menu: false })}
				>
					<MenuItem onClick={this.handleTaskActionsMenu.bind(this, 'task_details')}>View details</MenuItem>
					{ this.state.runner_view || this.state.runner_tasks || this.state.provider_tasks  ? <MenuItem onClick={this.handleTaskActionsMenu.bind(this, 'chat_consumer')}>Chat with customer</MenuItem>:''}
					{ this.state.runner_view || this.state.runner_tasks || this.state.provider_tasks  ? <MenuItem onClick={this.handleTaskActionsMenu.bind(this, 'phone_customer')}>Phone customer</MenuItem>:''}
					{ this.state.runner_view ?<MenuItem onClick={this.handleTaskActionsMenu.bind(this, 'map')}>View on Map</MenuItem>:''}
					<MenuItem onClick={this.handleTaskActionsMenu.bind(this, 'navigate')}>Navigate to task</MenuItem>
					{ ( this.state.consumer_tasks || this.state.provider_tasks  ) && this.state.selected_task && this.state.selected_task.agent ? <MenuItem onClick={this.handleTaskActionsMenu.bind(this, 'chat_agent')}>Chat with agent</MenuItem> : null}
					{ ( this.state.consumer_tasks || this.state.provider_tasks )  && this.state.selected_task && this.state.selected_task.agent ? <MenuItem onClick={this.handleTaskActionsMenu.bind(this, 'phone_agent')}>Phone agent</MenuItem> : null}
					{ this.state.consumer_tasks  ? <MenuItem onClick={this.handleTaskActionsMenu.bind(this, 'chat_provider')}>Chat with provider</MenuItem>: null}
					{ this.state.consumer_tasks  ?	<MenuItem onClick={this.handleTaskActionsMenu.bind(this, 'phone_provider')}>Phone provider</MenuItem>: null}
				</Menu>
				
				{ this.state.consumer_view || this.state.consumer_tasks ? 
				<Menu // Menu used for actions
					id="menu-taskproviders"
					anchorEl={this.state.task_provider_menu_anchor}
					open={this.state.task_provider_menu}
					onClose={(e) => this.setState({ task_provider_menu: false, task_provider_menu_anchor: null })}
				>
					<MenuItem onClick={() => { this.props.viewProvider(this.state.selected_runner_id.toString()); this.setState({ task_provider_menu: false, task_provider_menu_anchor: null }); }}>View {this.state.selected_runner_name}</MenuItem>
					<MenuItem onClick={(e) => { this.props.chat({ name: this.state.selected_runner_name, id: this.state.selected_runner_id }, e); this.setState({ task_provider_menu: false, task_provider_menu_anchor: null }); }}>Chat with {this.state.selected_runner_name}</MenuItem>
					<MenuItem onClick={() => { this.props.chooseTaskProvider(this.state.selected_task.id, this.state.selected_runner_id, this.state.selected_runner_price); this.setState({ task_provider_menu: false, task_provider_menu_anchor: null }); }}>Accept bid from {this.state.selected_runner_name}</MenuItem>
				</Menu>:''}

				{ this.state.runner_tasks ||  this.state.provider_tasks ? 
				<Menu // Menu used for actions on the agent list items
					id="menu-agentfilter"
					anchorEl={this.state.agent_filter_menu_anchor}
					open={this.state.agent_filter_menu}
					onClose={this.handleCloseAgentFilterMenu}
				>
					<MenuItem onClick={this.handleAgentFilterMenu.bind(this, '')}>All agents</MenuItem>
					{this.props.agents
						.map(agent => {
							return <MenuItem onClick={this.handleAgentFilterMenu.bind(this, agent.id)}>{agent.first_name + ' ' + agent.last_name}</MenuItem>
						})}
				</Menu>:''}



				<AppBar position="sticky" elevation={0} className={classes.appBar}>
					<Toolbar disableGutters={true}>
					{this.state.provider_tasks ? <Fab onClick={() => this.props.goToCreateOrder()} color="primary" aria-label="Add" className={classes.fab}>
				        <AddIcon />
				     </Fab>: '' }
						<Typography variant="title" className={classes.title} color="inherit">{this.state.heading}</Typography>

						<IconButton
							color="inherit"
							aria-label="Menu"
							onClick={() => this.props.close()}>
							<svg width='20'
								fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="1.414" clip-rule="evenodd" viewBox="0 0 28 28">
								<g fill="#313131" fill-rule="nonzero" stroke="#313131" stroke-width=".3">
									<path d="M8.893 10.36a1.037 1.037 0 0 0 1.471 0 1.042 1.042 0 0 0 0-1.472L2.043.559a1.04 1.04 0 1 0-1.47 1.472l8.32 8.329zM15.26 13.788L27.008 2.031a1.042 1.042 0 0 0 0-1.472c-.407-.407-1.065-.586-1.471-.179L13.055 12.694h-.309v.36L.419 25.546c-.406.406-.329 1.065.076 1.472.203.204.508.305.774.305.267 0 .552-.101.755-.305L13.78 15.261l11.751 11.758a1.041 1.041 0 0 0 1.474 0 1.04 1.04 0 0 0 .001-1.472L15.26 13.788z" />
								</g>
							</svg>
						</IconButton>
					</Toolbar>
				</AppBar>

				{ this.state.runner_tasks || this.state.consumer_tasks || this.state.provider_tasks ? 
				<Tabs
					value={this.state.tab_index}
					onChange={this.handleChangeTab}
					indicatorColor="primary"
					textColor="primary"
					fullWidth
				>
					{  !this.state.runner_tasks ? <Tab
						label={<Badge className={classes.padding} badgeContent={
							this.state.tasks
								.filter(task => {
									if (task.status == "Requested" || task.status == "Bidding" || task.status == "BidChoosen" ) return true;
									return false;
								}).length
						}>Unassigned</Badge>}
						classes={{
							root: classes.tab
						}}
					/>: ''}
					<Tab
						label={<Badge className={classes.padding} badgeContent={
							this.state.tasks
								.filter(task => {
									if (task.status !== "Requested" && task.status != "Bidding" && task.status != "BidChoosen" && !task.date_completed) return true;
									return false;
								}).length
						}>{this.state.runner_tasks ? 'To Do': 'Assigned'}</Badge>}
						classes={{
							root: classes.tab
						}}
					/>
					<Tab
						label={<Badge className={classes.padding} badgeContent={
							this.state.tasks
								.filter(task => {
									if (task.date_completed) return true;
									return false;
								}).length
						}>Done</Badge>}
						classes={{
							root: classes.tab
						}}
					/>
				</Tabs>:null}

				{this.state.tasks ?
					<div>
						<Button  className={classes.button} onClick={(e) => this.setState({ task_sort_menu: true, task_sort_menu_anchor: e.currentTarget })}>
							<SortIcon className={classes.leftIcon} />Sort
						</Button>
						{ /* <Button   className={classes.button} onClick={(e) => this.setState({ task_filter_menu: true, task_filter_menu_anchor: e.currentTarget })}>
							<FilterListIcon className={classes.leftIcon} />{this.state.task_filter}
						</Button> */}
						{this.state.tasks
							.sort((a, b) => {
								
								if ( ( this.state.runner_view || this.state.consumer_view )  && (a.date_created > b.date_created )  )  return -1 ; 

								if (!this.state.runner_tasks && this.state.tab_index === 0 ) return taskActions.getSortOrder(a.status,'Unassigned')-taskActions.getSortOrder(b.status,'Unassigned');
								if (!this.state.runner_tasks &&  this.state.tab_index === 1 ) return taskActions.getSortOrder(a.status,'Assigned')-taskActions.getSortOrder(b.status,'Assigned');
								if (this.state.runner_tasks && this.state.tab_index === 0 ) return taskActions.getSortOrder(a.status,'To Do')-taskActions.getSortOrder(b.status,'To Do');
								if (this.state.tab_index === 2 )  return taskActions.getSortOrder(a.status,'Done')-taskActions.getSortOrder(b.status,'Done');
								if (this.state.runner_tasks && this.state.tab_index === 1 ) return taskActions.getSortOrder(a.status,'Done')-taskActions.getSortOrder(b.status,'Done');
								

								return false;
							}).map(task => {
								let bids = taskActions.convertBidsToDisplayFormat(task, this.props.agents);
								return (

									    <Card key={task.id} className={classes.card}>
									     { task.provider_id &&  task.provider_id != 0 ?   <div className={classes.grayline}></div>:<div className={classes.pinkline}></div> } 
									      <CardContent className={classes.cardcontent}>
									        <div className={classes.upperhalf} >
									        <div>
									        { this.state.provider_tasks ? 

									        	<div className={classes.fullheight}><Avatar className={classes.bigAvatar}
													onClick={(e) => { this.props.editTaskAgent(e, [task.id]); e.stopPropagation() }} 
													aria-label="agent initials" 
													src={(task.agent  && task.agent_id && task.agent.avatar && task.agent.avatar.id !== '' ) ? '/api/images/getimage?id=' + task.agent.avatar.id : null}
													>
													{ (task.agent_id && task.agent) ? (task.agent.avatar ? '':(task.agent.first_name ? task.agent.first_name.substring(0, 1) : '') + (task.agent.last_name ? task.agent.last_name.substring(0, 1):'')) : <AddIcon />  } 
													</Avatar>{!task.provider_id ||  task.provider_id == 0 ? 
									        	<div style={{marginTop:'auto'}}><a style={{fontSize:'12px'}}>URGENT</a><br /><div className={classes.runner}></div></div>:''} </div>  : 

									          <div className={classes.fullheight}><Avatar className={classes.bigAvatar}
									          >
									          		{task.provider_name ? task.provider_name.substring(0, 2) : ''}
													{task.agent_name ? task.agent_name.substring(0, 2) : ''}

									          </Avatar> {!task.provider_id ||  task.provider_id == 0 ? 
									        	<div style={{marginTop:'auto'}}><a style={{fontSize:'12px'}}>URGENT</a><br /><div className={classes.runner}></div></div>:''} </div>   } 

									          { /* !task.provider_id ||  task.provider_id == 0 ? 
									           <div className={classes.runner}></div> : <a style={{fontSize:'12.5px'}}>{this.getAgoTime(task)}</a>  <div className={classes.provider}></div> */ }
									        </div>   
									          <div className={classes.titledateloc} onClick={() => this.viewTask(task)}>
									            { task.answers && task.answers['Title'] ?<a className={classes.cardtitle} >{ task.answers['Title']}</a>: ''}
									            { task.answers && task.answers['Title'] ?<br />: ''}
									            {  task.provider && task.username ?  <a className={classes.cardtitle} >{'Ordered By : '+task.username}</a>: '' }
									            {  task.provider && task.username ?  <br />: ''}

									            <a className={classes.subtitle} style={{fontWeight:'bold'}}>
									              DUE:
									            </a>
 												<a className={classes.subtitle}>
									             { task.start_date_time ? moment(task.start_date_time).format('ddd, DD MMM'): ''}
									            </a><br />
									            <a className={classes.subtitle}>
									               { task.neighbourhood ? task.neighbourhood : "No Location found" } 
									            </a>
									          </div>


									          <div className={classes.cardupperright}>

									           { (this.state.runner_view  && (!task.provider_id ||  task.provider_id == 0 )) || this.state.provider_tasks || this.state.runner_tasks || this.state.consumer_tasks  || this.state.consumer_view ? 
															<IconButton disabled={!this.props.user.id} className={classes.moreoptions}  aria-label="More options" onClick={(e) => { this.setState({ task_actions_menu: true, task_actions_menu_anchor: e.currentTarget, selected_task: task }); e.stopPropagation(); }}>
																<MoreVertIcon />
															</IconButton>
													:null}

									            <div className={classes.price}>
									              <Typography variant="h6" className={classes.pricetext} >{task.price ? ("0" + task.price).slice(-2) : '?'}</Typography>
									              <a className={classes.upperscript}>KD</a>
									              </div>
									          </div>

									        </div>
									        <Divider />
									        
									        <div className={classes.justifyc}>
									   
									        	<div  className={classes.offers}> Left :</div>
									        	
									        	
									          	<Button
										          	 onClick={(e) => this.handleButtonClick(e,task,bids)} 
										          	 className={this.getButtonStyle(task,bids)}>
										          	 {taskActions.getHumanReadableStatusText(task, bids, this.props.user.id)}
									          	 </Button>
									        </div>
									       {(task.status == "Bidding" || task.status == "BidChoosen" ) && !task.provider_id ||  task.provider_id == 0 ? 
									        <div className={classes.bids}>
									        		{bids.map(bid => {
														return (
															<div className={classes.bids1}>
																<div onClick={(e) => this.openBidMenu(e,task,bid)} className={this.getBidStyle(task,bid)}>
																	{bid.provider_id.toString() != this.props.user.id? 
																	<a>
																	{'KD ' + bid.amount + ' : ' + bid.agent_name}
																	</a>:
																	<a>
																	{'KD ' + bid.amount + ' : ME' }
																	</a>}
																</div>
															</div> 
															)
														})}
									        </div>:null}
									      </CardContent>

									    </Card>
								)
							})}
					</div>
					: null}
				<Dialog
					open={this.state.bid_dialog_open}
					onClose={(e) => this.setState({ bid_dialog_open: false })}
				>
					<DialogTitle>Make Bid</DialogTitle>
					<DialogContent>
						<DialogContentText>
							{
								this.state.selected_task &&
									this.state.selected_task.answers &&
									this.state.selected_task.answers['Description'] ?
									this.state.selected_task.answers['Description'] : null
							}
						</DialogContentText>
						<TextField
							autoFocus
							margin="dense"
							id="bid-amount"
							label="Bid amount"
							value={this.state.bid_amount}
							type="text"
							onChange={(e) => this.setState({ bid_amount: e.currentTarget.value })}
							fullWidth
						/>
						<TextField
							placeholder="Message to Customer"
          					multiline
							margin="dense"
							id="bid-comment"
							// label="Message"
							value={this.state.bid_comment}
							// type="text"
							onChange={(e) => this.setState({ bid_comment: e.currentTarget.value })}
							fullWidth
						/>
					</DialogContent>
					<DialogActions>
						<Button onClick={(e) => this.setState({ bid_dialog_open: false })}  >Cancel</Button>
						<Button onClick={(e) => { this.props.makeBid(this.state.selected_task.id, this.state.bid_amount, this.state.bid_comment); this.setState({ bid_dialog_open: false, bid_amount: '' }) }}  >Bid</Button>
					</DialogActions>
				</Dialog>

			</div>
		);
	}
}

export default withStyles(styles, { withTheme: true })(PostSidebarProvider);