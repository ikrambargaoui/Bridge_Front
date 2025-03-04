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



class ActionLogDetail extends Component {
  constructor(props) {
    super(props);


  }
  state = {
    visibile: false,
    open: false,
  };






  handleClickOpen = () => {

    this.setState({
      open: true,

    });
  };

  handleClose = () => {
    this.setState({ open: false });
  };


  render() {
    return (


      <div style={{ margin: '-5px !important' }}>
        <Button color="info" size="sm" onClick={() => this.handleClickOpen()}><i className="cui-info"   ></i></Button>
        <Dialog onClose={this.handleClose} aria-labelledby="customized-dialog-title" open={this.state.open}>
          <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
          <h6>Plus de détails</h6>
          </DialogTitle>
          <DialogContent>
            <div className="container">
              <div className="panel panel-default">
                <div className="panel-heading">
                </div>
                <card>
                  
                    <h6 className="panel-title">
                      {this.props.action.user && this.props.action.user.appUserCode != null ? 'Matricule: ' + this.props.action.user.appUserCode : ''} </h6>
                    <h6 className="panel-title">
                      {this.props.action.user && this.props.action.user.appUserFirstName != null ? 'Nom et Prénom :  ' + this.props.action.user.appUserFirstName+' '+this.props.action.user.appUserLastName : ''} </h6>

                    <h6 className="panel-title">
                      {this.props.action.structure && this.props.action.structure.libelleStructure != null ? 'Entité : ' + this.props.action.structure.libelleStructure +' ('+ this.props.action.structure.codeStructure +')' : ''} </h6>
                      <h6 className="panel-title">
                      {this.props.action.ip && this.props.action.ip != null ? 'Adresse IP :  ' + this.props.action.ip : ''} </h6>

                </card>
              </div>
            </div>


          </DialogContent>
          <DialogActions>
           
            <Button onClick={this.handleClose} color="primary">Fermer </Button>
          </DialogActions>
        </Dialog>
      </div>











    );
  }
}

export default ActionLogDetail;




//onClick={this.handleClose}