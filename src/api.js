import _axios from 'axios'

const axios = _axios.create({
    baseURL: 'http://localhost:8000/',
    withCredentials: false,
    headers: {
        'Content-Type': 'multipart/form-data'
    }
});

export default axios