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
  state = {
    matricule: '',
    // param : '',
    nom: '',
    visibile: false,
    open: false,
    openValid: false,
    dateDeb: '',
    dateFin: '',
    structure: '',
    res_del: '',
    mailResultDisplay: 'none',
    color: "",
    vis: false,
    visibile1: true,
    visibile3: true,
    visibile2: true,
    message: '',
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
        if (res.msg != null) {
          console.log(res.msg)
          this.setState({
            message: res.msg,
            visibile1: true,
            visibile2: false
          });

        } else {
          this.setState({
            nom: res.lib,
            age: res.age,
            ser: res.ser,
            visibile1: false,
            visibile2: true,
            visibile3: false
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
    this.setState({ open: false });
  };
  handleCloseAnnule = () => {
    this.setState({
      open: false,
      nom: '',
      age: '',
      ser: '',
      structure: '',
      visibile3: true,
      visibile1: true
    });
  };


  handleCloseDeleg = () => {
    this.setState({ openValid: false, mailResultDisplay: 'none', visibile3: true, visibile1: true });
  };




  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    console.log(e.target.value);
  }


  Add_Delegation = (param1, param2, param3) => {
    AddDelegation(param1, param2, param3).then(res => {
      if (res.error) {

        this.setState({
          matricule: '',
          // param : '',
          nom: '',
          age: '',
          ser: '',
          structure: '',

          structure: '', mailResultDisplay: "block", res_del: res.error, open: false, color: "danger", openValid: true
        });
      }
      else {

        this.setState({
          matricule: '',

          // param : '',
          nom: '', structure: '',
          mailResultDisplay: "block", res_del: res, open: false, color: "success", openValid: true
        });
        console.log("resultat requete !! ", res);
        //this.setState({ open: false   });
      }
      this.props.click(true)
    }

    )
  };


  render() {
    const res_del = this.state.res_del;
    const vis = this.state.vis;

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
                      <Input type="text" id="name" name="matricule" value={this.state.matricule} placeholder="Entrer le matricule de votre délégué" required onChange={this.onChange} />
                      <InputGroupAddon addonType="append">
                        <Button color="info" onClick={() => this.getUserInfo(this.state.matricule)}>Rechercher</Button>

                      </InputGroupAddon>

                    </InputGroup>
                  </Row>
                </Col>
              </FormGroup>


              <Row hidden={this.state.visibile2}  >
                <Alert color="danger" style={{ display: 'flex', marginLeft: '300px' }}>

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

          <Col col="2" sm="3" md="3" xl className="mb-1 mb-xl-0" style={{ left: '80%' }}>
            <Button color="success" onClick={() => this.handleClickOpen()} style={{ right: '10%' }} hidden={this.state.visibile3}><strong>Ajouter une délégation</strong></Button>
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
              <TextField autoFocus margin="dense" id="dateFin" name="dateFin" value={this.state.dateFin} label="Date Fin" type="date" fullWidth placeholder="Entrer la date fin" onChange={this.onChange} />
              <div className="content-section implementation">
              </div>

            </DialogContent>
            <DialogActions>

              <Button label="Message" color="success" onClick={() => this.Add_Delegation(this.state.matricule, this.state.dateDeb, this.state.dateFin)} > Valider </Button>
              <Button color="primary" onClick={this.handleCloseAnnule} >Annuler </Button> &nbsp; &nbsp;


            </DialogActions>

          </Dialog>

          <Dialog onClose={this.handleCloseDeleg} aria-labelledby="customized-dialog-title" open={this.state.openValid}>
            <DialogTitle id="customized-dialog-title" onClose={this.handleCloseDeleg}>
              <h5>  Ajout de délégation </h5>
            </DialogTitle>
            <DialogContent>
              <div class="container">
                <div class="panel panel-default">
                  <div class="panel-heading">
                    <card>
                      <Alert
                        // color="danger"
                        color={this.state.color}
                      >
                        {res_del}
                      </Alert>
                    </card>
                  </div>
                </div>
              </div>
            </DialogContent>
            <DialogActions>

              <Button color="primary" onClick={this.handleCloseDeleg} >Fermer </Button> &nbsp; &nbsp;
            </DialogActions>

          </Dialog>

        </CardFooter>

      </Card>


    );
  }
}

export default GestionDelegation;




