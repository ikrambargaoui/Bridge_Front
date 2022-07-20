import React, { Component } from 'react';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { Link, withRouter } from 'react-router-dom';
import Notifications, { notify } from 'react-notify-toast';
import { authUser } from '../../Store/Actions/auth';


import { connect } from 'react-redux';

class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      userName: "",
      password: "",
      errors: {}
    }
  }

  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth) {
      this.props.history.push("/dashboard");
    }
    else {
      localStorage.clear()
    }

  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth) {
      notify.show("Authorized", "succes", 10000);
      this.props.history.push("/dashboard"); // push user to dashboard when they login
    }
    else if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors.message.data.msg
      });
      console.log(nextProps.errors)
      notify.show(nextProps.errors.message.data.msg, "error", 10000)
    }
  }



  displayError = () => {
    console.log(this.props.errors)
  }

  handleSubmit = (e) => {

    e.preventDefault();
    let userData = {
      userName: this.state.userName.toLowerCase(),
      password: this.state.password
    }
    this.props.authUser(userData) // call auth user action in the store
    //console.log(userData)
  }


  userNameValidator = (name) => {
    return name.replace('bh00', "").replace(/\D/gm, "")
  }



  handleChange = (e) => {
    if (e.target.name === "userName")
      this.setState({
        userName: e.target.value
      })
    else this.setState({
      [e.target.name]: e.target.value
    })
  }


  render() {
    const { userName, password, errors } = this.state;


    return (
      <div className="app flex-row align-items-center login-interface">
        <Notifications />
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form onSubmit={this.handleSubmit} autoComplete='off' >
                      <h1>Login</h1>
                      <p className="text-muted">Bridge des Banques</p>
                      <InputGroup className="mb-3">

                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="text"
                          name="userName"
                          id="matriculeInput"
                          placeholder="Idéntifiant"
                          onChange={this.handleChange}
                          value={userName}
                        />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="password"
                          name="password"
                          id="PasswordInput"
                          placeholder="mot de passe..."
                          onChange={this.handleChange}
                          value={password}
                        />
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button className="px-4 login-bnt">Login</Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                <Card style={{ width: '44%', backgroundColor: '#4668d1' }} className="text-white back-login py-5 d-md-down-none" >
                  <CardBody className="text-center">
                    <div>
                      <h2>Actualités</h2>
                      <h5>BRIDGE TIENT UNE COMMUNICATION FINANCIÈRE</h5>
                      <p>IMEX TOUJOURS EN FORCE </p>
                      <a href="http://www.imex.com.tn/" target="_blank">
                        <Button color="#be0b0b" className="mt-3 login-2-bnt" active tabIndex={-1}>Visitez notre Site Web</Button>
                      </ a>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}



const mapStateToProps = state => ({
  auth: state.currentUser.isAuthenticated,
  errors: state.errors
});

export default withRouter(connect(mapStateToProps, { authUser })(Login));
