import React from 'react';
import PropTypes from 'prop-types';

// Import Material UI stuff
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

// styles
const styles = theme => ({
	subHeading: {
		fontSize: '1.1rem',
		fontFamily: "'Montserrat', sans-serif",
		fontWeight: 700,
		textTransform: 'uppercase',
		letterSpacing: '1px',
		margin: 0
	}
});

const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

// Class: ProviderOpeningHours
class ProviderOpeningHours extends React.Component {

	// constructor: call super, set up state, and handler bindings
	constructor(props) {
		super(props);
		this.state = {
			opening_hours_open: false
		};
	}
	// getOpeningHoursServiceDay: 
	getOpeningHoursServiceDay = (service, day) => {
		let hours = '';
		if (!this.props.provider
			|| !this.props.provider.service_booking_days
			|| !this.props.provider.service_booking_days[service]
			|| !this.props.provider.service_booking_days[service][day]) {
			let hours = 'Closed';
			return hours;
		}
		Object.keys(this.props.provider.service_booking_days[service][day]).forEach(session => {
			hours += (this.props.provider.service_booking_days[service][day][session].start + '-' + this.props.provider.service_booking_days[service][day][session].end) + ' ';
		});
		return hours;
	}
	// render:
	render() {
		const { classes } = this.props;
		return (
			<div>
				<Typography variant="subheading" className={classes.subHeading}>{'Opening hours'}</Typography>
				<table>
					{Object.keys(days).map(day => {
						return (<tr>
							<td><Typography variant="body2">{days[day].charAt(0).toUpperCase() + days[day].slice(1)}</Typography></td>
							<td><Typography variant="body2">{this.getOpeningHoursServiceDay(this.props.service_name, days[day])}</Typography></td>
						</tr>);
					})}
				</table>
			</div>
		);
	}
}

//
ProviderOpeningHours.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProviderOpeningHours);