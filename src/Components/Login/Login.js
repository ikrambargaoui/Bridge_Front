import React, { Component } from 'react';
import { Button, Card, CardBody,CardTitle, CardFooter ,CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import Notifications, { notify } from 'react-notify-toast';
import { authUser } from '../../Store/Actions/auth';
import logoBiat from '../../../src/assets/img/logo_biat.png';
import { findLastVersion } from '../../Services/VersionsServices';
import homeBiat from '../../../src/assets/img/home_br.png';
import { connect } from 'react-redux';

class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      userName: "",
      password: "",
       version:"",
      errors: {}
    }
  }


 async componentDidMount() {
  if (this.props.auth) {
    this.props.history.push("/Dashboard");
  } else {
    localStorage.clear();
  }

  try {
    const response = await findLastVersion();
    this.setState({
      version: response
    });
  } catch (error) {
    console.error(error);
  }
}







  componentWillReceiveProps(nextProps) {
    if (nextProps.auth) {
      notify.show("Authorized", "succes", 10000);
      this.props.history.push("/Dashboard"); // push user to dashboard when they login
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
      userName: this.state.userName,
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
    const { userName, password } = this.state;


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
                      <Row className="justify-content-center">
                        <img src={logoBiat} width="35%" height="35%" alt="logo_biat" />
                      </Row>

                      <br />
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
                          placeholder="matricule"
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
                        <Col xs="12">
                          <Row className="justify-content-center">
                            <Button className="login-bnt" >Se connecter</Button>
                          </Row>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                <Card
                  style={{
                    width: '44%',
                   
                    backgroundImage: `url(${homeBiat})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                  
                  }}
                  className="text-white back-login py-5 d-md-down-none"
                >
                  <CardBody className="text-center">
                 
                 
                  
                  </CardBody>

                  <CardFooter style={{ backgroundColor: 'transparent' , border: 'none'}} className="text-center"> <div>
                  <h1>Bridge for banks</h1>
                      
                      <h5>IMEX - BIAT</h5>
                      <br />
                      <h6>
                       Version: 7.0.2.{this.state.version}
                        </h6>
                    
                    </div></CardFooter>
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
