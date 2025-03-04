import React, { Component, Fragment } from 'react';


import { updatePassword } from '../../Services/userService'
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

class UpdatePassword extends Component {

    constructor(props) {
        super(props);
        this.state = {

            password: '',
            newPassword: '',
            RnewPassword: '',
            message: '',
            visibilityError: true,
            visibilitySuccess: true,
            btnLoadingUser: false




        };
        this.onChange = this.onChange.bind(this);
    }


    componentDidMount() {

    }





    updateUser = () => {
        if (this.state.password === '' || this.state.RnewPassword === '' || this.state.newPassword === '') {

            console.log('fields are empty')

            this.setState({
                message: "Vous devez remplir tous les champs",
                visibilityError: false,
                appUserAgency: '',
            });

            console.log('message   ', this.state.message)
        }
        else if (this.state.password.length < 6 || this.state.RnewPassword.length < 6 || this.state.password.newPassword < 6) {
            this.setState({
                message: "Le mot de passe doit contenir au moins six caractères",
                visibilityError: false,
            });

        }
        else if (this.state.password === this.state.newPassword) {
            this.setState({
                message: "Vous avez saisi un ancien mot de passe",
                visibilityError: false,
            });

        } else if (this.state.RnewPassword !== this.state.newPassword) {
            this.setState({
                message: "Les mots de passe ne sont pas conformes",
                visibilityError: false,
            });
        }
        else {

            this.setState({
                loadingBtn: true
            })

            let request = {
                ancienMdp: this.state.password,
                nouveauMdp: this.state.newPassword

            }
            console.log('req update password', request)
            updatePassword(request)
                .then((response) => {

                    if (response.code === "1") {
                        this.setState({
                            message: response.msg,
                            visibilityError: true,
                            visibilitySuccess: false,
                            loadingBtn: false

                        });
                        setTimeout(() => {
                            this.props.history.push("/Acceuil");

                            //document.location.reload(true);
                        }, 2000);
                    } else {
                        this.setState({
                            message: response.msg,
                            visibilityError: false,
                            visibilitySuccess: true,
                            loadingBtn: false

                        });
                    }

                })
                .catch((error) => {
                    alert(error)
                    this.setState({
                        loadingBtn: true
                    })
                })
        }


    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }


    render() {
        return (
            <>


                <Card >

                    <CardHeader>
                        Réinitialiser mon mot de passe
                    </CardHeader>
                    <CardBody>
                        <Form className="form-horizontal">
                            <FormGroup col="true">
                                <Row md="12">
                                    <Col xs="md-4">
                                        <FormGroup>
                                            <Label htmlFor="name">Ancien mot de passe <span className="ml-auto font-weight-bold"></span><span style={{ color: 'red' }} >*</span></Label>
                                            <Input type="password" name="password" id="password" onChange={this.onChange} placeholder="Ancien mot de passe" required />
                                        </FormGroup>
                                    </Col>
                                    <Col xs="md-4">
                                        <FormGroup>
                                            <Label htmlFor="name">Nouveau mot de passe <span className="ml-auto font-weight-bold"></span><span style={{ color: 'red' }} >*</span></Label>
                                            <Input type="password" name="newPassword" id="newPassword" onChange={this.onChange} placeholder="Nouveau mot de passe" required />
                                        </FormGroup>
                                    </Col>
                                    <Col xs="md-4">
                                        <FormGroup>
                                            <Label htmlFor="name">Confirmer nouveau mot de passe <span className="ml-auto font-weight-bold"></span><span style={{ color: 'red' }} >*</span></Label>
                                            <Input type="password" name="RnewPassword" id="RnewPassword" onChange={this.onChange} placeholder="Confirmer nouveau mot de passe" required />
                                        </FormGroup>
                                    </Col>
                                </Row>

                            </FormGroup>
                        </Form>
                    </CardBody>
                    <CardFooter>

                        <Button size="sm" color="success" onClick={this.updateUser} className="float-right" disabled={this.state.loadingBtn}>{this.state.loadingBtn ? <Spinner size="sm" /> : null}Réinitialiser mot de passe</Button>

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

export default UpdatePassword;