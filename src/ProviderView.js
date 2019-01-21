// Import React Stuff

import PropTypes from 'prop-types';
import React, { Component } from 'react';

// Material UI includes
import Avatar from '@material-ui/core/Avatar';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

// Material Icons
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import NavigationIcon from '@material-ui/icons/Navigation';
import PhoneIcon from '@material-ui/icons/Phone';
import WebIcon from '@material-ui/icons/Web';

import ProviderOpeningHours from './ProviderOpeningHours';

// Styles: 
const styles = theme => ({
	appBar: {
		textAlign: 'center',
		borderBottom: '1px solid #B3B3B3',
		backgroundColor: '#F9F9F9',
		padding: 10,
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
		marginTop: 0, 
		color: 'black'
	},
	subHeading: {
		fontSize: '1.1rem',
		fontFamily: "'Montserrat', sans-serif",
		fontWeight: 700,
		textTransform: 'uppercase',
		letterSpacing: '1px',
		margin: 0
	},
	closeButton: {
		marginRight: 10,
		color: 'black'
	},
	root: {
		margin: 10
	},
	orderButton: {
		backgroundColor: '#FBEA21',
		marginRight: 10
	},
	chip: {
		margin: theme.spacing.unit,
		backgroundColor: theme.palette.ylla_yellow.main
	},
	card: {
		backgroundColor: 'rgba(1,1,1,0)'
	},
	media: {
		height: 75
	},
	avatar: {
		margin: 10
	},
	bigAvatar: {
		width: 60,
		height: 60
	},
	providerImage: {
		width: 340,
		maxHeight: 200,
		marginBottom: 10,
		marginTop: 10
	},
	halfColumn: {
		maxWidth: '48%',
		minWidth: '48%',
		position: 'relative',
		wordWrap: 'break-word',
		float: 'left',
		padding: 4
	},
	textFieldInput: {
		borderRadius: 4,
		backgroundColor: theme.palette.common.white,
		border: '1px solid #ced4da',
		fontSize: 16,
		padding: '10px 12px',
		width: 'calc(100% - 24px)',
		transition: theme.transitions.create(['border-color', 'box-shadow']),
		'&:focus': {
			borderColor: '#80bdff',
			boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
		}
	},
	distance: {
		fontSize: '0.8rem'
	},
	smallText: {
		fontSize: '0.8rem',
		marginRight: '2px'
	},
	cardTitle: {
		fontSize: '1.1rem',
		fontFamily: "'Montserrat', sans-serif",
		fontWeight: 700,
		textTransform: 'uppercase',
		letterSpacing: '1px'
	},
	clear: {
		clear: 'left'
	}
});

// Class: ProviderView: the sidebar proider view displays the details of providers
class ProviderView extends Component {

