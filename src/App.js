import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import {persistStore} from 'redux-persist';
import createCompressor from 'redux-persist-transform-compress'
import {PersistGate} from 'redux-persist/lib/integration/react';

import PrivateRoute from "./private-route/PrivateRoute";
// import { renderRoutes } from 'react-router-config';
import store from "./Store/store";
import Loadable from 'react-loadable';
import './App.scss';
import setAuthToken from './utils/setAuthToken';
import {setCurrentUser} from './Store/Actions/auth';



// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  store.dispatch(setCurrentUser(token));
  // Check for expired token
  //const currentTime = Date.now() / 1000; // to get in milliseconds
  //if (decoded.exp < currentTime) {
  // Logout user
  //store.dispatch(logout());
  // Redirect to login
  // window.location.href = "./login";
  // }
}
else {
  // Logout user
  //store.dispatch(logout());
  // Redirect to login
  //window.location.href = "./login";
}



const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

// Containers
const DefaultLayout = Loadable({
  loader: () => import('./Components/containers/DefaultLayout'),
  loading
});

// Pages
const Login = Loadable({
  loader: () => import('./Components/Login'),
  loading
});

//const Register = Loadable({
 // loader: () => import('./views/Pages/Register'),
  //loading
//});

const Page404 = Loadable({
  loader: () => import('./views/Pages/Page404'),
  loading
});

const Page500 = Loadable({
  loader: () => import('./views/Pages/Page500'),
  loading
});

class App extends Component {

  render() {
    const compressor = createCompressor() 
    const persistor = persistStore(store);
    return (
      <Provider store={store}>
      <PersistGate persistor={persistor}>
        <HashRouter>
          <Switch>
            <Route exact path="/login" name="Login Page" component={Login} />
            <Route exact path="/404" name="Page 404" component={Page404} />
            <Route exact path="/500" name="Page 500" component={Page500} />
            <PrivateRoute path="/" name="Home" component={DefaultLayout} />
          </Switch>
        </HashRouter>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
