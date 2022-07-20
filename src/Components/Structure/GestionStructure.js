import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { } from '../Common/pagination.scss'
import { } from '../Tables/example.scss';
import { } from '../Tables/lib/styles.css';
import SearchTable from '../Common/table';
import { findAllStructureByCuti } from '../../Services/StructureService'
import {
  Col,
  Card,
  CardBody,

} from 'reactstrap';
import UserInformation from '../Common/UserInformation';
import { getAllUsers } from '../../Services/userService';

class GestionStructure extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      users: [],
      ready: false,
      details: null,
      cols: null,
      matricule: '',
      isHiddenState: false,
      update: true

    }
  }

  componentDidMount() {
    getAllUsers().then(res => {

      var output = [];
      for (var i = 0; i < res.length; ++i)
        output.push(res[i].appUserCode);
      this.setState({ users: output });
      console.log('res', output)
    }).catch(err => console.log('hr:', err))
  }


  triggerHiddenState = (param) => {
    if (param == null) {
      this.setState({
        isHiddenState: false
      });

    } else {
      this.setState({
        isHiddenState: true
      });
      findAllStructureByCuti(param)
        .then((response) => {
          this.setState({
            data: response,
            matricule: param
          });
        })
        .catch((error) => {
          alert(error)
        })
    }



  }



  modified = (mod) => {

    if (mod === true) {
      findAllStructureByCuti(this.state.matricule)
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


  componentDidUpdate(prevProps, prevState) {
    if (this.state.update && this.state.data !== prevState.data) {
      findAllStructureByCuti(this.state.matricule).then(res =>
        this.setState({
          data: res,
          update: false
        }))
    }
  }





  render() {
    const name = "GestionStructure";
    const details =
      [
        {
          "id": 3,
          "nomColonne": "libelleStructure",
          "nomVisibility": "Actif",
          "colonneDisplay": "Libelle Structure"
        }
      ];

    return (
      <Col md="12">
        {!(this.props.roles.filter(el => el.profile_id === 2).length > 0) ? <Redirect to='/Dashboard' /> :
          <Card className="main-card mb-3">
            <CardBody>
              <UserInformation hiddenState={this.triggerHiddenState} users={this.state.users}></UserInformation>
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

export default connect(mapStateToProps)(GestionStructure);
