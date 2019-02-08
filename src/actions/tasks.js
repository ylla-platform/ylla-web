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
					bids.push({'provider_id':bid.provider_id, 'agent_name':agent.first_name, 'amount':bid.amount, 'comment':bid.comment});
				}
			});
			
		});
	}
	return bids;
}

export function getSortOrder(status,tab) {
	 	var map; 
	 	if(tab == 'To Do'){
	 		map = {"Completed": 11, 'Paid': 10, 'Awaiting payment': 9, 'Delivered':8, 'Arrived':7, 'On the road':6, 'Preparing':5, 'Accepted':4, 'BidChoosen':3, 'Bidding':2, 'Requested':1, 'Declined':12,'Failed':13 , 'Cancelled':14 }; 
	 	}
	 	if(tab == 'Done'){
	 		map = {"Completed": 1, 'Paid': 2, 'Awaiting payment': 3, 'Delivered':4, 'Arrived':5, 'On the road':6, 'Preparing':7, 'Accepted':8, 'BidChoosen':9, 'Bidding':10, 'Requested':11, 'Declined':12,'Failed':13 , 'Cancelled':14 }; 
	 	}
	 	if(tab == 'Unassigned'){
	 		map = {"Completed": 11, 'Paid': 10, 'Awaiting payment': 9, 'Delivered':8, 'Arrived':7, 'On the road':6, 'Preparing':5, 'Accepted':4, 'BidChoosen':1, 'Bidding':2, 'Requested':3, 'Declined':12,'Failed':13 , 'Cancelled':14 }; 
	 	}
	 	if(tab == 'Assigned'){
	 		map = {"Completed": 11, 'Paid': 1, 'Awaiting payment': 2, 'Delivered':3, 'Arrived':4, 'On the road':5, 'Preparing':6, 'Accepted':7, 'BidChoosen':8, 'Bidding':9, 'Requested':10, 'Declined':12,'Failed':13 , 'Cancelled':14 }; 
	 	}
	 	return map[status];
 	
}

export function getHumanReadableStatusText (task, bids, userid) {

		if(!isRunner(task)) return task.status; 

		var didIbid =false; 
		var buttonText = task.status; 

		bids.forEach(bid => {
			if(bid.provider_id.toString() == userid){
				didIbid =true ; 
			}		
		});

		if(task.status == "Requested" ){
			if(task.consumer_id == userid){
				buttonText =  'Awaiting Offers';
			}
			else {
				buttonText = 'Make an Offer';
			}
		}
		else if(task.status == "Bidding" ){
			if(task.consumer_id == userid ){
				buttonText = 'Select an offer'; 
			}
			else if(didIbid){
				buttonText = 'Awaiting Selection'; 
			}
			else{
				buttonText = 'Make an Offer';
			}
		}
		else if(task.status == "BidChoosen" ){
			if( task.consumer_id == userid ){
				buttonText = 'Awaiting Confirmation';
			}
			else if(task.agent_id == userid){
				buttonText = 'Tap to confirm';
			}
			else {
				buttonText = 'In Progress';
			}
		}
		else if(task.status == "Accepted" ){
			if( task.consumer_id == userid ){
				buttonText = 'Hired';
			}
			else if(task.agent_id == userid){
				buttonText = 'Hired';
			}
			else {
				buttonText = 'Assigned';
			}
		}
		else
		{
			if(task.consumer_id != userid && task.agent_id != userid ) 
				{
				 	buttonText = 'Assigned';
				}
		}
		return buttonText ;
	}

export function isRunner (task) {
	 	var isRunner = false ;
	 	isRunner = task.provider_id == 0 || !task.provider_id  || task.provider_id == null ;
	 	return isRunner;
	}