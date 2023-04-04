import axios from 'axios';

axios.defaults.withCredentials = false;

export default axios.create({
  baseURL: `${import.meta.env.VITE_OMM_URL}/api`,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
    'Access-Control-Allow-Origin': '*',
  },
  // xhrFields: {
  //   withCredentials: false,
  // },
});
