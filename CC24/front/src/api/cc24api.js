import axios from "axios";

axios.defaults.withCredentials = false;

export default axios.create({
  baseURL: "http://localhost:3324/api/spring/",
  headers: {
    "Content-Type": "application/json;charset=utf-8",
    // 'Access-Control-Allow-Origin': '*',
  },
});