	// constructor: call super, set up state, and handler bindings
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	triggerWeblink = (url) => {

		if(!url.startsWith("https") && !url.startsWith("http")){
		  	url = 'https://'+url; 
		}
		window.open(url);
	}
	// render: 
	render() {
		const { classes, provider } = this.props;
		const self = this;
		const amenityLookup = {};
		this.props.referencedata.forEach(reference => {
			if (reference.type === 'location_amenity') amenityLookup[reference.system_name] = { text: reference.text, icon: reference.icon };
		});
		return (
			<div className={classes.root}>
				<AppBar position="sticky" elevation={0} className={classes.appBar}>
					<Toolbar disableGutters={true}>
						{provider.addresses && provider.addresses.length > 0 && provider.addresses[0].location ?
							<IconButton className={classes.closeButton} aria-label="Menu" onClick={() => this.props.navigate(provider.addresses[0].location)}>
								<NavigationIcon />
							</IconButton> : null}
						<Typography variant="title" className={classes.title} color="inherit">{provider.name}</Typography>
						<IconButton className={classes.closeButton} color="inherit" aria-label="Menu" onClick={() => this.props.close()}>
							<svg width='20'
								fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="1.414" clip-rule="evenodd" viewBox="0 0 28 28">
								<g fill="#313131" fill-rule="nonzero" stroke="#313131" stroke-width=".3">
									<path d="M8.893 10.36a1.037 1.037 0 0 0 1.471 0 1.042 1.042 0 0 0 0-1.472L2.043.559a1.04 1.04 0 1 0-1.47 1.472l8.32 8.329zM15.26 13.788L27.008 2.031a1.042 1.042 0 0 0 0-1.472c-.407-.407-1.065-.586-1.471-.179L13.055 12.694h-.309v.36L.419 25.546c-.406.406-.329 1.065.076 1.472.203.204.508.305.774.305.267 0 .552-.101.755-.305L13.78 15.261l11.751 11.758a1.041 1.041 0 0 0 1.474 0 1.04 1.04 0 0 0 .001-1.472L15.26 13.788z" />
								</g>
							</svg>
						</IconButton>
					</Toolbar>
				</AppBar>
				<img alt="Provider full cover" className={classes.providerImage} src={provider.cover && provider.cover.id ? ('/api/images/getimage?id=' + provider.cover.id) : 'https://via.placeholder.com/350x200'} />
				<Card className={classes.card} elevation={0}>
					<CardHeader
						classes={{
							title: classes.cardTitle
						}}
						avatar={
							<div>
								{provider.logo ?
									<Avatar src={provider.logo.id && provider.logo.id !== '' ? '/api/images/getimage?id=' + provider.logo.id : provider.logo.datauri} className={classes.avatar}></Avatar>
									:
									<Avatar aria-label={provider.name} className={classes.avatar}>{provider.name.substring(0, 1)}</Avatar>
								}
								<Typography variant="body2" className={classes.distance}>{provider.distance ? provider.distance + ' miles away' : ''}</Typography>
							</div>
						}
						title={'Description'}
						subheader={provider.description}
					/>
				</Card>
				<br />
				<Typography variant="subheading" className={classes.subHeading}>Contact details</Typography>
				<div className={classes.halfColumn}>
					<Typography variant="body2" className={classes.smallText}><PhoneIcon className={classes.smallText} /> {provider.phone}</Typography>
					{/* {	provider.email!=null && provider.email.length!=0 && provider.email.includes('@') && provider.email.includes('.') ? 
    						<Typography variant="body2" className={classes.smallText}><AlternateEmailIcon className={classes.smallText} /><a href={'mailto:' + provider.email} >{'Email'}</a> </Typography>
    					: null 	}
					{(provider.website == "" || provider.website === null) ? null:<Typography variant="body2" className={classes.smallText} onClick={() => this.triggerWeblink(provider.website)}><WebIcon className={classes.smallText} />{'Visit website'}</Typography>} */}
				</div>
				<div className={classes.halfColumn}>
					<Typography variant="body2" className={classes.smallText}>
						<LocationOnIcon className={classes.smallText} />
						{provider.addresses && provider.addresses.length > 0 ?
							provider.addresses[0].address : ''
						}
					</Typography>
				</div>
				<div className={classes.clear}></div>
				<br />
				<br />
				{self.props.allow_request && provider.services && provider.services.length > 0 ?
					(self.props.services
						.filter(service => (provider.services && provider.services.indexOf(service.system_name) !== -1))
						.map(service => {
							return (
								<div key={'div-service-' + service.system_name}> 
									<ProviderOpeningHours
										provider={provider}
										service_name={service.system_name}
									/>
									<br />
								</div>
							)
						})) : null}
				{self.props.allow_request && provider.services && provider.services.length > 0 ?
					<div className={classes.halfColumn}>
						{this.props.user && this.props.user.user_type ?
							<Button fullWidth className={classes.orderButton} size="large" className={classes.orderButton} onClick={() => self.props.request(provider, provider.services[0])}>Order</Button>
							: null}
					</div> : null}
				<div className={classes.halfColumn}>
					<Button fullWidth variant="outlined" size="large" className={classes.button} onClick={() => self.props.chat(provider)}>Chat</Button>
				</div>
				<br />
				<br />
			</div>
		);
	}
}

//
ProviderView.propTypes = {
	providers: PropTypes.array.isRequired
};

export default withStyles(styles)(ProviderView);
