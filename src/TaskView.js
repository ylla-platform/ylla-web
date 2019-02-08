// Import React Stuff
import PropTypes from 'prop-types';
import React, { Component } from 'react';

// Material UI includes
import Avatar from '@material-ui/core/Avatar';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import IconButton from '@material-ui/core/IconButton';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';


// Material Icons
import ChatIcon from '@material-ui/icons/Chat';
import EventIcon from '@material-ui/icons/Event';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import NavigationIcon from '@material-ui/icons/Navigation';
import PhoneIcon from '@material-ui/icons/Phone';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import StarRatingComponent from 'react-star-rating-component';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
// Our componetnts
import ProviderPaymentTerms from './ProviderPaymentTerms';

// Supporting actions
import * as taskActions from './actions/tasks';

import moment from 'moment';

// Styles: 
const styles = theme => ({
	appBar: {
		textAlign: 'center',
		borderBottom: '1px solid #B3B3B3',
		backgroundColor: '#F9F9F9',
		padding: 10,
		top: 62
	},
	chip: {
		margin: theme.spacing.unit,
		backgroundColor: theme.palette.ylla_yellow.main
	},
	root: {
		width: '100%',
		height: '100%',
		zIndex: 100
	},
	tab: {
		minWidth: 40
	},
	textFieldRoot: {
		padding: 0,
		'label + &': {
			marginTop: theme.spacing.unit * 3,
		}
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
		}
	},
	textFieldFormLabel: {
		fontSize: 18,
	},
	title: {
		fontSize: '1.2rem',
		fontFamily: "'Montserrat', sans-serif",
		fontWeight: 700,
		textTransform: 'uppercase',
		letterSpacing: '1px',
		textAlign: 'center',
		margin: 'auto', 
		color:'black'
	},  avatar: {
    marginTop: 15
  },
  greybid: {
  	fontSize: '13.5px',
    height: "25px",
    width: '120px',
    borderTopRightRadius: "18px",
    borderBottomRightRadius: "18px",
    borderTopLeftRadius: "18px",
    borderBottomLeftRadius: "18px",
    backgroundColor: "#60707C",
    color: "white",
    textAlign: "center",
    verticalAlign: "middle",
    fontWeight: "bold",
    textTransform: 'capitalize',
    cursor: 'pointer'

  },
  whitebid: {
	  	fontSize: '13.5px',
	    height: "25px",
	    width: '120px',
	    borderTopRightRadius: "18px",
	    borderBottomRightRadius: "18px",
	    borderTopLeftRadius: "18px",
	    borderBottomLeftRadius: "18px",
	    backgroundColor: "white",
	    border: "1px solid",
	    color: "#7F4095",
	    textAlign: "center",
	    verticalAlign: "middle",
	    fontWeight: "bold",
	    textTransform: 'capitalize',
	    cursor: 'pointer'
  },
  greenbid: {
  	fontSize: '13.5px',
    height: "25px",
    width: '120px',
    borderTopRightRadius: "18px",
    borderBottomRightRadius: "18px",
    borderTopLeftRadius: "18px",
    borderBottomLeftRadius: "18px",
    backgroundColor: "#649F55",
    color: "white",
    textAlign: "center",
    verticalAlign: "middle",
    fontWeight: "bold",
    textTransform: 'capitalize',
    cursor: 'pointer'
  },
  purplebutton: {
    fontSize: "13.5	px",
    color: "white",
    borderColor: "#7F4095",
    backgroundColor: "#7F4095",
    "&:hover": {
      backgroundColor: "#7F4095"
    },
    borderTopRightRadius: "18px",
    borderBottomRightRadius: "18px",
    borderTopLeftRadius: "18px",
    borderBottomLeftRadius: "18px",
    width: "180px",
    height: "40px",
    marginLeft: "35px"
  },
  whitebutton: {
    fontSize: '13.5px',
    color: "#7F4095",
    borderColor: "#7F4095",
    backgroundColor: "white",
    "&:hover": {
      backgroundColor: "white"
    },
    borderTopRightRadius: "18px",
    borderBottomRightRadius: "18px",
    borderTopLeftRadius: "18px",
    borderBottomLeftRadius: "18px",
 	width: "180px",
    height:'40px',
   	marginLeft: "35px",
    border: '1px solid'
  },  
  providerbutton: {
    fontSize: '13.5px',
    color: "white",
    borderColor: "#30769C",
    backgroundColor: "#30769C",
    "&:hover": {
      backgroundColor: "#30769C"
    },
    borderTopRightRadius: "18px",
    borderBottomRightRadius: "18px",
    borderTopLeftRadius: "18px",
    borderBottomLeftRadius: "18px",
 	width: "180px",
    height:'40px',
	marginLeft: "35px",
    border: '1px solid'
  },
  progressbutton: {
    fontSize: '13.5px',
    color: "white",
    borderColor: "#FF7F50",
    backgroundColor: "#FF7F50",
    "&:hover": {
      backgroundColor: "#FF7F50"
    },
    borderTopRightRadius: "18px",
    borderBottomRightRadius: "18px",
    borderTopLeftRadius: "18px",
    borderBottomLeftRadius: "18px",
 	width: "180px",
    height:'40px',
	marginLeft: "35px",
    border: '1px solid'
  },
  completedbutton: {
    fontSize: '13.5px',
    color: "white",
    borderColor: "#2D9CDB",
    backgroundColor: "#2D9CDB",
    "&:hover": {
      backgroundColor: "#2D9CDB"
    },
    borderTopRightRadius: "18px",
    borderBottomRightRadius: "18px",
    borderTopLeftRadius: "18px",
    borderBottomLeftRadius: "18px",
 	width: "180px",
    height:'40px',
	marginLeft: "35px",
    border: '1px solid'
  },
  greybutton: {
    fontSize: '13.5px',
    color: "white",
    borderColor: "#60707C",
    backgroundColor: "#60707C",
    "&:hover": {
      backgroundColor: "#60707C"
    },
    borderTopRightRadius: "18px",
    borderBottomRightRadius: "18px",
    borderTopLeftRadius: "18px",
    borderBottomLeftRadius: "18px",
 	width: "180px",
    height:'40px',
	marginLeft: "35px"
  },
  greenbutton: {
    fontSize: '13.5px',
    color: "white",
    borderColor: "#649F55",
    backgroundColor: "#649F55",
    "&:hover": {
      backgroundColor: "#649F55"
    },
    borderTopRightRadius: "18px",
    borderBottomRightRadius: "18px",
    borderTopLeftRadius: "18px",
    borderBottomLeftRadius: "18px",
 	width: "180px",
    height:'40px',
	marginLeft: "35px"
  }

});

