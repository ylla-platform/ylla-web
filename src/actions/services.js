// Axios for making requests
import axios from 'axios';

const service_columns = [
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
		name: "Categories",
		system: "category_names",
		options: {
			filter: true,
			sort: false,
		}
	},
	{
		name: "Grouping",
		system: "grouping",
		options: {
			filter: false,
			sort: false,
		}
	},
	{
		name: "Keywords",
		system: "keywords",
		options: {
			filter: false,
			sort: false,
		}
	},
	{
		name: "Type",
		system: "service_function",
		options: {
			filter: true,
			sort: true,
		}
	},
	{
		name: "Agent",
		system: "agent_required_by",
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
const question_columns = [
	{
		name: "Actions",
		system: "id",
		options: {
			filter: false,
			sort: false,
		}
	},
	{
		name: "Question",
		system: "title",
		options: {
			filter: false,
			sort: true,
		}
	},
	{
		name: "Provider question",
		system: "provider_title",
		options: {
			filter: false,
			sort: true,
		}
	},
	{
		name: "Target",
		system: "target",
		options: {
			filter: false,
			sort: false,
		}
	},
	{
		name: "Type",
		system: "type",
		options: {
			filter: false,
			sort: false,
		}
	},
	{
		name: "Customer Answers",
		system: "consumer_answers",
		options: {
			filter: false,
			sort: false,
		}
	},
	{
		name: "Provider Answers",
		system: "provider_answers",
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
			sort: true,
		}
	}
];

// getServiceColumns: 
export function getServiceColumns() {
	return service_columns;
}

// getQuestionColumns: 
export function getQuestionColumns() {
	return question_columns;
}

// getServices:
export function getServices(callback) {
	axios.get('/api/services/getservices')
		.then(response => { callback(response); })
		.catch(error => { });
}

// editService: 
export function editService(service, token, callback) {
	axios.post('/api/services/editservice', service)
		.then(response => { callback(response); })
		.catch(function (error) { });
}

// editServiceStatuses: 
export function editServiceStatuses(statuses, token, callback) {
	axios.post('/api/services/editservicestatuses', statuses)
		.then(response => callback(response))
		.catch(function (error) { });
}

// addServiceQuestion: 
export function addServiceQuestion(service_ids, question_id, token, callback) {
	axios.post('/api/services/addservicequestion', { service_ids: service_ids, question_id: question_id })
		.then(response => callback(response))
		.catch(function (error) { });
}

// removeServiceQuestion: 
export function removeServiceQuestion(service_ids, question_id, token, callback) {
	axios.post('/api/services/removeservicequestion', { service_ids: service_ids, question_id: question_id })
		.then(response => callback(response))
		.catch(function (error) { });
}

// getQuestions:
export function getQuestions(callback) {
	axios.get('/api/services/getquestions')
		.then(response => { callback(response.data.questions); })
		.catch(error => { });
}

// editServiceQuestion: 
export function editServiceQuestion(question, token, callback) {
	axios.post('/api/services/editquestion', question)
		.then(response => callback(response))
		.catch(error => callback(null));
}

// editServiceQuestionStatuses: 
export function editServiceQuestionStatuses(statuses, token, callback) {
	axios.post('/api/services/editquestionstatuses', statuses)
		.then(response => callback(response))
		.catch(error => callback(null));
}

// convertServicesToServicesAndQuestions: 
export function convertServicesToServicesAndQuestions(services, questions, categories) {
	let questions_array = [];
	let services_array = [];
	services.forEach(service => {

		let category_names = [];
		if (service.categories) {
			categories.forEach(category => {
				if (service.categories.indexOf(category.system_name) !== -1) category_names.push(category.title);
			});
		}
		service.category_names = category_names.join('|');

		let service_array = [];
		service_columns.forEach(column => {
			service_array.push(service[column.system] || '');
		});
		services_array.push(service_array);
	});
	questions.forEach(question => {
		if (question.options && Array.isArray(question.options)) question.consumer_answers = question.options.join('|');
		if (question.provider_answers && Array.isArray(question.provider_answers)) question.provider_answers = question.provider_answers.join('|');
		let question_array = [];
		question_columns.forEach(column => {
			question_array.push(question[column.system].replace(/[^\x00-\x7F]/g, "") || '');
		});
		questions_array.push(question_array);
	});
	return { services: services_array, questions: questions_array };
}

// groupServices: 
export function groupServices(services) {
	let services_grouped = {};
	services.forEach(service => {
		let grouping = 'default';
		if (service.categories && service.categories.length > 0) {
			service.categories.forEach(category => {
				if (service.grouping && service.grouping !== '') grouping = service.grouping;
				if (!services_grouped[category]) services_grouped[category] = {};
				if (!services_grouped[category][grouping]) services_grouped[category][grouping] = [];
				services_grouped[category][grouping].push(service);
			});
		}
	});
	return services_grouped;
}