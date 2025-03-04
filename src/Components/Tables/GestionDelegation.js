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
import DialogDelegation from './DialogDelegation';
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


/************************************************************ */




class GestionDelegation extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }
  state = {
    matricule: '',
    informations: [],
    param: '',
    nom: '',
    visibile: false,
    open: false,
    dateDeb: '',
    dateFin: '',
    structure: '',
  };

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    //console.log(e.target.value); 
  }


  getUserInfo = (param) => {
    const token = localStorage.getItem('jwtToken');
    this.setState({
      param: param,
      matricule: param,
    });
    var headers = {
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + token,
      'Access-Control-Allow-Origin': '*'
    }

    axios.get(URL + '/Bridge/User/GetUserInformationByCuti/' + param, { headers: headers })
      .then(res => {
        this.setState({
          informations: res.data,
          nom: res.data.lib,
          age: res.data.age,
          ser: res.data.ser,
        });

        /* if (this.state.ser==''){
  this.state.structure = this.state.age ;
         }
         else {
           this.state.structure  = this.state.ser ;
 
         }*/
        //console.log(this.state.informations[0].lib);
        //   console.log(this.state.nom);
        //  console.log("nom"+this.state.nom);

      })
    // this.state.visible= true ;
  };

  handleClickOpen = () => {

    this.setState({
      open: true,

    });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    console.log(e.target.value);
  }

  AddDelegation = (param1, param2, param3) => {
    this.setState({ open: false });
    const token = localStorage.getItem('jwtToken');
    var headers = {
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + token
      , 'Access-Control-Allow-Origin': '*'
    }

    console.log({
      delegueCode: param1,
      dateDebDelegation: param2,
      dateFinDelegation: param3,
    });

    axios.post(URL + '/Bridge/Delegations/AddDelegation', {
      delegueCode: param1,
      dateDebDelegation: param2,
      dateFinDelegation: param3,
    }, { headers: headers })
      .then(function (response) {
        console.log(response.data);

      })
    // this.setState({ checked: [] });
  };





  render() {
    // const {informations} = this.state; 
    // const nom = this.state.nom;
    return (

      <Card>
        <CardHeader>
          <strong>Déléguer mes documents</strong>

        </CardHeader>
        <CardBody>

          <FormGroup>
            <Label htmlFor="appendedInputButton">Identifiant : </Label> <span></span>
            <div className="controls">
              <InputGroup>
                <Input type="text" id="name" name="matricule" value={this.state.matricule} placeholder="Entrer le matricule du votre délégué" required onChange={this.onChange} />
                <InputGroupAddon addonType="append">
                  <Button color="info" onClick={() => this.getUserInfo(this.state.matricule)}>Rechercher</Button>
                  {/*  <Button color="success" >Ajouter</Button>  */}
                  <Button color="success" onClick={() => this.handleClickOpen()} >Ajouter</Button>
                  <Dialog onClose={this.handleClose} aria-labelledby="customized-dialog-title" open={this.state.open}>
                    <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
                      Voulez vous ajouter une délégation à  {this.state.nom} ?
                    </DialogTitle>
                    <DialogContent>
                      <div class="container">
                        <div class="panel panel-default">
                          <div class="panel-heading">
                            {/*   {  <h4 class="panel-title">
            Veuillez entrer la date de début et la date de fin de délégation 
            </h4> } */}
                            {/*   <h5 class="panel-title">
            E-MAIL(s):
         </h5> */}
                          </div>

                        </div>
                      </div>
                      {/* <TextField autoFocus margin="dense" id="subject"  name="subject" value={this.state.subject} label="Objet"  type="text" fullWidth  onChange={this.onChange} /> */}
                      <TextField autoFocus margin="dense" id="dateDeb" name="dateDeb" value={this.state.dateDeb} label="Date Début" type="date" fullWidth placeholder="Entrer la date début" onChange={this.onChange} />
                      <TextField autoFocus margin="dense" id="dateDeb" name="dateFin" value={this.state.dateFin} label="Date Fin" type="date" fullWidth placeholder="Entrer la date fin" onChange={this.onChange} />
                      <div className="content-section implementation">
                        {/*  <h5 className="first">Message</h5> */}
                      </div>
                    </DialogContent>
                    <DialogActions>
                      <Button label="Message" color="success" onClick={() => this.AddDelegation(this.state.matricule, this.state.dateDeb, this.state.dateFin)} > Ajouter </Button>
                      <Button color="primary" onClick={this.handleClose} >Annuler </Button>
                    </DialogActions>
                  </Dialog>


                </InputGroupAddon>

              </InputGroup>

            </div>

          </FormGroup>

          <Card>
            <CardBody>
              <Row>

                <Col xs="sm-6">
                  <FormGroup>
                    <Row>

                      <Label for="nom">Nom et Prénom : </Label>
                      <Col xs="sm-6">
                        <Input type="text" id="name" value={this.state.nom} /></Col></Row>
                  </FormGroup></Col>

                <Col xs="sm-6">
                  <FormGroup>
                    <Row>

                      <Label for="nom">Agence/Service :  </Label>
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
        {/* <DialogDelegation events = {this.state.nom}></DialogDelegation>     */}
      </Card>









    );
  }
}

export default GestionDelegation;




//onClick={this.handleClose}