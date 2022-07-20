import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { } from '../Common/pagination.scss'
import { FindALLEtatHabilitationByCuti } from '../../Services/HabilitationServices'
import { } from '../Tables/example.scss';
import { } from '../Tables/lib/styles.css';
import SearchTable from '../Common/table'
import {
    Col,
    Card,
    CardBody,

} from 'reactstrap';
import UserInformation from '../Common/UserInformation';

class GestionHabilitation extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            ready: false,
            details: null,
            cols: null,
            matricule: '',
            isHiddenState: false,
            update: true
        }
    }


    triggerHiddenState = (param) => {
        if(param == null){
          this.setState({
            isHiddenState: false
          });
         
        }else{
          this.setState({
            isHiddenState: true
          });
          FindALLEtatHabilitationByCuti(param)
          .then((response) => {
              this.setState({
                  data: response,
                  matricule: param
              });
          })
          .catch((error) => { console.log(error) })
        }
       
        
    
      }
    
   


    modified = (mod) => {
        if (mod === true) {
            FindALLEtatHabilitationByCuti(this.state.matricule)
                .then(res => {
                    this.setState({
                        data: res,
                        update: true
                    })
                })
                .catch((error) => { console.log(error) })
        }
    }


    componentWillUpdate(nextProps, nextState) {
        if (this.state.update && this.state.data !== nextState.data) {
            FindALLEtatHabilitationByCuti(this.state.matricule).then(res =>
                this.setState({
                    data: res,
                    update: false
                }))
        }
    }



    render() {
        const name = "GestionHabilitation";
        const details =
            [
                {
                    "id": 3,
                    "nomColonne": "code",
                    "nomVisibility": "Actif",
                    "colonneDisplay": "Code"
                }
            ];

        return (
            <Col md="12">
                {!(this.props.roles.filter(el => el.profile_id === 2).length > 0) ? <Redirect to='/Dashboard' /> :
                    <Card className="main-card mb-3">
                        <CardBody>
                            <UserInformation hiddenState={this.triggerHiddenState}></UserInformation>
                            {this.state.isHiddenState && <SearchTable
                                modification={this.modified}
                                details={details}
                                data={this.state.data}
                                ComponentName={name}
                                matricule={this.state.matricule}
                            />}
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

export default connect(mapStateToProps)(GestionHabilitation);
