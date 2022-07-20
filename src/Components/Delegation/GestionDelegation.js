import React, { Component } from 'react';
import axios from 'axios';
import {
    Button, Card,
    CardBody,
    CardHeader,
    CardFooter,
    Col,
    FormGroup,
    Input,
    InputGroup,
    InputGroupAddon,
    Label,
    Row,
    Alert,
    Modal, ModalBody, ModalFooter, ModalHeader
  } from 'reactstrap';
//import DialogDelegation from './DialogDelegation';
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


import { AddDelegation } from '../../Services/delegationService';
import { getUserInformation } from '../../Services/userService';

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


/************************************************************ */




class GestionDelegation extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);

    //this.togglePrimary = this.togglePrimary.bind(this);

    }
    state={
        matricule :'',
       // param : '',
        nom : '',
        visibile : false,
        open : false,
        dateDeb:'',
        dateFin : '',
        structure:'',
        res_del :'',
        mailResultDisplay: 'none',
        color : "",
        vis : false,
        visibile1: true,
        visibile2: true,
        message:'',
  };


  /* togglePrimary() {
    this.setState({
      primary: !this.state.primary,
    });
  } */

  
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }


  getUserInfo = (param) => {
    getUserInformation(param)
    .then(res => {
      if(res.msg  != null) {
          console.log(res.msg)
          this.setState({
              message:res.msg,
              visibile1: true,
              visibile2: false
          });
         
      }else{
          this.setState({
              nom: res.lib ,
              age: res.age,
              ser: res.ser,
              visibile1 : false,
              visibile2:true
              });

      }

      console.log(res)
  });
      
  
  };


  handleClickOpen = () => {
    this.setState({
      open: true,
      mailResultDisplay: "none"

    });
  };

  handleClose = () => {
    this.setState({ open: false,  mailResultDisplay: 'none', });
  };

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    console.log(e.target.value);
  }

  
  Add_Delegation = (param1, param2, param3) => {
    AddDelegation(param1, param2, param3).then(res => {
      if (res.error) { 
        this.setState({   mailResultDisplay: "block", res_del: res.error,  open: true , color :"danger"  });}
      else {
        this.setState({  mailResultDisplay: "block" , res_del: res.msg,  open: true ,color :"success"    });
        //this.setState({ open: false   });
      }
     this.props.click(true)
    }
    )
      };

    
  render() {
    const res_del = this.state.res_del ;
    const vis =  this.state.vis ;
    console.log("je uis dans le render "+vis);
    console.log("je suis dans le render "+res_del);
    return (

      <Card>
       
        <CardHeader>
          <strong>Déléguer mes documents</strong>

        </CardHeader>
        <CardBody>

          <Card>
            <CardBody>

              <FormGroup >
                <Col md="12">
                 
                    <Row>
                      <InputGroup   >
                          <Input type="text" id="name" name="matricule" value={this.state.matricule} placeholder="Entrer le matricule du votre délégué" required onChange={this.onChange} />
                          <InputGroupAddon addonType="append">
                              <Button  color="info" onClick={() => this.getUserInfo(this.state.matricule)}>Rechercher</Button>
                             
                              </InputGroupAddon>

                      </InputGroup>
                  </Row>
                </Col>
              </FormGroup>


              <Row hidden={this.state.visibile2}  >
    <Alert color="danger"  style={{display:'flex', marginLeft: '300px'}}>

              {this.state.message}
            </Alert>

</Row>

    <Row hidden={this.state.visibile1}  >


                <Col xs="sm-6">
                  <FormGroup>
                    <Row>

                      <Label for="nom"> <strong>Nom et Prénom : </strong> </Label>
                      <Col xs="sm-6">
                        <Input type="text" id="name" value={this.state.nom} /></Col></Row>
                  </FormGroup></Col>

                <Col xs="sm-6">
                  <FormGroup>
                    <Row>

                      <Label for="nom"><strong>Agence/Service :</strong>  </Label>
                      <Col xs="sm-6">
                        <Input type="text" id="name" value={this.state.ser !== '' ? this.state.ser : this.state.age} />
                      </Col>
                    </Row>
                  </FormGroup>
                </Col>
              </Row>
             
            </CardBody>
          </Card>
          
        </CardBody> 
        <CardFooter>
       
        {/* <Alert
               // color="danger"
               color = {this.state.color}
                style={{ display: this.state.mailResultDisplay, position: 'absolute', right: '40%' }}>
                {res_del}
              </Alert>  */}
        <Col col="2" sm="3" md="3" xl className="mb-1 mb-xl-0" style={{  left: '80%' }}>
        <Button color="success"  onClick={() => this.handleClickOpen()}  style={{  right: '10%' }} ><strong>Ajouter une délégation</strong></Button> 
          </Col>              
                        <Dialog onClose={this.handleClose} aria-labelledby="customized-dialog-title" open={this.state.open}>
                          <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
                          <h5>  Voulez vous ajouter une délégation à  {this.state.nom} ? </h5>
                          </DialogTitle>
                          <DialogContent>
                            <div class="container">
                              <div class="panel panel-default">
                                <div class="panel-heading">

                                </div>

                              </div>
                            </div>
                            <TextField autoFocus margin="dense" id="dateDeb" name="dateDeb" value={this.state.dateDeb} label="Date Début" type="date" fullWidth placeholder="Entrer la date début" onChange={this.onChange} />
                            <TextField autoFocus margin="dense" id="dateDeb" name="dateFin" value={this.state.dateFin} label="Date Fin" type="date" fullWidth placeholder="Entrer la date fin" onChange={this.onChange} />
                            <div className="content-section implementation">
                            </div>
                          
                          </DialogContent>
                          <DialogActions>
                         
                            <Button label="Message" color="success" onClick={() => this.Add_Delegation(this.state.matricule, this.state.dateDeb, this.state.dateFin)} > Valider </Button>
                            <Button color="primary" onClick={this.handleClose} >Annuler </Button> &nbsp; &nbsp; 
                            <Alert
               // color="danger"
               color = {this.state.color} 
                style={{ display: this.state.mailResultDisplay, position: 'absolute', right: '40%' }}>
                {res_del}
              </Alert>
              
                          </DialogActions>

                       {/*   <Alert
                color="danger"
                style={{ display: this.state.mailResultDisplay, position: 'absolute', left: '40%' }}>
                {res_del}
              </Alert>  */}
               
                        </Dialog>



        </CardFooter>
               
</Card>



    
              
                  
                  
          

    );
  }
}

export default GestionDelegation;




