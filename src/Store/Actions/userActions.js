import axios from "axios";
import { GET_USER } from "./actionTypes";
const URL = require('../../Config/Config').Url;

export const getUser = () => dispatch => {
    const token = localStorage.getItem('jwtToken');
    var headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    }
    axios.get(URL + '/Bridge/appuser/findUserByUserCode', { headers: headers })
        .then(res => {
            console.log("user By code: ", res)
            dispatch({
                type: GET_USER,
                user: {
                    firstName: res.data.appUserFirstName,
                    lastName: res.data.appUserLastName,
                    roles: res.data.roles//[0].profile_id
                }
            })
        }
        )
        .catch(err => console.log(err))
}



