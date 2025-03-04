import React, { Component, Fragment } from 'react';
import { } from './example.scss';
import { } from './lib/styles.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import { } from './example.scss';
import { } from './lib/styles.css';
import TableFilter from 'react-table-filter';
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
import { Editor } from 'primereact/editor';
import { withStyles } from '@material-ui/core/styles';
/*Dialog*/

const URL = require('../../Config/Config').Url;

// checkboxlist
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import CommentIcon from '@material-ui/icons/Comment';



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
/*************************************** */

class EventRow extends React.Component {
  constructor() {
    super();
    // this.deleteRow = this.deleteRow.bind(this);

    this.onChange = this.onChange.bind(this);
  }
  state = {
    open: false,
    // documents:[],
    mails: [],
    subject: '',
    content: '',
    param: '',
    checked: [],
  };

  handleClickOpen = (param) => {
    var headers = {
      'Content-Type': 'application/json',
      'Authorization': "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJiaDAwMzAwNSIsImlhdCI6MTU1MTY4OTQ4NCwiY29kZSI6ImJoMDAzMDA1Iiwicm9sZXMiOlt7ImF1dGhvcml0eSI6IlJPTEVfVVNFUiJ9LHsiYXV0aG9yaXR5IjoiUk9MRV9DTElFTlRfTUFOQUdFUiJ9XX0.DRaDrSejUiMSBf3eHLdhy8sig2ZW1LScNfEmxkfjEFg"
    }
    this.setState({
      open: true,
      param: param,
    });
    //console.log(param); 
    axios.get(URL + '/Bridge/Mails/listMails/' + param, { headers: headers })
      .then(res => {
        this.setState({ mails: res.data });
        // console.log(res.data);
        // console.log(this.state.mails);
      });
    //console.log(mails);  
  };

  handleClose = () => {
    this.setState({ open: false });
    this.setState({ checked: [] });
    //window.location.reload();

  };

  sendMail = (param, param1, param2, param3) => {
    this.setState({ open: false });
    var headers = {
      'Content-Type': 'application/json',
      'Authorization': "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJiaDAwMzAwNSIsImlhdCI6MTU1MTY4OTQ4NCwiY29kZSI6ImJoMDAzMDA1Iiwicm9sZXMiOlt7ImF1dGhvcml0eSI6IlJPTEVfVVNFUiJ9LHsiYXV0aG9yaXR5IjoiUk9MRV9DTElFTlRfTUFOQUdFUiJ9XX0.DRaDrSejUiMSBf3eHLdhy8sig2ZW1LScNfEmxkfjEFg",
      'Access-Control-Allow-Origin': '*'
    }

    console.log({
      subject: param1,
      content: param2,
      listmail: param3,
    });

    axios.post(URL + '/Bridge/Mails/envoiMail/' + param, {
      subject: param1,
      messageBody: param2,
      listmail: param3,
    }, { headers: headers })
      .then(function (response) {
        console.log(response);

      })
    this.setState({ checked: [] });
  };

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    //console.log(e.target.value); 
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
    //console.log(newChecked);

