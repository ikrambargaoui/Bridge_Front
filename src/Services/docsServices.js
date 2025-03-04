import axios from 'axios'
import { apiCall } from './api'
const URL = require('../Config/Config').Url;


export function findDevise() {

    return new Promise((resolve, reject) => {

        return apiCall('get', URL + '/Bridge/Bknom/getDevises').then(
            (res) => {
                resolve(res);
            })
            .catch(err => {
                reject(err);
            })
    })
}

export function findTypes() {

    return new Promise((resolve, reject) => {

        return apiCall('get', URL + '/Bridge/Documents/docsTypes').then(
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

        return apiCall('get', URL + '/Bridge/Documents/consult/' + id, { responseType: 'blob' }).then(
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
            url: URL + '/Bridge/Documents/download/' + id,
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


export function DownloadACsv(id) {

    return new Promise((resolve, reject) => {
        let token = localStorage.getItem('jwtToken')
        var headers = {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + token
        }
        return axios({
            url: URL + '/Bridge/Documents/downloadcsv/' + id,
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
        //return apiCall("post", URL + '/Bridge/Documents/findDocumentByKeyWordsTEST', data).then(
        return apiCall("post", URL + '/Bridge/Documents/DocumentByKeyWordsExtra', data).then(
            (res) => {
                if (res.length > 0) {
                    resolve(res.map((el) => {
                        return {
                            accountBranch: el.accountBranch,
                            accountDev: el.accountDev,
                            accountKey: el.accountKey,
                            accountNumber: el.accountNumber,
                            accountingDate: new Date(el.accountingDate).toLocaleDateString(),
                            accountingsSection: el.accountingsSection,
                            addressMailClient: el.addressMailClient,
                            clientAgency: el.clientAgency,
                            clientCode: el.clientCode,
                            editionAgency: el.editionAgency,
                            editionDate: new Date(el.editionDate).toLocaleDateString(),
                            editionTime: el.editionTime,
                            folderNumber: el.folderNumber,
                            key: el.key,
                            managerCode: el.managerCode,
                            operationCode: el.operationCode,
                            typeDocument: el.typeDocument,
                            fileNameOut: el.fileNameOut,
                            userCode: el.userCode,
                            ctosAccountNumber:el.ctosAccountNumber,
                            fileNameOutCsv:el.fileNameOutCsv,
                            pathOutCsv:el.pathOutCsv,
                            contentieux:el.contentieux

                        }

                    }));
                } else {
                    resolve(res)
                }

            })
            .catch(err => {
                reject(err);
            })
    })
}


export function removeADocument(param) {

    return new Promise((resolve, reject) => {
        return apiCall("get", URL + '/Bridge/Documents/deleteDocument/' + param, null).then(
            (res) => {
                resolve(res);
            })
            .catch(err => {
                reject(err);
            })
    })
} 
