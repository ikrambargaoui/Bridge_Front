
import React, { Component } from 'react';
import { } from '../../scss/example.scss';
import { } from '../../scss/lib/styles.css';

import { getUserInformation } from '../../Services/userService';

import {
  Button,
  Card,
  CardBody,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  InputGroupAddon,
  InputGroup,
  CardHeader,
  Alert
} from 'reactstrap';


export default class UserInformation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      matricule: '',
      visibile1: true,
      visibile2: true,
      message: '',
      nom: '',
    };
  }



  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }
  /*   
    getUserInformationByCuti = () => {
        if (this.state.matricule) {
            getUserInformation(this.state.matricule)
            .then(res => {
                if(res.msg  != null) {
                    console.log(res.msg)
                    this.setState({
                        message:res.msg,
                        visibile1: true,
                        visibile2: false
                    });
                }else{
                    this.setState({
                        nom: res.lib ,
                        age: res.age,
                        ser: res.ser,
                        visibile1 : false,
                        visibile2:true
                        });
                        this.props.hiddenState(this.state.matricule);

                }

                console.log(res)
            });
               
        } */

  getUserInformationByCuti = () => {
    if (this.state.matricule) {
      getUserInformation(this.state.matricule)
        .then(res => {
          if (res.msg != null) {
            console.log(res.msg)
            this.setState({
              message: res.msg,
              visibile1: true,
              visibile2: false
            });

            this.props.hiddenState(null);
          } else {
            this.setState({
              nom: res.lib,
              age: res.age,
              ser: res.ser,
              visibile1: false,
              visibile2: true
            });
            this.props.hiddenState(this.state.matricule);

          }

          console.log(res)
        });

    }
  }
  render() {
    return (
      <Row>
        <Col md="12">
          <Card className="main-card mb-2">
            <CardHeader>
              Rechercher l'utilisateur par Matricule...
            </CardHeader>
            <CardBody>
              <Form>

                <FormGroup >
                  <Col md="12">

                    <Row>
                      <InputGroup   >
                        <Input type="text" id="name" name="matricule" placeholder="Entrer le matricule " required onChange={this.onChange} />
                        <InputGroupAddon addonType="append">
                          <Button color="info" className="mt-1" onClick={this.getUserInformationByCuti} >Rechercher</Button>

                        </InputGroupAddon>

                      </InputGroup>
                    </Row>
                  </Col>
                </FormGroup>
                <Row hidden={this.state.visibile2}  >
                  <Alert color="danger" style={{ display: 'flex', marginLeft: '300px' }}>

                    {this.state.message}
                  </Alert>

                </Row>

                <Row hidden={this.state.visibile1}  >

                  <Col xs="sm-6">
                    <FormGroup>
                      <Row>

                        <Label for="nom"> <strong>Nom et Prénom : </strong> </Label>
                        <Col xs="sm-6">
                          <Input type="text" id="name" value={this.state.nom} /></Col></Row>
                    </FormGroup></Col>

                  <Col xs="sm-6">
                    <FormGroup>
                      <Row>

                        <Label for="nom"><strong>Agence/Service :</strong>  </Label>
                        <Col xs="sm-6">
                          <Input type="text" id="name" value={this.state.ser !== '' ? this.state.ser : this.state.age} />
                        </Col>
                      </Row>
                    </FormGroup>

                  </Col>
                </Row>

              </Form>
            </CardBody>

          </Card>
        </Col>

      </Row>
    )
  }
}

