import axios from 'axios';

const token = '';

const api = axios.create({
  baseURL: 'https://api.github.com',
});

if (token) {
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
}

export default api;
