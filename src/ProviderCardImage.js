// Import React Stuff
import React, { Component } from 'react';

// Material UI
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Chip from '@material-ui/core/Chip';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';

// Icons
import ChatIcon from '@material-ui/icons/Chat';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import StarIcon from '@material-ui/icons/Star';

// Styles: 
const styles = theme => ({
	card: {
		backgroundColor: 'rgba(1,1,1,0)'
	},
	chip: {
		backgroundColor: 'rgba(1,1,1,0)'
	},
	avatar: {
		backgroundColor: 'rgba(1,1,1,0)'
	},
	media: {
		height: 0,
		paddingTop: '56.25%', // 16:9
	},
	orderButton: {
		backgroundColor: '#FBEA21',
		marginRight: 10
	}
});

// Class: ProviderCardImage.
class ProviderCardImage extends Component {
	// constructor: call super, set up state, and handler bindings
	constructor(props) {
		super(props);
		this.state = {
			preferred_location : this.props.preferred_location
		};
	}

	// componentWillReceiveProps: set the provider on receiving a state update from the parent
	componentWillReceiveProps = (nextProps) => {
		
		if(this.props.preferred_location!= nextProps.preferred_location){
			this.setState({
				preferred_location : nextProps.preferred_location
			});
		}
		
	}
	// render:
	render() {
		const { classes, provider, service } = this.props;
		return (
			<Card className={classes.card} key={provider.id} elevation={0}>
				<CardMedia
					className={classes.media}
					image={provider.cover ? (provider.cover.id && provider.cover.id !== '' ? '/api/images/getimage?id=' + provider.cover.id : provider.cover.datauri) : 'https://via.placeholder.com/350x200'}
				/>
				<CardHeader
					action={
						<div>
							{service && provider.service_answers && provider.service_answers[service.system_name] && provider.service_answers[service.system_name].price ?
								<div>
									<Tooltip id="tooltip-icon" title="Price" placement="bottom">
										<Button dense  >{'KD' + provider.service_answers[service.system_name].price}</Button>
									</Tooltip>
									<br />
								</div> : null}
							<Tooltip id="tooltip-icon" title="Chat" placement="bottom">
								<IconButton
									className={classes.button}
									aria-label="Chat"
									onClick={this.props.chat.bind(this, { name: provider.name, id: provider.id })}>
									<ChatIcon />
								</IconButton>
							</Tooltip>
						</div>
					}
					title={provider.name}
				/>
				<Chip
					avatar={
						<Avatar className={classes.avatar}>
							<LocationOnIcon />
						</Avatar>
					}
					label={this.props.distance + 'm'}
					className={classes.chip}
					onClick={this.props.goto.bind(this, provider.addresses && provider.addresses.length > 0 ? provider.addresses[0].location : [])}
				/>
				<Chip
					avatar={
						<Avatar className={classes.avatar}>
							<StarIcon />
						</Avatar>
					}
					label={provider.average_rating ? provider.average_rating : 'No rating'}
					className={classes.chip}
				/>
				{this.props.selectMoreInfo ?
					<CardActions className={classes.actions} disableActionSpacing>
						{this.props.user && this.props.user.user_type ? <Button disabled={this.state.preferred_location == ""}  size="large" className={classes.orderButton} onClick={this.props.selectProvider.bind(this, provider.id)}>Order</Button> : null}
						<Button size="large" colour="default" variant="outlined" onClick={this.props.selectMoreInfo.bind(this, provider.id)}>More info</Button>

					</CardActions> : null}
			</Card>
		);
	}
}

// 
export default withStyles(styles)(ProviderCardImage);
