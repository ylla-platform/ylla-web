// Axios for making requests
import axios from 'axios';

import moment from 'moment';

const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

const agent_columns = [
	{
		name: "Actions",
		system: "id",
		options: {
			filter: false,
			sort: false,
		}
	},
	{
		name: "Company",
		system: "provider_name",
		options: {
			filter: true,
			sort: false,
		}
	},
	{
		name: "Deptmt.",
		system: "department",
		options: {
			filter: true,
			sort: false,
		}
	},
	{
		name: "Type",
		system: "agent_term",
		options: {
			filter: true,
			sort: false,
		}
	},
	{
		name: "Firstname",
		system: "first_name",
		options: {
			filter: false,
			sort: true,
		}
	},
	{
		name: "Lastname",
		system: "last_name",
		options: {
			filter: false,
			sort: true,
		}
	},
	{
		name: "Phone",
		system: "phone",
		options: {
			filter: false,
			sort: false,
		}
	},
	{
		name: "Email",
		system: "email",
		options: {
			filter: false,
			sort: false,
		}
	},
	{
		name: "DOB",
		system: "date_of_birth",
		options: {
			filter: false,
			sort: false,
		}
	},
	{
		name: "Username",
		system: "username",
		options: {
			filter: false,
			sort: false,
		}
	},
	{
		name: "Logged In",
		system: "last_logged_in",
		options: {
			filter: false,
			sort: false,
		}
	},
	{
		name: "Status",
		system: "status",
		options: {
			filter: true,
			sort: false,
		}
	}
];

// 
export function getAgentColumns() {
	return agent_columns;
}

//
export function getAgents(callback) {
	axios.get('/api/agents/getagents')
		.then(response => callback(response))
		.catch(error => callback(null));
}

// 
export function addAgent(agent, token, callback) {
	var add_url = '/api/agents/addagent';
	axios.post(add_url, agent)
		.then(response => callback(response))
		.catch(error => callback(null));
}

// editAgent: 
export function editAgent(agent, token, callback) {
	var edit_url = '/api/agents/editagent';
	axios.post(edit_url, agent)
		.then(response => callback(response))
		.catch(error => callback(null));
}

// editAgentStatuses: 
export function editAgentStatuses(statuses, token, callback) {
	axios.post('/api/agents/editagentstatuses', statuses)
		.then(response => callback(response))
		.catch(error => callback(null));
}

// setAgentsFromAgentsTasksAndProviders: Used in lists to create an agent list
export function setAgentsFromAgentsTasksAndProviders(agents, providers, tasks, services) {
	agents.forEach(agent => {
		agent.agent_term = '';
		agent.provider_name = '';
		if (providers) {
			providers.forEach(prov => {
				if (agent.provider_id === prov.id) agent.provider_name = prov.name;
				if (prov.services) {
					prov.services.forEach(service => {
						services.forEach(s => {
							if (s.system_name === service && s.agent_term) agent.agent_term = s.agent_term;
						});
					});
				}
			});
		}
		agent.current_tasks = 0;
		agent.completed_tasks = 0;
		agent.tasks = [];
		if (tasks) {
			tasks.forEach(task => {
				if (task.agent_id === agent.id && task.status !== 'Active') agent.completed_tasks = agent.completed_tasks + 1;
				if (task.agent_id === agent.id && task.status === 'Active') agent.current_tasks = agent.current_tasks + 1;
				if (task.agent_id === agent.id){
					agent.tasks.push(task);
				}
			});
		}
	});
	return agents;
}

// setAgentDataList: 
export function setAgentDataList(agents, providers, tasks, services) {
	let agent_table = [];
	setAgentsFromAgentsTasksAndProviders(agents, providers, tasks, services).forEach(agent => {
		let agent_array = [];
		agent_columns.forEach(column => {
			agent_array.push(agent[column.system] || '');
		});
		agent_table.push(agent_array);
	});
	return agent_table;
}

// checkAgentServiceDate: 
export function checkAgentServiceDate(service_name, agent, date) {
	if (date < new Date()) return false;
	let day_number = date.getDay();
	let valid = false;
	if (agent.service_booking_days
		&& agent.service_booking_days[service_name]
		&& agent.service_booking_days[service_name][days[day_number]]) {
		valid = true;
	}
	return valid;
}

// 
export function checkAgentServiceTime(service_name, agent, date, time) {
	let date_selected = new Date(date);
	let day_number = date_selected.getDay();
	let day = days[day_number];
	// Loop through the sessions
	let valid = false;
	if (agent.service_booking_days && agent.service_booking_days[service_name] && agent.service_booking_days[service_name][day]) {
		Object.keys(agent.service_booking_days[service_name][day]).forEach(session => {
			let session_start = moment(date + ' ' + agent.service_booking_days[service_name][day][session].start, 'YYYY-MM-DD HH:mm');
			let session_end = moment(date + ' ' + agent.service_booking_days[service_name][day][session].end, 'YYYY-MM-DD HH:mm');
			if (moment(date + ' ' + time, 'YYYY-MM-DD HH:mm').isBetween(session_start, session_end)) valid = true;
		});
	}
	return valid;
}

// checkAgentAvailableProviderServiceDateTime: 
export function checkAgentAvailableProviderServiceDateTime(agent, provider_id, service_name, date, start, end) {
	// Agent must be part of the organisation
	if (agent.provider_id !== provider_id) return false;

	// We need to check that the service provider supports appointments at that time
	let date_selected = new Date(date);
	let day_number = date_selected.getDay();
	let day = days[day_number];

	if (!agent.service_booking_days // Agent has no booking days or times set
		|| !agent.service_booking_days[service_name]
		|| !agent.service_booking_days[service_name][day]) {
		return false;
	}

	// Finally check the times
	let found_time = false;
	Object.keys(agent.service_booking_days[service_name][day]).forEach(session => {
		if (start >= agent.service_booking_days[service_name][day][session].start
			&& end <= agent.service_booking_days[service_name][day][session].end) {
			found_time = true;
		}
	});
	return found_time;
}

// getAgentAvailability: 
export function getAgentAvailability(agent) {
	// If the agent is off duty always return inactive
	if (agent.active === false) return 'inactive';
	// If the agent has any tasks in progress return busy
	var busy = false;
	if (agent.tasks) {
		agent.tasks.forEach(task => {
			if (task.status === 'On the road'
				|| task.status === 'Delivered'
				|| task.status === 'Awaiting payment'
				|| task.status === 'Paid') busy = true;
		});
	}
	if (busy) return 'busy';
	var working = true;
	// Then check working hours
	let current_date = new Date();
	let day_number = current_date.getDay();
	let day = days[day_number];
	let current_time = current_date.getHours() + ':' + current_date.getMinutes();
	// Check the working hours
	if (agent.service_booking_days) {
		Object.keys(agent.service_booking_days).forEach(service_name => {
			if (agent.service_booking_days[service_name][day]) { // Is the agent working that service today?
				Object.keys(agent.service_booking_days[service_name][day]).forEach(session => {
					if (current_time >= agent.service_booking_days[service_name][day][session].start
						&& current_time <= agent.service_booking_days[service_name][day][session].end) {
						working = true;
					}
				});
			} else {
				working = false;
			}
		});
	} else {
		working = false;
	}
	if (working) {
		return 'free';
	} else {
		return 'inactive';
	}
}