// Import React
import React, { Component } from 'react';

// Import Material UI
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

// Material icons
import AddCircleIcon from '@material-ui/icons/AddCircle';
import AddIcon from '@material-ui/icons/Add';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import EditIcon from '@material-ui/icons/Edit';
import PageviewIcon from '@material-ui/icons/Pageview';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import ReportProblemIcon from '@material-ui/icons/ReportProblem';
import StopIcon from '@material-ui/icons/Stop';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';

// Material Data Tables
import MUIDataTable from "mui-datatables";

// Our helpers
import * as serviceHelper from './actions/services';

// styles 
const styles = theme => ({
	content: {
		padding: 20,
		backgroundColor: '#F9F9F9',
		border: '1px solid #ccc',
		margin: 5
	},
	leftIcon: {
		marginRight: theme.spacing.unit,
	},
	root: {
		position: 'relative',
		zIndex: 100,
		overflowY: 'auto'
	}
});

// Class: ServiceList
class ServiceList extends Component {

	// constructor: sets the state
	constructor(props) {
		super(props);
		let services_state = serviceHelper.convertServicesToServicesAndQuestions(this.props.services, this.props.questions, this.props.categories);
		this.state = {
			services: services_state.services.sort((a, b) => { return a[1].localeCompare(b[1]) }),
			questions: services_state.questions.sort((a, b) => { return a[1].localeCompare(b[1]) }),
			selected_service: '',
			add_existing_question: false,
			update: true,
			services_page: 1,
			services_filterList: [[], [], [], [], [], [], [], []],
			currentServiceSort: [],
			columnServiceView: {},
			services_rowsPerPage: 3,
			questions_page: 1,
			questions_filterList: [[], [], [], [], [], [], [], []],
			currentQuestionSort: [],
			columnQuestionView: {},
			questions_rowsPerPage: 3
		}
	}

	// componentWillReceiveProps: sets the reference data list when this is updated from the parent state
	componentWillReceiveProps = (nextProps) => {
		let services_state = serviceHelper.convertServicesToServicesAndQuestions(nextProps.services, nextProps.questions, nextProps.categories);
		this.setState({
			services: services_state.services.sort((a, b) => { return a[1].localeCompare(b[1]) }),
			questions: services_state.questions.sort((a, b) => { return a[1].localeCompare(b[1]) }),
			update: true
		});
	}

	// toggleService: 
	toggleService = (e, id) => {
		let selected = this.state.selected_service;
		if (selected === '') {
			this.setState({ selected_service: id });
		} else {
			this.setState({ selected_service: '' });
		}
	}

	// shouldComponentUpdate
	shouldComponentUpdate = (nextProps, nextState) => {
		if (!nextState.update) return false;
		return true;
	}

	// addQuestionToService
	addQuestionToService = (question_id) => {
		let service_ids = [];
		service_ids.push(this.state.selected_service);
		this.props.addServiceQuestion(service_ids, question_id);
	}

	// removeQuestionFromService
	removeQuestionFromService = (question_id) => {
		let service_ids = [];
		service_ids.push(this.state.selected_service);
		this.props.removeServiceQuestion(service_ids, question_id);
	}

	// getServiceColumnData
	getServiceColumnData = (service_id) => {
		let columns = serviceHelper.getServiceColumns();
		if (this.state.currentServiceSort.length > 0) {
			columns.forEach(column => {
				if (column.name === this.state.currentServiceSort[0]) column.options.sortDirection = (this.state.currentServiceSort[1] === 'ascending' ? 'asc' : 'desc');
			});
		}
		columns.forEach(column => {
			if (this.state.columnServiceView[column.name] === 'remove') column.options.display = false;
			if (this.state.columnServiceView[column.name] === 'add') column.options.display = true;
		});
		columns[0].options.customBodyRender = (value) => {
			return (
				<div>
					<IconButton onClick={(e) => this.toggleService(e, value)}>{service_id === '' ? <PageviewIcon /> : <StopIcon />}</IconButton>
					<IconButton onClick={(e) => this.props.editService(e, [value])}><EditIcon /></IconButton>
					<IconButton onClick={(e) => this.props.editServiceStatus(e, [value])}><VerifiedUserIcon /></IconButton>
				</div>
			)
		}
		columns[7].options.customBodyRender = (value) => { // Status
			return (
				<div>
					{value === 'Active' ? <CheckCircleIcon color="secondary" /> : <ReportProblemIcon color="error" />}
					<Typography color={value === 'Active' ? 'default' : 'error'}>{value}</Typography>

				</div>
				
			)
		}
		return columns;
	}

