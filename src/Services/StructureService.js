import { apiCall } from './api';
const URL = require('../Config/Config').Url;


export function findAllStructureByCuti(param) {

    return new Promise((resolve, reject) => {
        return apiCall("get", URL + '/Bridge/Structure/findAllStructureByUserCode/' + param, null).then(
            (res) => {
                resolve(res);
                console.log(res)
            })
            .catch(err => {
                reject(err);
            })
    })
}


export function findAllStructure() {

    return new Promise((resolve, reject) => {
        return apiCall("get", URL + '/Bridge/Structure/findAllStructures', null).then(
            (res) => {
                resolve(res);
                console.log('test iooo', res)
            })
            .catch(err => {
                reject(err);
            })
    })
}




export function postStructure(data) {

    return new Promise((resolve, reject) => {
        return apiCall("post", URL + '/Bridge/Structure/addStructureUser', data).then(
            (res) => {
                resolve(res);
                console.log('post: ', res)
            })
            .catch(err => {
                reject(err);
            })
    })
}



export function deleteStructure(param, matricule) {

    return new Promise((resolve, reject) => {
        return apiCall("get", URL + '/Bridge/Structure/deleteStructure/' + param + '/' + matricule, null).then(
            (res) => {
                resolve(res);
                console.log('delete:', res)
            })
            .catch(err => {
                reject(err);
            })
    })
}

