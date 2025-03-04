import React, { Component, Fragment } from 'react';
import { } from './example.scss';
import { } from './lib/styles.css';
import axios from 'axios';
import { } from './example.scss';
import { } from './lib/styles.css';
import TableFilter from 'react-table-filter';
import { Link } from 'react-router-dom';
const URL = require('../../Config/Config').Url;

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



class EventRow extends React.Component {

  constructor(props) {
    super(props);
    this.postMethod = this.postMethod.bind(this);
    this.deleteRow = this.deleteRow.bind(this);
    this.getAssociee = this.getAssociee.bind(this);



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
  getAssociee(param) {
    if (param.associee === 'O') {
      return <Button color="danger" onClick={() => this.deleteRow(param.id)} size="sm"><i className="fa fa-trash"></i></Button>;
    } else {
      return <Button color="info" onClick={() => this.postMethod(param.id)} size="sm" className="mr-2"><i className="fa fa-plus"></i></Button>;

    }
  }
  render() {
    const event = this.props.event;


    return (
      <tr key={event.id}>
        <td className="cell" >{event.libelleStructure}</td>
        <td className="cell" >{this.getAssociee(event)}</td>


      </tr>
    );
  }
}



class EventTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      agence: this.props.events,
    };
    this._filterUpdated = this._filterUpdated.bind(this);
  }

  _filterUpdated(newData) {
    this.setState({
      agences: newData,
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
      rows.push(<EventRow event={event} matricule={this.props.matricule} key={event.id} />);
      lastCategory = event.id;
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
      structures: [],
      totalstructures: [],
      total: [],
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
      this.state.total = [];
      var headers = {
        'Content-Type': 'application/json',
        'Authorization': "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJiaDAwMzQ0NSIsImlhdCI6MTU0OTM3MTE5NSwiY29kZSI6ImJoMDAzNDQ1Iiwicm9sZXMiOlt7ImF1dGhvcml0eSI6IlJPTEVfVVNFUiJ9LHsiYXV0aG9yaXR5IjoiUk9MRV9CVVNTSU5FU1NfVU5JVF9NQU5BR0VSIn1dfQ.TsaMOct4GApSlg7bEfTFQCGQG273P8g55Lfk2LJa1CI"

      }
      axios.get(URL + '/Bridge/User/GetUserInformationByCuti/' + this.state.matricule, { headers: headers })
        .then((response) => {
          this.setState({
            nom: response.data[0].lib
          });

        })
        .catch((error) => {
          alert(error)
        })
      this.state.visibile = false;
      axios.get(URL + '/Bridge/Structure/findStructureByUserCode/' + this.state.matricule, { headers: headers })
        .then((response) => {

          this.setState({
            structures: response.data

          });
          this.state.structures.forEach((event) => {
            this.state.total.push({ id: event.id, codeStructure: event.codeStructure, libelleStructure: event.libelleStructure, associee: 'O' });
          });
        })
        .catch((error) => {
          alert(error)
        })

      axios.get(URL + '/Bridge/Structure/findStructure', { headers: headers })
        .then((response) => {

          this.setState({
            totalstructures: response.data

          });
          this.state.totalstructures.forEach((event) => {
            if (this.state.total.indexOf(event.codeStructure) === -1) {
              this.state.total.push({ id: event.id, codeStructure: event.codeStructure, libelleStructure: event.libelleStructure, associee: 'N' });

            }
          });

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
                <EventTable events={this.state.total} matricule={this.state.matricule} filterText={this.state.filterText} />
              </CardBody>
            </Card>
          </Col>

        </Row>
      </Fragment>

    );
  }
}
