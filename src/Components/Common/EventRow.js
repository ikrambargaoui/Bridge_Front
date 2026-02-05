import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import { IoMdDownload } from "react-icons/io";
import 'react-confirm-alert/src/react-confirm-alert.css';
import { } from '../Tables/example.scss';
import { } from '../Tables/lib/styles.css';
import Switch from "react-switch";
import { GrView } from "react-icons/gr";
import { FaUnlockKeyhole } from "react-icons/fa6";
import { PiFileCsvDuotone } from "react-icons/pi";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Alert,
  Badge,
} from 'reactstrap';
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
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import CommentIcon from '@material-ui/icons/Comment';
import { getMailsList, sendMail } from '../../Services/mailServices';
import { removeADocument } from '../../Services/docsServices';
import { postEtatHabilitation } from '../../Services/HabilitationServices';
import { deleteRowHabilitation } from '../../Services/HabilitationServices';
import { postStructure } from '../../Services/StructureService';
import { deleteStructure } from '../../Services/StructureService';
import { DownloadAPdf, DownloadACsv } from '../../Services/docsServices';
import DialogInfo from '../SimpleSearch/DialogInfo'
import { DeleteDelegation } from '../../Services/delegationService';
import { DeleteRole } from '../../Services/roleService';
import { AddRole } from '../../Services/roleService';
import { deleteRightFromProfile } from '../../Services/rightService';
import { AddRightToProfile } from '../../Services/rightService';
import { updateCol } from '../../Services/columnService';
import ActionLogDetail from '../ActionLog/ActionLogDetail'
import { changeStateUser } from '../../Services/userService';



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
      disabledBtnSendMail: false
    };

  }



  handleChange1 = (param1, param2) => {
    updateCol(param1, param2).then();

  };


  Mail = (param) => {
    this.setState({
      open: true,
      param: param,
      disabledBtnSendMail: false
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

    if (document.getElementById(idEvent).getAttribute('class') === "btn btn-danger btn-sm") {
      DeleteRole(idUser, idEvent)
        .then(res => {

          if (res.assignmentDate !== '') {

            this.setState({ res_add: "Profil supprimé avec succès", openDialgAdd: true, colorAdd: "success" });
            document.getElementById(idEvent).color = "success";
            document.getElementById(idEvent).className = "btn btn-success btn-sm";
            document.getElementById(idEvent).children[0].className = "fa fa-plus";

          }
          else
            this.setState({ res_add: "Echecs suppression de profil", openDialgAdd: true, colorAdd: "danger" })
        },

        )
    }
    else {
      AddRole({ idUser: idUser, idProfile: idEvent }).then(res => {
        if (res.assignmentDate !== '') {
          this.setState({ res_add: "Profil ajouté avec succès", openDialgAdd: true, colorAdd: "success" });
          document.getElementById(idEvent).color = "danger";
          document.getElementById(idEvent).className = "btn btn-danger btn-sm";
          document.getElementById(idEvent).children[0].className = "fa fa-trash";
        }
        else this.setState({ res_add: "Echecs Ajout de profil", openDialgAdd: true, colorAdd: "danger" })
      },
      ).catch(err => console.log(err))
    }
  }
  handleViewDocument = () => {
    if (this.props.history) {
      this.props.history.push(`/document-view/${this.props.event.key}`);
    } else {
      console.error('History not available');
    }
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
            <Button onClick={() => this.setState({ openDialgAdd: false })} color="primary">Fermer </Button>
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
            <Button onClick={() => this.setState({ openDialgAdd: false })} color="primary">Fermer </Button>
          </DialogActions>
        </Dialog>
      </div>
    }
  }




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
        },

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
      },

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
    console.log('download  ', id, name)
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


  //Download a csv file
  downloadCsv = (id, name) => {
    console.log('download  ', id, name)
    DownloadACsv(id)
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

        this.setState({ removed: "removed" })
      })
      .catch(err => console.log(err))
  }


  removeUser = (param, state) => {
    let finalEtat = state === "Actif" ? "Inactif" : 'Actif'
    changeStateUser(param, finalEtat)
      .then((response) => {
        window.location.reload();
      })
      .catch(err => console.log(err))
  }




  submitDelete = (id) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <Card className="main-card mb-3">
            <CardHeader><h2></h2></CardHeader>
            <CardBody>
              <div className='custom-ui'>
                <p><strong>Etes-vous sure de vouloir cacher ce document?</strong></p>
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


  submitUserDelete = (id, etat) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <Card className="main-card mb-3">
            <CardHeader><h2></h2></CardHeader>
            <CardBody>
              <div className='custom-ui'>
                <p><strong>Etes-vous sure de vouloir {etat === "Actif" ? "désactiver" : "activer"} ce compte?</strong></p>
                <div align="right">
                  <Button color="success" onClick={() => { this.removeUser(id, etat); onClose(); }}>Confirmer</Button>&nbsp;
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
            <CardHeader><h2></h2></CardHeader>
            <CardBody>
              <div className='custom-ui'>
                <p><strong>Etes-vous sure de vouloir supprimer cette délégation ?</strong></p>
                <div align="right">
                  <Button color="success" onClick={() => { this.Delete_Delegation(id); onClose(); }}>Confirmer</Button>&nbsp;
                  <Button color="danger" onClick={onClose}>Annuler</Button>
                </div>
              </div>
            </CardBody>
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
    const isChecked = this.props.selectedDocs.some(doc => doc.key === this.props.event.key);

    const check = this.state.check;
    const event = this.props.event;
    const res_mail = this.state.res_mail;
    if ((this.props.ComponentName == 'SimpleSearch') || (this.props.ComponentName == 'AdvancedSearch')) {

      if (!event.typeDocument && !event.accountNumber)
        return <Alert color='danger' style={{ position: 'absolute', BackgroundColor: "danger", left: '40%', top: '60%', fontSize: '20px' }}>Aucun document trouvé</Alert>
      else return (

        <tr key={event.key}>
          <td>
            <Checkbox
              checked={isChecked}
              onChange={() => this.props.onToggleDoc(this.props.event)}
            />
          </td>

          {(this.props.ComponentName == 'SimpleSearch') ? <td>{this.props.index + 1}</td> : null}
          {this.props.details.map((el, key) => {
            if (el.nomColonne == 'accountingDate')
              return (<td key={el.colonneDisplay}> {event[el.nomColonne]}</td>);



            else if (el.nomColonne == 'accountNumber')


              return (
                <td key={el.colonneDisplay}>
                  {(event.folderNumber).startsWith('LD')
                    ? (event.folderNumber) : (event.accountNumber)

                  }

                </td>
              );



            else if (el.nomColonne == 'ctosAccountNumber')


              return (
                <td key={el.colonneDisplay}>
                  {(event.folderNumber).startsWith('LD')
                    ? (event.migrefBiat) : (event.ctosAccountNumber)

                  }

                </td>
              );



            else if (el.nomColonne == 'contentieux')


              return (

                <td key={el.colonneDisplay}>
                  <Badge
                    color={event.contentieux === "NON" ? "success" : ((event.contentieux === "NON") ? "danger" : "")}
                    pill>
                    {(event.contentieux) === "NON" ? "NON" : ((event.contentieux) === "OUI" ? "OUI" : "-")}</Badge></td>


              );



            else if (el.nomColonne == 'transfertCtx')


              return (

                <td key={el.colonneDisplay}>
                  <Badge
                    color={event.transfertCtx === "NON" ? "success" : ((event.transfertCtx === "NON") ? "danger" : "")}
                    pill>
                    {(event.transfertCtx) === "NON" ? "NON" : ((event.transfertCtx) === "OUI" ? "OUI" : "-")}</Badge></td>


              );


            else
              return (<td key={el.colonneDisplay} > {event[el.nomColonne] != null ? event[el.nomColonne] : ' '} </td>);
          }
          )
          }
          <td>

            <Button color='transparent' size="sm" className="mr-2" style={{ margin: "0px", padding: "0px" }}>
              <DialogInfo doc={event} />
            </Button>
            <Link
              to={`/DocumentView/${this.props.event.key}`}
              onClick={() => {
                if (this.props.onNavigateToDocument) {
                  this.props.onNavigateToDocument();
                }
              }}
            >
              <Button color="danger" size="sm" className="mr-2">
                <i className="fa fa-eye"></i>
              </Button>
            </Link>
            <Button color="primary" size="sm" className="mr-2" onClick={() => this.download(event.key, event.fileNameOut)}><i className="fa fa-download"></i></Button>
            {event.fileNameOutCsv != null && <Button color="success" size="sm" className="mr-2" onClick={() => this.downloadCsv(event.key, event.fileNameOutCsv)}>csv</Button>
            }


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
                        Etes-vous sure de vouloir envoyer le document au client ?
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
                <Button onClick={() => this.send(this.state.param, this.state.subject, this.state.content, this.state.checked)} label="Message" color="success" disabled={this.state.disabledBtnSendMail}> Envoyer</Button>


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
        return <Alert color='danger' style={{ position: 'absolute', BackgroundColor: "danger", left: '40%', top: '60%', fontSize: '20px' }}>Aucun résultat trouvé</Alert>
      else return (
        <tr className={" " + this.state.removed} >
          {this.props.details.map((el, key) =>
            <td key={el.colonneDisplay} >{event[el.nomColonne] != null ? event[el.nomColonne] : ' '} </td>
          )
          }
          <td>
            {this.getAssociee(event)}
          </td>
        </tr>

      );






    } else if (this.props.ComponentName == 'GestionStructure') {
      if (!event.libelleStructure)
        return <Alert color='danger' style={{ position: 'absolute', BackgroundColor: "danger", left: '40%', top: '60%', fontSize: '20px' }}>Aucune structure trouvée</Alert>
      else return (
        <tr className={" " + this.state.removed} >
          {this.props.details.map((el, key) =>
            <td key={el.colonneDisplay} >{event[el.nomColonne] != null ? event[el.nomColonne] : ' '} </td>
          )
          }
          <td>
            {this.getAssocieeStructure(event)}
          </td>
        </tr>

      );
    }

    else if (this.props.ComponentName == 'ListUser') {
      if (!(event.appUserCode))
        return <Alert color='danger' style={{ position: 'absolute', BackgroundColor: "danger", left: '40%', top: '60%', fontSize: '20px' }}>Aucun utilisateur trouvé</Alert>

      else {
        return (
          <tr className={" " + this.state.removed} >
            {this.props.details.map((el, key) => {
              if (el.nomColonne == "appUserCode")
                return (
                  <td key={el.colonneDisplay}>{(event.appUserCode) ? event.appUserCode : " "} </td>);

              else if (el.nomColonne == 'appUserFirstName')
                return (
                  <td key={el.colonneDisplay}>{(event.appUserFirstName) ? event.appUserFirstName : ' '}</td>);

              else if (el.nomColonne == "appUserLastName")
                return (
                  <td key={el.colonneDisplay}> {(event.appUserLastName) ? event.appUserLastName : ' '}</td>);
              else if (el.nomColonne == "appUserEmail")
                return (
                  <td key={el.colonneDisplay}> {(event.appUserEmail) ? event.appUserEmail : ' '}</td>);
              else if (el.nomColonne == "appUserState")
                return (

                  <td key={el.colonneDisplay}>
                    <Badge
                      color={event.appUserState === "Actif" ? "success" : "danger"}
                      pill>
                      {(event.appUserState) === "Actif" ? "Activé" : 'Désactivé'}</Badge></td>


                );
            }
            )}
            <td>

              <Button color="danger" id={event.id * 55555} className="mr-2" onClick={(e) => this.submitUserDelete(event.appUserCode, event.appUserState)} size="sm">
                <i className="fa fa-trash"></i></Button>

              <Link to={`/gestionProfil/${event.appUserId}`}  > <Button color="warning" size="sm" className="mr-2"><i className="fa fa-user-plus"></i></Button></Link>

            </td>
          </tr>
        );
      }
    }

    else if (this.props.ComponentName == 'ActionLog') {
      if (!event.action && !event.structure && !event.user)
        return <Alert color='danger' style={{ position: 'absolute', BackgroundColor: "danger", left: '40%', top: '60%', fontSize: '20px' }}>Aucun historique</Alert>
      else return (

        <tr className={" " + this.state.removed}>
          {this.props.details.map((el, key) => {

            if (el.nomColonne == 'action.actionLib')
              return (
                <td key={el.colonneDisplay}>{(event.action && event.action.actionLib) ? ((event.action.actionLib == 'Download') ? <IoMdDownload style={{ width: "20px", height: "20px", color: "#b2391f" }} /> : ((event.action.actionLib == 'View') ? <GrView style={{ width: "20px", height: "20px", color: "#df5059" }} /> : ((event.action.actionLib == 'SignIn') ? <FaUnlockKeyhole style={{ width: "18px", height: "18px", color: "#2b3472" }} /> : ((event.action.actionLib == 'DownloadCsv') ? <PiFileCsvDuotone style={{ width: "19px", height: "19px", color: "#337756" }} /> : '')))) : ' '}</td>);

            else if (el.nomColonne == "user.appUserCode")
              return (
                <td key={el.colonneDisplay}> {(event.user && event.user.appUserCode) ? event.user.appUserCode : ' '}</td>);



            else if (el.nomColonne == "account")
              return (
                <td key={el.colonneDisplay}> {(event && event.account) ? event.account : ' '}</td>);

            else if (el.nomColonne == "docType")
              return (
                <td key={el.colonneDisplay}> {(event && event.docType) ? event.docType : ' '}</td>);
            else if (el.nomColonne == "agency")
              return (
                <td key={el.colonneDisplay}> {(event && event.agency) ? event.agency : ' '}</td>);
            else if (el.nomColonne == 'date')
              return (
                <td key={el.colonneDisplay}>  {(event && event.actionDateD) ? event.actionDateD : ' '}</td>);

            else if (el.nomColonne == 'date')
              return (
                <td key={el.colonneDisplay}>  {(event && event.actionDateH) ? event.actionDateH : ' '}</td>);

            else
              return (
                <td key={el.colonneDisplay}> {event[el.nomColonne] ? event[el.nomColonne] : ' '}</td>);
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

            if (el.nomColonne === 'nomVisibility' && event[el.nomColonne] === 'Actif') {

              return <td> <Switch onChange={() => this.handleChange1(event.id, 'Inactif')} checked={true} id="small-switch" /></td>

            }

            else if (el.nomColonne === 'nomVisibility' && event[el.nomColonne] === 'Inactif') {

              return <td> <Switch onChange={() => this.handleChange1(event.id, 'Actif')} checked={false} id="small-switch" /></td>

            }
            else
              return <td >{event[el.nomColonne]}</td>
          })
          }

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
          </td> 2.
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


    else if (this.props.ComponentName == 'AllProfils') {
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

export default connect(mapStateToProps, {})(EventRow)




