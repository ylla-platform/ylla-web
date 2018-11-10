// Import React Stuff
import React, { Component } from 'react';

// Material UI
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';

// Moment
import moment from 'moment';

// Styles: 
const styles = theme => ({
	card: {
		backgroundColor: 'rgba(1,1,1,0)'
	},
	chip: {
		backgroundColor: 'rgba(1,1,1,0)'
	},
	avatar: {
		backgroundColor: theme.palette.ylla_business.main
	}
});

// Class: ShareUserCard
class ShareUserCard extends Component {
	// render:
	render() {
		const { classes, user } = this.props;
		let letter1 = 'U';
		let letter2 = '';
		if (user.first_name && user.first_name.length > 0) letter1 = user.first_name.substring(0, 1);
		if (user.last_name && user.last_name.length > 0) letter2 = user.last_name.substring(0, 1);
		return (
			<Card className={classes.card} elevation={0}>
				<CardHeader
					avatar={
						<Avatar>{letter1 + letter2}</Avatar>
					}
					title={user.first_name + ' ' + user.last_name}
					subheader={'Last seen ' + moment(user.date).format('DD/MM/YYYY HH:mm')}
				/>
				<CardActions>
					<Tooltip id="tooltip-icon" title="Chat" placement="bottom">
						<Button dense   onClick={this.props.chat.bind(this, { name: user.first_name, id: user.id })}>Chat</Button>
					</Tooltip>
					<Tooltip id="tooltip-icon" title="Navigate" placement="bottom">
						<Button dense   onClick={this.props.navigate.bind(this, user.location)}>Navigate</Button>
					</Tooltip>
					<Tooltip id="tooltip-icon" title="Centre on map" placement="bottom">
						<Button dense   onClick={this.props.goto.bind(this, user.location)}>Centre</Button>
					</Tooltip>
				</CardActions>
			</Card>
		)
	}
}

export default withStyles(styles)(ShareUserCard);