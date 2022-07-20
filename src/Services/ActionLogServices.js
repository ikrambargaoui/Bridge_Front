
import { apiCall } from './api';
const URL = require('../Config/Config').Url;


export function getActions(param) {

    return new Promise((resolve, reject) => {
        return apiCall("get", URL + '/Rest/Api/Actions/getActions', null).then(
            (res) => {
                resolve(res);
            })
            .catch(err => {
                reject(err);
            })
    })
}