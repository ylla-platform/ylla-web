// Import React
import React, { Component } from 'react';

// Material UI
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
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

// Icons
import CreateIcon from '@material-ui/icons/Create';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FilterListIcon from '@material-ui/icons/FilterList';
import SearchIcon from '@material-ui/icons/Search';
import SortIcon from '@material-ui/icons/Sort';

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
	flex: {
		flex: 1,
	},
	tab: {
		minWidth: 30
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
	}
});

// CLass: PostSidebarProvider
class PostSidebarProvider extends Component {

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
			task_filter_menu: false,
			task_filter_menu_anchor: null,
			task_filter: 'My Interests',
			selected_task: {},
			bid_dialog_open: false,
			bid_amount: '',
			tag_filter: ''
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
					onClose={() => this.setState({ task_sort_menu: false })}
				>
					<MenuItem onClick={this.handleSortMenu.bind(this, 'customer_name')}>Customer name</MenuItem>
					<MenuItem onClick={this.handleSortMenu.bind(this, 'price')}>Price</MenuItem>
					<MenuItem onClick={this.handleSortMenu.bind(this, 'neighbourhood')}>Neighbourhood</MenuItem>
				</Menu>
				<Menu // Menu used to filter tasks
					id="menu-taskfilter"
					anchorEl={this.state.task_filter_menu_anchor}
					open={this.state.task_filter_menu}
					onClose={() => this.setState({ task_filter_menu: false, task_filter_menu_anchor: null })}
				>
					<MenuItem onClick={(e) => this.setState({ task_filter: 'All', task_filter_menu: false })}>All</MenuItem>
					<MenuItem onClick={(e) => this.setState({ task_filter: 'My Interests', task_filter_menu: false })}>My interests</MenuItem>
				</Menu>
				<Menu // Menu used for actions
					id="menu-taskactions"
					anchorEl={this.state.task_actions_menu_anchor}
					open={this.state.task_actions_menu}
					onClose={() => this.setState({ task_actions_menu: false })}
				>
					<MenuItem onClick={this.handleTaskActionsMenu.bind(this, 'task_details')}>View details</MenuItem>
					<MenuItem onClick={this.handleTaskActionsMenu.bind(this, 'chat_consumer')}>Chat with customer</MenuItem>
					<MenuItem onClick={this.handleTaskActionsMenu.bind(this, 'phone_customer')}>Phone customer</MenuItem>
					<MenuItem onClick={this.handleTaskActionsMenu.bind(this, 'map')}>View on Map</MenuItem>
					<MenuItem onClick={this.handleTaskActionsMenu.bind(this, 'navigate')}>Navigate to task</MenuItem>
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
						<Button   className={classes.button} onClick={(e) => this.setState({ task_sort_menu: true, task_sort_menu_anchor: e.currentTarget })}>
							<SortIcon className={classes.leftIcon} />Sort
						</Button>
						<Button   className={classes.button} onClick={(e) => this.setState({ task_filter_menu: true, task_filter_menu_anchor: e.currentTarget })}>
							<FilterListIcon className={classes.leftIcon} />{this.state.task_filter}
						</Button>
						{this.state.tasks
							.sort((a, b) => {
								if (this.state.task_sort === 'due_date') return (a.date < b.date);
								if (this.state.task_sort === 'customer_name') return ((a.customer.first_name || '') < (b.customer.first_name || ''));
								if (this.state.task_sort === 'neighbourhood') return (a.address < b.address);
								if (this.state.task_sort === 'price') return (a.price < b.price);
								return false;
							})
							.filter(task => {
								if (this.state.task_filter === 'All') return true;
								if (this.props.user.categories.indexOf(task.category) !== -1) return true;
								return false;
							})
							.filter(task => {
								if (this.state.tag_filter !== '' && task.tags.indexOf(this.state.tag_filter) === -1) return false;
								return true;
							})
							.map(task => {
								let bids = taskActions.convertBidsToDisplayFormat(task, this.props.providers);
								return (
									<Card className={classes.cardRoot} key={task.id} elevation={0}>
										<CardHeader
											onClick={() => this.props.viewTask([task.id])}
											avatar={
												<div>
													<Avatar className={classes.avatar}>DR</Avatar>
												</div>
											}
											action={
												<div>
													<Tooltip id="tooltip-icon" title="Make bid" placement="bottom">
														<IconButton aria-label="Make bid" onClick={(e) => { this.setState({ bid_dialog_open: true, selected_task: task }); e.stopPropagation(); }}>
															<CreateIcon />
														</IconButton>
													</Tooltip>
													<Tooltip id="tooltip-icon" title="More options" placement="bottom">
														<IconButton aria-label="More options" onClick={(e) => { this.setState({ task_actions_menu: true, task_actions_menu_anchor: e.currentTarget, selected_task: task }); e.stopPropagation(); }}>
															<MoreVertIcon />
														</IconButton>
													</Tooltip>
												</div>
											}
											title={(task.answers && task.answers['Title'] ? task.answers['Title'] : 'No title') + '. ' + (task.price ? ('KD ' + task.price) : 'No price')}
											subheader={(task.start_date_time ? moment(task.start_date_time).format('DD/MM/YYYY') + ' ' : '')}
										/>
										<CardContent>
											{task.tags && task.tags.map((tag, i) => {
												return (
													<Button
														size="small"
														variant="flat"
														 >
														<SearchIcon /> {tag}
													</Button>
												);
											})}
											<br />
											{bids.map(bid => {
												return <Button
													size="small"
													variant="flat"
													 >
													{'KD' + bid.amount + ': ' + bid.provider_name}
												</Button>
											})}
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
					</DialogContent>
					<DialogActions>
						<Button onClick={(e) => this.setState({ bid_dialog_open: false })}  >Cancel</Button>
						<Button onClick={(e) => { this.props.makeBid(this.state.selected_task.id, this.state.bid_amount); this.setState({ bid_dialog_open: false, bid_amount: '' }) }}  >Bid</Button>
					</DialogActions>
				</Dialog>

			</div>
		);
	}
}

export default withStyles(styles, { withTheme: true })(PostSidebarProvider);