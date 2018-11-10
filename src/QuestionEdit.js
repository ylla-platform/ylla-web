// Import React Stuff
import compose from 'recompose/compose';
import PropTypes from 'prop-types';
import React from 'react';

// Import Material UI stuff
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import withMobileDialog from '@material-ui/core/withMobileDialog';

// Styles
const styles = theme => ({
	formControl: {
		margin: theme.spacing.unit,
		minWidth: 350,
		maxWidth: 350,
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

// Class: QuestionEdit. 
class QuestionEdit extends React.Component {
	// constructor: 
	constructor(props) {
		super(props);
		this.state = {
			// Functional 
			open: this.props.open,
			question: this.props.question,
			// Question fields
			title: (this.props.question && this.props.question.title ? this.props.question.title : ''),
			system_name: (this.props.question && this.props.question.system_name ? this.props.question.system_name : ''),
			type: (this.props.question && this.props.question.type ? this.props.question.type : ''),
			target: (this.props.question && this.props.question.target ? this.props.question.target : ''),
			provider_title: (this.props.question && this.props.question.provider_title ? this.props.question.provider_title : ''),
			options: (this.props.question && this.props.question.options ? this.props.question.options : []),
			provider_answers: (this.props.question && this.props.question.provider_answers ? this.props.question.provider_answers : []),
			provider_options: (this.props.question && this.props.question.provider_options && this.props.provider_options === true ? true : false),
			provider_optionsprice: (this.props.question && this.props.question.provider_optionsprice && this.props.provider_optionsprice === true ? true : false),
			provider_optionssize: (this.props.question && this.props.question.provider_optionssize && this.props.provider_optionssize === true ? true : false),
			provider_optionsimage: (this.props.question && this.props.question.provider_optionsimage && this.props.provider_optionsimage === true ? true : false),
			mandatory: (this.props.question && this.props.question.mandatory && this.props.mandatory === true ? true : false)
		};
		this.handleSave = this.handleSave.bind(this);
	}
	// componentWillReceiveProps:
	componentWillReceiveProps = (nextProps) => {
		if (nextProps.question === this.state.question) {
			this.setState({ open: nextProps.open });
		} else {
			this.setState({
				// Functional
				open: nextProps.open,
				question: nextProps.question,
				// Question fields
				title: (nextProps.question && nextProps.question.title ? nextProps.question.title : ''),
				system_name: (nextProps.question && nextProps.question.system_name ? nextProps.question.system_name : ''),
				type: (nextProps.question && nextProps.question.type ? nextProps.question.type : ''),
				target: (nextProps.question && nextProps.question.target ? nextProps.question.target : ''),
				provider_title: (nextProps.question && nextProps.question.provider_title ? nextProps.question.provider_title : ''),
				options: (nextProps.question && nextProps.question.options ? nextProps.question.options : []),
				provider_answers: (nextProps.question && nextProps.question.provider_answers ? nextProps.question.provider_answers : []),
				provider_options: (nextProps.question && nextProps.question.provider_options && nextProps.question.provider_options === true ? true : false),
				provider_optionsprice: (nextProps.question && nextProps.question.provider_optionsprice && nextProps.question.provider_optionsprice === true ? true : false),
				provider_optionssize: (nextProps.question && nextProps.question.provider_optionssize && nextProps.question.provider_optionssize === true ? true : false),
				provider_optionsimage: (nextProps.question && nextProps.question.provider_optionsimage && nextProps.question.provider_optionsimage === true ? true : false),
				mandatory: (nextProps.question && nextProps.question.mandatory && nextProps.question.mandatory === true ? true : false)
			});
		}
	}
	// handleSave
	handleSave = () => {

		// Validation
		if (!this.state.title || this.state.title === '') return null;

		// 
		var question = this.state.question;
		question.title = this.state.title;
		question.system_name = this.state.system_name;
		question.type = this.state.type;
		question.target = this.state.target;
		question.provider_title = this.state.provider_title;
		question.options = this.state.options;
		question.provider_answers = this.state.provider_answers;
		question.provider_options = this.state.provider_options;
		question.provider_optionsprice = this.state.provider_optionsprice;
		question.provider_optionssize = this.state.provider_optionssize;
		question.provider_optionsimage = this.state.provider_optionsimage;
		question.mandatory = this.state.mandatory;
		this.props.saveQuestion(question);
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
					onRequestClose={this.props.questionEditDialogClose}
				>
					<DialogTitle>{this.props.question && this.props.question.id ? 'Edit question' : 'Add question'}</DialogTitle>
					<DialogContent>
						<FormControl className={classes.formControl}>
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
						</FormControl>
						<br />
						<FormControl className={classes.formControl}>
							<TextField
								select
								label="Question type"
								value={this.state.type}
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
								<MenuItem value="text">Text</MenuItem>
								<MenuItem value="select">Select</MenuItem>
								<MenuItem value="multiple">Multiple select</MenuItem>
							</TextField>
						</FormControl>
						<br />
						<FormControl className={classes.formControl}>
							<TextField
								select
								value={this.state.target}
								label="Question for"
								onChange={(event) => this.setState({ target: event.target.value })}
								input={<Input name="sel-target" id="sel-target" />}
								InputProps={{
									name: 'sel-target',
									id: 'sel-target',
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
								<MenuItem value="consumer">Consumer</MenuItem>
								<MenuItem value="provider">Provider</MenuItem>
								<MenuItem value="both">Both</MenuItem>
							</TextField>
						</FormControl>
						<br />
						<FormControl className={classes.formControl}>
							<TextField
								margin="dense"
								id="txt-providertitle"
								label="Provider question"
								value={this.state.provider_title}
								onChange={(event) => this.setState({ provider_title: event.target.value })}
								type="text"
								InputProps={{
									name: 'txt-providertitle',
									id: 'txt-providertitle',
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
								margin="dense"
								id="txt-options"
								label="Customer answers"
								value={this.state.options && Array.isArray(this.state.options) ? this.state.options.join('|') : ''}
								onChange={(event) => this.setState({ options: event.target.value.split('|') })}
								type="text"
								InputProps={{
									name: 'txt-options',
									id: 'txt-options',
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
								margin="dense"
								id="txt-provideranswers"
								label="Provider answers"
								value={this.state.provider_answers && Array.isArray(this.state.provider_answers) ? this.state.provider_answers.join('|') : ''}
								onChange={(event) => this.setState({ provider_answers: event.target.value.split('|') })}
								type="text"
								InputProps={{
									name: 'txt-provideranswers',
									id: 'txt-provideranswers',
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
								label="Use provider product options"
								value={this.state.provider_options && this.state.provider_options === true ? 'yes' : 'no'}
								onChange={(event) => this.setState({ provider_options: (event.target.value === 'no' ? false : true) })}
								input={<Input name="sel-provideroptions" id="sel-provideroptions" />}
								InputProps={{
									name: 'sel-provideroptions',
									id: 'sel-provideroptions',
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
								<MenuItem value="no">No</MenuItem>
								<MenuItem value="yes">Yes</MenuItem>
							</TextField>
						</FormControl>
						<br />
						{this.state.provider_options ?
							<FormControl className={classes.formControl}>
								<TextField
									select
									label="Include price"
									value={this.state.provider_optionsprice && this.state.provider_optionsprice === true ? 'yes' : 'no'}
									onChange={(event) => this.setState({ provider_optionsprice: (event.target.value === 'no' ? false : true) })}
									input={<Input name="sel-provideroptionsprice" id="sel-provideroptionsprice" />}
									InputProps={{
										name: 'sel-provideroptionsprice',
										id: 'sel-provideroptionsprice',
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
									<MenuItem value="no">No</MenuItem>
									<MenuItem value="yes">Yes</MenuItem>
								</TextField>
							</FormControl> : null}
						<br />
						{this.state.provider_options ?
							<FormControl className={classes.formControl}>
								<TextField
									select
									label="Include image"
									value={this.state.provider_optionsimage && this.state.provider_optionsimage === true ? 'yes' : 'no'}
									onChange={(event) => this.setState({ provider_optionsimage: (event.target.value === 'no' ? false : true) })}
									input={<Input name="sel-provideroptionsimage" id="sel-provideroptionsimage" />}
									InputProps={{
										name: 'sel-provideroptionsimage',
										id: 'sel-provideroptionsimage',
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
									<MenuItem value="no">No</MenuItem>
									<MenuItem value="yes">Yes</MenuItem>
								</TextField>
							</FormControl> : null}
						<br />
						{this.state.provider_options ?
							<FormControl className={classes.formControl}>
								<TextField
									select
									label="Include size"
									value={this.state.provider_optionssize && this.state.provider_optionssize === true ? 'yes' : 'no'}
									onChange={(event) => this.setState({ provider_optionssize: (event.target.value === 'no' ? false : true) })}
									input={<Input name="sel-provideroptionssize" id="sel-provideroptionssize" />}
									InputProps={{
										name: 'sel-provideroptionssize',
										id: 'sel-provideroptionssize',
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
									<MenuItem value="no">No</MenuItem>
									<MenuItem value="yes">Yes</MenuItem>
								</TextField>
							</FormControl> : null}
					</DialogContent>
					<DialogActions>
						<Button onClick={this.handleSave}  >
							Save
						</Button>
						<Button onClick={this.props.questionEditDialogClose}   autoFocus>
							Cancel
						</Button>
					</DialogActions>
				</Dialog>
			</div>
		);
	}
}

// 
QuestionEdit.propTypes = {
	fullScreen: PropTypes.bool.isRequired,
};

export default compose(withStyles(styles), withMobileDialog())(QuestionEdit);