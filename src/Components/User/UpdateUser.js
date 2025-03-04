import React, { Component, Fragment } from 'react';


import { findUserInformationByCode, updateUserByAdmin } from '../../Services/userService'
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

class AddUser extends Component {

    constructor(props) {
        super(props);
        this.state = {

            appUserCode: '',
            appUserName: '',
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
            passwordConfirm: '',
            password: '',
            appUser: {},
            btnLoadingUser: true,
            appUserReinitPwd : false,
            loadingBtn: false



        };
        this.onChange = this.onChange.bind(this);
    }




    componentDidMount() {
        console.log(this.props.location.pathname.slice(12))
        findUserInformationByCode(this.props.location.pathname.slice(12))
            .then((response) => {

                this.setState({
                    appUser: response,
                    appUserCode: response.appUserCode,
                    appUserName: response.appUserFirstName ,
                    appUserLastName: response.appUserLastName,
                    appUserPassword: '222222222',
                    appUserConfirmPassword: '',
                    appUserEmail: response.appUserEmail,
                    appUserConfirmPassword : response.appUserEmail,
                    btnLoadingUser: false



                });
                console.log('response of api', response)
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


    updateUser = () => {

        if (this.state.appUserCode === '' || this.state.appUserName === '' || this.state.appUserEmail === '' || this.state.appUserLastName === '' || this.state.appUserConfirmPassword === '') {



            this.setState({
                message: "Vous devez remplir tous les champs",
                visibilityError: false,
                appUserAgency: '',
            });

            console.log('message   ', this.state.message)
        }

        else if (this.state.appUserConfirmPassword !== this.state.appUserEmail || !this.validateEmail(this.state.appUserEmail)) {



            this.setState({
                message: "Les adresses email ne sont pas conformes",
                visibilityError: false,
                appUserAgency: '',
            });



        }

        else {

            this.setState({
                loadingBtn: true
            })
            console.log('fields are not empty')
            let request = {
                appUserCode: this.state.appUserCode,
                appUserFirstName: this.state.appUserName,
                appUserLastName: this.state.appUserLastName,
                appUserEmail: this.state.appUserEmail,
                appUserPwd: this.state.appUserPassword,
                appUserReinitPwd : this.state.appUserReinitPwd?'1':'0'

            }
            console.log('req',request)
            updateUserByAdmin(request)
                .then((response) => {

                    if (response.code === '1'){
                        console.log('utilisateur modifié  ', response)
                        this.setState({
                            message: "utilisateur modifié avec succès",
                            appUserAgency: '',
                            visibilityError: true,
                            visibilitySuccess: false,
                            loadingBtn: false
    
                        });
                        setTimeout(() => {
                            this.props.history.push("/GestionUtilisateurAgence");
    
                            //document.location.reload(true);
                        }, 2000);
                    }else{
                        this.setState({
                            message: response.msg,
                            appUserAgency: '',
                            visibilityError: false,
                            visibilitySuccess: true,
                            loadingBtn: false
    
                        });
                    }
                    
                })
                .catch((error) => {
                    alert(error)
                    this.setState({
                        loadingBtn: false

                    });
                })
        }


    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }




    render() {
        if (this.state.btnLoadingUser) return <div>Chargement...</div>
        else {
            const name = "AddUser";
            const displayName = "Ajouter utilisateur...";
            const icon = "fa fa-folder-open";
            return (
                <Fragment>
                    <Row>
                        <Col md="12"></Col>
                        <Form className="form-horizontal">

                            <Card className="main-card mb-3">


                                <CardHeader>
                                    Modification d'un utilisateur
                                </CardHeader>
                                <CardBody>
                                    <FormGroup col="true">
                                        <Row>

                                            <Col xs="md-4">
                                                <FormGroup>
                                                    <Label htmlFor="name">Matricule de l'utilisateur <span className="ml-auto font-weight-bold"></span><span style={{ color: 'red' }} >*</span></Label>
                                                    <Input type="text" name="appUserCode" id="appUserCode" onChange={this.onChange} value={this.state.appUserCode} disabled />
                                                </FormGroup>
                                            </Col>
                                            <Col xs="md-4">
                                                <FormGroup>
                                                    <Label htmlFor="name">Prénom de l'utilisateur <span className="ml-auto font-weight-bold"></span><span style={{ color: 'red' }} >*</span></Label>
                                                    <Input type="text" name="appUserLastName" id="appUserLastName" onChange={this.onChange} value={this.state.appUserLastName} required />
                                                </FormGroup>
                                            </Col>
                                            <Col xs="md-4">
                                                <FormGroup>
                                                    <Label htmlFor="name">Nom de l'utilisateur<span className="ml-auto font-weight-bold"></span><span style={{ color: 'red' }} >*</span> </Label>
                                                    <Input type="text" name="appUserName" id="appUserName" onChange={this.onChange} value={this.state.appUserName} required />
                                                </FormGroup>
                                            </Col>
                                            <Col xs="md-4">
                                                <FormGroup>
                                                    <Label htmlFor="name">Email de l'utilisateur <span className="ml-auto font-weight-bold"></span><span style={{ color: 'red' }} >*</span></Label>
                                                    <Input type="email" name="appUserEmail" id="appUserEmail" onChange={this.onChange} value={this.state.appUserEmail} required />
                                                </FormGroup>
                                            </Col>
                                            <Col xs="md-4">
                                                <FormGroup>
                                                    <Label htmlFor="name">Confirmer email de l'utilisateur <span className="ml-auto font-weight-bold"></span><span style={{ color: 'red' }} >*</span></Label>
                                                    <Input type="email" name="appUserConfirmPassword" id="appUserConfirmPassword" onChange={this.onChange} value={this.state.appUserConfirmPassword} required />
                                                </FormGroup>
                                            </Col>
                                            <Col xs="md-4">
                                                <FormGroup style={{ marginTop: '10%' }} check>
                                                    <Input type="checkbox" name="appUserReinitPwd" checked={this.state.appUserReinitPwd} onChange={() => { this.setState({ appUserReinitPwd: !this.state.appUserReinitPwd }) }} />
                                                    {' '}
                                                    <Label check>
                                                        réinitialiser mot de passe
                                                    </Label>
                                                </FormGroup>
                                            </Col>

                                        </Row>
                                        <br />
                                        {this.state.appUserReinitPwd ? <Row><Col xs="md-4">
                                            <p>l'utilisateur sera notifié par email .....</p>
                                        </Col></Row> : null}

                                    </FormGroup>

                                </CardBody>
                                <CardFooter>

                                    <Button size="sm" color="success" onClick={this.updateUser} className="float-right" disabled={this.state.loadingBtn}>{this.state.loadingBtn?<Spinner size="sm" />:null} Modifier utilisateur</Button>

                                </CardFooter>
                            </Card>

                        </Form>

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

                    </Row>

                </Fragment>
            );
        }
    }
}

export default AddUser;