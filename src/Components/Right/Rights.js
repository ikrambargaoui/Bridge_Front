import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { } from '../Common/pagination.scss'
import { } from '../Tables/example.scss';
import { } from '../Tables/lib/styles.css';
import SearchTable from '../Common/table'
import {
    Col,
    Card,
    CardBody,
} from 'reactstrap';

import { getAllProfiles } from '../../Services/profileService';


class Rights extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            ready: false,
            details: null,
            cols: null,
            matricule: '',

        }
    }


    componentDidMount() {
        getAllProfiles().then(res => {
            this.setState({ data: res });
        }).catch(err => console.log('hr:', err))
    }


    render() {
        const name = "AllProfils";
        const displayName = "Gestion des profils";
        const icon = "fa fa-th-list";
        const details =
            [
                {
                    "id": 2,
                    "nomColonne": "profileId",
                    "nomVisibility": "Actif",
                    "colonneDisplay": "L'id du profile"
                },
                {
                    "id": 3,
                    "nomColonne": "profileName",
                    "nomVisibility": "Actif",
                    "colonneDisplay": "Nom du profile"
                },


                {
                    "id": 3,
                    "nomColonne": "profileDescription",
                    "nomVisibility": "Actif",
                    "colonneDisplay": "Description du profile"
                }
            ];

        /*  if (!this.state.data.length>0) {
             return (
                 <Col md="12">
                     <Card className="main-card mb-3">
                         <CardBody>
                            
                             <span>Loading...</span>
                         </CardBody>
                     </Card>
                 </Col>
             )
         } */
        return (
            <Col md="12">
                {!(this.props.roles.filter(el => el.profile_id === 2).length > 0) ? <Redirect to='/Dashboard' /> :
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
                }
            </Col>
        )
    }
}


const mapStateToProps = state => ({
    roles: state.userInfo.user.roles
})

export default connect(mapStateToProps)(Rights);