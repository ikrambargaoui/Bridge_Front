import { apiCall } from './api';
const URL = require('../Config/Config').Url;

export function getUserInformation(param) {

    return new Promise((resolve, reject) => {
        return apiCall("get", URL + '/Bridge/User/GetUserInformationByCuti/' + param, null).then(
            (res) => {
                console.log('result get user', res)
                resolve(res);
            })
            .catch(err => {
                reject(err);
            })
    })
}


export function changeStateUser(id, etat) {

    return new Promise((resolve, reject) => {
        return apiCall("get", URL + '/Bridge/appuser/updateUserStatus/' + id + '/' + etat, null).then(
            (res) => {
                console.log('ress', res)
                resolve(res);
            })
            .catch(err => {
                reject(err);
            })
    })
}


export function findUserInformationByCode(param) {

    return new Promise((resolve, reject) => {
        return apiCall("get", URL + '/Bridge/appuser/findUserByCode/' + param, null).then(
            (res) => {
                console.log('ress', res)
                resolve(res);
            })
            .catch(err => {
                reject(err);
            })
    })
}



export function findUserInformationById(param) {

    return new Promise((resolve, reject) => {
        return apiCall("get", URL + '/Bridge/appuser/findUserById/' + param, null).then(
            (res) => {
                console.log('ress', res)
                resolve(res);
            })
            .catch(err => {
                reject(err);
            })
    })
}





export function getAllUsers() {

    return new Promise((resolve, reject) => {
        return apiCall("get", URL + '/Bridge/appuser/findAllUsers', null).then(
            (res) => {
                resolve(res);
            })
            .catch(err => {
                reject(err);
            })
    })
}


export function getMoreInformationAboutUser() {
    return new Promise((resolve, reject) => {
        return apiCall('get', URL + '/Bridge/Structure/findStructureByUser', null).then(
            (res) => {
                resolve(res);
            })
            .catch(err => {
                reject(err);
            })
    })
}

export function addUser(data) {

    return new Promise((resolve, reject) => {
        //return apiCall("post", URL + '/Bridge/Documents/findDocumentByKeyWordsTEST', data).then(
        return apiCall("post", URL + '/Bridge/appuser/addUser', data).then(
            (res) => {
                resolve(res);
            })
            .catch(err => {
                reject(err);
            })
    })
}

export function updatePassword(data) {

    return new Promise((resolve, reject) => {
        //return apiCall("post", URL + '/Bridge/Documents/findDocumentByKeyWordsTEST', data).then(
        return apiCall("post", URL + '/Bridge/appuser/updatePassword', data).then(
            (res) => {
                resolve(res);
            })
            .catch(err => {
                reject(err);
            })
    })
}


export function updateUserByAdmin(data) {



    return new Promise((resolve, reject) => {
        //return apiCall("post", URL + '/Bridge/Documents/findDocumentByKeyWordsTEST', data).then(
        return apiCall("post", URL + '/Bridge/appuser/updateUserByAdmin', data).then(
            (res) => {
                resolve(res);
            })
            .catch(err => {
                reject(err);
            })
    })
} 




// AJOUT : récupérer les profils d’un utilisateur par son CUTI (appUserCode)
export function findUserProfiles(cuti) {
    return new Promise((resolve, reject) => {
        return apiCall("get", URL + '/Bridge/appuser/findUserProfiles/' + cuti, null).then(
            (res) => {
                resolve(res);
            })
            .catch(err => {
                reject(err);
            })
    })
}
