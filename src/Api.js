import axios from 'axios';
const api = axios.crate({
    baseURL: 'https://projetolistacarro.herokuaap.com',
});
export default api;