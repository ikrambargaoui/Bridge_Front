import React, { Component } from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import createCompressor from 'redux-persist-transform-compress';
import { PersistGate } from 'redux-persist/lib/integration/react';
import Loadable from 'react-loadable';
import './App.scss';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser } from './Store/Actions/auth';

// Import the store from your store configuration
import store from './Store/store'; // Make sure this path is correct!

// Import components
import PrivateRoute from "./private-route/PrivateRoute";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  const token = localStorage.jwtToken;
  setAuthToken(token);
  store.dispatch(setCurrentUser(token));
} else {
  // Logout user if no token is found
  // store.dispatch(logout()); // Uncomment if you want a specific logout action
  // window.location.href = "./login";
}

const loading = () => <div className="animated fadeIn pt-3 text-center">Chargement...</div>;

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

const Page404 = Loadable({
  loader: () => import('./views/Pages/Page404'),
  loading
});

const Page500 = Loadable({
  loader: () => import('./views/Pages/Page500'),
  loading
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: true,
      redirectToLogin: false
    };


  }



  logout = () => {
    localStorage.removeItem('jwtToken'); // Remove token from localStorage
    setAuthToken(false); // Remove token from the request header
    this.setState({
      isLoggedIn: false,
      redirectToLogin: true
    });
  };

  render() {
    const { redirectToLogin } = this.state;

    // If the user should be redirected to login
    if (redirectToLogin) {
      return <Redirect to="/login" />;
    }

    const compressor = createCompressor();
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
