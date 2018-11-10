import React from 'react';
import PropTypes from 'prop-types';

// Import Material UI stuff
import Divider from '@material-ui/core/Divider';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';

// Icons
import * as icons from '@material-ui/icons';

// styles
const styles = theme => ({
});

// Class: ProviderPaymentTerms
class ProviderPaymentTerms extends React.Component {
	// constructor: call super, set up state, and handler bindings
	constructor(props) {
		super(props);
		this.state = {
		};
	}
	// render:
	render() {
		const { provider, classes } = this.props;
		return (
			<div>
				{provider.payment_how && provider.payment_how.length > 0 ?
					<div>
						<ListSubheader>Payment</ListSubheader>
						<Divider />
						<br />
						{this.props.referencedata.map(dataitem => {
							const Icon = icons[dataitem.icon];
							if (provider.payment_how.indexOf(dataitem.system_name) !== -1) {
								return (
									<Tooltip id="tooltip-icon" title={dataitem.text + ' accepted'} placement="bottom">
										<IconButton className={classes.button}>
											<Icon />
										</IconButton>
									</Tooltip>
								)
							}
							return null;
						})}
					</div>
					: null}
			</div>
		);
	}
}

//
ProviderPaymentTerms.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProviderPaymentTerms);