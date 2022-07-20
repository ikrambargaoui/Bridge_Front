

import React, { Component, Fragment } from 'react';
import axios from 'axios';
import Dropdown from 'react-dropdown'
import { connect } from 'react-redux'
import { findDocByKeyWords } from '../../Services/docsServices'
import { findDevise } from '../../Services/docsServices'


import 'react-dropdown/style.css'
import { } from '../../scss/example.scss';
import { } from '../../scss/lib/styles.css';
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Form,
  FormGroup,
  Input,
  Alert,
  Label,
  Row,
  Button,
} from 'reactstrap';
import '../Common/pagination.scss'
import { getUser } from '../../Store/Actions/userActions'
import { getDocsOfUser } from '../../Store/Actions/GetDocs'
import { getColumns } from '../../Store/Actions/columnConfig'
import { } from '../Tables/example.scss';
import { } from '../Tables/lib/styles.css';
import SearchTable from '../Common/table'


class RechercheAvancee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: '',
      documents: [],
      visibile1: true,
      visibile2: true,

      codeAgency: '',
      accountNumber: '',
      accountKey: '',
      accountDev: '',
      accountingDate: '',
      clientCode: '',
      typeDocument: '',
      devises: [],
      dev: [],
      message: ''
    };

    this.onChange = this.onChange.bind(this);

  }
  componentDidMount() {
    this.props.getDocsOfUser()
    this.props.getColumns()
  }
  componentWillMount() {


    findDevise()
      .then((response) => {

        this.setState({
          devises: response

        });
        for (var i in this.state.devises) {
          this.setState({ dev: this.state.dev.concat([{ label: this.state.devises[i], value: parseInt(i) + 1 }]) });
        }
      })
      .catch((error) => {
        alert(error)
      })
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }


  getDocumentByKeyWords = () => {


    if (this.state.accountNumber == '' && this.state.codeAgency == '' && this.state.accountKey === '') {
      this.setState({
        message: "Vous devez spécifier le numéro de compte et le code agence ou la Référence de l'opération!",
        visibile2: false,
        visibile1: true,
        accountDev: '',
      });
    }
    else if (this.state.accountNumber !== '' && this.state.codeAgency == '' && this.state.accountKey === '') {
      this.setState({
        message: "Vous devez spécifier le numéro de compte et le code agence",
        visibile2: false,
        visibile1: true,
        accountDev: '',
      });
    }

    else {
      let request = {
        codeAgency: this.state.codeAgency,
        accountNumber: this.state.accountNumber,
        chapitreComptable: this.state.accountKey,
        //accountKey: this.state.accountKey,
        accountDev: this.state.accountDev,
        typeDocument: this.state.typeDocument,
        accountingDate: this.state.accountingDate,
        clientCode: this.state.clientCode,
      }
      console.log('request', request)
      findDocByKeyWords(request)
        .then((response) => {

          this.setState({
            documents: response,
            visibile1: false,
            visibile2: true,
            accountDev: '',

          });
        })
        .catch((error) => {
          alert(error)
        })
    }

  }



  // getDocumentByKeyWords = () => {


  //   if (this.state.typeDocument === '' && this.state.accountingDate === '' && this.state.clientCode === '' && this.state.accountNumber === '' && this.state.codeAgency === ''  ) {
  //     this.setState({
  //       message: "Vous devez spécifier le numéro de compte et le code agence ou le type document ou la date comptable ou le client code !",
  //       visibile2: false,
  //       visibile1: true,
  //       accountDev: '',
  //     });
  //   }
  //   else if (this.state.accountNumber !== '' && this.state.codeAgency == '' && this.state.typeDocument == '' && this.state.accountingDate == '' && this.state.clientCode == '') {
  //     this.setState({
  //       message: "Vous devez spécifier le code agence ou le type document ou la date comptable ou le client code !",
  //       visibile2: false,
  //       visibile1: true,
  //       accountDev: '',
  //     });
  //   }
  //   else if (this.state.accountNumber == '' && this.state.codeAgency != '' && this.state.typeDocument == '' && this.state.accountingDate == '' && this.state.clientCode == '') {
  //     this.setState({
  //       message: "Vous devez spécifier le numéro de compte  ou le type document ou la date comptable ou le client code !",
  //       visibile2: false,
  //       visibile1: true,
  //       accountDev: '',
  //     });
  //   }

  //   else if ((this.state.accountNumber !== '' && this.state.codeAgency !== '')|| (this.state.typeDocument !== '' || this.state.accountingDate !== '' || this.state.clientCode !== '') ){
  //  findDocByKeyWords({
  //   codeAgency: this.state.codeAgency,
  //   accountNumber: this.state.accountNumber,
  //   // Chapitrecomptable: this.state.accountKey,
  //   accountKey: this.state.accountKey,
  //   accountDev: this.state.accountDev,
  //   typeDocument: this.state.typeDocument,
  //   accountingDate: this.state.accountingDate,
  //   clientCode: this.state.clientCode,
  // })
  //   .then((response) => {

  //     this.setState({
  //       documents: response,
  //       visibile1: false,
  //       visibile2: true,
  //       accountDev: '',

  //     });
  //   })
  //   .catch((error) => {
  //     alert(error)
  //   })
  //   } 

  // }

  render() {
    if (!this.state.dev) return <div>Loading......</div>
    else {
      const name = "AdvancedSearch";
      const displayName = "Consulter vos documents...";
      const icon = "fa fa-folder-open";
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
                          <Label htmlFor="name">Référence Opération </Label>
                          <Input type="text" name="accountKey" id="accountKey" onChange={this.onChange} placeholder="Référence Opération" />
                        </FormGroup>
                      </Col>   <Col xs="md-3">
                        <FormGroup>
                          <Label htmlFor="name">Devise Compte  </Label>
                          {/* <Input  type="text" name="accountDev" id="accountDev" onChange={this.onChange}       placeholder="Devise Compte"     /> */}
                          <Dropdown options={this.state.dev} onChange={e => this.setState({ accountDev: e.label })} value={this.state.dev[19]} placeholder="Select an option" />

                        </FormGroup>
                      </Col>
                      <Col xs="md-3">
                        <FormGroup>
                          <Label htmlFor="name">Type document </Label>
                          <Input type="text" name="typeDocument" id="typeDocument" onChange={this.onChange} placeholder="Type document" />
                        </FormGroup>
                      </Col><Col xs="md-3">
                        <FormGroup>
                          <Label htmlFor="name">Date Comptable </Label>
                          <Input type="date" name="accountingDate" id="accountingDate" onChange={this.onChange} placeholder="Date Comptable" />
                        </FormGroup>
                      </Col><Col xs="md-3">
                        <FormGroup>
                          <Label htmlFor="name">Fiche Client</Label>
                          <Input type="text" name="clientCode" id="clientCode" onChange={this.onChange} placeholder="Fiche Client" />
                        </FormGroup>
                      </Col>
                    </Row>

                  </FormGroup>



                </CardBody>
                <CardFooter>

                  <Button size="sm" color="success" onClick={this.getDocumentByKeyWords} className="float-right"><i className="fa fa-search"></i> Recherche</Button>
                </CardFooter>

              </Card>
            </Form>

          </Col>

          <Col md="12" hidden={this.state.visibile1}>
            <Card className="main-card mb-3">
              <CardBody>
                <SearchTable
                  details={this.props.cols.cols}
                  data={this.state.documents}
                  ComponentName={name}
                  DisplayComponentName={displayName}
                  icon={icon}
                />
              </CardBody>
            </Card>
          </Col>
          <Col md="12" hidden={this.state.visibile2}>

            <Alert color="danger">
              <h4 className="alert-heading">Champ Obligatoire!</h4>

              {this.state.message}
            </Alert>

          </Col>
        </Row>
        </Fragment>
      );
    }
  }
}



const mapStateToProps = state => ({
  document: state.Docs.DocumentsOfUser,
  cols: state.cols
})

export default connect(mapStateToProps, { getUser, getDocsOfUser, getColumns })(RechercheAvancee)