    this.setState({
      checked: newChecked,
    });
  };
  render() {
    const { classes } = this.props;
    const event = this.props.event;

    return (

      <tr key={event.key}>
        <td className="cell" >{event.typeDocument}</td>
        <td className="cell" >{event.accountBranch}</td>
        <td className="cell" >{event.accountNumber}</td>
        <td className="cell" >{event.accountKey}</td>
        <td className="cell" >{new Date(event.accountingDate).toLocaleDateString()}</td>
        <td className="cell" >
          {/* <Button color="success" size="sm" className="mr-2"><i className="fa fa-eye"></i></Button> */}
          <Link to={`/DocumentView/${event.pathFileOut}`}  ><Button color="success" size="sm" className="mr-2"><i className="fa fa-eye"></i></Button> </Link>

          <Button size="sm" className="mr-2"><i className="fa fa-download"></i></Button>
          <Button color="info" size="sm" className="mr-2" onClick={() => this.handleClickOpen(event.key)} ><i className="fa fa-envelope"></i></Button>
          <Dialog
            onClose={this.handleClose}
            aria-labelledby="customized-dialog-title"
            open={this.state.open}
          >
            <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
              Envoi d'un document...
            </DialogTitle>
            <DialogContent>
              <div class="container">
                <div class="panel panel-default">
                  <div class="panel-heading">
                    <h4 class="panel-title">
                      Êtes-vous sûr de vouloir envoyer le document au client ?
                    </h4>
                    <h5 class="panel-title">
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
              <TextField autoFocus margin="dense" id="subject" name="subject" value={this.state.subject} label="Objet" type="text" fullWidth onChange={this.onChange} />
              <div className="content-section implementation">
                <h5 className="first">Message</h5>

                <Editor style={{ height: '200px' }} id="content" htmlValue={this.state.content} onTextChange={(e) => this.setState({ content: e.htmlValue })} type="text" />
              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => this.sendMail(this.state.param, this.state.subject, this.state.content, this.state.checked)} label="Message" color="success" > Envoyer </Button>
              <Button onClick={this.handleClose} color="primary">Annuler </Button>
            </DialogActions>
          </Dialog>

          <Button color="danger" size="sm"><i className="fa fa-trash"></i></Button>

        </td>

      </tr>
    );
  }
}

class EventTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      documents: this.props.events,
    };
    this._filterUpdated = this._filterUpdated.bind(this);
  }

  _filterUpdated(newData) {
    this.setState({
      documents: newData,
    });
  }
  render() {
    const filterText = this.props.filterText;
    const documents = this.props.events;
    const rows = [];
    let lastCategory = null;
    documents.forEach((event) => {
      if ((event.id.toString().toLowerCase().indexOf(filterText.toLowerCase()) === -1) && (event.typeDocument.toString().toLowerCase().indexOf(filterText.toLowerCase()) === -1)) {
        return;
      }
      rows.push(<EventRow event={event} key={event.id} />);
      lastCategory = event.id;
    });
    return (
      <table className="table -striped -highlight">
        <thead>
          <TableFilter
            rows={documents}
            onFilterUpdate={this._filterUpdated}>
            <th key="typeDocument" filterkey="typeDocument" className="cell" showsearch="true">
              Type Document
            </th>
            <th key="accountBranch" filterkey="accountBranch" className="cell">
              Agence Compte
            </th>
            <th key="accountNumber" filterkey="accountNumber" className="cell">
              Numero Compte
            </th>
            <th key="accountKey" filterkey="accountKey" className="cell">
              Clé Compte
            </th>
            <th key="accountingDate" filterkey="accountingDate" className="cell">
              Date Comptable
            </th>
            <th key="cell" className="cell">
              Action
            </th>
          </TableFilter>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>


    );
  }
}

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);

  }

  handleFilterTextChange(e) {
    this.props.onFilterTextChange(e.target.value);
  }
  render() {
    return (
      <Form action="" method="post" className="form-horizontal">
        <FormGroup row>
          <Col md="12">
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <Button type="button" color="primary"><i className="fa fa-search"></i> Rechercher</Button>
              </InputGroupAddon>
              <Input type="text" placeholder="Rechercher un document" value={this.props.filterText} onChange={this.handleFilterTextChange} />
            </InputGroup>
          </Col>
        </FormGroup>
      </Form>

    );
  }
}


