import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

// Autosuggest
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';

// Import Material UI stuff
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

// Actions
import * as geocoderActions from './actions/geocoder';
import * as kuwaitActions from './actions/kuwait';

// Axios for making requests
import axios from 'axios';

// renderInput
function renderInput(inputProps) {
	const { classes, autoFocus, value, ref, ...other } = inputProps;
	return (
		<TextField
			autoFocus={autoFocus}
			className={classes.textField}
			value={value}
			inputRef={ref}
			InputProps={{
				classes: {
					input: classes.input,
				},
				...other,
			}}
		/>
	);
}

// renderSuggestion
function renderSuggestion(suggestion, { query, isHighlighted }) {
	const matches = match(suggestion.label, query);
	const parts = parse(suggestion.label, matches);
	return (
		<MenuItem selected={isHighlighted} component="div">
			<div>
				{parts.map((part, index) => {
					return part.highlight ? (
						<span key={index} style={{ fontWeight: 300 }}>
							{part.text}
						</span>
					) : (
							<strong key={index} style={{ fontWeight: 500 }}>
								{part.text}
							</strong>
						);
				})}
			</div>
		</MenuItem>
	);
}

// renderSuggestionsContainer
function renderSuggestionsContainer(options) {
	const { containerProps, children } = options;
	return (
		<Paper {...containerProps} square>
			{children}
		</Paper>
	);
}

// getSuggestionValue
function getSuggestionValue(suggestion) {
	return suggestion.label;
}

// getSuggestions
function getSuggestions(value, callback) {
	const inputValue = value.trim().toLowerCase();
	const inputLength = inputValue.length;
	if (inputLength === 0) this.setState({ suggestions: [] });
	axios.get('api/geocoder/suggest?searchText=' + inputValue)
		.then(response => {
			var s = response.data.features.map(function (feat) {
				return { label: feat.text, value: feat.magic };
			});
			callback(s);
		})
		.catch(error => { });
}

// styles
const styles = theme => ({
	buttonProgress: {
		marginRight: theme.spacing.unit
	},
	container: {
		flexGrow: 1,
		position: 'relative',
		height: 50,
	},
	leftIcon: {
		marginRight: theme.spacing.unit,
	},
	suggestionsContainerOpen: {
		position: 'absolute',
		marginTop: theme.spacing.unit,
		marginBottom: theme.spacing.unit * 3,
		left: 0,
		right: 0,
		'z-index': 1,
	},
	suggestion: {
		display: 'block',
	},
	suggestionsList: {
		margin: 0,
		padding: 0,
		listStyleType: 'none',
	},
	textField: {
		width: '100%'
	},
	formControl: {
		margin: theme.spacing.unit,
		width: '100%'
	},
	textFieldRoot: {
		padding: 0,
		'label + &': {
			marginTop: theme.spacing.unit * 3,
		},
	},
	textFieldInput: {
		borderRadius: 4,
		backgroundColor: theme.palette.common.white,
		border: '1px solid #ced4da',
		fontSize: 16,
		padding: '10px 12px',
		width: 'calc(100% - 24px)',
		transition: theme.transitions.create(['border-color', 'box-shadow']),
		'&:focus': {
			borderColor: '#80bdff',
			boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
		},
	},
	input: {
		borderRadius: 4,
		backgroundColor: theme.palette.common.white,
		border: '1px solid #ced4da',
		fontSize: 16,
		padding: '10px 12px',
		width: 'calc(100% - 24px)',
		transition: theme.transitions.create(['border-color', 'box-shadow']),
		'&:focus': {
			borderColor: '#80bdff',
			boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
		},
	},
	textFieldFormLabel: {
		fontSize: 18,
	}
});

// Class: ProfileAddress
class ProfileAddress extends React.Component {

	// constructor: call super, set up state, and handler bindings
	constructor(props) {
		super(props);
		this.state = {
			address: (this.props.address ? this.props.address : ''),
			governorates: [],
			governorate: (this.props.governorate ? this.props.governorate : ''),
			governorate_geo: {},
			neighbourhoods: [],
			neighbourhood: (this.props.neighbourhood ? this.props.neighbourhood : ''),
			neighbourhood_geo: {},
			blocks: [],
			block: (this.props.block ? this.props.block : ''),
			block_geo: {},
			streets: [],
			street: (this.props.street ? this.props.street : ''),
			street_geo: {},
			house: (this.props.house ? this.props.house : ''),
			magic: '',
			suggestions: [],
			location: (this.props.location ? this.props.location : []),
			reverse_geocoding: false
		};
	}

