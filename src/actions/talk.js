// Axios for making requests
import axios from 'axios';

// get a specific user by id
export function getUser(id, callback) {
	let get_url = 'api/talk/getuser';
	axios.get(get_url, { params: { userid: id } })
		.then(response => { callback(response); })
		.catch(error => { callback(null); });
}

// create or edit a user
export function updateUser(id, data, callback) {
	let edit_url = 'api/talk/updateuser';
	axios.put(edit_url, {
		params: {
			userid: id,
			userdata: data
		}
	})
		.then(function (response) { callback(response); })
		.catch(function () { callback(null); });
}

// get conversations of a specific user
export function getConversations(id, unread, token, callback) {
	let get_url = 'api/talk/getconversations';
	axios.get(get_url, {
		params: {
			user_id: id,
			unread: unread
		}
	})
		.then(response => { 
			callback(response.data.conversations); 
		})
		.catch(error => { callback(null); });
}

// sends message from one user to multiple users
export function sendToMultiple(sender_id, receiver_ids, subject, message, token, callback) {
	let post_url = 'api/talk/sendtomultiple';
	axios.post(post_url, {
		params: {
			sender_id: sender_id,
			receiver_ids: receiver_ids,
			subject: subject,
			message: message,
		}
	})
		.then(response => { callback(response); })
		.catch(error => { callback(null); });

}
