// Import React
import React, { Component } from 'react';

// Material UI includes
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import { withStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

// Material UI Icons
import BusinessIcon from '@material-ui/icons/Business';
import LanguageIcon from '@material-ui/icons/Language';

// Our components
import CategoryView from './CategoryView';

// Styles: 
const styles = theme => ({
	appBar: {
		textAlign: 'center',
		borderBottom: '1px solid #B3B3B3',
		backgroundColor: '#F9F9F9',
		padding: 10,
		top: 62
	},
	root: {

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

// Class: Layers
class Layers extends Component {

	// constructor: call super, set up state, and handler bindings
	constructor(props) {
		super(props);
		this.state = {
			show_buildings: this.props.show_buildings,
			categories: this.props.categories,
			category_keys: this.props.category_keys
		};
	}

	// componentWillReceiveProps: 
	componentWillReceiveProps(nextProps) {
		this.setState({ show_buildings: nextProps.show_buildings, categories: nextProps.categories, category_keys: nextProps.category_keys });
	}

	// handleToggleBuildings: 
	handleToggleBuildings = () => {
		this.setState({ show_buildings: !this.state.show_buildings });
		this.props.toggleBuildings();
	}

	// render
	render() {
		const { classes } = this.props;
		return (
			<div className={classes.root}>
				<AppBar position="sticky" elevation={0} className={classes.appBar}>
					<Toolbar disableGutters={true}>
						<Typography variant="title" className={classes.title} color="inherit">Map Options</Typography>
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
				<List>
					<ListItem>
						<ListItemIcon>
							<BusinessIcon />
						</ListItemIcon>
						<ListItemText primary="Show Buildings" />
						<ListItemSecondaryAction>
							<Switch
								onChange={this.handleToggleBuildings}
								checked={this.state.show_buildings}
								 
							/>
						</ListItemSecondaryAction>
					</ListItem>
					<ListItem>
						<ListItemIcon>
							<LanguageIcon />
						</ListItemIcon>
						<ListItemText primary="Use Arabic" />
						<ListItemSecondaryAction>
							<Switch
								onChange={() => this.props.toggleMapLanguage()}
								checked={this.props.map_language === 'ar'}
								 
							/>
						</ListItemSecondaryAction>
					</ListItem>
				</List>
				<CategoryView header="What would you like to see?" categories={this.state.categories} category_keys={this.state.category_keys} updateCategories={this.props.updateCategories} />
			</div>
		);
	}
}

// 
export default withStyles(styles)(Layers);
