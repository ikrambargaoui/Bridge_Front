import React, { Component, Fragment } from 'react';
import { } from './example.scss';
import { } from './lib/styles.css';
import axios from 'axios';

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
import GestionDelegation from './GestionDelegation';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
const URL = require('../../Config/Config').Url;







class EventRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nom_complet: '',


      //param : event.delegueId,
    };
  }
  submit = (id) => {

    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <Card className="main-card mb-3">
            <CardHeader><h2></h2></CardHeader>
            <CardBody>
              <div className='custom-ui'>


                <p><strong>Êtes-vous sûr de vouloir supprimer cette délégation ?</strong></p>
                <div align="right">
                  <Button color="success" onClick={() => { this.DeleteDelegation(id); onClose(); }}>Confirmer</Button>&nbsp;
                  <Button color="danger" onClick={onClose}>Annuler</Button>
                </div>
              </div>
            </CardBody>
          </Card>
        );
      }
    });
  };




  /* confirmAlert({
    customUI: ({ onClose }) => {
      return (
        <div className='custom-ui'>
          <h1>Are you sure?</h1>
          <p>You want to delete this file?</p>
          <button onClick={onClose}>No</button>
          <button
            onClick={() => {
              this.handleClickDelete();
              onClose();
            }}
          >
            Yes, Delete it!
          </button>
        </div>
      );
    }
  }); */



  DeleteDelegation = (param) => {
    // this.setState({ open: false });
    const token = localStorage.getItem('jwtToken');
    var headers = {
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + token,
      'Access-Control-Allow-Origin': '*'
    }

    console.log("l'id est " + param)
    axios.get(URL + '/Bridge/Delegations/DeleteDelegation/' + param, { headers: headers })
      .then(function (response) {
        /*   let documents=this.props.documents.filter((post) => {
          return event.delegationId!==post.param;
         }
         ); */

        console.log(response);
      })
  };



  componentDidMount() {

    const token = localStorage.getItem('jwtToken');
    var headers = {
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + token
    }
    axios.get(URL + '/Bridge/Delegations/GetUserName/' + this.props.event.delegueId, { headers: headers })
      .then((response) => {

        this.setState({
          nom_complet: response.data


        });
        console.log(response.data);
      })
      .catch((error) => {
        alert(error)
      })
  }


  render() {
    const { classes } = this.props;
    const event = this.props.event;
    const nom_complet = this.state.nom_complet;
    return (
      <tr key={event.delegationId}>


        <td className="cell" >{new Date(event.dateDebDelegation).toLocaleDateString()}</td>
        <td className="cell" >{new Date(event.dateFinDelegation).toLocaleDateString()}</td>
        <td className="cell" >{nom_complet}</td>

        <td className="cell" >
          {/*  <Button color="danger" size="sm" onClick={() => this.DeleteDelegation(event.delegationId)}><i  className="fa fa-trash"></i></Button> */}
          <Button color="danger" size="sm" onClick={() => this.submit(event.delegationId)}><i className="fa fa-trash"></i></Button>


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
      if (event.delegueId.toString().toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
        /*  &&(event.delegueId.toString().toLowerCase().indexOf(filterText.toLowerCase()) === -1) ) */
        return;
      }
      rows.push(<EventRow event={event} key={event.delegationId} />);
      lastCategory = event.delegationId;
    });
    return (
      <table className="table -striped -highlight">
        <thead>
          <TableFilter
            rows={documents}
            onFilterUpdate={this._filterUpdated}>

            <th key="dateDebDelegation" filterkey="dateDebDelegation" className="cell" >
              Date de début de délégation
            </th><th key="dateFinDelegation" filterkey="dateFinDelegation" className="cell" >
              Date de fin de délégation
            </th><th key="delegueId" filterkey="delegueId" className="cell" >
              Délégué                 </th>
            <th key="action" className="cell">
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
              <Input type="text" placeholder="Rechercher une délégation..." value={this.props.filterText} onChange={this.handleFilterTextChange} />
            </InputGroup>
          </Col>
        </FormGroup>
      </Form>

    );
  }
}


export default class FilterableEventTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: '',
      documents: [], matricule: '',
      informations: [],
      param: '',
      nom: '',
      visibile: false,

    };
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
  }
  handleFilterTextChange(filterText) {
    this.setState({
      filterText: filterText
    });
  }





  componentDidMount() {

    const token = localStorage.getItem('jwtToken');
    var headers = {
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + token
    }
    axios.get(URL + '/Bridge/Delegations/DelegationsOut', { headers: headers })
      .then((response) => {

        this.setState({
          documents: response.data

        });
        console.log(response.data);
      })
      .catch((error) => {
        alert(error)
      })
  }
  render() {
    return (


      <div>
        {/* <Col md="12">
           <Card className="main-card mb-3">
           <CardBody> */}
        <GestionDelegation events={this.state.nom} ></GestionDelegation>

        <Card>

          <CardHeader><strong>Mes délégations éfféctuées</strong></CardHeader>

          <CardBody>

            <SearchBar filterText={this.state.filterText} onFilterTextChange={this.handleFilterTextChange} />
            <EventTable events={this.state.documents} filterText={this.state.filterText} />
            {/* </CardBody>
        </Card>
        </Col> */}

          </CardBody>
        </Card>



      </div>


    );
  }
}
