import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';
import { connect } from 'react-redux';
import { getMenu } from '../../../Services/MenuService'

import { getUser } from '../../../Store/Actions/userActions';
import {
  AppBreadcrumb,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav,
} from '@coreui/react';
// sidebar nav config


// routes config
import routes from '../../../routes';
import { } from './styles.css';

const DefaultAside = React.lazy(() => import('./DefaultAside'));
const DefaultFooter = React.lazy(() => import('./DefaultFooter'));
const DefaultHeader = React.lazy(() => import('./DefaultHeader'));



class DefaultLayout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      navigation: null,
      user: {}
    }
  }

  loading = () => <div className="animated fadeIn pt-1 text-center">Chargement...</div>

  signOut(e) {
    e.preventDefault()
    this.props.history.push('/login')
    localStorage.clear()
  }


  componentDidMount() {
    this.props.getUser()
  }


  /* STATISQUE MENU*/
  componentWillReceiveProps(next) {
    if (next._user !== this.props._user) {
      if (localStorage.menu) {
        let _menu = localStorage.getItem("menu")
        this.setState({ navigation: { items: _menu }, ready: true })
      }
      else if (next._user) {
        let menuFinal = []
        let roleAdmin = false
        for (let i = 0; i < next._user.user.roles.length; i++) {
          if (next._user.user.roles[i].profile_id === 2) {
            roleAdmin = true;
          }
        }
        if (roleAdmin) {
                  menuFinal = [{ "id": 0, "name": "Dashboard", "url": "/dashboard", "icon": "icon-speedometer", "children": null }, { "id": 0, "name": "Documents", "url": "/", "icon": "icon-folder", "children": [{ "id": 0, "name": "Recherche Ciblée", "url": "/RechercheCiblee", "icon": "icon-magnifier", "children": null }] }, { "id": 0, "name": "Délégations", "url": "/", "icon": "icon-folder", "children": [{ "id": 0, "name": "Déléguer docs", "url": "/delegation", "icon": "icon-magnifier", "children": null }, { "id": 0, "name": "Mes délégations", "url": "/MesDelegations", "icon": "icon-docs", "children": null }] }, { "id": 0, "name": "Administration", "url": "/", "icon": "icon-settings", "children": [{ "id": 0, "name": "Gestion des utilisateurs", "url": "/GestionUtilisateurAgence", "icon": "icon-wrench", "children": null }, { "id": 0, "name": "Gestion des Structures", "url": "/GestionStructure", "icon": "icon-magnifier", "children": null }, { "id": 0, "name": "Journal d'activités", "url": "/actionlog", "icon": "icon-magnifier", "children": null }] }]

        } else {

          menuFinal = [{ "id": 0, "name": "Dashboard", "url": "/dashboard", "icon": "icon-speedometer", "children": null }, { "id": 0, "name": "Documents", "url": "/", "icon": "icon-folder", "children": [{ "id": 0, "name": "Recherche Ciblée", "url": "/RechercheCiblee", "icon": "icon-magnifier", "children": null }] }, { "id": 0, "name": "Délégation", "url": "/", "icon": "icon-folder", "children": [{ "id": 0, "name": "Déléguer docs", "url": "/delegation", "icon": "icon-magnifier", "children": null }, { "id": 0, "name": "Mes délégations", "url": "/MesDelegations", "icon": "icon-docs", "children": null }] }]
       
        }
        this.setState({ navigation: { items: menuFinal }, ready: true })
      }
    }
  }



  render() {
    if ((!this.state.navigation)) { return <div className="animated fadeIn pt-1 text-center">Chargement...</div> }

    else {
      return (
        <div className="app">
          <AppHeader fixed>
            <Suspense fallback={this.loading()}>
              <DefaultHeader onLogout={e => this.signOut(e)} />
            </Suspense>
          </AppHeader>
          <div className="app-body">
            <AppSidebar fixed display="lg"  className="custom-sidebar" style={{backgroundColor:'#3d3d52'}}>
              <AppSidebarHeader />
              <AppSidebarForm />
              <Suspense>
                <AppSidebarNav className="custom-sidebar" navConfig={this.state.navigation} {...this.props} />
              </Suspense>
              <AppSidebarFooter />
              <AppSidebarMinimizer />
            </AppSidebar>
            <main className="main">
              <AppBreadcrumb appRoutes={routes} />
              <Container fluid >
                <Suspense fallback={this.loading()}>
                  <Switch>
                    {routes.map((route, idx) => {
                      return route.component ? (
                        <Route
                          key={idx}
                          path={route.path}
                          exact={route.exact}
                          name={route.name}
                          render={props => (
                            <route.component {...props} />
                          )} />
                      ) : (null);
                    })}
                    <Redirect from="/" to="/dashboard" />
                  </Switch>
                </Suspense>
              </Container>
            </main>
            {/* <AppAside fixed>
            <Suspense fallback={this.loading()}>
              <DefaultAside />
            </Suspense>
          </AppAside>
          */}
          </div>
          <AppFooter>
            <Suspense fallback={this.loading()}>
              <DefaultFooter />
            </Suspense>
          </AppFooter>
        </div>
      );
    }
  }
}
const mapStateToProps = state => ({
  _user: state.userInfo,
  document: state.Docs
})
export default connect(mapStateToProps, { getUser })(DefaultLayout);
