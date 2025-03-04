import React, { Component, Fragment } from 'react';


import { addUser } from '../../Services/userService'
import { } from '../Tables/example.scss';
import { } from '../Tables/lib/styles.css';
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
import { findAllStructure } from '../../Services/StructureService';

class AddUser extends Component {

    constructor(props) {
        super(props);
        this.state = {

            appUserCode: '',
            appUserFirstName: '',
            appUserLastName: '',
            appUserPassword: '',
            appUserConfirmPassword: '',
            appUserEmail: '',
            appUserAgency: '',
            agencies: [],
            age: [],
            message: '',
            visibilityError: true,
            visibilitySuccess: true,
            loadingBtn: false



        };
        this.onChange = this.onChange.bind(this);
    }


    componentDidMount() {

    }

    componentWillMount() {

        findAllStructure()
            .then((response) => {

                this.setState({
                    agencies: response,
                    message: '',



                });
                for (var i in this.state.agencies) {
                    this.setState({ age: this.state.age.concat([{ label: this.state.agencies[i].libelleStructure, value: this.state.agencies[i].codeStructure }]) });
                }
            })
            .catch((error) => {
                alert(error)
            })

    }

    validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };


    addUser = () => {
      
        if (this.state.appUserCode === '' || this.state.appUserFirstName === '' || this.state.appUserEmail === '' || this.state.appUserLastName === '' || this.state.appUserConfirmPassword === '') {

           

            this.setState({
                message: "Vous devez remplir tous les champs",
                visibilityError: false,
                appUserAgency: '',
            });

            console.log('message   ', this.state.message)
        } else if (this.state.appUserEmail !== this.state.appUserConfirmPassword || !this.validateEmail(this.state.appUserEmail)) {
            this.setState({
                message: "Vous devez vérifier l'adresse email",
                visibilityError: false,
                appUserAgency: '',
            });
        }
        else {

            this.setState({
                loadingBtn : true
            })

            let request = {
                appUserCode: this.state.appUserCode,
                appUserFirstName: this.state.appUserFirstName,
                appUserLastName: this.state.appUserLastName,
                appUserEmail: this.state.appUserEmail,

            }
            addUser(request)
                .then((response) => {

                    if (response.code === "1") {
                        this.setState({
                            message: response.msg,
                            visibilityError: true,
                            visibilitySuccess: false,
                            loadingBtn : false

                        });
                        setTimeout(() => {
                            document.location.reload(true);

                            
                        }, 2000);
                    } else {
                        this.setState({
                            message: response.msg,
                            visibilityError: false,
                            visibilitySuccess: true,
                            loadingBtn : false

                        });
                    }

                })
                .catch((error) => {
                    alert(error)
                    this.setState({
                        loadingBtn : true
                    })
                })
        }


    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }


    render() {
        if (!this.state.age) return <div>Chargement...</div>
        else {
            const name = "AddUser";
            const displayName = "Ajouter utilisateur...";
            const icon = "fa fa-folder-open";
            return (
                <>


                    <Card >
                        <Row>
                            <Col md="4">
                                <Button size="sm" color="success" style={{ marginLeft: "5%", marginTop: '3%', marginBottom: '3%' }} className="float-left" onClick={this.props.setComponentAddOff}>La liste des utilisateurs</Button>

                            </Col>
                        </Row>


                        <CardHeader>
                            Ajout utilisateur
                        </CardHeader>
                        <CardBody>
                            <Form className="form-horizontal">
                                <FormGroup col="true">
                                    <Row md="12">

                                        <Col xs="md-4">
                                            <FormGroup>
                                                <Label htmlFor="name">Matricule de l'utilisateur <span className="ml-auto font-weight-bold"></span><span style={{ color: 'red' }} >*</span></Label>
                                                <Input type="text" name="appUserCode" id="appUserCode" onChange={this.onChange} placeholder="Matricule" required />
                                            </FormGroup>
                                        </Col>
                                        <Col xs="md-4">
                                            <FormGroup>
                                                <Label htmlFor="name">Prénom de l'utilisateur <span className="ml-auto font-weight-bold"></span><span style={{ color: 'red' }} >*</span></Label>
                                                <Input type="text" name="appUserLastName" id="appUserLastName" onChange={this.onChange} placeholder="Prénom" required />
                                            </FormGroup>
                                        </Col>
                                        <Col xs="md-4">
                                            <FormGroup>
                                                <Label htmlFor="name">Nom de l'utilisateur<span className="ml-auto font-weight-bold"></span><span style={{ color: 'red' }} >*</span> </Label>
                                                <Input type="text" name="appUserFirstName" id="appUserFirstName" onChange={this.onChange} placeholder="Nom" required />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row md="12">
                                        <Col xs="md-4">
                                            <FormGroup>
                                                <Label htmlFor="name">Email de l'utilisateur <span className="ml-auto font-weight-bold"></span><span style={{ color: 'red' }} >*</span></Label>
                                                <Input type="email" name="appUserEmail" id="appUserEmail" onChange={this.onChange} placeholder="Email utilisateur" required />
                                            </FormGroup>
                                        </Col>
                                        <Col xs="md-4">
                                            <FormGroup>
                                                <Label htmlFor="name">Confirmer l'email de l'utilisateur <span className="ml-auto font-weight-bold"></span><span style={{ color: 'red' }} >*</span></Label>
                                                <Input type="email" name="appUserConfirmPassword" id="appUserConfirmPassword" onChange={this.onChange} placeholder="Email utilisateur" required />
                                            </FormGroup>
                                        </Col>
                                    </Row>

                                    <br />
                                    <Row>
                                        <Col>
                                            <p>un email de notification d'ajout sera envoyé à l'utilisateur </p>
                                        </Col>
                                    </Row>

                                </FormGroup>
                            </Form>
                        </CardBody>
                        <CardFooter>

                            <Button size="sm" color="success" onClick={this.addUser} className="float-right" disabled={this.state.loadingBtn}>{this.state.loadingBtn?<Spinner size="sm" />:null}Ajouter utilisateur</Button>

                        </CardFooter>
                    </Card>



                    <Col md="12" hidden={this.state.visibilitySuccess}>
                        <Alert color="success">
                            {this.state.message}
                        </Alert>

                    </Col>

                    <Col md="12" hidden={this.state.visibilityError}>

                        <Alert color="danger">
                            {this.state.message}
                        </Alert>

                    </Col>


                </>
            );
        }
    }
}

export default AddUser;