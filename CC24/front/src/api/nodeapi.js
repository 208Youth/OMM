import axios from 'axios';

axios.defaults.withCredentials = false;

export default axios.create({
  // baseURL: 'http://localhost:4424/api/node/',
  baseURL: process.env.NODE_API_URL,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
    // 'Access-Control-Allow-Origin': '*',
  },
});
