import { apiCall } from './api';

const URL = require('../Config/Config').Url;

export function getMailsList(param) {

    return new Promise((resolve, reject) => {
        return apiCall("get", URL + '/Bridge/Mails/listMails/' + param, null).then(
            (res) => {
                console.log("la liste des emails est " + res);
                resolve(res);
            })
            .catch(err => {
                reject(err);
            })
    })
}


export function sendMail(param, param1, param2, param3) {

    return new Promise((resolve, reject) => {
        return apiCall("post", URL + '/Bridge/Mails/envoiMail/' + param, {
            subject: param1,
            messageBody: param2,
            listmail: param3,
        }).then(
            (res) => {
                //console.log("le resultat dans sendMail est",+res)
                // console.log("le resultat dans sendMail est",+res.data)
                //console.log("le resultat dans sendMail est",+res.data.msg)
                resolve(res);

            })
            .catch(err => {
                reject(err);
            })
    })
} 
