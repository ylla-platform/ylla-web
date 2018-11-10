// Import React Stuff
import PropTypes from 'prop-types';
import React, { Component } from 'react';

// Material UI includes
import Avatar from '@material-ui/core/Avatar';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import IconButton from '@material-ui/core/IconButton';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

// Material Icons
import ChatIcon from '@material-ui/icons/Chat';
import EventIcon from '@material-ui/icons/Event';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import NavigationIcon from '@material-ui/icons/Navigation';
import PhoneIcon from '@material-ui/icons/Phone';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';

// Our componetnts
import ProviderPaymentTerms from './ProviderPaymentTerms';

import * as taskActions from './actions/tasks';

// Styles: 
const styles = theme => ({
	root: {
		width: '100%',
		maxWidth: 360,
		margin: 10
	},
	appBar: {
		backgroundColor: '#FFF6D8',
		padding: 10,
		top: 62
	},
	nested: {
		paddingLeft: theme.spacing.unit * 4,
	},
	chip: {
		margin: theme.spacing.unit,
		backgroundColor: theme.palette.ylla_yellow.main
	},
	tab: {
		minWidth: 40
	}
});

// Class: PostView: the sidebar task view displays the details of one or many tasks.
class PostView extends Component {

	// constructor: call super, set up state, and handler bindings
	constructor(props) {
		super(props);
		this.state = {
			tasks: taskActions.convertTasksToDisplayFormat(this.props.tasks, this.props.agents, this.props.providers, this.props.services, this.props.consumers),
			tab_index: 0
		};
	}

	// render: 
	render() {
		const { classes } = this.props;
		const self = this;
		return (
			<div className={classes.root}>
				{self.state.tasks.map(function (task) {
					return <div key={'div_' + task.id}>
						<AppBar position="sticky" elevation={0} className={classes.appBar}>
							<Toolbar disableGutters={true}>
								<Typography variant="title" color="inherit" className={classes.title}>{'Post ' + task.id}</Typography>
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
						<Button fullWidth size="large"   onClick={self.props.editTaskStatus.bind(this, task.id)}>{task.status}</Button>
						<br />
						{self.state.tab_index === 0 ?
							<div>
								<ListSubheader>Post details</ListSubheader>
								<Divider />
								<br />
								<List>
									{task.agent && task.agent.first_name ? <ListItem>
										<Avatar>
											{task.agent.first_name.substring(0, 1)}
										</Avatar>
										<ListItemText primary={task.agent.first_name + ' ' + task.agent.last_name} />
									</ListItem> : null}
									<ListItem>
										<Avatar>
											<EventIcon />
										</Avatar>
										<ListItemText primary={task.date + ' ' + (task.start ? task.start : '')} />
									</ListItem>
									<ListItem>
										<Avatar>ID</Avatar>
										<ListItemText primary={task.id} />
									</ListItem>
									{
										Object.keys(task.answers)
											.filter(key => {
												return typeof task.answers[key] !== 'object'
											})
											.map(key => {
												return (
													<div>
														<ListItem>
															<Avatar>
																<QuestionAnswerIcon />
															</Avatar>
															<ListItemText primary={key} secondary={task.answers[key]} />
														</ListItem>
														<Divider inset />
													</div>)
											})
									}
								</List>
								<Button fullWidth size="large"  >Price: KW {task.price}</Button><br />
								<br />
								{
									Object.keys(task.answers)
										.filter(key => {
											return typeof task.answers[key] === 'object'
										})
										.map(key => {
											return (
												<div>
													<List
														subheader={<ListSubheader component="div">{key}</ListSubheader>}
													>
														{Object.keys(task.answers[key]).map(selection => {
															return <div>
																<ListItem>
																	<ListItemText
																		primary={task.answers[key][selection].quantity + ' ' + selection}
																		secondary={'Price ' + task.answers[key][selection].price + ' each'}
																	/>
																</ListItem>
															</div>
														})}
													</List>
												</div>)
										})
								}
							</div> : null}
					</div>
				})}
			</div>
		);
	}
}

// 
PostView.propTypes = {
	tasks: PropTypes.array.isRequired
};

export default withStyles(styles)(PostView);
