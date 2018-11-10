// Import React
import React, { Component } from 'react';

// Import Material UI
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

// Material icons
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ReportProblemIcon from '@material-ui/icons/ReportProblem';

// Material Data Tables
import MUIDataTable from "mui-datatables";

// 
import * as taskActions from './actions/tasks';

import moment from 'moment';

// styles 
const styles = theme => ({
	content: {
		padding: 20,
		backgroundColor: '#F9F9F9',
		border: '1px solid #ccc',
		margin: 5
	},
	root: {
		zIndex: 100,
		position: 'relative',
		overflowY: 'auto'
	}
});
// Class: TaskList
class TaskList extends Component {
	// constructor: 
	constructor(props) {
		super(props);
		let tasks = taskActions.setTasksDataList(this.props.tasks, this.props.agents, this.props.providers, this.props.services, this.props.consumers);
		this.state = {
			tasks: tasks,
			page: 1,
			filterList: [[], [], [], [], [], [], [], [], [], []],
			currentSort: [],
			columnView: {},
			rowsPerPage: 5
		};
	}
	// componentWillReceiveProps: set the tasks from the parent state
	componentWillReceiveProps = (nextProps) => {
		let tasks = taskActions.setTasksDataList(nextProps.tasks, nextProps.agents, nextProps.providers, nextProps.services, nextProps.consumers);
		this.setState({
			tasks: tasks
		});
	}
	// getTaskColumnData: 
	getTaskColumnData = () => {
		let columns = taskActions.getTaskColumns();
		columns.forEach(column => {
			if (this.state.columnView[column.name] === 'remove') column.options.display = false;
			if (this.state.columnView[column.name] === 'add') column.options.display = true;
		});
		if (this.state.currentSort.length > 0) {
			columns.forEach(column => {
				if (column.name === this.state.currentSort[0]) column.sortDirection = (this.state.currentSort[1] === 'ascending' ? 'asc' : 'desc');
			});
		}
		columns[6].options.customBodyRender = (value) => {
			return moment(value).format('DD/MM/YYYY HH:mm');
		}
		columns[7].options.customBodyRender = (value) => {
			return (value !== '' ? moment(value).format('DD/MM/YYYY HH:mm') : '');
		}
		columns[8].options.customBodyRender = (value) => {
			return moment(value).format('DD/MM/YYYY HH:mm');
		}
		columns[9].options.customBodyRender = (value) => { // Status
			return (
				<div>
					{value === 'Active' ? <CheckCircleIcon color="secondary" /> : <ReportProblemIcon color="error" />}
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
					<MUIDataTable
						title={'Tasks'}
						data={this.state.tasks}
						columns={this.getTaskColumnData()}
						options={{
							page: this.state.page,
							filterList: this.state.filterList,
							filterType: 'multiselect',
							responsive: 'scroll',
							rowsPerPage: this.state.rowsPerPage,
							rowsPerPageOptions: [5, 10, 20],
							selectableRows: false,
							rowHover: false,
							print: false,
							onColumnSortChange: (name, direction) => {
								this.setState({ currentSort: [name, direction] })
							},
							onColumnViewChange: (changedColumn, action) => {
								let columnView = this.state.columnView;
								columnView[changedColumn] = action;
								this.setState({ columnView: columnView });
							},
							onChangePage: (page) => {
								this.setState({ page: page });
							},
							onFilterChange: (column, filterList) => {
								this.setState({ filterList: filterList });
							},
							onChangeRowsPerPage: (rows) => {
								this.setState({ rowsPerPage: rows });
							}
						}}
					/>
				</Paper>
			</div>
		);
	}
}

export default withStyles(styles, { withTheme: true })(TaskList);