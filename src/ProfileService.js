// Import React
import classNames from 'classnames';
import React, { Component } from 'react';

// Material UI includes
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import { withStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';

import DeleteIcon from '@material-ui/icons/Delete';
import { ListSubheader } from '@material-ui/core';

// Styles
const styles = theme => ({
	root: {
		width: '100%',
		maxWidth: 380,
		height: '100%',
		zIndex: 5,
		position: 'relative',
		margin: 5,
		overflowY: 'auto'
	},
	chip: {
		margin: theme.spacing.unit / 4,
		backgroundColor: theme.palette.ylla_yellow.main
	},
	chips: {
		display: 'flex',
		flexWrap: 'wrap',
	},
	content: {
		padding: 10,
		backgroundColor: '#F9F9F9',
		border: '1px solid #ccc'
	},
	formControl: {
		margin: theme.spacing.unit,
		minWidth: 120
	},
	input: {
		display: 'none',
	},
	textFieldRoot: {
		padding: 0,
		'label + &': {
			marginTop: theme.spacing.unit * 3,
		},
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

// Class: ProfileService
class ProfileService extends Component {

	// constructor: call super, set up state
	constructor(props) {
		super(props);
		this.state = {
			service_answers: this.props.user.service_answers || {},
			service_answer_groups: this.props.user.service_answer_groups || {},
			service_booking_days: this.props.user.service_booking_days || {}
		};
	}

	// handleChangeAnswer: 
	handleChangeAnswer = (field_description, service, event) => {
		let answers = this.state.service_answers;
		if (!answers[service]) answers[service] = {};
		answers[service][field_description] = event.target.value;
		this.setState({ service_answers: answers });
	}

	// handleUploadProviderOptionImage: 
	handleUploadProviderOptionImage = (e) => {
		let reader = new FileReader();
		let file = e.target.files[0];
		let self = this;
		reader.onloadend = () => {
			let image = new Image();
			image.src = reader.result;
			image.onload = function () {
				self.setState({ current_provider_optionimage: { id: '', datauri: reader.result }, valid_current_provider_optionimage: true })
			};
		}
		reader.readAsDataURL(file);
	}

	// handleEditUserClick: 
	handleEditUserClick = () => {

		// We need to validate service questions
		let valid = true;
		if (this.props.service.fields) {
			this.props.service.fields.forEach(field => {
				if (field.target === 'provider' && field.mandatory && !this.service_answers[field.description]) valid = false;
			});
		}

		if (!valid) {
			alert('Please answer all service questions');
			return;
		}

		// On this page we're only changing service related data
		let user = this.props.user;
		user.service_booking_days = this.state.service_booking_days;
		user.service_answers = this.state.service_answers;
		user.service_answer_groups = this.state.service_answer_groups;
		this.props.editUser(user);
	}

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

	// handleSetBookingInterval:
	handleSetBookingInterval = (service, interval) => {
		let booking_days = this.state.service_booking_days;
		if (!booking_days[service]) booking_days[service] = {};
		booking_days[service].booking_interval = interval;
		this.setState({ service_booking_days: booking_days });
	}

	// handleSetBookingAdvanceMin:
	handleSetBookingAdvanceMin = (service, advance_min) => {
		let booking_days = this.state.service_booking_days;
		if (!booking_days[service]) booking_days[service] = {};
		booking_days[service].booking_advance_min = advance_min;
		this.setState({ service_booking_days: booking_days });
	}

	// handleSetBookingAdvanceMax:
	handleSetBookingAdvanceMax = (service, advance_max) => {
		let booking_days = this.state.service_booking_days;
		if (!booking_days[service]) booking_days[service] = {};
		booking_days[service].booking_advance_max = advance_max;
		this.setState({ service_booking_days: booking_days });
	}

	// handleSetBookingMaxItems:
	handleSetBookingMaxItems = (service, max_items) => {
		let booking_days = this.state.service_booking_days;
		if (!booking_days[service]) booking_days[service] = {};
		booking_days[service].booking_maximum_items = max_items;
		this.setState({ service_booking_days: booking_days });
	}

	// handleSetBookingMaxItemsPeople:
	handleSetBookingMaxItemsPeople = (service, max_items_people) => {
		let booking_days = this.state.service_booking_days;
		if (!booking_days[service]) booking_days[service] = {};
		booking_days[service].booking_maximum_items_people = max_items_people;
		this.setState({ service_booking_days: booking_days });
	}

	// handleSetBookingEstimatedDuration:
	handleSetBookingEstimatedDuration = (service, duration) => {
		let booking_days = this.state.service_booking_days;
		if (!booking_days[service]) booking_days[service] = {};
		booking_days[service].booking_estimated_duration = duration;
		this.setState({ service_booking_days: booking_days });
	}

	// handleAddProviderItemGroup
	handleAddProviderItemGroup = (field, service, event) => {
		if (this.state.curent_provider_option_group !== '') {
			let answer_groups = this.state.service_answer_groups;
			if (!answer_groups[service]) answer_groups[service] = {};
			let groups = answer_groups[service][field] || [];
			groups.push(this.state.curent_provider_option_group);
			answer_groups[service][field] = groups;
			this.setState({ service_answer_groups: answer_groups, curent_provider_option_group: '' });
		}
	}

	// handleDeleteProviderItemGroup
	handleDeleteProviderItemGroup = (index, field, service, event) => {
		let answer_groups = this.state.service_answer_groups;
		let groups = answer_groups[service][field];
		groups.splice(index, 1);
		answer_groups[service][field] = groups;
		this.setState({ service_answer_groups: answer_groups });
	}

	// handleAddProviderItem
	handleAddProviderItem = (field, service, event) => {
		// get current items (if they've been set)
		let answers = this.state.service_answers;
		if (!answers[service]) answers[service] = {};
		let items = answers[service][field] || [];
		items.push({ description: this.state.current_provider_option, price: this.state.current_provider_optionprice, size: this.state.current_provider_optionsize, grouping: this.state.current_provider_optiongrouping, image: this.state.current_provider_optionimage });
		answers[service][field] = items;
		this.setState({ service_answers: answers, current_provider_optiongrouping: '', current_provider_option: '', current_provider_optionprice: '', current_provider_optionimage: null });
	}

	// handleDeleteProviderItem
	handleDeleteProviderItem = (index, field, service, event) => {
		let answers = this.state.service_answers;
		let items = answers[service][field];
		items.splice(index, 1);
		answers[service][field] = items;
		this.setState({ service_answers: answers });
	}

	// handleSetPrimaryService: 
	handleSetPrimaryService = (event) => {
		let service_answers = this.state.service_answers;
		let selecting = true;
		// Firstly check if we're selecting or deselecting.
		if (service_answers[this.props.service.system_name] && service_answers[this.props.service.system_name].primary) selecting = false;
		if (!service_answers[this.props.service.system_name]) service_answers[this.props.service.system_name] = {};
		// Update any others
		Object.keys(service_answers).forEach(service => {
			if (selecting && service !== this.props.service.system_name) service_answers[service].primary = false;
			if (service === this.props.service.system_name) service_answers[service].primary = selecting;
		});
		this.setState({ service_answers: service_answers });
	}

	// render:
	render() {
		const { classes, service } = this.props;
		let system_name = (service ? service.system_name : '')
		const self = this;
		const amenityTitles = {};
		this.props.referencedata.forEach(reference => {
			if (reference.type === 'location_amenity') amenityTitles[reference.system_name] = reference.text;
		});
		return (
			<div className={classes.root}>
				{service ? <div>
					<Paper className={classes.content}>
						<ListSubheader>{service ? service.title : ''}</ListSubheader>
						<Divider />
						<br />
						<FormControlLabel
							control={
								<Switch
									checked={this.state.service_answers[system_name] && this.state.service_answers[system_name].primary ? true : false}
									onChange={self.handleSetPrimaryService}
								/>
							}
							label="Primary service"
						/>
						<br />
						{service.price_required ?
							<FormControl>
								<TextField
									fullWidth
									id={'txt-price'}
									value={self.state.service_answers && self.state.service_answers[system_name] && self.state.service_answers[service.system_name]['price'] ? self.state.service_answers[service.system_name]['price'] : ''}
									onChange={self.handleChangeAnswer.bind(this, 'price', system_name)}
									label={(service.price_description ? service.price_description : 'Price')}
									margin="normal"
									InputProps={{
										name: 'txt-price',
										id: 'txt-price',
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
							</FormControl>
							: null
						}
						<br />
						<Divider />
						<br />
						{service.fields // Standard provider questions
							.filter(question => { return !question.provider_options && (question.target === 'provider' || question.target === 'both') })
							.map((question, i) => {
								return (
									<div key={'tc_' + i}>
										{question.type === 'text' ?
											<div>
												<FormControl>
													<TextField
														id={'txt-' + i}
														type="text"
														fullWidth
														value={self.state.service_answers && self.state.service_answers[system_name] && self.state.service_answers[service.system_name][question.title] ? self.state.service_answers[service.system_name][question.title] : ''}
														label={question.provider_title && question.provider_title !== '' ? question.provider_title : question.title}
														margin="normal"
														helperText="Enter your answer here"
														onChange={self.handleChangeAnswer.bind(this, question.title, system_name)}
														InputProps={{
															name: 'governorate',
															id: 'sel-governorate',
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
												</FormControl>
												<br />
											</div> : ''
										}
										{question.type === 'select' || question.type === 'multiple' ?
											<div>
												<FormControl className={classes.formControl}>
													<InputLabel
														shrink={true}
														className={classes.textFieldFormLabel}
														htmlFor={'sel-' + i}>{question.provider_title && question.provider_title !== '' ? question.provider_title : question.title}</InputLabel>
													<Select
														multiple
														fullWidth
														value={self.state.service_answers && self.state.service_answers[system_name] && self.state.service_answers[system_name][question.title] ? self.state.service_answers[system_name][question.title] : []}
														onChange={self.handleChangeAnswer.bind(this, question.title, system_name)}
														input={<Input id={'sel-' + i} />}
														renderValue={selected => (
															<div className={classes.chips}>
																{selected.map(value => <Chip key={value} label={value} className={classes.chip} />)}
															</div>
														)}
														MenuProps={MenuProps}
														inputProps={{
															disableUnderline: true,
															classes: {
																root: classes.textFieldRoot,
																input: classes.textFieldInput,
															}
														}}
													>
														{question.options.map((o, y) => {
															return <MenuItem key={y} value={o}>
																<Checkbox checked={self.state.service_answers && self.state.service_answers[system_name] && self.state.service_answers[system_name][question.title] ? self.state.service_answers[system_name][question.title].indexOf(o) > -1 : false} />
																<ListItemText primary={o} />
															</MenuItem>
														})}
													</Select>
												</FormControl>
											</div> : ''
										}
									</div>
								)
							})
						}
						<br />
						{service.fields // Questions that the provider needs to provide answers for
							.filter(question => { return question.provider_options })
							.map((question, i) => {
								return (
									<div key={'tc_' + i}>
										<ListSubheader>{(question.provider_title !== '' ? question.provider_title : question.title) + ' Groups'}</ListSubheader>
										<Divider />
										<FormControl>
											<TextField
												fullWidth
												id={'txt-item' + i}
												value={self.state.curent_provider_option_group}
												onChange={(e) => this.setState({ curent_provider_option_group: e.currentTarget.value })}
												label="Group"
												margin="normal"
												helperText="Add an item group"
												InputProps={{
													name: 'txt-item' + i,
													id: 'txt-item' + i,
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
										</FormControl>
										<Button fullWidth   onClick={this.handleAddProviderItemGroup.bind(this, question.title, system_name)}>Add group</Button><br />
										<br />
										<List>
											{service &&
												self.state.service_answer_groups
												&& self.state.service_answer_groups[service.system_name]
												&& self.state.service_answer_groups[service.system_name][question.title] ?
												self.state.service_answer_groups[service.system_name][question.title].map((group, i) => {
													return (
														<ListItem>
															<ListItemText
																primary={group}
															/>
															<ListItemSecondaryAction>
																<IconButton aria-label="Delete" onClick={this.handleDeleteProviderItemGroup.bind(this, i, question.title, system_name)}>
																	<DeleteIcon />
																</IconButton>
															</ListItemSecondaryAction>
														</ListItem>
													)
												}) : null
											}
										</List>
										<br />
										<ListSubheader>{(question.provider_title !== '' ? question.provider_title : question.title) + ' Items'}</ListSubheader>
										<Divider />
										<FormControl className={classes.formControl}>
											<InputLabel
												shrink={true}
												className={classes.textFieldFormLabel}
												htmlFor="sel-optiongroup">Group</InputLabel>
											<Select
												fullWidth
												value={this.state.current_provider_optiongrouping}
												onChange={(event) => this.setState({ current_provider_optiongrouping: event.target.value })}
												inputProps={{
													name: 'sel-optiongroup',
													id: 'sel-optiongroup',
												}}
											>
												{service &&
													self.state.service_answer_groups
													&& self.state.service_answer_groups[system_name]
													&& self.state.service_answer_groups[system_name][question.title] ?
													self.state.service_answer_groups[system_name][question.title].map((group, i) => {
														return (
															<MenuItem value={group}>{group}</MenuItem>
														)
													}) : null
												}
											</Select>
										</FormControl>
										<FormControl>
											<TextField
												fullWidth
												id={'txt-grouping' + i}
												value={self.state.current_provider_option}
												onChange={(e) => this.setState({ current_provider_option: e.currentTarget.value })}
												label="Item description"
												margin="normal"
												helperText="This is how the item will appear to your customers"
												InputProps={{
													name: 'governorate',
													id: 'sel-governorate',
													disableUnderline: true,
													classes: {
														root: classes.textFieldRoot,
														input: classes.textFieldInput,
													}
												}}
												InputLabelProps={{
													shrink: true,
													className: classes.textFieldFormLabel
												}}
											/>
										</FormControl>
										{question.provider_optionsprice ?
											<FormControl>
												<TextField
													fullWidth
													id={'txt-price' + i}
													value={self.state.current_provider_optionprice}
													onChange={(e) => this.setState({ current_provider_optionprice: e.currentTarget.value })}
													label="Price"
													margin="normal"
													helperText="Enter the price here without symbol e.g. 0.99"
													InputProps={{
														name: 'governorate',
														id: 'sel-governorate',
														disableUnderline: true,
														classes: {
															root: classes.textFieldRoot,
															input: classes.textFieldInput,
														}
													}}
													InputLabelProps={{
														shrink: true,
														className: classes.textFieldFormLabel
													}}
												/>
											</FormControl> : null
										}
										{question.provider_optionssize ?
											<FormControl className={classes.formControl}>
												<InputLabel
													shrink={true}
													className={classes.textFieldFormLabel}
													htmlFor="sel-optionseize">Size</InputLabel>
												<Select
													fullWidth
													value={this.state.current_provider_optionsize}
													onChange={(event) => this.setState({ current_provider_optionsize: event.target.value })}
													inputProps={{
														name: 'sel-optionsize',
														id: 'sel-optionsize',
														disableUnderline: true,
														classes: {
															root: classes.textFieldRoot,
															input: classes.textFieldInput,
														}
													}}
												>
													<MenuItem value="Small">Small</MenuItem>
													<MenuItem value="Medium">Medium</MenuItem>
													<MenuItem value="Large">Large</MenuItem>
												</Select>
											</FormControl> : null
										}
										{question.provider_optionsimage ?
											<div>
												<input
													accept="jpg,jpeg,JPG,JPEG"
													className={classes.input}
													id="file-currentprovideroptionimage"
													type="file"
													onChange={this.handleUploadProviderOptionImage} />
												<label htmlFor="file-currentprovideroptionimage">
													<Button fullWidth   component="span" className={classes.button}>Set item image</Button>
												</label>
												{this.state.current_provider_optionimage
													&& this.state.current_provider_optionimage !== ''
													&& this.state.current_provider_optionimage.datauri ?
													<Avatar
														alt="Item image"
														src={this.state.current_provider_optionimage.datauri}
														className={classNames(classes.avatar, classes.bigAvatar)}
													/> : null
												}
											</div> : null
										}
										<Button   onClick={this.handleAddProviderItem.bind(this, question.title, system_name)}>Add item</Button>
										<br/>
										<ListSubheader>Preview</ListSubheader>
										<Divider />
										<br />
										<Tabs
											value={this.state.current_item_tab}
											className={classes.tabs}
											onChange={(event, value) => { this.setState({ current_item_tab: value }) }}
											indicatorColor="primary"
											textColor="primary"
											scrollable
											scrollButtons="auto"
										>
											{self.state.service_answer_groups
												&& self.state.service_answer_groups[system_name]
												&& self.state.service_answer_groups[system_name][question.title] ?
												self.state.service_answer_groups[system_name][question.title].map((group, i) => {
													return (
														<Tab label={group} />
													)
												}) : null
											}
										</Tabs>
										<List>
											{self.state.service_answers
												&& self.state.service_answers[system_name]
												&& self.state.service_answers[system_name][question.title] ?
												self.state.service_answers[system_name][question.title]
													.filter(field => {
														return field.grouping === self.state.service_answer_groups[system_name][question.title][self.state.current_item_tab]
													})
													.map((field, i) => {
														return (
															<ListItem>
																{question.provider_optionsimage
																	&& field.image ?
																	<Avatar
																		alt="Item image"
																		src={field.image && field.image.datauri ? field.image.datauri : (field.image && field.image.id ? '/api/images/getimage?id=' + field.image.id : '')}
																		className={classNames(classes.avatar, classes.bigAvatar)}
																	/> : null}
																<ListItemText
																	primary={field.description}
																	secondary={field.price ? 'Price: ' + field.price : ''}
																/>
																<ListItemSecondaryAction>
																	<IconButton aria-label="Delete" onClick={this.handleDeleteProviderItem.bind(this, i, question.title, system_name)}>
																		<DeleteIcon />
																	</IconButton>
																</ListItemSecondaryAction>
															</ListItem>
														)
													}) : null
											}
										</List>
									</div>
								)
							})
						}
						<Divider/>
						<br />
						<TextField
							select
							fullWidth
							value={this.state.service_booking_days && this.state.service_booking_days[system_name] && this.state.service_booking_days[system_name]['booking_interval'] ? this.state.service_booking_days[service.system_name]['booking_interval'] : ''}
							onChange={(e) => this.handleSetBookingInterval(system_name, e.target.value)}
							label="Booking Interval"
							InputProps={{
								name: 'sel-optionsize',
								id: 'sel-optionsize',
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
						>
							<MenuItem value="15">15 minutes</MenuItem>
							<MenuItem value="30">30 minutes</MenuItem>
							<MenuItem value="45">45 minutes</MenuItem>
							<MenuItem value="60">1 hour</MenuItem>
							<MenuItem value="120">2 hours</MenuItem>
						</TextField>
						<br />
						<TextField
							select
							fullWidth
							value={this.state.service_booking_days && this.state.service_booking_days[system_name] && this.state.service_booking_days[system_name]['booking_advance_min'] ? this.state.service_booking_days[service.system_name]['booking_advance_min'] : ''}
							onChange={(e) => this.handleSetBookingAdvanceMin(system_name, e.target.value)}
							label="Maximum Booking Advance"
							InputProps={{
								name: 'sel-optionsize',
								id: 'sel-optionsize',
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
						>
							<MenuItem value="1">1 hour</MenuItem>
							<MenuItem value="24">1 day</MenuItem>
							<MenuItem value="168">1 week</MenuItem>
						</TextField>
						<br />
						<TextField
							select
							fullWidth
							value={this.state.service_booking_days && this.state.service_booking_days[system_name] && this.state.service_booking_days[system_name]['booking_advance_max'] ? this.state.service_booking_days[service.system_name]['booking_advance_max'] : ''}
							onChange={(e) => this.handleSetBookingAdvanceMax(system_name, e.target.value)}
							label="Maximum Booking Period"
							InputProps={{
								name: 'sel-optionsize',
								id: 'sel-optionsize',
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
						>
							<MenuItem value="168">1 week</MenuItem>
							<MenuItem value="336">2 weeks</MenuItem>
							<MenuItem value="504">3 weeks</MenuItem>
							<MenuItem value="672">4 weeks</MenuItem>
						</TextField>
						<br />
						{1 === 2 ? <div>
							<TextField
								fullWidth
								id={'txt-maximumbooking'}
								value={this.state.service_booking_days && this.state.service_booking_days[system_name] && this.state.service_booking_days[system_name]['booking_maximum_items'] ? this.state.service_booking_days[system_name]['booking_maximum_items'] : ''}
								onChange={(e) => this.handleSetBookingMaxItems(system_name, e.target.value)}
								label="Maximum bookings items"
								margin="normal"
								InputProps={{
									name: 'txt-maximumbooking',
									id: 'txt-maximumbooking',
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
							<TextField
								fullWidth
								id={'txt-maximumpeople'}
								value={this.state.service_booking_days && this.state.service_booking_days[system_name] && this.state.service_booking_days[system_name]['booking_maximum_items_people'] ? this.state.service_booking_days[system_name]['booking_maximum_items_people'] : ''}
								onChange={(e) => this.handleSetBookingMaxItemsPeople(system_name, e.target.value)}
								label="Maximum people per booking item"
								margin="normal"
								InputProps={{
									name: 'txt-maximumbooking',
									id: 'txt-maximumbooking',
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
							<TextField
								fullWidth
								value={this.state.service_booking_days && this.state.service_booking_days[system_name] && this.state.service_booking_days[system_name]['booking_estimated_duration'] ? this.state.service_booking_days[system_name]['booking_estimated_duration'] : ''}
								onChange={(e) => this.handleSetBookingEstimatedDuration(system_name, e.target.value)}
								label="Estimated booking period"
								InputProps={{
									name: 'sel-interval',
									id: 'sel-interval',
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
							>
								<MenuItem value="15">15 minutes</MenuItem>
								<MenuItem value="30">30 minutes</MenuItem>
								<MenuItem value="45">45 minutes</MenuItem>
								<MenuItem value="60">1 hour</MenuItem>
								<MenuItem value="120">2 hours</MenuItem>
								<MenuItem value="180">3 hours</MenuItem>
								<MenuItem value="240">4 hours</MenuItem>
								<MenuItem value="300">5 hours</MenuItem>
								<MenuItem value="360">6 hours</MenuItem>
								<MenuItem value="420">7 hours</MenuItem>
							</TextField>
						</div> : null}
						<br />
						<ListSubheader>Hours</ListSubheader>
						<Divider />
						<br />
						{days.map(day => {
							return (<div key={'bd_' + day.value}>
								<FormControlLabel
									control={
										<Switch
											checked={this.state.service_booking_days && this.state.service_booking_days[system_name] && this.state.service_booking_days[system_name][day.value] ? true : false}
											onChange={(event) => this.handleSetBookingDay(system_name, day.value)}
											aria-label={'checked' + day.value}
										/>
									}
									label={day.name}
								/>
								{this.state.service_booking_days && this.state.service_booking_days[system_name] && this.state.service_booking_days[system_name][day.value] ?
									sessions.map(session => {
										return (
											<div key={'txt-' + session.value}>
												<TextField
													fullWidth
													id={'txt-' + session.value + '-start-' + day.value}
													label={session.name + ' start'}
													type="time"
													value={this.state.service_booking_days && this.state.service_booking_days[system_name] && this.state.service_booking_days[system_name][day.value] && this.state.service_booking_days[system_name][day.value][session.value] ? this.state.service_booking_days[system_name][day.value][session.value].start : ''}
													margin="normal"
													onChange={(event) => this.handleSetBookingTime(system_name, day.value, session.value, 'start', event.target.value)}
													InputProps={{
														name: 'txt-' + session.value + '-start-' + day.value,
														id: 'txt-' + session.value + '-start-' + day.value,
														disableUnderline: true,
														classes: {
															root: classes.textFieldRoot,
															input: classes.textFieldInput,
														},
														step: 1800
													}}
													InputLabelProps={{
														shrink: true,
														className: classes.textFieldFormLabel,
													}}
												/>
												<TextField
													fullWidth
													id={'txt-' + session.value + '-end-' + day.value}
													label={session.name + ' end'}
													type="time"
													value={this.state.service_booking_days && this.state.service_booking_days[system_name] && this.state.service_booking_days[system_name][day.value] && this.state.service_booking_days[system_name][day.value][session.value] ? this.state.service_booking_days[system_name][day.value][session.value].end : ''}
													margin="normal"
													onChange={(event) => this.handleSetBookingTime(system_name, day.value, session.value, 'end', event.target.value)}
													InputProps={{
														name: 'txt-' + session.value + '-end-' + day.value,
														id: 'txt-' + session.value + '-end-' + day.value,
														disableUnderline: true,
														classes: {
															root: classes.textFieldRoot,
															input: classes.textFieldInput,
														},
														step: 1800
													}}
													InputLabelProps={{
														shrink: true,
														className: classes.textFieldFormLabel,
													}}
												/>
											</div>)
									}) : null}
							</div>)
						})}
						<br />
						<Divider />
						<Tooltip id="tooltip-icon" title="Check your fields and click to save profile details" placement="bottom">
							<Button fullWidth   onClick={this.handleEditUserClick}>Save</Button>
						</Tooltip>
					</Paper >
				</div > : null}
			</div>
		);
	}
}

//
ProfileService.propTypes = {
};

// 
export default withStyles(styles)(ProfileService);
