// Axios for making requests
import axios from 'axios';

import * as turf from '@turf/turf'

import moment from 'moment';

const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

const provider_columns = [
	{
		name: "Actions",
		system: "id",
		options: {
			filter: false,
			sort: false,
		}
	},
	{
		name: "Name",
		system: "name",
		options: {
			filter: false,
			sort: true,
		}
	},
	{
		name: "Description",
		system: "description",
		options: {
			filter: false,
			sort: false,
		}
	},
	{
		name: "First name",
		system: "first_name",
		options: {
			filter: false,
			sort: true,
		}
	},
	{
		name: "Last name",
		system: "last_name",
		options: {
			filter: false,
			sort: true,
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
export function getProviderColumns() {
	return provider_columns;
}

// Adds a service provider by calling addserviceprovider WS
export function addProvider(provider, callback) {
	var add_url = '/api/providers/addprovider';
	axios.post(add_url, provider)
		.then(function (response) { callback(response); })
		.catch(function () { });
}

// Edits a service provider by calling to services/editserviceproviderm
export function editProvider(provider, token, callback) {
	var edit_url = '/api/providers/editprovider';
	axios.post(edit_url, provider)
		.then(function (response) { callback(response); })
		.catch(function () { callback(null); });
};

// Edits a service provider by calling to services/editserviceproviderm
export function editProviderStatuses(statuses, token, callback) {
	axios.post('/api/providers/editproviderstatuses', statuses)
		.then(function (response) { callback(response); })
		.catch(function (error) { });
};

// Gets a list of service provider by calling services/getservices
export function getProviders(callback) {
	axios.get('/api/providers/getproviders')
		.then(function (response) { callback(response); })
		.catch(function () { callback(null); });
}

// Searches service providers by dynamic fields
export function searchProviders(callback) {
	return callback();
}

// Gets the agents for the specified service providers
export function getProviderAgents(providerId, callback) {
	axios.get('/api/provider/getprovideragents')
		.then(response => { callback(response); })
		.catch(error => { callback(null); });
}

// setProviderDataList: 
export function setProviderDataList(providers) {
	let provider_table = [];
	providers.forEach(provider => {
		let provider_array = [];
		provider_columns.forEach(column => {
			provider_array.push((provider[column.system] || ''));
		});
		provider_table.push(provider_array);
	});
	return provider_table;
}

// getProviderDistance: 
export function getProviderDistance(provider, current_location) {
	let distance = 0;
	if (provider.addresses) {
		provider.addresses.forEach(address => {
			if (address.location && address.location.length === 2 && current_location && current_location.length === 2) {
				let from = turf.point(current_location);
				let to = turf.point(address.location);
				distance = turf.distance(from, to, { units: 'kilometres' });
				distance = Math.round(distance);
			}
		});
	}
	return distance;
}

// getProviderAcceptedDistance: 
export function getProviderAcceptedDistance(provider) {
	let distance = 0;
	if (provider.addresses) {
		provider.addresses.forEach(address => {
			if (address.address_distance) {
				distance = parseInt(address.address_distance, 10);
			}
		});
	}
	return distance;
}

export function checkProviderServiceDate(service, provider, date) {
	// Date shouldn't be in the past.
	if (date < new Date()) return false;

	// Get the service booking days for the provider and check
	let day_number = date.getDay();
	let valid = false;
	if (provider.service_booking_days
		&& provider.service_booking_days[service.system_name]
		&& provider.service_booking_days[service.system_name][days[day_number]]) {
		valid = true;
	}
	return valid;
}

// checkProviderServiceTime: 
export function checkProviderServiceTime(service_name, provider, date, time) {
	let date_selected = new Date(date);
	let day_number = date_selected.getDay();
	let day = days[day_number];
	// Loop through the sessions
	let valid = false;
	Object.keys(provider.service_booking_days[service_name][day]).forEach(session => {
		let session_start = moment(date + ' ' + provider.service_booking_days[service_name][day][session].start, 'YYYY-MM-DD HH:mm');
		let session_end = moment(date + ' ' + provider.service_booking_days[service_name][day][session].end, 'YYYY-MM-DD HH:mm');
		if (moment(date + ' ' + time, 'YYYY-MM-DD HH:mm').isBetween(session_start, session_end)) valid = true;
	});
	return valid;
}

// checkProviderMatchServiceAnswers: 
export function checkProviderMatchServiceAnswers(provider, service, answers) {

	// If the service has no questions return true
	if (!service.fields) return true;

	// Find any provider/consumer questions
	let questions = [];
	service.fields.forEach(question => {
		if (question.target === 'both') {
			questions.push(question);
		}
	});

	// If there are no questions return true
	if (questions.length === 0) return true;

	// Get provider answers
	const prov_answers = provider.service_answers[service.system_name];

	let match = true;
	questions.forEach(question => {
		if (prov_answers && prov_answers[question.title]) {
			let a = prov_answers[question.title]; 
			let b = answers[question.title]; 
			if(Array.isArray(b)){
				b=b[0];
			}
			let i = a.indexOf(b); 
			if ( b && ( i < 0)) {
				match = false;
			}
		}
	});

	return match;
}

// getProviderServiceBookingDates: 
export function getProviderServiceBookingDates(prov, service) {
	let booking_days = [];
	if (prov) {
		let serv_name = service.system_name;
		let max_days = 56;
		if (prov.service_booking_days && prov.service_booking_days[serv_name] && prov.service_booking_days[serv_name].booking_advance_max) max_days = (prov.service_booking_days[serv_name].booking_advance_max / 24);
		for (let x = 0; x < max_days; x++) {
			let check_date = new Date();
			check_date.setDate(check_date.getDate() + x);
			if (checkProviderServiceDate(service, prov, check_date)) {
				booking_days.push(moment(check_date).format('YYYY-MM-DD'));
			}
		}
	}
	return booking_days;
}

// getProviderServiceBookingHours: 
export function getProviderServiceBookingHours(date, prov, service_name) {
	var times = [];
	let min_time = moment();
	let date_selected = new Date(date);
	let day_number = date_selected.getDay();
	let day = days[day_number];
	let interval = 15;
	if (prov.service_booking_days
		&& prov.service_booking_days[service_name]
		&& prov.service_booking_days[service_name].booking_interval) { // Set the provider interval in minutes
		interval = prov.service_booking_days[service_name].booking_interval;
	}
	// Loop through the sessions
	Object.keys(prov.service_booking_days[service_name][day]).forEach(session => {
		let start = prov.service_booking_days[service_name][day][session].start;
		let end = prov.service_booking_days[service_name][day][session].end;
		let test_time = moment(date + ' ' + start, 'YYYY-MM-DD HH:mm');
		let session_end = moment(date + ' ' + end, 'YYYY-MM-DD HH:mm');
		while (test_time.isBefore(session_end) && min_time.isBefore(test_time)) {
			times.push(test_time.format('HH:mm'));
			test_time.add(interval, 'minutes');
		}
	});
	return times;
}

// getProviderNextAvailable:
export function getProviderNextAvailable(prov, service) {
	let booking_day = '';
	const service_name = service.system_name;
	if (prov) {
		let max_days = 56;
		if (prov.service_booking_days && prov.service_booking_days[service_name] && prov.service_booking_days[service_name].booking_advance_max) max_days = (prov.service_booking_days[service_name].booking_advance_max / 24);
		for (let x = 0; x < max_days; x++) {
			let check_date = new Date();
			check_date.setDate(check_date.getDate() + x);
			if (checkProviderServiceDate(service, prov, check_date)) {
				booking_day = moment(check_date).format('YYYY-MM-DD');
			}
		}
	}
	return booking_day;
}