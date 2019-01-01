// Import React Stuff
import React from 'react';

// Import Material UI stuff
import IconButton from '@material-ui/core/IconButton';
import Modal from '@material-ui/core/Modal';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';

// Our helpers
import * as serviceHelper from './actions/services';
import './components/app-search/app-search.css';
// Styles
const styles = theme => ({
	dialog: {
		width: 900,
		maxHeight: 300,
		margin: 'auto',
		padding: 10,
		marginTop: 64,
		backgroundColor: '#F9F9F9',
		borderBottom: '10px solid #FBEA22'
	},
	button: {
		margin: theme.spacing.unit
	},
	categoryHeading: {
		fontSize: '0.8rem',
		fontFamily: "'Montserrat', sans-serif",
		fontWeight: 700,
		textTransform: 'uppercase',
		letterSpacing: '1px',
		cursor: 'pointer',
		paddingBottom: 8
	},
	header: {
		marginBottom: 5,
		borderBottom: '1px solid #ccc'
	},
	container: {
		textDecoration: 'none',
		'&:focus': {
			textDecoration: 'none',
		}
	},
	columns: {
		columnCount: 3,
		maxHeight: 200,
		columnGap: 10,
		columnFill: 'auto',
		overflowX: 'auto',
		overflowY: 'hidden'
	},
	serviceHeading: {
		fontSize: '0.8rem',
		fontFamily: "'Montserrat', sans-serif",
		letterSpacing: '1px',
		cursor: 'pointer'
	},
	title: {
		display: 'inline',
		fontSize: '1rem',
		fontFamily: "'Montserrat', sans-serif",
		fontWeight: 700,
		textTransform: 'uppercase',
		letterSpacing: '1px'
	}
});

// Class: 'Mega Menu'.
class MegaMenu extends React.Component {

	// constructor:
	constructor(props) {
		super(props);
		const services_grouped = serviceHelper.groupServices(this.props.services);
		this.state = {
			open: this.props.open,
			services_grouped: services_grouped,
			selected_category: '',
			selected_category_title: ''
		};
	}

	// componentWillReceiveProps: set the provider on receiving a state update from the parent
	componentWillReceiveProps = (nextProps) => {
		
		if(this.props.menuenter!=nextProps.menuenter){
			this.setState({
			open: nextProps.open,
			selected_category: '',
			selected_category_title: ''
		});
		}
		
	}

	

	// render: 
	render() {
		const { classes } = this.props;
		return (
			 <div class="menu__box">
				<div className={classes.container}>
					{this.state.selected_category !== '' ?
						<div className={classes.header}>
							<IconButton className={classes.button} onClick={() => this.setState({ selected_category: '', selected_category_title: '' })}>
								<ArrowBackIcon />
							</IconButton>
							<Typography
								variant="subheading"
								className={classes.title}>
								{this.state.selected_category_title}
							</Typography>
						</div> : null}
					<div className={classes.columns}>
						{Object.keys(this.state.services_grouped).sort().map((key) => { // Show categories
							let title = '';
							this.props.categories.forEach(cat => {
								if (cat.system_name === key) title = cat.title;
							});
							return (
								<div>
									{this.state.selected_category === '' ? <Typography
										variant="subheading"
										className={classes.categoryHeading}
										onClick={() => this.setState({ selected_category: key, selected_category_title: title })}>
										{title}
									</Typography> : null}
									{this.state.selected_category !== '' && this.state.selected_category === key ?
										(
											<div>
												{this.props.services
													.filter(s => { // Show those that are selected
														return s.categories.indexOf(this.state.selected_category) !== -1
													}).sort((a, b) => { return a.title.localeCompare(b.title) })
													.map(service => { // Show any services
														return (
															<Typography
																className={classes.serviceHeading}
																onClick={() => this.props.request('findapro', 'Find a Pro', service)}>
																{service.title}
															</Typography>)
													})}
											</div>
										) : null}
								</div>
							)
						})}
					</div>
				</div>
				</div>
			
		);
	}
}

MegaMenu.propTypes = {
};

export default withStyles(styles)(MegaMenu);