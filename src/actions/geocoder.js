// Axios for making requests
import axios from 'axios';

export function find(text, magic, callback) {
	axios.get('api/geocoder/find?searchText=' + text + '&magic=' + magic)
		.then(response => {
			if (response && response.data && response.data.features && response.data.features.length > 0) {
				callback(response.data);
			} else {
			}
		})
		.catch(error => { });
}

export function reverse(latitude, longitude, callback) {
	axios.get('api/geocoder/reverse?lat=' + latitude + '&lng=' + longitude)
		.then(response => {
			callback(response.data);
		})
		.catch(error => { });
}
