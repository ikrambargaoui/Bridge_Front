import {apiCall} from './api';

const URL = require('../Config/Config').Url;

export function getCol() {
    return new Promise((resolve, reject) => {
        return apiCall('get', URL+'/Rest/Api/Colonnes/Allcolumns', null).then(
            res => {
                resolve(res);
            })
            .catch(err => {
                reject(err);
            })
    })
}




export function updateCol(id,vis) {
    return new Promise((resolve, reject) => {
        return apiCall('post', URL+'/Rest/Api/Colonnes/UpdateCol/'+id+'/'+vis, null).then(
            res => {
                resolve(res);
            })
            .catch(err => {
                reject(err);
            })
    })
}