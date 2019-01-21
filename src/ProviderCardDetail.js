// Import React Stuff
import React, { Component } from 'react';

// Material UI
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

// Icons
import Button from '@material-ui/core/Button';

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
	orderButton: {
		backgroundColor: '#FBEA21',
		marginRight: 10
	},
	distance: {
		fontSize: '0.8rem'
	},
	title: {
		fontSize: '1.1rem',
		fontFamily: "'Montserrat', sans-serif",
		fontWeight: 700,
		textTransform: 'uppercase',
		letterSpacing: '1px'
	}
});

// Class: ProviderCardDetail.
class ProviderCardDetail extends Component {
	
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
		const { classes, provider } = this.props;
		return (
			{Object.keys(provider).length > 0 ?
			<Card className={classes.card} key={provider.id} elevation={0}>
				<CardHeader
					classes={{
						title: classes.title
					}}
					avatar={
						<div>
							{provider.logo ?
								<Avatar src={provider.logo.id && provider.logo.id !== '' ? '/api/images/getimage?id=' + provider.logo.id : provider.logo.datauri} className={classes.avatar}></Avatar>
								: 
								<Avatar aria-label={provider.name} className={classes.avatar}>{provider.name.substring(0, 1)}</Avatar>
							}
							<Typography variant="body" className={classes.distance}>{provider.distance + ' miles away'}</Typography>
						</div>
					}
					title={provider.name}
					subheader={(provider.description && provider.description !== '' ? provider.description + '.' : '')}
				/>
				{this.props.selectMoreInfo ?
					<CardActions className={classes.actions} disableActionSpacing>
						{this.props.user && this.props.user.user_type ? <Button size="large" disabled={this.state.preferred_location == ""} className={classes.orderButton} onClick={this.props.selectProvider.bind(this, provider.id)}>Order</Button> : null}
						<Button size="large" colour="default" variant="outlined" onClick={this.props.selectMoreInfo.bind(this, provider.id)}>More info</Button>
					</CardActions> : null}
			</Card>:null}
		);
	}
}

// 
export default withStyles(styles)(ProviderCardDetail);
