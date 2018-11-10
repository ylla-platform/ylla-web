// Import React Stuff
import PropTypes from 'prop-types';
import React, { Component } from 'react';

// Material UI includes
import Avatar from '@material-ui/core/Avatar';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
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

// Supporting actions
import * as taskActions from './actions/tasks';

import moment from 'moment';

// Styles: 
const styles = theme => ({
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
	chip: {
		margin: theme.spacing.unit,
		backgroundColor: theme.palette.ylla_yellow.main
	},
	root: {
		width: '100%',
		height: '100%',
		zIndex: 100
	},
	tab: {
		minWidth: 40
	},
	textFieldRoot: {
		padding: 0,
		'label + &': {
			marginTop: theme.spacing.unit * 3,
		}
	},
	textFieldInput: {
		borderRadius: 4,
		backgroundColor: theme.palette.common.white,
		border: '1px solid #ced4da',
		fontSize: 16,
		padding: '10px 12px',
		width: 'calc(100% - 24px)',
		transition: theme.transitions.create(['border-color', 'box-shadow']),
		'&:focus': {
			borderColor: '#80bdff',
			boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
		}
	},
	textFieldFormLabel: {
		fontSize: 18,
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

// Class: TaskView: the sidebar task view displays the details of one or many tasks.
class TaskView extends Component {
	// constructor: call super, set up state, and handler bindings
	constructor(props) {
		super(props);
		this.state = {
			tasks: taskActions.convertTasksToDisplayFormat(this.props.tasks, this.props.agents, this.props.providers, this.props.services, this.props.consumers),
			rating: '',
			review: '',
			tab_index: 0
		};
	}
	// cancelTask: 
	cancelTask = (id, event) => {
		this.props.cancelTask(id);
	}
	// handleSubmitRating: 
	handleSubmitRating = (id, event) => {
		this.props.editTaskRating({ id: id, rating: this.state.rating, review: this.state.review });
	}
	// render: 
	render() {
		const { classes } = this.props;
		const self = this;
		return (
			<div className={classes.root}>
				{self.state.tasks.map(task => {
					return (
						<div key={'div-' + task.id} className={classes.root}>
							<AppBar position="sticky" elevation={0} className={classes.appBar}>
								<Toolbar disableGutters={true}>
									<Typography variant="title" className={classes.title} color="inherit">{'ID: ' + task.id}</Typography>
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
								value={self.state.tab_index}
								onChange={(e, value) => self.setState({ tab_index: value })}
								indicatorColor="primary"
								textColor="primary"
								fullWidth
							>
								<Tab
									label="Details"
									classes={{
										root: classes.tab
									}}
								/>
								<Tab
									label="Customer"
									classes={{
										root: classes.tab
									}}
								/>
								<Tab
									label="Business"
									classes={{
										root: classes.tab
									}}
								/>
							</Tabs>
							{task.provider_id && task.provider_id !== '' && task.provider_id !== 0 ?
								<Button fullWidth disabled size="large"   onClick={self.props.editTaskStatus.bind(this, task.id)}>{task.status}</Button> : null}
							{self.state.tab_index === 0 ?
								<div>
									<ListSubheader>Details</ListSubheader>
									<Divider />
									<List>
										{task.agent && task.agent.first_name ? <ListItem>
											<Avatar className={classes.avatar}>
												{task.agent.first_name.substring(0, 1)}
											</Avatar>
											<ListItemText primary={task.agent.first_name + ' ' + task.agent.last_name} />
										</ListItem> : null}
										{task.start_date_time ? <ListItem>
											<Avatar className={classes.avatar}>
												<EventIcon />
											</Avatar>
											<ListItemText primary={task.start_date_time ? moment(task.start_date_time).format('DD/MM/YYYY HH:mm') : ''} />
										</ListItem> : null}
										{
											task.answers && Object.keys(task.answers)
												.filter(key => {
													return typeof task.answers[key] !== 'object'
												})
												.map(key => {
													return (
														<div>
															<ListItem>
																<Avatar className={classes.avatar}>
																	<QuestionAnswerIcon />
																</Avatar>
																<ListItemText primary={key} secondary={task.answers[key]} />
															</ListItem>
															<Divider inset />
														</div>)
												})
										}
									</List>
									{
										task.answers && Object.keys(task.answers)
											.filter(key => {
												return typeof task.answers[key] === 'object'
											})
											.map(key => {
												return (
													<div>
														<ListSubheader component="div">{key}</ListSubheader>
														<Divider />
														{Object.keys(task.answers[key]).map(selection => {
															return <div>
																<ListItem>
																	<ListItemText
																		primary={selection +
																			(
																				task.answers[key][selection] &&
																					task.answers[key][selection].quantity ? ' (' + task.answers[key][selection].quantity + ')' : ''
																			)}
																	/>
																</ListItem>
															</div>
														})}
													</div>)
											})
									}
									<br />
									<Button fullWidth size="large"  >Price: KW {task.price}</Button>
									<br />
									{task.status === 'Completed' && task.rating ?
										<div>
											<ListSubheader>{'You rated this service ' + task.rating.stars}</ListSubheader>
											<Divider />
											<Typography variant="body2">{task.rating.review}</Typography>
										</div>
										: null
									}
									{task.status === 'Completed' && !task.rating ?
										<div>
											<ListSubheader>Rate this service</ListSubheader>
											<Divider />
											<div>
												<RadioGroup
													row
													aria-label="rating"
													name="rating"
													className={classes.group}
													value={self.state.rating}
													onChange={(event, value) => self.setState({ rating: value })}
												>
													<FormControlLabel value="1" control={<Radio />} label="1" />
													<FormControlLabel value="2" control={<Radio />} label="2" />
													<FormControlLabel value="3" control={<Radio />} label="3" />
													<FormControlLabel value="4" control={<Radio />} label="4" />
													<FormControlLabel value="5" control={<Radio />} label="5" />
												</RadioGroup>
												<br />
												<TextField
													autoFocus
													fullWidth
													multiline
													rowsMax="4"
													margin="dense"
													id="txt-review"
													label="Review"
													value={self.state.review}
													onChange={(event) => self.setState({ review: event.target.value })}
													type="text"
													InputProps={{
														name: 'txt-username',
														id: 'txt-username',
														disableUnderline: true,
														classes: {
															root: classes.textFieldRoot,
															input: classes.textFieldInput,
														}
													}}
													InputLabelProps={{
														shrink: true,
														className: classes.textFieldFormLabel,
													}}
												/>
												<br />
												<br />
												<Button fullWidth size="large"   onClick={self.handleSubmitRating.bind(this, task.id)}>Submit rating</Button><br />
											</div>
										</div>
										: null
									}
								</div> : null}
							{self.state.tab_index === 1 ?
								<div>
									<ListSubheader>Customer details</ListSubheader>
									<Divider />
									<List>
										{task.consumer && task.consumer.first_name ? <ListItem>
											<Avatar>
												{task.consumer.first_name.substring(0, 1)}
											</Avatar>
											<ListItemText primary={task.consumer.first_name + ' ' + task.consumer.last_name} />
										</ListItem> : null}
									</List>
								</div> : null}
							{self.state.tab_index === 2 ?
								<div>
									<ListSubheader>{task.provider_name}</ListSubheader>
									<Divider />
									{task.provider_id && task.provider_id !== '' && task.provider ?
										(
											<div>
												<Tooltip id="tooltip-icon" title="Go to" placement="bottom">
													<IconButton className={classes.button} aria-label="View on map" onClick={self.props.goto.bind(this, (task.provider.addresses && task.provider.addresses.length > 0 ? task.provider.addresses[0].location : []))}>
														<LocationOnIcon />
													</IconButton>
												</Tooltip>
												<Tooltip id="tooltip-icon" title="Navigate" placement="bottom">
													<IconButton className={classes.button} aria-label="Navigate to provider" onClick={self.props.navigate.bind(this, (task.provider.addresses && task.provider.addresses.length > 0 ? task.provider.addresses[0].location : []))}>
														<NavigationIcon />
													</IconButton>
												</Tooltip>
												<Tooltip id="tooltip-icon" title="Phone" placement="bottom">
													<IconButton className={classes.button} aria-label="Phone provider" href={'tel:' + task.provider.phone}>
														<PhoneIcon />
													</IconButton>
												</Tooltip>
												<Tooltip id="tooltip-icon" title="Chat" placement="bottom">
													<IconButton
														className={classes.button}
														aria-label="Chat"
														onClick={self.props.chat.bind(this, { name: task.provider.name, id: task.provider.id })}>
														<ChatIcon />
													</IconButton>
												</Tooltip>
												<br />
												<ProviderPaymentTerms
													provider={task.provider}
													referencedata={self.props.referencedata}
												/>
											</div>
										) : null}
									{task.agent_id && task.agent_id !== '' && task.agent ?
										<div>
											<ListSubheader>{task.agent.first_name + ' ' + task.agent.last_name}</ListSubheader>
											<Divider />
											<Tooltip id="tooltip-icon" title="Chat" placement="bottom">
												<IconButton
													className={classes.button}
													aria-label="Chat"
													onClick={self.props.chat.bind(this, { name: (task.agent ? task.agent.first_name : 'Agent'), id: task.agent.id })}>
													<ChatIcon />
												</IconButton>
											</Tooltip>
										</div>
										: null}
								</div> : null}
						</div>
					)
				})}
			</div>
		);
	}
}

// 
TaskView.propTypes = {
	tasks: PropTypes.array.isRequired
};

export default withStyles(styles)(TaskView);
