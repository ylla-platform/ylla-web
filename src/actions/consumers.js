// Axios for making requests
import axios from 'axios';

const consumer_columns = [
	{
		name: "Actions",
		system: "id",
		options: {
			filter: false,
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
		name: "Gender",
		system: "gender",
		options: {
			filter: true,
			sort: false,
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
		name: "Address",
		system: "address",
		options: {
			filter: false,
			sort: false,
		}
	},
	{
		name: "Neighbourhood",
		system: "neighbourhood",
		options: {
			filter: true,
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
		name: "Status",
		system: "status",
		options: {
			filter: true,
			sort: false,
		}
	}
];

// 
export function getConsumerColumns() {
	return consumer_columns;
}

// 
export function getConsumer(consumer, callback) {
	return callback();
}

// 
export function getConsumers(username, callback) {
	axios.get('/api/consumers/getconsumers?username=' + username)
		.then(function (response) { callback(response); })
		.catch(function () { });
}

// 
export function addConsumer(consumer, callback) {
	var add_url = '/api/consumers/addconsumer';
	axios.post(add_url, consumer)
		.then(function (response) { callback(response); })
		.catch(function () { });
}

// 
export function editConsumer(consumer, token, callback) {
	var edit_url = '/api/consumers/editconsumer';
	axios.post(edit_url, consumer)
		.then(function (response) { callback(response); })
		.catch(function () { callback(null); });
}

export function checkConsumerUsername(username, callback) {
	var username_url = '/api/consumers/checkconsumerusername';
	axios.post(username_url, { username: username })
		.then(function (response) {
			callback(response.data.username);
		})
		.catch(function () { callback(false); });
}

// setConsumerDataList: 
export function setConsumerDataList(consumers) {
	let consumer_table = [];
	consumers.forEach(consumer => {
		let consumer_array = [];
		consumer_columns.forEach(column => {
			consumer_array.push((consumer[column.system] || ''));
		});
		consumer_table.push(consumer_array);
	});
	return consumer_table;
}