// Class: TaskView: the sidebar task view displays the details of one or many tasks.
class TaskView extends Component {
	// constructor: call super, set up state, and handler bindings
	constructor(props) {
		super(props);
		this.state = {
			tasks: taskActions.convertTasksToDisplayFormat(this.props.tasks, this.props.agents, this.props.providers, this.props.services, this.props.consumers),
			rating: '',
			review: '',
			// tab_index: 0,
			selected_task: {},
			bid_dialog_open: false,
			bid_amount: '',
			bid_comment:'',

			//  will be seen on consumer
			task_provider_menu: false,
			task_provider_menu_anchor: null,
			selected_runner_id: '',
			selected_runner_name: '',
			selected_runner_price:0

		};
	}


	// componentWillReceiveProps: set the tasks from the parent state
	componentWillReceiveProps = (nextProps) => {

		this.setState({
			tasks: taskActions.convertTasksToDisplayFormat(nextProps.tasks, nextProps.agents, nextProps.providers, nextProps.services, nextProps.consumers)
		});
	}

	// cancelTask: 
	cancelTask = (id, event) => {
		this.props.cancelTask(id);
	}
	// handleSubmitRating: 
	handleSubmitRating = (id, event) => {
		this.props.editTaskRating({ id: id, rating: this.state.rating, review: this.state.review });
	}

