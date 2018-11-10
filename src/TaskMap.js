// Import React
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

// Material UI
import { Avatar } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge';
import Tooltip from '@material-ui/core/Tooltip';

// Mapbox GL
import { Marker } from 'react-mapbox-gl';
import ReactMapboxGl, { Layer } from 'react-mapbox-gl';
import { RotationControl } from 'react-mapbox-gl';
import { Source } from 'react-mapbox-gl';
import { ZoomControl } from 'react-mapbox-gl';
import { setRTLTextPlugin } from 'mapbox-gl';

// Material Icons
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PeopleIcon from '@material-ui/icons/People';
import UpdateIcon from '@material-ui/icons/Update';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

// Custom Mapbox plugin controls
import Directions from './Directions';

// 
const styles = theme => ({
	margin: {
		margin: theme.spacing.unit * 2
	},
	padding: {
		padding: `0 ${theme.spacing.unit * 2}px`,
	},
	zoomNav: {
		left: 10,
		top: 10
	},
	rotationNav: {
		left: 10,
		top: 63
	},
	avatar1: {
		backgroundColor: theme.palette.ylla_business.main
	},
	avatar2: {
		backgroundColor: theme.palette.ylla_freelancer.main
	},
	avatar3: {
		backgroundColor: theme.palette.ylla_yellow
	},
});

// 
const Map = ReactMapboxGl({
	accessToken: '',
	minZoom: 7,
	maxZoom: 18,
	scrollZoom: true,
	interactive: true,
	dragRotate: true,
	attributionControl: true
});

// 
const map_url = '';

// 
const bounds = [
	[46, 28],
	[49, 30]
];

// Class: TaskMap
class TaskMap extends Component {

	displayName() { return 'TaskMap'; }

	// getServiceAddresses
	getServiceAddresses = (providers) => {
		var addresses = [];
		providers.forEach(provider => {
			if (provider.addresses && provider.addresses.length > 0) {
				provider.addresses.forEach(address => {
					if (address.location && address.location.length > 0 && address.public) {
						address.provider_id = provider.id;
						address.provider_name = provider.name;
						addresses.push(address);
					}
				});
			}
		});
		return addresses;
	}

	// constructor: 
	constructor(props) {
		super(props);
		setRTLTextPlugin('https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.1.2/mapbox-gl-rtl-text.js');
		this.state = {
			poi_filter: ['in', 'type'],
			poi_icons: [],
			show_buildings: this.props.show_buildings,
			language: this.props.language,
			origin: this.props.origin,
			destination: this.props.destination,
			service_addresses: this.getServiceAddresses(this.props.providers),
			maxBounds: bounds,
			fitBounds: [],
			center: [47.9774, 29.3759],
			zoom: [17],
			pitch: [90],
			bearing: [0]
		};
	}

	// componentWillReceiveProps: 
	componentWillReceiveProps = (nextProps) => {
		let filter = ['in', 'type'];
		let poi_icons = [];
		Object.keys(nextProps.category_keys).forEach(t => {
			if (nextProps.category_keys[t].selected
				&& nextProps.category_keys[t].osm_tags
				&& nextProps.category_keys[t].osm_tags.length > 0) {
				nextProps.category_keys[t].osm_tags.forEach(tag => {
					filter.push(tag);
					poi_icons.push(nextProps.category_keys[t].colour);
				});
			}
		});
		let service_addresses = this.getServiceAddresses(nextProps.providers);
		if (nextProps.language !== this.state.language) this.updateLanguage(nextProps.language);
		if (nextProps.location && nextProps.location.length > 0 && nextProps.location !== this.state.center) {
			this.setState({
				poi_filter: filter,
				poi_icons: poi_icons,
				show_buildings: nextProps.show_buildings,
				language: nextProps.language,
				origin: nextProps.origin,
				destination: nextProps.destination,
				service_addresses: service_addresses,
				center: nextProps.location,
				zoom: [20],
				pitch: [160],
				bearing: [90]
			});
		} else {
			this.setState({
				poi_filter: filter,
				poi_icons: poi_icons,
				show_buildings: nextProps.show_buildings,
				language: nextProps.language,
				origin: nextProps.origin,
				destination: nextProps.destination,
				service_addresses: service_addresses
			});
		}
	}

	// clusterMarker: 
	clusterTasks = (coordinates, count) => (
		<Marker coordinates={coordinates}>
			<Badge badgeContent={count}  >
				<UpdateIcon />
			</Badge>
		</Marker>
	);

	// clusterServices:
	clusterServices = (coordinates, count) => (
		<Marker coordinates={coordinates}>
			<Badge badgeContent={count}  >
				<LocationOnIcon />
			</Badge>
		</Marker>
	);

