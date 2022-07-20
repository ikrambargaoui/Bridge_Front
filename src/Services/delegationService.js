

import { apiCall } from './api';

const URL = require('../Config/Config').Url;


export function AddDelegation(param1, param2, param3) {
    return new Promise((resolve, reject) => {
        return apiCall('post', URL + '/Rest/Api/Delegations/AddDelegation', {
            delegueCode: param1,
            dateDebDelegation: param2,
            dateFinDelegation: param3,
        }).then(
            res => {
                console.log("je suis dans l api"+res.msg)
                resolve(res);
                console.log("this is the resulat" + res)
            })
            .catch(err => {
                reject(err);
            })
    })
}




export function DelegationsOut() {
    return new Promise((resolve, reject) => {
        return apiCall('get', URL + '/Rest/Api/Delegations/DelegationsOut', null).then(
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
        return apiCall('get', URL + '/Rest/Api/Delegations/DelegationsIn', null).then(
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
        return apiCall("get", URL + '/Rest/Api/Delegations/DeleteDelegation/' + param, null).then(
            (res) => {
                resolve(res);
            })
            .catch(err => {
                reject(err);
            })
    })
} 