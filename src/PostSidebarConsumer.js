// Import React
import React, { Component } from 'react';

// Material UI
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
// Icons
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SortIcon from '@material-ui/icons/Sort';

// Task actions
import * as taskActions from './actions/tasks';

// Moment for date and time formatting
import moment from 'moment';

// styles
const styles = theme => ({
	root: {
		zIndex: 100
	},
	appBar: {
		textAlign: 'center',
		borderBottom: '1px solid #B3B3B3',
		backgroundColor: '#F9F9F9',
		padding: 10,
		top: 62
	},
	avatar: {
		backgroundColor: theme.palette.ylla_business.main
	},
	flex: {
		display: 'inline-flex'
	},
	tab: {
		minWidth: 30
	},
	padding: {
		padding: `0 ${theme.spacing.unit * 2}px`,
	},
	leftIcon: {
		marginRight: theme.spacing.unit,
	},
	cardRoot: {
		backgroundColor: 'rgba(245, 245, 237, 1)'
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
	},	
	flex1: {
	    display: "inline-flex",
	    width: "100%"
	},
  	bigAvatar: {
	    width: 40,
	    height: 40
  	},
  	leftm: {
	    marginLeft: 15,
	    width: '160px'
  	},
  	cardtitle:{
  		fontSize: '16px',
  		fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  		textTransform: 'capitalize'
  	},
  	topm: {
	marginTop: 5,
	display: "inline-flex",
    textTransform: 'uppercase',
    fontSize: 'smaller',
    fontWeight: 'bold'

  	},
  topm1: {
    marginTop: 5,
    marginRight: 10
  },
  bids: {
    // marginTop: 5,
    display: "inline-flex",
    flexWrap: "wrap"
  },
  leftma: {
    marginLeft: 15
  },
  moreoptions: {
    marginLeft: 0,
    padding: '0px'
  },
  
  type1: {
  	fontSize: 'smaller',
    width: "100px",
    height: "25px",
    borderTopRightRadius: "18px",
    borderBottomRightRadius: "18px",
    borderTopLeftRadius: "18px",
    borderBottomLeftRadius: "18px",
    backgroundColor: "#7F4095",
    color: "white",
    textAlign: "center",
    verticalAlign: "middle",
    fontWeight: "bold",
    display: "table-cell",
    marginTop: "10px",
    marginLeft: "10px",
    textTransform: 'capitalize'
  },
  type2: {
	  	fontSize: 'smaller',
	    width: "100px",
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
	    textTransform: 'capitalize'

  }, type3: {
	  	fontSize: 'smaller',
	    width: "100px",
	    height: "25px",
	    borderTopRightRadius: "18px",
	    borderBottomRightRadius: "18px",
	    borderTopLeftRadius: "18px",
	    borderBottomLeftRadius: "18px",
	    backgroundColor: "#F2994A",
	    color: "white",
	    textAlign: "center",
	    verticalAlign: "middle",
	    fontWeight: "bold",
	    display: "table-cell",
	    marginTop: "10px",
	    marginLeft: "10px",
	    textTransform: 'capitalize'
  },
  approved: {
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
    width: "160px",
   	height:'28px',
    marginLeft: "75px",
    marginTop: "10px"
  },
  makeanoffer: {
    color: "white",
    borderColor: "#7F4095",
    backgroundColor: "#7F4095",
    "&:hover": {
      backgroundColor: "#7F4095"
    },
    "&:disabled": {
      color: "white"
    },
    borderTopRightRadius: "18px",
    borderBottomRightRadius: "18px",
    borderTopLeftRadius: "18px",
    borderBottomLeftRadius: "18px",
    width: "160px",
   	height:'28px',
    marginLeft: "75px",
    marginTop: "10px"
  }, card: {
    minWidth: 200,
    width: 350,
    backgroundColor: "#F9F9F9",
    marginTop: 5,
    display: 'flex'
  }, 
  location: { 
    marginTop: "25px",
    marginLeft:"40px",
    cursor: 'pointer'
  },
  pinkline: {
    borderLeft: '5px solid #7F4095'
  },
  grayline: {
    borderLeft: '5px solid #60707C'
  }
});

