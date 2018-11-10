// Axios for making requests
import axios from 'axios';

const category_columns = [
	{
		name: "Actions",
		system: "id",
		options: {
			filter: false,
			sort: false,
		}
	},
	{
		name: "Title",
		system: "title",
		options: {
			filter: false,
			sort: true,
		}
	},
	{
		name: "Parent",
		system: "parent",
		options: {
			filter: false,
			sort: true,
		}
	},
	{
		name: "Featured",
		system: "featured",
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

// getCategories: 
export function getCategories(callback) {
	axios.get('/api/categories/getcategories')
		.then(response => {
			if (response && response.data && response.data.categories) {
				callback(response.data.categories);
			} else {
				callback([])
			}
		})
		.catch(error => { callback(null); });
}

// editCategory: 
export function editCategory(category, token, callback) {
	axios.post('/api/categories/editcategory', category)
		.then(response => { callback(response); })
		.catch(error => { callback(null); });
}

// editCategoryStatuses:
export function editCategoryStatuses(statuses, token, callback) {
	axios.post('/api/categories/editcategorystatuses', statuses)
		.then(response => { callback(response); })
		.catch(error => { callback(null); });
}

// 
export function getCategoryColumns() {
	return category_columns;
}

// setCategoryDataList: 
export function setCategoryDataList(categories) {
	let category_table = [];
	categories.forEach(category => {
		let category_array = [];
		category_columns.forEach(column => {
			category_array.push(category[column.system]);
		});
		category_table.push(category_array);
	});
	return category_table;
}