export default class rechercheAvancee extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: '',
      documents: [],
      visibile: true,
      codeAgency: '',
      accountNumber: '',
      accountKey: '',
      accountDev: '',
      devises: [],
      dev: []
    };
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.getDocument = this.getDocument.bind(this);
    this.onChange = this.onChange.bind(this);

  }
  componentWillMount() {

    const token = localStorage.getItem('jwtToken');
    var headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJiaDAwMzQ0NSIsImlhdCI6MTU1MzE1NzA0NiwiY29kZSI6ImJoMDAzNDQ1Iiwicm9sZXMiOlt7ImF1dGhvcml0eSI6IlJPTEVfVEZKTyJ9XX0.HjTktyX-nofLMfAqc0IEdgilYXBYFxPS1OpebjQH81c'
    }
    axios.get(URL + '/Bridge/Bknom/getDevises', { headers: headers })
      .then((response) => {

        this.setState({
          devises: response.data

        });
        console.log(this.state.devises[0]);
        console.log(this.state.devises.length);

        /*   for(var i=0; i< this.state.devises.length; i++ ){
            this.state.dev.push({  label:  this.state.devises[i], value:i});
  
          } */

        console.log("dev 1: ", this.state.dev);

        for (var i in this.state.devises) {
          this.setState({ dev: this.state.dev.concat([{ label: this.state.devises[i], value: parseInt(i) + 1 }]) });
        }
        // console.log("dev 2: ",this.state.dev);
      })
      .catch((error) => {
        alert(error)
      })
  }
  handleFilterTextChange(filterText) {
    this.setState({
      filterText: filterText
    });
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  getDocument() {
    const token = localStorage.getItem('jwtToken');
    var headers = {
      'Content-Type': 'application/json',
      'Authorization':
        'Bearer  eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJiaDAwMzQ0NSIsImlhdCI6MTU1MzE1NzA0NiwiY29kZSI6ImJoMDAzNDQ1Iiwicm9sZXMiOlt7ImF1dGhvcml0eSI6IlJPTEVfVEZKTyJ9XX0.HjTktyX-nofLMfAqc0IEdgilYXBYFxPS1OpebjQH81c'
    }

    axios.post(URL + '/Bridge/Documents/DocumentByKeyWords', {
      codeAgency: this.state.codeAgency,
      accountNumber: this.state.accountNumber,
      accountKey: this.state.accountKey,
      accountDev: this.state.accountDev,
    }, { headers: headers })
      .then((response) => {

        this.setState({
          documents: response.data

        });
      })
      .catch((error) => {
        alert(error)
      })

    this.setState({
      visibile: false

    });

  }

  render() {
    if (!this.state.dev) return <div>Chargement......</div>
    else {

      return (
        <Fragment> <Row>
          <Col md="12">
            <Form className="form-horizontal">

              <Card className="main-card mb-3">

                <CardHeader>
                  Recherche
                </CardHeader>
                <CardBody>
                  <FormGroup col="true">
                    <Row>
                      <Col xs="md-3">
                        <FormGroup>
                          <Label htmlFor="name">Numéro de Compte  <span className="ml-auto font-weight-bold"></span> <span style={{ color: 'red' }} >*</span></Label>
                          <Input type="text" name="accountNumber" id="accountNumber" onChange={this.onChange} placeholder="Numéro de Compte" required />
                        </FormGroup>
                      </Col>
                      <Col xs="md-3">
                        <FormGroup>
                          <Label htmlFor="name">Code Agence  <span className="ml-auto font-weight-bold"></span><span style={{ color: 'red' }} >*</span></Label>
                          <Input type="number" name="codeAgency" id="codeAgency" onChange={this.onChange} placeholder="Code Agence" required />
                        </FormGroup>
                      </Col>   <Col xs="md-3">
                        <FormGroup>
                          <Label htmlFor="name">Clé de Compte </Label>
                          <Input type="text" name="accountKey" id="accountKey" onChange={this.onChange} placeholder="Clé de Compte" />
                        </FormGroup>
                      </Col>   <Col xs="md-3">
                        <FormGroup>
                          <Label htmlFor="name">Devise Compte  </Label>
                          {/* <Input  type="text" name="accountDev" id="accountDev" onChange={this.onChange}       placeholder="Devise Compte"     /> */}
                          <Dropdown options={this.state.dev} onChange={e => this.setState({ accountDev: e.label })} value={this.state.dev[7]} placeholder="Select an option" />

                        </FormGroup>
                      </Col>

                    </Row>

                  </FormGroup>



                </CardBody>
                <CardFooter>

                  <Button size="sm" color="success" onClick={this.getDocument} className="float-right"><i className="fa fa-search"></i> Recherche</Button>
                </CardFooter>

              </Card>
            </Form>

          </Col>

          <Col md="12" hidden={this.state.visibile}>
            <Card className="main-card mb-3">
              <CardBody>
                <SearchBar filterText={this.state.filterText} onFilterTextChange={this.handleFilterTextChange} />

                <EventTable events={this.state.documents} filterText={this.state.filterText} />

              </CardBody>
            </Card>
          </Col>
        </Row>
        </Fragment>
      );
    }
  }
}


