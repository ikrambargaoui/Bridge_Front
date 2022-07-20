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

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  signOut(e) {
    e.preventDefault()
    this.props.history.push('/login')
    localStorage.clear()
  }


  componentDidMount() {
    this.props.getUser()
  }

  componentWillReceiveProps(next) {
    if (next._user !== this.props._user) {
      if (localStorage.menu) {
        let _menu = localStorage.getItem("menu")
        this.setState({ navigation: { items: _menu }, ready: true })
      }
      else if (next._user) {
        let MenuByids = []
        let MenuByidsUnique = []
        for (let i = 0; i < next._user.user.roles.length; i++) {
          getMenu(next._user.user.roles[i].profile_id).then(data => { MenuByids.push(...data) })
            .catch(err => console.log(err))
        }

        setTimeout(() => {
          console.log('here: ', MenuByids);
          MenuByids.map(el =>
            (MenuByidsUnique.filter(e => (el.name === e.name)).length === 0) ? MenuByidsUnique.push(el) : ''
          )
          this.setState({ navigation: { items: MenuByidsUnique }, ready: true })
          localStorage.setItem("Menu", JSON.stringify(MenuByidsUnique))
          let menu = localStorage.getItem("Menu")
          console.log("menu unique: ", menu)
        }
          , 1500)
      }
    }
  }


  render() {
    if ((!this.state.navigation)) { return <div className="animated fadeIn pt-1 text-center">Loading...</div> }

    else {
      return (
        <div className="app">
          <AppHeader fixed>
            <Suspense fallback={this.loading()}>
              <DefaultHeader onLogout={e => this.signOut(e)} />
            </Suspense>
          </AppHeader>
          <div className="app-body">
            <AppSidebar fixed display="lg">
              <AppSidebarHeader />
              <AppSidebarForm />
              <Suspense>
                <AppSidebarNav navConfig={this.state.navigation} {...this.props} />
              </Suspense>
              <AppSidebarFooter />
              <AppSidebarMinimizer />
            </AppSidebar>
            <main className="main">
              <AppBreadcrumb appRoutes={routes} />
              <Container fluid>
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
