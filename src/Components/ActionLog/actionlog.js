import React, { Component } from 'react'
import { } from '../Common/pagination.scss'
import { getActions } from '../../Services/ActionLogServices'
import { } from '../Tables/example.scss';
import { } from '../Tables/lib/styles.css';
import SearchTable from '../Common/table'
import {
    Col,
    Card,
    CardBody,

} from 'reactstrap';
import { GrFormView } from "react-icons/gr";
import { FaDownload } from "react-icons/fa6";


export default class GestionHabilitation extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            ready: false,
            details: null,
            cols: null,


        }
    }
    componentWillMount() {
        getActions().then((response) => {
            this.setState({
                data: response
            }, console.log('action log : ', response));
        })
            .catch((error) => {
                alert(error)
            })

    }

    render() {
        const name = "ActionLog";
        const displayName = "Journal d'activités";
        const icon = "fa fa-th-list";
        const details =
            [

                {
                    "id": 1,
                    "nomColonne": "action.actionLib",
                    "nomVisibility": "Actif",
                    "colonneDisplay": "Action"
                }
                ,
                {
                    "id": 2,
                    "nomColonne": "user.appUserCode",
                    "nomVisibility": "Actif",
                    "colonneDisplay": "User"
                }
                ,

                {
                    "id": 3,
                    "nomColonne": "account",
                    "nomVisibility": "Actif",
                    "colonneDisplay": "Compte"
                },


                {
                    "id": 4,
                    "nomColonne": "docType",
                    "nomVisibility": "Actif",
                    "colonneDisplay": "Type"
                },
                {
                    "id": 5,
                    "nomColonne": "agency",
                    "nomVisibility": "Actif",
                    "colonneDisplay": "Agence"
                }
                ,
                {
                    "id": 6,
                    "nomColonne": "actionDateD",
                    "nomVisibility": "Actif",
                    "colonneDisplay": "Date"
                }
                ,
                {
                    "id": 7,
                    "nomColonne": "actionDateH",
                    "nomVisibility": "Actif",
                    "colonneDisplay": "Heure"
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
                            DisplayComponentName={displayName}
                            icon={icon}
                        />
                    </CardBody>
                </Card>
            </Col>
        )
    }
}

