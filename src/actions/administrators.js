// Axios for making requests
import axios from 'axios';

// 
export function addAdministrator(administrator, token, callback) {
	var add_url = '/api/administrators/addAdministrator';
	axios.post(add_url, administrator)
		.then(response => callback(response))
		.catch(error => callback(null));
}

// 
export function editAdministrator(administrator, token, callback) {
	var edit_url = '/api/administrators/editAdministrator';
	axios.post(edit_url, administrator)
		.then(function (response) { callback(response); })
		.catch(function () { callback(null); });
}
