// Import React Stuff
import React from 'react';
import classNames from 'classnames';

// Material UI
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Chip from '@material-ui/core/Chip';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

// Our components
import Login from './Login';
import Register from './Register';
import RegisterTasker from './RegisterTasker';

// Icons
import ClearIcon from '@material-ui/icons/Clear';
import DoneIcon from '@material-ui/icons/Done';

// Styles
const styles = theme => ({
	root: {
		margin: 10
	},
	appBar: {
		textAlign: 'center',
		borderBottom: '1px solid #B3B3B3',
		backgroundColor: '#F9F9F9',
		padding: 10,
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
	closeButton: {
		marginRight: 10
	},
	buttonRight: {
		marginLeft: 140,
		marginTop: -70
	},
	card: {
		minWidth: 275,
		backgroundColor: 'rgba(0,0,0,0)'
	},
	topCard: {
		minWidth: 275,
		paddingTop: 0,
		paddingLeft: 30,
		paddingRight: 30,
		paddingBottom: '0',
		backgroundColor: 'rgba(0,0,0,0)'
	},
	topCardContent: {
		paddingBottom: '0 !important'
	},
	cardYellow: {
		minWidth: 369,
		maxWidth: 369,
		backgroundColor: theme.palette.ylla_yellow.main,
		position: 'fixed',
		bottom: 0,
	},
	formInput: {
		borderRadius: 4,
		backgroundColor: theme.palette.common.white,
		border: '1px solid #ced4da',
		padding: '4px 10px',
		transition: theme.transitions.create(['border-color', 'box-shadow']),
		'&:focus': {
			borderColor: '#80bdff',
			boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
		}
	},
	greyDesc: {
		fontSize: '17px'
	},
	buttonBusiness: {
		backgroundColor: theme.palette.ylla_business.main,
		color: theme.palette.ylla_business.text,
	},
	buttonLancer: {
		backgroundColor: theme.palette.ylla_freelancer.main,
		color: theme.palette.ylla_freelancer.text,
	},
	buttonRunner: {
		backgroundColor: theme.palette.ylla_yellow.main,
		color: theme.palette.ylla_yellow.text
	},
	buttonCustomer: {
		backgroundColor: theme.palette.ylla_customer.main,
		color: theme.palette.ylla_customer.text
	},
	bullet: {
		display: 'inline-block',
		margin: '0 2px',
		transform: 'scale(0.8)',
	},
	chip: {
		margin: theme.spacing.unit / 4,
		backgroundColor: theme.palette.ylla_yellow.main
	},
	formControl: {
		margin: theme.spacing.unit,
		minWidth: 300,
		maxWidth: 300
	},
	homeContainer: {
		paddingBottom: 150
	},
	serviceList: {
		maxHeight: 300,
		position: 'relative',
		overflow: 'auto'
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
	}
});

const page_titles = {
	'login': 'Login',
	'registerprovider': 'Business Account',
	'registerconsumer': 'Customer Account',
	'registerrunner': 'Runner Account',
	'options': 'Register',
}

// Class: Login
class RegistrationPages extends React.Component {
	// constructor: 
	constructor(props) {
		super(props);
		this.state = {
			current_page: 'login',
			registration_selection: '',
			registration_type: '',
			selected_services: [],
			category_selection: '',
			service_search: ''
		};
	}
	handleClose = () => {
		this.props.closeModal();
	}
	handleGoToLogin = () => {
		this.setState({ current_page: 'login' })
	}
	handleGoToSignUp = () => {
		this.setState({ current_page: 'options' })
	}
	handleGoToRegister = () => {
		const type = this.state.registration_selection;
		if (type !== '' && type === 'business') this.setState({ current_page: 'registerprovider', registration_type: 'provider' });
		if (type !== '' && type === 'professional') this.setState({ current_page: 'registerprovider', registration_type: 'provider' });
		if (type !== '' && type === 'tasker') this.setState({ current_page: 'registerrunner' });
		if (type !== '' && type === 'consumer') this.setState({ current_page: 'registerconsumer', registration_type: 'consumer' });
	}
	handleToggleService = (service) => {

		let category = this.state.category_selection;
		let services = this.state.selected_services;
		if (services.indexOf(service) === -1) {
			services.push(service);
		} else if (services.indexOf(service) !== -1) {
			services.splice(services.indexOf(service), 1);
		}
		if (category === 'na' && services.length > 0) {
			this.props.services.forEach(s => {
				if (s.system_name === service) category = s.category;
			});
		}
		this.setState({ category_selection: category, selected_services: services })
	}
	handleSearchServicesChange = (event) => {
		this.setState({ service_search: event.target.value });
	}
	// render: 
	render() {
		const { classes } = this.props;
		const serviceTitles = {};
		this.props.services.forEach(service => {
			serviceTitles[service.system_name] = service.title;
		});
		return (
			<div className={classes.root}>
				<AppBar position="sticky" elevation={0} className={classes.appBar}>
					<Toolbar disableGutters={true}>
						<Typography variant="title" className={classes.title} color="inherit">{page_titles[this.state.current_page]}</Typography>
						<IconButton className={classes.closeButton} color="inherit" aria-label="Menu" onClick={this.handleClose}>
							<svg width='20'
								fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="1.414" clip-rule="evenodd" viewBox="0 0 28 28">
								<g fill="#313131" fill-rule="nonzero" stroke="#313131" stroke-width=".3">
									<path d="M8.893 10.36a1.037 1.037 0 0 0 1.471 0 1.042 1.042 0 0 0 0-1.472L2.043.559a1.04 1.04 0 1 0-1.47 1.472l8.32 8.329zM15.26 13.788L27.008 2.031a1.042 1.042 0 0 0 0-1.472c-.407-.407-1.065-.586-1.471-.179L13.055 12.694h-.309v.36L.419 25.546c-.406.406-.329 1.065.076 1.472.203.204.508.305.774.305.267 0 .552-.101.755-.305L13.78 15.261l11.751 11.758a1.041 1.041 0 0 0 1.474 0 1.04 1.04 0 0 0 .001-1.472L15.26 13.788z" />
								</g>
							</svg>
						</IconButton>
					</Toolbar>
				</AppBar>
				{this.state.current_page === 'options' ?
					<div>
						<div className={classes.homeContainer}>
							<Card className={classes.topCard} elevation={0}>
								<CardContent className={classes.topCardContent}>
									<Typography variant="subheading" align="left">Already have a</Typography>
									<Typography variant="subheading" align="left">Ylla account?</Typography>
									<Button className={classes.buttonRight}   variant="outlined" size="large" onClick={this.handleGoToLogin}>Login</Button>
								</CardContent>
							</Card>
							<Card className={classes.card} elevation={0}>
								<CardContent>
									<Typography className={classes.greyDesc} variant="display3" align="center"><b>OR</b></Typography>
									<br />
									<Typography variant="title" align="center">Choose account type</Typography>
								</CardContent>
							</Card>
							<Card className={classes.card} elevation={0}>
								<CardContent>
									<FormControl className={classes.formControl}>
										<TextField
											fullWidth
											select
											label="Which option best describes you?"
											value={this.state.registration_selection}
											onChange={(event) => this.setState({ registration_selection: event.target.value })}
											InputProps={{
												id: 'sel-registrationtype',
												name: 'sel-registrationtype',
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
											<MenuItem value="consumer">I'm a customer</MenuItem>
											<MenuItem value="business">I own a business</MenuItem>
											<MenuItem value="professional">I'm a professional</MenuItem>
											<MenuItem value="tasker">I work as a runner</MenuItem>
										</TextField>
									</FormControl>
									<br />
									{this.state.registration_selection !== '' &&
										this.state.registration_selection !== 'tasker' ?
										<div>
											<FormControl className={classes.formControl}>
												<TextField
													fullWidth
													select
													label={this.state.registration_selection !== 'consumer' ? 'Which category do you fall under?' : 'Select what you\'re interested in'}
													className={classNames(classes.margin, classes.textField)}
													value={this.state.category_selection}
													onChange={(event) => this.setState({ category_selection: event.target.value, selected_services: [] })}
													InputProps={{
														id: 'sel-category',
														name: 'sel-category',
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
													<MenuItem value="na">I don't know</MenuItem>
													{this.props.categories
														.sort((a, b) => {
															return a.title.localeCompare(b.title)
														})
														.map((category, i) => {
															return <MenuItem key={'ct-' + i} value={category.system_name}>{category.title}</MenuItem>
														})}
												</TextField>
											</FormControl>
											<br />
										</div> : null}
									{(this.state.category_selection !== ''
										&& (this.state.registration_selection === 'business' ||
											this.state.registration_selection === 'professional')) ?
										<div>
											<ListSubheader>Choose services</ListSubheader>
											<FormControl fullwidth className={classes.formControl}>
												<TextField
													id="txt-searchservices"
													type="text"
													margin="normal"
													placeholder="Search available services"
													className={classes.formInput}
													disableUnderline={true}
													InputProps={{
														value: this.state.service_search,
														onChange: this.handleSearchServicesChange,
														disableUnderline: true
													}}
													InputLabelProps={{
														shrink: true,
														className: classes.textFieldFormLabel
													}}
												/>
											</FormControl>
											<List className={classes.serviceList}>
												{this.props.services
													.filter(service => {

														// If search is being used
														if (this.state.service_search) {
															const value = this.state.service_search.toLowerCase();
															if (service.title.replace(/\s/g, '').toLowerCase().indexOf(value) !== -1) {
																return (service.categories && (service.categories.indexOf(this.state.category_selection) !== -1 || this.state.category_selection === 'na'));
															} else if (service.keywords) {
																service.keywords.forEach(keyword => {
																	if (keyword !== '' && keyword.replace(/\s/g, '').toLowerCase().indexOf(value) !== -1) return (service.categories && (service.categories.indexOf(this.state.category_selection) !== -1 || this.state.category_selection === 'na'));
																});
															} else {
																return false;
															}
														} else {
															return (service.categories && (service.categories.indexOf(this.state.category_selection) !== -1 || this.state.category_selection === 'na'))
														}
													})
													.sort((a, b) => {
														return a.title.localeCompare(b.title)
													})
													.map((service, i) => {
														return (
															<ListItem dense key={'svc-' + i} button onClick={this.handleToggleService.bind(this, service.system_name)}>
																<ListItemIcon>
																	{this.state.selected_services.indexOf(service.system_name) !== -1 ? <DoneIcon /> : <ClearIcon />}
																</ListItemIcon>
																<ListItemText primary={service.title} />
															</ListItem>
														)
													})}
											</List>
											{this.state.selected_services.map(service => {
												return (
													<Chip
														label={serviceTitles[service]}
														key={service}
														className={classes.chip}
														onDelete={this.handleToggleService.bind(this, service)}
													/>
												);
											})}
										</div> : null}
									{this.state.registration_selection !== '' ?
										<Button variant="flat" fullWidth   size="large" onClick={this.handleGoToRegister}>Sign up</Button> : null}
								</CardContent>
							</Card>
						</div>
					</div>
					: null}
				{this.state.current_page === 'registerprovider' ?
					<div>
						<Register
							register={this.props.register}
							categories={this.props.categories}
							user_type="provider"
							selected_services={this.state.selected_services}
							selected_category={this.state.category_selection}
							register_progress={this.props.register_progress}
						/>
					</div>
					: null}
				{this.state.current_page === 'registerconsumer' ?
					<div>
						<Register
							register={this.props.register}
							categories={this.props.categories}
							selected_category={this.state.category_selection}
							user_type="consumer"
							register_progress={this.props.register_progress}
						/>
					</div>
					: null}
				{this.state.current_page === 'login' ?
					<div>
						<Card className={classes.topCard} elevation={0}>
							<CardContent className={classes.topCardContent}>
								<Typography variant="subheading" align="left">Don't have a</Typography>
								<Typography variant="subheading" align="left">Ylla account?</Typography>
								<Button className={classes.buttonRight}   variant="outlined" size="large" onClick={this.handleGoToSignUp}>Sign Up</Button>
							</CardContent>
						</Card>
						<Login
							login={this.props.login}
							login_progress={this.props.login_progress}
						/>
					</div> : null}
				{this.state.current_page === 'registerrunner' ?
					<RegisterTasker
						register={this.props.register}
						selected_category={this.state.category_selection}
						register_progress={this.props.register_progress}
						referencedata={this.props.referencedata}
					/> : null}
			</div>
		);
	}
}

export default withStyles(styles)(RegistrationPages);
