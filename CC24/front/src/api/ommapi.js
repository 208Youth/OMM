import axios from 'axios';

axios.defaults.withCredentials = false;

export default axios.create({
  // baseURL: 'http://localhost:5000/api',
  baseURL: `${process.env.REACT_APP_OMM_SPRING_API_URL}/api`,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
    // 'Access-Control-Allow-Origin': '*',
  },
});
