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
import { findUserProfiles, changeStateUser } from '../../Services/userService';
import MuiDialogTitle from '@material-ui/core/DialogTitle';


import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Alert,
  Badge,
} from 'reactstrap';

import Dialog from '@material-ui/core/Dialog';
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




const CustomDialogTitle = withStyles(theme => ({
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
        <IconButton className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});



const CustomDialogContent = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing.unit * 2,
  },
}))(MuiDialogContent);

const CustomDialogActions = withStyles(theme => ({
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
      profilesLoading: false,
      profiles: [],
      profilesError: '',
      profilesModalOpen: false,
      profilesModalLoading: false,
      profilesModalError: '',
      profilesModalData: [],
      profilesModalUser: null,
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
      disabledBtnSendMail: false,
      cachedProfilesByCuti: {} // cache pour éviter appels multiples
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
          <CustomDialogContent>
            <Alert
              color={this.state.colorAdd}>
              {this.state.res_add}
            </Alert>
          </CustomDialogContent>
          <CustomDialogActions>
            <Button onClick={() => this.setState({ openDialgAdd: false })} color="primary">Fermer </Button>
          </CustomDialogActions>
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
          <CustomDialogContent>
            <Alert
              color={this.state.colorAdd}>
              {this.state.res_add}
            </Alert>
          </CustomDialogContent>
          <CustomDialogActions>
            <Button onClick={() => this.setState({ openDialgAdd: false })} color="primary">Fermer </Button>
          </CustomDialogActions>
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
          <CustomDialogContent>
            <Alert
              color={this.state.colorAdd}>
              {this.state.res_add}
            </Alert>
          </CustomDialogContent>
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
          <CustomDialogContent>
            <Alert
              color={this.state.colorAdd}>
              {this.state.res_add}
            </Alert>
          </CustomDialogContent>
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


  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }


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




openProfilesModal = async (user) => {
  console.log("CLICK PROFILS", user);

  this.setState({
    profilesModalOpen: true,
    profilesModalLoading: true,
    profilesModalError: '',
    profilesModalData: [],
    profilesModalUser: user
  });

  try {
    const res = await findUserProfiles(user.appUserCode);

    // sécurisation de la réponse
    const data = Array.isArray(res) ? res : (res?.data || []);

    console.log("PROFILS RECUS", data);

    this.setState({
      profilesModalData: data,
      profilesModalLoading: false
    });
  } catch (e) {
    console.error("ERREUR PROFILS", e);
    this.setState({
      profilesModalLoading: false,
      profilesModalError: "Impossible de charger les profils"
    });
  }
};



closeProfilesModal = () => {
  this.setState({
    profilesModalOpen: false,
    profilesModalUser: null,
    profilesModalData: [],
    profilesModalError: ''
  });
};



  render() {
    const isChecked = this.props.selectedDocs.some(doc => doc.key === this.props.event.key);

    const check = this.state.check;
    const event = this.props.event;
    const res_mail = this.state.res_mail;

    if ((this.props.ComponentName == 'SimpleSearch') || (this.props.ComponentName == 'AdvancedSearch')) {
      // ---- ton code inchangé ----
      // (je laisse tel quel, pas besoin de toucher)
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
                    {(event.contentieux) === "NON" ? "NON" : ((event.contentieux) === "OUI" ? "OUI" : "-")}
                  </Badge>
                </td>
              );
            else if (el.nomColonne == 'transfertCtx')
              return (
                <td key={el.colonneDisplay}>
                  <Badge
                    color={event.transfertCtx === "NON" ? "success" : ((event.transfertCtx === "NON") ? "danger" : "")}
                    pill>
                    {(event.transfertCtx) === "NON" ? "NON" : ((event.transfertCtx) === "OUI" ? "OUI" : "-")}
                  </Badge>
                </td>
              );
            else
              return (<td key={el.colonneDisplay} > {event[el.nomColonne] != null ? event[el.nomColonne] : ' '} </td>);
          })}
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
          </td>
        </tr>
      );
    }

    else if (this.props.ComponentName == 'ListUser') {
      if (!event.appUserCode)
        return (
          <Alert color="danger" style={{ position: 'absolute', left: '40%', top: '60%' }}>
            Aucun utilisateur trouvé
          </Alert>
        );

      return (
        <>
          <tr className={" " + this.state.removed}>
            {this.props.details.map((el) => {

              if (el.nomColonne === "appUserCode")
                return <td key={el.colonneDisplay}>{event.appUserCode}</td>;

              // MODIFICATION ICI : Prénom cliquable
              if (el.nomColonne === "appUserFirstName")
                return (
                  <td key={el.colonneDisplay}>
                    <span
                      onClick={() => this.openProfilesModal(event)}
                      style={{
                        color: '#007bff',
                        cursor: 'pointer',
                        fontWeight: 'bold'
                      }}
                    >
                      {event.appUserFirstName}
                    </span>
                  </td>
                );

              if (el.nomColonne === "appUserLastName")
                return <td key={el.colonneDisplay}>{event.appUserLastName}</td>;

              if (el.nomColonne === "appUserEmail")
                return <td key={el.colonneDisplay}>{event.appUserEmail}</td>;

              if (el.nomColonne === "appUserState")
                return (
                  <td key={el.colonneDisplay}>
                    <Badge color={event.appUserState === "Actif" ? "success" : "danger"} pill>
                      {event.appUserState === "Actif" ? "Activé" : "Désactivé"}
                    </Badge>
                  </td>
                );

              return null;
            })}

            <td>
              {/* 🔹 BOUTON OUVRIR POPUP */}
              <Button
                color="info"
                size="sm"
                className="mr-2"
                onClick={() => this.openProfilesModal(event)}
              >
                <i className="fa fa-id-badge"></i>
              </Button>

              <Button
                color="danger"
                size="sm"
                onClick={() => this.submitUserDelete(event.appUserCode, event.appUserState)}
              >
                <i className="fa fa-trash"></i>
              </Button>
            </td>
          </tr>

          {/* 🔹 POPUP PROFILS */}
          <Dialog
            open={this.state.profilesModalOpen}
            onClose={this.closeProfilesModal}
            fullWidth
            maxWidth="sm"
          >
            <CustomDialogTitle onClose={this.closeProfilesModal}>
              Profils de {this.state.profilesModalUser?.appUserFirstName || ''} {this.state.profilesModalUser?.appUserLastName || ''}
            </CustomDialogTitle>

            <CustomDialogContent>
              {this.state.profilesModalLoading && (
                <Alert color="info">Chargement des profils...</Alert>
              )}

              {this.state.profilesModalError && (
                <Alert color="danger">{this.state.profilesModalError}</Alert>
              )}

              {!this.state.profilesModalLoading &&
                !this.state.profilesModalError &&
                (this.state.profilesModalData.length === 0 ? (
                  <Alert color="warning">Aucun profil associé</Alert>
                ) : (
                  <div>
                    <p><strong>Utilisateur:</strong> {this.state.profilesModalUser?.appUserCode}</p>
                    <p><strong>Nombre de profils:</strong> {this.state.profilesModalData.length}</p>
                    <hr />
                    <h6>Liste des profils:</h6>
                    {this.state.profilesModalData.map((p, idx) => (
                      <Badge 
                        key={p.profileId || p.id || idx} 
                        color="primary" 
                        className="mr-1 mb-1"
                        style={{ fontSize: '1em', padding: '8px' }}
                      >
                        {p.profileName || p.name || p.libelle}
                      </Badge>
                    ))}
                  </div>
                ))}
            </CustomDialogContent>

            <CustomDialogActions>
              <Button color="secondary" onClick={this.closeProfilesModal}>
                Fermer
              </Button>
            </CustomDialogActions>
          </Dialog>
        </>
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



/*Ikram*/