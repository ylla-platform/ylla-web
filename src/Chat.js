// Import React
import React, { Component } from 'react';

// Import TalkJS
import Talk from 'talkjs';

// Material UI
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const uuidv1 = require('uuid/v1');

// Styles: 
const styles = theme => ({
	root: {
		width: '100%',
		maxWidth: 360,
		margin: 10,
		zIndex: 100,
	},
	appBar: {
		textAlign: 'center',
		borderBottom: '1px solid #B3B3B3',
		backgroundColor: '#F9F9F9',
		marginBottom: 4,
		top: 62
	},
	title: {
		fontSize: '1.2rem',
		fontFamily: "'Montserrat', sans-serif",
		fontWeight: 700,
		textTransform: 'uppercase',
		letterSpacing: '1px',
		textAlign: 'center',
		margin: 'auto', 
		color:'black'
	},
});

// Class: Chat
class Chat extends Component {

	// constructor: call super, set up state, and handler bindings
	constructor(props) {
		super(props);
		const self = this;
		this.state = {
			inbox: null
		};
		Talk.ready.then(function () {
			let id = (self.props.me.id && self.props.me.id !== '' ? self.props.me.id : uuidv1());

			let name = 'Guest User'; // Set the name of the person initiating contact depending on their user type.
			if (self.props.me.user_type === 'agent') name = self.props.me.first_name + '. Agent';
			if (self.props.me.user_type === 'administrator') name = self.props.me.first_name + '. Ylla Admin';
			if (self.props.me.user_type === 'consumer') name = (self.props.me.first_name ? self.props.me.first_name + ' ' + self.props.me.last_name : 'Ylla User');
			if (self.props.me.user_type === 'provider') name = self.props.me.name;

			let configuration = 'Guest';
			if (self.props.me && self.props.me.user_type) {
				configuration = self.props.me.user_type.charAt(0).toUpperCase() + self.props.me.user_type.slice(1);
			}

			const me = new Talk.User({
				id: id,
				name: name,
				email: 'dave.rowe@cartoconsult.co.uk',
				configuration: configuration
			});

			const talkSession = new Talk.Session({
				appId: "",
				me: me
			});

			let inbox = null;
			if (Object.keys(self.props.chat_user).length !== 0) {

				let other_name = self.props.chat_user.name; // Set the name of the person their contacting depending on their user type.
				if (self.props.chat_user.user_type === 'agent') other_name = self.props.chat_user.first_name + '. Agent';
				if (self.props.chat_user.user_type === 'administrator') other_name = self.props.chat_user.first_name + '. Ylla Admin';
				if (self.props.chat_user.user_type === 'consumer') other_name = (self.props.chat_user.first_name ? self.props.me.first_name + ' ' + self.props.me.last_name : 'Ylla User');
				if (self.props.chat_user.user_type === 'provider') other_name = self.props.chat_user.name;

				const other = new Talk.User({
					id: self.props.chat_user.id,
					name: other_name,
					email: 'dave.rowe@cartoconsult.co.uk'
				});

				var conversation = talkSession.getOrStartConversation(other);
				inbox = talkSession.createInbox({ selected: conversation });
				inbox.mount(document.getElementById("talkjs-container"));
			} else {
				// Show history
				inbox = talkSession.createInbox();
				inbox.mount(document.getElementById("talkjs-container"));
			}
			self.setState({ inbox: inbox });
		});
	}
	componentWillUnmount = () => {
		if (this.state.inbox) this.state.inbox.destroy();
	}
	// render
	render() {
		const { classes } = this.props;
		return (
			<div className={classes.root}>
				<AppBar position="sticky" elevation={0} className={classes.appBar}>
					<Toolbar disableGutters={true}>
						<Typography variant="title" color="inherit" className={classes.title}>Chat</Typography>
						<IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={() => this.props.close()}>
							<svg width='20'
								fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="1.414" clip-rule="evenodd" viewBox="0 0 28 28">
								<g fill="#313131" fill-rule="nonzero" stroke="#313131" stroke-width=".3">
									<path d="M8.893 10.36a1.037 1.037 0 0 0 1.471 0 1.042 1.042 0 0 0 0-1.472L2.043.559a1.04 1.04 0 1 0-1.47 1.472l8.32 8.329zM15.26 13.788L27.008 2.031a1.042 1.042 0 0 0 0-1.472c-.407-.407-1.065-.586-1.471-.179L13.055 12.694h-.309v.36L.419 25.546c-.406.406-.329 1.065.076 1.472.203.204.508.305.774.305.267 0 .552-.101.755-.305L13.78 15.261l11.751 11.758a1.041 1.041 0 0 0 1.474 0 1.04 1.04 0 0 0 .001-1.472L15.26 13.788z" />
								</g>
							</svg>
						</IconButton>
					</Toolbar>
				</AppBar>
				<div id="talkjs-container"></div>
			</div>
		);
	}
}

// 
export default withStyles(styles)(Chat);