import { apiCall } from './api';
const URL = require('../Config/Config').Url;

export function getMenu(param) {

    return new Promise((resolve, reject) => {
        return apiCall("get", URL + '/Rest/Api/Menu/getMenuByProfile/' + param, null).then(
            (res) => {
                resolve(res);
            })
            .catch(err => {
                reject(err);
            })
    })
} 