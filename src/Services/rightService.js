import { apiCall } from './api';

const URL = require('../Config/Config').Url;

export function getRights(id) {
    return new Promise((resolve, reject) => {
        return apiCall('get', URL + '/Bridge/RightProfiles/findAllRightsByProfileId/' + id, null).then(
            res => {
                resolve(res);
            })
            .catch(err => {
                reject(err);
            })
    })
}




export function deleteRightFromProfile(param1, param2) {
    return new Promise((resolve, reject) => {
        return apiCall('get', URL + '/Bridge/RightProfiles/deleteRightProfile/' + param1 + '/' + param2, null).then(
            res => {
                resolve(res);
            })
            .catch(err => {
                reject(err);
            })
    })
}



export function AddRightToProfile(data) {
    return new Promise((resolve, reject) => {
        return apiCall('post', URL + '/Bridge/RightProfiles/addProfileRight', data).then(
            res => {
                console.log("le res est " + res)
                resolve(res);
            })
            .catch(err => {
                reject(err);
            })
    })
}