	// clusterServices:
	clusterLiveUsers = (coordinates, count) => (
		<Marker coordinates={coordinates}>
			<Badge badgeContent={count}  >
				<Button variant="fab" mini   aria-label="people">
					<PeopleIcon />
				</Button>
			</Badge>
		</Marker>
	);

	// handleMapClick: 
	handleMapClick = (map, e) => {
		var bbox = [[e.point.x - 100, e.point.y - 100], [e.point.x + 100, e.point.y + 100]];
		let layers = [];
		this.state.poi_icons.forEach((icon, x) => {
			layers.push('poi-circle-' + x);
		});
		var features = map.queryRenderedFeatures(bbox, { layers: layers });
		var features_to_display = [];
		features.forEach(feature => {
			features_to_display.push({ name: feature.properties.name, type: feature.properties.type, location: feature.geometry.coordinates });
		});
		if (features_to_display.length > 0) this.props.viewFeatures(features_to_display);
	}

	// updateLanguage: 
	updateLanguage = (language) => {
		if (this.map && this.map.state && this.map.state.map && this.map.state.map.loaded()) {
			this.map.state.map.setLayoutProperty('poi-scalerank1', 'text-field', ['get', 'name_' + language]);
			this.map.state.map.setLayoutProperty('poi-scalerank2', 'text-field', ['get', 'name_' + language]);
			this.map.state.map.setLayoutProperty('road-label-small', 'text-field', ['get', 'name_' + language]);
			this.map.state.map.setLayoutProperty('road-label-medium', 'text-field', ['get', 'name_' + language]);
			this.map.state.map.setLayoutProperty('road-label-large', 'text-field', ['get', 'name_' + language]);
			this.map.state.map.setLayoutProperty('poi-parks-scalerank1', 'text-field', ['get', 'name_' + language]);
			this.map.state.map.setLayoutProperty('poi-parks-scalerank2', 'text-field', ['get', 'name_' + language]);
			this.map.state.map.setLayoutProperty('poi-parks-scalerank3', 'text-field', ['get', 'name_' + language]);
			this.map.state.map.setLayoutProperty('water-label-sm', 'text-field', ['get', 'name_' + language]);
			this.map.state.map.setLayoutProperty('waterway-label', 'text-field', ['get', 'name_' + language]);
			this.map.state.map.setLayoutProperty('place-residential', 'text-field', ['get', 'name_' + language]);
			this.map.state.map.setLayoutProperty('place-neighbourhood', 'text-field', ['get', 'name_' + language]);
			this.map.state.map.setLayoutProperty('place-suburb', 'text-field', ['get', 'name_' + language]);
			this.map.state.map.setLayoutProperty('place-hamlet', 'text-field', ['get', 'name_' + language]);
			this.map.state.map.setLayoutProperty('place-village', 'text-field', ['get', 'name_' + language]);
			this.map.state.map.setLayoutProperty('place-town', 'text-field', ['get', 'name_' + language]);
			this.map.state.map.setLayoutProperty('place-island', 'text-field', ['get', 'name_' + language]);

			this.map.state.map.getStyle().layers.forEach(layer => {
				if (layer.id.indexOf('poi-text-') !== -1) this.map.state.map.setLayoutProperty(layer.id, 'text-field', ['get', 'name_' + language]);
			});
		}
	}

