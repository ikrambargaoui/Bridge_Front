import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Badge, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem, NavLink } from 'reactstrap';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import { apiCall } from '../../../Services/api'

import { logout } from '../../../Store/Actions/auth'
import { AppAsideToggler, AppHeaderDropdown, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../../assets/img/brand/logo_bridge.png'
import sygnet from '../../../assets/img/brand/sygnet.png'

import {getMoreInformationAboutUser} from '../../../Services/userService'


const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dataAgence: {}
    }
  }
  componentDidMount() {
    getMoreInformationAboutUser()
      .then(data => this.setState({ dataAgence: data }))
      .catch(err => console.error)
  }



  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment><AppSidebarToggler className="d-lg-none" display="md" mobile />

        <AppSidebarToggler className="d-lg-none" display="md" mobile />

        <AppNavbarBrand
          // full={{ src: logo, width: 89, height: 25, alt: 'CoreUI Logo' }}

          full={{ src: logo, width: 100, height: 30, alt: 'UIB Logo' }}
          // minimized={{ src: sygnet, width: 30, height: 30, alt: 'CoreUI Logo' }}

          minimized={{ src: sygnet, width: 50, height: 50, alt: 'UIB Logo' }}
        />
        <AppSidebarToggler className="d-md-down-none" display="lg" />

        <Nav className="d-md-down-none" >
          {/*<NavItem className="px-3">
            <Link to="/" className="nav-link" >Dashboard</Link>
          </NavItem>*/}

          {/*
          <NavItem className="px-3">
            <Link to="/users">Users</Link>
          </NavItem>
          <NavItem className="px-3">
            <NavLink href="#">Settings</NavLink>
          </NavItem>
          */}
        </Nav>
        <Nav className="ml-auto" navbar>

          { /*<NavItem className="d-md-down-none">
            <

  NavLink href="#"><i className="icon-bell"></i><Badge pill color="danger">5</Badge></NavLink>
    </NavItem> 

          <NavItem className="d-md-down-none">
            <NavLink href="#"><i className="icon-list"></i></NavLink>
          </NavItem>
          <NavItem className="d-md-down-none">
            <NavLink href="#"><i className="icon-location-pin"></i></NavLink>
          </NavItem>
          */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

            <div style={{ color: '#be0b0b', display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0px 20px' }}>
              {/* <div style={{ color: 'black' }}>
                Utilisateur: </div> */}
              {this.props.user.user.lastName} {this.props.user.user.firstName}
            </div>
|
            <div style={{ color: '#be0b0b', display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0px 20px' }}>
              {/* <div style={{ color: 'black' }}>
                Agence:</div> */}
              {this.state.dataAgence.libelleStructure}
            </div>
|
            <div style={{ color: '#be0b0b', display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0px 20px' }}>
              {/* <div style={{ color: 'black' }}>
                code Structure:</div> */}
              {this.state.dataAgence.codeStructure}
            </div>

          </div>

          <AppHeaderDropdown direction="down">

            <DropdownToggle nav>
              <img src={'./assets/img/avatars/logout.png'} className="img-avatar" alt="USER" />
            </DropdownToggle>

            <DropdownMenu right style={{ right: 'auto' }}>
              <DropdownItem onClick={this.props.logout}><i className="fa fa-lock"></i> Logout</DropdownItem>
            </DropdownMenu>


          </AppHeaderDropdown>

        </Nav>
        {/*
        <AppAsideToggler className="d-md-down-none" />
        <AppAsideToggler className="d-lg-none" mobile />
      */}
        {this.props.user.firstName}
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

const mapStateToProps = state => ({
  auth: state.currentUser.isAuthenticated,
  user: state.userInfo
});


export default connect(mapStateToProps, { logout })(DefaultHeader);