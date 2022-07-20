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


import Switch from "react-switch";


import { getCol } from '../../Services/columnService';

class Configcol extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            ready: false,
            details: [],
            cols: null,
            matricule: '',

           // checked: false

        }

       
       // this.handleChange = this.handleChange.bind(this);
    

    }



   /*  handleChange(checked) {
        this.setState({ checked });
      } */

      
    componentDidMount() {
        getCol().then(res => {
            this.setState({
                data: res
            });
        }).catch(err => console.log('hr:', err))

    }

    render() {
        const name = "GestionColonnes";
        const displayName="Configuration des colonnes";
        const details =
            [
                {
                    "id": 1,
                    "nomColonne": "colonneDisplay",
                    "nomVisibility": "Actif",
                    "colonneDisplay": "Titre"
                },
                {
                    "id": 2,
                    "nomColonne": "nomVisibility",
                    "nomVisibility": "Actif",
                    "colonneDisplay": "Visibilité"
                }
            ];

        if (!this.state.data.length > 0) {
            return (
                <Col md="12">
                    <Card className="main-card mb-3">
                        <CardBody>

                            <span>Loading...</span>
                        </CardBody>
                    </Card>
                </Col>
            )
        }
        else return (
            <Col md="12">
                {!(this.props.roles.filter(el => el.profile_id === 2).length > 0) ? <Redirect to='/Dashboard' /> :
                    <Card className="main-card mb-3">
                        <CardBody>

                            <SearchTable
                                details={details}
                                data={this.state.data}
                                ComponentName={name}
                                DisplayComponentName={displayName}
                            />
                        </CardBody>
                        {/* <label htmlFor="normal-switch">
        <span>Switch with default style</span>
        <Switch
          onChange={this.handleChange}
          checked={this.state.checked}
          id="normal-switch"
        />
      </label> */}
                    </Card>
                }
            </Col>
        )
    }
}


const mapStateToProps = state => ({
    roles: state.userInfo.user.roles
})

export default connect(mapStateToProps)(Configcol);
