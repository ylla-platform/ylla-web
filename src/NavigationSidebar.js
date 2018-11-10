// Import React
import React, { Component } from 'react';

// Material UI
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

// Material Icons
import LocationOnIcon from '@material-ui/icons/LocationOn';
import StopIcon from '@material-ui/icons/Stop';

// styles
const styles = theme => ({
	root: {
		zIndex: 100,
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
		margin: 'auto', color:'black'
	}
});

// Class: AgentSidebar
class NavigationSidebar extends Component {
	// constructor: sets the state
	constructor(props) {
		super(props);
		this.state = {
			route_legs: this.props.route_legs
		};
	}
	// componentWillReceiveProps: sets the agent list when this is updated from the parent state
	componentWillReceiveProps = (nextProps) => {
		this.setState({ route_legs: nextProps.route_legs });
	}

	// render
	render() {
		const { classes } = this.props;
		return (
			<div className={classes.root}>
				<AppBar position="sticky" elevation={0} className={classes.appBar}>
					<Toolbar disableGutters={true}>
						<Typography variant="title" color="inherit" className={classes.title}>Navigation</Typography>
						<IconButton color="default" aria-label="Menu" onClick={this.props.stopNavigation}>
							<StopIcon />
						</IconButton>
						<IconButton color="inherit" aria-label="Menu" onClick={() => this.props.close()}>
							<svg width='20'
								fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="1.414" clip-rule="evenodd" viewBox="0 0 28 28">
								<g fill="#313131" fill-rule="nonzero" stroke="#313131" stroke-width=".3">
									<path d="M8.893 10.36a1.037 1.037 0 0 0 1.471 0 1.042 1.042 0 0 0 0-1.472L2.043.559a1.04 1.04 0 1 0-1.47 1.472l8.32 8.329zM15.26 13.788L27.008 2.031a1.042 1.042 0 0 0 0-1.472c-.407-.407-1.065-.586-1.471-.179L13.055 12.694h-.309v.36L.419 25.546c-.406.406-.329 1.065.076 1.472.203.204.508.305.774.305.267 0 .552-.101.755-.305L13.78 15.261l11.751 11.758a1.041 1.041 0 0 0 1.474 0 1.04 1.04 0 0 0 .001-1.472L15.26 13.788z" />
								</g>
							</svg>
						</IconButton>
					</Toolbar>
				</AppBar>
				<List dense={true} className={classes.list}>
					{this.state.route_legs && this.state.route_legs.length > 0 ?
						<div>
							{this.state.route_legs.map(leg => {
								return leg.steps.map(step => {
									return (
										<ListItem>
											<ListItemText
												primary={step.maneuver.instruction}
											/>
											<ListItemSecondaryAction>
												<Tooltip id="tooltip-icon" title="View on map" placement="left">
													<IconButton aria-label="View on map" onClick={this.props.goto.bind(this, step.maneuver.location)}>
														<LocationOnIcon />
													</IconButton>
												</Tooltip>
											</ListItemSecondaryAction>
										</ListItem>)
								})
							})}
						</div>
						: null}
				</List>
			</div>
		);
	}
}

export default withStyles(styles, { withTheme: true })(NavigationSidebar);