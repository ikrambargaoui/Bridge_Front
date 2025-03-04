import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
//import jwt_decode from "jwt-decode";
import { ADD_ERROR, REMOVE_ERROR, SET_CURRENT_USER } from "./actionTypes";

const URL = require('../../Config/Config').Url;


// Login - get user token
export const authUser = userData => dispatch => {
    axios
        .post(URL + "/Bridge/appuser/signIn", userData)
        .then(res => {
            // Save to localStorage
            // Set token to localStorage
            const { accessToken, ...user } = res.data;
            localStorage.setItem("jwtToken", accessToken);
            // Set token to Auth header
            setAuthToken(user);
            // Decode token to get user datay
            //const decoded = jwt_decode(token);
            // Set current user
            dispatch(setCurrentUser(accessToken));
        })
        .catch(err =>
            dispatch({
                type: ADD_ERROR,
                error: err.response
            })
        );
};


// Set logged in user
export const setCurrentUser = (accessToken) => {
    return {
        type: SET_CURRENT_USER,
        accessToken
    };
};


// Log user out
export const logout = () => dispatch => {
    // Remove token from local storage
    localStorage.removeItem("jwtToken");
    localStorage.clear();
    // Remove auth header for future requests
    setAuthToken(false);
    // Set current user to empty object {} which will set isAuthenticated to false
    dispatch(setCurrentUser({}))
    document.location.reload(true)
};