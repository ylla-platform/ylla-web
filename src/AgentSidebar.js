// Import React
import React, { Component } from 'react';

// Material UI
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

// Icons
import AddIcon from '@material-ui/icons/Add';
import ListIcon from '@material-ui/icons/List';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SortIcon from '@material-ui/icons/Sort';

// Moment for date and time formatting
import moment from 'moment';

// Agent actions
import * as agentActions from './actions/agents';

// styles
const styles = theme => ({
	root: {
		zIndex: 100,
		overflowY: 'none'
	},
	appBar: {
		textAlign: 'center',
		borderBottom: '1px solid #B3B3B3',
		backgroundColor: '#F9F9F9',
		padding: '10px',
		top: 62
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
		backgroundColor: '#F9F9F9'
	}
});

// Class: AgentSidebar
class AgentSidebar extends Component {
	// constructor: sets the state
	constructor(props) {
		super(props);
		this.state = {
			agents: agentActions.setAgentsFromAgentsTasksAndProviders(this.props.agents, this.props.providers, this.props.tasks, this.props.services),
			tab_index: 0,
			agent_actions_menu: false,
			agent_actions_menu_anchor: null,
			selected_agent: {}
		};
	}

	// componentWillReceiveProps: sets the agent list when this is updated from the parent state
	componentWillReceiveProps = (nextProps) => {
		var agents = agentActions.setAgentsFromAgentsTasksAndProviders(nextProps.agents, nextProps.providers, nextProps.tasks, this.props.services);
		this.setState({ agents: agents });
	}

	//
	handleAgentActionsMenu = (action, event) => {
		this.setState({ agent_actions_menu: false })
		if (action === 'chat') this.props.chat({ name: this.state.selected_agent.first_name + ' ' + this.state.selected_agent.last_name, id: this.state.selected_agent.id }, event);
		if (action === 'navigate') this.props.navigate(event, this.state.selected_agent.location);
		if (action === 'profile') this.props.profile(this.state.selected_agent);
	}

	// handleSortMenu: 
	handleSortMenu = (sort, e) => {
		this.setState({ agent_sort_menu: false, agent_sort: sort })
	}

	// render
	render() {
		const { classes } = this.props;
		return (
			<div className={classes.root}>
				<Menu // Menu used to sort agents
					id="menu-agentsort"
					anchorEl={this.state.agent_sort_menu_anchor}
					open={this.state.agent_sort_menu}
					onClose={() => this.setState({ agent_sort_menu: false })}
				>
					<MenuItem onClick={this.handleSortMenu.bind(this, 'agent_name')}>Agent name</MenuItem>
					<MenuItem onClick={this.handleSortMenu.bind(this, 'number_of_tasks')}>Number of tasks</MenuItem>
				</Menu>
				<Menu // Menu used for actions on the agent list items
					id="menu-agentactions"
					anchorEl={this.state.agent_actions_menu_anchor}
					open={this.state.agent_actions_menu}
					onClose={() => this.setState({ agent_actions_menu: false })}
				>
					<MenuItem onClick={this.handleAgentActionsMenu.bind(this, 'profile')}>Agent profile</MenuItem>
					<MenuItem onClick={this.handleAgentActionsMenu.bind(this, 'chat')}>Chat with agent</MenuItem>
					<MenuItem onClick={this.handleAgentActionsMenu.bind(this, 'phone')}>Phone agent</MenuItem>
					<MenuItem onClick={this.handleAgentActionsMenu.bind(this, 'navigate')}>Navigate to agent</MenuItem>
				</Menu>
				<AppBar position="sticky" elevation={0} className={classes.appBar}>
					<Toolbar disableGutters={true}>
						<Typography variant="title" color="inherit" className={classes.title}>Agents</Typography>
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
				{this.state.agents ?
					<div>
						<Tabs
							value={this.state.tab_index}
							onChange={(e, value) => this.setState({ tab_index: value })}
							indicatorColor="primary"
							textColor="primary"
							fullWidth
						>
							<Tab
								label={<Badge className={classes.padding}   badgeContent={
									this.state.agents
										.filter(agent => {
											return agentActions.getAgentAvailability(agent) === 'free';
										}).length
								}>Free</Badge>}
								classes={{
									root: classes.tab
								}}
							/>
							<Tab
								label={<Badge className={classes.padding}   badgeContent={
									this.state.agents
										.filter(agent => {
											return agentActions.getAgentAvailability(agent) === 'busy';
										}).length
								}>Busy</Badge>}
								classes={{
									root: classes.tab
								}}
							/>
							<Tab
								label={<Badge className={classes.padding}   badgeContent={
									this.state.agents
										.filter(agent => {
											return agentActions.getAgentAvailability(agent) === 'inactive';
										}).length
								}>Inactive</Badge>}
								classes={{
									root: classes.tab
								}}
							/>
						</Tabs>
						<Button   className={classes.button} onClick={(e) => this.setState({ agent_sort_menu: true, agent_sort_menu_anchor: e.currentTarget })}>
							<SortIcon className={classes.leftIcon} />Sort
						</Button>
						<Button   className={classes.button} onClick={this.props.addAgent}>
							<AddIcon className={classes.leftIcon} />Add agent
						</Button>
						{this.state.agents
							.filter(agent => {
								if (this.state.tab_index === 0 && agentActions.getAgentAvailability(agent) === 'free') return true;
								if (this.state.tab_index === 1 && agentActions.getAgentAvailability(agent) === 'busy') return true;
								if (this.state.tab_index === 2 && agentActions.getAgentAvailability(agent) === 'inactive') return true;
								return false;
							})
							.sort((a, b) => {
								if (this.state.agent_sort === 'dueagent_name_date') return (a.first_name - a.last_name);
								if (this.state.agent_sort === 'number_of_tasks') return (a.tasks.length - b.tasks.length);
								return false;
							})
							.map(agent => {
								return (
									<Card className={classes.cardRoot} key={agent.id} elevation={0}>
										<CardHeader
											avatar={
												<Avatar
													aria-label={agent.first_name + ' ' + agent.last_name}
													className={
														RegExp("^([a-hA-H])").test(agent.first_name.substring(0, 1)) ? classes.avatar1 : classes.avatar2
													}>
													{agent.first_name.substring(0, 1) + agent.last_name.substring(0, 1)}
												</Avatar>
											}
											action={
												<div>
													<Badge className={classes.margin} badgeContent={agent.tasks.length || 0}   onClick={() => this.props.setAgentFilter(agent.id)}>
														<IconButton aria-label="Tasks">
															<ListIcon />
														</IconButton>
													</Badge>
													<Tooltip id="tooltip-icon" title="View on map" placement="bottom">
														<IconButton aria-label="View on map" onClick={this.props.goto.bind(this, agent.location)}>
															<LocationOnIcon />
														</IconButton>
													</Tooltip>
													<Tooltip id="tooltip-icon" title="More options" placement="bottom">
														<IconButton aria-label="More options" onClick={(e) => this.setState({ agent_actions_menu: true, agent_actions_menu_anchor: e.currentTarget, selected_agent: agent })}>
															<MoreVertIcon />
														</IconButton>
													</Tooltip>
												</div>
											}
											title={agent ? (agent.first_name + ' ' + agent.last_name) : ''}
											subheader={(agent && agent.phone ? agent.phone + '. ' : '') + (agent.last_logged_in ? 'Seen ' + moment(agent.last_logged_in).fromNow() : null)}
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

export default withStyles(styles, { withTheme: true })(AgentSidebar);
