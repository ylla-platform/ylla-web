// Import React
import React, { Component } from 'react';

// Import Material UI
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

// Material icons
import AddIcon from '@material-ui/icons/Add';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import EditIcon from '@material-ui/icons/Edit';
import ReportProblemIcon from '@material-ui/icons/ReportProblem';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';


// Material Data Tables
import MUIDataTable from "mui-datatables";
import * as notificationActions from './actions/notifications';
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

class AdminNotifications extends Component {
	// constructor: sets the state
	constructor(props) {
		super(props);
		
		let adminnotifications = this.props.adminnotifications; 
		// here convert  json to [[]]

		this.state = {
			adminnotifications: adminnotifications,
			page: 1,
			// filterList: [[], [], []],
			currentSort: [],
			columnView: {},
			rowsPerPage: 5
		};
	}
	// render: 
	render() {
		const { classes } = this.props;

		 const data = [
      ["Gabby George", "Business Analyst", "Minneapolis"],
      ["Business Analyst", "Business Consultant", "Dallas"],
      ["Jaden Collins", "Attorney", "Santa Ana"]
    ];

		return (
			<div className={classes.root}>
				<Paper className={classes.content} elevation={0}>
					<Button>
						<AddIcon className={classes.leftIcon} />Add new category
					</Button>
					<MUIDataTable
						title={'Notifications'}
						data={data} // {this.state.adminnotifications}
						columns={notificationActions.getNotificationsColumns()}
						options={{
							// filterList: this.state.filterList,
							filterType: 'multiselect',
							responsive: 'scroll',
							rowsPerPage: this.state.rowsPerPage,
							rowsPerPageOptions: [5, 10, 20],
							selectableRows: false,
							rowHover: false,
							print: true,
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

export default withStyles(styles, { withTheme: true })(AdminNotifications);