// CLass: PostSidebarConsumer
class PostSidebarConsumer extends Component {

	// constructor: 
	constructor(props) {
		super(props);
		this.state = {
			tasks: taskActions.convertTasksToDisplayFormat(this.props.tasks, [], [], [], this.props.consumers),
			tab_index: 0,
			task_sort_menu: false,
			task_sort_menu_anchor: null,
			task_sort: 'due_date',
			task_actions_menu: false,
			task_actions_menu_anchor: null,
			task_provider_menu: false,
			task_provider_menu_anchor: null,
			selected_task: {},
			selected_runner_id: '',
			selected_runner_name: ''
		};
	}

	// componentWillReceiveProps: set the tasks from the parent state
	componentWillReceiveProps = (nextProps) => {
		this.setState({
			tasks: taskActions.convertTasksToDisplayFormat(nextProps.tasks, [], [], [], nextProps.consumers)
		});
	}

	// handleSortMenu: 
	handleSortMenu = (sort, event) => {
		this.setState({ task_sort_menu: false, task_sort: sort })
	}

	// handleTaskActionsMenu
	handleTaskActionsMenu = (action, event) => {
		this.setState({ task_actions_menu: false })
		if (action === 'task_details') this.props.viewTask([this.state.selected_task.id]);
		if (action === 'navigate') this.props.navigate(this.state.selected_task.location);
	}

