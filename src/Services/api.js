import axios from 'axios'

export function apiCall(method, path, data) {
  

    return new Promise((resolve, reject) => {
        let token = localStorage.getItem("jwtToken")
        axios.defaults.headers.common['Authorization'] = "Bearer " + token;
        axios.defaults.headers.post['Content-Type'] = 'application/json';
        return axios[method](path, data).then(res => {
            return resolve(res.data)
        }).catch(err => {
            // return reject(err.response.data.error)
            return reject(err)
        });
    });
}