import React, { Component, Fragment } from 'react';
import { } from './example.scss';
import { } from './lib/styles.css';
import axios from 'axios';
import { } from './example.scss';
import { } from './lib/styles.css';
import TableFilter from 'react-table-filter';
import { Link } from 'react-router-dom';

import {
  Nav, NavItem,
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
  NavLink
} from 'reactstrap';
const URL = require('../../Config/Config').Url;

class StructureRow extends React.Component {

  constructor(props) {
    super(props);

    this.postMethod = this.postMethod.bind(this);

  }
  postMethod(param) {
    var headers = {
      'Content-Type': 'application/json',
      'Authorization': "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJiaDAwMzQ0NSIsImlhdCI6MTU0OTM3MTE5NSwiY29kZSI6ImJoMDAzNDQ1Iiwicm9sZXMiOlt7ImF1dGhvcml0eSI6IlJPTEVfVVNFUiJ9LHsiYXV0aG9yaXR5IjoiUk9MRV9CVVNTSU5FU1NfVU5JVF9NQU5BR0VSIn1dfQ.TsaMOct4GApSlg7bEfTFQCGQG273P8g55Lfk2LJa1CI",
      'Access-Control-Allow-Origin': '*'
    }
    axios.post(URL + '/Bridge/Structure/addStructureUser', {
      idUser: this.props.matricule,
      idStructure: param
    }, { headers: headers })
      .then(function (response) {
        console.log(response);

      })
      .catch(function (error) {
        console.log(error);
      });
  }
  render() {
    const event = this.props.event;


    return (
      <tr key={event.id}>
        <td className="cell" >{event.libelleStructure}</td>
        <td>
          <Button color="info" onClick={() => this.postMethod(event.id)} size="sm" className="mr-2"><i className="fa fa-plus"></i></Button>


        </td>

      </tr>
    );
  }
}

class EventRow extends React.Component {

  constructor(props) {
    super(props);
    this.deleteRow = this.deleteRow.bind(this);


  }
  deleteRow(param) {

    var headers = {
      'Content-Type': 'application/json',
      'Authorization': "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJiaDAwMzQ0NSIsImlhdCI6MTU0OTM3MTE5NSwiY29kZSI6ImJoMDAzNDQ1Iiwicm9sZXMiOlt7ImF1dGhvcml0eSI6IlJPTEVfVVNFUiJ9LHsiYXV0aG9yaXR5IjoiUk9MRV9CVVNTSU5FU1NfVU5JVF9NQU5BR0VSIn1dfQ.TsaMOct4GApSlg7bEfTFQCGQG273P8g55Lfk2LJa1CI",
      'Access-Control-Allow-Origin': '*'
    }
    axios.get(URL + '/Bridge/Structure/deleteStructure/' + param + '/' + this.props.matricule, { headers: headers })
      .then((response) => {

        console.log(param);


      })
      .catch((error) => {
        alert(error)
      })
  }
  render() {
    const event = this.props.event;


    return (
      <tr key={event.id}>
        <td className="cell" >{event.libelleStructure}</td>
        <td>

          <Button color="danger" onClick={() => this.deleteRow(event.id)} size="sm"><i className="fa fa-trash"></i></Button>

        </td>

      </tr>
    );
  }
}

class StructureTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'agences': this.props.events,
    };
    this._filterUpdated = this._filterUpdated.bind(this);
  }

  _filterUpdated(newData) {
    this.setState({
      'agences': newData,
    });
  }
  render() {
    const filterText = this.props.filterText;
    const agences = this.props.events;
    const rows = [];
    let lastCategory = null;
    agences.forEach((event) => {
      if ((event.codeStructure.toString().toLowerCase().indexOf(filterText.toLowerCase()) === -1) && (event.libelleStructure.toString().toLowerCase().indexOf(filterText.toLowerCase()) === -1)) {
        return;
      }
      rows.push(<StructureRow event={event} matricule={this.props.matricule} key={event.codeStructure} />);
      lastCategory = event.codeStructure;
    });
    return (
      <table className="table -striped -highlight">
        <thead>

          <th key="libelleStructure" filterkey="libelleStructure" className="cell">
            Libellé Structure
          </th>

          <th className="cell">
            Action
          </th>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>


    );
  }
}

class EventTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'agences': this.props.events,
    };
    this._filterUpdated = this._filterUpdated.bind(this);
  }

  _filterUpdated(newData) {
    this.setState({
      'agences': newData,
    });
  }
  render() {
    const filterText = this.props.filterText;
    const agences = this.props.events;
    const rows = [];
    let lastCategory = null;
    agences.forEach((event) => {
      if ((event.codeStructure.toString().toLowerCase().indexOf(filterText.toLowerCase()) === -1) && (event.libelleStructure.toString().toLowerCase().indexOf(filterText.toLowerCase()) === -1)) {
        return;
      }
      rows.push(<EventRow event={event} matricule={this.props.matricule} key={event.codeStructure} />);
      lastCategory = event.codeStructure;
    });
    return (
      <table className="table -striped -highlight">
        <thead>
          <th key="libelleStructure" filterkey="libelleStructure" className="cell">
            Libellé Structure
          </th>

          <th className="cell">
            Action
          </th>
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
                <Button type="button" color="primary"><i className="fa fa-search"></i> Search</Button>
              </InputGroupAddon>
              <Input type="text" placeholder="Search Event..." value={this.props.filterText} onChange={this.handleFilterTextChange} />
            </InputGroup>
          </Col>
        </FormGroup>
      </Form>

    );
  }
}


export default class GestionStructure extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: '',
      'structures': [],
      'totalstructures': [],

      matricule: '',
      visibile: true,
      nom: '',

    };

    this.getClientCredential = this.getClientCredential.bind(this);
    this.onChange = this.onChange.bind(this);

    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
  }
  handleFilterTextChange(filterText) {
    this.setState({
      filterText: filterText
    });
  }


  getClientCredential() {
    if (this.state.matricule) {


      var headers = {
        'Content-Type': 'application/json',
        'Authorization': "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJiaDAwMzQ0NSIsImlhdCI6MTU0OTM3MTE5NSwiY29kZSI6ImJoMDAzNDQ1Iiwicm9sZXMiOlt7ImF1dGhvcml0eSI6IlJPTEVfVVNFUiJ9LHsiYXV0aG9yaXR5IjoiUk9MRV9CVVNTSU5FU1NfVU5JVF9NQU5BR0VSIn1dfQ.TsaMOct4GApSlg7bEfTFQCGQG273P8g55Lfk2LJa1CI"

      }
      axios.get(URL + '/Bridge/User/GetUserInformationByCuti/' + this.state.matricule, { headers: headers })
        .then((response) => {
          this.setState({
            nom: response.data[0].lib
          });
          console.log(response.data[0].lib);

        })
        .catch((error) => {
          alert(error)
        })
      this.state.visibile = false;

      axios.get(URL + '/Bridge/Habilitations/GetEtatHabilitation', { headers: headers })
        .then((response) => {

          this.setState({
            totaletats: response.data

          });
          console.log(response.data);


        })
        .catch((error) => {
          alert(error)
        })
      axios.get(URL + '/Bridge/Habilitations/GetEtatHabilitationByCuti/' + this.state.matricule, { headers: headers })
        .then((response) => {

          this.setState({
            etats: response.data

          });
          console.log(response.data);


        })
        .catch((error) => {
          alert(error)
        })

    }

  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {

    return (
      <Fragment>
        <Row>
          <Col md="12">
            <Card className="main-card mb-2">
              <CardBody>
                <Form>
                  <FormGroup>
                    <Label for="matricule">Matricule</Label>
                    <Input type="text" name="matricule" id="matricule"
                      placeholder="matricule" onChange={this.onChange} />
                  </FormGroup>
                  <Button color="primary" className="mt-1" onClick={this.getClientCredential} >Submit</Button>

                  <FormGroup hidden={this.state.visibile}>
                    <Label for="nom">Nom et Prénom    </Label> <h1></h1>
                    <Label for="nom">{this.state.nom}</Label>
                  </FormGroup>
                </Form>
              </CardBody>
            </Card>
          </Col>

        </Row>
        <Row hidden={this.state.visibile}>
          <Col md="12">
            <Card className="main-card mb-2">
              <CardBody>
                <SearchBar filterText={this.state.filterText} onFilterTextChange={this.handleFilterTextChange} />
                <EventTable events={this.state.structures} matricule={this.state.matricule} filterText={this.state.filterText} />
                <StructureTable events={this.state.totalstructures} matricule={this.state.matricule} filterText={this.state.filterText} />
              </CardBody>
            </Card>
          </Col>

        </Row>
      </Fragment>

    );
  }
}
