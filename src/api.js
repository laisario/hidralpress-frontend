import _axios from 'axios'

const axios = _axios.create({
    // baseURL: 'http://192.168.0.6:8000/',
    baseURL: 'https://5ece-189-84-180-54.ngrok-free.app',
    // baseURL: 'http://192.168.0.1:8000/',
    withCredentials: false,
    headers: {
        'Content-Type': 'multipart/form-data',
        'ngrok-skip-browser-warning': true,
    }
});

export default axios