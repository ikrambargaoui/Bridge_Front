import React, { Component } from 'react';
import axios from 'axios';
import {
  Button,

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



class DialogInfo extends Component {
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
    // const {informations} = this.state; 
    const events = this.props.events;
    const age = this.props.doc.editionAgency

    return (


      <div style={{ margin: '-5px !important' }}>
        <Button color="info" size="sm" onClick={() => this.handleClickOpen()}><i className="cui-info"   ></i></Button>
        <Dialog onClose={this.handleClose} aria-labelledby="customized-dialog-title" open={this.state.open}>
          <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
            <h6>Description du document</h6>
          </DialogTitle>
          <DialogContent>
            <div className="container">
              <div className="panel panel-default">
                <div className="panel-heading">
                </div>
                <card>
                  <h5 className="panel-title">
                    {this.props.doc.typeDocument != null ? 'Type de document : ' + this.props.doc.typeDocument : ''} </h5>


                  <h5 className="panel-title">
                    {this.props.doc.accountNumber != null ? 'Numéro de compte : ' + this.props.doc.accountNumber + '-' + this.props.doc.accountKey : ''}  </h5>


                  <h5 className="panel-title">
                    {this.props.doc.clientCode != null ? ' Code client :' + this.props.doc.clientCode : ''} </h5>

                  <h5 className="panel-title">
                    {this.props.doc.accountDev != null ? ' Devise : ' + this.props.doc.accountDev : ''} </h5>

                  <h5 className="panel-title">
                    {this.props.doc.accountingsSection != null ? ' Type de compte : ' + this.props.doc.accountingsSection : ''} </h5>

                  <h5 className="panel-title">
                    {this.props.doc.editionDate != null ? ' Date  édition : ' + new Date(this.props.doc.editionDate).toLocaleDateString() : ''} </h5>

                  <h5 className="panel-title">
                    {this.props.doc.editionTime != null ? ' Heure édition : ' + new Date(this.props.doc.editionDate).toLocaleTimeString() : ''} </h5>


                  <h5 className="panel-title">
                    {age != null ? 'Agence édition :' + age : ''} </h5>

                  <h5 className="panel-title">
                    {this.props.doc.clientAgency != null ? ' Agence du client : ' + this.props.doc.clientAgency : ''} </h5>


                  <h5 className="panel-title">
                    {this.props.doc.addressMailClient != null || this.props.doc.addressMailClient !== "NOTFOUND" ? ' Email du client : ' + this.props.doc.addressMailClient : ''} </h5>


                  <h5 className="panel-title">
                    {this.props.doc.editionMode != null ? ' Mode édition : ' + this.props.doc.editionMode : ''} </h5>

                </card>

              </div>
            </div>


          </DialogContent>
          <DialogActions>
            {/*  <Button label="Message" color="success"> Envoyer </Button> */}
            <Button onClick={this.handleClose} color="primary">Fermer </Button>
          </DialogActions>
        </Dialog>
      </div>


    );
  }
}

export default DialogInfo;