	// componentWillReceiveProps:
	componentWillReceiveProps = (nextProps) => {
		this.setState({
			address: (nextProps.address ? nextProps.address : ''),
			governorate: (nextProps.governorate ? nextProps.governorate : ''),
			neighbourhood: (nextProps.neighbourhood ? nextProps.neighbourhood : ''),
			block: (nextProps.block ? nextProps.block : ''),
			street: (nextProps.street ? nextProps.street : ''),
			house: (nextProps.house ? nextProps.house : ''),
			location: (nextProps.location ? nextProps.location : [])
		});
	}

	// componentDidMount: 
	componentDidMount = () => {
		this.getGovernorates();
	}

	// handleSuggestionsFetchRequested:
	handleSuggestionsFetchRequested = ({ value }) => {
		getSuggestions(value, s => {
			this.setState({ suggestions: s });
		});
	}

	// handleSuggestionSelected:
	handleSuggestionSelected = (event, { suggestion }) => {
		this.setState({
			magic: suggestion.value,
			address: suggestion.label
		});
		geocoderActions.find(suggestion.label, suggestion.value, address => {
			this.setState({
				location: address.features[0].center,
				address: address.features[0].place_name,
				governorate: address.governorate,
				neighbourhood: address.neighbourhood,
				neighbourhoods: [{ nhood_no: address.nhood_no, neighbourhood: address.neighbourhood }],
				block: address.block,
				blocks: [{ block_id: 1, block: address.block }],
				street: address.street,
				streets: [{ street_no: address.street_no, street: address.street }],
				house: this.state.house
			});
			this.setParentAddress(address.features[0].center, address.features[0].place_name,
				{
					governorate: address.governorate,
					neighbourhood: address.neighbourhood,
					block: address.block,
					street: address.street,
					house: this.state.house
				}
			);
			this.props.updateMapLocation(address.features[0].center);
		})
	}

	// setParentAddress
	setParentAddress = (location, address, fields) => {
		this.props.setAddress(location, address, fields);
	}

	// getLocation: 
	getLocation = (longitude, latitude) => {
		geocoderActions.reverse(latitude, longitude, address => {
			this.setState({
				location: address.features[0].center,
				address: address.features[0].place_name,
				governorate: address.governorate,
				neighbourhood: address.neighbourhood,
				neighbourhoods: [{ nhood_no: address.nhood_no, neighbourhood: address.neighbourhood }],
				block: address.block,
				blocks: [{ block_id: 1, block: address.block }],
				street: address.street,
				streets: [{ street_no: address.street_no, street: address.street }],
				house: this.state.house,
				reverse_geocoding: false
			});
			this.setParentAddress(address.features[0].center, address.features[0].place_name,
				{
					governorate: address.governorate,
					neighbourhood: address.neighbourhood,
					block: address.block,
					street: address.street,
					house: this.state.house
				}
			);
			this.props.updateMapLocation(address.features[0].center);
		})
	}

	// handleDetectCurrentLocation: 
	handleDetectCurrentLocation = () => {
		this.setState({ reverse_geocoding: true });
		let current = this.props.current_location;
		if (!current || current.length < 1) {
			navigator.geolocation.getCurrentPosition((position) => {
				this.getLocation(position.coords.longitude, position.coords.latitude);
			}, (error) => {
				this.setState({ reverse_geocoding: false });
			}, {
					enableHighAccuracy: true,
					timeout: 10000,
					maximumAge: 5000
				});
		} else {
			this.getLocation(current[0], current[1]);
		}
	}

	// handleSuggestionsClearRequested: 
	handleSuggestionsClearRequested = () => this.setState({ suggestions: [] });

	// handleAddressSuggestChange:
	handleAddressSuggestChange = (event, { newValue }) => {
		this.setState({ address: newValue });
		this.setParentAddress(this.state.location, newValue,
			{
				governorate: this.state.governorate,
				neighbourhood: this.state.neighbourhood,
				block: this.state.block,
				street: this.state.street,
				house: this.state.house
			}
		);
	}

