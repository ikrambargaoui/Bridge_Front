import React, { Component } from 'react'
import { connect } from 'react-redux'
import { } from '../Common/pagination.scss'
import axios from 'axios';

import { getUser } from '../../Store/Actions/userActions'
import { getDocsOfUser } from '../../Store/Actions/GetDocs'
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

import { DelegationsOut } from '../../Services/delegationService';


export default class delegation extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            ready: false,
            details: null,
            cols: null,
            matricule: '',
            clicked: false,
            update: true

        }
    }


    componentDidMount() {
        DelegationsOut()
            .then(res => {
                this.setState({ data: res });
            })
            .catch(err => console.log('hr:', err))
    }


    handleClick = (param) => {
        console.log("clicked?: ", param)
        if (param === true) {
            DelegationsOut()
                .then(res => {
                    this.setState({
                        data: res,
                        update: true
                    })
                })
                .catch(err => console.log('hr:', err))
        }
    }

    componentWillUpdate(nextProps, nextState) {
        if (this.state.update && this.state.data !== nextState.data) {
            DelegationsOut().then(res =>
                this.setState({
                    data: res,
                    update: false
                }))
        }
    }


    modified = (mod) => {
        if (mod === true) {
            DelegationsOut()
                .then(res => {
                    this.setState({
                        data: res,
                        update: true
                    })
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }



    render() {
        const name = "GestionDelegation";
        const displayName = "Mes délégations effectuées";
        const icon = "fa fa-th-list";
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
                    "nomColonne": "delegueNom",
                    "nomVisibility": "Actif",
                    "colonneDisplay": "Delegué"
                }
            ];

       /*  if (!this.state.data.length > 0) {
            return (
                <Col md="12">
                    <Card className="main-card mb-3">
                        <CardBody>
                            <GestionDelegation />
                            <span>Loading...</span>
                        </CardBody>
                    </Card>
                </Col>
            )
        }
        else */ return (
            <Col md="12">
                <Card className="main-card mb-3">
                    <CardBody>
                        <GestionDelegation click={(parap) => this.handleClick(parap)} />
                        <SearchTable
                            details={details}
                            modification={this.modified}
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
