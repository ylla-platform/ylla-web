// Import React Stuff
import PropTypes from 'prop-types';
import { Component } from 'react';

// Import Mapbox GL
import Map from 'mapbox-gl';
import './mapbox-gl-geocoder.css';

import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

// Class: Geocoder
class Geocoder extends Component {
    // 
    context: { map: Map; };
    // 
    static contextTypes = { map: PropTypes.object.isRequired };
    // componentDidMount
    componentDidMount = () => {
        const { map } = this.context;
        map.addControl(
            new MapboxGeocoder({
                accessToken: "pk.eyJ1IjoiY2FydG9jb25zdWx0bHRkIiwiYSI6ImNqNHBmcG94ejIzaG4zM3NleGh5cmdrNXoifQ.ZzHjlwcCe_HfWhSXUZLZ6w"
            })
        );
    }
    // render
    render() {
        return null;
    }
}

export default Geocoder;