import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/test', // NestJS base URL
});

export default {
  getData() {
    return api.get('/data');  // Endpoint from NestJS API
  }
};
