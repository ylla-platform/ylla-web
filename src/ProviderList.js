// Import React
import React, { Component } from 'react';

// Import Material UI
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

// Material icons
import ChatIcon from '@material-ui/icons/Chat';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ReportProblemIcon from '@material-ui/icons/ReportProblem';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';

// Material Data Tables
import MUIDataTable from "mui-datatables";

import * as providerActions from './actions/providers';

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

// Class: ProviderList
class ProviderList extends Component {

	// constructor: 
	constructor(props) {
		super(props);
		let providers = providerActions.setProviderDataList(this.props.providers);
		this.state = {
			providers: providers || [],
			page: 1,
			filterList: [[], [], [], [], [], [], []],
			currentSort: [],
			columnView: {},
			rowsPerPage: 5
		};
	}

	// componentWillReceiveProps: update the list of tasks when receiving update from parent state
	componentWillReceiveProps = (nextProps) => {
		let providers = providerActions.setProviderDataList(this.props.providers);
		this.setState({ providers: providers });
	}

	// getProviderColumnData
	getProviderColumnData = () => {
		let columns = providerActions.getProviderColumns();
		if (this.state.currentSort.length > 0) {
			columns.forEach(column => {
				if (column.name === this.state.currentSort[0]) column.sortDirection = (this.state.currentSort[1] === 'ascending' ? 'asc' : 'desc');
			});
		}
		columns.forEach(column => {
			if (this.state.columnView[column.name] === 'remove') column.options.display = false;
			if (this.state.columnView[column.name] === 'add') column.options.display = true;
		});
		columns[0].options.customBodyRender = (value) => {
			return (
				<div>
					<IconButton onClick={(e) => this.props.chatProvider(e, [value])}><ChatIcon /></IconButton>&nbsp;
					<IconButton onClick={(e) => this.props.editProviderStatus(e, [value])}><VerifiedUserIcon /></IconButton>
				</div>
			)
		}
		columns[6].options.customBodyRender = (value) => { // Status
			return (
				<div>
					{value === 'Active' ? <CheckCircleIcon color="secondary" /> : <ReportProblemIcon color="error" />}
					<Typography color={value === 'Active' ? 'default' : 'error'}>{value}</Typography>

				</div>
				
			)
		}
		return columns;
	}

	// render
	render() {
		const { classes } = this.props;
		return (
			<div className={classes.root}>
				<Paper className={classes.content} elevation={0}>
					<MUIDataTable
						title={'Businesses'}
						data={this.state.providers}
						columns={this.getProviderColumnData()}
						options={{
							filterList: this.state.filterList,
							filterType: 'multiselect',
							responsive: 'scroll',
							rowsPerPage: 5,
							rowsPerPageOptions: [5],
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

export default withStyles(styles, { withTheme: true })(ProviderList);