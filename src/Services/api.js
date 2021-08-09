import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.trakt.tv/movies/'
});

export default api;