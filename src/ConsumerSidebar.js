// Import React
import React, { Component } from 'react';

// Material UI
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

// Icons
import LocationOnIcon from '@material-ui/icons/LocationOn';
import MessageIcon from '@material-ui/icons/Message';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SortIcon from '@material-ui/icons/Sort';

// styles
const styles = theme => ({
	root: {
		width: '100%',
		height: '100%',
		zIndex: 100
	},agents: {
    backgroundColor: 'white',
     "&:hover": {
        backgroundColor:"white"
    },
    color: 'black',
    borderColor: 'black',
    borderTopRightRadius: '0px',
    borderBottomRightRadius: '0px',
    borderTopLeftRadius: '0px',
    borderBottomLeftRadius: '0px',
    width: '150px'
  },
  cus: {
    backgroundColor: '#FF7F50',
     "&:hover": {
        backgroundColor:"#FF7F50"
    },
    color: 'white',
    borderColor: 'black',
    borderTopRightRadius: '0px',
    borderBottomRightRadius: '0px',
    borderTopLeftRadius: '0px',
    borderBottomLeftRadius: '0px',
    width: '150px'
  },
	appBar: {
		textAlign: 'center',
		borderBottom: '1px solid #B3B3B3',
		backgroundColor: '#F9F9F9',
		padding: 10,
		top: 62
	},
	flex: {
		flex: 1,
	},
	tab: {
		minWidth: 40
	},
	margin: {
		margin: theme.spacing.unit * 2,
	},
	padding: {
		padding: `0 ${theme.spacing.unit * 2}px`,
	},
	leftIcon: {
		marginRight: theme.spacing.unit,
	},
	avatar1: {
		backgroundColor: theme.palette.ylla_business.main
	},
	avatar2: {
		backgroundColor: theme.palette.ylla_freelancer.main
	},
	cardRoot: {
		backgroundColor: theme.palette.sidebar_background.main
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
	}
});

// Class: ConsumerSidebar
class ConsumerSidebar extends Component {

	// constructor: sets the state
	constructor(props) {
		super(props);
		this.state = {
			consumers: this.setConsumersFromConsumersAndTasks(this.props.consumers, this.props.tasks),
			tab_index: 0,
			consumer_actions_menu: false,
			consumer_actions_menu_anchor: null,
			broadcast_menu: false,
			broadcast_menu_anchor: null,
			selected_consumer: {}
		};
	}

	// componentWillReceiveProps:
	componentWillReceiveProps = (nextProps) => {
		var consumers = this.setConsumersFromConsumersAndTasks(nextProps.consumers, nextProps.tasks);
		this.setState({ consumers: consumers });
	}

	// setConsumersFromConsumersAndTasks: 
	setConsumersFromConsumersAndTasks = (consumers, tasks) => {
		if (consumers && tasks) {
			consumers.forEach(consumer => {
				consumer.tasks = [];
				if (tasks) {
					tasks.forEach(task => {
						if (task.user_id && task.user_id === consumer.id) consumer.tasks.push(task);
					});
				}
			});
			return consumers;
		} else {
			return [];
		}
	}

	//
	handleCloseConsumerActionsMenu = () => {
		this.setState({ consumer_actions_menu: false })
	}

	//
	handleConsumerActionsMenu = (action, event) => {
		this.setState({ consumer_actions_menu: false })
		if (action === 'chat') this.props.chat({ name: this.state.selected_consumer.first_name + ' ' + this.state.selected_consumer.last_name, id: this.state.selected_consumer.id }, event);
		if (action === 'navigate') this.props.navigate(event, (this.state.selected_consumer.location ? this.state.selected_consumer.location : []));
	}

	//
	handleCloseBroadcastMenu = () => {
		this.setState({ broadcast_menu: false });
	}

	//
	handleBroadcastMenu = (event) => {
		this.setState({ broadcast_menu: true, broadcast_menu_anchor: event.currentTarget });
	}

	//
	handleBroadcastMenuAction = (action, event) => {
		this.setState({ broadcast_menu: false })
		this.props.broadcast(action, this.props.consumers.map(consumer => { return consumer.id }));
	}

	// handleGoToConsumerList: 
	handleGoToConsumerList = () => this.props.goToConsumerList();

	// handleCloseSortMenu: 
	handleCloseSortMenu = () => this.setState({ consumer_sort_menu: false });

	// handleSortMenu: 
	handleSortMenu = (sort, event) => this.setState({ consumer_sort_menu: false, consumer_sort: sort });

