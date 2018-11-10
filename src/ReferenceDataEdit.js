// Import React Stuff
import PropTypes from 'prop-types';
import React from 'react';

// Import Material UI stuff
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

// Icons
import AddIcon from '@material-ui/icons/Add';
import * as icons from '@material-ui/icons';

// Styles
const styles = theme => ({
	container: {
		display: 'flex',
		flexWrap: 'wrap',
	},
	formControl: {
		margin: theme.spacing.unit,
		minWidth: 350,
		maxWidth: 350
	},
	leftIcon: {
		marginRight: theme.spacing.unit,
	},
	selectEmpty: {
		marginTop: theme.spacing.unit * 2,
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

// Class: ReferenceDataEdit. 
class ReferenceDataEdit extends React.Component {
	// constructor: 
	constructor(props) {
		super(props);
		this.state = {
			// Functional 
			open: this.props.open,
			referencedataitem: this.props.referencedataitem || {},
			// Reference data fields
			text: (this.props.referencedataitem && this.props.referencedataitem.text ? this.props.referencedataitem.text : ''),
			system_name: (this.props.referencedataitem && this.props.referencedataitem.system_name ? this.props.referencedataitem.system_name : ''),
			type: (this.props.referencedataitem && this.props.referencedataitem.type ? this.props.referencedataitem.type : ''),
			icon: (this.props.referencedataitem && this.props.referencedataitem.icon ? this.props.referencedataitem.icon : ''),
			custom: (this.props.referencedataitem && this.props.referencedataitem.custom ? this.props.referencedataitem.custom : {}),
			custom_name: '',
			custom_value: ''
		};
	}
	// componentWillReceiveProps:
	componentWillReceiveProps = (nextProps) => {
		if (nextProps.referencedataitem === this.state.referencedataitem) {
			this.setState({ open: nextProps.open });
		} else {
			this.setState({
				// Functional
				open: nextProps.open,
				referencedataitem: nextProps.referencedataitem || {},
				// Question fields
				text: (nextProps.referencedataitem && nextProps.referencedataitem.text ? nextProps.referencedataitem.text : ''),
				system_name: (nextProps.referencedataitem && nextProps.referencedataitem.system_name ? nextProps.referencedataitem.system_name : ''),
				type: (nextProps.referencedataitem && nextProps.referencedataitem.type ? nextProps.referencedataitem.type : ''),
				icon: (nextProps.referencedataitem && nextProps.referencedataitem.icon ? nextProps.referencedataitem.icon : ''),
				custom: (nextProps.referencedataitem && nextProps.referencedataitem.custom ? nextProps.referencedataitem.custom : {})
			});
		}
	}
	// addCustomField
	addCustomField = () => {
		var fields = this.state.custom;
		if (this.state.custom_name !== '' && this.state.custom_value !== '') {
			fields[this.state.custom_name] = this.state.custom_value;
			this.setState({ custom: fields, custom_name: '', custom_value: '' });
		}
	}
	// editCustomField
	deleteCustomField = (name) => {
		let fields = this.state.custom;
		delete fields[name];
		this.setState({ custom: fields });
	}
	// handleSave: 
	handleSave = () => {
		// Validation
		if (!this.state.text || this.state.text === '') return null;
		// Build up the item
		let referencedataitem = this.state.referencedataitem;
		referencedataitem.text = this.state.text;
		referencedataitem.system_name = this.state.system_name;
		referencedataitem.type = this.state.type;
		referencedataitem.icon = this.state.icon;
		referencedataitem.custom = this.state.custom;
		this.props.saveReferenceDataItem(referencedataitem);
	}
	// render: 
	render() {
		const { fullScreen } = this.props;
		const { classes } = this.props;
		return (
			<div>
				<Dialog
					fullScreen={fullScreen}
					open={this.state.open}
					onRequestClose={this.props.referenceDataItemEditDialogClose}
				>
					<DialogTitle>{this.props.referencedataitem && this.props.referencedataitem.id ? 'Edit text item' : 'Add text item'}</DialogTitle>
					<DialogContent>
						<FormControl className={classes.formControl}>
							<TextField
								autoFocus
								margin="dense"
								id="txt-text"
								label="Text"
								value={this.state.text}
								onChange={(event) => this.setState({ text: event.target.value })}
								type="text"
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
							/>
						</FormControl>
						<br />
						<FormControl className={classes.formControl}>
							<TextField
								select
								value={this.state.type}
								label="Type"
								onChange={(event) => this.setState({ type: event.target.value })}
								input={<Input name="sel-type" id="sel-type" />}
								InputProps={{
									name: 'sel-type',
									id: 'sel-type',
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
								<MenuItem value="payment_type">Payment type</MenuItem>
								<MenuItem value="payment_deadline">Payment deadline</MenuItem>
								<MenuItem value="location_amenity">Provider amenity</MenuItem>
								<MenuItem value="transportation_type">Transportation type</MenuItem>
							</TextField>
						</FormControl>
						<br />
						<FormControl className={classes.formControl}>
							<TextField
								select
								value={this.state.icon}
								onChange={(event) => this.setState({ icon: event.target.value })}
								input={<Input name="sel-icon" id="sel-icon" />}
								label="Icon"
								InputProps={{
									name: 'sel-icon',
									id: 'sel-icon',
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
								<MenuItem value="">None</MenuItem>
								{Object.keys(icons).map(icon => {
									return <MenuItem value={icon}>{icon}</MenuItem>
								})}
							</TextField>
						</FormControl>
						<br />
						<ListSubheader>Add custom field</ListSubheader>
						<Divider />
						<FormControl className={classes.formControl}>
							<TextField
								autoFocus
								margin="dense"
								id="txt-customname"
								label="Title"
								value={this.state.custom_name}
								onChange={(event) => this.setState({ custom_name: event.target.value })}
								type="text"
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
							/>
						</FormControl>
						<br />
						<FormControl className={classes.formControl}>
							<TextField
								autoFocus
								margin="dense"
								id="txt-customvalue"
								label="Value"
								value={this.state.custom_value}
								onChange={(event) => this.setState({ custom_value: event.target.value })}
								type="text"
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
							/>
						</FormControl>
						<br />
						<Button onClick={(e) => this.addCustomField()}  >
							<AddIcon className={classes.leftIcon} />Add field
						</Button>
						<br />
						<List dense="true">
							{Object.keys(this.state.custom).map(field => {
								const { Delete } = icons;
								return (
									<ListItem>
										<ListItemText
											primary={'Text: ' + field + '. Value: ' + this.state.custom[field]}
										/>
										<ListItemSecondaryAction>
											<IconButton   onClick={(e) => this.deleteCustomField(field)}>
												<Delete />
											</IconButton>
										</ListItemSecondaryAction>
									</ListItem>
								)
							})}
						</List>
					</DialogContent>
					<DialogActions>
						<Button onClick={this.handleSave}  >
							Save
						</Button>
						<Button onClick={this.props.referenceDataItemEditDialogClose}   autoFocus>
							Cancel
						</Button>
					</DialogActions>
				</Dialog>
			</div>
		);
	}
}

// 
ReferenceDataEdit.propTypes = {
	fullScreen: PropTypes.bool.isRequired,
};

export default withStyles(styles)(ReferenceDataEdit);