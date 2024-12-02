import _axios from 'axios'

const axios = _axios.create({
    // baseURL: 'http://192.168.0.6:8000/',
    baseURL: 'https://5ace-189-84-180-54.ngrok-free.app',
    withCredentials: false,
    headers: {
        'Content-Type': 'multipart/form-data'
    }
});

export default axios