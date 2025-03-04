import React, { Component } from 'react'
import { } from '../Common/pagination.scss'
import { } from '../Tables/example.scss';
import { } from '../Tables/lib/styles.css';
import SearchTable from '../Common/table'
import {
    Col,
    Card,
    CardBody,
    Button,
    Row

} from 'reactstrap';
import { getAllUsers } from '../../Services/userService';


export default class ListUser extends Component {
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
        getAllUsers().then((response) => {
            this.setState({
                data: response
            }, console.log('List users : ', response));
        })
            .catch((error) => {
                alert(error)
            })

    }







    render() {
        const name = "ListUser";
        const displayName = "Liste des utilisateur";
        const icon = "fa fa-th-list";
        const details =
            [
                {
                    "id": 1,
                    "nomColonne": "appUserCode",
                    "nomVisibility": "Actif",
                    "colonneDisplay": "Code utilisateur"
                },
                {
                    "id": 2,
                    "nomColonne": "appUserFirstName",
                    "nomVisibility": "Actif",
                    "colonneDisplay": "Prénom"
                },
                {
                    "id": 3,
                    "nomColonne": "appUserLastName",
                    "nomVisibility": "Actif",
                    "colonneDisplay": "Nom"
                },
                {
                    "id": 4,
                    "nomColonne": "appUserEmail",
                    "nomVisibility": "Actif",
                    "colonneDisplay": "Email"
                }
                ,
                {
                    "id": 5,
                    "nomColonne": "appUserState",
                    "nomVisibility": "Actif",
                    "colonneDisplay": "Statut du compte"
                }

            ];

        return (
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
        )
    }
}