	// getGovernorates
	getGovernorates = () => {
		kuwaitActions.getGovernorates(governorates => {
			if (governorates) {
				this.setState({
					governorates: governorates
				})
			}
		})
	}

	// setGovernorate: 
	setGovernorate = (governorate) => {
		this.setState({ governorate: governorate });
		this.setParentAddress(this.state.location, this.state.address, {
			governorate: governorate,
			neighbourhood: this.state.neighbourhood,
			block: this.state.block,
			street: this.state.street,
			house: this.state.house
		});
		this.getNeighbourhoods(governorate);
	}

	// getNeighbourhoods
	getNeighbourhoods = (governorate) => {
		// Get the governorate ID
		this.state.governorates.forEach(gov => {
			if (gov.governorate === governorate) {
				kuwaitActions.getNeighbourhoods(gov.gov_no, neighbourhoods => {
					this.setState({
						neighbourhoods: neighbourhoods
					})
				})
			}
		});
	}

	// setNeighbourhood: 
	setNeighbourhood = (neighbourhood) => {
		this.setState({ neighbourhood: neighbourhood });
		this.setParentAddress(this.state.location, this.state.address, {
			governorate: this.state.governorate,
			neighbourhood: neighbourhood,
			block: this.state.block,
			street: this.state.street,
			house: this.state.house
		});
		this.getBlocks(neighbourhood);
	}

	// getBlocks: 
	getBlocks = (neighbourhood) => {
		// Get the neighbourhood number
		this.state.neighbourhoods.forEach(nhood => {
			if (nhood.neighbourhood === neighbourhood) {
				kuwaitActions.getBlocks(nhood.nhood_no, blocks => {
					this.setState({
						blocks: blocks
					})
				})
			}
		});
	}

	// setBlock: 
	setBlock = (block) => {
		this.setState({ block: block });
		this.setParentAddress(this.state.location, this.state.address, {
			governorate: this.state.governorate,
			neighbourhood: this.state.neighbourhood,
			block: block,
			street: this.state.street,
			house: this.state.house
		});
		this.getStreets(block);
	}

	// getStreets: 
	getStreets = (block) => {
		// Get the neighbourhood number
		let nhood_no = '';
		let gov_no = '';
		this.state.neighbourhoods.forEach(nhood => {
			if (nhood.neighbourhood === this.state.neighbourhood) nhood_no = nhood.nhood_no;
		});
		this.state.governorates.forEach(gov => {
			if (gov.governorate === this.state.governorate) gov_no = gov.gov_no;
		});
		kuwaitActions.getStreets(gov_no, nhood_no, block, streets => {
			this.setState({
				streets: streets
			})
		})
	}

	// setStreet: 
	setStreet = (street) => {
		this.setState({
			street: street
		});
		this.setParentAddress(this.state.location, this.state.address, {
			governorate: this.state.governorate,
			neighbourhood: this.state.neighbourhood,
			block: this.state.block,
			street: street,
			house: this.state.house
		});
	}

