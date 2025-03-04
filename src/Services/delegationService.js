

import { apiCall } from './api';

const URL = require('../Config/Config').Url;


export function AddDelegation(param1, param2, param3) {

    const token = localStorage.getItem('jwtToken');
    var headers = {
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + token,
        'Access-Control-Allow-Origin': '*'
    }

    return new Promise((resolve, reject) => {
        return apiCall('post', URL + '/Bridge/Delegations/AddDelegation', {
            delegueCode: param1,
            dateDebDelegation: param2,
            dateFinDelegation: param3
        }, { headers }
        ).then(
            res => {

                resolve(res);

            })
            .catch(err => {
                reject(err);
            })
    })
}




export function DelegationsOut() {
    return new Promise((resolve, reject) => {
        return apiCall('get', URL + '/Bridge/Delegations/DelegationsOut', null).then(
            res => {
                resolve(res);
            })
            .catch(err => {
                reject(err);
            })
    })
}






export function DelegationsIn() {
    return new Promise((resolve, reject) => {
        return apiCall('get', URL + '/Bridge/Delegations/DelegationsIn', null).then(
            res => {
                resolve(res);
            })
            .catch(err => {
                reject(err);
            })
    })
}



export function DeleteDelegation(param) {

    return new Promise((resolve, reject) => {
        return apiCall("get", URL + '/Bridge/Delegations/DeleteDelegation/' + param, null).then(
            (res) => {
                resolve(res);
            })
            .catch(err => {
                reject(err);
            })
    })
} 