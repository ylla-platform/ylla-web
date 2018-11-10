// Import React Stuff
import PropTypes from 'prop-types';
import React from 'react';

// Import Material UI stuff
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import { withStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';

// Icons
import DeleteIcon from '@material-ui/icons/Delete';
import { Divider } from '@material-ui/core';

// Styles: 
const styles = theme => ({
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

// Class: CategoryEdit
class CategoryEdit extends React.Component {
	// constructor: 
	constructor(props) {
		super(props);
		this.state = {
			open: false,
			category: this.props.category,
			title: (this.props.category && this.props.category.title ? this.props.category.title : ''),
			osm_tags: (this.props.category && this.props.category.osm_tags ? this.props.category.osm_tags : []),
			colour: (this.props.category && this.props.category.colour ? this.props.category.colour : '#6BC892'),
			parent: (this.props.category && this.props.category.parent ? this.props.category.parent : ''),
			featured: (this.props.category && this.props.category.featured ? this.props.category.featured : false)
		};
	}
	// componentWillReceiveProps: 
	componentWillReceiveProps = (nextProps) => {
		if (nextProps.category === this.state.category) {
			this.setState({ open: nextProps.open });
		} else {
			this.setState({
				open: nextProps.open,
				category: nextProps.category,
				title: (nextProps.category && nextProps.category.title ? nextProps.category.title : ''),
				osm_tags: (nextProps.category && nextProps.category.osm_tags ? nextProps.category.osm_tags : []),
				colour: (nextProps.category && nextProps.category.colour ? nextProps.category.colour : '#6BC892'),
				parent: (nextProps.category && nextProps.category.parent ? nextProps.category.parent : ''),
				featured: (nextProps.category && nextProps.category.featured ? nextProps.category.featured : false)
			});
		}
	}
	// handleAddOSMTag
	handleAddOSMTag = () => {
		if (this.state.osm_tag !== '') {
			let tags = this.state.osm_tags;
			tags.push(this.state.osm_tag);
			this.setState({ osm_tags: tags, osm_tag: '' });
		}
	}
	// handleDeleteOSMTag
	handleDeleteOSMTag = (idx, event) => {
		let tags = this.state.osm_tags;
		tags.splice(idx, 1);
		this.setState({ osm_tags: tags });
	}
	// handleSave: 
	handleSave = () => {
		var category = this.state.category;
		category.parent = this.state.parent;
		category.osm_tags = this.state.osm_tags;
		category.osm_icon = this.state.osm_icon;
		category.ylla_icon = this.state.ylla_icon;
		category.title = this.state.title;
		category.featured = this.state.featured;
		category.colour = this.state.colour;
		this.props.saveCategory(category);
	}
	// render: 
	render() {
		const { fullScreen, classes } = this.props;
		return (
			<div>
				<Dialog
					fullScreen={fullScreen}
					open={this.state.open}
					onRequestClose={this.props.serviceEditDialogClose}
				>
					<DialogTitle>{this.state.category.title ? "Edit category" : "Create Category"}</DialogTitle>
					<DialogContent>
						<TextField
							autoFocus
							margin="dense"
							id="txt-title"
							label="Title"
							value={this.state.title}
							onChange={(event) => this.setState({ title: event.target.value })}
							type="text"
							InputProps={{
								name: 'txt-title',
								id: 'txt-title',
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
							autoFocus
							margin="dense"
							id="txt-parent"
							label="Parent category"
							value={this.state.parent}
							onChange={(event) => this.setState({ parent: event.target.value })}
							type="text"
							InputProps={{
								name: 'txt-parent',
								id: 'txt-parent',
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
							autoFocus
							margin="dense"
							id="txt-colour"
							label="Colour"
							value={this.state.colour}
							onChange={(event) => this.setState({ colour: event.target.value })}
							type="text"
							InputProps={{
								name: 'txt-colour',
								id: 'txt-colour',
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
						<FormControlLabel
							control={
								<Switch
									checked={this.state.featured}
									onChange={(event, checked) => this.setState({ featured: checked })}

								/>
							}
							label="Featured"
						/>
						<br />
						<Divider />
						<br />
						<TextField
							autoFocus
							margin="dense"
							id="txt-osmtag"
							label="OpenStreetMap tags"
							value={this.state.osm_tag}
							onChange={(event) => this.setState({ osm_tag: event.target.value })}
							type="text"
							InputProps={{
								name: 'txt-osmtag',
								id: 'txt-osmtag',
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
						<Button fullWidth onClick={this.handleAddOSMTag}>Add tag</Button>
						<br />
						{this.state.osm_tags ?
							<div>
								<List>
									{this.state.osm_tags.map((tag, idx) => {
										return (
											<ListItem
												dense
												key={'li_osmtag_' + idx}>
												<ListItemText primary={tag} />
												<ListItemSecondaryAction>
													<IconButton aria-label="Delete" onClick={this.handleDeleteOSMTag.bind(this, idx)}>
														<DeleteIcon />
													</IconButton>
												</ListItemSecondaryAction>
											</ListItem>
										)
									})}
								</List>
							</div>
							: null}
						<Divider />
					</DialogContent>
					<DialogActions>
						<Button onClick={this.handleSave}  >Save</Button>
						<Button onClick={this.props.categoryEditDialogClose} autoFocus>Cancel</Button>
					</DialogActions>
				</Dialog>
			</div>
		);
	}
}

// 
CategoryEdit.propTypes = {
	fullScreen: PropTypes.bool.isRequired
};

export default withStyles(styles)(CategoryEdit);