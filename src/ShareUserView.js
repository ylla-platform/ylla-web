// Import React Stuff
import PropTypes from 'prop-types';
import React, { Component } from 'react';

// Material UI includes
import Divider from '@material-ui/core/Divider';
import ListSubheader from '@material-ui/core/ListSubheader';
import { withStyles } from '@material-ui/core/styles';

// Our components
import ShareUserCard from './ShareUserCard';

// Styles: 
const styles = theme => ({
	root: {
		width: '100%',
		padding: 10
	}
});

// Class: ShareUserView
class ShareUserView extends Component {
	// render: 
	render() {
		const { classes } = this.props;
		return (
			<div className={classes.root}>
				<ListSubheader>Selected friend</ListSubheader>
				<Divider />
				<br />
				<ShareUserCard
					user={this.props.user}
					chat={this.props.chat}
					navigate={this.props.navigate}
					goto={this.props.goto}
				/>
				<br />
				<ListSubheader>Other friends</ListSubheader>
				<Divider />
				<br />
				{this.props.live_locations
					.filter(share => share.id !== this.props.user.id)
					.map(share => {
						return (
							<ShareUserCard
								user={share}
								chat={this.props.chat}
								navigate={this.props.navigate}
								goto={this.props.goto}
							/>
						)
					})}
			</div>
		);
	}
}

//
ShareUserView.propTypes = {
	user: PropTypes.object.isRequired
};

export default withStyles(styles)(ShareUserView);