	getBidStyle = (task, bid) => {

		var bidStyle = this.props.classes.whitebid; 
		if( (bid.provider_id && bid.provider_id.toString() == this.props.user.id ) || ( task.agent_id && task.agent_id == bid.provider_id.toString()))  {
			bidStyle = this.props.classes.greybid; 
		}if(task.status !== 'Requested' && task.status !== 'Bidding' && task.status !== 'BidChoosen' && task.agent_id && task.agent_id == bid.provider_id.toString()) {
			bidStyle = this.props.classes.greenbid; 
		}
		return bidStyle; 

	}

	getButtonStyle = (task, bids) => {

		
		var buttonStyle = this.props.classes.purplebutton;
		var stats = ['Preparing' ,'On the road', 'Arrived', 'Delivered', 'Awaiting payment', 'Paid'];
		var greystats = ['Declined' , 'Failed' , 'Cancelled'];
		
		if(stats.includes(task.status) && (task.consumer_id == this.props.user.id || task.agent_id == this.props.user.id ) ){
			buttonStyle = this.props.classes.progressbutton; 
			return buttonStyle; 
		}
		if(task.status == 'Completed' && (task.consumer_id == this.props.user.id || task.agent_id == this.props.user.id )){
			buttonStyle = this.props.classes.completedbutton; 
			return buttonStyle; 
		}
		if(greystats.includes(task.status)){
			buttonStyle = this.props.classes.greybutton; 
			return buttonStyle; 
		}

		if(!taskActions.isRunner(task)) return this.props.classes.providerbutton; 

		var didIbid =false; 
		
		bids.forEach(bid => {
			if(bid.provider_id.toString() == this.props.user.id){
				didIbid =true ; 
			}		
		});

		if(task.status == "Requested" ){
			if(task.consumer_id == this.props.user.id){
				buttonStyle= this.props.classes.greybutton;
			}
			else {
				buttonStyle= this.props.classes.purplebutton;
			}
		}
		else if(task.status == "Bidding" ){
			if(task.consumer_id == this.props.user.id ){
				buttonStyle= this.props.classes.whitebutton;
			}
			else if(didIbid){
				buttonStyle= this.props.classes.greybutton;
			}
			else{
				buttonStyle= this.props.classes.purplebutton; 
			}
		}
		else if(task.status == "BidChoosen" ){
			if( task.consumer_id == this.props.user.id ){
				buttonStyle= this.props.classes.greybutton;
			}
			else if(task.agent_id == this.props.user.id){
				buttonStyle= this.props.classes.whitebutton;
			}
			else {
				buttonStyle= this.props.classes.greybutton;
			}
		}
		else {
			buttonStyle= this.props.classes.greenbutton;
		}
		
		return buttonStyle ;
	}

	handleButtonClick = (e, task, bids) => {

		var didIbid =false; 
		var isRunner = this.props.user.user_type == 'agent';
		var mybidselected = task.agent_id && task.agent_id == this.props.user.id; 
		var changeableStatus =  task.status !== 'Completed' && task.status !== 'Cancelled' && task.status !== 'Declined' && task.status !== 'Failed' ; 

		bids.forEach(bid => {
			if(bid.provider_id.toString() == this.props.user.id){
				didIbid =true ; 
			}		
		});

		if(task.status == "Requested" && isRunner){
			this.setState({ bid_dialog_open: true, selected_task: task }); 
			e.stopPropagation();
		}
		if(task.status == "Bidding" && !didIbid && isRunner){
			this.setState({ bid_dialog_open: true, selected_task: task }); 
			e.stopPropagation();
		}
		if(task.status == "BidChoosen" && mybidselected ){
			this.props.editSingleTaskStatus(task,"Accepted");
		}
		if( mybidselected && changeableStatus){
			this.props.editTaskStatus(e, [task.id]); 
			e.stopPropagation(); 
		}
		if(task.consumer_id == this.props.user.id && (task.status === 'Requested' || task.status === 'Bidding')){
			this.props.editTaskStatus(e, [task.id],'consumer'); 
			e.stopPropagation();
		}			

	}

