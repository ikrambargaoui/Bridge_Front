import { apiCall } from './api';
const URL = require('../Config/Config').Url;


export function findAllStructureByCuti(param) {

    return new Promise((resolve, reject) => {
        return apiCall("get", URL + '/Rest/Api/Structure/findAllStructureByUserCode/'+param, null).then(
            (res) => {
                resolve(res);
                console.log(res)
            })
            .catch(err => {
                reject(err);
            })
    })
}


export function postStructure(data) {

    return new Promise((resolve, reject) => {
        return apiCall("post", URL + '/Rest/Api/Structure/addStructureUser', data).then(
            (res) => {
                resolve(res);
                console.log('post: ',res)
            })
            .catch(err => {
                reject(err);
            })
    })
}



export function deleteStructure( param,matricule) {

    return new Promise((resolve, reject) => {
        return apiCall("get", URL + '/Rest/Api/Structure/deleteStructure/' + param + '/' + matricule, null).then(
            (res) => {
                resolve(res);
                console.log('delete:',res)
            })
            .catch(err => {
                reject(err);
            })
    })
} 

