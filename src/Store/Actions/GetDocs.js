import axios from "axios";

import { GET_DOCUMENTS } from "./actionTypes";
const URL = require('../../Config/Config').Url;

export const getDocsOfUser = () => dispatch => {

    const token = localStorage.getItem('jwtToken');
    var headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    }
    axios.get(URL+'/Rest/Api/Documents/documentsByProfile', { headers: headers })
        .then(res => {
            dispatch({
                type: GET_DOCUMENTS,
                docs: res.data
            });
        })
        .catch(err => alert(err))

}

