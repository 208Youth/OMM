import axios from 'axios';

axios.defaults.withCredentials = false;

export default axios.create({
  baseURL: 'http://localhost:8080/api/chat',
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
    'Access-Control-Allow-Origin': '*',
  },
});
