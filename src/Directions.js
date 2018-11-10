// Import React Stuff
import PropTypes from 'prop-types';
import { Component } from 'react';

// Import Mapbox GL
import Map from 'mapbox-gl';
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css';
import * as MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';

// Class: Directions
class Directions extends Component {

	// constructor: in the constructor we set the state and call super.
	constructor(props) {
		super(props);
		this.state = {
			directions: {},
			origin: this.props.origin,
			destination: this.props.destination
		}
	}
	context: { map: Map; };
	// 
	static contextTypes = { map: PropTypes.object.isRequired };

	// componentWillReceiveProps
	componentWillReceiveProps = (nextProps) => {
		let directions = this.state.directions;
		if (nextProps.origin && nextProps.origin !== this.state.origin && nextProps.origin !== []) {
			this.setState({ origin: nextProps.origin })
			directions.setOrigin(nextProps.origin);
		}
		// We have a new destination
		if (nextProps.destination && nextProps.destination !== this.state.destination && nextProps.destination.length > 0) {
			this.setState({ destination: nextProps.destination })
			directions.setDestination(nextProps.destination);
			directions.on('route', (e) => {
				this.props.updateInstructions(e.route[0].legs);
			})
		}
		// Reset directions
		if (nextProps.destination.length < 1 && nextProps.destination !== this.state.destination) {
			this.setState({ destination: nextProps.destination });
			directions.removeRoutes();
		}
	}

	// componentDidMount: 
	componentDidMount = () => {
		const { map } = this.context;
		let directions = new MapboxDirections({
			accessToken: 'pk.eyJ1IjoiY2FydG9jb25zdWx0bHRkIiwiYSI6ImNqNHBmcG94ejIzaG4zM3NleGh5cmdrNXoifQ.ZzHjlwcCe_HfWhSXUZLZ6w',
			interactive: false,
			controls: {
				instructions: false,
				inputs: false,
				profileSwitcher: false
			}
		});
		map.addControl(directions, 'top-right');
		directions.mapState();
		this.setState({ directions: directions });
	}

	// render: 
	render() {
		return null;
	}
}

export default Directions;