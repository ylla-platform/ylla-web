// Import React
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Material UI includes
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ListSubheader from '@material-ui/core/ListSubheader';
import Paper from '@material-ui/core/Paper';
import LinearProgress from '@material-ui/core/LinearProgress';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

// 
import CategoryView from './CategoryView';
import ProfileAddress from './ProfileAddress';

// Styles
const styles = theme => ({
	root: {
		width: '100%',
		height: '100%',
		maxWidth: 380,
		position: 'relative',
		zIndex: 3,
		margin: 5,
		overflowY: 'auto'
	},
	heading: {
		fontSize: theme.typography.pxToRem(15),
	},
	content: {
		padding: 10,
		backgroundColor: '#F9F9F9',
		border: '1px solid #ccc'
	}
});

// Class: ProfileConsumer
class ProfileConsumer extends Component {

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
		let percentage = this.calculatePercentage(this.props.user);
		this.state = {
			// User props
			address: this.props.user.address,
			location: (this.props.user.location ? this.props.user.location : []),
			governorate: this.props.user.governorate,
			neighbourhood: this.props.user.neighbourhood,
			block: this.props.user.block,
			street: this.props.user.street,
			house: this.props.user.house,
			// Screen state
			categories: this.props.categories,
			category_keys: keys,
			percent_complete: percentage,
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

	// handleEditUserClick:
	handleEditUserClick = () => {
		let categories = [];
		Object.keys(this.state.category_keys).forEach(category => {
			if (this.state.category_keys[category].selected) categories.push(category);
		});
		var user = this.props.user;
		user.address = this.state.address;
		user.location = this.state.location;
		user.governorate = this.state.governorate;
		user.neighbourhood = this.state.neighbourhood;
		user.block = this.state.block;
		user.street = this.state.street;
		user.house = this.state.house;
		user.categories = categories;
		this.props.editUser(user);
	}

	// handleUpdateCategories: 
	handleUpdateCategories = (category_keys) => {
		this.setState({ category_keys: category_keys });
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

	// handleExpansionChange: 
	handleExpansionChange = panel => (event, expanded) => {
		this.setState({
			expanded: expanded ? panel : false,
		});
	}

	// render
	render() {
		const { classes } = this.props;
		const { expanded } = this.state;
		return (
			<div className={classes.root}>
				<Paper className={classes.content} elevation={0}>
					<ListSubheader>Profile</ListSubheader>
					<Divider />
					<br />
					<LinearProgress   variant="determinate" value={this.state.percent_complete} />
					<br />
					<ExpansionPanel expanded={expanded === 'location'} onChange={this.handleExpansionChange('location')}>
						<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
							<Typography className={classes.heading}>Home Address</Typography>
						</ExpansionPanelSummary>
						<ExpansionPanelDetails className={classes.details}>
							<div>
								<ProfileAddress
									setAddress={this.handleSetAddress}
									updateMapLocation={this.props.updateMapLocation}
									updateMapBounds={this.props.updateMapBounds}
									location={this.props.user.location}
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
								<Divider />
								<Tooltip id="tooltip-icon" title="Check your fields and click to save profile details" placement="bottom">
									<Button fullWidth   onClick={this.handleEditUserClick}>Save</Button>
								</Tooltip>
							</div>
						</ExpansionPanelDetails>
					</ExpansionPanel>
					<ExpansionPanel expanded={expanded === 'categories'} onChange={this.handleExpansionChange('categories')}>
						<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
							<Typography className={classes.heading}>Interests</Typography>
						</ExpansionPanelSummary>
						<ExpansionPanelDetails className={classes.details}>
							<div>
								<CategoryView header="Select things you're interested in" categories={this.state.categories} category_keys={this.state.category_keys} updateCategories={this.handleUpdateCategories} />
								<br />
								<Divider />
								<Tooltip id="tooltip-icon" title="Check your fields and click to save profile details" placement="bottom">
									<Button fullWidth   onClick={this.handleEditUserClick}>Save</Button>
								</Tooltip>
							</div>
						</ExpansionPanelDetails>
					</ExpansionPanel>
				</Paper>
			</div >
		);
	}
}

// 
ProfileConsumer.propTypes = {
	classes: PropTypes.shape.isRequired
};

// 
export default withStyles(styles)(ProfileConsumer);