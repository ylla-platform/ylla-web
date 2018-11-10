// Import React Stuff
import React, { Component } from 'react'

// Material UI includes
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

// Components
import ProfileAddress from './ProfileAddress';
import { ListSubheader } from '@material-ui/core';

// Styles: 
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
	chip: {
		margin: theme.spacing.unit,
	},
	content: {
		padding: 10
	},
	formInput: {
		border: '1px solid #ced4da',
		borderRadius: 4,
		padding: '4px 10px'
	},
	button: {
		margin: theme.spacing.unit
	},
	formControl: {
		margin: theme.spacing.unit,
		minWidth: 300
	},
	card: {
		maxWidth: 400,
		backgroundColor: theme.palette.sidebar_background.main
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
})
class PostTask extends Component {

	constructor(props) {
		super(props);
		let category = '';
		this.props.categories.forEach(cat => {
			if (cat.title === 'General') category = cat.system_name;
		});
		let current_date = new Date();
		this.state = {
			// Task details
			title: '',
			description: '',
			price: '',
			category: category,
			tags: [],
			// address
			address: '',
			location: [],
			governorate: '',
			neighbourhood: '',
			block: '',
			street: '',
			house: '',
			// order details
			start_date_time: current_date.toISOString(),
			// validation
			email_invalid: false,
			phone_invalid: false,
		};
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

	// handleSubmitClick: 
	handleSubmitClick = (event) => {

		// Validation
		if (this.state.category === '') return null;
		if (this.state.title === '') return null;
		if (this.state.description === '') return null;
		if (this.state.price === '') return null;

		// Set the answers
		let answers = {
			'Title': this.state.title,
			'Description': this.state.description,
			'Name': this.props.user.first_name + ' ' + this.props.user.last_name 
		};

		// Construct the task
		let data = {
			answers: answers,
			provider_id: '0',
			category: this.state.category,
			tags: this.state.tags,
			consumer_id: this.props.user.id,
			service_id: '0',
			agent_id: '0',
			price: this.state.price,
			address: this.state.address,
			location: this.state.location,
			governorate: this.state.governorate,
			neighbourhood: this.state.neighbourhood,
			block: this.state.block,
			street: this.state.street,
			house: this.state.house,
			start_date_time: this.state.start_date_time,
			status: 'Active'
		};
		this.props.createTask(event, data);
	}

	// handleAddTag: 
	handleAddTag = () => {
		let tag = this.state.current_tag;
		let tags = this.state.tags;
		if (tags.indexOf(tag) === -1) tags.push(tag);
		this.setState({ tags: tags, current_tag: '' });
	}

	// handleDeleteTag: 
	handleDeleteTag = (tag, event) => {
		let tags = this.state.tags;
		if (tags.indexOf(tag) !== -1) tags.splice(tags.indexOf(tag), 1);
		this.setState({ tags: tags });
	}

	render() {
		const { classes } = this.props;
		return (
			<div className={classes.root}>
				<AppBar position="sticky" elevation={0} className={classes.appBar}>
					<Toolbar disableGutters={true}>
						<Typography variant="title" color="inherit" className={classes.title}>Hire a runner</Typography>
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
				<div className={classes.content}>
					{!this.props.user.user_type ? 
						<Typography variant="body2" gutterBottom>You must be logged in to complete this process</Typography> 
					: null}
					{this.state.tags.map((tag, i) => {
						return (
							<Chip
								key={'chp-' + i}
								label={tag}
								onDelete={this.handleDeleteTag.bind(this, tag)}
								className={classes.chip}
							/>
						);
					})}
					<br />
					<FormControl fullwidth className={classes.formControl}>
						<InputLabel
							shrink={true}
							htmlFor="txt-tag">Tag e.g. queuing</InputLabel>
						<Input
							id="txt-tag"
							type="text"
							margin="normal"
							value={this.state.current_tag}
							disableUnderline={true}
							classes={{
								root: classes.textFieldRoot,
								input: classes.textFieldInput,
							}}
							onChange={(e) => this.setState({ current_tag: e.currentTarget.value })}
						/>
					</FormControl>
					<Button fullWidth   onClick={this.handleAddTag}>Add Tag</Button>
					<FormControl className={classes.formControl}>
						<TextField
							fullWidth
							select
							value={this.state.category}
							onChange={(e) => this.setState({ category: e.target.value })}
							label="Category"
							InputProps={{
								name: 'sel-category',
								id: 'sel-category',
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
							{this.props.categories
								.sort((a, b) => {
									return a.title.localeCompare(b.title);
								})
								.map(category => {
									return <MenuItem value={category.system_name}>{category.title}</MenuItem>
								})}
						</TextField>
					</FormControl>
					<FormControl fullwidth className={classes.formControl}>
						<InputLabel
							shrink={true}
							htmlFor="txt-title">Title</InputLabel>
						<Input
							id="txt-title"
							type="text"
							margin="normal"
							value={this.state.title}
							disableUnderline={true}
							classes={{
								root: classes.textFieldRoot,
								input: classes.textFieldInput,
							}}
							onChange={(e) => this.setState({ title: e.currentTarget.value })}
						/>
					</FormControl>
					<FormControl fullwidth className={classes.formControl}>
						<InputLabel
							shrink={true}
							htmlFor="txt-description">Description</InputLabel>
						<Input
							id="txt-description"
							type="text"
							margin="normal"
							value={this.state.description}
							disableUnderline={true}
							classes={{
								root: classes.textFieldRoot,
								input: classes.textFieldInput,
							}}
							onChange={(e) => this.setState({ description: e.currentTarget.value })}
						/>
					</FormControl>
					<FormControl fullwidth className={classes.formControl}>
						<InputLabel
							shrink={true}
							htmlFor="txt-price">Price</InputLabel>
						<Input
							id="txt-price"
							type="text"
							margin="normal"
							value={this.state.price}
							disableUnderline={true}
							classes={{
								root: classes.textFieldRoot,
								input: classes.textFieldInput,
							}}
							onChange={(e) => this.setState({ price: e.currentTarget.value })}
						/>
					</FormControl>
					<ListSubheader>Where</ListSubheader>
					<Divider />
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
					{this.props.user && this.props.user.user_type ? <Tooltip id="tooltip-icon" title="Post Task" placement="bottom">
						<Button fullWidth variant="outlined"   onClick={this.handleSubmitClick}>Post Task</Button>
					</Tooltip> : null}
				</div>
			</div>
		);
	}
}

export default withStyles(styles)(PostTask);