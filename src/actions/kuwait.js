// Axios for making requests
import axios from 'axios';

// 
export function getGovernorates(callback) {
	let governorates = [];
	axios.get('api/kuwait/governorates')
		.then(response => {
			if (response && response.data && response.data.governorates) governorates = response.data.governorates;
			callback(governorates)
		})
		.catch(error => { });
}

// 
export function getNeighbourhoods(gov_no, callback) {
	let neighbourhoods = [];
	axios.get('api/kuwait/neighbourhoods?gov_no=' + gov_no)
		.then(response => {
			if (response && response.data && response.data.neighbourhoods) neighbourhoods = response.data.neighbourhoods;
			callback(neighbourhoods)
		})
		.catch(error => { });
}

// 
export function getBlocks(nhood_no, callback) {
	let blocks = [];
	axios.get('api/kuwait/blocks?nhood_no=' + nhood_no)
		.then(response => {
			if (response && response.data && response.data.blocks) blocks = response.data.blocks;
			callback(blocks)
		})
		.catch(error => { });
}

// 
export function getStreets(gov_no, nhood_no, block, callback) {
	let streets = [];
	axios.get('api/kuwait/streets?block=' + block + '&gov_no=' + gov_no + '&nhood_no=' + nhood_no)
		.then(response => {
			if (response && response.data && response.data.streets) streets = response.data.streets;
			callback(streets)
		})
		.catch(error => { });
}
