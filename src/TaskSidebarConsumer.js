// Import React
import React, { Component } from 'react';

// Material UI
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
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
import LocationOnIcon from '@material-ui/icons/LocationOn';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SortIcon from '@material-ui/icons/Sort';
import CardActions from '@material-ui/core/Card';

// Moment for date and time formatting
import moment from 'moment';

import * as taskActions from './actions/tasks';

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
	cardRoot: {
		backgroundColor: theme.palette.sidebar_background.main
	},
	avatar1: {
		backgroundColor: theme.palette.ylla_business.main
	},
	avatar2: {
		backgroundColor: theme.palette.ylla_freelancer.main
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

// CLass: TaskSidebarConsumer
class TaskSidebarConsumer extends Component {

	// constructor: 
	constructor(props) {
		super(props);
		this.state = {
			tasks: taskActions.convertTasksToDisplayFormat(this.props.tasks, this.props.agents, this.props.providers, this.props.services, this.props.consumers),
			tab_index: 0,
			task_sort_menu: false,
			task_sort_menu_anchor: null,
			task_sort: 'due_date',
			task_actions_menu: false,
			task_actions_menu_anchor: null,
			selected_task: {}
		};
	}
	// componentWillReceiveProps: set the tasks from the parent state
	componentWillReceiveProps = (nextProps) => {
		this.setState({
			tasks: taskActions.convertTasksToDisplayFormat(nextProps.tasks, nextProps.agents, nextProps.providers, nextProps.services, nextProps.consumers),
			agent_filter: (nextProps.agent_filter || '')
		});
	}
	// handleClose: 
	handleClose = () => {
		this.props.close();
	}
	// handleGoToTaskList: 
	handleGoToTaskList = () => {
		this.props.goToTaskList();
	}
	// handleChangeTab: 
	handleChangeTab = (event, value) => {
		this.setState({ tab_index: value });
	};
	// handleCloseSortMenu: 
	handleCloseSortMenu = () => {
		this.setState({ task_sort_menu: false })
	}
	// handleSortMenu: 
	handleSortMenu = (sort, event) => {
		this.setState({ task_sort_menu: false, task_sort: sort })
	}
	//
	handleCloseTaskActionsMenu = () => {
		this.setState({ task_actions_menu: false })
	}
	//
	handleTaskActionsMenu = (action, event) => {
		this.setState({ task_actions_menu: false })
		if (action === 'chat_agent') {
			let chat = {
				name: (this.state.selected_task.agent ? (this.state.selected_task.agent.first_name + ' ' + this.state.selected_task.agent.last_name) : ''),
				id: this.state.selected_task.agent ? this.state.selected_task.agent.id : null
			}
			this.props.chat(chat, event);
		}
		if (action === 'chat_consumer') {
			let chat = {
				name: 'Customer name',
				id: this.state.selected_task.user_id
			}
			this.props.chat(chat, event);
		}
		if (action === 'task_details') this.props.viewTask([this.state.selected_task.id]);
		if (action === 'navigate') this.props.navigate(this.state.selected_task.location);
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
					onClose={this.handleCloseSortMenu}
				>
					<MenuItem onClick={this.handleSortMenu.bind(this, 'due_date')}>Due date</MenuItem>
					<MenuItem onClick={this.handleSortMenu.bind(this, 'provider_name')}>Provider name</MenuItem>
				</Menu>
				<Menu // Menu used for actions on the agent list items
					id="menu-taskactions"
					anchorEl={this.state.task_actions_menu_anchor}
					open={this.state.task_actions_menu}
					onClose={this.handleCloseTaskActionsMenu}
				>
					<MenuItem onClick={this.handleTaskActionsMenu.bind(this, 'task_details')}>View details</MenuItem>
					<MenuItem onClick={this.handleTaskActionsMenu.bind(this, 'chat_provider')}>Chat with provider</MenuItem>
					{this.state.selected_task && this.state.selected_task.agent ? <MenuItem onClick={this.handleTaskActionsMenu.bind(this, 'chat_agent')}>Chat with agent</MenuItem> : null}
					<MenuItem onClick={this.handleTaskActionsMenu.bind(this, 'phone_provider')}>Phone provider</MenuItem>
					{this.state.selected_task && this.state.selected_task.agent ? <MenuItem onClick={this.handleTaskActionsMenu.bind(this, 'phone_agent')}>Phone agent</MenuItem> : null}
					<MenuItem onClick={this.handleTaskActionsMenu.bind(this, 'navigate')}>Navigate to task</MenuItem>
				</Menu>
				<AppBar position="sticky" elevation={0} className={classes.appBar}>
					<Toolbar disableGutters={true}>
						<Typography variant="title" className={classes.title} color="inherit">My Orders</Typography>
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
				<Tabs
					value={this.state.tab_index}
					onChange={this.handleChangeTab}
					indicatorColor="primary"
					textColor="primary"
					fullWidth
				>
					<Tab
						label={<Badge className={classes.padding} badgeContent={
							this.state.tasks
								.filter(task => {
									if (!task.date_completed) return true;
									return false;
								}).length
						}>Current</Badge>}
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
						}>History</Badge>}
						classes={{
							root: classes.tab
						}}
					/>
				</Tabs>
				{this.state.tasks ?
					<div>
						<Button className={classes.button} onClick={(e) => this.setState({ task_sort_menu: true, task_sort_menu_anchor: e.currentTarget })}>
							<SortIcon className={classes.leftIcon} />Sort
						</Button>
						{this.state.tasks
							.filter(task => {
								if (this.state.tab_index === 0 && !task.date_completed) return true;
								if (this.state.tab_index === 1 && task.date_completed) return true;
								return false;
							})
							.sort((a, b) => {
								if (this.state.task_sort === 'due_date') return (a.date < b.date);
								if (this.state.task_sort === 'provider_name') return ((a.provider_name || '') - (b.provider_name || ''));
								return false;
							})
							.map(task => {
								return (
									<Card className={classes.cardRoot} key={task.id} elevation={0}>
										<CardHeader
											onClick={() => this.props.viewTask([task.id])}
											avatar={
												<div>
													<Avatar
														className={
															RegExp("^([a-hA-H])").test(task.provider_name.substring(0, 1)) ? classes.avatar1 : classes.avatar2
														}>
														{task.provider_name ? task.provider_name.substring(0, 2) : '?'}</Avatar>
												</div>
											}
											action={
												<div>
													<Button size="small" onClick={(e) => { this.props.editTaskStatus(e, [task.id]); e.stopPropagation(); }}>{task.status}</Button>
													<br />
													<Tooltip id="tooltip-icon" title="View on map" placement="bottom">
														<IconButton aria-label="View on map" onClick={(e) => { this.props.goto(task.location); e.stopPropagation(); }}>
															<LocationOnIcon />
														</IconButton>
													</Tooltip>
													<Tooltip id="tooltip-icon" title="More options" placement="bottom">
														<IconButton aria-label="More options" onClick={(e) => { this.setState({ task_actions_menu: true, task_actions_menu_anchor: e.currentTarget, selected_task: task }); e.stopPropagation(); }}>
															<MoreVertIcon />
														</IconButton>
													</Tooltip>
												</div>
											}
											title={(task.start_date_time ? moment(task.start_date_time).format('DD/MM/YYYY HH:mm') + ' ' : '') + (task.provider && task.provider.name ? (task.provider.name) : '')}
											subheader={task.neighbourhood ? task.neighbourhood : task.address}
										/>
										{task.status === 'Make payment' ?
											<CardActions className={classes.actions} disableActionSpacing>
												<Button dense  >Make payment</Button>
											</CardActions>
											: null}
									</Card>
								)
							})}
					</div>
					: null}
			</div>
		);
	}
}

export default withStyles(styles, { withTheme: true })(TaskSidebarConsumer);