import axios from 'axios'
import {apiCall} from './api'
const URL = require('../Config/Config').Url;


export function findDevise() {

    return new Promise((resolve, reject) => {
     
        return apiCall('get',URL + '/Rest/Api/Bknom/getDevises').then(
            (res) => {
                resolve(res);
            })
            .catch(err => {
                reject(err);
            })
    })
}
export function ViewAPdf(id) {

    return new Promise((resolve, reject) => {
     
        return apiCall('get',URL + '/Rest/Api/Documents/download/' + id,{responseType: 'blob' }).then(
            (res) => {
                resolve(res);
            })
            .catch(err => {
                reject(err);
            })
    })
}


export function DownloadAPdf(id) {

    return new Promise((resolve, reject) => {
        let token = localStorage.getItem('jwtToken')
        var headers = {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + token
        }
        return axios({
            url: URL + '/Rest/Api/Documents/download/' + id,
            method: 'get',
            responseType: 'blob',
            headers: headers,

        }).then(
            (res) => {
                resolve(res);
            })
            .catch(err => {
                reject(err);
            })
    })
}


export function findDocByKeyWords(data) {

    return new Promise((resolve, reject) => {
        //return apiCall("post", URL + '/Rest/Api/Documents/findDocumentByKeyWordsTEST', data).then(
            return apiCall("post", URL + '/Rest/Api/Documents/DocumentByKeyWords', data).then(
            (res) => {
                resolve(res);
            })
            .catch(err => {
                reject(err);
            })
    })
} 


export function removeADocument (param) {

    return new Promise((resolve, reject) => {
        return apiCall("get", URL + '/Rest/Api/Documents/deleteDocument/' + param, null).then(
            (res) => {
                resolve(res);
            })
            .catch(err => {
                reject(err);
            })
    })
} 
