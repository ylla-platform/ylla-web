// Import React Stuff
import PropTypes from 'prop-types';
import React, { Component } from 'react';

// Material UI includes
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

// Map Actions
import * as mapActions from './actions/map';

// Styles: 
const styles = theme => ({
	appBar: {
		textAlign: 'center',
		borderBottom: '1px solid #B3B3B3',
		backgroundColor: '#F9F9F9',
		color: 'black',
		padding: 10,
		top: 62
	},
	card: {
		backgroundColor: 'rgba(1,1,1,0)'
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
	root: {
		width: '100%',
		maxWidth: 360
	}
});

// Class: FeaturesView: the sidebar proider view displays the details of providers
class FeaturesView extends Component {

	// constructor: call super, set up state, and handler bindings
	constructor(props) {
		super(props);
		// Set feature distances
		let features = [];
		this.props.features.forEach(feature => {
			let new_feat = {
				name: feature.name,
				type: feature.type,
				location: feature.location,
				distance: mapActions.getFeatureDistance(feature.location, this.props.current_location)
			};
			features.push(new_feat);
		});
		this.state = {
			features: features
		};
	}

	// render: 
	render() {
		const { classes } = this.props;
		return (
			<div className={classes.root}>
				<AppBar position="sticky" elevation={0} className={classes.appBar}>
					<Toolbar disableGutters={true}>
						<Typography variant="title" color="inherit" className={classes.title}>Points of interest</Typography>
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
				{this.state.features.map(feature => {
					return (
						<div key={'div' + feature.id}>
							<Card className={this.props.classes.card} elevation={0}>
								<CardHeader
									avatar={
										<Avatar>{feature.name ? feature.name.substring(0, 1) : feature.type.substring(0, 1)}</Avatar>
									}
									title={feature.name}
									subheader={feature.type + '. ' + (feature.distance !== '0' ? feature.distance + 'km' : '')}
								/>
								<CardActions>
									<Tooltip id="tooltip-icon" title="Navigate" placement="bottom">
										<Button   size="large" onClick={this.props.navigate.bind(this, feature.location)}>Navigate</Button>
									</Tooltip>
									<Tooltip id="tooltip-icon" title="Go to" placement="bottom">
										<Button   size="large" onClick={this.props.goto.bind(this, feature.location)}>Go to</Button>
									</Tooltip>
								</CardActions>
							</Card>
							<br />
							<Divider />
						</div>
					)
				})}
			</div>
		);
	}
}

// 
FeaturesView.propTypes = {
	features: PropTypes.array.isRequired
};

export default withStyles(styles)(FeaturesView);