	openBidMenu = (e,task,bid) => {
		if( task.consumer_id == this.props.user.id && task.status === "Bidding" ) {
			this.setState({ task_provider_menu: true, task_provider_menu_anchor: e.currentTarget, selected_task: task, selected_runner_name: bid.agent_name, selected_runner_id: bid.provider_id, selected_runner_price: bid.amount })
		}
	}

	// render: 
	render() {
		const { classes } = this.props;
		const self = this;
		return (

			<div className={classes.root}>
			{ this.props.user.id === self.state.tasks[0].consumer_id ? 
				<Menu // Menu used for actions
					id="menu-taskproviders"
					anchorEl={this.state.task_provider_menu_anchor}
					open={this.state.task_provider_menu}
					onClose={(e) => this.setState({ task_provider_menu: false, task_provider_menu_anchor: null })}
				>
					<MenuItem onClick={() => { this.props.viewProvider(this.state.selected_runner_id.toString()); this.setState({ task_provider_menu: false, task_provider_menu_anchor: null }); }}>View {this.state.selected_runner_name}</MenuItem>
					<MenuItem onClick={(e) => { this.props.chat({ name: this.state.selected_runner_name, id: this.state.selected_runner_id }, e); this.setState({ task_provider_menu: false, task_provider_menu_anchor: null }); }}>Chat with {this.state.selected_runner_name}</MenuItem>
					<MenuItem onClick={() => { this.props.chooseTaskProvider(this.state.selected_task.id, this.state.selected_runner_id, this.state.selected_runner_price); this.setState({ task_provider_menu: false, task_provider_menu_anchor: null }); }}>Accept bid from {this.state.selected_runner_name}</MenuItem>
				</Menu>:''}
				{self.state.tasks.map(task => {
					let bids = taskActions.convertBidsToDisplayFormat(task, this.props.agents);
					return (

					<div style={{  fontFamily: 'museo_sans,Helvetica Neue,Helvetica,Arial,Lucida Grande,sans-serif', height: "80%", position: "absolute", width: "360px" }}>
					      <AppBar position="sticky" elevation={0}>
					        <Toolbar style={{ position:'fixed', width:'360px', minHeight:'50px', height:'50px', backgroundColor: "#7F4095" }} disableGutters={true}>
					          <a
					            style={{
					              marginLeft: "120px",
					              fontSize: "17px",
					              fontWeight: "bold"
					            }}
					          >
					            TASK DETAIL
					          </a>
					          <IconButton style={{
					              marginLeft: "70px"
					            }} 
					            color="inherit"
										aria-label="Menu"
										onClick={() => this.props.close()}>
										<svg width='20'
											fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="1.414" clip-rule="evenodd" viewBox="0 0 28 28">
											<g fill="#ffffff" fill-rule="nonzero" stroke="#ffffff" stroke-width=".3">
												<path d="M8.893 10.36a1.037 1.037 0 0 0 1.471 0 1.042 1.042 0 0 0 0-1.472L2.043.559a1.04 1.04 0 1 0-1.47 1.472l8.32 8.329zM15.26 13.788L27.008 2.031a1.042 1.042 0 0 0 0-1.472c-.407-.407-1.065-.586-1.471-.179L13.055 12.694h-.309v.36L.419 25.546c-.406.406-.329 1.065.076 1.472.203.204.508.305.774.305.267 0 .552-.101.755-.305L13.78 15.261l11.751 11.758a1.041 1.041 0 0 0 1.474 0 1.04 1.04 0 0 0 .001-1.472L15.26 13.788z" />
											</g>
										</svg>
									</IconButton>
					        </Toolbar>
					      </AppBar>
					      <div style={{ marginTop:'40px',fontWeight: 300,  lineHeight:1.4,  color:'#545a77', fontSize: "12px", height: "100%", padding: "20px" }}>
							
							<a style={{ lineHeight:1.2, textTransform: 'capitalize', color: "#7F4095", fontSize: "30px", fontWeight: 300 }}>
					         { task.answers && task.answers['Title'] ?task.answers['Title']: ''}
					        </a>
					        <br />
					        <br />
					        <a style={{fontWeight: 700 }} > DETAILS </a>
					        <br />
					        <a style={{ color: "#000000", fontSize: "14px"}}>
					           { task.answers && task.answers['Description'] ?task.answers['Description']: ''}
					        </a>

					        <div style={{ display: "flex" }} className={classes.avatar}>
					          <Avatar
					            alt="Remy Sharp"
					            
					          />
					          <div style={{ width: "150px", marginLeft: 20 }}>
					            <a style={{ letterSpacing: '.4px',fontWeight: 700}}> POSTED BY </a>
					            <br />
					            <a style={{ fontSize: "14px",color: "#000000" }}> { task.answers && task.answers['Name'] ?task.answers['Name']: ''}</a>
					          </div>
					          <div >
					            <br />
					            <a style={{ marginLeft:'30px', color: "black", width: "60px" }}>{moment(task.date_created).fromNow()}</a>
					          </div>
					        </div>

					        <div style={{ display: "flex" }} className={classes.avatar}>				         
										<svg  style={{ marginLeft: "10px",marginTop: "4px",cursor: "pointer"  }}  width="22" height="28" viewBox="0 0 16 22" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M13 6C13 2.69 10.31 0 7 0C3.69 0 1 2.69 1 6C1 10.5 7 17 7 17C7 17 13 10.5 13 6ZM5 6C5 4.9 5.9 4 7 4C8.1 4 9 4.9 9 6C9 7.1 8.11 8 7 8C5.9 8 5 7.1 5 6ZM0 18V20H14V18H0Z" fill="#BDBDBD"/>
											</svg>

					          <div style={{ width: "150px", marginLeft: 30 }}>
					            <a style={{ letterSpacing: '.4px',fontWeight: 700}}> LOCATION </a>
					            <br />
					            <a style={{ fontSize: "14px",color: "#000000" }}>{ task.neighbourhood ? task.neighbourhood: ''}  </a>
					          </div>
					        </div>

					        <div style={{ display: "flex" }} className={classes.avatar}>
										<svg style={{ marginLeft: "10px",marginTop: "7px"  }}  width="22" height="22" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M15.5 1.5H13V0.5C13 0.2235 12.776 0 12.5 0H11C10.724 0 10.5 0.2235 10.5 0.5V1.5H5.5V0.5C5.5 0.2235 5.276 0 5 0H3.5C3.224 0 3 0.2235 3 0.5V1.5H0.5C0.224 1.5 0 1.7235 0 2V15.5C0 15.7765 0.224 16 0.5 16H15.5C15.776 16 16 15.7765 16 15.5V2C16 1.7235 15.776 1.5 15.5 1.5ZM10.5 2.5H13V3.5H10.5V2.5ZM3 2.5H5.5V3.5H3V2.5ZM15 15H1V6H15V15Z" fill="#BDBDBD"/>
										</svg>

					          <div style={{ width: "150px", marginLeft: 28 }}>
					            <a style={{ letterSpacing: '.4px',fontWeight: 700}}> DUE DATE </a>
					            <br />
					            <a style={{ fontSize: "14px",color: "#000000" }}> { moment(task.date_created).format('ddd, DD MMM') } </a>
					          </div>
					        </div>


					        <br />
					        <br />
					       { (!task.provider_id ||  task.provider_id == 0 )  ?  <a style={{ fontWeight: "bold" }}> {bids.length} OFFERS : </a> : '' }
					        <br />

						{ (!task.provider_id ||  task.provider_id == 0 )  ? 
					        <div>
					        {bids.map(bid => {
							return (

							        <div style={{ display: "flex" }} className={classes.avatar}>
							          <Avatar
							            alt="Remy Sharp"
							           
							          />

							          <div style={{ width: "100%", marginLeft: 20 }}>
							            <div style={{ padding: 3 }} onClick={(e) => this.openBidMenu(e,task,bid)} className={this.getBidStyle(task,bid)}>
							              <a>{'KD ' + bid.amount + ' : ' + bid.agent_name}</a>
							            </div>
							            <div style={{ paddingTop: 5, fontSize:'20px' }}>
								            <StarRatingComponent 
									          name="rate1" 
									          starCount={5}
									          value={2}
									          starColor="#7F4095"
									          emptyStarColor="#d3d3d3"
	        								/>
        								</div>
							            <div
							              style={{
							                backgroundColor: "#F6F6F6",
							                color: "#000000",
							                textAlign: "justify",
							                textJustify: "inter-word",
							                fontSize: '14px',
							                fontWeight: 300, 
							                lineHeight: '20px',
							                lineSpacing: '0.15px'
							              }}
							            >
							              { bid.comment ? bid.comment : ''}
							            </div>
							          </div>
							        </div> 

					        )})} </div> : '' }


					      </div>

					      <AppBar elevation={0}>
					        <Toolbar style={{ position:'fixed',width: "360px", bottom:0, backgroundColor: "#EDEBEE" }} disableGutters={true}>
					          <div style={{ display:'flex', padding:20 }}>
					          <a style={{ color: "#7F4095", fontSize: "32px", fontWeight: "bold" }}>
					             {task.price}
					          </a>
					          <div style={{ width:'max-content', display: "flex", alignItems: "flex-end", height: "33px" }}><a style={{ color: "#7F4095", fontSize: "15px", fontWeight: "bold" }}>
					            KD / Budget
					          </a></div>

					          	<Button
									onClick={(e) => this.handleButtonClick(e,task,bids)} 
									className={this.getButtonStyle(task,bids)}>
									{taskActions.getHumanReadableStatusText(task, bids, this.props.user.id)}
								 </Button>
					           </div>
					        </Toolbar>
					      </AppBar>
					    </div>
					)
				})}

				<Dialog
					open={this.state.bid_dialog_open}
					onClose={(e) => this.setState({ bid_dialog_open: false })}
				>
					<DialogTitle>Make Bid</DialogTitle>
					<DialogContent>
						<DialogContentText>
							{
								this.state.selected_task &&
									this.state.selected_task.answers &&
									this.state.selected_task.answers['Description'] ?
									this.state.selected_task.answers['Description'] : null
							}
						</DialogContentText>
						<TextField
							autoFocus
							margin="dense"
							id="bid-amount"
							label="Bid amount"
							value={this.state.bid_amount}
							type="text"
							onChange={(e) => this.setState({ bid_amount: e.currentTarget.value })}
							fullWidth
						/>
						<TextField
							placeholder="Message to Customer"
          					multiline
							margin="dense"
							id="bid-comment"
							// label="Message"
							value={this.state.bid_comment}
							// type="text"
							onChange={(e) => this.setState({ bid_comment: e.currentTarget.value })}
							fullWidth
						/>
					</DialogContent>
					<DialogActions>
						<Button onClick={(e) => this.setState({ bid_dialog_open: false })}  >Cancel</Button>
						<Button onClick={(e) => { this.props.makeBid(this.state.selected_task.id, this.state.bid_amount, this.state.bid_comment); this.setState({ bid_dialog_open: false, bid_amount: '' }) }}>Bid</Button>
					</DialogActions>
				</Dialog>
			</div>

		);
	}
}

// 
TaskView.propTypes = {
	tasks: PropTypes.array.isRequired
};

export default withStyles(styles)(TaskView);
