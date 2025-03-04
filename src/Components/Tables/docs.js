import React, { Component, Fragment } from 'react';
import { } from './example.scss';
import { } from './lib/styles.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SortableTbl from './SortableTbl';
import { } from './example.scss';
import { } from './lib/styles.css';
import TableFilter from 'react-table-filter';
import {
  Pagination, PaginationItem, PaginationLink,
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

class BaseDocumentsDeleteComponent extends React.Component {
  constructor(props) {
    super(props);
    this.deleteItem = this.deleteItem.bind(this);
  }
  deleteItem() {
    alert("delete " + this.props.rowData.name);
    console.log(this.props.rowData, this.props.tdData);
  }
  render() {
    return (
      <td >
        <input type="button" className="btn btn-danger" value="Delete" onClick={this.deleteItem} />
      </td>
    );
  }
}

BaseDocumentsDeleteComponent.propTypes = {
  rowData: React.PropTypes.object,
  tdData: React.PropTypes.string,
};

class BaseDocumentsEditComponent extends React.Component {
  constructor(props) {
    super(props);
    this.editItem = this.editItem.bind(this);
  }
  editItem() {
    alert("edit " + this.props.rowData.name);
    console.log(this.props.rowData, this.props.tdData);
  }
  render() {
    return (
      <td >
        <input type="button" className="btn btn-warning" value="Edit" onClick={this.editItem} />
      </td>
    );
  }
}
BaseDocumentsEditComponent.propTypes = {
  rowData: React.PropTypes.object,
  tdData: React.PropTypes.string,
};



export default class docs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: '',
      documents: []
    };
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
  }
  handleFilterTextChange(filterText) {
    this.setState({
      filterText: filterText
    });
  }
  componentWillMount() {

    const token = localStorage.getItem('jwtToken');
    var headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJiaDAwMzQ0NSIsImlhdCI6MTU1MzE1NzA0NiwiY29kZSI6ImJoMDAzNDQ1Iiwicm9sZXMiOlt7ImF1dGhvcml0eSI6IlJPTEVfVEZKTyJ9XX0.HjTktyX-nofLMfAqc0IEdgilYXBYFxPS1OpebjQH81c'
    }
    axios.get(URL + '/Bridge/Documents/documentsByProfile', { headers: headers })
      .then((response) => {

        this.setState({
          'documents': response.data

        });
      })
      .catch((error) => {
        alert(error)
      })
  }
  render() {
    let col = [
      "id",
      "typeDocument",
      "clientAgency",
      "accountBranch",
      "editionAgency",
      "accountNumber",
      "accountKey",
      "accountDev",
      "clientCode",
      "clientType",
      "postClientCode",
      "accountingsSection",
      "operationCode",

      "editionDate"
    ];
    let tHead = [
      "Image",
      "Model",
      "Brand",
      "Type",
      "Channel",
      "Remote",
      "Backup",
      "HDD",
      "Video output",
      "Delete",
      "Edit",

    ];
    return (<Row>
      <Col md="12">
        <Card className="main-card mb-3">
          <CardBody>
            <SortableTbl tblData={this.state.documents}
              tHead={tHead} dKey={col}
            /> </CardBody>
        </Card>
      </Col>
    </Row>
    );
  }
}


