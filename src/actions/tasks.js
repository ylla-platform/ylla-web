// Axios for making requests
import axios from 'axios';

const task_columns = [
	{
		name: "ID",
		system: "id",
		options: {
			filter: false,
			sort: true,
		}
	},
	{
		name: "Business",
		system: "provider_name",
		options: {
			filter: true,
			sort: true,
		}
	},
	{
		name: "Service",
		system: "service_name",
		options: {
			filter: true,
			sort: true,
		}
	},
	{
		name: "Price",
		system: "price",
		options: {
			filter: false,
			sort: true,
		}
	},
	{
		name: "Agent",
		system: "agent_name",
		options: {
			filter: true,
			sort: true,
		}
	},
	{
		name: "Deptmnt.",
		system: "department",
		options: {
			filter: true,
			sort: true,
		}
	},
	{
		name: "Start",
		system: "start_date_time",
		options: {
			filter: false,
			sort: true,
		}
	},
	{
		name: "End",
		system: "end_date_time",
		options: {
			filter: false,
			sort: true,
		}
	},
	{
		name: "Ordered",
		system: "date_created",
		options: {
			filter: false,
			sort: true,
		}
	},
	{
		name: "Status",
		system: "status",
		options: {
			filter: true,
			sort: true,
		}
	}
];

// getTaskColumns: 
export function getTaskColumns() {
	return task_columns;
}

// getTasks: 
export function getTasks(user, callback) {
	axios.get('/api/tasks/gettasks?posts=true&user_id=' + user.id)
		.then(response => {
			callback(response);
		})
		.catch(error => {
			callback(null);
		});
}

// addTask: 
export function addTask(task, callback) {
	axios.post('/api/tasks/addtask', task)
		.then(response => { callback(response); })
		.catch(error => { callback(null); });
}

// editTaskAgents: 
export function editTaskAgents(data, callback) {
	axios.post('/api/tasks/edittaskagents', data)
		.then(function (response) { callback(response); })
		.catch(function (error) { });
}

// editTaskStatuses: 
export function editTaskStatuses(tasks, callback) {
	axios.post('/api/tasks/edittaskstatuses', tasks)
		.then(response => { callback(response); })
		.catch(error => { callback(null); });
}

// editTaskRating: 
export function editTaskRating(rating, callback) {
	axios.post('/api/tasks/edittaskrating', rating)
		.then(response => { callback(response); })
		.catch(error => { callback(null); });
}

// editTaskProvider: 
export function editTaskProvider(task_id, provider_id, price, callback) {
	axios.post('/api/tasks/edittaskprovider', { task_id: task_id, provider_id: provider_id, price: price })
		.then(response => { callback(response); })
		.catch(error => { callback(null); });
}

// addTaskBid: 
export function addTaskBid(bid, callback) {
	axios.post('/api/tasks/addtaskbid', bid)
		.then(response => { callback(response); })
		.catch(error => { callback(null); });
}

// convertTasksToDisplayFormat: 
export function convertTasksToDisplayFormat(tasks, agents, providers, services, consumers) {
	tasks.forEach(task => {
		if (task.provider_id && task.provider_id !== '') {
			providers.forEach(prov => {
				if (prov.id === task.provider_id) {
					task.provider = prov;
					task.provider_name = prov.name;
				}
			});
		}
		if (task.agent_id && task.agent_id !== '') {
			agents.forEach(agent => {
				if (agent.id === task.agent_id) {
					task.agent = agent;
					task.agent_name = agent.first_name + ' ' + agent.last_name;
				}
			});
		}
		if (task.service_id && task.service_id !== '') {
			services.forEach(service => {
				if (service.id === task.service_id) task.service_name = service.title;
			});
		}
		if (task.user_id && task.user_id !== '') {
			consumers.forEach(consumer => {
				if (task.user_id === consumer.id) {
					task.consumer = consumer;
				}
			});
		}
	});
	return tasks;
}

// setCategoryDataList: 
export function setTasksDataList(tasks, agents, providers, services, consumers) {
	let task_data = convertTasksToDisplayFormat(tasks, agents, providers, services, consumers);
	let task_table = [];
	task_data.forEach(task => {
		let task_array = [];
		task_columns.forEach(column => {
			task_array.push(task[column.system] || '');
		});
		task_table.push(task_array);
	});
	return task_table;
}

// convertBidsToDisplayFormat: 
export function convertBidsToDisplayFormat(task, agents) {
	let bids = [];
	if (task.bids) {
		task.bids.forEach(bid => {
			agents.forEach(agent => {
				if (agent.id === bid.provider_id.toString()) {
					bid.agent_name = agent.first_name;
					bids.push({'provider_id':bid.provider_id, 'agent_name':agent.first_name, 'amount':bid.amount});
				}
			});
			
		});
	}
	return bids;
}