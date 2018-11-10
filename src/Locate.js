// Import React
import PropTypes from 'prop-types';
import { Component } from 'react';

// Import Mapbox GL
import './mapbox-gl.css';
import { Map, GeolocateControl } from 'mapbox-gl';

// Class: Geocoder. 
class Geocoder extends Component {
    //
    context: { map: Map; };
    // 
    static contextTypes = { map: PropTypes.object.isRequired };
    // componentDidMount
    // 
    componentDidMount = () => {
        const { map } = this.context;

        map.addControl(
            new GeolocateControl({
                positionOptions: {
                    enableHighAccuracy: true
                },
                trackUserLocation: true
            }), 'bottom-right'
        );
    }
    // render: 
    render() {
        return null;
    }
}

export default Geocoder;