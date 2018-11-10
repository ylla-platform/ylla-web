// Import React
import React, { Component } from 'react';

// Import Material UI
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import ListSubheader from '@material-ui/core/ListSubheader';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

// Import React Charts
import { Doughnut } from 'react-chartjs-2';

// Styles
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
	},
	toolbar: theme.mixins.toolbar
});

// Class: Analytics. The Analytics Dashboard for the Admin users
class Analytics extends Component {

	// getSettingsData: 
	getSettingsData = (services, categories) => {
		var data = [0, 0, 0]
		services.forEach(service => {
			data[0] = data[0] + 1;
			if (service.fields) {
				service.fields.forEach(field => {
					data[1] = data[1] + 1;
				});
			}
		});
		categories.forEach(category => {
			data[2] = data[2] + 1;
		});
		return data;
	}

	// getTasksData: 
	getTasksData = (tasks) => {
		var data = [0, 0, 0];
		tasks.forEach(task => {
			if (task.status === 'Completed') {
				data[0] = data[0] + 1;
			} else if (task.status === 'Cancelled') {
				data[2] = data[2] + 1;
			} else {
				data[1] = data[1] + 1;
			}
		});
		// 
		return data;
	}

	// getUsersData: 
	getUsersData = (providers, agents, consumers) => {
		var data = [0, 0, 0];
		providers.forEach(() => {
			data[0] = data[0] + 1;
		});
		agents.forEach(() => {
			data[1] = data[1] + 1;
		});
		consumers.forEach(() => {
			data[2] = data[2] + 1;
		});
		//
		return data;
	}

	// constructor: sets the state
	constructor(props) {
		super(props);
		this.state = {
			tasks_graph_data: {
				labels: ['Completed', 'In Progress', 'Cancelled'],
				datasets: [{
					data: this.getTasksData(this.props.tasks),
					backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
					hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
				}]
			},
			settings_graph_data: {
				labels: ['Services', 'Questions', 'Categories'],
				datasets: [{
					data: this.getSettingsData(this.props.services, this.props.categories),
					backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
					hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
				}]
			},
			users_graph_data: {
				labels: ['Providers', 'Agents', 'Customers'],
				datasets: [{
					data: this.getUsersData(this.props.providers, this.props.agents, this.props.consumers),
					backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
					hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
				}]
			}
		};
	}

	// componentWillReceiveProps: set the services on receiving a state update from the parent
	componentWillReceiveProps(nextProps) {
		var settings_graph_data = this.state.settings_graph_data;
		var settings_data = this.getSettingsData(nextProps.services, nextProps.categories);
		settings_graph_data.datasets[0].data = settings_data;
		var users_graph_data = this.state.users_graph_data;
		var users_data = this.getUsersData(nextProps.providers, nextProps.agents, nextProps.consumers);
		users_graph_data.datasets[0].data = users_data;
		var tasks_graph_data = this.state.tasks_graph_data;
		var tasks_data = this.getTasksData(nextProps.tasks);
		tasks_graph_data.datasets[0].data = tasks_data;
		this.setState({ settings_graph_data: settings_graph_data, tasks_graph_data: tasks_graph_data, users_graph_data: users_graph_data });
	}

	// render
	render() {
		const { classes } = this.props;
		return (
			<div className={classes.root}>
				<Paper className={classes.content} elevation={0}>
					<Grid container spacing={24}>
						<Grid item xs={6} sm={4}>
							<ListSubheader>How many users have joined the community?</ListSubheader>
							<Divider />
							<Button dense   onClick={this.props.editProviders}>Providers</Button>
							<Button dense   onClick={this.props.editAgents}>Agents</Button>
							<Button dense   onClick={this.props.editConsumers}>Customers</Button>
							<Doughnut data={this.state.users_graph_data} />
						</Grid>
						<Grid item xs={6} sm={4}>
							<ListSubheader>How many services are available?</ListSubheader>
							<Divider />
							<Button dense   onClick={this.props.editServices}>Services</Button>
							<Doughnut data={this.state.settings_graph_data} />
						</Grid>
						<Grid item xs={6} sm={4}>
							<ListSubheader>How many orders have been placed?</ListSubheader>
							<Divider />
							<Button dense   onClick={this.props.editTasks}>All orders</Button><br />
							<Doughnut data={this.state.tasks_graph_data} />
						</Grid>
					</Grid>
				</Paper>
			</div>
		);
	}
}

export default withStyles(styles, { withTheme: true })(Analytics);