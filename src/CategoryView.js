// Import React
import React, { Component } from 'react';

// Material UI includes
import Chip from '@material-ui/core/Chip';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import { withStyles } from '@material-ui/core/styles';

// Sub pages
import CategoryListItem from './CategoryListItem';

// 
const styles = theme => ({
	root: {
		width: '100%',
		maxWidth: 360,
		position: 'relative'
	},
	chip: {
		margin: theme.spacing.unit / 2,
		backgroundColor: theme.palette.ylla_yellow.main
	},
	row: {
		display: 'flex',
		justifyContent: 'center',
		flexWrap: 'wrap',
		maxWidth: 360
	},
});

// Class: CategoryView
class CategoryView extends Component {
	// constructor: call super, set up state, and handler bindings
	constructor(props) {
		super(props);
		this.state = {
			categories: this.props.categories,
			category_hierarchy: this.createCategoryStructure(this.props.categories),
			category_keys: ((this.props.category_keys && Object.keys(this.props.category_keys).length > 0) ? this.props.category_keys : this.createCategoryKeys(this.props.categories)),
			show_buildings: this.props.show_buildings
		};
	}
	// componentWillReceiveProps: 
	componentWillReceiveProps(nextProps) {
		this.setState({
			categories: nextProps.categories,
			category_hierarchy: this.createCategoryStructure(nextProps.categories, nextProps.user_categories),
			category_keys: ((nextProps.category_keys && Object.keys(nextProps.category_keys).length > 0) ? nextProps.category_keys : this.createCategoryKeys(nextProps.categories)),
			show_buildings: nextProps.show_buildings
		});
	}
	// handleItemClick: 
	handleItemClick = (tag, event) => {
		var open_categories = this.state.open_categories;
		if (open_categories.indexOf(tag) !== -1) {
			open_categories.splice(open_categories.indexOf(tag), 1);
		} else {
			open_categories.push(tag);
		}
		this.setState({ open_categories: open_categories });
	}
	// createCategoryKeys: catalogue keys hold the open and closed state and selected state
	createCategoryKeys = (categories, user_categories) => {
		var keys = {};
		categories.forEach(category => {
			keys[category.system_name] = { display: category.title, open: false, selected: false, osm_tags: category.osm_tags, osm_icon: category.osm_icon, colour: category.colour }
		});
		return keys;
	}
	// createCategoryStructure: 
	createCategoryStructure = (categories) => {
		var getNestedChildren = (arr, parent) => {
			var out = []
			for (var i in arr) {
				if (arr[i].parent === parent) {
					var children = getNestedChildren(arr, arr[i].system_name)
					if (children.length) arr[i].children = children
					out.push(arr[i])
				}
			}
			return out
		}
		return getNestedChildren(categories, '');
	}
	handleDelete = (data) => () => {
		let keys = this.state.category_keys;
		keys[data].selected = false;
		this.setState({ category_keys: keys });
	};
	// handleToggle:
	handleToggle = (tag, event) => this.props.toggleMapTag(tag);
	// handleToggleBuildings: 
	handleToggleBuildings = () => {
		this.setState({ show_buildings: !this.state.show_buildings });
		this.props.toggleBuildings();
	}
	// render
	render() {
		const { classes } = this.props;
		return (
			<div>
				<ListSubheader>{this.props.header}</ListSubheader>
				<div className={classes.row}>
					{Object.keys(this.state.category_keys).filter(key => { return this.state.category_keys[key].selected }).map(key => {
						return (
							<Chip
								label={this.state.category_keys[key].display}
								key={key}
								onDelete={this.handleDelete(key)}
								className={classes.chip}
							/>
						);
					})}
				</div>
				<List dense className={classes.root}>
					<CategoryListItem categories={this.state.category_hierarchy} category_keys={this.state.category_keys} updateCategories={this.props.updateCategories} />
				</List>
			</div>
		);
	}
}

// 
CategoryView.propTypes = {};

export default withStyles(styles)(CategoryView);