	openTaskMenu = (e,task,bid) => {
		if(this.props.user && this.props.user.id && task.user_id == this.props.user.id ) {
			this.setState({ task_provider_menu: true, task_provider_menu_anchor: e.currentTarget, selected_task: task, selected_runner_name: bid.agent_name, selected_runner_id: bid.provider_id, selected_provider_price: bid.amount })
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
					<MenuItem onClick={this.handleSortMenu.bind(this, 'neighbourhood')}>Neighbourhood</MenuItem>
				</Menu>
				<Menu // Menu used for actions
					id="menu-taskactions"
					anchorEl={this.state.task_actions_menu_anchor}
					open={this.state.task_actions_menu}
					onClose={() => this.setState({ task_actions_menu: false })}
				>
					<MenuItem onClick={this.handleTaskActionsMenu.bind(this, 'task_details')}>View details</MenuItem>
					<MenuItem onClick={this.handleTaskActionsMenu.bind(this, 'navigate')}>Navigate</MenuItem>
				</Menu>
				<Menu // Menu used for actions
					id="menu-taskproviders"
					anchorEl={this.state.task_provider_menu_anchor}
					open={this.state.task_provider_menu}
					onClose={(e) => this.setState({ task_provider_menu: false, task_provider_menu_anchor: null })}
				>
					<MenuItem onClick={() => { this.props.viewProvider(this.state.selected_runner_id.toString()); this.setState({ task_provider_menu: false, task_provider_menu_anchor: null }); }}>View {this.state.selected_runner_name}</MenuItem>
					<MenuItem onClick={(e) => { this.props.chat({ name: this.state.selected_runner_name, id: this.state.selected_runner_id }, e); this.setState({ task_provider_menu: false, task_provider_menu_anchor: null }); }}>Chat with {this.state.selected_runner_name}</MenuItem>
					<MenuItem onClick={() => { this.props.chooseTaskProvider(this.state.selected_task.id, this.state.selected_runner_id, this.state.selected_provider_price); this.setState({ task_provider_menu: false, task_provider_menu_anchor: null }); }}>Accept bid from {this.state.selected_runner_name}</MenuItem>
				</Menu>
				<AppBar position="sticky" elevation={0} className={classes.appBar}>
					<Toolbar disableGutters={true}>
						<Typography variant="title" className={classes.title} color="inherit">Posts</Typography>
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
				
				{this.state.tasks ?
					<div>
						<Button fullWidth className={classes.button} onClick={(e) => this.setState({ task_sort_menu: true, task_sort_menu_anchor: e.currentTarget })}>
							<SortIcon className={classes.leftIcon} />Sort
						</Button>
						{this.state.tasks
							.filter(task => {
								if (task.status !== 'Cancelled') return true;
								return false;
							})
							.sort((a, b) => {
								if (this.state.task_sort === 'due_date' && a.date_created > b.date_created ) return -1 ;
								if (this.state.task_sort === 'neighbourhood') return (a.address.localeCompare(b.address));
								return false;
							})
							.map(task => {
								let bids = taskActions.convertBidsToDisplayFormat(task, this.props.agents);
								return (


									<Card key={task.id} className={classes.card}>
									 { task.agent_id && task.agent_id !== 0 ?  <div className={classes.grayline}></div>:<div className={classes.pinkline}></div> } 
									      <CardContent >
									        <div className={classes.flex}>
									          <Avatar className={classes.bigAvatar} 
									          >DR</Avatar>
									          <div className={classes.leftm}>
									            <a className={classes.cardtitle} onClick={() => this.props.viewTask([task.id])} >{task.answers && task.answers['Title'] ? task.answers['Title']: 'Posted By '+task.username}</a>
									            {task.provider && task.provider.name ?  <a className={classes.cardtitle} >{'Provider : '+task.provider.name}</a>: ''}
									            <Typography variant="h8" color="textSecondary">
									              { task.start_date_time ? moment(task.start_date_time).format('ddd, DD MMM'): ''}
									            </Typography>
									            <Typography variant="h8" color="textSecondary" gutterBottom>
									              { task.neighbourhood ? task.neighbourhood : 'No Location Specified' } 
									            </Typography>
									          </div>
									          <div className={classes.leftma}>
									           	{!task.provider_id ||  task.provider_id == 0 ? 
									            <div className={classes.type1}>RUNNER</div> : <div className={classes.type3}>PROVIDER</div>}
									            <div className={classes.topm}>
									              <Typography variant="h6">{task.price ? ('KD ' + task.price) : '?'}</Typography>
									            </div>
									          </div>
									        </div>
									        <Divider />
									        {!task.provider_id ||  task.provider_id == 0 ?
									        <div className={classes.flex}>
									          {task.agent_id && task.agent_id !== null && task.agent_id !== 0 ? 
									          	<Button  className={classes.approved}>Assigned</Button>
									          	:  <Button disabled={true}  className={classes.makeanoffer}>Make an Offer</Button>
									          }
									          
									           <label className={classes.location} >
									            <svg width="14" height="20" viewBox="0 0 14 20" fill="none" xmlns="http://www.w3.org/2000/svg">
									              <path d="M13 6C13 2.69 10.31 0 7 0C3.69 0 1 2.69 1 6C1 10.5 7 17 7 17C7 17 13 10.5 13 6ZM5 6C5 4.9 5.9 4 7 4C8.1 4 9 4.9 9 6C9 7.1 8.11 8 7 8C5.9 8 5 7.1 5 6ZM0 18V20H14V18H0Z" fill="#60707C" />
									            </svg>
									          </label>

									        </div>:''}

									       {!task.provider_id ||  task.provider_id == 0 ?  <div className={classes.topm}>{task.status+' : '+bids.length+' Offers'}</div> :null }
									       {!task.provider_id ||  task.provider_id == 0 ?  <br /> :null }
									       {!task.provider_id ||  task.provider_id == 0 ? 
									        <div className={classes.bids}>
									        		{bids.map(bid => {
														return (
															<div className={classes.topm1}>
																{ task.agent_id && task.agent_id == bid.provider_id.toString() ? 
																<div className={classes.type2}>{'KD ' + bid.amount + ': ' + bid.agent_name}</div> : 
																<div 
																onClick={(e) => this.openTaskMenu(e,task,bid)}
																className={classes.type1}>
																{'KD ' + bid.amount + ': ' + bid.agent_name}
																</div>
																}
															</div> )
														})}
									        </div>:null}
									      </CardContent>

									    </Card>
								)
							})}
					</div>
					: null}
			</div>
		);
	}
}

export default withStyles(styles, { withTheme: true })(PostSidebarConsumer);
