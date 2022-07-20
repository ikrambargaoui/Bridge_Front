import axios from "axios";
import { GET_COLUMN_CONFIG } from "./actionTypes";

const URL = require('../../Config/Config').Url;

export const getColumns = () => dispatch => {
    let token = localStorage.getItem("jwtToken")
    var headers = {
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + token,
        'Access-Control-Allow-Origin': '*'
    }

    axios.get(URL + '/Rest/Api/Colonnes/colonne/Actif', { headers: headers })
        .then(response => {
            dispatch({
                type: GET_COLUMN_CONFIG,
                cols: response.data
            })
        })
        .catch((error) => {
            console.log(error)
        })

}