// Import Core
import classNames from 'classnames';
import React, { Component } from 'react';

// Material UI
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

// Material UI Icons
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';

// Styles: 
const styles = theme => ({
	chip: {
		margin: theme.spacing.unit / 4,
		backgroundColor: theme.palette.ylla_yellow.main
	},
	chips: {
		display: 'flex',
		flexWrap: 'wrap',
	},
	formControl: {
		margin: theme.spacing.unit,
		minWidth: 300
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
		},
	},
	textFieldFormLabel: {
		fontSize: 18,
	},
	textFieldRoot: {
		padding: 0,
		'label + &': {
			marginTop: theme.spacing.unit * 3,
		},
	}
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
};

// Class: RequestTaskQuestions
class RequestTaskQuestions extends Component {

	// constructor: call super and set up state.
	constructor(props) {
		super(props);
		this.state = {
			answers: (this.props.answers ? this.props.answers : {})
		};
	}

	// handleChangeAnswer: 
	handleChangeAnswer = (question, e) => {
		var answers = this.state.answers;
		answers[question] = e.target.value;
		this.setState({ answers: answers });
	}

	// render: render the component
	render() {
		const { classes } = this.props;
		const self = this;
		return (
			<div>
				<ListSubheader disableSticky>{this.props.service.title + ' Questions'}</ListSubheader>
				<Divider />
				<br />
				{ // For each question in the service, show the questions and answers. For questions that aren't for providers.
					self.props.service.fields ? self.props.service.fields.filter(field => { return (!field.provider_options && field.status === 'Active' && (field.target === 'consumer' || field.target === 'both')) }).map((s, i) => {
						return (
							<div key={'div_question_' + i}>
								{s.type === 'text' ? // Questions that just require a text answer.
									<div>
										<Typography variant="body2">{s.title}</Typography>
										<FormControl className={classes.formControl}>
											<TextField
												fullWidth
												className={classNames(classes.margin, classes.textField)}
												value={self.state.answers[s.title] ? self.state.answers[s.title] : ''}
												onChange={self.handleChangeAnswer.bind(this, s.title)}
												InputProps={{
													id: 'txt__question_' + i,
													name: 'txt_question_' + i,
													startAdornment: <InputAdornment position="start"><QuestionAnswerIcon /></InputAdornment>,
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
									</div> : null
								}
								{s.type === 'select' ? // Questions where there are a list of options.
									<div>
										<Typography variant="body2">{s.title}</Typography>
										<FormControl className={classes.formControl}>
											<TextField
												fullWidth
												select
												className={classNames(classes.margin, classes.textField)}
												value={self.state.answers[s.title] ? self.state.answers[s.title] : ''}
												onChange={self.handleChangeAnswer.bind(this, s.title)}
												InputProps={{
													id: 'sel_question_' + i,
													name: 'sel_question_' + i,
													startAdornment: <InputAdornment position="start"><QuestionAnswerIcon /></InputAdornment>,
													disableUnderline: true,
													classes: {
														root: classes.textFieldRoot,
														input: classes.textFieldInput,
													},
												}}
												InputLabelProps={{
													shrink: true,
													className: classes.textFieldFormLabel,
												}}
											>
												{s.options.map((o, y) => {
													return <MenuItem key={y} value={o}>{o}</MenuItem>
												})}
											</TextField>
										</FormControl>
									</div> : ''
								}
								{s.type === 'multiple' ? // Questions where multiple options can be selected.
									<div>
										<Typography variant="body2">{s.title}</Typography>
										<FormControl className={classes.formControl}>
											<Select
												multiple
												value={self.state.answers[s.title] ? self.state.answers[s.title] : []}
												onChange={self.handleChangeAnswer.bind(this, s.title)}
												input={<Input id="select-multiple-checkbox" />}
												renderValue={selected => (
													<div className={classes.chips}>
														{selected.map(value => <Chip key={value} label={value} className={classes.chip} />)}
													</div>
												)}
												MenuProps={MenuProps}
											>
												{s.options.map((o, y) => {
													return <MenuItem key={y} value={o}>
														<Checkbox checked={self.state.answers[s.title] ? self.state.answers[s.title].indexOf(o) > -1 : false} />
														<ListItemText primary={o} />
													</MenuItem>
												})}
											</Select>
										</FormControl>
									</div> : null
								}
							</div>
						)
					}) : null
				}
				<Typography variant="body2">Check your answers before continuing</Typography>
				<Button
					fullWidth
					variant="outlined"
					size="large"
					onClick={() => self.props.submitAnswers(self.state.answers)}>Apply</Button>
			</div>
		);
	}
}

export default withStyles(styles)(RequestTaskQuestions);