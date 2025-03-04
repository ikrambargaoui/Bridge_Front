import { apiCall } from './api';

const URL = require('../Config/Config').Url;

export function getProfiles(id) {
    return new Promise((resolve, reject) => {
        return apiCall('get', URL + '/Bridge/profiles/findAllProfilsByUserId/' + id, null).then(
            res => {
                resolve(res);
            })
            .catch(err => {
                reject(err);
            })
    })
}




export function getAllProfiles() {
    return new Promise((resolve, reject) => {
        return apiCall('get', URL + '/Bridge/profiles/getAllProfiles', null).then(
            res => {
                resolve(res);
            })
            .catch(err => {
                reject(err);
            })
    })
}