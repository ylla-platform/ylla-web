// Include React Stuff
import React, { Component } from 'react';

// Material UI includes
import blue from '@material-ui/core/colors/blue';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme, withStyles } from '@material-ui/core/styles';

// Dashboad
import Dashboard from './Dashboard';

// Our global CSS
import './Ylla.css';

const theme = createMuiTheme({
	// override material-ui defaults
	overrides: {
		MUIDataTable: {
			paper: {
				boxShadow: "none",
				border: '1px solid #ccc'
			}
		}
	},
	palette: {
		primary: { main: blue[500] },
		secondary: { main: '#6BC892', contrastText: '#fff' },
		ylla_yellow: {
			main: '#FBEA21',
			text: '#000'
		},
		ylla_business: {
			main: '#6BC892',
			text: '#000'
		},
		ylla_freelancer: {
			main: 'rgba(255,140,0, 1)',
			text: '#fff'
		},
		ylla_customer: {
			main: 'rgba(0, 57, 102, 1)',
			text: '#fff'
		},
		sidebar_background: {
			main: 'rgba(245, 245, 237, 1)'
		}
	},
});

// 
const styles = theme => ({
	root: {
		height: '100%',
		overflowX: 'hidden',
	},
});

// Class: App. Main Application Class
class App extends Component {
	// componentWillMount: set the state to be a single screen that we can switch in handlers
	componentWillMount = () => {
	}
	// render: basic layout for the app is a div with the App classname
	render() {
		return (
			<MuiThemeProvider theme={theme}>
				<div className={this.props.classes.root}>
					<CssBaseline />
					<Dashboard />
				</div>
			</MuiThemeProvider>
		);
	}
}

export default withStyles(styles)(App);