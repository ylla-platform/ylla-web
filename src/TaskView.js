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
	    width: '150px',
	    borderTopRightRadius: "18px",
	    borderBottomRightRadius: "18px",
	    borderTopLeftRadius: "18px",
	    borderBottomLeftRadius: "18px",
	    backgroundColor: "white",
	    border: "1px solid",
	    color: "#7F4095",
	    // textAlign: "center",
	    verticalAlign: "middle",
	    fontWeight: "bold",
	    textTransform: 'capitalize',
	    cursor: 'pointer'
  },
  greenbid: {
  	fontSize: '13.5px',
    height: "25px",
    width: '150px',
    borderTopRightRadius: "18px",
    borderBottomRightRadius: "18px",
    borderTopLeftRadius: "18px",
    borderBottomLeftRadius: "18px",
    // backgroundColor: "#649F55",
    backgroundColor: "#7F4095",
    color: "white",
    // textAlign: "center",
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
    width: "185px",
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
 	width: "185px",
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
 	width: "185px",
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
 	width: "185px",
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
 	width: "185px",
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
 	width: "185px",
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
 	width: "185px",
    height:'40px',
	marginLeft: "35px"
  },
   	selectedbid: {
	  	boxShadow: '0px 1px 3px 0px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12)', 
	  	padding: 10,
	  	marginTop:10
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

		var tks = taskActions.convertTasksToDisplayFormat(nextProps.tasks, nextProps.agents, nextProps.providers, nextProps.services, nextProps.consumers);
		var i;
		for (i = 0; i < tks.length; i++) { 
		  if(tks[i].id == this.props.tasks[i].id){
		  	 tks[i].review = this.props.tasks[i].review;
		  	 tks[i].rating = this.props.tasks[i].rating;
		  }
		} 

		this.setState({
			tasks: tks
		});
	}

	// cancelTask: 
	cancelTask = (id, event) => {
		this.props.cancelTask(id);
	}
	// handleSubmitRating: 
	handleSubmitRating = (task) => {
		let stars = 0 ; 
		if(task.rating){
			stars = task.rating; 
		}
		if(this.props.user.user_type =='agent'){
			this.props.editTaskRating({ id: task.id, rating: stars, review: task.review, rater:task.agent_id, rater_type:'agent'  });
		}
		if(this.props.user.user_type =='consumer'){
			this.props.editTaskRating({ id: task.id, rating: stars, review: task.review, rater:task.consumer_id, rater_type:'consumer'  });
		}
		
	}

	getBidStyle = (task, bid) => {

		var bidStyle = this.props.classes.whitebid; 
		// if( (bid.provider_id && bid.provider_id.toString() == this.props.user.id ) || ( task.agent_id && task.agent_id == bid.provider_id.toString()))  {
		// 	bidStyle = this.props.classes.greybid; 
		// }
		if(task.status !== 'Requested' && task.status !== 'Bidding' && task.status !== 'BidChoosen' && task.agent_id && task.agent_id == bid.provider_id.toString()) {
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

	showReviewForm = (task, bid) => {
		
		var properagent = this.props.user.id == task.consumer_id || this.props.user.id == task.agent_id; 
		var taskstat = (task.status == "Completed" || task.status == "Failed" || task.status == "Declined"); 
		var properbid = true; 
		
		if(bid != null){
			properbid = task.agent_id && bid.provider_id == task.agent_id ; 
		}

		if(!properbid || !taskstat || !properagent) return false;
		
		var alreadyRated = false; 
		
		var usertype = this.props.user.user_type; 
		var res_user ;
		if(usertype == 'agent' )
			res_user = task.consumer; 
		if(usertype == 'consumer')
			res_user = task.agent; 

			if(res_user.ratings){
				res_user.ratings.forEach(rating => {
					if(rating.taskid == task.id ){
						alreadyRated = true;
					}
				});
			}
		return !alreadyRated;

	}

	openBidMenu = (e,task,bid) => {
		if( task.consumer_id == this.props.user.id && task.status === "Bidding" ) {
			this.setState({ task_provider_menu: true, task_provider_menu_anchor: e.currentTarget, selected_task: task, selected_runner_name: bid.agent_name, selected_runner_id: bid.provider_id, selected_runner_price: bid.amount })
		}
	}

	getConsumerAvgRating = (task) => {

		let ratings ; 
		if(this.props.user.user_type == 'agent' && task.consumer){
			ratings = task.consumer.ratings; 
		}
		if(this.props.user.user_type == 'consumer' && this.props.user.ratings){
			ratings = this.props.user.ratings;
		}
		let avgRating = 0;
		if (ratings && ratings.length > 0) {
			let starcount = 0; 
			ratings.forEach(rating => {
				if(rating.stars != 0){ // we dont count empty ratings
					avgRating = avgRating + rating.stars;
					starcount = starcount + 1 ;
				}
			});
			avgRating = avgRating / starcount;
		}
		return avgRating; 
	}

	getConsumerRatingLength  = (task) => {

		let ratings ; 
		if(this.props.user.user_type == 'agent' && task.consumer){
			ratings = task.consumer.ratings; 
		}
		if(this.props.user.user_type == 'consumer' && this.props.user.ratings){
			ratings = this.props.user.ratings;
		}
		if (ratings) {
			return ratings.length;
		}
		return 0; 

	}


	getPostedBy = (task) => {

		let name = ''; 
		if(task.answers && task.answers['Name']) 
			name = task.answers['Name'];
		else if(task.provider){
			name = task.provider.first_name + task.provider.last_name ;
		}
		return name; 

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
							
							<a style={{ lineHeight:1.2, textTransform: 'capitalize', color: "#7F4095", fontSize: "28px", fontWeight: 300 }}>
					         { task.answers && task.answers['Title'] ?task.answers['Title']: ''}
					        </a>
					        <br />
					        <br />
					        <a style={{fontWeight: 700 }} > DETAILS </a>
					        <br />
					        <a style={{ color: "#000000", fontSize: "16px"}}>
					           { task.answers && task.answers['Description'] ?task.answers['Description']: ''}
					        </a>

					        <div style={{ display: "flex" }} className={classes.avatar}>
					          <Avatar
					            alt="Remy Sharp"
					            
					          />
					          <div style={{ width: "100%", marginLeft: 20 }}>
					            <a style={{ letterSpacing: '.4px',fontWeight: 700}}> POSTED BY </a>
					            <br />
						            <div style={{marginTop:1}} >
						            <a style={{ fontSize: "14px",color: "#000000" }}> { this.getPostedBy(task)}</a>
						            <a style={{ float: "right",color: "black"}} >{moment(task.date_created).fromNow()}</a>
						            </div>
					            <div style={{ fontSize:'18px', display:'flex' }}>
								            <StarRatingComponent 
									          name={task.consumer_id}
									          starCount={5}
									          value={this.getConsumerAvgRating(task)}
									          starColor="#7F4095"
									          emptyStarColor="#d3d3d3"
	        								/>
	        								<div style={{marginTop: '6px', marginLeft: '10px', color: 'black', fontSize:'13.5px' }}><a>{this.getConsumerRatingLength(task) +' Reviews'} </a></div>	
        						</div>
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

					        { this.props.user.user_type && this.props.user.user_type == 'agent' &&  this.showReviewForm(task,null)? 
							       <div className={classes.avatar} style = {{boxShadow: '0px 1px 3px 0px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12)', padding: 10}}> 
							       		<div style={{ display:'flex',fontSize:'22px' }}>
											            <a style={{fontSize: '15px',marginTop: '5px', marginRight:10}}> Tap to Rate Customer: </a>
											            <StarRatingComponent
													          name="rate2" 
													          starCount={5}
													          starColor="#7F4095"
													          emptyStarColor="#d3d3d3"
													          onStarClick={(nextValue, prevValue, name) => task.rating = nextValue}
	        											/>			
										</div>
										<div style={{fontSize: '14px'}}>
											        <TextField
														placeholder="Write A Review"
											          	multiline
														margin="normal"
														variant="outlined"
														id="review-comment"
														fullWidth
														onChange={(e) => task.review = e.currentTarget.value}
														style = {{height: '50px'}}		
													/>
										</div>
										<div style={{ width:'100%', display:'flex',justifyContent: 'flex-end'}}>
											<Button onClick={(e) => {this.handleSubmitRating(task)} } style={{ float:'right'}}  size="small">Save</Button>
										 	<Button style={{ float:'right'}} size="small">Cancel</Button>
										</div>
									</div> : ''}


					        <br />
					        <br />

					       { (!task.provider_id ||  task.provider_id == 0 )  ?  <a style={{ fontWeight: "bold" }}> {bids.length} OFFERS : </a> : '' }
					        <br /> 
						{ (!task.provider_id ||  task.provider_id == 0 )  ? 
					        <div>
					        {bids.map(bid => {
							return (

							        <div className={this.props.user.user_type && this.props.user.user_type == 'consumer' && this.showReviewForm(task,bid)? classes.selectedbid:''} > 
							        <div style={{ display: "flex" }} className={classes.avatar}>
							          <Avatar
							            alt="Remy Sharp"
							           
							          />

							          <div style={{ width: "100%", marginLeft: 20 }}>
							            <div style={{ padding: 3 }} onClick={(e) => this.openBidMenu(e,task,bid)} className={this.getBidStyle(task,bid)}>
							              <a style={{ marginLeft: 5 }} >{'KD ' + bid.amount + ' : ' + bid.agent_name}</a>
							              <svg style={{ marginRight: 5,marginTop:3, float:'right' }} width="14" height="11" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M1.5 7L4.5 10L12.75 1.75" stroke="white" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
										  </svg>
							            </div>
							            <div style={{ paddingTop: 5, fontSize:'20px', display:'flex' }}>
								            <StarRatingComponent 
									          name={bid.agent_name}
									          starCount={5}
									          value={bid.agent_rating}
									          starColor="#7F4095"
									          emptyStarColor="#d3d3d3"
	        								/>
	        								<div style={{marginTop: '6px', marginLeft: '10px', color: 'black', fontSize:'13.5px' }}><a>{bid.ratings +' Reviews'} </a></div>	
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

							        { this.props.user.user_type && this.props.user.user_type == 'consumer' && this.showReviewForm(task,bid)? 
							       <div style = {{padding: 10}}> 
							       		<div style={{ display:'flex',fontSize:'22px' }}>
											            <a style={{fontSize: '15px',marginTop: '5px', marginRight:10}}> Tap to Rate : </a>
											            <StarRatingComponent
													          name="rate2" 
													          starCount={5}
													          starColor="#7F4095"
													          emptyStarColor="#d3d3d3"
													          onStarClick={(nextValue, prevValue, name) => task.rating = nextValue}
	        											/>			
										</div>
										<div style={{fontSize: '14px'}}>
											        <TextField
														placeholder="Write A Review"
											          	multiline
														margin="normal"
														variant="outlined"
														id="review-comment"
														fullWidth
														onChange={(e) => task.review = e.currentTarget.value}
													/>
										</div>
										<div style={{ width:'100%', display:'flex',justifyContent: 'flex-end'}}>
											<Button onClick={(e) => {this.handleSubmitRating(task)} } style={{ float:'right'}}  size="small">Save</Button>
										 	<Button style={{ float:'right'}} size="small">Cancel</Button>
										</div>
									</div> : ''}


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
