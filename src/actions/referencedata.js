// Axios for making requests
import axios from 'axios';

// 
const referencedata_columns = [
	{
		name: "Actions",
		system: "id",
		options: {
			filter: false,
			sort: false,
		}
	},
	{
		name: "Text",
		system: "text",
		options: {
			filter: false,
			sort: true,
		}
	},
	{
		name: "Type",
		system: "type",
		options: {
			filter: true,
			sort: true,
		}
	},
	{
		name: "Icon",
		system: "icon",
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

// getReferenceDataColumns
export function getReferenceDataColumns() {
	return referencedata_columns;
}

// getReferenceData
export function getReferenceData(callback) {
	axios.get('/api/referencedata/getreferencedata')
		.then(response => {
			if (response && response.data && response.data.referencedata) {
				callback(response.data.referencedata);
			} else {
				callback([]);
			}
		})
		.catch(error => { callback(null); });
}

// editReferenceDataItem
export function editReferenceDataItem(referencedataitem, token, callback) {
	axios.post('/api/referencedata/editreferencedataitem', referencedataitem)
		.then(response => { callback(response); })
		.catch(error => { callback(null); });
}

// editReferenceDataStatuses
export function editReferenceDataStatuses(statuses, token, callback) {
	axios.post('/api/referencedata/editreferencedatastatuses', statuses)
		.then(response => { callback(response); })
		.catch(error => { callback(null); });
}

// convertReferenceDataToListArray
export function convertReferenceDataToListArray(referencedata) {
	let referencedata_array = [];
	referencedata.forEach(item => {
		let item_array = [];
		referencedata_columns.forEach(column => {
			item_array.push(item[column.system] || '');
		});
		referencedata_array.push(item_array);
	});
	return referencedata_array;
}
