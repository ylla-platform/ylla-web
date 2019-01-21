import compose from 'recompose/compose';
import pure from 'recompose/pure';
import PropTypes from 'prop-types';
import React from 'react';

// Material UI
import EventListener from 'react-event-listener';
import Modal from '@material-ui/core/Modal';
import withWidth from '@material-ui/core/withWidth';
import { withStyles } from '@material-ui/core/styles';

// Axios for making requests
import axios from 'axios';

import './components/app-search/app-search.css';

// Styles
const styles = theme => ({
	search: {
		display: 'inline'
	},
	label1:{
		marginRight:'10px',
		fontSize: '2rem',
		fontWeight: 'bold'
	}
})

class AppSearch extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			open: this.props.open,
			value: '',
			address_suggestions: [],
			provider_suggestions: [],
			agent_suggestions: [],
			services_suggestions: []
		};
	}
	getModalStyle = () => {
		const top = 50;
		const left = 50;
		return {
			top: `${top}%`,
			left: `${left}%`,
			transform: `translate(-${top}%, -${left}%)`,
		};
	}
	getAddressSuggestions(value, callback) {
		const inputValue = value.trim().toLowerCase();
		const inputLength = inputValue.length;
		if (inputLength < 4) this.setState({ address_suggestions: [] });
		axios.get('api/geocoder/suggest?searchText=' + inputValue)
			.then(response => {
				var s = response.data.features.map(function (feat) {
					return { label: feat.text, value: feat.magic };
				});
				callback(s);
			})
			.catch(error => { });
	}
	selectAddress = (address, magic) => {
		// Then get the coordinates
		axios.get('api/geocoder/find?searchText=' + address + '&magic=' + magic)
			.then(response => {
				if (response && response.data && response.data.features && response.data.features.length > 0) {
					this.props.updateMapLocationWithPin(response.data.features[0].center);
				}
			})
			.catch(error => { });
	}

	// componentWillReceiveProps: set the provider on receiving a state update from the parent
	componentWillReceiveProps = (nextProps) => {
		
		if(this.state.open!=nextProps.open){
			this.setState({
			open: nextProps.open
		});
		}
		
	}

	handleClose = () =>
	{
		this.setState({ open:false, value: '' });
		this.props.close();
	}


	searchChange = (e) => {
		let value = e.currentTarget.value;
		this.setState({ value: value });
			let providers = [];
			let agents = [];
			let services = [];
		if (value.length > 0) {
			value = value.replace(/\s/g, '').toLowerCase();
			
			// Search the providers
			if (this.props.providers) {
				this.props.providers.forEach(provider => {
					if (provider.name.replace(/\s/g, '').toLowerCase().indexOf(value) !== -1) providers.push(provider);
				});
			}
			// Search the agents
			if (this.props.agents) {
				this.props.agents.forEach(agent => {
					if (agent.first_name && (agent.first_name.replace(/\s/g, '').toLowerCase().indexOf(value) !== -1 || agent.first_name.replace(/\s/g, '').toLowerCase().indexOf(value) !== -1)) agents.push(agent);
				});
			}
			// Search services
			if (this.props.services) {
				this.props.services.forEach(service => {
					if (service.title.replace(/\s/g, '').toLowerCase().indexOf(value) !== -1) {
						services.push(service);
					} else if (service.keywords) {
						let found = false;
						service.keywords.forEach(keyword => {
							if (keyword.replace(/\s/g, '').toLowerCase().indexOf(value) !== -1) found = true;
						});
						if (found) services.push(service);
					}
				});
			}

		}
			this.setState({
				agent_suggestions: agents,
				provider_suggestions: providers,
				services_suggestions: services
			});

			// Do the address selections separately as there can be a bit of a delay
			this.getAddressSuggestions(e.currentTarget.value, suggestions => {
				this.setState(
					{
						address_suggestions: suggestions
					}
				);
			});
	}
	render() {
		const { classes } = this.props;
		return (
				<Modal
					open={this.state.open}
					disableAutoFocus={true}
					disableEnforceFocus={true}
					onClose={() => this.handleClose()}
					BackdropProps={{
						invisible: true
					}}
				>
				<div className="search__modal">
					<div className={classes.search} class="search">
						<div class="search__box">
							<label className={classes.label1}>Search Ylla</label>
							<input
								id="txt-search"
								value={this.state.value}
								onChange={this.searchChange}
							/>
						</div>
					</div>
						
						{this.state.provider_suggestions.length > 0?
						<div>
							<h2>Providers</h2>
							<ul>
								{this.state.provider_suggestions.map(provider => {
									let location = [];
									if (provider.addresses) {
										let addresses = provider.addresses.filter(address => { return address.public })
										if (addresses.length > 0) location = addresses[0].location;
									}
									return (
										<li onClick={() => this.props.viewProvider(provider.id)}>
											<span className={location.length > 0 ?'search__item--long search__text':'search__text'}>{provider.name}</span>

											{location.length > 0 ?
											<svg width="30" onClick={(e) => this.props.updateMapLocation(location)} xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="1.414" clip-rule="evenodd" viewBox="0 0 32 32">
											  <g fill-rule="nonzero">
											    <path d="M16.134 1.651c6.077.118 11.554 6.358 9.946 12.53-1.324 5.086-5.443 9.382-9.172 12.818-.251.218-.311.226-.485.283-1.211.4-2.488-1.287-3.73-2.563-2.392-2.457-4.581-5.146-5.982-8.256 0 0-.256-1.305.623-1.749.935-.473 1.666.455 2.471 1.901 1.565 2.812 3.759 5.247 6.103 7.476l.069.066c2.919-2.872 5.772-6.027 7.19-9.709 1.714-4.449-2.209-10.298-7.462-10.092-3.957.155-7.251 3.777-7.357 7.943 0 0-.054.427-.229.686-.655.97-2.496.577-2.466-1.027.17-5.458 4.921-10.343 10.481-10.307z"/>
											    <path d="M16.112 7.651c3.319.127 5.676 4.839 2.888 7.497-2.499 2.383-7.938.357-7.3-3.809.304-1.987 2.118-3.609 4.188-3.688h.224zm-.155 2.7c-1.418.054-2.284 2.407-.635 3.153 1.04.471 2.474-.461 2.315-1.714-.103-.804-.845-1.45-1.68-1.439zM25.034 20.65a1.41 1.41 0 0 1 1.101.621c1.413 2.331 2.746 4.71 4.058 7.099.413.814-.193 1.932-1.148 1.979-8.696.145-17.394.145-26.09 0-.919-.045-1.575-1.138-1.149-1.979C3.108 26 4.489 23.674 5.83 21.326c.429-.707 1.5-.888 2.111-.294.424.412.521 1.1.233 1.634L5.326 27.65h21.347l-2.848-4.984c-.463-.858.054-2.02 1.209-2.016z"/>
											  </g>
											</svg> : null}
											<svg width="30" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="1.414" clip-rule="evenodd" viewBox="0 0 32 32">
											  <path fill-rule="nonzero" d="M16.136 6.651c5.746.075 11.112 3.561 14.04 8.686.443.814-.238 1.793-.842 2.677-4.161 6.101-12.532 9.053-19.425 6.073-2.09-.903-3.959-2.274-5.534-3.938 0 0-.269-.337-.333-.643-.245-1.179 1.344-2.191 2.557-.938 3.753 3.785 9.786 5.119 14.588 2.969 2.57-1.151 4.716-3.144 6.23-5.519l.011-.018c-2.961-4.722-8.843-7.644-14.403-6.295-3.765.914-6.91 3.723-8.886 7.02 0 0-.678.759-1.427.595-.896-.196-1.296-1.284-.741-2.238 2.953-4.992 8.327-8.457 14.165-8.431zm-.067 3.999c2.035.039 3.972 1.305 4.807 3.15 1.443 3.186-1.137 7.503-4.807 7.55-2.373.03-4.652-1.696-5.25-4.014-.815-3.159 1.848-6.707 5.25-6.686zm-.137 2.701c-2.279.087-3.668 3.866-1.021 5.065 1.67.756 3.974-.742 3.718-2.753-.165-1.292-1.358-2.329-2.697-2.312z"/>
											</svg>
										</li>
									)
								})}
							</ul>
						</div>
						:null}

						
						{this.state.services_suggestions.length > 0?
						<div>
							<h2>Services</h2>
							<ul>
								{this.state.services_suggestions.map(service => {
									return (
										<li onClick={(e) => this.props.selectService(service, service.service_function)}>
											<span className="search__text">{service.title}</span>
											<svg width="30" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="1.414" clip-rule="evenodd" viewBox="0 0 32 32">
											  <path fill-rule="nonzero" d="M16.136 6.651c5.746.075 11.112 3.561 14.04 8.686.443.814-.238 1.793-.842 2.677-4.161 6.101-12.532 9.053-19.425 6.073-2.09-.903-3.959-2.274-5.534-3.938 0 0-.269-.337-.333-.643-.245-1.179 1.344-2.191 2.557-.938 3.753 3.785 9.786 5.119 14.588 2.969 2.57-1.151 4.716-3.144 6.23-5.519l.011-.018c-2.961-4.722-8.843-7.644-14.403-6.295-3.765.914-6.91 3.723-8.886 7.02 0 0-.678.759-1.427.595-.896-.196-1.296-1.284-.741-2.238 2.953-4.992 8.327-8.457 14.165-8.431zm-.067 3.999c2.035.039 3.972 1.305 4.807 3.15 1.443 3.186-1.137 7.503-4.807 7.55-2.373.03-4.652-1.696-5.25-4.014-.815-3.159 1.848-6.707 5.25-6.686zm-.137 2.701c-2.279.087-3.668 3.866-1.021 5.065 1.67.756 3.974-.742 3.718-2.753-.165-1.292-1.358-2.329-2.697-2.312z"/>
											</svg>
										</li>
									)
								})}
							</ul>
						</div>
						:null}

						{this.state.address_suggestions.length > 0?
						<div>
							<h2>Locations</h2>
							<ul>
								{this.state.address_suggestions.map(suggestion => {
									return (
										<li onClick={(e) => this.selectAddress(suggestion.label, suggestion.value)}>
											<span className="search__text">{suggestion.label}</span>
											<svg width="30" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="1.414" clip-rule="evenodd" viewBox="0 0 32 32">
											  <g fill-rule="nonzero">
											    <path d="M16.134 1.651c6.077.118 11.554 6.358 9.946 12.53-1.324 5.086-5.443 9.382-9.172 12.818-.251.218-.311.226-.485.283-1.211.4-2.488-1.287-3.73-2.563-2.392-2.457-4.581-5.146-5.982-8.256 0 0-.256-1.305.623-1.749.935-.473 1.666.455 2.471 1.901 1.565 2.812 3.759 5.247 6.103 7.476l.069.066c2.919-2.872 5.772-6.027 7.19-9.709 1.714-4.449-2.209-10.298-7.462-10.092-3.957.155-7.251 3.777-7.357 7.943 0 0-.054.427-.229.686-.655.97-2.496.577-2.466-1.027.17-5.458 4.921-10.343 10.481-10.307z"/>
											    <path d="M16.112 7.651c3.319.127 5.676 4.839 2.888 7.497-2.499 2.383-7.938.357-7.3-3.809.304-1.987 2.118-3.609 4.188-3.688h.224zm-.155 2.7c-1.418.054-2.284 2.407-.635 3.153 1.04.471 2.474-.461 2.315-1.714-.103-.804-.845-1.45-1.68-1.439zM25.034 20.65a1.41 1.41 0 0 1 1.101.621c1.413 2.331 2.746 4.71 4.058 7.099.413.814-.193 1.932-1.148 1.979-8.696.145-17.394.145-26.09 0-.919-.045-1.575-1.138-1.149-1.979C3.108 26 4.489 23.674 5.83 21.326c.429-.707 1.5-.888 2.111-.294.424.412.521 1.1.233 1.634L5.326 27.65h21.347l-2.848-4.984c-.463-.858.054-2.02 1.209-2.016z"/>
											  </g>
											</svg>
										</li>
									)
								})}
							</ul>
						</div>
						:null}

					</div>
				</Modal>
		);
	}
}

AppSearch.propTypes = {
	classes: PropTypes.object.isRequired,
	width: PropTypes.string.isRequired,
};

export default compose(withStyles(styles, { withTheme: true }), withWidth(), pure)(AppSearch);