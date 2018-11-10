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
import MUIDataTable from 'mui-datatables';

// Consumer actions
import * as consumerActions from './actions/consumers';

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

// Class: ConsumerList
class ConsumerList extends Component {

	// constructor: sets the state
	constructor(props) {
		super(props);
		let consumers = consumerActions.setConsumerDataList(this.props.consumers).sort((a, b) => { return a[2].localeCompare(b[2]) });
		this.state = {
			consumers: consumers,
			page: 1,
			filterList: [[], [], [], [], [], [], [], [], [], [], []],
			currentSort: [],
			columnView: {},
			rowsPerPage: 5
		};
	}

	// componentWillReceiveProps: sets the consumer list when this is updated from the parent state
	componentWillReceiveProps = (nextProps) => {
		let consumers = consumerActions.setConsumerDataList(nextProps.consumers).sort((a, b) => { return a[2].localeCompare(b[2]) });
		this.setState({
			consumers: consumers
		});
	}

	// getConsumerColumnData
	getConsumerColumnData = () => {
		let columns = consumerActions.getConsumerColumns();
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
					<IconButton onClick={(e) => this.props.chatConsumer(e, [value])}><ChatIcon /></IconButton>
					<IconButton onClick={(e) => this.props.editConsumerStatus(e, [value])}><VerifiedUserIcon /></IconButton>
				</div>
			)
		}
		columns[10].options.customBodyRender = (value) => { // Status
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
						title={'Customers'}
						data={this.state.consumers}
						columns={this.getConsumerColumnData()}
						options={{
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

export default withStyles(styles, { withTheme: true })(ConsumerList);