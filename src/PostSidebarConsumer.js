// Import React
import React, { Component } from 'react';

// Material UI
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
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
		flex: 1,
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
			selected_provider_id: '',
			selected_provider_name: ''
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
					<MenuItem onClick={() => { this.props.viewProvider(this.state.selected_provider_id.toString()); this.setState({ task_provider_menu: false, task_provider_menu_anchor: null }); }}>View {this.state.selected_provider_name}</MenuItem>
					<MenuItem onClick={(e) => { this.props.chat({ name: this.state.selected_provider_name, id: this.state.selected_provider_id }, e); this.setState({ task_provider_menu: false, task_provider_menu_anchor: null }); }}>Chat with {this.state.selected_provider_name}</MenuItem>
					<MenuItem onClick={() => { this.props.chooseTaskProvider(this.state.selected_task.id, this.state.selected_provider_id, this.state.selected_provider_price); this.setState({ task_provider_menu: false, task_provider_menu_anchor: null }); }}>Accept bid from {this.state.selected_provider_name}</MenuItem>
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
				<Tabs
					value={this.state.tab_index}
					onChange={(e, value) => this.setState({ tab_index: value })}
					indicatorColor="primary"
					textColor="primary"
					fullWidth
				>
					<Tab
						label={<Badge className={classes.padding} badgeContent={
							this.state.tasks
								.filter(task => {
									if (task.status && task.status !== 'Cancelled' && this.props.user.id === task.consumer_id) return true;
									return false;
								}).length
						}>Mine</Badge>}
						classes={{
							root: classes.tab
						}}
					/>
					<Tab
						label={<Badge className={classes.padding} badgeContent={
							this.state.tasks
								.filter(task => {
									if (task.status && task.status === 'Cancelled' && task.consumer_id === this.props.user.id) return true;
									return false;
								}).length
						}>Cancelled</Badge>}
						classes={{
							root: classes.tab
						}}
					/>
					<Tab
						label={<Badge className={classes.padding} badgeContent={
							this.state.tasks
								.filter(task => {
									if (task.consumer_id !== this.props.user.id) return true;
									return false;
								}).length
						}>Others</Badge>}
						classes={{
							root: classes.tab
						}}
					/>
				</Tabs>
				{this.state.tasks ?
					<div>
						<Button fullWidth className={classes.button} onClick={(e) => this.setState({ task_sort_menu: true, task_sort_menu_anchor: e.currentTarget })}>
							<SortIcon className={classes.leftIcon} />Sort
						</Button>
						{this.state.tasks
							.filter(task => {
								if (this.state.tab_index === 0 && task.status !== 'Cancelled' && task.consumer_id === this.props.user.id) return true;
								if (this.state.tab_index === 1 && task.status === 'Cancelled' && task.consumer_id === this.props.user.id) return true;
								if (this.state.tab_index === 2 && task.status !== 'Cancelled' && task.consumer_id !== this.props.user.id) return true;
								return false;
							})
							.sort((a, b) => {
								if (this.state.task_sort === 'due_date') return (a.date < b.date);
								if (this.state.task_sort === 'neighbourhood') return (a.address.localeCompare(b.address));
								return false;
							})
							.map(task => {
								let bids = taskActions.convertBidsToDisplayFormat(task, this.props.providers);
								return (
									<Card className={classes.cardRoot} key={task.id} elevation={0}>
										<CardHeader
											onClick={() => this.props.viewTask([task.id])}
											action={
												<div>
													<Typography variant="h6">{task.price ? 'KD' + task.price : ''}</Typography>
												</div>
											}
											title={(task.answers && task.answers['Title'] ? task.answers['Title'] : 'No title')}
											subheader={
												(
													(
														task.start_date_time ? moment(task.start_date_time).format('DD/MM/YYYY') + '\n' : ''
													) +
													(
														task.address ? '. ' + task.address : ''
													)
												)
											}
										/>
										<CardContent>
											<div>
												<Divider />
												{bids.map(bid => {
													return <Button
														size="small"
														variant="outlined"
														onClick={(e) => this.setState({ task_provider_menu: true, task_provider_menu_anchor: e.currentTarget, selected_task: task, selected_provider_name: bid.provider_name, selected_provider_id: bid.provider_id, selected_provider_price: bid.amount })}>
														{'KD' + bid.amount + ': ' + bid.provider_name}
													</Button>
												})}
											</div>
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
