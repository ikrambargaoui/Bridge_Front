import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Alert,
  Badge,
  Tooltip,
  Spinner
} from 'reactstrap';

import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import { changeStateUser, findUserProfiles, findUserRights } from '../../Services/userService';


// ✅ Icons
import { FaUserShield, FaUserTie, FaUserCog, FaUserCheck } from "react-icons/fa";
import { MdSecurity, MdOutlineBusinessCenter } from "react-icons/md";
import { AiOutlineTeam } from "react-icons/ai";
import { RiShieldKeyholeLine } from "react-icons/ri";

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
      removed: "",

      // ✅ Tooltip par user
      tooltipOpenByUser: {},

      // ✅ Cache profils par user
      profilesByUser: {},
      profilesLoadingByUser: {},
      profilesErrorByUser: {},

      // ✅ Cache droits par user
      rightsByUser: {},
      rightsLoadingByUser: {},
      rightsErrorByUser: {},

      // ✅ Popup détails
      profileDialogOpen: false,
      selectedUser: null, // { cuti, firstName, lastName }
      dialogTab: 0, // 0=Profils, 1=Droits
    };
  }

  /* =========================================================
     ICONS + STYLE PAR PROFIL
  ========================================================= */

  getProfileMeta = (profileName) => {
    const p = (profileName || '').toUpperCase();

    if (p.includes('ADMIN')) return { icon: <FaUserShield />, badge: "danger" };
    if (p.includes('AGENCY')) return { icon: <MdOutlineBusinessCenter />, badge: "primary" };
    if (p.includes('INSPECT')) return { icon: <FaUserCheck />, badge: "warning" };
    if (p.includes('BACK')) return { icon: <FaUserCog />, badge: "secondary" };
    if (p.includes('RESTRICT') || p.includes('SECUR') || p.includes('RELEVE')) return { icon: <MdSecurity />, badge: "dark" };
    if (p.includes('COMPTA')) return { icon: <FaUserTie />, badge: "info" };
    if (p.includes('RH') || p.includes('TEAM') || p.includes('USER')) return { icon: <AiOutlineTeam />, badge: "success" };

    return { icon: <AiOutlineTeam />, badge: "info" };
  };

  /* =========================================================
     TOOLTIP (hover)
  ========================================================= */

  toggleTooltipUser = (cuti) => {
    this.setState(prev => ({
      tooltipOpenByUser: {
        ...prev.tooltipOpenByUser,
        [cuti]: !prev.tooltipOpenByUser[cuti]
      }
    }));
  };

  loadProfilesIfNeeded = (cuti) => {
    if (this.state.profilesByUser[cuti]) return;

    this.setState(prev => ({
      profilesLoadingByUser: { ...prev.profilesLoadingByUser, [cuti]: true },
      profilesErrorByUser: { ...prev.profilesErrorByUser, [cuti]: '' }
    }));

    findUserProfiles(cuti)
      .then((profiles) => {
        this.setState(prev => ({
          profilesByUser: { ...prev.profilesByUser, [cuti]: profiles || [] },
          profilesLoadingByUser: { ...prev.profilesLoadingByUser, [cuti]: false }
        }));
      })
      .catch(() => {
        this.setState(prev => ({
          profilesLoadingByUser: { ...prev.profilesLoadingByUser, [cuti]: false },
          profilesErrorByUser: { ...prev.profilesErrorByUser, [cuti]: "Erreur lors du chargement des profils" }
        }));
      });
  };

  /* =========================================================
     DROITS (lazy load)
  ========================================================= */

  loadRightsIfNeeded = (cuti) => {
    if (this.state.rightsByUser[cuti]) return;

    this.setState(prev => ({
      rightsLoadingByUser: { ...prev.rightsLoadingByUser, [cuti]: true },
      rightsErrorByUser: { ...prev.rightsErrorByUser, [cuti]: '' }
    }));

    findUserRights(cuti)
      .then((rights) => {
        this.setState(prev => ({
          rightsByUser: { ...prev.rightsByUser, [cuti]: rights || [] },
          rightsLoadingByUser: { ...prev.rightsLoadingByUser, [cuti]: false }
        }));
      })
      .catch(() => {
        this.setState(prev => ({
          rightsLoadingByUser: { ...prev.rightsLoadingByUser, [cuti]: false },
          rightsErrorByUser: { ...prev.rightsErrorByUser, [cuti]: "Erreur lors du chargement des droits" }
        }));
      });
  };

  /* =========================================================
     POPUP (clic)
  ========================================================= */

  openProfileDialog = (user) => {
    this.setState({ profileDialogOpen: true, selectedUser: user, dialogTab: 0 });

    if (user?.cuti) {
      this.loadProfilesIfNeeded(user.cuti);
      // droits chargés seulement si l’utilisateur clique sur l’onglet Droits
    }
  };

  closeProfileDialog = () => {
    this.setState({ profileDialogOpen: false, selectedUser: null, dialogTab: 0 });
  };

  onChangeTab = (_, newValue) => {
    this.setState({ dialogTab: newValue });

    const cuti = this.state.selectedUser?.cuti;
    if (newValue === 1 && cuti) {
      this.loadRightsIfNeeded(cuti);
    }
  };

  /* =========================================================
     ACTIONS USER (activer/désactiver)
  ========================================================= */

  removeUser = (cuti, state) => {
    let finalEtat = state === "Actif" ? "Inactif" : "Actif";
    changeStateUser(cuti, finalEtat)
      .then(() => window.location.reload())
      .catch(err => console.log(err));
  };

  submitUserDelete = (cuti, etat) => {
    confirmAlert({
      customUI: ({ onClose }) => (
        <Card className="main-card mb-3">
          <CardHeader />
          <CardBody>
            <p>
              <strong>
                Êtes-vous sûr de vouloir {etat === "Actif" ? "désactiver" : "activer"} ce compte ?
              </strong>
            </p>
            <div align="right">
              <Button color="success" onClick={() => { this.removeUser(cuti, etat); onClose(); }}>
                Confirmer
              </Button>{' '}
              <Button color="danger" onClick={onClose}>Annuler</Button>
            </div>
          </CardBody>
        </Card>
      )
    });
  };

  /* =========================================================
     RENDER HELPERS
  ========================================================= */

  renderProfilesPretty = (profiles) => {
    if (!profiles || profiles.length === 0) {
      return <i>Aucun profil</i>;
    }

    return (
      <div style={{ minWidth: 320 }}>
        {profiles.map((p) => {
          const meta = this.getProfileMeta(p.profileName);
          return (
            <div
              key={p.profileId || p.profileName}
              style={{
                padding: "10px 12px",
                borderRadius: 10,
                border: "1px solid rgba(0,0,0,0.1)",
                marginBottom: 8,
                background: "#fafafa"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 16 }}>{meta.icon}</span>
                <Badge color={meta.badge} style={{ fontSize: 12 }}>
                  {p.profileName}
                </Badge>
              </div>

              <div style={{ fontSize: 12, marginTop: 6, color: "#444" }}>
                {p.profileDescription ? p.profileDescription : <i>— aucune description —</i>}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  renderRightsPretty = (rights) => {
    if (!rights || rights.length === 0) return <i>Aucun droit</i>;

    // affichage en "chips"
    return (
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, maxWidth: 520 }}>
        {rights.map((r) => (
          <span
            key={r}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "6px 10px",
              borderRadius: 999,
              background: "#f3f6ff",
              border: "1px solid #dbe5ff",
              fontSize: 12,
              color: "#1f2a44"
            }}
          >
            <RiShieldKeyholeLine />
            {r}
          </span>
        ))}
      </div>
    );
  };

  /* =========================================================
     RENDER
  ========================================================= */

  render() {
    const { event, details, ComponentName } = this.props;

    if (ComponentName === 'ListUser') {
      if (!event.appUserCode)
        return <Alert color='danger'>Aucun utilisateur trouvé</Alert>;

      const cuti = event.appUserCode;
      const targetId = `prenom-${cuti}`;

      const loading = this.state.profilesLoadingByUser[cuti];
      const error = this.state.profilesErrorByUser[cuti];
      const profiles = this.state.profilesByUser[cuti];

      return (
        <>
          <tr className={this.state.removed}>
            {details.map((el) => {

              if (el.nomColonne === "appUserCode") {
                return <td key={el.colonneDisplay}>{event.appUserCode}</td>;
              }

              // ✅ Prénom : hover tooltip + clic popup
              if (el.nomColonne === "appUserFirstName") {
                return (
                  <td key={el.colonneDisplay}>
                    <span
                      id={targetId}
                      style={{
                        cursor: 'pointer',
                        fontWeight: 700,
                        color: '#0d6efd',
                        textDecoration: 'underline'
                      }}
                      onMouseEnter={() => this.loadProfilesIfNeeded(cuti)}
                      onClick={() => this.openProfileDialog({
                        cuti,
                        firstName: event.appUserFirstName,
                        lastName: event.appUserLastName
                      })}
                      title="Cliquer pour voir détails"
                    >
                      {event.appUserFirstName ? event.appUserFirstName : ' '}
                    </span>

                    <Tooltip
                      placement="right"
                      isOpen={!!this.state.tooltipOpenByUser[cuti]}
                      target={targetId}
                      toggle={() => this.toggleTooltipUser(cuti)}
                      autohide={false}
                    >
                      <div style={{ fontWeight: 'bold', marginBottom: 6 }}>
                        Profils — {cuti}
                      </div>

                      {loading && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <Spinner size="sm" /> Chargement...
                        </div>
                      )}

                      {!loading && error && (
                        <span style={{ color: 'red' }}>{error}</span>
                      )}

                      {!loading && !error && (
                        this.renderProfilesPretty(profiles)
                      )}

                      <div style={{ marginTop: 6, fontSize: 11, opacity: 0.9 }}>
                        (Clique sur le prénom pour détails + droits)
                      </div>
                    </Tooltip>
                  </td>
                );
              }

              if (el.nomColonne === "appUserLastName") {
                return <td key={el.colonneDisplay}>{event.appUserLastName ? event.appUserLastName : ' '}</td>;
              }

              if (el.nomColonne === "appUserEmail") {
                return <td key={el.colonneDisplay}>{event.appUserEmail ? event.appUserEmail : ' '}</td>;
              }

              if (el.nomColonne === "appUserState") {
                return (
                  <td key={el.colonneDisplay}>
                    <Badge color={event.appUserState === "Actif" ? "success" : "danger"} pill>
                      {event.appUserState === "Actif" ? "Activé" : "Désactivé"}
                    </Badge>
                  </td>
                );
              }

              return null;
            })}

            <td>
              <Button
                color="danger"
                size="sm"
                className="mr-2"
                onClick={() => this.submitUserDelete(event.appUserCode, event.appUserState)}
              >
                <i className="fa fa-trash" />
              </Button>

              <Link to={`/gestionProfil/${event.appUserId}`}>
                <Button color="warning" size="sm" className="mr-2">
                  <i className="fa fa-user-plus" />
                </Button>
              </Link>
            </td>
          </tr>

          {/* ✅ POPUP DÉTAILS */}
          <Dialog
            onClose={this.closeProfileDialog}
            aria-labelledby="customized-dialog-title"
            open={this.state.profileDialogOpen}
            maxWidth="md"
            fullWidth
          >
            <DialogTitle id="customized-dialog-title" onClose={this.closeProfileDialog}>
              Détails utilisateur (Profils & Droits)
            </DialogTitle>

            <DialogContent>
              {this.state.selectedUser && (
                <div style={{ marginBottom: 10 }}>
                  <b>Utilisateur :</b> {this.state.selectedUser.cuti} — {this.state.selectedUser.lastName} {this.state.selectedUser.firstName}
                </div>
              )}

              <Tabs
                value={this.state.dialogTab}
                onChange={this.onChangeTab}
                indicatorColor="primary"
                textColor="primary"
              >
                <Tab label="Profils" />
                <Tab label="Droits" />
              </Tabs>

              <div style={{ marginTop: 16 }}>
                {/* ===== TAB PROFILS ===== */}
                {this.state.dialogTab === 0 && this.state.selectedUser && (() => {
                  const cutiSel = this.state.selectedUser.cuti;
                  const l = this.state.profilesLoadingByUser[cutiSel];
                  const e = this.state.profilesErrorByUser[cutiSel];
                  const p = this.state.profilesByUser[cutiSel];

                  if (l) return <div><Spinner size="sm" /> Chargement...</div>;
                  if (e) return <Alert color="danger">{e}</Alert>;
                  return this.renderProfilesPretty(p);
                })()}

                {/* ===== TAB DROITS ===== */}
                {this.state.dialogTab === 1 && this.state.selectedUser && (() => {
                  const cutiSel = this.state.selectedUser.cuti;
                  const l = this.state.rightsLoadingByUser[cutiSel];
                  const e = this.state.rightsErrorByUser[cutiSel];
                  const r = this.state.rightsByUser[cutiSel];

                  if (l) return <div><Spinner size="sm" /> Chargement...</div>;
                  if (e) return <Alert color="danger">{e}</Alert>;
                  return this.renderRightsPretty(r);
                })()}
              </div>
            </DialogContent>

            <DialogActions>
              <Button color="secondary" onClick={this.closeProfileDialog}>
                Fermer
              </Button>
            </DialogActions>
          </Dialog>
        </>
      );
    }

    return null;
  }
}

const mapStateToProps = state => ({
  roles: state.userInfo.user.roles
});

export default connect(mapStateToProps)(EventRow);
