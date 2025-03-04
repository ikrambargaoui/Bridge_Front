import React, { Component } from 'react';
import axios from 'axios';
import {
  Badge,
  Button,
  ButtonDropdown,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Fade,
  Form,
  FormGroup,
  FormText,
  FormFeedback,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
  Row,
} from 'reactstrap';

/*Dialog*/
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
/*Dialog*/
const URL = require('../../Config/Config').Url;

/**************************** */
const DialogTitle = withStyles(theme => ({
  root: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: theme.spacing.unit * 2,

  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing.unit,
    top: theme.spacing.unit,
    color: theme.palette.grey[500],
  },
}))(props => {
  const { children, classes, onClose } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="Close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});
const DialogContent = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing.unit * 2,
  },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    borderTop: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: theme.spacing.unit,
  },
}))(MuiDialogActions);



class DialogDelegation extends Component {
  constructor(props) {
    super(props);
    // this.onChange = this.onChange.bind(this);

  }
  state = {
    matricule: '',
    informations: [],
    param: '',
    nom: this.props.events,
    visibile: false,
    open: false,
  };

  //console.log(this.state.nom); 


  /* onChange(e){
       this.setState({[e.target.name]:e.target.value});
      // console.log(e.target.value); 
      }*/


  getUserInfo = () => {

    var headers = {
      'Content-Type': 'application/json',
      'Authorization': "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJiaDAwMzQ0NSIsImlhdCI6MTU1MjI5NzMwMCwiY29kZSI6ImJoMDAzNDQ1Iiwicm9sZXMiOlt7ImF1dGhvcml0eSI6IlJPTEVfQlVTU0lORVNTX1VOSVRfTUFOQUdFUiJ9XX0.ifqD95xhGo7p1yDES67xJ96qB13L2Kxh1r0kPqVEWYk",
      'Access-Control-Allow-Origin': '*'
    }
    /*axios.get(URL+'/Bridge/User/GetUserInformationByCuti/'+param,{headers: headers})
    .then(res => {
       this.setState({
         informations: res.data,
         nom:res.data[0].lib,
         age : res.data[0].age,
         ser : res.data[0].ser,
       });
       //console.log(this.state.informations[0].lib);
    //   console.log(this.state.nom);
       //console.log("nom"+this.state.nom);
       console.log(this.state.nom);


       })*/
    // this.state.visible= true ;

    console.log(this.props.events);
  };



  /*handleClose = () => {
     // this.setState({ open: false });
     // this.setState({ checked: [] });
      //window.location.reload();
      console.log("test");
      
    };*/


  handleClickOpen = () => {

    this.setState({
      open: true,

    });
  };

  handleClose = () => {
    this.setState({ open: false });
  };



  render() {
    // const {informations} = this.state; 
    const events = this.props.events;

    return (

      <Card>

        {/*   <Button color="danger" onClick={() => this.getUserInfo()}>Rechercher</Button> */}
        <div>
          <Button color="info" size="sm" className="mr-2" onClick={() => this.handleClickOpen()} >Ajouter un délégué</Button>
          <Dialog
            onClose={this.handleClose}
            aria-labelledby="customized-dialog-title"
            open={this.state.open}
          >
            <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
              Voulez vous ajouter une délégation à  {this.props.events} ?

            </DialogTitle>
            <DialogContent>
              <div class="container">
                <div class="panel panel-default">
                  <div class="panel-heading">
                    {/*  <h4 class="panel-title">
            Êtes-vous sûr de vouloir envoyer le document au client ?
            </h4> */}
                    {/*   <h5 class="panel-title">
            E-MAIL(s):
         </h5> */}
                  </div>

                </div>
              </div>
              {/* <TextField autoFocus margin="dense" id="subject"  name="subject" value={this.state.subject} label="Objet"  type="text" fullWidth  onChange={this.onChange} /> */}
              <TextField autoFocus margin="dense" id="subject" name="subject" label="Date Début" type="text" fullWidth placeholder="Entrer la date début" />
              <TextField autoFocus margin="dense" id="subject" name="subject" label="Date Fin" type="text" fullWidth placeholder="Entrer la date fin" />
              <div className="content-section implementation">
                {/*  <h5 className="first">Message</h5> */}
              </div>
            </DialogContent>
            <DialogActions>
              <Button label="Message" color="success"> Envoyer </Button>
              <Button color="primary">Annuler </Button>
            </DialogActions>
          </Dialog>
        </div>

      </Card>









    );
  }
}

export default DialogDelegation;




//onClick={this.handleClose}