// Axios for making requests
import axios from 'axios';

export function authenticate(credentials, callback) {
	axios.post('/api/authentication/authenticate', credentials)
		.then(response => callback(response))
		.catch(error => callback(null));
}

export function updatePassword(credentials, callback) {
	axios.post('/api/authentication/updatepassword', credentials)
		.then(response => callback(response))
		.catch(error => callback(null));
}

export function resetPasswordEmail(username) {
	axios.post('/api/authentication/passwordreset', {
		username: username
	})
		.then(function () { })
		.catch(function () { });
}

export function authenticateAndSetPassword(token, new_password, callback) {
	axios.post('/api/authentication/updatepasswordfromreset', {
		token: token,
		new_password: new_password
	})
		.then(function (response) {
			callback(response);
		})
		.catch(function (response) {
			callback(response);
		});
}