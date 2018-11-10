// Import React
import React, { Component } from 'react';

import Collapse from '@material-ui/core/Collapse';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import { withStyles } from '@material-ui/core/styles';

// Material UI Icons
import ClearIcon from '@material-ui/icons/Clear';
import DoneIcon from '@material-ui/icons/Done';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

// 
const styles = theme => ({
	nested: {
		paddingLeft: theme.spacing.unit * 4,
	}
});

// Class: CategoryListItem
class CategoryListItem extends Component {

	// constructor: call super, set up state, and handler bindings
	constructor(props) {
		super(props);
		this.state = {
			categories: this.props.categories,
			category_keys: this.props.category_keys
		};
	}

	// componentWillReceiveProps
	componentWillReceiveProps(nextProps) {
		this.setState({ categories: nextProps.categories, category_keys: nextProps.category_keys });
	}

	// handleToggleCategory: 
	handleToggleCategory = (cat_name, event) => {
		let cat_keys = this.state.category_keys;
		Object.keys(cat_keys).forEach(cat => {
			if (cat_name === cat) cat_keys[cat].open = !cat_keys[cat].open
		});
		this.setState({ category_keys: cat_keys });
	}

	// handleClickCategoryItem: 
	handleClickCategoryItem = (cat_name, event) => {
		let cat_keys = this.state.category_keys;
		Object.keys(cat_keys).forEach(cat => {
			if (cat_name === cat) cat_keys[cat].selected = !cat_keys[cat].selected
		});
		this.setState({ category_keys: cat_keys });
		this.props.updateCategories(this.state.category_keys);
	}

	// handleUpdateCategories: 
	handleUpdateCategories = (category_keys) => this.props.updateCategories(this.state.category_keys);

	// render
	render() {
		return (
			<div>
				{this.state.categories.map(category => {
					return (
						<div>
							{category.children && category.children.length > 0 ?
								<ListItem dense button onClick={this.handleToggleCategory.bind(this, category.system_name)}>
									{this.state.category_keys[category.system_name].open ? <ExpandLess /> : <ExpandMore />}
									<ListItemText primary={category.title} />
								</ListItem> : ''}
							{!category.children || category.children.length === 0 ?
								<ListItem dense button onClick={this.handleClickCategoryItem.bind(this, category.system_name)}>
									<ListItemIcon>
										{this.state.category_keys[category.system_name] && this.state.category_keys[category.system_name].selected ? <DoneIcon /> : <ClearIcon />}
									</ListItemIcon>
									<ListItemText primary={category.title} />
								</ListItem> : ''}
							{category.children && category.children.length > 0 ?
								<Collapse component="li" in={this.state.category_keys[category.system_name].open} timeout="auto" unmountOnExit>
									<List dense disablePadding>
										<CategoryListItem categories={category.children} category_keys={this.state.category_keys} updateCategories={this.handleUpdateCategories} />
									</List>
								</Collapse > : ''}
						</div>
					)
				})}
			</div>
		);
	}
}

export default withStyles(styles)(CategoryListItem);