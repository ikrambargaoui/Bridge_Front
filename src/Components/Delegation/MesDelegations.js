import React, { Component } from 'react'
import { } from '../Common/pagination.scss'

import { } from '../Tables/example.scss';
import { } from '../Tables/lib/styles.css';
import SearchTable from '../Common/table'
import {
    Col,
    Card,
    CardBody,

} from 'reactstrap';
import { DelegationsIn } from '../../Services/delegationService';


export default class delegation extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            ready: false,
            details: null,
            cols: null,
            matricule: ''

        }
    }


    componentDidMount() {
        DelegationsIn().then(res => {
            this.setState({ data: res });
            console.log("le resultat est " + res)
        }).catch(err => console.log('hr:', err))



    }


    render() {
        const name = "GestionDelegation";
        const details =
            [

                
                {
                    "id": 1,
                    "nomColonne": "dateDebDelegation",
                    "nomVisibility": "Actif",
                    "colonneDisplay": "Date de début de délégation"
                },
                {
                    "id": 2,
                    "nomColonne": "dateFinDelegation",
                    "nomVisibility": "Actif",
                    "colonneDisplay": "Date de fin de délégation"
                },
                {
                    "id": 3,
                    "nomColonne": "userNom",
                    "nomVisibility": "Actif",
                    "colonneDisplay": "Proprietaire"
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
                        />
                    </CardBody>
                </Card>
            </Col>
        )
    }
}
