import axios from 'axios';

axios.defaults.withCredentials = false;

export default axios.create({
  // baseURL: 'http://localhost:4424/api/node/',
  baseURL: `${process.env.REACT_APP_NODE_API_URL}/api/node`,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
    // 'Content-Type': 'multipart/form-data',
    // 'Access-Control-Allow-Origin': '*',
  },
});
