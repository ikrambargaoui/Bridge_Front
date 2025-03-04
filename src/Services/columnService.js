import { apiCall } from './api';

const URL = require('../Config/Config').Url;

export function getCol() {
    return new Promise((resolve, reject) => {
        return apiCall('get', URL + '/Bridge/Colonnes/Allcolumns', null).then(
            res => {
                resolve(res);
            })
            .catch(err => {
                reject(err);
            })
    })
}




export function updateCol(id, vis) {
    return new Promise((resolve, reject) => {
        return apiCall('post', URL + '/Bridge/Colonnes/UpdateCol/' + id + '/' + vis, null).then(
            res => {
                resolve(res);
            })
            .catch(err => {
                reject(err);
            })
    })
}