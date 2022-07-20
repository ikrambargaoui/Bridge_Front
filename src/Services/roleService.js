import {apiCall} from './api';


const URL = require('../Config/Config').Url;

export function AddRole(data) {
    return new Promise((resolve, reject) => {
        return apiCall('post', URL+'/Rest/Api/roles/addUserRole', data).then(
            res => {
                console.log("le res est "+res)
                resolve(res);
            })
            .catch(err => {
                reject(err);
            })
    })
}




export function DeleteRole(idUser,profile_id) {
    return new Promise((resolve, reject) => {
        return apiCall('get', URL+'/Rest/Api/roles/deleteRole/'+idUser+'/'+profile_id, null).then(
            res => {
                resolve(res);
            })
            .catch(err => {
                reject(err);
            })
    })
}