	// render: 
	render() {
		const { classes } = this.props;
		let poi_text_layout = {
			'text-field': '{name_' + this.state.language + '}',
			'text-font': ['Open Sans Bold', 'Arial Unicode MS Bold'],
			'text-offset': [0, 0.6],
			'text-anchor': 'top'
		};
		return (
			<Map
				ref={(e) => { this.map = e; }}
				style={map_url}
				center={this.state.center}
				zoom={this.state.zoom}
				pitch={this.state.pitch}
				bearing={this.state.bearing}
				maxBounds={this.state.maxBounds}
				fitBounds={this.state.bounds}
				containerStyle={{ top: 57, bottom: 0, right: 0, left: 0, position: 'absolute' }}
				onClick={this.handleMapClick}
			>
				<Source
					id='poi_source'
					tileJsonSource={{
						type: 'vector',
						url: 'mapbox://mapbox.mapbox-streets-v7'
					}}
				/>
				{this.state.show_buildings ?
					<Source
						id='buildings_source'
						tileJsonSource={{
							type: 'vector',
							url: ''
						}}
					/> : ''}
				{this.state.show_buildings ?
					<Layer
						id='3d-buildings'
						type='fill-extrusion'
						sourceId='buildings_source'
						sourceLayer='buildingscombined'
						paint={{
							'fill-extrusion-color': '#FFFFFF',
							'fill-extrusion-height': { 'type': 'identity', 'property': 'height' },
							'fill-extrusion-base': { 'type': 'identity', 'property': 'min_height' },
							'fill-extrusion-opacity': 0.6
						}}
					/> : ''}
				{this.state.poi_icons && this.state.poi_icons.length > 0 ?
					this.state.poi_icons.map((icon, ind) => {
						const text_paint = {
							'text-color': icon || '#000000',
							'text-halo-width': 1,
							'text-halo-color': '#FFFFFF'
						};
						const circle_paint = {
							'circle-color': icon || '#000000',
							'circle-stroke-width': 1,
							'circle-stroke-color': '#FFFFFF'
						};
						return (
							<div>
								<Layer
									id={'poi-text-' + ind}
									type='symbol'
									sourceId='poi_source'
									sourceLayer='poi_label'
									filter={['in', 'type', this.state.poi_filter[ind + 2]]}
									layout={poi_text_layout}
									paint={text_paint}
								/>
								<Layer
									id={'poi-circle-' + ind}
									type='circle'
									sourceId='poi_source'
									sourceLayer='poi_label'
									minZoom={3}
									filter={['in', 'type', this.state.poi_filter[ind + 2]]}
									paint={circle_paint}
								/>
							</div>)
					}) : null}
				{this.props.tasks ?
					this.props.tasks
						.filter(task => { return (!!task && task.location && task.location.length === 2) })
						.map((feature, key) =>
							<Marker
								key={key}
								coordinates={(feature && feature.location) ? feature.location : null}
								onClick={() => this.props.viewTask(feature ? feature.id : null)}>
								<Button variant="fab" mini   aria-label="task">
									<UpdateIcon />
								</Button>
							</Marker>) : ''}
				{this.props.pin
					&& this.props.pin.length > 0 ? // A map pin triggered by searching
					<Marker
						key={'mkr-pin'}
						coordinates={this.props.pin}
					>
						<Avatar>
							<LocationOnIcon />
						</Avatar>
					</Marker> : null}
				{this.state.service_addresses.map((address, k) => {
					let word1 = 'P';
					let word2 = '';
					if (address.provider_name.split(' ') && address.provider_name.split(' ').length > 0) {
						word1 = address.provider_name.split(' ')[0];
					}
					if (address.provider_name.split(' ') && address.provider_name.split(' ').length > 1) {
						word2 = address.provider_name.split(' ')[1];
					}
					return (
						<Marker
							key={k}
							coordinates={address.location}
							onClick={() => this.props.viewProvider(address.provider_id)}
						>
							<Avatar
								className={
									RegExp("^([a-hA-H])").test(address.provider_name.substring(0, 1)) ? classes.avatar1 : classes.avatar2
								}>
								{word1.substring(0, 1) + word2.substring(0, 1)}
							</Avatar>
						</Marker>
					)
				})}
				{this.props.current_location // Show the users current location
					&& this.props.current_location
					&& this.props.current_location.length > 0 ?
					<Marker
						key="mkr-user"
						coordinates={this.props.current_location}>
						{this.props.user && this.props.user.user_type === 'consumer' ?
							<Badge   badgeContent={this.props.user.share_location_users ? this.props.user.share_location_users.length : 0} className={classes.margin}>
								<Button variant="fab" mini   aria-label="me" onClick={this.props.viewSharingOptions}>
									<AccountCircleIcon />
								</Button>
							</Badge> : <Avatar><AccountCircleIcon /></Avatar>}
					</Marker>
					: ''}
				{this.props.live_locations ? // Show shared locations
					this.props.live_locations
						.filter(location => { // Ensure we have the location coordinates
							return location.location && location.location.length === 2
						})
						.map((location, key) => {
							let letter1 = 'U';
							let letter2 = '';
							if (location.first_name && location.first_name.length > 0) {
								letter1 = location.first_name.substring(0, 1);
							}
							if (location.last_name && location.last_name.length > 0) {
								letter2 = location.last_name.substring(0, 1);
							}
							return (
								<Marker
									key={key}
									coordinates={location.location}
								>
									<Tooltip title={location.first_name + ' ' + location.last_name}>
										<Button variant="fab" mini   onClick={(e) => this.props.viewShareUser(location)}>
											{letter1 + letter2}
										</Button>
									</Tooltip>
								</Marker>
							)
						}) : null}
				<RotationControl className={classes.rotationNav}
					position="top-right"
				/>
				<ZoomControl className={classes.zoomNav}
					position="top-right"
				/>
				<Directions
					origin={this.state.origin}
					destination={this.state.destination}
					updateInstructions={this.props.updateInstructions} />
			</Map>
		);
	}
}

// 
export default withStyles(styles)(TaskMap);