	// getQuestionColumnData
	getQuestionColumnData = (service_id) => {
		let columns = serviceHelper.getQuestionColumns();
		if (this.state.currentQuestionSort.length > 0) {
			columns.forEach(column => {
				if (column.name === this.state.currentQuestionSort[0]) column.options.sortDirection = (this.state.currentQuestionSort[1] === 'ascending' ? 'asc' : 'desc');
			});
		}
		columns.forEach(column => {
			if (this.state.columnQuestionView[column.name] === 'remove') column.options.display = false;
			if (this.state.columnQuestionView[column.name] === 'add') column.options.display = true;
		});
		if (this.state.selected_service !== '' && this.state.add_existing_question) {
			columns[0].options.customBodyRender = (value) => {
				return (
					<div>
						<IconButton onClick={(e) => this.addQuestionToService(value)}><AddCircleIcon /></IconButton>
					</div>
				)
			}
		} else if (this.state.selected_service !== '' && !this.state.add_existing_question) {
			columns[0].options.customBodyRender = (value) => {
				return (
					<div>
						<IconButton onClick={(e) => this.props.editQuestion(e, [value])}><EditIcon /></IconButton>
						<IconButton onClick={(e) => this.removeQuestionFromService(value)}><RemoveCircleIcon /></IconButton>
					</div>
				)
			}
		} else {
			columns[0].options.customBodyRender = (value) => {
				return (
					<div>
						<IconButton onClick={(e) => this.props.editQuestion(e, [value])}><EditIcon /></IconButton>
						<IconButton onClick={(e) => this.props.editQuestionStatus(e, [value])}><VerifiedUserIcon /></IconButton>
					</div>
				)
			}
		}
		columns[7].options.customBodyRender = (value) => { // Status
			return (
				<div>
					{value === 'Active' ? <CheckCircleIcon color="default" /> : <ReportProblemIcon color="error" />}
					<Typography color={value === 'Active' ? 'default' : 'error'}>{value}</Typography>

				</div>
				
			)
		}
		return columns;
	}

	// render: 
	render() {
		const { classes } = this.props;
		return (
			<div className={classes.root}>
				<Paper className={classes.content} elevation={0}>
					{!this.state.add_existing_question && this.state.selected_service === '' ?
						<Button   onClick={(e) => this.props.addService(e, [])}>
							<AddIcon className={classes.leftIcon} />Add new service
						</Button> : null}
					{!this.state.add_existing_question && this.state.selected_service !== '' ?
						<Button   onClick={(e) => this.setState({ add_existing_question: true, update: true })}>
							Assign question to service
						</Button> : null}
					{this.state.add_existing_question && this.state.selected_service !== '' ?
						<Button   onClick={(e) => this.setState({ add_existing_question: false, update: true })}>
							Finish assigning questions
						</Button> : null}
					{!this.state.add_existing_question ? 
						<Button   onClick={(e) => this.props.addQuestion(e, [])}>
							<AddIcon className={classes.leftIcon} />Add new question
						</Button> : null}
					<MUIDataTable
						title={'Services'}
						data={this.state.services
							.filter(service => {
								if (this.state.selected_service === '') return true;
								return this.state.selected_service === service[0];
							})}
						columns={this.getServiceColumnData(this.state.selected_service)}
						options={{
							filterList: this.state.services_filterList,
							filterType: 'multiselect',
							responsive: 'scroll',
							rowsPerPage: this.state.services_rowsPerPage,
							rowsPerPageOptions: [3, 5, 10],
							selectableRows: false,
							rowHover: false,
							print: false,
							onColumnSortChange: (name, direction) => {
								this.setState({ currentQuestionSort: [name, direction] })
							},
							onColumnViewChange: (changedColumn, action) => {
								let columnView = this.state.columnServiceView;
								columnView[changedColumn] = action;
								this.setState({ columnServiceView: columnView });
							},
							onChangePage: (page) => {
								this.setState({ services_page: page });
							},
							onFilterChange: (column, filterList) => {
								this.setState({ services_filterList: filterList });
							},
							onChangeRowsPerPage: (rows) => {
								this.setState({ services_rowsPerPage: rows });
							}
						}}
					/>
					<br />
					<MUIDataTable
						title={'Questions'}
						data={this.state.questions
							.filter(question => {
								let found = false;
								if (this.state.selected_service === '') found = true;
								if (this.state.add_existing_question) {
									found = true;
								} else {
									if (this.state.selected_service !== '') {
										this.props.services.forEach(s => {
											if (s.fields && s.id === this.state.selected_service) {
												s.fields.forEach(q => {
													if (q.id === question[0]) found = true;
												});
											}
										});
									}
								}
								return found;
							})}
						columns={this.getQuestionColumnData(this.state.selected_service)}
						options={{
							filterList: this.state.questions_filterList,
							filterType: 'multiselect',
							responsive: 'scroll',
							rowsPerPage: this.state.questions_rowsPerPage,
							rowsPerPageOptions: [3, 5, 10],
							selectableRows: false,
							rowHover: false,
							print: false,
							onColumnSortChange: (name, direction) => {
								this.setState({ currentQuestionSort: [name, direction] })
							},
							onColumnViewChange: (changedColumn, action) => {
								let columnView = this.state.columnQuestionView;
								columnView[changedColumn] = action;
								this.setState({ columnQuestionView: columnView });
							},
							onChangePage: (page) => {
								this.setState({ questions_page: page });
							},
							onFilterChange: (column, filterList) => {
								this.setState({ questions_filterList: filterList });
							},
							onChangeRowsPerPage: (rows) => {
								this.setState({ questions_rowsPerPage: rows });
							}
						}}
					/>
				</Paper>
			</div>
		);
	}
}

export default withStyles(styles, { withTheme: true })(ServiceList);