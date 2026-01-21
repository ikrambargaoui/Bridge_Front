import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import { } from '../Common/pagination.scss'
import axios from 'axios';

import { getUser } from '../../Store/Actions/userActions'

import { getColumns } from '../../Store/Actions/columnConfig'
import { } from '../Tables/example.scss';
import { } from '../Tables/lib/styles.css';
import SearchTable from '../Common/table'
import {
    Col,
    Card,
    CardBody,

    Row

} from 'reactstrap';
import UserInformation from '../Common/UserInformation';
import GestionDelegation from '../Delegation/GestionDelegation';
import { findUserInformationById } from '../../Services/userService';
import { getProfiles } from '../../Services/profileService';
import { isNullOrUndefined } from 'util';



export default class gestionprofil extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            ready: false,
            details: null,
            cols: null,
            matricule: '',
            appUserName: '',
            appUserLastName: '',
            idUser: this.props.location.pathname.slice(15),
        }

        console.log(this.state.idUser);
    }


    componentDidMount() {

        getProfiles(this.state.idUser).then(res => {
            this.setState({ data: res });

        }).catch(err => console.log('hr:', err))



        findUserInformationById(this.state.idUser)
            .then((response) => {

                this.setState({

                    matricule: response.appUserCode,
                    appUserName: response.appUserFirstName,
                    appUserLastName: response.appUserLastName,
                });
                console.log('response of api', response)
            })
            .catch((error) => {
                alert(error)
            })


    }



    render() {
        const name = "GestionProfil";
        const displayName = "Gestion des profils";
        const icon = "fa fa-th-list";
        const details =
            [


                /*  {
                     "id": 1,
                     "nomColonne": "profileId",
                     "nomVisibility": "Actif",
                     "colonneDisplay": "Identifiant du profile"
                 }, */
                {
                    "id": 2,
                    "nomColonne": "profileName",
                    "nomVisibility": "Actif",
                    "colonneDisplay": "Nom du profile"
                },
                {
                    "id": 3,
                    "nomColonne": "profileDescription",
                    "nomVisibility": "Actif",
                    "colonneDisplay": "Description du profile"
                },


                /* {
                    "id": 3,
                    "nomColonne": "affecte",
                    "nomVisibility": "Actif",
                    "colonneDisplay": "Affctation"
                } */
            ];



        return (

            <Fragment>
                <Row>

                    <Col md="12">
                        <Card className="main-card mb-3">
                            <CardBody>
                                Matricule : {this.state.matricule} {'     '} {this.state.appUserLastName} {' '} {this.state.appUserName}

                            </CardBody>
                        </Card>
                    </Col>
                    <Col md="12">
                        <Card className="main-card mb-3">
                            <CardBody>
                                <SearchTable
                                    details={details}
                                    data={this.state.data}
                                    ComponentName={name}
                                    idUser={this.state.idUser}
                                    DisplayComponentName={displayName}
                                    icon={icon}
                                />

                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Fragment>
        )
    }
}
