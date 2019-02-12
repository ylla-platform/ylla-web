// Axios for making requests
import axios from 'axios';

const notifications_columns = [
	{
		name: "Name",
		system: "name",
		options: {
			filter: false,
			sort: true,
		}
	},
	{
		name: "Subject",
		system: "title",
		options: {
			filter: false,
			sort: true,
		}
	},
	{
		name: "Actions",
		system: "actions",
		options: {
			filter: false,
			sort: false,
		}
	},
];

 
export function getNotifications(callback) {
	axios.get('/api/administrators/gettemplatenames')
		.then(response => {
			if (response && response.data && response.data.notifications) {
				callback(response.data.notifications);
			} else {
				callback([])
			}
		})
		.catch(error => { callback(null); });
}


export function editNotifications(notifications, token, callback) {
	// axios.post('/api/categories/editcategory', notifications)
	// 	.then(response => { callback(response); })
	// 	.catch(error => { callback(null); });
}

export function editNotificationsStatuses(statuses, token, callback) {
	// axios.post('/api/categories/editcategorystatuses', statuses)
	// 	.then(response => { callback(response); })
	// 	.catch(error => { callback(null); });
}

// 
export function getNotificationsColumns() {
	return notifications_columns;
}

export function setNotificationsDataList(notifications) {
	 let notifications_table = [];
	 notifications.forEach(notification => {
	 let notifications_array = [];
	 notifications_columns.forEach(column => {
	 		notifications_array.push(notification[column.system]);
	 	});
	notifications_table.push(notifications_array);
	 });
	 return notifications_table;
}
