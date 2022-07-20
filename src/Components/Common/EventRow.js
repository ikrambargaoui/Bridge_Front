import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';

import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { } from '../Tables/example.scss';
import { } from '../Tables/lib/styles.css';
import { } from '../Tables/example.scss';
import { } from '../Tables/lib/styles.css';

import Switch from "react-switch";

//import Popup from "reactjs-popup";



import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Alert,
  view

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
import { Editor } from 'primereact/editor';
import { withStyles } from '@material-ui/core/styles';
/*Dialog*/

// checkboxlist
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import CommentIcon from '@material-ui/icons/Comment';
import { getDocsOfUser } from '../../Store/Actions/GetDocs'
import { getMailsList, sendMail } from '../../Services/mailServices';
import { removeADocument } from '../../Services/docsServices';
import { postEtatHabilitation } from '../../Services/HabilitationServices';
import { deleteRowHabilitation } from '../../Services/HabilitationServices';
import { postStructure } from '../../Services/StructureService';
import { deleteStructure } from '../../Services/StructureService';
import { DownloadAPdf } from '../../Services/docsServices';

import DialogInfo from '../SimpleSearch/DialogInfo'

import { DeleteDelegation } from '../../Services/delegationService';

import { DeleteRole } from '../../Services/roleService';
import { AddRole } from '../../Services/roleService';
import { deleteRightFromProfile } from '../../Services/rightService';
import { AddRightToProfile } from '../../Services/rightService';
import { updateCol } from '../../Services/columnService';
import { CardActionArea } from '@material-ui/core';
import ActionLogDetail from '../ActionLog/ActionLogDetail'


/****************************for mail*/
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


class EventRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      // documents:[],
      mails: [],
      subject: '',
      content: '',
      param: '',
      checked: [],
      email: '',
      removed: "",
      details: [],
      nom_complet: '',
      res_mail: '',
      mailResultDisplay: 'none',
      openSecondDialog: false,
      res_add: '',
      openDialgAdd: false,
      colorAdd: '',
      check: true,

    };
    //this.handleChange1 = this.handleChange1.bind(this); 
  }




  /* handleChange1(check) {
    this.setState({ check });
  } */


  handleChange1 = (param1, param2) => {
    console.log("lid est " + param1)
    console.log("l a vis  est " + param2)
    updateCol(param1, param2).then();

  };


  Mail = (param) => {
    this.setState({
      open: true,
      param: param,
    });
    getMailsList(param)
      .then(res => this.setState({ mails: res })
      )
      .catch(err => console.log(err))
  };

  structure = (e, param) => {
    this.props.modificate(true);
    if ((document.getElementById(param.id * 55555).getAttribute("class") === "btn btn-danger btn-sm")) {
      deleteStructure(param.id, this.props.matricule)
        .then(
          document.getElementById(param.id * 55555).color = "info",
          document.getElementById(param.id * 55555).className = "btn btn-info btn-sm",
          document.getElementById(param.id * 55555).children[0].className = "fa fa-plus",
          this.props.modificate(true)
        )
    }
    else {
      postStructure({ idUser: this.props.matricule, idStructure: param.id })
        .then(
          document.getElementById(param.id * 55555).color = "danger",
          document.getElementById(param.id * 55555).className = "btn btn-danger btn-sm",
          document.getElementById(param.id * 55555).children[0].className = "fa fa-trash",
          this.props.modificate(true)
        )
    }
  }


  getAssocieeStructure = (param) => {
    if (param.associee === 'O') {
      return <Button color="danger" id={param.id * 55555} onClick={(e) => this.structure(e, param)} size="sm">
        <i className="fa fa-trash"></i></Button>;
    } else {
      return <Button color="info" id={param.id * 55555} onClick={(e) => this.structure(e, param)} size="sm" className="mr-2">
        <i className="fa fa-plus"></i></Button>;

    }
  }


  RoleUser(idUser, idEvent) {
    console.log("00 FUNCTION");
    if (document.getElementById(idEvent).getAttribute('class') === "btn btn-danger btn-sm") {
      DeleteRole(idUser, idEvent)
        .then(res => {
          console.log("00 ADD");
          console.log("00 ADD",res);
          if (res.assignmentDate!=='') {
            
            this.setState({ res_add: "Suppression de profile effectuée avec succès", openDialgAdd: true, colorAdd: "success" });
            document.getElementById(idEvent).color = "success";
            document.getElementById(idEvent).className = "btn btn-success btn-sm";
            document.getElementById(idEvent).children[0].className = "fa fa-plus";

          }
          else
            this.setState({ res_add: "Echecs suppression de profile", openDialgAdd: true, colorAdd: "danger" })
        } ,

        )
    }
    else {
      AddRole({ idUser: idUser, idProfile: idEvent }).then(res => {

        
        console.log("00 DEL");
        console.log("00 DEL",res);
        if (res.assignmentDate!=='') {
          
          this.setState({ res_add:  "Ajout de profile effectué avec succès", openDialgAdd: true, colorAdd: "success" });
          document.getElementById(idEvent).color = "danger";
          document.getElementById(idEvent).className = "btn btn-danger btn-sm";
          document.getElementById(idEvent).children[0].className = "fa fa-trash";

        }
        else this.setState({ res_add: "Echecs Ajout de profile", openDialgAdd: true, colorAdd: "danger" })
      } ,

      ).catch(err => console.log(err))

    }
    // console.log("res_add"+this.state.res_add)
  }



  getAffecteProfile = (idUser, event) => {
    if (event.affecte === 'O') {
      return <div> <Button color="danger" id={event.profileId} size="sm" onClick={() => this.RoleUser(idUser, event.profileId)}   >
        <i className="fa fa-trash"></i></Button>
        <Dialog
          onClose={this.handleClose}
          open={this.state.openDialgAdd}
          display={{ backgroundColor: "transparent !important" }}
        >
          <DialogContent>
            <Alert
              color={this.state.colorAdd}>
              {this.state.res_add}
            </Alert>
          </DialogContent>
          <DialogActions>
           {/*  <Button label="Message" color="success"> Envoyer </Button> */}
               <Button  onClick={()=>this.setState({openDialgAdd:false})} color="primary">Fermer </Button> 
         </DialogActions>
        </Dialog> 

      </div>;
    } else {
      return <div>  <Button color="success" id={event.profileId} size="sm" className="mr-2" onClick={() => this.RoleUser(idUser, event.profileId)}>
        <i className="fa fa-plus"></i></Button>

        <Dialog
          onClose={this.handleClose}
          open={this.state.openDialgAdd}
          display={{ backgroundColor: "transparent !important" }}
        >
          <DialogContent>
            <Alert
              color={this.state.colorAdd}>
              {this.state.res_add}
            </Alert>
          </DialogContent>
          <DialogActions>
           {/*  <Button label="Message" color="success"> Envoyer </Button> */}
               <Button  onClick={()=>this.setState({openDialgAdd:false})} color="primary">Fermer </Button> 
         </DialogActions>
        </Dialog>



      </div>

    }
  }


  /**** added by haifa  */
  /* RightProfile(idUser, idEvent) {
   // console.log
    if (document.getElementById(idEvent).getAttribute('class')==="btn btn-danger btn-sm") {
      deleteRightFromProfile(idUser, idEvent)
        .then(
          document.getElementById(idEvent).color = "success",
          document.getElementById(idEvent).className = "btn btn-success btn-sm",
          document.getElementById(idEvent).children[0].className = "fa fa-plus"
        )
    }
     else 
     {
      AddRightToProfile({ idProfile: idUser, idRight: idEvent }).
      then(  
        res => 
        {  if (res.msg) 
          {  this.setState({ res_add: res.msg , openDialgAdd: true, colorAdd :"success"});
           
            document.getElementById(idEvent).color = "danger";
            document.getElementById(idEvent).className = "btn btn-danger btn-sm";
            document.getElementById(idEvent).children[0].className = "fa fa-trash";
          }
          else 
          {

            console.log("2222222222222");
            //
            this.setState({ res_add: res.error , openDialgAdd: true , colorAdd :"danger" }) 
            
          } 
        } 
      ).catch(err => console.log(err));
      //
      console.log("ok");

    } 
  }  */



  RightProfile(idUser, idEvent) {

    if (document.getElementById(idEvent).getAttribute('class') === "btn btn-danger btn-sm") {
      deleteRightFromProfile(idUser, idEvent)
        .then(res => {

          if (res.msg) {
            console.log("00");
            this.setState({ res_add: res.msg, openDialgAdd: true, colorAdd: "success" });
            document.getElementById(idEvent).color = "success";
            document.getElementById(idEvent).className = "btn btn-success btn-sm";
            document.getElementById(idEvent).children[0].className = "fa fa-plus";

          }
          else
            this.setState({ res_add: res.error, openDialgAdd: true, colorAdd: "danger" })
        } ,

        )
    }
    else {
      AddRightToProfile({ idProfile: idUser, idRight: idEvent }).then(res => {


        if (res.msg) {
          this.setState({ res_add: res.msg, openDialgAdd: true, colorAdd: "success" });
          document.getElementById(idEvent).color = "danger";
          document.getElementById(idEvent).className = "btn btn-danger btn-sm";
          document.getElementById(idEvent).children[0].className = "fa fa-trash";

        }
        else this.setState({ res_add: res.error, openDialgAdd: true, colorAdd: "danger" })
      } ,

      ).catch(err => console.log(err))

    }
    // console.log("res_add"+this.state.res_add)
  }







  getAffecteRight = (idUser, event) => {
    console.log('salut', event)
    if (event.affecte === 'O') {
      return <div>
        <Button color="danger" id={event.rightId} size="sm" onClick={() => this.RightProfile(idUser, event.rightId)}    >
          <i className="fa fa-trash"></i></Button>



        <Dialog
          onClose={this.handleClose}
          open={this.state.openDialgAdd}
          display={{ backgroundColor: "transparent !important" }}
        >
          <DialogContent>
            <Alert
              color={this.state.colorAdd}>
              {this.state.res_add}
            </Alert>
          </DialogContent>
        </Dialog>
      </div>

    } else {
      return <div> <Button color="success" id={event.rightId} size="sm" className="mr-2" onClick={() => this.RightProfile(idUser, event.rightId)} >
        <i className="fa fa-plus"></i></Button>

        <Dialog
          onClose={this.handleClose}
          open={this.state.openDialgAdd}
          display={{ backgroundColor: "transparent !important" }}
        >
          <DialogContent>
            <Alert
              color={this.state.colorAdd}>
              {this.state.res_add}
            </Alert>
          </DialogContent>
        </Dialog>
      </div>

    }
  }







  EtatHabilitation = (e, param) => {
    if (document.getElementById(param.id).getAttribute('class') === "btn btn-danger btn-sm") {
      deleteRowHabilitation(this.props.matricule, param.code)
        .then(
          this.props.modificate(true)
        )
    }
    else {
      postEtatHabilitation({ idUser: this.props.matricule, codeHabilitation: param.code })
        .then(
          this.props.modificate(true)
        )
    }
  }


  getAssociee = (param) => {
    if (param.associee === 'O') {
      return <Button color="danger" id={param.id} onClick={(e) => this.EtatHabilitation(e, param)} size="sm"><i className="fa fa-trash"></i></Button>;
    } else {
      return <Button color="info" id={param.id} onClick={(e) => this.EtatHabilitation(e, param)} size="sm" className="mr-2"><i className="fa fa-plus"></i></Button>;
    }
  }




  //Handle close
  handleClose = () => {
    this.setState({ open: false, mailResultDisplay: "none", openSecondDialog: false, openThirdDialog: true });
    this.setState({ checked: [], res_mail: '', openDialgAdd: false });
  }


  //Send a mail 
  send = (param, param1, param2, param3) => {
    this.setState({ mailResultDisplay: "none" })
    if (this.state.email !== '') {
      param3.push(this.state.email);
    };
    sendMail(param, param1, param2, param3)
      .then(res => {
        console.log('aaa', res.msg)
        if (res.msg === "Echec d'envoi!!") { this.setState({ mailResultDisplay: "block", res_mail: res, checked: [] }) }
        else if (res.msg === "Vous devez saisir au moins un destinataire!!") { this.setState({ mailResultDisplay: "block", res_mail: res, checked: [] }) }
        else {
          this.setState({ checked: [], res_mail: res, open: false, mailResultDisplay: "none", openSecondDialog: true })
          setTimeout(() => {
            this.setState({ openSecondDialog: false })

            //document.location.reload(true);
          }, 1000);
        }
      }
      )


  };




  // On change handler
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }


  // Handle toggle
  handleToggle = value => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    this.setState({
      checked: newChecked,
    });
  };



  //Download a pdf file
  download = (id, name) => {
    DownloadAPdf(id)
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', name);
        document.body.appendChild(link);
        link.click();
      })
      .catch(err => console.log(err))
  }




  //remove visilbility of a document
  removeDoc = (param) => {
    removeADocument(param)
      .then((response) => {
        this.props.getDocsOfUser()
        this.setState({ removed: "removed" })
      })
      .catch(err => console.log(err))
  }




  submitDelete = (id) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <Card className="main-card mb-3">
            <CardHeader><h2>Confirmation...</h2></CardHeader>
            <CardBody>
              <div className='custom-ui'>
                <p><strong>Êtes-vous sûr de cacher ce document?</strong></p>
                <div align="right">
                  <Button color="success" onClick={() => { this.removeDoc(id); onClose(); }}>Confirmer</Button>&nbsp;
                  <Button color="danger" onClick={onClose}>Annuler</Button>
                </div>
              </div>
            </CardBody>

          </Card>
        );
      }
    });
  };




  submitDeleteDelegation = (id) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <Card className="main-card mb-3">
            <CardHeader><h2>Confirmation...</h2></CardHeader>
            <CardBody>
              <div className='custom-ui'>
                <p><strong>Êtes-vous sûr de supprimer cette délégation ?</strong></p>
                <div align="right">
                  <Button color="success" onClick={() => { this.Delete_Delegation(id); onClose(); }}>Confirmer</Button>&nbsp;
                  <Button color="danger" onClick={onClose}>Annuler</Button>
                </div>
              </div>
            </CardBody>structure
          </Card>
        );
      }
    });
  };



  Delete_Delegation = (param) => {
    DeleteDelegation(param).then(res => {
      console.log(document.getElementById(param).getAttribute("id"))
      document.getElementById(param).setAttribute('id', Math.random())
      this.props.modificate(true)
    })
  }



  render() {
    const check = this.state.check;
    const event = this.props.event;
    const res_mail = this.state.res_mail;
    if ((this.props.ComponentName == 'SimpleSearch') || (this.props.ComponentName == 'AdvancedSearch')) {

      if (!event.typeDocument && !event.accountNumber)
        return <Alert color='danger' style={{ position: 'absolute', BackgroundColor: "danger", left: '40%', top: '60%', fontSize: '20px' }}>No results found</Alert>
      else return (

        <tr className={" " + this.state.removed} >
          {(this.props.ComponentName == 'SimpleSearch') ? <td>{this.props.rank + 1}</td> : null}
          {this.props.details.map((el, key) => {
            if (el.nomColonne == 'accountingDate')
              return (<td key={el.colonneDisplay}> {new Date(event[el.nomColonne]).toLocaleDateString()}</td>);
            else
              return (<td key={el.colonneDisplay} >{event[el.nomColonne] != null ? event[el.nomColonne] : 'NOT FOUND'} </td>);
          }
          )
          }
          <td>

            <Button color='transparent' size="sm" className="mr-1 ml-0" style={{ margin: "0px", padding: "0px" }}>
              <DialogInfo doc={event} />
            </Button>


            <Link to={`/DocumentView/${event.id}`}  ><Button color="success" size="sm" className="mr-2"><i className="fa fa-eye"></i></Button> </Link>



            <Button color="primary" size="sm" className="mr-2" onClick={() => this.download(event.id, event.fileNameOut)}><i className="fa fa-download"></i></Button>

            <Button color="warning" size="sm" className="mr-2" onClick={() => this.Mail(event.id)} ><i className="fa fa-envelope"></i></Button>

            <Dialog
              onClose={this.handleClose}
              open={this.state.openSecondDialog}
              display={{ backgroundColor: "transparent !important" }}
            >
              <DialogContent style={{ backgroundColor: "#dbf2e3" }}>
                <Alert
                  color="success" style={{ backgroundColor: "#dbf2e3" }} >
                  {res_mail.msg}
                </Alert>
              </DialogContent>
            </Dialog>
            <Dialog

              onClose={this.handleClose}
              aria-labelledby="customized-dialog-title"
              open={this.state.open}
            >
              <DialogTitle id="customized-dialog-title" onClose={this.handleClose}   >
                {/*  <Alert color="danger">

{this.state.res_mail.msg}</Alert> */}
                Envoi d'un document...

              </DialogTitle>
              <DialogContent>
                <div className="container">
                  <div className="panel panel-default">
                    <div className="panel-heading">
                      <h5 className="panel-title">
                        Êtes-vous sûr de vouloir envoyer le document au client ?
                      </h5>


                      <h5 className="panel-title">
                        E-MAIL(s):
                      </h5>
                      <List >
                        {this.state.mails.map(value => (
                          <ListItem key={value} role={undefined} dense button onClick={this.handleToggle(value)}>
                            <Checkbox
                              checked={this.state.checked.indexOf(value) !== -1}
                              tabIndex={-1}
                              disableRipple
                            />
                            <ListItemText primary={`${value}`} />
                            <ListItemSecondaryAction>
                              <IconButton aria-label="Comments">
                                <CommentIcon />
                              </IconButton>
                            </ListItemSecondaryAction>
                          </ListItem>
                        ))}
                      </List>
                    </div>

                  </div>
                </div>
                <TextField autoFocus margin="dense" id="email" name="email" value={this.state.email} label="Vous pouvez entrer un autre e-mail..." type="email" fullWidth onChange={this.onChange} />
                <TextField autoFocus margin="dense" id="subject" name="subject" value={this.state.subject} label="Objet" type="text" fullWidth onChange={this.onChange} />
                <div className="content-section implementation">
                  <h5 className="first">Message: </h5>

                  <Editor style={{ height: '200px' }} placeholder="Message..." id="content" htmlValue={this.state.content} onTextChange={(e) => this.setState({ content: e.htmlValue })} type="text" />
                </div>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => this.send(this.state.param, this.state.subject, this.state.content, this.state.checked)} label="Message" color="success"> Envoyer</Button>


                <Button onClick={this.handleClose} color="primary">Annuler </Button>

              </DialogActions>


              <Alert
                color="danger"
                style={{ display: this.state.mailResultDisplay, position: 'absolute', left: '40%' }}>
                {res_mail.msg}
              </Alert>


            </Dialog>
            {
              (this.props.roles.filter(el => el.profile_id === 8).length > 0) && <Button color="danger" size="sm" onClick={() => this.submitDelete(event.id)} ><i className="fa fa-trash" ></i></Button>
            }

          </td>

        </tr>





      );
    }





    else if (this.props.ComponentName == 'GestionHabilitation') {
      if (!event.code)
        return <Alert color='danger' style={{ position: 'absolute', BackgroundColor: "danger", left: '40%', top: '60%', fontSize: '20px' }}>No results found</Alert>
      else return (
        <tr className={" " + this.state.removed} >
          {this.props.details.map((el, key) =>
            <td key={el.colonneDisplay} >{event[el.nomColonne] != null ? event[el.nomColonne] : 'NOT FOUND'} </td>
          )
          }
          <td>
            {this.getAssociee(event)}
          </td>
        </tr>

      );






    } else if (this.props.ComponentName == 'GestionStructure') {
      if (!event.libelleStructure)
        return <Alert color='danger' style={{ position: 'absolute', BackgroundColor: "danger", left: '40%', top: '60%', fontSize: '20px' }}>No results found</Alert>
      else return (
        <tr className={" " + this.state.removed} >
          {this.props.details.map((el, key) =>
            <td key={el.colonneDisplay} >{event[el.nomColonne] != null ? event[el.nomColonne] : 'NOT FOUND'} </td>
          )
          }
          <td>
            {this.getAssocieeStructure(event)}
          </td>
        </tr>

      );
    }

    else if (this.props.ComponentName == 'ActionLog') {
      if (!event.action && !event.structure && !event.user)
        return <Alert color='danger' style={{ position: 'absolute', BackgroundColor: "danger", left: '40%', top: '60%', fontSize: '20px' }}>No results found</Alert>
      else return (
        <tr className={" " + this.state.removed} >
          {this.props.details.map((el, key) => {
            if (el.nomColonne == "structure.libelleStructure")
              return (
                <td key={el.colonneDisplay}>{(event.structure && event.structure.libelleStructure) ? event.structure.libelleStructure : "NOT FOUND"} </td>);

            else if (el.nomColonne == 'action.actionLib')
              return (
                <td key={el.colonneDisplay}>{(event.action && event.action.actionLib) ? event.action.actionLib : 'NOT FOUND'}</td>);

            else if (el.nomColonne == "user.appUserCode")
              return (
                <td key={el.colonneDisplay}> {(event.user && event.user.appUserCode) ? event.user.appUserCode : 'NOT FOUND'}</td>);

            else if (el.nomColonne == 'date')
              return (
                <td key={el.colonneDisplay}> {new Date(event[el.nomColonne]).toLocaleDateString()}</td>);

            else
              return (
                <td key={el.colonneDisplay}> {event[el.nomColonne] ? event[el.nomColonne] : 'NOT FOUND'}</td>);
          }
          )}
          <td>

            <Button color='transparent' size="sm" className="mr-1 ml-0" style={{ margin: "0px", padding: "0px" }}>
              <ActionLogDetail action={event} />
            </Button>
          </td>
        </tr>
      );
    }


    else if (this.props.ComponentName == 'GestionDelegation') {
      console.log(event)
      if (!event.delegueNom && !event.dateFinDelegation && !event.dateDebDelegation)
        return <Alert color='danger' style={{ position: 'absolute', BackgroundColor: "danger", left: '40%', top: '60%', fontSize: '20px' }}>No results found</Alert>
      else return (
        <tr className={" " + this.state.removed} >
          {this.props.details.map((el, key) => {
            if (el.nomColonne == 'dateDebDelegation' || el.nomColonne == 'dateFinDelegation')
              return <td>{new Date(event[el.nomColonne]).toLocaleDateString()} </td>;
            else
              return <td >{event[el.nomColonne]}</td>;
          })
          }
          <td>
            <Button color="danger" id={event.delegationId} size="sm" onClick={() => this.submitDeleteDelegation(event.delegationId)}><i className="fa fa-trash"></i></Button>
          </td>
        </tr>
      );
    }


    else if (this.props.ComponentName == 'GestionColonnes') {
      return (
        <tr className={" " + this.state.removed} >
          {this.props.details.map((el, key) => {

            // return <td >{event[el.nomColonne]==='Actif' ? this.state = {check: true }  : this.state = {check: false }  }</td>; 

            if (el.nomColonne === 'nomVisibility' && event[el.nomColonne] === 'Actif') {
              // this.state = {check: true} 
              return <td> <Switch onChange={() => this.handleChange1(event.id, 'Inactif')} checked={true} id="normal-switch" /></td>
              // onClick={() => this.submitDeleteDelegation(event.delegationId)}
            }

            else if (el.nomColonne === 'nomVisibility' && event[el.nomColonne] === 'Inactif') {
              // this.state = {check: true} 
              return <td> <Switch onChange={() => this.handleChange1(event.id, 'Actif')} checked={false} id="normal-switch" /></td>

            }


            else
              return <td >{event[el.nomColonne]}</td>



          })
          }
          {/*  <td>
       <label htmlFor="normal-switch">
        <Switch
          onChange={this.handleChange1}
          check={this.state.check}
          id="normal-switch"
        />
      </label>

          </td> */}
        </tr>
      );


    }




    else if (this.props.ComponentName == 'Profil') {
      if (!event.appUserLastName && !event.appUserFirstName)
        return <Alert color='danger' style={{ position: 'absolute', BackgroundColor: "danger", left: '40%', top: '60%', fontSize: '20px' }}>No results found</Alert>
      else return (
        <tr className={" " + this.state.removed} >
          {this.props.details.map((el, key) => {

            return <td >{event[el.nomColonne]}</td>;
          })
          }
          <td>
            <Link to={`/gestionProfil/${event.appUserId}`}  > <Button color="info" size="sm" ><i className="cui-user"></i></Button></Link>
          </td>
        </tr>
      );
    }



    else if (this.props.ComponentName == 'GestionProfil') {
      if (!event.profileName && !event.profileDescription)
        return <Alert color='danger' style={{ position: 'absolute', BackgroundColor: "danger", left: '40%', top: '60%', fontSize: '20px' }}>No results found</Alert>
      else return (
        <tr className={" " + this.state.removed} >
          {this.props.details.map((el, key) => {
            return <td >{event[el.nomColonne]}</td>;
          })
          }
          <td>
            {this.getAffecteProfile(this.props.idUser, event)}
          </td>
        </tr>
      );
    }


    else if (this.props.ComponentName == 'AllProfils') {   //AllProfils  
      return (
        <tr className={" " + this.state.removed} >
          {this.props.details.map((el, key) => {
            if (el.nomColonne == 'dateDebDelegation' || el.nomColonne == 'dateFinDelegation')
              return <td>{new Date(event[el.nomColonne]).toLocaleDateString()} </td>;
            else
              return <td >{event[el.nomColonne]}</td>;
          })
          }
          <td>
            <Link to={`/gestionRight/${event.profileId}`}  > <Button color="info" size="sm" ><i className="cui-user"></i></Button></Link>
          </td>
        </tr>
      );
    }
    else if (this.props.ComponentName == 'GestionRight') {
      return (
        <tr className={" " + this.state.removed} >
          {this.props.details.map((el, key) => {
            if (el.nomColonne == 'dateDebDelegation' || el.nomColonne == 'dateFinDelegation')
              return <td>{new Date(event[el.nomColonne]).toLocaleDateString()} </td>;
            else
              return <td >{event[el.nomColonne]}</td>;
          })
          }
          <td>
            {this.getAffecteRight(this.props.idUser, event)}
          </td>
        </tr>
      );
    }


    else {
      return (
        <tr>
          <td>test</td>
        </tr>
      );
    }
  }
}

const mapStateToProps = state => ({
  docs: state.Docs,
  roles: state.userInfo.user.roles
})

export default connect(mapStateToProps, { getDocsOfUser })(EventRow)