	// render
	render() {
		const { classes } = this.props;
		return (
			<div className={classes.root}>
				<Menu // Menu used to sort consumers
					id="menu-consumersort"
					anchorEl={this.state.consumer_sort_menu_anchor}
					open={this.state.consumer_sort_menu}
					onClose={this.handleCloseSortMenu}
				>
					<MenuItem onClick={this.handleSortMenu.bind(this, 'consumer_name')}>Customer name</MenuItem>
					<MenuItem onClick={this.handleSortMenu.bind(this, 'number_of_tasks')}>Number of orders</MenuItem>
				</Menu>
				<Menu // Menu used to provide actions against the consumer
					id="menu-consumeractions"
					anchorEl={this.state.consumer_actions_menu_anchor}
					open={this.state.consumer_actions_menu}
					onClose={this.handleCloseConsumerActionsMenu}
				>
					<MenuItem onClick={this.handleConsumerActionsMenu.bind(this, 'chat')}>Chat with customer</MenuItem>
					<MenuItem onClick={this.handleConsumerActionsMenu.bind(this, 'phone')}>Phone customer</MenuItem>
					<MenuItem onClick={this.handleConsumerActionsMenu.bind(this, 'navigate')}>Navigate to customer</MenuItem>
				</Menu>
				<Menu // Menu used to chat with all customers
					id="menu-broadcast"
					anchorEl={this.state.broadcast_menu_anchor}
					open={this.state.broadcast_menu}
					onClose={this.handleCloseBroadcastMenu}
				>
					<MenuItem onClick={this.handleBroadcastMenuAction.bind(this, 'message')}>Message all</MenuItem>
					<MenuItem onClick={this.handleBroadcastMenuAction.bind(this, 'group')}>Group chat</MenuItem>
				</Menu>
				<AppBar position="sticky" elevation={0} className={classes.appBar}>
					<Toolbar disableGutters={true}>
						<Button onClick={() => this.props.openagents()}  variant="outlined" className={classes.agents} >
			          Agents
					 </Button>
			        <Button variant="outlined" className={classes.cus} >
			          Customers
					</Button>
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
				{this.state.consumers ?
					<div>
						<Button   className={classes.button} onClick={(e) => this.setState({ consumer_sort_menu: true, consumer_sort_menu_anchor: e.currentTarget })}>
							<SortIcon className={classes.leftIcon} />Sort
						</Button>
						<Button   className={classes.button} onClick={this.handleBroadcastMenu}>
							<MessageIcon className={classes.leftIcon} />Broadcast
						</Button>
						{this.state.consumers
							.sort((a, b) => {
								if (this.state.consumer_sort === 'consumer_name') return (a.first_name < b.first_name);
								if (this.state.consumer_sort === 'number_of_tasks') return (a.tasks.length - b.tasks.length);
								return false;
							})
							.map(consumer => {
								return (
									<Card className={classes.cardRoot} key={consumer.id} elevation={0}>
										<CardHeader
											avatar={
												<Avatar
													aria-label={consumer.first_name + ' ' + consumer.last_name}
													className={
														RegExp("^([a-hA-H])").test(consumer.first_name.substring(0, 1)) ? classes.avatar1 : classes.avatar2
													}>
													{consumer.first_name.substring(0, 1) + consumer.last_name.substring(0, 1)}
												</Avatar>
											}
											action={
												<div>
													{consumer.location ?
														<Tooltip id="tooltip-icon" title="View on map" placement="bottom">
															<IconButton aria-label="View on map" onClick={this.props.goto.bind(this, consumer.location)}>
																<LocationOnIcon />
															</IconButton>
														</Tooltip> : null}
													<Tooltip id="tooltip-icon" title="More options" placement="bottom">
														<IconButton aria-label="More options" onClick={(e) => this.setState({ consumer_actions_menu: true, consumer_actions_menu_anchor: e.currentTarget, selected_consumer: consumer })}>
															<MoreVertIcon />
														</IconButton>
													</Tooltip>
												</div>
											}
											title={consumer ? (consumer.first_name + ' ' + consumer.last_name) : ''}
											subheader={consumer && consumer.phone ? consumer.phone : ''}
										/>
										<CardActions className={classes.actions} disableActionSpacing>
										</CardActions>
									</Card>
								)
							})}
					</div>
					: null}
			</div>
		);
	}
}

export default withStyles(styles, { withTheme: true })(ConsumerSidebar);