import { apiCall } from './api';
import axios from 'axios';
const URL = require('../Config/Config').Url;


export function FindALLEtatHabilitationByCuti(param) {

    return new Promise((resolve, reject) => {
        return apiCall("get", URL + '/Bridge/Habilitations/GetALLEtatHabilitationByCuti/' + param, null).then(
            (res) => {
                resolve(res);
            })
            .catch(err => {
                reject(err);
            })
    })
}



export function postEtatHabilitation(data) {

    return new Promise((resolve, reject) => {
        return apiCall("post", URL + '/Bridge/Habilitations/postEtatHabilitation', data).then(
            (res) => {
                resolve(res);
                console.log(res)
            })
            .catch(err => {
                reject(err);
                console.log(err)
            })
    })
}



export function deleteRowHabilitation(matricule, param) {
    const token = localStorage.getItem('jwtToken');
    var headers = {
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + token,
        'Access-Control-Allow-Origin': '*'
    }
    return new Promise((resolve, reject) => {
        return axios.get(URL + '/Bridge/Habilitations/deleteEtatHabilitation/' + matricule + '/' + param, { headers }).then(
            (res) => {
                resolve(res);
            })
            .catch(err => {
                reject(err);
            })
    })
} 