	// render:
	render() {
		const { classes } = this.props;
		return (
			<div>
				<FormControl className={classes.formControl}>
					<Autosuggest
						theme={{
							container: classes.container,
							suggestionsContainerOpen: classes.suggestionsContainerOpen,
							suggestionsList: classes.suggestionsList,
							suggestion: classes.suggestion,
						}}
						renderInputComponent={renderInput}
						suggestions={this.state.suggestions}
						onSuggestionSelected={this.handleSuggestionSelected}
						onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
						onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
						renderSuggestionsContainer={renderSuggestionsContainer}
						getSuggestionValue={getSuggestionValue}
						renderSuggestion={renderSuggestion}
						inputProps={{
							disableUnderline: true,
							classes,
							margin: 'normal',
							placeholder: 'Search for address',
							value: this.state.address,
							onChange: this.handleAddressSuggestChange,
						}}
					/>
					{this.props.allow_autodetect ?
						<Button fullWidth onClick={this.handleDetectCurrentLocation}>
							{this.state.reverse_geocoding ?
								<CircularProgress size={24} className={classes.buttonProgress} /> : null}
							Use My Location
						</Button> : null}
				</FormControl>
				{this.props.governorate_lookup ?
					<div>
						<br />
						<FormControl className={classes.formControl}>
							<TextField
								fullWidth
								select
								className={classNames(classes.margin, classes.textField)}
								label="Governate"
								value={this.state.governorate}
								onChange={(e) => this.setGovernorate(e.target.value)}
								InputProps={{
									name: 'governorate',
									id: 'sel-governorate',
									disableUnderline: true,
									classes: {
										root: classes.textFieldRoot,
										input: classes.textFieldInput,
									}
								}}
								InputLabelProps={{
									shrink: true,
									className: classes.textFieldFormLabel,
								}}
							>
								{this.state.governorates
									.sort((a, b) => {
										return a.governorate.localeCompare(b.governorate)
									})
									.map(gov => {
										return <MenuItem key={gov.gov_no} value={gov.governorate}>{gov.governorate}</MenuItem>
									})}
							</TextField>
						</FormControl>
						<br />
						<FormControl className={classes.formControl}>
							<TextField
								fullWidth
								select
								className={classNames(classes.margin, classes.textField)}
								label="Neighbourhood"
								value={this.state.neighbourhood}
								onChange={(e) => this.setNeighbourhood(e.target.value)}
								InputProps={{
									name: 'neighbourhood',
									id: 'sel-neighbourhood',
									disableUnderline: true,
									classes: {
										root: classes.textFieldRoot,
										input: classes.textFieldInput,
									}
								}}
								InputLabelProps={{
									shrink: true,
									className: classes.textFieldFormLabel,
								}}
							>
								{this.state.neighbourhoods
									.sort((a, b) => {
										return a.neighbourhood.localeCompare(b.neighbourhood)
									})
									.map(nhood => {
										return <MenuItem key={nhood.nhood_no} value={nhood.neighbourhood}>{nhood.neighbourhood}</MenuItem>
									})}
							</TextField>
						</FormControl>
						<br />
						<FormControl className={classes.formControl}>
							<TextField
								fullWidth
								select
								className={classNames(classes.margin, classes.textField)}
								label="Block"
								value={this.state.block}
								onChange={(e) => this.setBlock(e.target.value)}
								InputProps={{
									name: 'sel-block',
									id: 'sel-block',
									disableUnderline: true,
									classes: {
										root: classes.textFieldRoot,
										input: classes.textFieldInput,
									}
								}}
								InputLabelProps={{
									shrink: true,
									className: classes.textFieldFormLabel,
								}}
							>
								{this.state.blocks
									.sort((a, b) => {
										return a.block.localeCompare(b.block)
									})
									.map(block => {
										return <MenuItem key={block.block_id} value={block.block}>{block.block}</MenuItem>
									})}
							</TextField>
						</FormControl>
						<br />
						<FormControl className={classes.formControl}>
							<TextField
								fullWidth
								select
								className={classNames(classes.margin, classes.textField)}
								label="Street"
								value={this.state.street}
								onChange={(e) => this.setStreet(e.target.value)}
								InputProps={{
									name: 'street',
									id: 'sel-street',
									disableUnderline: true,
									classes: {
										root: classes.textFieldRoot,
										input: classes.textFieldInput,
									}
								}}
								InputLabelProps={{
									shrink: true,
									className: classes.textFieldFormLabel,
								}}
							>
								{this.state.streets
									.sort((a, b) => {
										return a.street.localeCompare(b.street)
									})
									.map(street => {
										return <MenuItem key={street.street_no} value={street.street}>{street.street}</MenuItem>
									})}
							</TextField>
						</FormControl>
						<br />
						<FormControl className={classes.formControl}>
							<TextField
								id="txt-house"
								type="text"
								label="Unit"
								value={this.state.house}
								margin="normal"
								className={classes.formControl}
								helperText="Please enter a unit or house number"
								onChange={(e) => this.setHouse(e.target.value)}
								InputProps={{
									disableUnderline: true,
									classes: {
										root: classes.textFieldRoot,
										input: classes.textFieldInput,
									}
								}}
								InputLabelProps={{
									shrink: true,
									className: classes.textFieldFormLabel,
								}}
							/>
						</FormControl>
					</div> : null}
			</div>
		);
	}
}

// ProfileAddress
ProfileAddress.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProfileAddress);