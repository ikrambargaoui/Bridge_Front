import React, { Component } from 'react'
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

} from 'reactstrap';
import UserInformation from '../Common/UserInformation';
import GestionDelegation from '../Delegation/GestionDelegation';

import { getRights } from '../../Services/rightService';
import { isNullOrUndefined } from 'util';



export default class gestionRight extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            ready: false,
            details: null,
            cols: null,
            matricule: '',
           
            idUser: this.props.location.pathname.slice(14),
        }
       
console.log("l'id est "+this.state.idUser);

    }


    componentDidMount() {

        getRights(this.state.idUser).then(res => {
            this.setState({ data: res });
            console.log("le resultat est " + res)
        }).catch(err => console.log('hr:', err))
    
    }





    render() {
        const name = "GestionRight";
        const displayName="Gestion des droits";
        const icon="fa fa-th-list";
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
                "nomColonne": "rightId",
                "nomVisibility": "Actif",
                "colonneDisplay": "Id du droit"
            },
            {
                "id": 3,
                "nomColonne": "rightName",
                "nomVisibility": "Actif",
                "colonneDisplay": "Nom du droit"
            },


            {
                "id": 3,
                "nomColonne": "rightDescription",
                "nomVisibility": "Actif",
                "colonneDisplay": "Description du droit"
            },
            {
                "id": 3,
                "nomColonne": "affecte",
                "nomVisibility": "Actif",
                "colonneDisplay": "Affectation"
            }
        ];


       
return (
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
        )
    }
}
