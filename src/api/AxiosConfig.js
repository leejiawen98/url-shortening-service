import axios from 'axios';

const api = axios.create({
    baseURL: "https://url-shortening-service-backend.herokuapp.com"
});

export default api;