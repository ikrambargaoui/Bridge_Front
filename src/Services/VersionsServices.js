import { apiCall } from './api';
const URL = require('../Config/Config').Url;




export function findLastVersion() {

    return new Promise((resolve, reject) => {
        return apiCall("get", URL + '/Bridge/Versions/findLastVersion', null).then(
            (res) => {
                resolve(res);
                console.log('version backend', res)
            })
            .catch(err => {
                reject(err);
            })
    })
}



