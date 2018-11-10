// Import React
import React, { Component } from 'react';
import moment from 'moment';

// Import Material UI
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

// Material icons
import AddIcon from '@material-ui/icons/Add';
import ChatIcon from '@material-ui/icons/Chat';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import ReportProblemIcon from '@material-ui/icons/ReportProblem';

// Material Data Tables
import MUIDataTable from "mui-datatables";

// Our actions
import * as agentActions from './actions/agents';

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

// Class: AgentList
class AgentList extends Component {

	// constructor: sets the state
	constructor(props) {
		super(props);
		let agents = agentActions.setAgentDataList(this.props.agents, this.props.providers, this.props.tasks, this.props.services).sort((a, b) => { return a[5].localeCompare(b[5]) });
		this.state = {
			agents: agents || [],
			page: 1,
			filterList: [[], [], [], [], [], [], [], [], [], [], [], []],
			currentSort: [],
			columnView: {},
			rowsPerPage: 5
		};
	}

	// componentWillReceiveProps: sets the agent list when this is updated from the parent state
	componentWillReceiveProps = (nextProps) => {
		let agents = agentActions.setAgentDataList(nextProps.agents, nextProps.providers, nextProps.tasks, nextProps.services).sort((a, b) => { return a[5].localeCompare(b[5]) });
		this.setState({
			agents: agents || []
		});
	}

	// getAgentColumnData: Gets the agent data in columns and formats them.
	getAgentColumnData = () => {
		let columns = agentActions.getAgentColumns();
		if (this.state.currentSort.length > 0) {
			columns.forEach(column => {
				if (column.name === this.state.currentSort[0]) column.options.sortDirection = (this.state.currentSort[1] === 'ascending' ? 'asc' : 'desc');
			});
		}
		columns.forEach(column => {
			if (this.state.columnView[column.name] === 'remove') column.options.display = false;
			if (this.state.columnView[column.name] === 'add') column.options.display = true;
		});
		columns[0].options.customBodyRender = (value) => {
			return (
				<div>
					<IconButton onClick={(e) => this.props.chatAgent(e, [value])}><ChatIcon /></IconButton>
					<IconButton onClick={(e) => this.props.editAgentStatus(e, [value])}><VerifiedUserIcon /></IconButton>
				</div>
			)
		}
		columns[8].options.customBodyRender = (value) => {
			return (
				moment(value).format('DD/MM/YY')
			)
		}
		columns[10].options.customBodyRender = (value) => {
			return (
				moment(value).format('DD/MM/YY HH:mm')
			)
		}
		columns[11].options.customBodyRender = (value) => { // Status
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
		const columns = this.getAgentColumnData();
		return (
			<div className={classes.root}>
				<Paper className={classes.content} elevation={0}>
					{this.props.user && this.props.user.user_type === 'provider' ?
						<Button onClick={() => this.props.addAgent([])}>
							<AddIcon className={classes.leftIcon} />Add new agent
						</Button> : null}
					<MUIDataTable
						title={'Agents'}
						data={this.state.agents}
						columns={columns}
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

// 
export default withStyles(styles, { withTheme: true })(AgentList);