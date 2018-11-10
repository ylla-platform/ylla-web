// Import React
import classNames from 'classnames';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Material UI includes
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import Divider from '@material-ui/core/Divider';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import LinearProgress from '@material-ui/core/LinearProgress';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import { withStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

// Material icons
import * as icons from '@material-ui/icons';
import CloseIcon from '@material-ui/icons/Close';

// Our components
import ProfileAddress from './ProfileAddress';

// Styles
const styles = theme => ({
	root: {
		maxWidth: 380,
		zIndex: 3,
		position: 'relative',
		margin: 10,
		overflowY: 'auto'
	},
	heading: {
		fontSize: theme.typography.pxToRem(15),
	},
	secondaryHeading: {
		fontSize: theme.typography.pxToRem(15),
		color: theme.palette.text.secondary,
	},
	button: {
		margin: theme.spacing.unit,
	},
	input: {
		display: 'none',
	},
	formControl: {
		margin: theme.spacing.unit,
		minWidth: 120
	},
	card: {
		maxWidth: 345
	},
	media: {
		height: 75
	},
	avatar: {
		margin: 10
	},
	bigAvatar: {
		width: 60,
		height: 60
	},
	content: {
		padding: 10,
		backgroundColor: '#F9F9F9',
		border: '1px solid #ccc'
	},
	chips: {
		display: 'flex',
		flexWrap: 'wrap',
	},
	chip: {
		margin: theme.spacing.unit / 4,
		backgroundColor: theme.palette.ylla_yellow.main
	}
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
};

const days = [
	{ name: 'Monday', value: 'monday' },
	{ name: 'Tuesday', value: 'tuesday' },
	{ name: 'Wednesday', value: 'wednesday' },
	{ name: 'Thursday', value: 'thursday' },
	{ name: 'Friday', value: 'friday' },
	{ name: 'Saturday', value: 'saturday' },
	{ name: 'Sunday', value: 'sunday' }
];

const sessions = [
	{ name: 'Session 1', value: 'session1' },
	{ name: 'Session 2', value: 'session2' },
];

// Class: ProfileAgent. 
class ProfileAgent extends Component {

	// constructor: call super, set up state, and handler bindings
	constructor(props) {
		super(props);
		var providers = [];
		this.props.providers.forEach(prov => {
			if (prov.id === this.props.user.provider_id) providers.push(prov);
		});
		this.state = {
			// User props
			first_name: this.props.user.first_name,
			last_name: this.props.user.last_name,
			avatar: this.props.user.avatar,
			email: this.props.user.email,
			date_of_birth: this.props.user.date_of_birth,
			phone: this.props.user.phone,
			booking_days: (this.props.user.booking_days || []),
			departments: (this.props.user.departments ? this.props.user.departments : []),
			start: this.props.user.start,
			end: this.props.user.end,
			address: this.props.user.address,
			location: (this.props.user.location ? this.props.user.location : []),
			governorate: this.props.user.governorate,
			neighbourhood: this.props.user.neighbourhood,
			block: this.props.user.block,
			street: this.props.user.street,
			house: this.props.user.house,
			service_booking_days: this.props.user.service_booking_days || {},
			notification_orderstatus: (this.props.user.notification_orderstatus ? this.props.user.notification_orderstatus : true),
			onroad: (this.props.user.onroad || false),
			can_edit_profile: (this.props.user.can_edit_profile || true),
			vehicle: (this.props.user.vehicle || ''),
			vehicle_licence: (this.props.user.vehicle_licence || ''),
			biography: (this.props.user.biography || ''),
			// Screen state
			providers: providers,
			percent_complete: this.calculatePercentage(this.props.user),
			date_of_birth_invalid: false,
			start_invalid: false,
			end_invalid: false,
			new_password_invalid: false,
			new_password: '',
			old_password: '',
			expanded: null
		};
	}

	// calculatePercentage: 
	calculatePercentage = (user) => {
		let total = Object.keys(user).length;
		let completed = 0;
		Object.keys(user).forEach(key => {
			if (user[key] !== '' && user[key] !== []) completed++;
		});
		return Math.round((completed / total) * 100);
	}

	// handleDateOfBirthChange
	handleDateOfBirthChange = (event) => {
		this.setState({ date_of_birth: event.target.value });
		var birthday = new Date(event.target.value);
		var ageDifMs = Date.now() - birthday.getTime();
		var ageDate = new Date(ageDifMs); // miliseconds from epoch
		var age = Math.abs(ageDate.getUTCFullYear() - 1970);
		if (age > 9) this.setState({ date_of_birth_invalid: false });
		if (birthday > Date.now()) this.setState({ date_of_birth_invalid: true });
	}

	// handleUploadLogo: 
	handleUploadAvatar = (e) => {
		let reader = new FileReader();
		let file = e.target.files[0];
		reader.onloadend = () => {
			this.setState({ avatar: { id: '', datauri: reader.result } });
		}
		reader.readAsDataURL(file);
	}

	// handleChangeAgentStartTime: 
	handleChangeAgentStartTime = (event) => {
		var provider = this.state.providers[0];
		if (event.target.value >= provider.start) {
			this.setState({ start_invalid: false, start: event.target.value });
		} else {
			this.setState({ start_invalid: true });
		}
	}

	// handleChangeAgentEndTime: 
	handleChangeAgentEndTime = (event) => {
		var provider = this.state.providers[0];
		if (event.target.value <= provider.end) {
			this.setState({ end_invalid: false, end: event.target.value });
		} else {
			this.setState({ end_invalid: true });
		}
	}

	// handleEditUserClick: 
	handleEditUserClick = () => {
		var user = this.props.user;
		user.first_name = this.state.first_name;
		user.last_name = this.state.last_name;
		user.email = this.state.email;
		user.phone = this.state.phone;
		user.date_of_birth = this.state.date_of_birth;
		user.avatar = this.state.avatar;
		user.departments = this.state.departments;
		user.service_booking_days = this.state.service_booking_days;
		user.notification_orderstatus = this.state.notification_orderstatus;
		user.start = this.state.start;
		user.end = this.state.end;
		user.address = this.state.address;
		user.location = this.state.location;
		user.governorate = this.state.governorate;
		user.neighbourhood = this.state.neighbourhood;
		user.block = this.state.block;
		user.street = this.state.street;
		user.house = this.state.house;
		user.onroad = this.state.onroad;
		user.vehicle = this.state.vehicle;
		user.vehicle_licence = this.state.vehicle_licence;
		user.biography = this.state.biography;
		user.can_edit_profile = this.state.can_edit_profile;
		this.props.editUser(user);
	}

	// handleSetAddress: 
	handleSetAddress = (location, address, fields) => this.setState({
		address: address,
		location: location,
		governorate: fields.governorate,
		neighbourhood: fields.neighbourhood,
		block: fields.block,
		street: fields.street,
		house: fields.house
	});

	// handleSetBookingDay: 
	handleSetBookingDay = (service, day) => {
		let booking_days = this.state.service_booking_days;
		if (!booking_days[service]) booking_days[service] = {};
		if (!booking_days[service][day]) {
			booking_days[service][day] = {};
		} else {
			delete booking_days[service][day];
		}
		this.setState({ service_booking_days: booking_days });
	}

	// handleSetBookingTime: 
	handleSetBookingTime = (service, day, session, type, time) => {
		let booking_days = this.state.service_booking_days;
		if (!booking_days[service]) booking_days[service] = {};
		if (!booking_days[service][day]) booking_days[service][day] = {};
		if (!booking_days[service][day][session]) booking_days[service][day][session] = {};
		booking_days[service][day][session][type] = time;
		this.setState({ service_booking_days: booking_days });
	}

	// handleExpansionChange: 
	handleExpansionChange = panel => (event, expanded) => {
		this.setState({
			expanded: expanded ? panel : false,
		});
	}

	// render:
	render() {
		const { classes } = this.props;
		const { expanded } = this.state;
		return (
			<div className={classes.root}>
				<Paper className={classes.content}>
					<Typography variant="headline">{'Profile: ' + this.state.first_name + ' ' + this.state.last_name}</Typography>
					{this.props.close ? <IconButton className={classes.menuButton} aria-label="Close profile" onClick={this.props.closeprofile}>
						<CloseIcon />
					</IconButton> : null}
					<br />
					<Typography variant="body1">{'Profile ' + this.state.percent_complete + '% complete'}</Typography>
					<LinearProgress   variant="determinate" value={this.state.percent_complete} />
					<br />
					<ExpansionPanel expanded={expanded === 'basic'} onChange={this.handleExpansionChange('basic')}>
						<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
							<Typography className={classes.heading}>Your agent profile</Typography>
						</ExpansionPanelSummary>
						<ExpansionPanelDetails className={classes.details}>
							<div>
								<FormControl component="fieldset" className={classes.fieldset}>
									<FormGroup className={classes.formGroup}>
										<TextField
											id="txt-firstname"
											type="text"
											label="First name"
											value={this.state.first_name}
											margin="normal"
											className={this.props.classes.formControl}
											helperText="Your first name without title"
											onChange={(event) => this.setState({ first_name: event.target.value })}
										/>
										<TextField
											id="txt-lastname"
											type="text"
											label="Last name"
											value={this.state.last_name}
											margin="normal"
											className={this.props.classes.formControl}
											helperText="Your last name"
											onChange={(event) => this.setState({ last_name: event.target.value })}
										/>
										<FormControl className={classes.formControl}>
											<InputLabel htmlFor="txt-phone">Phone</InputLabel>
											<Input
												id="txt-phone"
												value={this.state.phone}
												onChange={(event) => this.setState({ phone: event.target.value })}
												startAdornment={<InputAdornment position="start">p</InputAdornment>}
											/>
										</FormControl>
										<TextField
											id="txt-email"
											type="text"
											label="Email"
											value={this.state.email}
											margin="normal"
											className={this.props.classes.formControl}
											helperText="Email address"
											onChange={(event) => this.setState({ email: event.target.value })}
										/>
										<TextField
											id="txt-date"
											label="Birthday"
											type="date"
											error={this.state.date_of_birth_invalid}
											helperText="Select your date of birth."
											InputLabelProps={{ shrink: true }}
											className={classes.formControl}
											onChange={this.handleDateOfBirthChange}
										/>
									</FormGroup>
								</FormControl>
								<br />
								<Card className={this.props.classes.card} elevation={0}>
									<CardHeader
										avatar={
											<Avatar
												alt="Alt text"
												src={this.state.avatar && this.state.avatar.datauri ? this.state.avatar.datauri : (this.state.avatar && this.state.avatar.id ? '/api/images/getimage?id=' + this.state.avatar.id : '')}
												className={classNames(classes.avatar, classes.bigAvatar)} />
										}
										title={this.state.first_name + ' ' + this.state.last_name}
									/>
									<CardActions>
										<input
											accept="jpg,jpeg,JPG,JPEG"
											className={classes.input}
											id="file-avatar"
											type="file"
											onChange={this.handleUploadAvatar} />
										<label htmlFor="file-avatar">
											<Button component="span"   className={classes.button}>Avatar</Button>
										</label>
									</CardActions>
								</Card>
								{this.props.providers &&
									this.props.providers.length > 0 &&
									this.props.providers[0].departments &&
									this.props.providers[0].departments.length > 0 ?
									(<FormControl className={classes.formControl}>
										<InputLabel htmlFor="sel-departments">Departments</InputLabel>
										<Select
											multiple
											value={this.state.departments}
											onChange={(e) => this.setState({ departments: e.target.value })}
											input={<Input id="select-multiple-checkbox" />}
											renderValue={selected => (
												<div className={classes.chips}>
													{selected.map(value => <Chip key={value} label={value} className={classes.chip} />)}
												</div>
											)}
											MenuProps={MenuProps}
										>
											{this.props.providers[0].departments.map(department => {
												return (
													<MenuItem key={department} value={department}>
														<Checkbox checked={this.state.departments.indexOf(department) > -1} />
														<ListItemText primary={department} />
													</MenuItem>
												)
											})}
										</Select>
									</FormControl>) : null}
								<br />
								<FormGroup className={classes.formGroup}>
									<TextField
										id="txt-biography"
										label="Biography"
										multiline
										rowsMax="8"
										value={this.state.biography}
										helperText="About you"
										onChange={(event) => this.setState({ biography: event.target.value })}
										className={this.props.classes.formControl}
									/>
								</FormGroup>
								<br />
								<FormControlLabel
									control={
										<Switch
											checked={this.state.onroad}
											onChange={(e) => this.setState({ onroad: !this.state.onroad })}
											value={this.state.onroad}
											 
										/>
									}
									label="On the road"
								/>
								<br />
								{this.props.provider_edit ? <FormControlLabel
									control={
										<Switch
											checked={this.state.can_edit_profile}
											onChange={(e) => this.setState({ can_edit_profile: !this.state.can_edit_profile })}
											value={this.state.can_edit_profile}
											 
										/>
									}
									label="Agent can edit profile"
								/> : null}
								<br />
								<Divider />
								<Tooltip id="tooltip-icon" title="Check your fields and click to save profile details" placement="bottom">
									<Button disabled={this.state.end_invalid || this.state.start_invalid}   onClick={this.handleEditUserClick}>Save</Button>
								</Tooltip>
							</div>
						</ExpansionPanelDetails>
					</ExpansionPanel>
					{this.state.onroad ?
						<ExpansionPanel expanded={expanded === 'onroad'} onChange={this.handleExpansionChange('onroad')}>
							<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
								<Typography className={classes.heading}>On the road</Typography>
							</ExpansionPanelSummary>
							<ExpansionPanelDetails className={classes.details}>
								<div>
									<FormControl className={classes.formControl}>
										<InputLabel htmlFor="sel-vehicle">Transport type</InputLabel>
										<Select
											value={this.state.vehicle}
											onChange={(e) => this.setState({ vehicle: e.target.value })}
											inputProps={{
												name: 'sel-vehicle',
												id: 'sel-vehicle',
											}}
										>
											{this.props.referencedata
												.filter(dataitem => {
													return dataitem.type === 'transportation_type'
												})
												.map(dataitem => {
													const Icon = icons[dataitem.icon];
													return <MenuItem value={dataitem.system_name}>
														<ListItemIcon className={classes.icon}>
															<Icon />
														</ListItemIcon>
														<ListItemText inset primary={dataitem.text} />
													</MenuItem>
												})}
										</Select>
									</FormControl>
									<TextField
										id="txt-vehiclelicence"
										value={this.state.vehicle_licence}
										label="Licence"
										type="text"
										helperText="Enter your vehicle licence plate"
										InputLabelProps={{ shrink: true }}
										className={classes.formControl}
										onChange={(e) => this.setState({ vehicle_licence: e.target.value })}
									/>
									<br />
									<Divider />
									<Tooltip id="tooltip-icon" title="Check your fields and click to save profile details" placement="bottom">
										<Button disabled={this.state.end_invalid || this.state.start_invalid}   onClick={this.handleEditUserClick}>Save</Button>
									</Tooltip>
								</div>
							</ExpansionPanelDetails>
						</ExpansionPanel>
						: null}
					<ExpansionPanel expanded={expanded === 'location'} onChange={this.handleExpansionChange('location')}>
						<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
							<Typography className={classes.heading}>Work address</Typography>
						</ExpansionPanelSummary>
						<ExpansionPanelDetails className={classes.details}>
							<div>
								<FormControl component="fieldset" className={classes.fieldset}>
									<FormGroup className={classes.formGroup}>
										<ProfileAddress
											set_button={true}
											setAddress={this.handleSetAddress}
											updateMapLocation={this.props.updateMapLocation}
											updateMapBounds={this.props.updateMapBounds}
											location={this.props.user.location}
											address={this.props.user.address}
											governorate={this.state.governorate}
											neighbourhood={this.state.neighbourhood}
											block={this.state.block}
											street={this.state.street}
											house={this.state.house}
											current_location={this.props.current_location}
											allow_autodetect={true}
											governorate_lookup={true}
										/>
									</FormGroup>
									<br />
									<Divider />
									<Tooltip id="tooltip-icon" title="Check your fields and click to save profile details" placement="bottom">
										<Button disabled={this.state.end_invalid || this.state.start_invalid}   onClick={this.handleEditUserClick}>Save</Button>
									</Tooltip>
								</FormControl>
							</div>
						</ExpansionPanelDetails>
					</ExpansionPanel>
					{this.props.providers
						.filter(provider => { return provider.id === this.props.user.provider_id })
						.map(provider => {
							return (
								<div>
									{provider.services
										.filter(service => {
											let found = false;
											this.props.services.forEach(serv => {
												if (serv.system_name === service) found = true;
											});
											return found;
										})
										.map(service => {
											return (
												<ExpansionPanel key={service} expanded={expanded === service + '_hours'} onChange={this.handleExpansionChange(service + '_hours')}>
													<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
														<Typography className={classes.heading}>
															{this.props.services.filter(s => {
																return s.system_name === service
															})[0].title
															}
														</Typography>
													</ExpansionPanelSummary>
													<ExpansionPanelDetails className={classes.details}>
														<div>
															<FormControl component="fieldset" className={classes.fieldset}>
																<FormGroup className={classes.formGroup}>
																	{days
																		.filter(day => {
																			if (provider.service_booking_days[service]) {
																				return (Object.keys(provider.service_booking_days[service]).indexOf(day.value) !== -1)
																			} else {
																				return false;
																			}
																		})
																		.map(day => {
																			return (<div key={'bd_' + day.value}>
																				<FormControlLabel
																					control={
																						<Switch
																							checked={this.state.service_booking_days && this.state.service_booking_days[service] && this.state.service_booking_days[service][day.value] ? true : false}
																							onChange={(event) => this.handleSetBookingDay(service, day.value)}
																							aria-label={'checked' + day.value}
																						/>
																					}
																					label={day.name}
																				/>
																				{this.state.service_booking_days && this.state.service_booking_days[service] && this.state.service_booking_days[service][day.value] ?
																					sessions.map(session => {
																						return (<div key={'txt-' + session.value}>
																							<TextField
																								id={'txt-' + session.value + '-start-' + day.value}
																								label={session.name + ' start'}
																								type="time"
																								value={this.state.service_booking_days && this.state.service_booking_days[service] && this.state.service_booking_days[service][day.value] && this.state.service_booking_days[service][day.value][session.value] ? this.state.service_booking_days[service][day.value][session.value].start : ''}
																								margin="normal"
																								onChange={(event) => this.handleSetBookingTime(service, day.value, session.value, 'start', event.target.value)}
																								className={this.props.classes.formControl}
																								InputLabelProps={{ shrink: true }}
																								inputProps={{ step: 1800 }}
																							/>
																							<TextField
																								id={'txt-' + session.value + '-end-' + day.value}
																								label={session.name + ' end'}
																								type="time"
																								value={this.state.service_booking_days && this.state.service_booking_days[service] && this.state.service_booking_days[service][day.value] && this.state.service_booking_days[service][day.value][session.value] ? this.state.service_booking_days[service][day.value][session.value].end : ''}
																								margin="normal"
																								onChange={(event) => this.handleSetBookingTime(service, day.value, session.value, 'end', event.target.value)}
																								className={this.props.classes.formControl}
																								InputLabelProps={{ shrink: true }}
																								inputProps={{ step: 1800 }}
																							/>
																						</div>)
																					}) : null}
																			</div>)
																		})}
																</FormGroup>
															</FormControl>
															<br />
															<Divider />
															<Tooltip id="tooltip-icon" title="Check your fields and click to save profile details" placement="bottom">
																<Button disabled={this.state.end_invalid || this.state.start_invalid}   onClick={this.handleEditUserClick}>Save</Button>
															</Tooltip>
														</div>
													</ExpansionPanelDetails>
												</ExpansionPanel>
											)
										})
									}
								</div>)
						})
					}
					<ExpansionPanel expanded={expanded === 'notifications'} onChange={this.handleExpansionChange('notifications')}>
						<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
							<Typography className={classes.heading}>Notifications</Typography>
						</ExpansionPanelSummary>
						<ExpansionPanelDetails className={classes.details}>
							<div>
								<FormControl component="fieldset">
									<FormLabel component="legend">Your email notification selections</FormLabel>
									<FormGroup>
										<FormControlLabel
											control={
												<Checkbox
													checked={this.state.notification_orderstatus}
													onChange={(event, checked) => this.setState({ notification_orderstatus: checked })}
													value="notification_orderstatus"
												/>
											}
											label="Order status updates"
										/>
									</FormGroup>
									<FormHelperText>These notifications will be sent to your registered email address {this.state.email}</FormHelperText>
								</FormControl>
								<br />
								<Divider />
								<Tooltip id="tooltip-icon" title="Check your fields and click to save profile details" placement="bottom">
									<Button disabled={this.state.end_invalid || this.state.start_invalid}   onClick={this.handleEditUserClick}>Save</Button>
								</Tooltip>
							</div>
						</ExpansionPanelDetails>
					</ExpansionPanel>
				</Paper>
			</div>
		);
	}
}

// 
ProfileAgent.propTypes = {
	classes: PropTypes.shape.isRequired
};

export default withStyles(styles)(ProfileAgent);
