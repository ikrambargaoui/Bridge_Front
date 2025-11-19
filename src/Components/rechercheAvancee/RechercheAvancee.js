import React, { Component, Fragment } from 'react';
import Dropdown from 'react-dropdown'
import { connect } from 'react-redux'
import { findDocByKeyWords, findTypes } from '../../Services/docsServices'
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
  Spinner
} from 'reactstrap';
import '../Common/pagination.scss'
import { getUser } from '../../Store/Actions/userActions'

import { getColumns } from '../../Store/Actions/columnConfig'
import { } from '../Tables/example.scss';
import { } from '../Tables/lib/styles.css';
import SearchTable from '../Common/table'


class RechercheAvancee extends Component {
  constructor(props) {
    super(props);
    this.dateInputRefStart = React.createRef();
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
      dateComptableEnd: '',
      dateComptableStart: '',
      clientCode: '',
      refOp: '',
      typeDocument: '',
      devises: [],
      dev: [],
      types: [],
      devTypes: [],
      message: '',
      loadingBtn: false,
      loadingDisplayDev: true,
      loadingDisplayType: true
    };

    this.onChange = this.onChange.bind(this);

  }
  componentDidMount() {

    this.props.getColumns()
  }
  componentWillMount() {


    findDevise()
      .then((response) => {

        response.unshift('Toutes les devises')

        this.setState({
          devises: response

        });
        for (var i in this.state.devises) {
          this.setState({ dev: this.state.dev.concat([{ label: this.state.devises[i], value: parseInt(i) + 1 }]), loadingDisplayDev: false });
        }
      })
      .catch((error) => {
        alert(error)
        this.setState({
          loadingDisplayDev: false

        });
      })

    findTypes()
      .then((response) => {
        response.unshift({ id: 1000, typeDocument: "Tous les types", codeTypeDocument: "" })
        this.setState({
          types: response

        });
        for (var i in this.state.types) {
          this.setState({ devTypes: this.state.devTypes.concat([{ label: this.state.types[i].typeDocument, value: this.state.types[i].codeTypeDocument }]), loadingDisplayType: false });
        }
      })
      .catch((error) => {
        alert(error)
        this.setState({
          loadingDisplayType: false
        });
      })
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  resetDate() {
    this.setState({
      dateComptableStart: null
    })
  }
  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.getDocumentByKeyWords();
    }
  };


  getDocumentByKeyWords = () => {

    if (this.state.dateComptableStart === '' || this.state.dateComptableEnd === '' || this.state.typeDocument === '') {
      this.setState({
        message: "Champs obligatoires manquants",
        visibile2: false,
        visibile1: true,
        accountDev: '',
      });
    }

    else {
      this.setState({
        loadingBtn: true
      })
      let request = {
        codeAgency: this.state.codeAgency,
        accountNumber: this.state.accountNumber,
        chapitreComptable: this.state.accountKey,
        accountDev: this.state.accountDev,
        typeDocument: this.state.typeDocument,
        dateComptable: this.state.accountingDate,
        dateComptableStart: this.state.dateComptableStart,
        dateComptableEnd: this.state.dateComptableEnd,
        clientCode: this.state.clientCode,
        refOp: this.state.refOp
      }
      findDocByKeyWords(request)
        .then((response) => {
          this.setState({
            documents: response,
            visibile1: false,
            visibile2: true,
            accountDev: '',
            loadingBtn: false
          });
        })
        .catch((error) => {
          if (error.response) {

            if (error.response.status === 400) {


              this.setState({
                message: error.response.data.msg,
                visibile2: false,
                visibile1: true,
                loadingBtn: false
              });
            } else if (error.response.status === 503) {

              this.setState({
                message: "Le service est actuellement indisponible. Veuillez réessayer plus tard.",
                visibile2: false,
                visibile1: true,
                loadingBtn: false
              });
            } else {

              this.setState({
                message: "Une erreur est survenue : " + error.response.status,
                visibile2: false,
                visibile1: true,
                loadingBtn: false
              });
            }
          } else {

            this.setState({
              message: "Une erreur est survenue lors de la communication avec le serveur.",
              loadingBtn: false
            });
          }
        });
    }
  };



  render() {
    if (this.state.loadingDisplayDev || this.state.loadingDisplayType) return <div>Chargement...</div>
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
                      <Col xs="md-4">
                        <FormGroup>
                          <Label htmlFor="name">Numéro de compte  <span className="ml-auto font-weight-bold"></span> </Label>
                          <Input type="text" name="accountNumber" id="accountNumber" onChange={this.onChange} onKeyPress={this.handleKeyPress} placeholder="Numéro de Compte" />
                        </FormGroup>
                      </Col>
                      <Col xs="md-4">
                        <FormGroup>
                          <Label htmlFor="name">Référence opération</Label>
                          <Input type="text" name="refOp" id="refOp" onChange={this.onChange} onKeyPress={this.handleKeyPress} placeholder="Référence opération" />
                        </FormGroup>
                      </Col>
                      <Col xs="md-4">
                        <FormGroup>
                          <Label htmlFor="name">Code agence  <span className="ml-auto font-weight-bold"></span></Label>
                          <Input type="text" name="codeAgency" id="codeAgency" onChange={this.onChange} onKeyPress={this.handleKeyPress} placeholder="Code Agence" />
                        </FormGroup>
                      </Col>


                      <Col xs="md-4">
                        <FormGroup>
                          <Label htmlFor="name">Type document  </Label><span style={{ color: 'red' }} > *</span>
                          <Dropdown options={this.state.devTypes} onChange={e => this.setState({ typeDocument: e.value })} value={this.state.devTypes[0]} />

                        </FormGroup>
                      </Col>
                      <Col xs="md-4">
                        <FormGroup>
                          <Label htmlFor="name">Code client</Label>
                          <Input type="text" name="clientCode" id="clientCode" onChange={this.onChange} onKeyPress={this.handleKeyPress} placeholder="Code Client" />
                        </FormGroup>
                      </Col>


                      <Col xs="md-4">
                        <FormGroup>
                          <Label htmlFor="name">Devise compte  </Label>

                          <Dropdown options={this.state.dev} onChange={e => this.setState({ accountDev: e.label })} value={this.state.dev[0]} />

                        </FormGroup>
                      </Col>
                    </Row>
                    <fieldset style={{ border: "1px solid #E4E5E6", padding: "0.5% 0.5% 0.5% 1%" }}>
                      <legend style={{ color: "black", fontSize: "14px", marginLeft: "10%", paddingLeft: "2%", width: "7%", fontWeight: "bold" }}>Date</legend>
                      <Row>

                        <Col xs="md-6">
                          <FormGroup>
                            <Label htmlFor="name">Du <span style={{ color: 'red' }} >*</span> </Label>
                            <Input type="date" name="dateComptableStart" id="dateComptableStart" onChange={this.onChange} value={this.state.dateComptableStart} />
                          </FormGroup>
                        </Col>
                        <Col xs="md-6">
                          <FormGroup>
                            <Label htmlFor="name">Au <span style={{ color: 'red' }} >*</span></Label>
                            <Input type="date" name="dateComptableEnd" id="dateComptableEnd" onChange={this.onChange} value={this.state.dateComptableEnd} />
                          </FormGroup>
                        </Col>

                      </Row>
                    </fieldset>

                  </FormGroup>



                </CardBody>
                <CardFooter>

                  <Button size="sm" color="success" onClick={this.getDocumentByKeyWords} className="float-right" disabled={this.state.loadingBtn}>{this.state.loadingBtn ? <Spinner size="sm" /> : <i className="fa fa-search"></i>} Recherche</Button>
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

export default connect(mapStateToProps, { getUser, getColumns })(RechercheAvancee)



