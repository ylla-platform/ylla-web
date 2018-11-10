// Import React
import React, { Component } from 'react';

// Import Material UI
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

// Material icons
import * as icons from '@material-ui/icons';
import AddIcon from '@material-ui/icons/Add';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import EditIcon from '@material-ui/icons/Edit';
import ReportProblemIcon from '@material-ui/icons/ReportProblem';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';

// Material Data Tables
import MUIDataTable from "mui-datatables";

// Our Helpers
import * as referenceDataHelper from './actions/referencedata';

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
		zIndex: 100,
		position: 'relative',
		overflowY: 'auto'
	}
});

// Class: ReferenceDataList
class ReferenceDataList extends Component {

	// constructor: sets the state
	constructor(props) {
		super(props);
		let data = referenceDataHelper.convertReferenceDataToListArray(this.props.referencedata).sort((a, b) => { return a[1].localeCompare(b[1]) });
		this.state = {
			referencedata: data,
			page: 1,
			filterList: [[], [], [], [], []],
			currentSort: [],
			columnView: {},
			rowsPerPage: 5
		};
	}

	// componentWillReceiveProps: sets the reference data list when this is updated from the parent state
	componentWillReceiveProps = (nextProps) => {
		let data = referenceDataHelper.convertReferenceDataToListArray(nextProps.referencedata).sort((a, b) => { return a[1].localeCompare(b[1]) });
		this.setState({
			referencedata: data
		});
	}

	// getReferenceDataColumnData
	getReferenceDataColumnData = () => {
		let columns = referenceDataHelper.getReferenceDataColumns();
		if (this.state.currentSort.length > 0) {
			columns.forEach(column => {
				if (column.name === this.state.currentSort[0]) column.sortDirection = (this.state.currentSort[1] === 'ascending' ? 'asc' : 'desc');
			});
		}
		columns.forEach(column => {
			if (this.state.columnView[column.name] === 'remove') column.options.display = false;
		});
		columns[0].options.customBodyRender = (value) => {
			return (
				<div>
					<IconButton onClick={() => this.props.editReferenceDataItem([value])}><EditIcon /></IconButton>
					<IconButton onClick={(e) => this.props.editReferenceDataStatus(e, [value])}><VerifiedUserIcon /></IconButton>
				</div>
			)
		}
		// Icon column
		columns[3].options.customBodyRender = (value) => {
			let Icon = icons[value];
			return (
				<div>
					{Icon && value && value !== '' ? <Icon /> : null}
				</div>
			)
		}
		columns[4].options.customBodyRender = (value) => { // Status
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
					<Button   onClick={() => this.props.addReferenceDataItem([])}>
						<AddIcon className={classes.leftIcon} />Add new item
					</Button>
					<MUIDataTable
						title={'Custom text'}
						data={this.state.referencedata}
						columns={this.getReferenceDataColumnData()}
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

export default withStyles(styles, { withTheme: true })(ReferenceDataList);