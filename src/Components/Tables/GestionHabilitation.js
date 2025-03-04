import React, { Fragment } from 'react';
import axios from 'axios';
import ReactTable from "react-table";
import matchSorter from 'match-sorter';
const URL = require('../../Config/Config').Url;

import {
    Button, Form,
    FormGroup, Label,
    Input, FormText,
    Row, Col,
    Card, CardBody,
    CardTitle,
} from 'reactstrap';

export default class GestionHabilitation extends React.Component {

    constructor() {
        super();

        this.state = {
            matricule: '',
            nom: '',
            visibile: true,

            etats: [],
            totaletats: []
        };

        this.getClientCredential = this.getClientCredential.bind(this);
        this.onChange = this.onChange.bind(this);
        this.postMethod = this.postMethod.bind(this);
        this.deleteRow = this.deleteRow.bind(this);

    }
    postMethod(param) {
        var headers = {
            'Content-Type': 'application/json',
            'Authorization': "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJiaDAwMzQ0NSIsImlhdCI6MTU0OTM3MTE5NSwiY29kZSI6ImJoMDAzNDQ1Iiwicm9sZXMiOlt7ImF1dGhvcml0eSI6IlJPTEVfVVNFUiJ9LHsiYXV0aG9yaXR5IjoiUk9MRV9CVVNTSU5FU1NfVU5JVF9NQU5BR0VSIn1dfQ.TsaMOct4GApSlg7bEfTFQCGQG273P8g55Lfk2LJa1CI",
            'Access-Control-Allow-Origin': '*'
        }
        axios.post(URL + '/Bridge/Habilitations/postEtatHabilitation', {
            idUser: this.state.matricule,
            codeHabilitation: param
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
        axios.get(URL + '/Bridge/Habilitations/deleteEtatHabilitation/' + param, { headers: headers })
            .then((response) => {

                console.log(param);

            })
            .catch((error) => {
                alert(error)
            })

    }

    getClientCredential() {
        if (this.state.matricule) {


            var headers = {
                'Content-Type': 'application/json',
                'Authorization': "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJiaDAwMzQ0NSIsImlhdCI6MTU0OTM3MTE5NSwiY29kZSI6ImJoMDAzNDQ1Iiwicm9sZXMiOlt7ImF1dGhvcml0eSI6IlJPTEVfVVNFUiJ9LHsiYXV0aG9yaXR5IjoiUk9MRV9CVVNTSU5FU1NfVU5JVF9NQU5BR0VSIn1dfQ.TsaMOct4GApSlg7bEfTFQCGQG273P8g55Lfk2LJa1CI"

            }
            axios.get(URL + '/Bridge/User/GetUserInformationByCuti/' + this.state.matricule, { headers: headers })
                .then((response) => {
                    this.setState({
                        nom: response.data[0].lib
                    });
                    console.log(response.data[0].lib);

                })
                .catch((error) => {
                    alert(error)
                })

            this.setState({ visible: false })

            axios.get(URL + '/Bridge/Habilitations/GetEtatHabilitation', { headers: headers })
                .then((response) => {

                    this.setState({
                        totaletats: response.data

                    });
                    console.log(response.data);


                })
                .catch((error) => {
                    alert(error)
                })
            axios.get(URL + '/Bridge/Habilitations/GetEtatHabilitationByCuti/' + this.state.matricule, { headers: headers })
                .then((response) => {

                    this.setState({
                        etats: response.data

                    });
                    console.log(response.data);


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
        const { etats } = this.state;
        const { totaletats } = this.state;

        return (
            <Fragment>

                <Row>
                    <Col md="12">
                        <Card className="main-card mb-2">
                            <CardBody>
                                <CardTitle></CardTitle>
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
                        <Card className="main-card mb-3">
                            <CardBody>

                                <ReactTable
                                    data={etats}
                                    filterable
                                    defaultFilterMethod={(filter, row) =>
                                        String(row[filter.id]) === filter.value}
                                    columns={[

                                        {
                                            Header: "Code",
                                            id: "code",
                                            accessor: d => d.code,
                                            accessor: d => d.code,
                                            filterMethod: (filter, rows) =>
                                                matchSorter(rows, filter.value, { keys: ["code"] }),
                                            filterAll: true
                                        }

                                        ,
                                        //                          {
                                        //                               Header:"Mail",
                                        //                               id: "mail",
                                        //                               accessor: d => d.mail,
                                        //                             },

                                        //                          {
                                        //                               Header:"Service",
                                        //                               id: "service",
                                        //                               accessor: d => d.service,
                                        //                             },
                                        //                          {
                                        //  Header:"Groupe",
                                        //   id: "groupe",
                                        //   accessor: d => d.groupe,

                                        // },

                                        {
                                            Header: 'Action',
                                            id: 'id',
                                            accessor: 'id',
                                            filterable: false,

                                            Cell: row => (
                                                <div>

                                                    <Button color="danger" onClick={() => this.deleteRow(row.value)} size="sm" ><i className="dropdown-icon lnr lnr-trash"></i></Button>
                                                </div>
                                            )
                                        }

                                    ]
                                    }


                                    defaultPageSize={4}
                                />

                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row hidden={this.state.visibile}>
                    <Col md="12">
                        <Card className="main-card mb-3">
                            <CardBody>
                                <ReactTable
                                    data={totaletats}
                                    filterable
                                    defaultFilterMethod={(filter, row) =>
                                        String(row[filter.id]) === filter.value}
                                    columns={[

                                        {
                                            Header: "Code",
                                            id: "code",
                                            accessor: d => d.code,
                                            filterMethod: (filter, rows) =>
                                                matchSorter(rows, filter.value, { keys: ["code"] }),
                                            filterAll: true
                                        },


                                        {
                                            Header: 'Action',
                                            id: 'code',
                                            accessor: 'code',
                                            filterable: false,

                                            Cell: row => (
                                                <div>

                                                    <Button color="success" onClick={() => this.postMethod(row.value)} size="sm" ><i className="dropdown-icon lnr lnr-plus-circle"></i></Button>
                                                </div>
                                            )
                                        }

                                    ]
                                    } defaultPageSize={10}
                                    className="-striped -highlight"

                                />
                            </CardBody>

                        </Card>
                    </Col>
                </Row>
            </Fragment>
        );
    }
}
