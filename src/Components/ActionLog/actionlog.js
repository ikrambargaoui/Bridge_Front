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
            },console.log('action log : ',response));
        })
            .catch((error) => {
                alert(error)
            })

    }


    render() {
        const name = "ActionLog";
        const displayName = "Action Log";
        const icon = "fa fa-th-list";
        const details =
            [
                {
                    "id": 1,
                    "nomColonne": "user.appUserCode",
                    "nomVisibility": "Actif",
                    "colonneDisplay": "User"
                }, 
                {
                    "id": 2,
                    "nomColonne": "action.actionLib",
                    "nomVisibility": "Actif",
                    "colonneDisplay": "Action Effectuée"
                },
                {
                    "id": 3,
                    "nomColonne": "structure.libelleStructure",
                    "nomVisibility": "Actif",
                    "colonneDisplay": "Structure"
                }
                ,
                {
                    "id": 4,
                    "nomColonne": "date",
                    "nomVisibility": "Actif",
                    "colonneDisplay": "Date"
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

