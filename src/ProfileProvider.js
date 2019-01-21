// Import React
import React, { Component } from 'react';

// Material UI includes
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import Divider from '@material-ui/core/Divider';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import GridListTile from '@material-ui/core/GridListTile';
import GridList from '@material-ui/core/GridList';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import LinearProgress from '@material-ui/core/LinearProgress';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import { withStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

// Icons
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import StopIcon from '@material-ui/icons/Stop';

// Our components
import CategoryView from './CategoryView';
import ProfileAddress from './ProfileAddress';
import ProviderCardDetail from './ProviderCardDetail';
import ProviderCardImage from './ProviderCardImage';

// Styles
const styles = theme => ({
	root: {
		width: '100%',
		maxWidth: 380,
		height: '100%',
		zIndex: 5,
		margin: 5,
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
	content: {
		padding: 10,
		backgroundColor: '#F9F9F9',
		border: '1px solid #ccc',
		position: 'relative'
	},
	gridListRoot: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'space-around',
		overflow: 'hidden',
		maxWidth: 300,
		backgroundColor: theme.palette.background.paper,
	},
	gridList: {
		flexWrap: 'nowrap',
		transform: 'translateZ(0)',
	},
	title: {
		color: theme.palette.primary[200],
	},
	titleBar: {
		background:
			'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
	},
	tabs: {
		maxWidth: 300
	},
	chips: {
		display: 'flex',
		flexWrap: 'wrap',
	},
	chip: {
		margin: theme.spacing.unit / 4,
		backgroundColor: theme.palette.ylla_yellow.main
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
		}
	}
};

// Class: ProfileProvider
class ProfileProvider extends Component {
	// constructor: call super, set up state, and handler bindings
	constructor(props) {
		super(props);
		var keys = {};
		this.props.categories.forEach(category => {
			keys[category.system_name] = { display: category.title, open: false, selected: false, osm_tags: category.osm_tags, colour: category.colour }
		});
		if (this.props.user && this.props.user.categories) {
			Object.keys(keys).forEach(category => {
				this.props.user.categories.forEach(user_cat => {
					if (user_cat === category) keys[category].selected = true;
				});
			});
		}
		this.state = {
			description: (this.props.user && this.props.user.description ? this.props.user.description : ''),
			departments: this.props.user.departments ? this.props.user.departments : [],
			logo: (this.props.user && this.props.user.logo ? this.props.user.logo : null),
			cover: this.props.user.cover,
			offline: this.props.user.status !== 'Active',
			promo_images: this.props.user.promo_images ? this.props.user.promo_images : [],
			extended: this.props.user.extended,
			essential: this.props.user.essential,
			amenities: (this.props.user.amenities ? this.props.user.amenities : []),
			twitter: this.props.user.twitter,
			instagram: this.props.user.instagram,
			facebook: this.props.user.facebook,
			google_plus: this.props.user.google_plus,
			website: this.props.user.website,
			services: (this.props.user.services || []),
			addresses: (this.props.user.addresses || []),
			service_answers: this.props.user.service_answers || {},
			service_answer_groups: this.props.user.service_answer_groups || {},
			service_booking_days: this.props.user.service_booking_days || {},
			categories: this.props.categories,
			category_keys: keys,
			date_of_birth_invalid: false,
			percent_complete: this.calculatePercentage(),
			valid_logo: true,
			valid_cover: true,
			valid_promo: true,
			curent_provider_option_group: '',
			current_image_label: '',
			current_provider_option: '',
			current_provider_optionprice: '',
			current_provider_optionsize: '',
			current_provider_optiongrouping: '',
			current_provider_optionimage: null,
			valid_current_provider_optionimage: true,
			current_item_tab: 0,
			address: '',
			location: [],
			governorate: '',
			neighbourhood: '',
			block: '',
			street: '',
			house: '',
			address_public: false,
			address_distance: 0,
			edit_address: false,
			edit_address_index: -1,
			department_name: '',
			expanded: null,
			show_departments: (this.props.user.departments && this.props.user.departments.length > 0 ? true : false),
			show_quick_profile: false,
			show_image_profile: false
		};
	}
	// calculatePercentage: 
	calculatePercentage = () => {
		let total = Object.keys(this.props.user).length;
		let completed = 0;
		Object.keys(this.props.user).forEach(key => {
			if (this.props.user[key] && this.props.user[key] !== '' && this.props.user[key] !== [] && this.props.user[key] !== {}) completed++;
		});
		return Math.round((completed / total) * 100);
	}
	// handleUploadLogo: 
	handleUploadLogo = (e) => {
		let reader = new FileReader();
		let file = e.target.files[0];
		let self = this;
		reader.onloadend = () => {
			let image = new Image();
			image.src = reader.result;
			let prov = this.props.user;
			let logo = { id: '', datauri: reader.result };
			prov.logo = logo;
			self.setState({ logo: logo, valid_logo: true, user: prov });
		}
		reader.readAsDataURL(file);
	}
	// handleUploadCover: 
	handleUploadCover = (e) => {
		let reader = new FileReader();
		let file = e.target.files[0];
		let self = this;
		reader.onloadend = () => {
			let image = new Image();
			image.src = reader.result;
			let prov = this.props.user;
			let cover = { id: '', datauri: reader.result };
			prov.cover = cover;
			self.setState({ cover: cover, valid_cover: true, user: prov });
		}
		reader.readAsDataURL(file);
	}
	// handleUploadPromoImage: 
	handleUploadPromoImage = (e) => {
		let reader = new FileReader();
		let file = e.target.files[0];
		let images = this.state.promo_images;
		let self = this;
		reader.onloadend = () => {
			let image = new Image();
			image.src = reader.result;
			image.onload = function () {
				if (image.width <= 1200 && image.width && image.height <= 1200) {
					images.push({ label: self.state.current_image_label, image: { id: '', datauri: reader.result } });
					self.setState({ promo_images: images, valid_promo: true, current_image_label: '' })
				} else {
					self.setState({ valid_promo: false })
				}
			};
		}
		reader.readAsDataURL(file);
	}
	// handleChangeAnswer: 
	handleChangeAnswer = (field_description, service, event) => {
		let answers = this.state.service_answers;
		if (!answers[service]) answers[service] = {};
		answers[service][field_description] = event.target.value;
		this.setState({ service_answers: answers });
	}
	// handleEditUserClick: 
	handleEditUserClick = () => {

		let categories = [];
		Object.keys(this.state.category_keys).forEach(category => {
			if (this.state.category_keys[category].selected) categories.push(category);
		});
		let addresses = this.state.addresses;
		
		if( this.state.edit_address_index == -1){

			if( this.state.governorate!="" || this.state.block!="" || this.state.street!="" || this.state.neighbourhood !="" ){
				// generate new name for address 
				if(this.state.address == "" ){
					var d = new Date();
  					var n = d.getTime();
					this.state.address = 'new_address'+n; 
				}
				addresses.push({
					address: this.state.address,
					governorate: this.state.governorate,
					neighbourhood: this.state.neighbourhood,
					block: this.state.block,
					street: this.state.street,
					house: this.state.house,
					location: this.state.location,
					public: this.state.address_public,
					address_distance: this.state.address_distance
				});
			}
		}
		else if(this.state.edit_address_index != -1){
			let idx = this.state.edit_address_index;
				addresses[idx] = {
					address: this.state.address,
					governorate: this.state.governorate,
					neighbourhood: this.state.neighbourhood,
					block: this.state.block,
					street: this.state.street,
					house: this.state.house,
					location: this.state.location,
					public: this.state.address_public,
					address_distance: this.state.address_distance
				};
		}

		// clear the fields in UI		

		this.setState({
			addresses: addresses,
			edit_address: false,
			edit_address_index: -1,
			address: '',
			governorate: '',
			neighbourhood: '',
			block: '',
			street: '',
			house: '',
			location: [],
			address_public: false,
			address_distance: '0',
		});


		let user = this.props.user;
		user.description = this.state.description;
		user.departments = this.state.departments;
		user.logo = this.state.logo;
		user.cover = this.state.cover;
		user.extended = this.state.extended;
		user.essential = this.state.essential;
		user.amenities = this.state.amenities;
		user.twitter = this.state.twitter;
		user.facebook = this.state.facebook;
		user.website = this.state.website;
		user.services = this.state.services;
		user.categories = categories;
		user.service_answers = this.state.service_answers;
		user.service_answer_groups = this.state.service_answer_groups;
		user.promo_images = this.state.promo_images;
		user.addresses = this.state.addresses;
		this.props.editUser(user);
	}
	// handleUpdateCategories:
	handleUpdateCategories = (category_keys) => {
		this.setState({ category_keys: category_keys });
	}
	// handleDeleteImage: 
	handleDeleteImage = (index) => {
		let images = this.state.promo_images;
		images.splice(index, 1);
		this.setState({ promo_images: images });
	}
	// handleSetAddress:
	handleSetAddress = (location, address, fields) => {
		this.setState({
			address: address,
			location: location,
			governorate: fields.governorate,
			neighbourhood: fields.neighbourhood,
			block: fields.block,
			street: fields.street,
			house: fields.house
		});
	}
	// handleAddAddress: 
	/* handleAddAddress = () => {
		let addresses = this.state.addresses;
		addresses.push({
			address: this.state.address,
			governorate: this.state.governorate,
			neighbourhood: this.state.neighbourhood,
			block: this.state.block,
			street: this.state.street,
			house: this.state.house,
			location: this.state.location,
			public: this.state.address_public,
			address_distance: this.state.address_distance
		});
		this.setState({
			addresses: addresses,
			edit_address: false,
			edit_address_index: -1,
			address: '',
			governorate: '',
			neighbourhood: '',
			block: '',
			street: '',
			house: '',
			location: [],
			address_public: false,
			address_distance: '0'
		});
	} 
	// handleEditAddress: 
	handleEditAddress = () => {
		let addresses = this.state.addresses;
		let idx = this.state.edit_address_index;
		addresses[idx] = {
			address: this.state.address,
			governorate: this.state.governorate,
			neighbourhood: this.state.neighbourhood,
			block: this.state.block,
			street: this.state.street,
			house: this.state.house,
			location: this.state.location,
			public: this.state.address_public,
			address_distance: this.state.address_distance
		};
		this.setState({
			addresses: addresses,
			edit_address: false,
			edit_address_index: -1,
			address: '',
			governorate: '',
			neighbourhood: '',
			block: '',
			street: '',
			house: '',
			location: [],
			address_public: false,
			address_distance: '0'
		});
	} */
	// handeDeleteAddress: 
	handeDeleteAddress = (idx, event) => {
		let addresses = this.state.addresses;
		addresses.splice(idx, 1);
		this.setState({ addresses: addresses });
	}
	// handleAddDepartment: 
	handleAddDepartment = () => {
		if (this.state.department_name !== '') {
			let departments = this.state.departments;
			departments.push(this.state.department_name);
			this.setState({ departments: departments, department_name: '' });
		}
	}
	// handleDeleteDepartment: 
	handleDeleteDepartment = (idx, event) => {
		let departments = this.state.departments;
		departments.splice(idx, 1);
		this.setState({ departments: departments });
	}
	// handleSelectAddressEdit: 
	handleSelectAddressEdit = (idx, event) => {
		this.setState({
			address: this.state.addresses[idx].address,
			governorate: this.state.addresses[idx].governorate,
			neighbourhood: this.state.addresses[idx].neighbourhood,
			block: this.state.addresses[idx].block,
			street: this.state.addresses[idx].street,
			house: this.state.addresses[idx].house,
			location: this.state.addresses[idx].location,
			address_public: this.state.addresses[idx].public,
			address_distance: this.state.addresses[idx].address_distance || '0',
			edit_address: true,
			edit_address_index: idx
		});
	}
	// handleUnselectAddress
	handleUnselectAddress = (idx, event) => {
		this.setState({
			edit_address: false,
			edit_address_index: -1,
			address: '',
			governorate: '',
			neighbourhood: '',
			block: '',
			street: '',
			house: '',
			location: [],
			address_public: false,
			address_distance: '0'
		});
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
		const self = this;
		const serviceTitles = {};
		this.props.services.forEach(service => {
			serviceTitles[service.system_name] = service.title;
		});
		const amenityTitles = {};
		this.props.referencedata.forEach(reference => {
			if (reference.type === 'location_amenity') amenityTitles[reference.system_name] = reference.text;
		});
		return (
			<div className={classes.root}>
				<Paper className={classes.content}>
					<ListSubheader>Profile</ListSubheader>
					<LinearProgress   variant="determinate" value={this.state.percent_complete} />
					<br />
					<Button variant="flat"   onClick={() => this.props.viewProvider(this.props.user.id)}>Preview</Button>
					<Button variant="flat"   onClick={(e) => { this.setState({ offline: !this.state.offline }); this.props.editProviderStatus(this.props.user.id, (this.state.offline ? 'Active' : 'Inactive')) }}>{this.state.offline ? 'Go Live' : 'Take Offline'}</Button>
					<ListSubheader>Quick Profile Cards</ListSubheader>
					<Divider />
					<Button   onClick={() => { this.setState({ show_quick_profile: !this.state.show_quick_profile }) }}>Detail card</Button>
					<Button   onClick={() => { this.setState({ show_image_profile: !this.state.show_image_profile }) }}>Image card</Button>
					<br />
					{this.state.show_quick_profile ? <ProviderCardDetail
						provider={this.props.user}
						user={this.props.user}
						goto={this.props.updateMapLocation}
						chat={this.props.chat}
						distance="10"
						next_available="Monday"
					/> : null}
					<br />
					{this.state.show_image_profile ? <ProviderCardImage
						provider={this.props.user}
						user={this.props.user}
						goto={this.props.updateMapLocation}
						chat={this.props.chat}
						distance="10"
						next_available="Monday"
					/> : null}
					<br />
					<ExpansionPanel expanded={expanded === 'basic'} onChange={this.handleExpansionChange('basic')}>
						<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
							<Typography className={classes.heading}>Basic details</Typography>
						</ExpansionPanelSummary>
						<ExpansionPanelDetails>
							<div>
								<TextField
									fullWidth
									id="txt-description"
									type="text"
									label="Description"
									value={this.state.description}
									margin="normal"
									className={this.props.classes.formControl}
									helperText="A brief description of the services you provide"
									onChange={(event) => this.setState({ description: event.target.value })}
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
								<br />
								<TextField
									fullWidth
									id="txt-extended"
									label="Business information"
									multiline
									rowsMax="8"
									margin="normal"
									value={this.state.extended}
									helperText="Information about your business and services"
									onChange={(event) => this.setState({ extended: event.target.value })}
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
								<br />
								<Divider />
								<Tooltip id="tooltip-icon" title="Check your fields and click to save profile details" placement="bottom">
									<Button fullWidth   onClick={this.handleEditUserClick}>Save</Button>
								</Tooltip>
							</div>
						</ExpansionPanelDetails>
					</ExpansionPanel>
					<ExpansionPanel expanded={expanded === 'images'} onChange={this.handleExpansionChange('images')}>
						<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
							<Typography className={classes.heading}>Images</Typography>
						</ExpansionPanelSummary>
						<ExpansionPanelDetails>
							<div>
								<ListSubheader>Primary profile images</ListSubheader>
								<Divider />
								<br />
								<input
									accept="image/*"
									className={classes.input}
									id="file-logo"
									type="file"
									onChange={this.handleUploadLogo} />
								<label htmlFor="file-logo">
									<Tooltip title="We recommend you work on images before uploading them. See our FAQ for more info." placement="bottom">
										<Button component="span"   className={classes.button}>Logo</Button>
									</Tooltip>
								</label>
								<input
									accept="image/*"
									className={classes.input}
									id="file-cover"
									type="file"
									onChange={this.handleUploadCover} />
								<label htmlFor="file-cover">
									<Tooltip title="We recommend you work on images before uploading them. See our FAQ for more info." placement="bottom">
										<Button component="span"   className={classes.button}>Cover</Button>
									</Tooltip>
								</label>
								{!this.state.valid_logo ? <Typography variant="body2">Invalid logo image size. Please check FAQ guidelines.</Typography> : null}
								{!this.state.valid_cover ? <Typography variant="body2">Invalid cover image size. Please check FAQ guidelines.</Typography> : null}
								<div className={classes.gridListRoot}>
									<GridList className={classes.gridList} cols={2}>
										{this.state.promo_images.map((image, i) => (
											<GridListTile key={'img' + i}>
												<img src={image.image && image.image.datauri ? image.image.datauri : (image.image && image.image.id ? '/api/images/getimage?id=' + image.image.id : '')} alt={image.label} />
												<GridListTileBar
													title={image.label}
													classes={{
														root: classes.titleBar,
														title: classes.title
													}}
													actionIcon={
														<IconButton onClick={this.handleDeleteImage.bind(this, i)}>
															<DeleteIcon className={classes.title} />
														</IconButton>
													}
												/>
											</GridListTile>
										))}
									</GridList>
								</div>
								<ListSubheader>Upload a new promotional image</ListSubheader>
								<Divider />
								<br />
								<FormControl className={classes.formControl}>
									<InputLabel
										shrink={true}
										className={classes.textFieldFormLabel}
										htmlFor="txt-imagelabel">Image description</InputLabel>
									<Input
										fullWidth
										id="txt-imagelabel"
										value={this.state.current_image_label}
										onChange={(event) => this.setState({ current_image_label: event.target.value })}
										disableUnderline={true}
										classes={{
											root: classes.textFieldRoot,
											input: classes.textFieldInput,
										}}
									/>
								</FormControl>
								<br />
								{this.state.current_image_label !== '' ?
									<input
										accept="image/*"
										className={classes.input}
										id="file-promoimage"
										type="file"
										onChange={this.handleUploadPromoImage} /> : null}
								<label htmlFor="file-promoimage">
									<Tooltip title="Images must have a description, please enter that first." placement="bottom">
										<Button component="span" disabled={this.state.current_image_label === ''} className={classes.button}  >Upload Image</Button>
									</Tooltip>
								</label>
								{!this.state.valid_promo ? <Typography variant="body2">Invalid image size. Please check FAQ guidelines.</Typography> : null}
								<br />
								<Divider />
								<Tooltip title="Check your fields and click to save profile details" placement="bottom">
									<Button fullWidth   onClick={this.handleEditUserClick}>Save</Button>
								</Tooltip>
							</div>
						</ExpansionPanelDetails>
					</ExpansionPanel>
					<ExpansionPanel expanded={expanded === 'departments'} onChange={this.handleExpansionChange('departments')}>
						<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
							<Typography className={classes.heading}>Departments</Typography>
						</ExpansionPanelSummary>
						<ExpansionPanelDetails>
							<div>
								<FormControlLabel
									control={
										<Switch
											checked={this.state.show_departments}
											onChange={(e) => this.setState({ show_departments: !this.state.show_departments })}
											value="show_departments"
										/>
									}
									label="Would you like to set up departments for your business?"
								/>
								{this.state.show_departments ?
									<div>
										<br />
										<ListSubheader>Add departments</ListSubheader>
										<Divider />
										<br />
										<TextField
											fullWidth
											id="txt-department"
											type="text"
											label="Department name"
											value={this.state.department_name}
											margin="normal"
											className={this.props.classes.formControl}
											onChange={(event) => this.setState({ department_name: event.target.value })}
											InputProps={{
												name: 'txt-department',
												id: 'txt-department',
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
										<Button fullWidth   onClick={this.handleAddDepartment}>Add</Button>
										<br />
										{this.state.departments ?
											<div>
												<List>
													{this.state.departments.map((department, idx) => {
														return (
															<ListItem key={'li_department_' + idx} dense button className={classes.listItem}>
																<ListItemText primary={department} />
																<ListItemSecondaryAction>
																	<IconButton aria-label="Delete" onClick={this.handleDeleteDepartment.bind(this, idx)}>
																		<DeleteIcon />
																	</IconButton>
																</ListItemSecondaryAction>
															</ListItem>
														)
													})}
												</List>
											</div> : null}
									</div> : null}
								<br />
								<Divider />
								<Tooltip id="tooltip-icon" title="Check your fields and click to save profile details" placement="bottom">
									<Button fullWidth   onClick={this.handleEditUserClick}>Save</Button>
								</Tooltip>
							</div>
						</ExpansionPanelDetails>
					</ExpansionPanel>
					<ExpansionPanel expanded={expanded === 'customerinfo'} onChange={this.handleExpansionChange('customerinfo')}>
						<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
							<Typography className={classes.heading}>Information for customers</Typography>
						</ExpansionPanelSummary>
						<ExpansionPanelDetails className={classes.details}>
							<div>
								<FormControl className={classes.formControl}>
									<InputLabel htmlFor="sel-amenities">Amenities</InputLabel>
									<Select
										multiple
										fullWidth
										value={this.state.amenities}
										onChange={(event) => this.setState({ amenities: event.target.value })}
										input={<Input id="sel-amenities" />}
										renderValue={selected => (
											<div className={classes.chips}>
												{selected.map(value => <Chip key={value} label={amenityTitles[value]} className={classes.chip} />)}
											</div>
										)}
										MenuProps={MenuProps}
										inputProps={{
											fullWidth: true,
											disableUnderline: true,
											classes: {
												root: classes.textFieldRoot,
												input: classes.textFieldInput,
											}
										}}
									>
										{this.props.referencedata
											.filter(dataitem => {
												return dataitem.type === 'location_amenity'
											})
											.map(dataitem => {
												return (
													<MenuItem key={dataitem.system_name} value={dataitem.system_name}>
														<Checkbox checked={this.state.amenities.indexOf(dataitem.system_name) > -1} />
														<ListItemText primary={dataitem.text} />
													</MenuItem>
												)
											})}
									</Select>
								</FormControl>
								<br />
								<FormControl className={classes.formControl}>
									<TextField
										fullWidth
										id="txt-essential"
										label="Essential information"
										value={this.state.essential}
										onChange={(event) => this.setState({ essential: event.target.value })}
										className={this.props.classes.formControl}
										InputProps={{
											name: 'txt-essential',
											id: 'txt-essential',
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
								<Divider />
								<Tooltip id="tooltip-icon" title="Check your fields and click to save profile details" placement="bottom">
									<Button fullWidth   onClick={this.handleEditUserClick}>Save</Button>
								</Tooltip>
							</div>
						</ExpansionPanelDetails>
					</ExpansionPanel>
					
					{/* <ExpansionPanel expanded={expanded === 'social'} onChange={this.handleExpansionChange('social')}>
						<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
							<Typography className={classes.heading}>Social media</Typography>
						</ExpansionPanelSummary>
						<ExpansionPanelDetails className={classes.details}>
							<div>
								<FormControl className={classes.formControl}>
									<InputLabel
										shrink={true}
										className={classes.textFieldFormLabel}
										htmlFor="txt-facebook">Facebook</InputLabel>
									<Input
										fullWidth
										id="txt-facebook"
										value={this.state.facebook}
										onChange={(event) => this.setState({ facebook: event.target.value })}
										startAdornment={<InputAdornment position="start">f</InputAdornment>}
										disableUnderline={true}
										classes={{
											root: classes.textFieldRoot,
											input: classes.textFieldInput,
										}}
									/>
								</FormControl>
								<br />
								<FormControl className={classes.formControl}>
									<InputLabel
										shrink={true}
										className={classes.textFieldFormLabel}
										htmlFor="txt-twitter">Twitter</InputLabel>
									<Input
										fullWidth
										id="txt-twitter"
										value={this.state.twitter}
										onChange={(event) => this.setState({ twitter: event.target.value })}
										startAdornment={<InputAdornment position="start">t</InputAdornment>}
										disableUnderline={true}
										classes={{
											root: classes.textFieldRoot,
											input: classes.textFieldInput,
										}}
									/>
								</FormControl>
								<br />
								<FormControl className={classes.formControl}>
									<InputLabel
										shrink={true}
										className={classes.textFieldFormLabel}
										htmlFor="txt-twitter">Website</InputLabel>
									<Input
										fullWidth
										id="txt-website"
										value={this.state.website}
										onChange={(event) => this.setState({ website: event.target.value })}
										startAdornment={<InputAdornment position="start">w</InputAdornment>}
										disableUnderline={true}
										classes={{
											root: classes.textFieldRoot,
											input: classes.textFieldInput,
										}}
									/>
								</FormControl>
								<br />
								<Divider />
								<Tooltip id="tooltip-icon" title="Check your fields and click to save profile details" placement="bottom">
									<Button fullWidth   onClick={this.handleEditUserClick}>Save</Button>
								</Tooltip>
							</div>
						</ExpansionPanelDetails>
					</ExpansionPanel> */}

					<ExpansionPanel expanded={expanded === 'categories'} onChange={this.handleExpansionChange('categories')}>
						<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
							<Typography className={classes.heading}>Category and Services</Typography>
						</ExpansionPanelSummary>
						<ExpansionPanelDetails className={classes.details}>
							<div>
								<CategoryView header="Select terms to describe your business" categories={this.state.categories} category_keys={this.state.category_keys} updateCategories={this.handleUpdateCategories} />
								<br />
								<FormControl className={classes.formControl}>
									<Select
										fullWidth
										multiple
										value={this.state.services}
										onChange={(event) => this.setState({ services: event.target.value })}
										input={<Input id="sel-services" />}
										renderValue={selected => (
											<div className={classes.chips}>
												{selected.map(value => <Chip key={value} label={serviceTitles[value]} className={classes.chip} />)}
											</div>
										)}
										MenuProps={MenuProps}
										InputProps={{
											disableUnderline: true,
											classes: {
												root: classes.textFieldRoot,
												input: classes.textFieldInput,
											}
										}}
									>
										{
											this.props.services
												.sort((a, b) => { return a.title.localeCompare(b.title) })
												.filter(service => {
													let found = false;
													Object.keys(this.state.category_keys).forEach(category => {
														if (this.state.category_keys[category].selected && service.categories.indexOf(category) !== -1) found = true;
													});
													return found;
												})
												.map(function (m, i) {
													return <MenuItem key={m.system_name} value={m.system_name}>
														<Checkbox checked={self.state.services.indexOf(m.system_name) > -1} />
														<ListItemText primary={m.title} />
													</MenuItem>
												})
										}
									</Select>
								</FormControl>
								<Divider />
								<Tooltip id="tooltip-icon" title="Check your fields and click to save profile details" placement="bottom">
									<Button fullWidth   onClick={this.handleEditUserClick}>Save</Button>
								</Tooltip>
							</div>
						</ExpansionPanelDetails>
					</ExpansionPanel>
					<ExpansionPanel expanded={expanded === 'addresses'} onChange={this.handleExpansionChange('addresses')}>
						<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
							<Typography className={classes.heading}>Your locations</Typography>
						</ExpansionPanelSummary>
						<ExpansionPanelDetails>
							<div>
								{this.state.addresses ?
									<div>
										<List>
											{this.state.addresses.map((address, idx) => {
												return (
													<ListItem key={'li_address_' + idx} dense button className={classes.listItem}>
														<ListItemText primary={address.address} />
														<ListItemSecondaryAction>
															<IconButton aria-label="Delete" onClick={this.handeDeleteAddress.bind(this, idx)}>
																<DeleteIcon />
															</IconButton>
															{!this.state.edit_address ? <IconButton aria-label="Delete" onClick={this.handleSelectAddressEdit.bind(this, idx)}>
																<EditIcon />
															</IconButton> : null}
															{this.state.edit_address ? <IconButton aria-label="Delete" onClick={this.handleUnselectAddress.bind(this, idx)}>
																<StopIcon />
															</IconButton> : null}
														</ListItemSecondaryAction>
													</ListItem>
												)
											})}
										</List>
									</div>
									: null}
								<Divider />
								<br />
								<ListSubheader>{this.state.edit_address ? 'Edit address' : 'Add address'}</ListSubheader>
								<Divider />
								<br />
								<ProfileAddress
									setAddress={this.handleSetAddress}
									updateMapLocation={this.props.updateMapLocation}
									updateMapBounds={this.props.updateMapBounds}
									location={this.state.location}
									address={this.state.address}
									governorate={this.state.governorate}
									neighbourhood={this.state.neighbourhood}
									block={this.state.block}
									street={this.state.street}
									house={this.state.house}
									current_location={this.props.current_location}
									allow_autodetect={true}
									governorate_lookup={true}
								/>
								<br />
								<FormControlLabel
									control={
										<Switch
											checked={this.state.address_public}
											onChange={(e) => this.setState({ address_public: !this.state.address_public })}
											value="address_public"
										/>
									}
									label="Public"
								/>
								<br />
								<TextField
									fullWidth
									id="txt-distance"
									type="text"
									label="Distance"
									value={this.state.address_distance}
									margin="normal"
									className={this.props.classes.formControl}
									helperText="Enter the distance (m) that you would provide services to. 0 is unlimited."
									onChange={(event) => this.setState({ address_distance: event.target.value })}
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
								<br />

								<Divider />
								<Tooltip id="tooltip-icon" title="Check your fields and click to save profile details" placement="bottom">
									<Button fullWidth   onClick={this.handleEditUserClick}>Save</Button>
								</Tooltip>
							</div>
						</ExpansionPanelDetails>
					</ExpansionPanel>
				</Paper >
			</div >
		);
	}
}

//
ProfileProvider.propTypes = {
};

// 
export default withStyles(styles)(ProfileProvider);