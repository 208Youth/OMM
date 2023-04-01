import axios from 'axios';

axios.defaults.withCredentials = false;

export default axios.create({
  baseURL: 'http://127.0.0.1:3324/api/spring/',
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
    // 'Access-Control-Allow-Origin': '*',
  },
});
