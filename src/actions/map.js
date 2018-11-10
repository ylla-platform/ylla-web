// Axios for making requests
import axios from 'axios';

import * as turf from '@turf/turf'

export function logLocation(user, token, callback) {
	let add_url = '/api/livelocations/loglocation';
	navigator.geolocation.getCurrentPosition((position) => {
		let latitude = position.coords.latitude;
		let longitude = position.coords.longitude;
		if (parseFloat(latitude) > 50 && parseFloat(longitude) < 55) {
			latitude = '29.36436';
			longitude = '47.98164';
		}
		if (user && user.id) {
			axios.post(add_url, { id: user.id, location: [longitude, latitude] })
				.then(response => {
					callback({ live_locations: response.data.locations, current_location: [longitude, latitude] });
				})
				.catch(function () { });
		} else {
			callback({ live_locations: [], current_location: [longitude, latitude] });
		}
	}, error => { },
		{
			enableHighAccuracy: true,
			timeout: 100000,
			maximumAge: 5000
		});
}

// getFeatureDistance
export function getFeatureDistance(location, current_location) {
	let distance = 0;
	if (current_location.length > 0 && location.length > 0) {
		let from = turf.point(current_location);
		let to = turf.point(location);
		distance = turf.distance(from, to, { units: 'kilometres' });
		distance = Math.round(distance);
	}
	return distance;
}