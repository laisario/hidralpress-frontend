import _axios from 'axios'

const axios = _axios.create({
    // baseURL: 'http://192.168.0.6:8000/',
    baseURL: 'https://4ba1-177-71-79-40.ngrok-free.app',
    withCredentials: false,
    headers: {
        'Content-Type': 'multipart/form-data',
        'ngrok-skip-browser-warning': true,
    }
});

export default axios