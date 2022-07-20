import { apiCall } from './api';
const URL = require('../Config/Config').Url;

export function getUserInformation(param) {

    return new Promise((resolve, reject) => {
        return apiCall("get", URL + '/Rest/Api/User/GetUserInformationByCuti/' + param, null).then(
            (res) => {
                resolve(res);
            })
            .catch(err => {
                reject(err);
            })
    })
} 





export function getAllUsers() {

    return new Promise((resolve, reject) => {
        return apiCall("get", URL + '/Rest/Api/appuser/findAllUsers', null).then(
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
        return apiCall('get',  URL + '/Rest/Api/Structure/findStructureByUser',null).then(
            (res) => {
                resolve(res);
            })
            .catch(err => {
                reject(err);
            })
    })
} 


